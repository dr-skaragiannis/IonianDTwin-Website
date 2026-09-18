# IonianDTwin — Website

Official bilingual (Greek · English) presentation website for **IonianDTwin**, a geospatial Digital Twin that continuously measures the sustainability of the Ionian Islands — ecosystems, water, energy, waste, biodiversity and cultural heritage. The project is co-funded by the EU under the Operational Programme "Ionian Islands" 2021–2027.

Built as a single-page application with React, Vite and Tailwind CSS, and compiled to a **single self-contained HTML file** for easy, dependency-free hosting.

---

## Tech stack

| Layer | Tooling |
|---|---|
| Framework | [React 19](https://react.dev/) + [TypeScript 5](https://www.typescriptlang.org/) |
| Build tool | [Vite 7](https://vite.dev/) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) via `@tailwindcss/vite` (CSS-first, `@theme`) |
| Routing | `react-router-dom` — `HashRouter` |
| Maps | [Leaflet](https://leafletjs.com/) + `react-leaflet` |
| Icons | `lucide-react` |
| Single-file output | `vite-plugin-singlefile` |

---

## Getting started

```bash
# install dependencies
npm install

# start the dev server (default http://localhost:5173)
npm run dev

# production build → single-file bundle
npm run build

# locally preview the production build
npm run preview
```

> `npm run build` inlines all JS, CSS and assets into a single `index.html` in `dist/`, thanks to `vite-plugin-singlefile`. Both dev and preview output the only forms of the site this repo produces.

---

## Project structure

```
├── index.html                  # HTML shell + pre-paint palette/language bootstrap
├── vite.config.ts              # Vite config, `@` alias, single-file plugin
├── tsconfig.json               # Strict TS, bundler module resolution
├── package.json
├── public/
│   └── images/                 # Hero + sensor-station imagery
└── src/
    ├── main.tsx                # Entry: Palette + Language providers
    ├── App.tsx                 # Routes + layout (Navbar, Footer, ScrollToTop)
    ├── index.css               # Tailwind theme, design tokens, animation utilities
    ├── components/             # Navbar, Footer, IonianMap, LLMDemo, Explorers…
    ├── pages/                  # One component per route
    ├── data/
    │   ├── content.ts          # EN content packs (islands, pillars, stack…)
    │   └── content.el.ts       # EL content packs
    ├── i18n/                   # Language + palette context, menu, translations
    └── utils/cn.ts             # clsx + tailwind-merge helper
```

---

## Design & theming

The site is **bilingual** and **multi-themed**, both persisted to `localStorage` and applied before first paint to avoid a flash.

- **Languages** — Greek (default) and English. UI copy lives in `src/i18n/translations.ts`; structured content in `src/data/content.ts` / `content.el.ts`.
- **Palettes** — three themes (`ocean`, `emerald`, and the default `clay`) defined in `src/i18n/palette.tsx`. Each exposes CSS custom properties (`--color-*`) that the `@theme` block in `index.css` overrides at runtime.
- **Typography** — editorial serif display (`Source Serif 4`), `Instrument Sans` for body, `IBM Plex Mono` for labels/data — loaded from Google Fonts in `index.html`.
- **Accessibility** — WCAG 2.0 AA styling considerations and a `prefers-reduced-motion` guard that disables all animations.

---

## Routes

| Path | Page |
|---|---|
| `/` | Home |
| `/about/challenge` | Sustainability (six pillars) |
| `/about/project` | The project — funding, timeline, deliverables |
| `/about/architecture` | Five-layer system architecture |
| `/about/technology` | Technical stack & standards |
| `/platform` | Platform overview — one twin, three doors |
| `/platform/dashboard` | Web dashboard mock |
| `/platform/mobile-app` | Mobile app mock |
| `/platform/intelligence` | LLM query interface demo |
| `/indicators` | 34 sustainability indicators across 10 categories |
| `/resources/data-sources` | Eleven data feeds, one data lake |
| `/resources/related-projects` | EU digital-twin ecosystem |
| `/resources/references` | Standards, papers and providers |
| `/contact` | Contact |
| `*` | 404 / NotFound |

---

## License

All content and imagery are © IonianDTwin / Ionian University – ELKE-IP. Not licensed for reuse without permission. Portions of the displayed indicator values are illustrative demonstrations of the platform.
