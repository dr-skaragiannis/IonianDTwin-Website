import { Link } from "react-router-dom";
import { ArrowRight, Gauge } from "lucide-react";
import { useT } from "../i18n";
import { useSubNav } from "../i18n/menu";
import { Container, PageHero, Reveal, Wavy } from "../components/ui";
import DashboardMock from "../components/DashboardMock";

export default function DashboardPage() {
  const t = useT();
  const p = t.dashboard;

  return (
    <main>
      <PageHero
        eyebrow={p.eyebrow}
        trail={[
          { label: t.nav.home, to: "/" },
          { label: t.nav.platform, to: "/platform" },
          { label: p.crumb },
        ]}
        subNav={useSubNav("/platform")}
        title={
          <>
            {p.titleA} <em className="text-clay"><Wavy text={p.titleB} /></em>
          </>
        }
        lede={p.lede}
        meta={p.meta}
      />

      <section className="border-b border-line bg-cream py-20 md:py-24">
        <Container>
          <Reveal>
            <DashboardMock />
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {p.features.map((f, i) => (
              <Reveal key={f.title} delay={i * 80}>
                <div className="h-full rounded-2xl border border-line bg-paper p-5 transition-colors hover:border-clay/40">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-clay">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-3 text-[0.9375rem] font-semibold text-ink">{f.title}</p>
                  <p className="text-small mt-1.5 text-smoke">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-paper py-20">
        <Container className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <Reveal>
            <div className="flex items-start gap-5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-clay/10 text-clay">
                <Gauge className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <div>
                <p className="display text-2xl font-medium tracking-tight text-ink md:text-3xl">
                  {p.rollTitle}
                </p>
                <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-smoke">
                  {p.rollLede}
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <Link to="/indicators" className="btn-primary group shrink-0">
              {p.rollBtn}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.75} />
            </Link>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
