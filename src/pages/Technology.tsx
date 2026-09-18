import { Accessibility, Activity, Scale, ShieldCheck } from "lucide-react";
import { useT, useC } from "../i18n";
import { useSubNav } from "../i18n/menu";
import { Container, PageHero, Reveal, SectionHead, Wavy } from "../components/ui";

const ACCESS_ICONS = [Accessibility, Scale, ShieldCheck];

export default function Technology() {
  const t = useT();
  const c = useC();
  const p = t.technology;

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

      <section className="border-b border-line bg-cream py-24 md:py-28">
        <Container>
          <SectionHead eyebrow={p.stEyebrow} title={p.stTitle} lede={p.stLede} />
          <Reveal delay={160}>
            <div className="mt-14 overflow-hidden rounded-2xl border border-line bg-paper">
              {c.STACK.map((row, i) => (
                <div
                  key={row.layer}
                  className="row-hover grid gap-3 border-b border-line px-6 py-5 last:border-b-0 lg:grid-cols-[2.5rem_13.5rem_1fr_13rem] lg:items-center lg:gap-5"
                >
                  <span className="font-mono text-[10px] tracking-[0.2em] text-fog">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-[0.9375rem] font-semibold text-ink">{row.layer}</p>
                    <p className="mt-0.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-fog">
                      {row.desc}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {row.tech.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-line bg-cream/70 px-3 py-1 text-[0.75rem] font-medium text-smoke transition-colors hover:border-clay/50 hover:text-claydeep"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="hidden h-1 w-full overflow-hidden rounded-full bg-line lg:block">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-sea via-gold to-clay"
                      style={{ width: `${88 - i * 5}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="border-b border-line bg-paper py-24 md:py-28">
        <Container>
          <SectionHead align="center" eyebrow={p.acEyebrow} title={p.acTitle} lede={p.acLede} />
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {p.access.map((a, i) => {
              const Icon = ACCESS_ICONS[i];
              return (
                <Reveal key={a.title} delay={i * 90}>
                  <div className="h-full rounded-2xl border border-line bg-cream/60 p-7 transition-colors hover:border-clay/40">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-sea/10 text-sea">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <h3 className="display mt-6 text-xl font-medium tracking-tight text-ink">
                      {a.title}
                    </h3>
                    <p className="text-body mt-2.5 text-smoke">{a.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-ink2 py-24 text-cream md:py-28">
        <div className="absolute inset-0 bg-grid-dark" />
        <Container className="relative">
          <SectionHead dark eyebrow={p.opEyebrow} title={p.opTitle} lede={p.opLede} />
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {p.ops.map((o, i) => (
              <Reveal key={o.t} delay={i * 90}>
                <div className="h-full rounded-2xl border border-cream/12 bg-cream/[0.04] p-7 transition-colors hover:border-clay/40">
                  <Activity className="h-5 w-5 text-clay" strokeWidth={1.75} />
                  <p className="display mt-5 text-xl font-medium">{o.t}</p>
                  <p className="text-body mt-2.5 text-cream/60">{o.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
