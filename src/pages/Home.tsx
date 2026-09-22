import { Link } from "react-router-dom";
import { ArrowRight, Boxes, Cpu, Gauge, Landmark, Layers, Leaf, Newspaper, Radar } from "lucide-react";
import { useLang, useT } from "../i18n";
import {
  Container,
  Counter,
  DemoBadge,
  Reveal,
  SectionHead,
  Wavy,
} from "../components/ui";
/* Served from /public for a smaller HTML bundle + separate image caching. */
const HERO_IMG = "./images/ionian-twin-hero.jpg";

/** Island label positions, georeferenced to the hero imagery (percent of frame) */
const ISLAND_POS: { x: string; y: string }[] = [
  { x: "27%", y: "13%" }, // Corfu
  { x: "34%", y: "22%" }, // Paxi
  { x: "45%", y: "30%" }, // Lefkada
  { x: "52%", y: "41%" }, // Kefalonia
  { x: "66%", y: "52%" }, // Ithaca
  { x: "86%", y: "74%" }, // Zakynthos (bottom-right in the hero frame)
];

/** Portal-card icons, indexed to match h.explore order. */
const EXPLORE_ICONS = [Radar, Leaf, Landmark, Layers, Cpu, Gauge, Boxes, Newspaper];

export default function Home() {
  const { lang } = useLang();
  const t = useT();
  const isEl = lang === "el";
  const h = t.home;
  const d = t.dashboard;
  const m = t.mobile;

  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-cream bg-grid">
        <div className="pointer-events-none absolute -right-40 top-10 h-[560px] w-[560px] rounded-full bg-clay/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-sea/10 blur-3xl" />
        <Container className="relative pb-10 pt-40 text-center md:pt-48">
          <Reveal>
            <span className="eyebrow">{h.eyebrow}</span>
          </Reveal>
          <Reveal delay={90}>
            <h1 className="h-display display mx-auto mt-6 max-w-[90%] font-medium tracking-tight text-ink">
              {h.titleA}
              <em className="relative whitespace-nowrap text-clay">
                <Wavy text={h.titleAccent} />
                <svg
                  className="absolute -bottom-2 left-0 h-[0.3em] w-full text-clay/45"
                  viewBox="0 0 200 20"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  {["translateY(0px)", "translateY(4px)", "translateY(8px)"].map((y, i) => (
                    <path
                      key={i}
                      className="wave-curve"
                      d="M3 8 C 40 2, 70 11, 105 6 S 170 3, 197 7"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      style={{ transform: y }}
                    />
                  ))}
                </svg>
              </em>
              {h.titleSuffix}
              {h.titleB ? (
                <>
                  <br />
                  <em className="text-clay">
                    <Wavy text={h.titleB} />
                  </em>
                </>
              ) : null}
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="text-lede mx-auto mt-7 max-w-[90%] text-smoke">{h.lede}</p>
          </Reveal>
          <Reveal delay={260}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link to="/platform" className="btn-primary group">
                {h.ctaPrimary}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.75} />
              </Link>
              <Link to="/about/challenge" className="btn-ghost">
                {h.ctaSecondary}
              </Link>
            </div>
          </Reveal>
          <Reveal delay={340}>
            <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-2 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-fog">
              <span>{h.metaLead}</span>
              <span>{h.metaOps}</span>
              <span>{h.metaYears}</span>
            </div>
          </Reveal>
        </Container>

        {/* Panoramic archipelago — digital twin visual */}
        <Container className="relative pb-20">
          <Reveal delay={220}>
            <div className="relative overflow-hidden rounded-2xl border border-ink/12 bg-ink2 shadow-[0_50px_90px_-38px_rgba(30,34,29,0.55)]">
              <img
                src={HERO_IMG}
                alt={h.heroCaption}
                className="aspect-[16/11] w-full object-cover sm:aspect-[21/9]"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink2/70 via-transparent to-ink2/25" />
              <div className="scanline" />
              <DemoBadge dark className="absolute right-3 top-3 z-10 sm:right-5 sm:top-5" />

              {/* Island labels */}
              <div className="pointer-events-none absolute inset-0 hidden sm:block">
                {ISLAND_POS.map((p, i) => (
                  <span
                    key={h.islands[i]}
                    className="absolute flex -translate-x-1/2 items-center gap-1.5"
                    style={{ left: p.x, top: p.y }}
                  >
                    <span className="h-1 w-1 shrink-0 rounded-full bg-mist/90 shadow-[0_0_6px_rgba(169,195,191,0.9)]" />
                    <span className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-cream/85 [text-shadow:0_0_8px_rgba(20,26,20,0.95),0_1px_3px_rgba(20,26,20,0.95)]">
                      {h.islands[i]}
                    </span>
                  </span>
                ))}
              </div>

              {/* region chips */}
              <div className="absolute left-3 top-3 flex flex-wrap items-center gap-2 sm:left-5 sm:top-5">
                <span className="rounded-full border border-cream/15 bg-ink2/75 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-cream/80 backdrop-blur-md sm:px-3.5 sm:text-[9.5px] sm:tracking-[0.16em]">
                  {h.heroRegion}
                </span>
                <span className="hidden rounded-full border border-cream/15 bg-ink2/75 px-3.5 py-1.5 font-mono text-[9.5px] uppercase tracking-[0.16em] text-cream/80 backdrop-blur-md md:inline-flex">
                  {h.heroEo}
                </span>
              </div>

              {/* sustainability readout */}
              <div className="float-soft absolute left-[46%] top-5 hidden rounded-xl border border-cream/15 bg-ink2/75 px-4 py-3 text-left backdrop-blur-md md:block">
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-cream/55">
                  {h.heroIndex}
                </p>
                <p className="display mt-1 text-xl text-cream">
                  66<span className="text-cream/50">/100</span>{" "}
                  <span className="ml-1 align-middle font-mono text-[9px] uppercase tracking-widest text-mist">
                    {h.heroIndexGood}
                  </span>
                </p>
              </div>

              {/* live status */}
              <div className="absolute bottom-3 left-3 flex flex-wrap items-center gap-2 sm:bottom-5 sm:left-5">
                <span className="flex items-center gap-2 rounded-full border border-cream/15 bg-ink2/75 px-3 py-2 backdrop-blur-md">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-clay opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-clay" />
                  </span>
                  <span className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-cream/75 sm:text-[9px] sm:tracking-[0.16em]">
                    {h.heroStatus}
                  </span>
                </span>
                <span className="hidden items-center gap-1.5 rounded-full border border-cream/15 bg-ink2/75 px-3.5 py-2 font-mono text-[9px] uppercase tracking-[0.16em] text-cream/75 backdrop-blur-md sm:flex">
                  <span className="h-1.5 w-1.5 rounded-full bg-mist" />
                  {h.legendLow}
                  <span className="ml-1 h-1.5 w-1.5 rounded-full bg-gold" />
                  {h.legendWatch}
                  <span className="ml-1 h-1.5 w-1.5 rounded-full bg-clay" />
                  {h.legendAlert}
                </span>
              </div>
            </div>
            <p className="mt-4 text-center font-mono text-[9px] uppercase leading-relaxed tracking-[0.14em] text-fog sm:text-[9.5px] sm:tracking-[0.18em]">
              {h.heroCaption}
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ── Island marquee ───────────────────────────────────────────── */}
      <div className="overflow-hidden border-y border-line bg-paper py-5">
        <div className="marquee-track items-center">
          {[...h.islands, ...h.islands].map((n, i) => (
            <span key={i} className="flex items-center">
              <span className="display whitespace-nowrap text-2xl italic text-ink/65 md:text-3xl">
                {n}
              </span>
              <span className="mx-10 h-1.5 w-1.5 shrink-0 rounded-full bg-clay/60" />
            </span>
          ))}
        </div>
      </div>

      {/* ── Why it matters ───────────────────────────────────────────── */}
      <section className="border-b border-line bg-cream py-24 md:py-32">
        <Container className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionHead
                eyebrow={h.ovEyebrow}
                title={
                  <>
                    {h.ovTitleA}
                    <br />
                    <em className="text-clay"><Wavy text={h.ovTitleB} /></em>
                  </>
                }
              />
              <Reveal delay={220}>
                <p className="text-body mt-6 max-w-md text-smoke">{h.ovBody}</p>
              </Reveal>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
              {h.stats.map((s, i) => (
                <Reveal key={s.label} delay={i * 90}>
                  <p className="display text-5xl font-medium tracking-tight text-ink md:text-[3.4rem]">
                    <Counter to={s.to} suffix={s.suffix} />
                  </p>
                  <p className="text-small mt-2.5 max-w-[10rem] text-fog">{s.label}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── The twin, live — platform previews ────────────────────────── */}
      <section className="relative overflow-hidden border-b border-line bg-ink2 py-24 text-cream md:py-32">
        <div className="absolute inset-0 bg-grid-dark" />
        <Container className="relative">
          <SectionHead
            dark
            align="center"
            eyebrow={h.preEyebrow}
            title={
              <>
                {h.preTitleA} <em className="text-clay"><Wavy text={h.preTitleB} /></em>
              </>
            }
            lede={h.preLede}
          />

          <div className="mx-auto mt-16 grid max-w-6xl gap-6 md:grid-cols-2">
            {/* Web dashboard */}
            <Reveal delay={120}>
              <div className="group flex h-full flex-col rounded-2xl border border-cream/12 bg-cream/[0.04] p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-clay/50">
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-clay">
                  {d.eyebrow}
                </p>
                <p className="display mt-3 text-2xl font-medium tracking-tight text-cream">
                  {d.crumb}
                </p>
                <ul className="mt-6 flex-1 space-y-3.5 border-t border-cream/10 pt-6">
                  {d.features.slice(0, 3).map((f) => (
                    <li key={f.title} className="text-small flex items-start gap-2.5 text-cream/75">
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-clay" />
                      <span>
                        <strong className="font-semibold text-cream">{f.title}:</strong>{" "}
                        {f.desc}
                      </span>
                    </li>
                  ))}
                  <li className="text-small flex items-start gap-2.5 pt-1 text-cream/65">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-clay" />
                    <span>
                      <strong className="font-semibold text-cream">{isEl ? "Δυνατότητες" : "Capabilities"}:</strong>{" "}
                      <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-fog">
                        {d.meta.join(" · ")}
                      </span>
                    </span>
                  </li>
                </ul>
                <Link
                  to="/platform/dashboard"
                  className="mt-7 inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.16em] text-clay underline underline-offset-4 transition-colors hover:text-cream"
                >
                  {h.platLinks[0]}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.75} />
                </Link>
              </div>
            </Reveal>

            {/* Mobile app */}
            <Reveal delay={220}>
              <div className="group flex h-full flex-col rounded-2xl border border-cream/12 bg-cream/[0.04] p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-clay/50">
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-clay">
                  {m.eyebrow}
                </p>
                <p className="display mt-3 text-2xl font-medium tracking-tight text-cream">
                  {m.crumb}
                </p>
                <ul className="mt-6 flex-1 space-y-3.5 border-t border-cream/10 pt-6">
                  {m.checks.slice(0, 3).map((chk) => {
                    const colonIdx = chk.indexOf(":");
                    const hasColon = colonIdx > -1 && colonIdx < 35;
                    const label = hasColon ? chk.slice(0, colonIdx) : null;
                    const rest = hasColon ? chk.slice(colonIdx + 1).trim() : chk;
                    return (
                      <li key={chk} className="text-small flex items-start gap-2.5 text-cream/75">
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-clay" />
                        <span>
                          {label ? (
                            <>
                              <strong className="font-semibold text-cream">{label}:</strong>{" "}
                              {rest}
                            </>
                          ) : (
                            chk
                          )}
                        </span>
                      </li>
                    );
                  })}
                  <li className="text-small flex items-start gap-2.5 pt-1 text-cream/65">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-clay" />
                    <span>
                      <strong className="font-semibold text-cream">{isEl ? "Πρότυπα" : "Standards"}:</strong>{" "}
                      <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-fog">
                        {m.meta.join(" · ")}
                      </span>
                    </span>
                  </li>
                </ul>
                <Link
                  to="/platform/mobile-app"
                  className="mt-7 inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.16em] text-clay underline underline-offset-4 transition-colors hover:text-cream"
                >
                  {h.platLinks[1]}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.75} />
                </Link>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Explore the twin — portal ────────────────────────────────── */}
      <section className="bg-paper py-24 md:py-32">
        <Container>
          <SectionHead
            align="center"
            eyebrow={h.exploreEyebrow}
            title={h.exploreTitle}
            lede={h.exploreLede}
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {h.explore.map((e, i) => {
              const Icon = EXPLORE_ICONS[i];
              return (
                <Reveal key={e.to} delay={(i % 3) * 90}>
                  <Link
                    to={e.to}
                    className="group flex h-full flex-col rounded-2xl border border-line bg-cream/70 p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-clay/40 hover:shadow-[0_30px_60px_-24px_rgba(30,34,29,0.35)]"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-clay/10 text-clay transition-colors duration-300 group-hover:bg-clay group-hover:text-cream">
                      <Icon className="h-4.5 w-4.5" strokeWidth={1.75} />
                    </span>
                    <h3 className="display mt-6 text-xl font-medium tracking-tight text-ink">
                      {e.title}
                    </h3>
                    <p className="text-body mt-2.5 flex-1 text-smoke">{e.desc}</p>
                    <span className="mt-6 inline-flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-claydeep">
                      {t.nav.explore}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.75} />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>
    </main>
  );
}