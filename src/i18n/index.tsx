import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  Leaf,
  Droplets,
  Zap,
  Trash2,
  Bird,
  Landmark,
  Wind,
  Volume2,
  Users,
  Car,
  Coins,
  Radio,
  Satellite,
  Waves,
  Ship,
  Plane,
  Sun,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import { EL, EN, type Dict, type Lang } from "./translations";
export type { Lang };
import * as EN_DATA from "../data/content";
import * as EL_DATA from "../data/content.el";

/* ── Icon resolution ────────────────────────────────────────────────── */
const ICONS: Record<string, LucideIcon> = {
  leaf: Leaf,
  droplets: Droplets,
  zap: Zap,
  trash: Trash2,
  bird: Bird,
  landmark: Landmark,
  wind: Wind,
  volume: Volume2,
  users: Users,
  car: Car,
  coins: Coins,
  radio: Radio,
  satellite: Satellite,
  waves: Waves,
  ship: Ship,
  plane: Plane,
  sun: Sun,
  smartphone: Smartphone,
};

/** Replaces string icon keys in a Greek array with real Lucide components. */
function withIcons<T extends { icon: string }>(
  rows: T[]
): (Omit<T, "icon"> & { icon: LucideIcon })[] {
  return rows.map(({ icon, ...rest }) => ({ ...rest, icon: ICONS[icon] ?? Leaf }));
}

/* ── Content packs ──────────────────────────────────────────────────── */
export interface Content {
  ISLANDS: typeof EN_DATA.ISLANDS;
  PILLARS: typeof EN_DATA.SUSTAINABILITY_PILLARS;
  OBJECTIVES: typeof EN_DATA.OBJECTIVES;
  ARCH_LAYERS: typeof EN_DATA.ARCH_LAYERS;
  INDICATOR_CATEGORIES: typeof EN_DATA.INDICATOR_CATEGORIES;
  STACK: typeof EN_DATA.STACK;
  DELIVERABLES: typeof EN_DATA.DELIVERABLES;
  TIMELINE: typeof EN_DATA.TIMELINE;
  FUNDING: typeof EN_DATA.FUNDING;
  RELATED: typeof EN_DATA.RELATED;
  REFERENCE_GROUPS: typeof EN_DATA.REFERENCE_GROUPS;
  DATA_SOURCES: typeof EN_DATA.DATA_SOURCES;
}

const EN_PACK: Content = {
  ISLANDS: EN_DATA.ISLANDS,
  PILLARS: EN_DATA.SUSTAINABILITY_PILLARS,
  OBJECTIVES: EN_DATA.OBJECTIVES,
  ARCH_LAYERS: EN_DATA.ARCH_LAYERS,
  INDICATOR_CATEGORIES: EN_DATA.INDICATOR_CATEGORIES,
  STACK: EN_DATA.STACK,
  DELIVERABLES: EN_DATA.DELIVERABLES,
  TIMELINE: EN_DATA.TIMELINE,
  FUNDING: EN_DATA.FUNDING,
  RELATED: EN_DATA.RELATED,
  REFERENCE_GROUPS: EN_DATA.REFERENCE_GROUPS,
  DATA_SOURCES: EN_DATA.DATA_SOURCES,
};

const EL_PACK: Content = {
  ISLANDS: EL_DATA.ISLANDS_EL,
  PILLARS: withIcons(EL_DATA.PILLARS_EL) as Content["PILLARS"],
  OBJECTIVES: EL_DATA.OBJECTIVES_EL,
  ARCH_LAYERS: EL_DATA.ARCH_LAYERS_EL,
  INDICATOR_CATEGORIES: withIcons(
    EL_DATA.INDICATOR_CATEGORIES_EL
  ) as Content["INDICATOR_CATEGORIES"],
  STACK: EL_DATA.STACK_EL,
  DELIVERABLES: EL_DATA.DELIVERABLES_EL,
  TIMELINE: EL_DATA.TIMELINE_EL,
  FUNDING: EL_DATA.FUNDING_EL,
  RELATED: EL_DATA.RELATED_EL,
  REFERENCE_GROUPS: EL_DATA.REFERENCE_GROUPS_EL,
  DATA_SOURCES: withIcons(EL_DATA.DATA_SOURCES_EL) as Content["DATA_SOURCES"],
};

/* ── Context ────────────────────────────────────────────────────────── */
const STORAGE_KEY = "ioniandtwin.lang";

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: Dict;
  c: Content;
}

const Ctx = createContext<LangCtx | null>(null);

function readInitial(): Lang {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "en" ? "en" : "el";
  } catch {
    return "el"; // Greek is the default language
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(readInitial);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* storage unavailable — non-fatal */
    }
  }, [lang]);

  const toggle = useCallback(
    () => setLang((l) => (l === "el" ? "en" : "el")),
    []
  );

  const value = useMemo<LangCtx>(
    () => ({
      lang,
      setLang,
      toggle,
      t: lang === "el" ? EL : EN,
      c: lang === "el" ? EL_PACK : EN_PACK,
    }),
    [lang, toggle]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLang() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLang must be used inside <LanguageProvider>");
  return ctx;
}

/** UI + page copy in the active language. */
export function useT(): Dict {
  return useLang().t;
}

/** Structured content arrays in the active language. */
export function useC(): Content {
  return useLang().c;
}
