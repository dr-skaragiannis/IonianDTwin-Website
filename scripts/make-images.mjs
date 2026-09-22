/* Generates raster PWA icons from the SVG master in /public.
 * Run: node scripts/make-images.mjs  (requires devDependency `sharp`)
 * Outputs (committed to /public so every `vite build` ships them):
 *   apple-touch-icon.png (180) · icon-512.png (512) ·
 *   favicon-32x32.png · favicon-16x16.png
 * Note: og-image-el.jpg / og-image-en.jpg are authored assets, not generated.
 */
import sharp from "sharp";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pub = join(root, "public");
const BG = "#1E221D";

const jobs = [
  sharp(join(pub, "favicon.svg"))
    .resize(180, 180)
    .flatten({ background: BG })
    .png()
    .toFile(join(pub, "apple-touch-icon.png")),
  sharp(join(pub, "favicon.svg"))
    .resize(512, 512)
    .flatten({ background: BG })
    .png()
    .toFile(join(pub, "icon-512.png")),
  sharp(join(pub, "favicon.svg")).resize(32, 32).png().toFile(join(pub, "favicon-32x32.png")),
  sharp(join(pub, "favicon.svg")).resize(16, 16).png().toFile(join(pub, "favicon-16x16.png")),
];

await Promise.all(jobs);
console.log("SEO images written to /public");
