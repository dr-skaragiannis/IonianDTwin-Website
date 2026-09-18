import { ArrowUpRight, Building2, CalendarDays, Euro, Flag, Landmark, MapPin, Target, Workflow } from "lucide-react";
import { useT, useC } from "../i18n";
import { useSubNav } from "../i18n/menu";
import { ArrowLink, Container, PageHero, Reveal, SectionHead, Wavy } from "../components/ui";

const FUNDING_ICONS = [Workflow, Target, Target, Landmark, Building2, Euro, CalendarDays, MapPin];

export default function Project() {
  const t = useT();
  const c = useC();
  const p = t.project;

  return (
    <main>
      <PageHero
        eyebrow={p.eyebrow}
        trail={[{ label: t.nav.home, to: "/" }, { label: t.nav.about }, { label: p.crumb }]}
        subNav={useSubNav("/about")}
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
        <Container>
          <SectionHead eyebrow={p.fEyebrow} title={p.fTitle} />
          <div className="mt-14 grid gap-4 md:grid-cols-2">
            {c.FUNDING.map((f, i) => {
              const Icon = FUNDING_ICONS[i];
              return (
                <Reveal key={f.k} delay={(i % 2) * 80}>
                  <div className="flex gap-5 rounded-2xl border border-line bg-paper p-6 transition-all duration-500 hover:-translate-y-0.5 hover:border-clay/40">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-clay/10 text-clay">
                      <Icon className="h-4.5 w-4.5" strokeWidth={1.75} />
                    </span>
                    <div>
                      <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-fog">{f.k}</p>
                      <p className="mt-1.5 text-[0.9375rem] font-medium leading-snug text-ink">{f.v}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <Reveal delay={200}>
            <div className="mt-6 flex items-start gap-4 rounded-2xl border border-line bg-cream/60 px-6 py-5">
              <Flag className="mt-0.5 h-5 w-5 shrink-0 text-clay" strokeWidth={1.75} />
              <p className="text-body leading-relaxed text-smoke">{p.contextNote}</p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="border-b border-line bg-paper py-24 md:py-28">
        <Container>
          <SectionHead eyebrow={p.dEyebrow} title={p.dTitle} lede={p.dLede} />
          <Reveal delay={160}>
            <div className="mt-14 overflow-hidden rounded-2xl border border-line bg-cream/60">
              {c.DELIVERABLES.map((d) => (
                <div
                  key={d.id}
                  className="row-hover grid items-center gap-3 border-b border-line px-6 py-4 last:border-b-0 lg:grid-cols-[4rem_17.5rem_1fr_9.5rem] lg:items-center lg:gap-5"
                >
                  <span className="display text-xl font-medium tracking-tight text-clay">{d.id}</span>
                  <p className="text-[0.9375rem] font-semibold text-ink">{d.name}</p>
                  <p className="text-small leading-relaxed text-smoke">{d.desc}</p>
                  <span className="justify-self-start rounded-full border border-line bg-paper px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-smoke">
                    {d.phase}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-ink2 py-24 text-cream md:py-28">
        <div className="absolute inset-0 bg-grid-dark" />
        <Container className="relative">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead dark eyebrow={p.relEyebrow} title={p.relTitle} lede={p.relLede} />
            <ArrowLink to="/resources/related-projects" dark className="mb-2">
              {p.relLink}
            </ArrowLink>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {c.RELATED.slice(0, 4).map((r, i) => (
              <Reveal key={r.name} delay={i * 80}>
                <a
                  href={r.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-full flex-col rounded-2xl border border-cream/12 bg-cream/[0.04] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-clay/50"
                >
                  <div className="flex items-center justify-between">
                    <p className="display text-lg font-medium tracking-tight">{r.name}</p>
                    <ArrowUpRight className="h-4 w-4 text-cream/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-clay" strokeWidth={1.75} />
                  </div>
                  <p className="mt-2.5 flex-1 text-[13px] leading-relaxed text-cream/60">{r.desc}</p>
                </a>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-cream py-20">
        <Container className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <Reveal>
            <div>
              <p className="display max-w-2xl text-2xl font-medium tracking-tight text-ink md:text-3xl">
                {p.endTitle}
              </p>
              <p className="text-body mt-2 max-w-xl text-smoke">{p.endLede}</p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <ArrowLink to="/resources/references" className="shrink-0">
              {p.endLink}
            </ArrowLink>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
