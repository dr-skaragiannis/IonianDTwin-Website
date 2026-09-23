/* Path prefix the app is served under, derived from the document's
 * <base href> (which the build stamps from the SITE_BASE env variable —
 * see vite.config.ts):
 *   ""                      at the domain root  (ioniandtwin.di.ionio.gr)
 *   "/IonianDTwin-Website"  on GitHub project pages
 * The router uses it as `basename`, and the clean-URL restore in main.tsx
 * prefixes it, so one build works at any mount point. Not meaningful
 * under file:// where the app falls back to hash routing. */
export const BASE_PATH: string = (() => {
  try {
    return new URL(document.baseURI).pathname.replace(/\/+$/, "");
  } catch {
    return "";
  }
})();
