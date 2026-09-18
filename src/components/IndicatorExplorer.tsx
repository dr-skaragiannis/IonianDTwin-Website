import { useState } from "react";
import { TriangleAlert } from "lucide-react";
import { useC, useT } from "../i18n";

export default function IndicatorExplorer() {
  const c = useC();
  const t = useT();
  const p = t.indicators;
  const [active, setActive] = useState(c.INDICATOR_CATEGORIES[0].id);
  const cat = c.INDICATOR_CATEGORIES.find((x) => x.id === active) ?? c.INDICATOR_CATEGORIES[0];
  const criterion = cat.gstc.match(/^([A-Z]\([a-z]\))\s+(.+)$/);

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      {/* Category rail (mobile) / list (desktop) */}
      <div className="fs-menu-scroll -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 md:-mx-8 md:px-8 lg:mx-0 lg:flex-col lg:gap-1.5 lg:overflow-visible lg:px-0 lg:pb-0">
        {c.INDICATOR_CATEGORIES.map((x, i) => {
          const isActive = x.id === active;
          const CIcon = x.icon;
          return (
            <button
              key={x.id}
              onClick={() => setActive(x.id)}
              aria-pressed={isActive}
              className={`group flex w-[11.5rem] shrink-0 items-center gap-3 rounded-xl border px-3.5 py-3 text-left transition-all duration-300 lg:w-auto lg:shrink lg:px-4 ${
                isActive
                  ? "border-clay/50 bg-paper shadow-[0_14px_36px_-18px_rgba(196,99,60,0.4)]"
                  : "border-line bg-paper/60 hover:bg-paper lg:border-transparent lg:bg-transparent"
              }`}
            >
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-105"
                style={{ background: `${x.color}1c`, color: x.color }}
              >
                <CIcon className="h-4 w-4" strokeWidth={1.75} />
              </span>
              <span className="min-w-0 flex-1">
                <span className={`block truncate text-[0.8125rem] font-medium lg:text-[0.9375rem] ${isActive ? "text-ink" : "text-smoke group-hover:text-ink"}`}>
                  {x.name}
                </span>
                <span className="mt-0.5 block truncate font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-fog">
                  {x.indicators.length}
                </span>
              </span>
              <span className="hidden font-mono text-[9.5px] text-fog lg:inline">
                {String(i + 1).padStart(2, "0")}
              </span>
            </button>
          );
        })}
      </div>

      {/* Detail */}
      <div key={cat.id} className="panel-in flex flex-col rounded-2xl border border-line bg-paper p-6 md:p-9">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <span
              className="flex h-12 w-12 items-center justify-center rounded-xl"
              style={{ background: `${cat.color}1c`, color: cat.color }}
            >
              <cat.icon className="h-5 w-5" strokeWidth={1.75} />
            </span>
            <div>
              <h3 className="display text-2xl font-medium tracking-tight text-ink md:text-3xl">
                {cat.name}
              </h3>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-fog">
                GSTC v2.0 · {cat.gstc}
              </p>
            </div>
          </div>
          <span
            className="rounded-full px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em]"
            style={{ background: `${cat.color}14`, color: cat.color }}
          >
            {cat.indicators.length}
          </span>
        </div>

        {/* Info strip */}
        <div className="mt-7 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
          <div className="bg-paper px-5 py-4">
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-fog">{p.catCount}</p>
            <p className="display mt-1 text-2xl font-medium tracking-tight text-ink">
              {cat.indicators.length}
            </p>
          </div>
          <div className="bg-paper px-5 py-4">
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-fog">{p.catStandard}</p>
            <p className="mt-1.5 flex items-start gap-2 text-[12.5px] leading-snug text-smoke">
              {criterion ? (
                <span className="shrink-0 rounded bg-ink/5 px-1.5 py-0.5 font-mono text-[10px] text-ink">
                  {criterion[1]}
                </span>
              ) : null}
              <span>{criterion?.[2] ?? cat.gstc}</span>
            </p>
          </div>
          <div className="bg-paper px-5 py-4">
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-fog">{p.catThreshold}</p>
            <p className="mt-1.5 text-[12.5px] leading-snug text-smoke">{cat.sample.threshold}</p>
          </div>
        </div>

        <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-smoke">{cat.desc}</p>

        <div className="mt-6 rounded-xl border border-line bg-cream/50 px-5 py-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-clay">{p.catRead}</p>
          <p className="mt-2 text-[13.5px] leading-relaxed text-smoke">{cat.reading}</p>
        </div>

        <div className="mt-7">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-fog">{p.catMeasures}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {cat.indicators.map((ind) => (
              <span
                key={ind}
                className="rounded-full border px-3.5 py-1.5 text-[12px] font-medium"
                style={{ borderColor: `${cat.color}40`, color: cat.color, background: `${cat.color}08` }}
              >
                {ind}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-auto pt-8">
          <div className="rounded-xl border border-line bg-cream/60 px-5 py-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <TriangleAlert className="h-4 w-4 text-gold" strokeWidth={1.75} />
                <p className="text-sm font-medium text-ink">{cat.sample.label}</p>
              </div>
              <span className="rounded-full border border-gold/40 bg-gold/10 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-amber-900">
                {p.catDemo}
              </span>
            </div>
            <div className="mt-4 flex flex-wrap items-baseline gap-x-5 gap-y-1">
              <span className="display text-3xl text-clay">{cat.sample.value}</span>
              <span className="font-mono text-[10px] tracking-[0.1em] text-fog">
                {cat.sample.threshold}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
