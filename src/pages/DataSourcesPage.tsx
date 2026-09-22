import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useT, useC } from "../i18n";
import { useSubNav } from "../i18n/menu";
import { Container, PageHero, Reveal, SectionHead, Tag, Wavy } from "../components/ui";

export default function DataSourcesPage() {
  const t = useT();
  const c = useC();
  const p = t.dataSources;

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

      <section className="border-b border-line bg-paper py-16 md:py-20">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl rounded-2xl border border-line bg-cream/60 px-8 py-8 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-clay">
                {p.scaleEyebrow}
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-smoke">{p.scaleNote}</p>
              <Link
                to="/platform"
                className="mt-4 inline-flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-[0.16em] text-claydeep underline underline-offset-4 transition-colors hover:text-clay"
              >
                {p.scaleLink}
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="border-b border-line bg-cream py-24 md:py-28">
        <Container>
          <SectionHead eyebrow={p.tbEyebrow} title={p.tbTitle} lede={p.tbLede} />
          <Reveal delay={160}>
            <div className="mt-14 overflow-hidden rounded-2xl border border-line bg-paper">
              <div className="hidden grid-cols-[13rem_8rem_1fr_11rem] gap-4 border-b border-line bg-cream/60 px-6 py-3.5 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-fog lg:grid">
                <span>{p.thSource}</span>
                <span>{p.thType}</span>
                <span>{p.thData}</span>
                <span>{p.thAccess}</span>
              </div>
              {c.DATA_SOURCES.map((ds) => (
                <div
                  key={ds.source}
                  className="row-hover grid gap-3 border-b border-line px-6 py-4 last:border-b-0 lg:grid-cols-[13rem_8rem_1fr_11rem] lg:items-center lg:gap-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-clay/10 text-clay">
                      <ds.icon className="h-3.5 w-3.5" strokeWidth={1.75} />
                    </span>
                    <span className="text-[0.9375rem] font-semibold text-ink">{ds.source}</span>
                  </div>
                  <div>
                    <Tag>{ds.type}</Tag>
                  </div>
                  <p className="text-small leading-relaxed text-smoke">{ds.provides}</p>
                  <span className="font-mono text-[0.75rem] text-fog">{ds.access}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={220}>
            <p className="mt-6 max-w-2xl text-[13px] leading-relaxed text-fog">
              {p.note}{" "}
              <Link to="/about/architecture" className="text-claydeep underline underline-offset-2">
                {p.noteLink}
              </Link>
            </p>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
