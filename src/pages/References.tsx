import { ArrowUpRight } from "lucide-react";
import { useT, useC } from "../i18n";
import { useSubNav } from "../i18n/menu";
import { ArrowLink, Container, EuFlag, PageHero, Reveal, SectionHead, Wavy } from "../components/ui";

export default function References() {
  const t = useT();
  const c = useC();
  const p = t.references;

  return (
    <main>
      <PageHero
        eyebrow={p.eyebrow}
        trail={[{ label: t.nav.home, to: "/" }, { label: t.nav.resources }, { label: p.crumb }]}
        subNav={useSubNav("/resources")}
        title={
          <>
            {p.titleA} <em className="text-clay"><Wavy text={p.titleB} /></em>
          </>
        }
        lede={p.lede}
        meta={p.meta}
      />

      <section className="border-b border-line bg-paper py-24 md:py-28">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead eyebrow={p.gEyebrow} title={p.gTitle} />
            <ArrowLink to="/resources/related-projects" className="mb-2">
              {p.link}
            </ArrowLink>
          </div>
          <div className="mt-14 grid gap-x-10 gap-y-14 md:grid-cols-2">
            {c.REFERENCE_GROUPS.map((g, gi) => (
              <Reveal key={g.title} delay={(gi % 2) * 80}>
                <div>
                  <div className="flex items-center gap-3 border-b border-line pb-4">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-clay/10 font-mono text-[11px] font-semibold text-clay">
                      {String(gi + 1).padStart(2, "0")}
                    </span>
                    <h3 className="display text-xl font-medium tracking-tight text-ink">{g.title}</h3>
                    <span className="ml-auto font-mono text-[10px] text-fog">
                      {String(g.items.length).padStart(2, "0")}
                    </span>
                  </div>
                  <ul>
                    {g.items.map((item) => (
                      <li key={item.label} className="border-b border-line last:border-b-0">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                          className="group flex items-center justify-between gap-4 py-4"
                        >
                          <div>
                            <p className="text-[14px] font-medium text-ink transition-colors group-hover:text-claydeep">
                              {item.label}
                            </p>
                            <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-fog">
                              {item.source}
                            </p>
                          </div>
                          <ArrowUpRight className="h-4 w-4 shrink-0 text-fog transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-clay" strokeWidth={1.75} />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-ink2 py-20 text-cream">
        <div className="absolute inset-0 bg-grid-dark" />
        <Container className="relative">
          <Reveal>
            <div className="flex items-start gap-5">
              <EuFlag className="mt-1 h-8 w-12 shrink-0" />
              <div>
                <p className="display max-w-xl text-xl font-medium leading-snug tracking-tight md:text-2xl">
                  {p.ack}
                </p>
                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-cream/45">
                  {p.ackSrc}
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
