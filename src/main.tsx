import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { LanguageProvider } from "./i18n";
import { PaletteProvider } from "./i18n/palette";
import { BASE_PATH } from "./basePath";

/* Restore a clean URL before the router mounts.
 * - HTTP(S): shells hand capable browsers over via `?route=/about/challenge/`
 *   and legacy published links still use `/#/about/challenge`; both are
 *   rewritten to the clean pathname for BrowserRouter.
 * - file:// preview (no server): stay on the local index.html and fall back
 *   to the hash form, which the file-mode HashRouter understands.
 * history.replaceState keeps the back-forward entry to the original shell.
 * Over HTTP the clean path is prefixed with BASE_PATH (empty at the domain
 * root, "/<repo>" on GitHub project pages). */
function restoreCleanRoute() {
  const isFile = window.location.protocol === "file:";
  try {
    const route = new URLSearchParams(window.location.search).get("route");
    if (route && route.startsWith("/") && !route.startsWith("//")) {
      history.replaceState(null, "", isFile ? `#${route}` : `${BASE_PATH}${route}`);
      return;
    }
    if (!isFile && window.location.hash.startsWith("#/")) {
      history.replaceState(null, "", `${BASE_PATH}${window.location.hash.slice(1)}`);
    }
  } catch {
    /* cross-origin replaceState — leave the URL untouched */
  }
}
restoreCleanRoute();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PaletteProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </PaletteProvider>
  </StrictMode>
);
