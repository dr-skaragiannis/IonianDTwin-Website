import { ArrowUpRight, ShieldAlert } from "lucide-react";
import { useT } from "../i18n";
import { Container, PageHero, Reveal, Wavy } from "../components/ui";

export default function Privacy() {
  const t = useT();
  const p = t.privacy;

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main>
      <PageHero
        eyebrow={p.eyebrow}
        trail={[{ label: t.nav.home, to: "/" }, { label: p.crumb }]}
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
          <div className="mb-4">
            <Reveal>
              <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-clay">
                {p.lastUpdated}
              </p>
            </Reveal>
          </div>
          <div className="grid gap-8 lg:grid-cols-[1.2fr_2fr] lg:gap-16">
            <nav aria-label="Privacy sections" className="lg:sticky lg:top-8 lg:self-start">
              <Reveal>
                <ul className="space-y-3 border-l border-line pl-4">
                  {p.sections.map((s, i) => (
                    <li key={s.title}>
                      <button
                        type="button"
                        onClick={() => scrollTo(`privacy-${i + 1}`)}
                        className="text-left font-mono text-[0.8125rem] uppercase tracking-[0.14em] text-smoke transition-colors hover:text-ink"
                      >
                        {s.title}
                      </button>
                    </li>
                  ))}
                  <li>
                    <button
                      type="button"
                      onClick={() => scrollTo("privacy-cookies")}
                      className="text-left font-mono text-[0.8125rem] uppercase tracking-[0.14em] text-smoke transition-colors hover:text-ink"
                    >
                      {p.cookiesTitle}
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => scrollTo("privacy-scripts")}
                      className="text-left font-mono text-[0.8125rem] uppercase tracking-[0.14em] text-smoke transition-colors hover:text-ink"
                    >
                      {p.scriptHeading}
                    </button>
                  </li>
                </ul>
              </Reveal>
            </nav>

            <div className="space-y-12">
              {p.sections.map((s, i) => (
                <Reveal key={s.title} delay={i * 40}>
                  <section id={`privacy-${i + 1}`} className="scroll-mt-24">
                    <h2 className="display text-2xl font-medium tracking-tight text-ink md:text-3xl">
                      {s.title}
                    </h2>
                    <p className="text-body mt-4 max-w-2xl leading-relaxed text-smoke">
                      {s.body}
                    </p>
                  </section>
                </Reveal>
              ))}

              <Reveal delay={80}>
                <section id="privacy-cookies" className="scroll-mt-24">
                  <h2 className="display text-2xl font-medium tracking-tight text-ink md:text-3xl">
                    {p.cookiesTitle}
                  </h2>
                  <p className="text-body mt-4 max-w-2xl leading-relaxed text-smoke">
                    {p.cookiesIntro}
                  </p>

                  <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-paper">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-line bg-cream">
                            <th className="px-5 py-3 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-clay">{p.thName}</th>
                            <th className="px-5 py-3 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-clay">{p.thType}</th>
                            <th className="px-5 py-3 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-clay">{p.thPurpose}</th>
                            <th className="px-5 py-3 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-clay">{p.thData}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-line">
                          {p.cookies.map((c) => (
                            <tr key={c.name} className="align-top">
                              <td className="px-5 py-4 font-mono text-[0.8125rem] text-ink">{c.name}</td>
                              <td className="px-5 py-4 text-[0.875rem] text-smoke">{c.type}</td>
                              <td className="px-5 py-4 text-[0.875rem] leading-relaxed text-smoke">{c.purpose}</td>
                              <td className="px-5 py-4 text-[0.875rem] text-smoke">{c.data}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <p className="text-small mt-4 leading-relaxed text-smoke">{p.cookieNote}</p>
                </section>
              </Reveal>

              <Reveal delay={100}>
                <section id="privacy-scripts" className="scroll-mt-24">
                  <h2 className="display text-2xl font-medium tracking-tight text-ink md:text-3xl">
                    {p.scriptHeading}
                  </h2>
                  <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-paper">
                    {p.scripts.map((s, i) => (
                      <div key={s.name} className={`px-5 py-5 ${i > 0 ? "border-t border-line" : ""}`}>
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h3 className="text-[1.0625rem] font-medium text-ink">{s.name}</h3>
                          <span className="rounded-full border border-line bg-cream px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-smoke">{s.layer}</span>
                        </div>
                        <p className="text-body mt-2 max-w-2xl leading-relaxed text-smoke">{s.purpose}</p>
                        <p className="mt-2 font-mono text-[0.75rem] tracking-wide text-clay">{s.provider}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-small mt-4 leading-relaxed text-smoke">{p.scriptNote}</p>
                </section>
              </Reveal>

              <Reveal delay={120}>
                <section id="privacy-dpo" className="scroll-mt-24 rounded-2xl border border-line bg-ink2 p-8 text-cream">
                  <div className="flex items-center gap-3">
                    <ShieldAlert className="h-5 w-5 text-clay" strokeWidth={1.75} />
                    <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-clay">
                      {p.sections[p.sections.length - 1].title}
                    </p>
                  </div>
                  <p className="text-body mt-4 max-w-2xl leading-relaxed text-cream/70">
                    {p.sections[p.sections.length - 1].body}
                  </p>
                  <a
                    href={p.dpoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group mt-6 inline-flex items-center gap-2 rounded-full bg-cream px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-clay hover:text-cream"
                  >
                    {p.dpoLink}
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.75} />
                  </a>
                </section>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
