import { Languages } from "lucide-react";
import { useLang, type Lang } from "../i18n";

const OPTIONS: { code: Lang; label: string; full: string }[] = [
  { code: "el", label: "ΕΛ", full: "Ελληνικά" },
  { code: "en", label: "EN", full: "English" },
];

/**
 * Segmented language toggle. `dark` adapts it for the ink-dark surfaces
 * (mobile menu, footer, dark sections).
 */
export default function LanguageSwitcher({ dark = false }: { dark?: boolean }) {
  const { lang, setLang } = useLang();

  return (
    <div
      className={`inline-flex items-center gap-0.5 rounded-full border p-0.5 ${
        dark ? "border-cream/20 bg-cream/5" : "border-ink/15 bg-paper"
      }`}
      role="group"
      aria-label="Language / Γλώσσα"
    >
      <Languages
        className={`ml-1.5 h-3.5 w-3.5 shrink-0 ${dark ? "text-cream/50" : "text-fog"}`}
        strokeWidth={1.75}
        aria-hidden="true"
      />
      {OPTIONS.map((o) => {
        const active = lang === o.code;
        return (
          <button
            key={o.code}
            onClick={() => setLang(o.code)}
            aria-pressed={active}
            title={o.full}
            className={`rounded-full px-2.5 py-1 font-mono text-[0.75rem] font-medium tracking-[0.08em] transition-colors ${
              active
                ? dark
                  ? "bg-clay text-cream"
                  : "bg-ink text-cream"
                : dark
                  ? "text-cream/60 hover:text-cream"
                  : "text-fog hover:text-ink"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
