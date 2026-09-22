import { Link } from "react-router-dom";
import { Activity, ArrowRight, Database, EyeOff, Radio } from "lucide-react";
import { useT } from "../i18n";
import { useSubNav } from "../i18n/menu";
import { Container, PageHero, Reveal, SectionHead, Wavy } from "../components/ui";
import ArchitectureExplorer from "../components/ArchitectureExplorer";
import sensorStationImg from "../assets/sensor-station.jpg";

const TRAIT_ICONS = [Database, Radio, Activity, EyeOff];

export default function Architecture() {
  const t = useT();
  const p = t.architecture;

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
          <Reveal>
            <ArchitectureExplorer />
          </Reveal>
        </Container>
      </section>

      <section className="border-b border-line bg-cream py-24 md:py-28">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <figure className="relative overflow-hidden rounded-2xl border border-ink/12 shadow-[0_30px_60px_-28px_rgba(19,18,16,0.45)]">
              <img
                src={sensorStationImg}
                alt={p.figTag}
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink2/50 via-transparent to-transparent" />
              <figcaption className="absolute bottom-4 left-4 right-4 rounded-full border border-cream/20 bg-ink2/60 px-3.5 py-1.5 text-center font-mono text-[9px] uppercase tracking-[0.14em] text-cream/80 backdrop-blur">
                {p.figTag}
              </figcaption>
            </figure>
          </Reveal>
          <div>
            <SectionHead eyebrow={p.sEyebrow} title={p.sTitle} lede={p.sLede} />
            <a
              href={p.peopleFlowsUrl}
              target="_blank"
              rel="noreferrer"
              className="link-underline mt-4 inline-flex text-[13px] font-medium text-claydeep"
            >
              {p.peopleFlowsLabel}
            </a>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {p.traits.map((tr, i) => {
                const Icon = TRAIT_ICONS[i];
                return (
                  <Reveal key={tr.title} delay={i * 80}>
                    <div className="h-full rounded-xl border border-line bg-paper p-5 transition-colors hover:border-clay/40">
                      <Icon className="h-4.5 w-4.5 text-clay" strokeWidth={1.75} />
                      <p className="mt-3 text-[0.9375rem] font-semibold text-ink">{tr.title}</p>
                      <p className="text-small mt-1.5 text-smoke">{tr.desc}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-paper py-20">
        <Container className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <Reveal>
            <div>
              <p className="display text-2xl font-medium tracking-tight text-ink md:text-3xl">
                {p.nextTitle}
              </p>
              <p className="text-body mt-2 max-w-xl text-smoke">{p.nextLede}</p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <Link to="/resources/data-sources" className="btn-primary group">
              {p.nextBtn}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.75} />
            </Link>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
