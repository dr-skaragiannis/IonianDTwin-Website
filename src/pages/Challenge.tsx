import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useT, useC } from "../i18n";
import { useSubNav } from "../i18n/menu";
import { Container, PageHero, Reveal, SectionHead, Wavy } from "../components/ui";
/* Served from /public for a smaller HTML bundle + separate image caching. */
const CROWD_IMG = "./images/crowd.jpg";

/** Higher score = stronger sustainability */
function scoreColor(s: number) {
  if (s >= 75) return "#2F7D4A";
  if (s >= 60) return "#0F80C5";
  if (s >= 50) return "#E4B671";
  return "#C8502E";
}

export default function Challenge() {
  const t = useT();
  const c = useC();
  const p = t.sustainability;

  return (
    <main>
      <PageHero
        eyebrow={p.eyebrow}
        trail={[{ label: t.nav.home, to: "/" }, { label: t.nav.about }, { label: p.crumb }]}
        subNav={useSubNav("/about")}
        title={
          <>
            {p.titleA} <em className="text-clay"><Wavy text={p.titleB} /></em>
          </>
        }
        lede={p.lede}
        meta={p.meta}
      />

      <section className="border-b border-line bg-cream py-16 md:py-20">
        <Container>
          <Reveal>
            <figure className="relative overflow-hidden rounded-2xl border border-ink/12">
              <img
                src={CROWD_IMG}
                alt={p.figCaption}
                className="aspect-[21/9] w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink2/60 via-transparent to-transparent" />
              <figcaption className="absolute bottom-5 left-5 right-5 flex flex-wrap items-end justify-between gap-3">
                <p className="max-w-lg text-[13px] leading-relaxed text-cream/85">{p.figCaption}</p>
                <span className="rounded-full border border-cream/20 bg-ink2/60 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-cream/70 backdrop-blur">
                  {p.figTag}
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </Container>
      </section>

      <section className="border-b border-line bg-cream py-24 md:py-28">
        <Container>
          <SectionHead eyebrow={p.pEyebrow} title={p.pTitle} lede={p.pLede} />
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {c.PILLARS.map((pill, i) => (
              <Reveal key={pill.title} delay={(i % 3) * 90}>
                <div className="group flex h-full flex-col rounded-2xl border border-line bg-paper p-7 transition-all duration-500 hover:-translate-y-1 hover:border-clay/40 hover:shadow-[0_26px_52px_-24px_rgba(30,34,29,0.35)]">
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-clay/10 text-clay transition-colors duration-300 group-hover:bg-clay group-hover:text-cream">
                      <pill.icon className="h-4.5 w-4.5" strokeWidth={1.75} />
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.2em] text-fog">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="display mt-6 text-xl font-medium tracking-tight text-ink">
                    {pill.title}
                  </h3>
                  <p className="text-body mt-2.5 flex-1 text-smoke">{pill.body}</p>
                  <p className="mt-5 border-t border-line pt-4 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-clay">
                    {pill.impact}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-ink2 py-24 text-cream md:py-28">
        <div className="absolute inset-0 bg-grid-dark" />
        <Container className="relative">
          <Reveal>
            <p className="display mx-auto max-w-3xl text-center text-2xl leading-snug font-medium tracking-tight md:text-[2.6rem]">
              {p.quote}
            </p>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-cream/45">
              {p.quoteSrc}
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="border-b border-line bg-cream py-24 md:py-28">
        <Container>
          <SectionHead eyebrow={p.islEyebrow} title={p.islTitle} lede={p.islLede} />
          <div className="mt-14 overflow-hidden rounded-2xl border border-line bg-paper">
            {c.ISLANDS.map((island, i) => (
              <Reveal key={island.name} delay={i * 60}>
                <div className="row-hover grid items-center gap-3 border-b border-line px-6 py-5 last:border-b-0 sm:grid-cols-[11rem_1fr_7rem] sm:gap-4">
                  <div>
                    <p className="text-[15px] font-medium text-ink">{island.name}</p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-fog">
                      {island.greek}
                    </p>
                  </div>
                  <p className="text-small leading-relaxed text-smoke">{island.note}</p>
                  <div className="flex items-center gap-3">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-line">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{ width: `${island.score}%`, background: scoreColor(island.score) }}
                      />
                    </div>
                    <span className="w-9 text-right font-mono text-[11px] text-smoke">
                      {island.score}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
            <div className="bg-cream/60 px-6 py-3">
              <p className="font-mono text-[9px] uppercase leading-relaxed tracking-[0.14em] text-fog sm:text-[9.5px] sm:tracking-[0.16em]">
                {p.islNote}
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-paper py-24 md:py-28">
        <Container>
          <SectionHead align="center" eyebrow={p.objEyebrow} title={p.objTitle} lede={p.objLede} />
          <div className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-2">
            {c.OBJECTIVES.map((o, i) => (
              <Reveal key={o.n} delay={(i % 2) * 80}>
                <div className="flex gap-5 border-t border-line pt-6">
                  <span className="display text-2xl font-medium tracking-tight text-clay">{o.n}</span>
                  <div>
                    <h3 className="text-[1rem] font-semibold text-ink">{o.title}</h3>
                    <p className="text-body mt-2 text-smoke">{o.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-cream py-20">
        <Container className="flex flex-col items-center text-center">
          <Reveal>
            <h2 className="display max-w-2xl text-3xl font-medium tracking-tight text-ink md:text-5xl">
              {p.ctaA} <em className="text-clay"><Wavy text={p.ctaB} /></em>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <Link to="/platform" className="btn-primary group mt-8">
              {p.ctaBtn}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.75} />
            </Link>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
