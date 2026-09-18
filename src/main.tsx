import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { LanguageProvider } from "./i18n";
import { PaletteProvider } from "./i18n/palette";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PaletteProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </PaletteProvider>
  </StrictMode>
);
