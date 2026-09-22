/* Copies the compiled single-file SPA (dist/index.html) into /public so that
 * /public is the complete, deployable offline site. Run after `vite build`.
 * Run: node scripts/sync-public.mjs
 */
import { copyFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
mkdirSync(join(root, "public"), { recursive: true });
copyFileSync(join(root, "dist", "index.html"), join(root, "public", "index.html"));
console.log("Copied dist/index.html -> public/index.html");