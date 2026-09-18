import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/* ── Palette definitions ────────────────────────────────────────────── */
export interface Palette {
  id: "ocean" | "emerald" | "clay";
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
  clay: string; // hero accent / terracotta
  claydeep: string; // accent hover
  sea: string; // primary CTA (emerald)
  seadeep: string; // CTA hover
  mist: string; // pale sage / secondary tint
  gold: string; // data warning
}

const OCEAN: Palette = {
  id: "ocean",
  label: "Ionian Cyan",
  swatch: "#0A2240",
  cream: "#F5F8FA",
  cream2: "#E6ECF1",
  sand: "#D8E1EA",
  paper: "#FFFFFF",
  ink: "#0A1930",
  ink2: "#050C17",
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

const EMERALD: Palette = {
  id: "emerald",
  label: "Emerald Coast",
  swatch: "#1B4332",
  cream: "#F9FAF8",
  cream2: "#EFF3EC",
  sand: "#E5EAE3",
  paper: "#FFFFFF",
  ink: "#132A13",
  ink2: "#081C15",
  smoke: "#4A5A4A",
  fog: "#7C8B7C",
  line: "#DDE5DA",
  clay: "#E05A47",
  claydeep: "#C24434",
  sea: "#1B4332",
  seadeep: "#122E22",
  mist: "#A7C4B5",
  gold: "#C9A24B",
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

const PALETTES: Record<Palette["id"], Palette> = {
  ocean: OCEAN,
  emerald: EMERALD,
  clay: CLAY,
};

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
    if (v === "emerald") return "emerald";
    if (v === "ocean") return "ocean";
  } catch {
    /* storage unavailable */
  }
  return "clay"; // clay is the default
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
      setId((cur) =>
        cur === "clay" ? "ocean" : cur === "ocean" ? "emerald" : "clay"
      ),
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
