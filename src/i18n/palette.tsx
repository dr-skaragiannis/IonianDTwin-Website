import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/* ── Palette definitions ──────────────────────────────────────────────
   Three themes, cycled by the swap button in this order:
   · "ionian" — Ionian (default): cool salt-white surfaces, moss-charcoal
                ink and the three brand colours of the logo waves
   · "mono"   — Monochrome (black & white)
   · "ocean"  — Ionian Cyan (cool blue)                                   */
export interface Palette {
  id: "ionian" | "mono" | "ocean";
  label: string;
  swatch: string;
  /* surfaces */
  cream: string; // main background
  cream2: string; // alt background
  sand: string; // tinted band
  paper: string; // card surface
  /* ink */
  ink: string; // primary text / headings
  ink2: string; // dark section bg
  smoke: string; // body text
  fog: string; // muted text
  line: string; // hairline / grid
  /* accents */
  clay: string; // primary accent (links, eyebrows, emphasis)
  claydeep: string; // primary accent hover / deeper
  sea: string; // secondary accent
  seadeep: string; // secondary hover
  mist: string; // pale tint (labels & dots on dark surfaces)
  gold: string; // data warning / highlight
}

/* ── Brand colours (from the logo) ────────────────────────────────────
   Wave 1  #C8502E  terracotta
   Wave 2  #E4B671  sand
   Wave 3  #0F80C5  Ionian blue
   Tile    #1E221D  moss-charcoal
   Also exported from src/components/ui.tsx as BRAND_WAVES / BRAND_INK.  */
export const BRAND = {
  terracotta: "#C8502E",
  sand: "#E4B671",
  blue: "#0F80C5",
  ink: "#1E221D",
} as const;

/* Default theme — "Ionian". Salt-white surfaces with a faint cool, sea-glass
   cast (olive-grove greys rather than warm cream), moss-charcoal ink taken
   from the logo tile, Ionian blue as the primary accent and terracotta /
   sand as secondary accents. Data-viz figures
   (charts, dashboards, map dots) use the same three brand colours in every
   theme; only the interface chrome changes when the palette is swapped. */
const IONIAN: Palette = {
  id: "ionian",
  label: "Ionian",
  swatch: BRAND.blue,
  cream: "#F4F7F6",
  cream2: "#EBF0EE",
  sand: "#DFE9EC",
  paper: "#FFFFFF",
  ink: BRAND.ink,
  ink2: "#161915",
  smoke: "#444D49",
  fog: "#6C7772",
  line: "#D3DBD8",
  clay: BRAND.blue,
  claydeep: "#0B669E",
  sea: BRAND.terracotta,
  seadeep: "#A63F22",
  mist: "#BFDDF0",
  gold: BRAND.sand,
};

const MONO: Palette = {
  id: "mono",
  label: "Monochrome",
  swatch: "#111112",
  cream: "#FFFFFF",
  cream2: "#F2F2F3",
  sand: "#E5E5E7",
  paper: "#FFFFFF",
  ink: "#000000",
  ink2: "#101010",
  smoke: "#2E2E31",
  fog: "#6E6E73",
  line: "#D9D9DC",
  clay: "#0E0E10",
  claydeep: "#000000",
  sea: "#1A1A1C",
  seadeep: "#000000",
  mist: "#ECECED",
  gold: "#55555A",
};

const OCEAN: Palette = {
  id: "ocean",
  label: "Ionian Cyan",
  swatch: "#0A2240",
  cream: "#F5F8FA",
  cream2: "#E6ECF1",
  sand: "#D8E1EA",
  paper: "#FFFFFF",
  ink: "#0A1930",
  ink2: "#1E221D",
  smoke: "#3A4F6B",
  fog: "#7487A3",
  line: "#CDD9E6",
  clay: "#009ECE",
  claydeep: "#007BA3",
  sea: "#0A2240",
  seadeep: "#041021",
  mist: "#B3E5FC",
  gold: "#F39C12",
};

const PALETTES: Record<Palette["id"], Palette> = {
  ionian: IONIAN,
  mono: MONO,
  ocean: OCEAN,
};

export const PALETTE_ORDER: Palette["id"][] = ["ionian", "mono", "ocean"];

const STORAGE_KEY = "ioniandtwin.palette";
export type PaletteId = Palette["id"];

interface PaletteCtx {
  palette: Palette;
  id: PaletteId;
  setPalette: (id: PaletteId) => void;
  toggle: () => void;
}

const Ctx = createContext<PaletteCtx | null>(null);

function readInitial(): PaletteId {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    if (v === "mono" || v === "ocean") return v;
    /* "ionian", legacy ids ("clay") or unknown values fall through */
  } catch {
    /* storage unavailable */
  }
  return "ionian"; // the brand theme is the default
}

export function PaletteProvider({ children }: { children: ReactNode }) {
  const [id, setId] = useState<PaletteId>(readInitial);
  const palette = PALETTES[id];

  useEffect(() => {
    const r = document.documentElement.style;
    r.setProperty("--color-cream", palette.cream);
    r.setProperty("--color-cream2", palette.cream2);
    r.setProperty("--color-sand", palette.sand);
    r.setProperty("--color-paper", palette.paper);
    r.setProperty("--color-ink", palette.ink);
    r.setProperty("--color-ink2", palette.ink2);
    r.setProperty("--color-smoke", palette.smoke);
    r.setProperty("--color-fog", palette.fog);
    r.setProperty("--color-line", palette.line);
    r.setProperty("--color-clay", palette.clay);
    r.setProperty("--color-claydeep", palette.claydeep);
    r.setProperty("--color-sea", palette.sea);
    r.setProperty("--color-seadeep", palette.seadeep);
    r.setProperty("--color-mist", palette.mist);
    r.setProperty("--color-gold", palette.gold);
    /* data-palette lets CSS scope palette-specific overrides
       (e.g. re-light accent tokens inside the dark sections). */
    document.documentElement.dataset.palette = palette.id;
  }, [palette]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, id);
    } catch {
      /* non-fatal */
    }
  }, [id]);

  const setPalette = useCallback((next: PaletteId) => setId(next), []);
  const toggle = useCallback(
    () =>
      setId((cur) => {
        const i = PALETTE_ORDER.indexOf(cur);
        return PALETTE_ORDER[(i + 1) % PALETTE_ORDER.length];
      }),
    []
  );

  const value = useMemo(
    () => ({ palette, id, setPalette, toggle }),
    [palette, id, setPalette, toggle]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function usePalette() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("usePalette must be used inside <PaletteProvider>");
  return ctx;
}
