import { Palette } from "lucide-react";
import { usePalette } from "../i18n/palette";

export default function PaletteSwitcher({ dark = false }: { dark?: boolean }) {
  const { palette, toggle } = usePalette();
  
  const nextName = 
    palette.id === "clay" ? "Ionian Cyan" : 
    palette.id === "ocean" ? "Emerald Coast" : "Ionian Clay";

  const nextBg =
    palette.id === "clay" ? "#0A2240" :
    palette.id === "ocean" ? "#1B4332" : "#C4633C";
    
  const nextAccent =
    palette.id === "clay" ? "#009ECE" :
    palette.id === "ocean" ? "#E05A47" : "#16626B";

  return (
    <button
      onClick={toggle}
      title={`Παλέτα: ${palette.label} — εναλλαγή σε ${nextName}`}
      aria-label={`Παλέτα χρωμάτων: ${palette.label}. Εναλλαγή σε ${nextName}.`}
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
          style={{ background: nextBg }}
        />
        <span
          className="h-3.5 w-3.5 rounded-full ring-1 ring-white/60"
          style={{ background: nextAccent }}
        />
      </span>
    </button>
  );
}
