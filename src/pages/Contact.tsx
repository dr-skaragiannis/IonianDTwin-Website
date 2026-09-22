import { useState } from "react";
import {
  ArrowUpRight,
  Building2 as BuildingIcon,
  ChevronDown,
  Clock,
  Globe,
  Mail,
  Mail as MailIcon,
  MapPin,
  ShieldAlert,
  Users as UsersIcon,
} from "lucide-react";
import { useT } from "../i18n";
import { Container, PageHero, Reveal, SectionHead, Wavy } from "../components/ui";

const AUDIENCE_ICONS = ["users", "building", "mail"] as const;

function AudienceIcon({ name }: { name: (typeof AUDIENCE_ICONS)[number] }) {
  const p = { className: "h-4 w-4", strokeWidth: 1.75 } as const;
  if (name === "users") return <UsersIcon {...p} />;
  if (name === "building") return <BuildingIcon {...p} />;
  return <MailIcon {...p} />;
}

export default function Contact() {
  const t = useT();
  const p = t.contact;
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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

      {/* Info Cards */}
      <section className="border-b border-line bg-cream py-24 md:py-28">
        <Container>
          <div className="grid gap-5 md:grid-cols-3">
            <Reveal>
              <div className="h-full rounded-2xl border border-line bg-paper p-7">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-clay">
                  {p.leadTag}
                </p>
                <p className="display mt-3 text-xl font-medium tracking-tight text-ink">
                  {p.leadName}
                </p>
                <p className="text-small mt-1 leading-relaxed text-smoke">{p.leadSub}</p>
                <ul className="mt-5 space-y-3 text-[0.9375rem] text-smoke">
                  <li className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-clay" strokeWidth={1.75} />
                    {p.leadAddr}
                  </li>
                  <li className="flex items-center gap-3">
                    <Mail className="h-3.5 w-3.5 shrink-0 text-clay" strokeWidth={1.75} />
                    <a href={`mailto:${t.footer.email}`} className="link-underline">
                      {t.footer.email}
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <Globe className="h-3.5 w-3.5 shrink-0 text-clay" strokeWidth={1.75} />
                    <a href="https://ionio.gr" target="_blank" rel="noreferrer" className="link-underline">
                      ionio.gr
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <Clock className="h-3.5 w-3.5 shrink-0 text-clay" strokeWidth={1.75} />
                    {p.leadReply}
                  </li>
                </ul>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="h-full rounded-2xl border border-line bg-paper p-7">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-clay">
                  {p.authTag}
                </p>
                <p className="display mt-3 text-xl font-medium tracking-tight text-ink">
                  {p.authName}
                </p>
                <p className="mt-1 text-[13px] leading-relaxed text-smoke">{p.authSub}</p>
                <a
                  href="https://pepionia.gr"
                  target="_blank"
                  rel="noreferrer"
                  className="group mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-ink link-underline"
                >
                  pepionia.gr
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.75} />
                </a>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="h-full rounded-2xl border border-line bg-ink2 p-7 text-cream">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-clay">
                  {p.whoTag}
                </p>
                <ul className="mt-4 space-y-4">
                  {p.audiences.map((a, i) => (
                    <li key={a.t} className="flex gap-3.5">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cream/10 text-clay">
                        <AudienceIcon name={AUDIENCE_ICONS[i]} />
                      </span>
                      <div>
                        <p className="text-[0.9375rem] font-medium">{a.t}</p>
                        <p className="text-small mt-0.5 leading-snug text-cream/55">{a.d}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* DPO Protection of Personal Data */}
      <section className="border-b border-line bg-paper py-24 md:py-28">
        <Container className="max-w-3xl">
          <SectionHead align="center" eyebrow={p.dpoTag} title={p.dpoTitle} />
          <Reveal delay={80}>
            <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-line bg-cream p-8 text-center">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-clay/10 text-clay">
                <ShieldAlert className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <p className="text-body mt-5 leading-relaxed text-smoke">{p.dpoBody}</p>
              <a
                href={p.dpoUrl}
                target="_blank"
                rel="noreferrer"
                className="group mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-cream transition-colors hover:bg-clay hover:text-cream"
              >
                {p.dpoLink}
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.75} />
              </a>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* FAQ */}
      <section className="bg-cream py-24 md:py-28">
        <Container className="max-w-3xl">
          <SectionHead align="center" eyebrow={p.faqEyebrow} title={p.faqTitle} />
          <div className="mt-12">
            {p.faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <Reveal key={f.q} delay={i * 60}>
                  <div className="border-b border-line first:border-t">
                    <button
                      onClick={() => setOpenFaq(open ? null : i)}
                      aria-expanded={open}
                      className="flex w-full items-center justify-between gap-4 py-5 text-left"
                    >
                      <span className="text-[1.0625rem] font-medium text-ink">{f.q}</span>
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 text-clay transition-transform duration-300 ${
                          open ? "rotate-180" : ""
                        }`}
                        strokeWidth={1.75}
                      />
                    </button>
                    <div
                      className={`grid transition-all duration-500 ${
                        open ? "grid-rows-[1fr] pb-5 opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="text-body max-w-xl text-smoke">{f.a}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>
    </main>
  );
}
