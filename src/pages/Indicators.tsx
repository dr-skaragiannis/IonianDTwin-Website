import { Gauge as GaugeIcon, Ruler, Sigma } from "lucide-react";
import { useT } from "../i18n";
import { useSubNav } from "../i18n/menu";
import { Container, PageHero, Reveal, SectionHead, Wavy } from "../components/ui";
import IndicatorExplorer from "../components/IndicatorExplorer";

const STEP_ICONS = ["ruler", "sigma", "gauge"] as const;

function StepIcon({ name }: { name: (typeof STEP_ICONS)[number] }) {
  const common = { className: "h-5 w-5", strokeWidth: 1.75 } as const;
  if (name === "ruler") return <Ruler {...common} />;
  if (name === "sigma") return <Sigma {...common} />;
  return <GaugeIcon {...common} />;
}

function CompositeGauge({ labels }: { labels: { g: string; low: string; watch: string; alert: string } }) {
  const value = 74;
  const arcLen = Math.PI * 130;
  return (
    <div>
      <svg viewBox="0 0 320 186" className="w-full max-w-md">
        <path d="M25 165 A135 135 0 0 1 295 165" fill="none" stroke="#DADFCC" strokeWidth="16" strokeLinecap="round" />
        <path
          d="M25 165 A135 135 0 0 1 295 165"
          fill="none"
          stroke="url(#gaugeGrad)"
          strokeWidth="16"
          strokeLinecap="round"
          strokeDasharray={arcLen}
          strokeDashoffset={arcLen * (1 - value / 100)}
        />
        <defs>
          <linearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0086EA" />
            <stop offset="55%" stopColor="#FABF5D" />
            <stop offset="100%" stopColor="#E2470B" />
          </linearGradient>
        </defs>
        <text x="160" y="132" textAnchor="middle" fontSize="58" fontWeight="500" fontFamily="Jura, sans-serif" fill="#1E221D">
          {value}
        </text>
        <text x="160" y="160" textAnchor="middle" fontSize="12" letterSpacing="2.5" fontFamily="JetBrains Mono, monospace" fill="#7B8177">
          {labels.g}
        </text>
      </svg>
      <div className="mt-2 flex flex-wrap justify-center gap-x-5 gap-y-1 font-mono text-[9px] uppercase tracking-[0.12em] text-fog sm:text-[9.5px] sm:tracking-[0.14em]">
        <span className="flex items-center gap-1.5"><span className="h-1.5 w-4 rounded-full bg-[#0086EA]" /> {labels.low}</span>
        <span className="flex items-center gap-1.5"><span className="h-1.5 w-4 rounded-full bg-[#FABF5D]" /> {labels.watch}</span>
        <span className="flex items-center gap-1.5"><span className="h-1.5 w-4 rounded-full bg-[#E2470B]" /> {labels.alert}</span>
      </div>
    </div>
  );
}

export default function Indicators() {
  const t = useT();
  const p = t.indicators;

  return (
    <main>
      <PageHero
        eyebrow={p.eyebrow}
        trail={[
      { label: t.nav.home, to: "/" },
      { label: t.nav.platform, to: "/platform" },
      { label: t.indicators.crumb },
    ]}
    subNav={useSubNav("/platform")}
        title={
          <>
            {p.titleA}
            <br />
            <em className="text-clay"><Wavy text={p.titleB} /></em>
          </>
        }
        lede={p.lede}
        meta={p.meta}
      />

      <section className="border-b border-line bg-cream py-24 md:py-28">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <div className="flex flex-col items-start">
            <SectionHead eyebrow={p.ciEyebrow} title={p.ciTitle} lede={p.ciLede} />
            <Reveal delay={220}>
              <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-fog">
                {p.ciNote}
              </p>
              <div className="mt-4">
                <CompositeGauge
                  labels={{ g: p.ciGauge, low: p.ciLow, watch: p.ciWatch, alert: p.ciAlert }}
                />
              </div>
            </Reveal>
          </div>
          <div className="space-y-4">
            {p.steps.map((s, i) => (
              <Reveal key={s.t} delay={i * 100}>
                <div className="group flex gap-5 rounded-2xl border border-line bg-paper p-6 transition-all duration-500 hover:-translate-y-1 hover:border-clay/40">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-clay/10 text-clay transition-colors group-hover:bg-clay group-hover:text-cream">
                    <StepIcon name={STEP_ICONS[i]} />
                  </span>
                  <div>
                    <p className="display text-xl font-medium tracking-tight text-ink">
                      <span className="mr-3 font-mono text-[10px] tracking-[0.2em] text-fog">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {s.t}
                    </p>
                    <p className="text-body mt-2 text-smoke">{s.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-paper py-24 md:py-28">
        <Container>
          <SectionHead eyebrow={p.exEyebrow} title={p.exTitle} lede={p.exLede} />
          <Reveal delay={160} className="mt-14">
            <IndicatorExplorer />
          </Reveal>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-ink2 py-24 text-cream md:py-28">
        <div className="absolute inset-0 bg-grid-dark" />
        <Container className="relative grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHead
              dark
              eyebrow={p.gEyebrow}
              title={
                <>
                  {p.gTitleA} <em className="text-clay"><Wavy text={p.gTitleB} /></em>
                </>
              }
              lede={p.gLede}
            />
            <Reveal delay={200}>
              <a
                href="https://www.gstc.org/gstc-criteria/gstc-destination-criteria/"
                target="_blank"
                rel="noreferrer"
                className="group mt-8 inline-flex items-center gap-2 rounded-full border border-cream/25 px-5 py-2.5 text-sm text-cream transition-colors hover:bg-cream hover:text-ink"
              >
                {p.gBtn}
              </a>
            </Reveal>
          </div>
          <div>
            <SectionHead dark eyebrow={p.alEyebrow} title={p.alTitle} />
            <div className="mt-9">
              {p.alertSteps.map((s, i) => (
                <Reveal key={s.n} delay={i * 80}>
                  <div className="flex gap-5 border-b border-cream/10 py-4 last:border-b-0">
                    <span className="font-mono text-[10px] tracking-[0.2em] text-clay">{s.n}</span>
                    <div>
                      <p className="text-[1rem] font-medium">{s.t}</p>
                      <p className="text-small mt-1 text-cream/55">{s.d}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={280}>
              <div className="mt-7 rounded-xl border border-cream/12 bg-cream/5 px-5 py-4">
                <p className="text-[13px] leading-relaxed text-cream/65">{p.alertNote}</p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </main>
  );
}
