import { ArrowUpRight } from "lucide-react";
import { useT, useC } from "../i18n";
import { useSubNav } from "../i18n/menu";
import { ArrowLink, Container, PageHero, Reveal, SectionHead, Wavy } from "../components/ui";

export default function RelatedProjectsPage() {
  const t = useT();
  const c = useC();
  const p = t.related;

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

      <section className="border-b border-line bg-cream py-24 md:py-28">
        <Container>
          <SectionHead eyebrow={p.ey} title={p.title} />
          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {c.RELATED.map((r, i) => (
              <Reveal key={r.name} delay={(i % 3) * 80}>
                <a
                  href={r.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-full flex-col rounded-2xl border border-line bg-paper p-6 transition-all duration-500 hover:-translate-y-1 hover:border-clay/40 hover:shadow-[0_24px_48px_-22px_rgba(19,18,16,0.35)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="display text-lg font-medium leading-snug tracking-tight text-ink">
                      {r.name}
                    </p>
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line text-fog transition-all duration-300 group-hover:border-clay group-hover:bg-clay group-hover:text-cream">
                      <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.75} />
                    </span>
                  </div>
                  <p className="mt-3 flex-1 text-[13px] leading-relaxed text-smoke">{r.desc}</p>
                </a>
              </Reveal>
            ))}
          </div>
          <Reveal delay={260}>
            <div className="mt-12 flex justify-center">
              <ArrowLink to="/resources/references">{p.link}</ArrowLink>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
