/* Vendors third-party runtime assets locally so the site deploys fully offline.
 * Run: node scripts/vendor-assets.mjs
 * Downloads:
 *   1. Google Fonts (Jura, Manrope, JetBrains Mono)  -> public/fonts/fonts.css + *.woff2
 *   2. CARTO dark_all basemap tiles (z6-z12, Ionian bbox) -> public/tiles/{z}/{x}/{y}.png
 * Idempotent: existing tiles/fonts are skipped.
 */
import { randomBytes, createHash } from "crypto";
import { mkdirSync, writeFileSync, existsSync, statSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pub = join(root, "public");
const FONT_DIR = join(pub, "fonts");
const TILE_DIR = join(pub, "tiles");

const FONTS_CSS_URL =
  "https://fonts.googleapis.com/css2?family=Jura:wght@500;600;700&family=Manrope:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap";

const TILE_SRC = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png";
const TILE_SUBDOMAINS = ["a", "b", "c", "d"];
const TILE_BBOX = { lonMin: 19.0, lonMax: 21.4, latMin: 36.3, latMax: 40.2 };
const TILE_MIN_Z = 6;
const TILE_MAX_Z = 12;
const CONCURRENCY = 8;
const RETRIES = 3;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function withRetry(fn, attempts = RETRIES) {
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      if (i === attempts - 1) throw err;
      await sleep(400 * (i + 1));
    }
  }
}

async function download(url, dest, opts = {}) {
  if (opts.skipIfExists && existsSync(dest) && statSync(dest).size > 0) return false;
  const res = await withRetry(() => fetch(url, { headers: opts.headers }));
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, buf);
  return true;
}

/* ------------------------------ fonts ------------------------------ */

async function vendorFonts() {
  const seen = new Set();
  const blocks = [];
  let done = 0;
  let skipped = 0;
  const css = await withRetry(() =>
    fetch(FONTS_CSS_URL, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0 Safari/537.36",
      },
    })
  ).then((r) => {
    if (!r.ok) throw new Error(`HTTP ${r.status} fetching fonts css`);
    return r.text();
  });

  const re = /(@font-face\s*\{[^}]+\})/g;
  let m;
  let totalFiles = 0;
  while ((m = re.exec(css)) !== null) {
    const block = m[1];
    const srcMatch = block.match(/src:\s*(?:[^;]+?,\s*)?url\(([^)]+)\)\s*format\(['"]woff2['"]\)/);
    if (!srcMatch) continue;
    const remote = srcMatch[1];
    if (seen.has(remote)) continue;
    seen.add(remote);
    const ext = remote.split("?")[0].split(".").pop() || "woff2";
    const localName = `font-${createHash("sha1").update(remote).digest("hex").slice(0, 16)}.${ext}`;
    const localBlock = block.replace(
      /url\([^)]+\)\s*format\(['"]woff2['"]\)/,
      `url("${localName}") format("woff2")`
    );
    blocks.push(localBlock);
    totalFiles++;
    try {
      const created = await download(remote, join(FONT_DIR, localName), { skipIfExists: true });
      created ? done++ : skipped++;
      if (done % 10 === 0) console.log(`  fonts: ${done} downloaded, ${skipped} cached`);
    } catch (err) {
      console.error(`  fonts: FAILED ${remote} — ${err.message}`);
    }
  }
  const cssOut = blocks.length ? blocks.join("\n\n") + "\n" : "";
  mkdirSync(FONT_DIR, { recursive: true });
  writeFileSync(join(FONT_DIR, "fonts.css"), cssOut);
  console.log(`fonts: ${blocks.length} @font-face blocks, ${done} downloaded, ${skipped} cached -> public/fonts/fonts.css`);
}

/* ------------------------------ tiles ------------------------------ */

function tileXY(lon, lat, z) {
  const n = 2 ** z;
  const x = Math.floor(((lon + 180) / 360) * n);
  const latRad = (lat * Math.PI) / 180;
  const y = Math.floor(((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * n);
  return [x, y];
}

async function vendorTiles() {
  let total = 0;
  for (let z = TILE_MIN_Z; z <= TILE_MAX_Z; z++) {
    const [x0, y0] = tileXY(TILE_BBOX.lonMin, TILE_BBOX.latMax, z);
    const [x1, y1] = tileXY(TILE_BBOX.lonMax, TILE_BBOX.latMin, z);
    const jobs = [];
    for (let x = Math.max(0, x0); x <= x1; x++) {
      for (let y = Math.max(0, y0); y <= y1; y++) {
        jobs.push({ z, x, y });
      }
    }
    let done = 0;
    let skipped = 0;
    const queue = [...jobs];
    console.log(`tiles z${z}: ${jobs.length} in range`);
    async function worker() {
      while (queue.length) {
        const { z: zz, x, y } = queue.shift();
        const dest = join(TILE_DIR, String(zz), String(x), `${y}.png`);
        if (existsSync(dest)) {
          skipped++;
          continue;
        }
        const url = TILE_SRC.replace("{s}", TILE_SUBDOMAINS[Math.floor(Math.random() * TILE_SUBDOMAINS.length)])
          .replace("{z}", String(zz))
          .replace("{x}", String(x))
          .replace("{y}", String(y));
        try {
          await download(url, dest);
          done++;
          if (done % 200 === 0) console.log(`  z${zz}: ${done} downloaded`);
        } catch (err) {
          console.error(`  z${zz} ${x}/${y}: FAILED — ${err.message}`);
        }
      }
    }
    await Promise.all(Array.from({ length: CONCURRENCY }, worker));
    total += done + skipped;
    console.log(`tiles z${z}: done, ${done} downloaded, ${skipped} cached`);
  }
  console.log(`tiles: ${total} tiles present in public/tiles`);
}

await vendorFonts();
await vendorTiles();
console.log("vendor-assets complete.");