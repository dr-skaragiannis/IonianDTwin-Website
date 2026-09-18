import { useT } from "../i18n";
import { useSubNav } from "../i18n/menu";
import { Container, PageHero, Reveal, SectionHead, Wavy } from "../components/ui";
import LLMDemo from "../components/LLMDemo";

export default function IntelligencePage() {
  const t = useT();
  const p = t.intelligence;

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

      <section className="border-b border-line bg-cream py-24 md:py-28">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHead eyebrow={p.hEyebrow} title={p.hTitle} lede={p.hLede} />
            <div className="mt-9">
              {p.steps.map((s, i) => (
                <Reveal key={s.n} delay={i * 90}>
                  <div className="flex gap-5 border-t border-line py-4 last:border-b">
                    <span className="font-mono text-[10px] tracking-[0.2em] text-clay">{s.n}</span>
                    <div>
                      <p className="text-[15px] font-medium text-ink">{s.t}</p>
                      <p className="mt-1 text-[13px] leading-relaxed text-smoke">{s.d}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal delay={160}>
            <LLMDemo />
          </Reveal>
        </Container>
      </section>

      <section className="border-b border-line bg-paper py-24 md:py-28">
        <Container>
          <SectionHead align="center" eyebrow={p.tEyebrow} title={p.tTitle} lede={p.tLede} />
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {p.trust.map((tr, i) => (
              <Reveal key={tr.t} delay={i * 100}>
                <div className="h-full rounded-2xl border border-line bg-cream/60 p-7 transition-colors hover:border-clay/40">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-sea/10 font-mono text-sm font-semibold text-sea">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="display mt-6 text-xl font-medium tracking-tight text-ink">{tr.t}</p>
                  <p className="mt-2.5 text-[13.5px] leading-relaxed text-smoke">{tr.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={260}>
            <div className="mt-10 rounded-2xl border border-line bg-cream/60 px-6 py-5 text-center">
              <p className="mx-auto max-w-xl text-[13.5px] leading-relaxed text-smoke">{p.note}</p>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
