import { useState } from "react";
import { ArrowDown } from "lucide-react";
import { useC, useT } from "../i18n";
import { Tag } from "./ui";

export default function ArchitectureExplorer() {
  const t = useT();
  const c = useC();
  const [active, setActive] = useState(c.ARCH_LAYERS[0].id);
  const layer = c.ARCH_LAYERS.find((l) => l.id === active) ?? c.ARCH_LAYERS[0];

  return (
    <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
      {/* Layer stack */}
      <div className="fs-menu-scroll -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 md:-mx-8 md:px-8 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0 lg:pb-0">
        {c.ARCH_LAYERS.map((l, i) => {
          const isActive = l.id === active;
          return (
            <div key={l.id} className="w-[16.5rem] shrink-0 lg:w-auto lg:shrink">
              <button
                onClick={() => setActive(l.id)}
                className={`group w-full rounded-xl border px-5 py-4 text-left transition-all duration-300 ${
                  isActive
                    ? "border-clay/60 bg-paper shadow-[0_16px_40px_-16px_rgba(226,71,11,0.35)]"
                    : "border-line bg-paper/50 hover:border-ink/25 hover:bg-paper"
                }`}
                aria-pressed={isActive}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <span className={`font-mono text-[10px] tracking-[0.2em] ${isActive ? "text-clay" : "text-fog"}`}>
                    L{l.index}
                  </span>
                  <span className="truncate font-mono text-[9px] uppercase tracking-[0.14em] text-fog">
                    {l.tag}
                  </span>
                </div>
                <p
                  className={`display mt-1.5 text-lg font-medium tracking-tight transition-colors lg:text-xl ${
                    isActive ? "text-ink" : "text-smoke group-hover:text-ink"
                  }`}
                >
                  {l.name}
                </p>
                <div className={`mt-2.5 h-[3px] w-full overflow-hidden rounded-full bg-line/70 ${isActive ? "" : "opacity-40"}`}>
                  <div
                    className={`h-full rounded-full bg-gradient-to-r from-sea via-gold to-clay transition-all duration-700 ${
                      isActive ? "w-full" : "w-0"
                    }`}
                  />
                </div>
              </button>
              {i < c.ARCH_LAYERS.length - 1 && (
                <div className="hidden justify-center py-1 lg:flex">
                  <ArrowDown className="h-3.5 w-3.5 text-clay/50" strokeWidth={1.75} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Detail panel */}
      <div key={layer.id} className="panel-in rounded-2xl border border-line bg-paper p-6 md:p-9">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="font-mono text-[11px] tracking-[0.2em] text-clay">
              {t.dash.layers[layer.id as keyof typeof t.dash.layers] ? `LAYER ${layer.index}` : `LAYER ${layer.index}`}
            </span>
            <h3 className="display mt-2 text-2xl font-medium tracking-tight text-ink md:text-4xl">
              {layer.name}
            </h3>
          </div>
          <span className="rounded-full bg-sea/10 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-sea">
            {layer.tag}
          </span>
        </div>

        <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-smoke">{layer.desc}</p>

        <div className="mt-7 grid gap-3 sm:grid-cols-3">
          {layer.components.map((cmp) => (
            <div
              key={cmp.name}
              className="rounded-xl border border-line bg-cream/60 p-4 transition-colors hover:border-clay/40"
            >
              <p className="text-[0.9375rem] font-semibold text-ink">{cmp.name}</p>
              <p className="text-small mt-1.5 text-smoke">{cmp.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-2">
          <span className="mr-1 font-mono text-[9.5px] uppercase tracking-[0.2em] text-fog">GIS</span>
          {layer.tech.map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>
      </div>
    </div>
  );
}
