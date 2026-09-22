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
   Three themes defined, but the swap button only cycles between the
   two visible ones (ocean ↔ mono):
   · "mono"  — Monochrome (black & white, default)
   · "ocean" — Ionian Cyan (alternate, blue)
   · "clay"  — Ionian Clay (warm) — kept defined but NOT in the cycle  */
export interface Palette {
  id: "ocean" | "clay" | "mono";
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
  clay: string; // hero accent
  claydeep: string; // accent hover
  sea: string; // secondary accent
  seadeep: string; // secondary hover
  mist: string; // pale tint
  gold: string; // data warning
}

/* Default theme — Monochrome (black & white). Data-viz figures (SVG
   charts, dashboards, map dots) keep their colors in every theme;
   only the interface chrome — surfaces, ink, accents — turns gray.
   Dark sections stay on the brand moss-charcoal #1E221D so they
   match the logo tile. */
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

const CLAY: Palette = {
  id: "clay",
  label: "Ionian Clay",
  swatch: "#C4633C",
  cream: "#F4F1E8",
  cream2: "#ECE7D9",
  sand: "#E3DBC6",
  paper: "#FCFBF7",
  ink: "#1E1D19",
  ink2: "#131210",
  smoke: "#5B584C",
  fog: "#8D8A7D",
  line: "#DDD8C9",
  clay: "#C4633C",
  claydeep: "#A54C2B",
  sea: "#16626B",
  seadeep: "#0C4149",
  mist: "#A9C3BF",
  gold: "#C9A24B",
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

const PALETTES: Record<Palette["id"], Palette> = {
  ocean: OCEAN,
  clay: CLAY,
  mono: MONO,
};

const ORDER: Palette["id"][] = ["ocean", "mono"];

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
    if (v === "clay" || v === "mono") return v;
    /* "ocean" or any legacy/unknown value falls through to default */
  } catch {
    /* storage unavailable */
  }
  return "mono"; // monochrome (b&w) is the default
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
    /* data-palette lets CSS scope monochrome-specific overrides
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
        const i = ORDER.indexOf(cur);
        return ORDER[(i + 1) % ORDER.length];
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
