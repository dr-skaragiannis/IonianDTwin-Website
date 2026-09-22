import { Link } from "react-router-dom";
import { ArrowRight, Radar, Wifi } from "lucide-react";
import { useT } from "../i18n";
import { useSubNav } from "../i18n/menu";
import { ArrowLink, Container, PageHero, Reveal, SectionHead, Wavy } from "../components/ui";

const SCALE_ICONS = [Wifi, Radar];
const PILLAR_LINKS = ["/platform/dashboard", "/platform/mobile-app", "/platform/intelligence"];

export default function Platform() {
  const t = useT();
  const p = t.platform;

  return (
    <main>
      <PageHero
        eyebrow={p.eyebrow}
        trail={[{ label: t.nav.home, to: "/" }, { label: t.nav.platform }]}
        subNav={useSubNav("/platform")}
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
          <SectionHead eyebrow={p.piEyebrow} title={p.piTitle} lede={p.piLede} />
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {t.pillars.map((pill, i) => (
              <Reveal key={pill.title} delay={i * 100}>
                <div className="group flex h-full flex-col rounded-2xl border border-line bg-paper p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-clay/40 hover:shadow-[0_30px_60px_-24px_rgba(30,34,29,0.35)]">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-clay/10 font-mono text-sm font-semibold text-clay transition-colors duration-300 group-hover:bg-clay group-hover:text-cream">
                    {`0${i + 1}`}
                  </span>
                  <h3 className="display mt-6 text-2xl font-medium tracking-tight text-ink">
                    {pill.title}
                  </h3>
                  <p className="text-body mt-3 flex-1 text-smoke">{pill.desc}</p>
                  <ul className="mt-6 space-y-2.5 border-t border-line pt-5">
                    {pill.points.map((pt) => (
                      <li key={pt} className="text-small flex items-start gap-2.5 text-smoke">
                        <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-clay" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <ArrowLink to={PILLAR_LINKS[i]}>{t.home.platLinks[i]}</ArrowLink>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-paper py-24 md:py-28">
        <Container>
          <SectionHead align="center" eyebrow={p.scEyebrow} title={p.scTitle} />
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {p.scales.map((s, i) => {
              const Icon = SCALE_ICONS[i];
              return (
                <Reveal key={s.level} delay={i * 100}>
                  <div className="h-full rounded-2xl border border-line bg-cream/60 p-8 transition-colors hover:border-clay/40">
                    <div className="flex items-center justify-between">
                      <Icon className="h-5 w-5 text-clay" strokeWidth={1.75} />
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-fog">
                        {s.scope}
                      </span>
                    </div>
                    <p className="display mt-6 text-3xl font-medium tracking-tight text-ink">
                      {s.level}
                    </p>
                    <p className="text-body mt-3 text-smoke">{s.desc}</p>
                    <ul className="mt-6 space-y-2.5 border-t border-line pt-5">
                      {s.points.map((pt) => (
                        <li key={pt} className="text-small flex items-center gap-2.5 text-smoke">
                          <span className="h-1 w-1 rounded-full bg-clay" />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
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
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-smoke">{p.ctaLede}</p>
          </Reveal>
          <Reveal delay={200}>
            <Link to="/platform/dashboard" className="btn-primary group mt-8">
              {p.ctaBtn}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.75} />
            </Link>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
