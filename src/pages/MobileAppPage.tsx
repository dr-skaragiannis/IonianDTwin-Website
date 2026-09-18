import { Check } from "lucide-react";
import { useT } from "../i18n";
import { useSubNav } from "../i18n/menu";
import { Container, PageHero, Reveal, SectionHead, Tag, Wavy } from "../components/ui";
import PhoneDemo from "../components/PhoneDemo";

export default function MobileAppPage() {
  const t = useT();
  const p = t.mobile;

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

      <section className="relative overflow-hidden border-b border-cream/10 bg-ink2 py-24 text-cream md:py-32">
        <div className="absolute inset-0 bg-grid-dark" />
        <Container className="relative grid items-center gap-16 lg:grid-cols-2">
          <div>
            <SectionHead
              dark
              eyebrow={p.aEyebrow}
              title={
                <>
                  {p.aTitleA} <em className="text-clay"><Wavy text={p.aTitleB} /></em>
                </>
              }
              lede={p.aLede}
            />
            <div className="mt-9 space-y-3.5">
              {p.checks.map((pt, i) => (
                <Reveal key={pt} delay={i * 70}>
                  <div className="flex items-start gap-3 text-[14px] text-cream/80">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-mist/15">
                      <Check className="h-3 w-3 text-mist" strokeWidth={2} />
                    </span>
                    {pt}
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={280}>
              <div className="mt-8 flex flex-wrap gap-2">
                <Tag dark>WCAG 2.0 AA</Tag>
                <Tag dark>Ν. 4074/2012</Tag>
                <Tag dark>Offline-first</Tag>
                <Tag dark>EL · EN</Tag>
              </div>
            </Reveal>
          </div>
          <Reveal delay={180}>
            <PhoneDemo />
          </Reveal>
        </Container>
      </section>

      <section className="border-b border-line bg-cream py-24 md:py-28">
        <Container>
          <SectionHead eyebrow={p.nEyebrow} title={p.nTitle} lede={p.nLede} />
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {p.steps.map((s, i) => (
              <Reveal key={s.t} delay={i * 100}>
                <div className="h-full rounded-2xl border border-line bg-paper p-7 transition-colors hover:border-clay/40">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-clay/10 font-mono text-sm font-semibold text-clay">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="display mt-6 text-xl font-medium tracking-tight text-ink">{s.t}</p>
                  <p className="mt-2.5 text-[13.5px] leading-relaxed text-smoke">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden border-b border-cream/10 bg-ink2 py-24 text-cream md:py-28">
        <div className="absolute inset-0 bg-grid-dark" />
        <Container className="relative">
          <SectionHead
            dark
            eyebrow={p.csEyebrow}
            title={p.csTitle}
            lede={p.csLede}
          />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {p.csChecks.map((ck, i) => (
              <Reveal key={ck} delay={i * 90}>
                <div className="flex h-full items-start gap-3 rounded-2xl border border-cream/12 bg-cream/[0.04] p-6 text-[14px] leading-relaxed text-cream/80">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-mist/15">
                    <Check className="h-3 w-3 text-mist" strokeWidth={2} />
                  </span>
                  {ck}
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-paper py-20">
        <Container className="flex flex-col items-center text-center">
          <Reveal>
            <h2 className="display max-w-2xl text-3xl font-medium tracking-tight text-ink md:text-4xl">
              {p.ctaTitle} <em className="text-clay"><Wavy text={p.ctaB} /></em>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-smoke">{p.ctaLede}</p>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
