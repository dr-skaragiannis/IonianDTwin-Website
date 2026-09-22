import { Palette } from "lucide-react";
import { usePalette, type PaletteId } from "../i18n/palette";

const NEXT: Record<PaletteId, { name: string; bg: string; accent: string }> = {
  ocean: { name: "Ionian Clay", bg: "#C4633C", accent: "#16626B" },
  clay: { name: "Monochrome", bg: "#0E0E10", accent: "#9A9AA0" },
  mono: { name: "Ionian Cyan", bg: "#0A2240", accent: "#009ECE" },
};

export default function PaletteSwitcher({ dark = false }: { dark?: boolean }) {
  const { palette, toggle } = usePalette();

  const next = NEXT[palette.id];

  return (
    <button
      onClick={toggle}
      title={`Παλέτα: ${palette.label} — εναλλαγή σε ${next.name}`}
      aria-label={`Παλέτα χρωμάτων: ${palette.label}. Εναλλαγή σε ${next.name}.`}
      className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 transition-colors ${
        dark
          ? "border-cream/20 bg-cream/5 hover:bg-cream/15"
          : "border-ink/15 bg-paper hover:border-ink/40"
      }`}
    >
      <Palette className="h-3.5 w-3.5 text-clay" strokeWidth={1.75} aria-hidden="true" />
      {/* swatch shows the palette you would switch TO */}
      <span className="flex -space-x-1" aria-hidden="true">
        <span
          className="h-3.5 w-3.5 rounded-full ring-1 ring-white/60"
          style={{ background: next.bg }}
        />
        <span
          className="h-3.5 w-3.5 rounded-full ring-1 ring-white/60"
          style={{ background: next.accent }}
        />
      </span>
    </button>
  );
}
