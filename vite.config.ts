import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* Mount point of the deployed site, stamped into <base href>.
 *   default            "/"                      → ioniandtwin.di.ionio.gr (Apache)
 *   SITE_BASE=/repo/   "/IonianDTwin-Website/"  → GitHub project pages (CI)
 * Everything else (assets, router basename, shell hand-off) is relative to
 * that base, so no other file needs to change per environment. */
function siteBase(): Plugin {
  const raw = process.env.SITE_BASE?.trim() || "/";
  const base = ("/" + raw.replace(/^\/+|\/+$/g, "") + "/").replace(/\/\/+/g, "/");
  return {
    name: "ioniandtwin:site-base",
    transformIndexHtml(html) {
      return html.replace(/<base href="[^"]*" \/>/, `<base href="${base}" />`);
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss(), viteSingleFile(), siteBase()],
  build: {
    assetsInlineLimit: 100000000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
