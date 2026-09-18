import { Link } from "react-router-dom";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { useT } from "../i18n";
import { useMenu } from "../i18n/menu";
import LanguageSwitcher from "./LanguageSwitcher";
import PaletteSwitcher from "./PaletteSwitcher";
import { Container, EuFlag, LogoMark, Wavy } from "./ui";

export default function Footer() {
  const t = useT();
  const menu = useMenu();

  const aboutNav = menu.find((m) => m.children && m.to === undefined && m.children[0]?.to.startsWith("/about"))?.children ?? [];
  const platformNav = menu.find((m) => m.children?.[0]?.to === "/platform")?.children ?? [];
  const resourcesNav = menu.find((m) => m.children?.[0]?.to === "/resources/data-sources")?.children ?? [];

  const external = [
    { label: "PEP Ionian Islands / ΠΕΠ Ιονίων Νήσων", href: "https://pepionia.gr" },
    { label: "GSTC v2.0", href: "https://www.gstc.org/gstc-criteria/gstc-destination-criteria/" },
    { label: "Copernicus", href: "https://dataspace.copernicus.eu/" },
  ];

  return (
    <footer className="relative overflow-hidden bg-ink2 text-cream">
      <div className="absolute inset-0 bg-grid-dark" />
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[380px] w-[620px] -translate-x-1/2 rounded-full bg-clay/10 blur-3xl" />

      <Container className="relative border-b border-cream/10 pb-16 pt-20 md:pt-28">
        <div className="flex flex-col items-start justify-between gap-10 xl:flex-row xl:items-end">
          <div className="max-w-2xl">
            <span className="eyebrow eyebrow--dark">{t.footer.eyebrow}</span>
            <h2 className="display mt-6 text-4xl md:text-6xl leading-[1.04] font-medium tracking-tight">
              {t.footer.titleA} <em className="text-clay"><Wavy text={t.footer.titleB} /></em>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/60">
              {t.footer.lede}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="btn rounded-full bg-cream px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-clay hover:text-cream"
            >
              {t.footer.contact}
            </Link>
            <Link
              to="/platform"
              className="btn rounded-full border border-cream/25 px-6 py-3 text-sm font-medium text-cream transition-colors hover:border-cream hover:bg-cream hover:text-ink"
            >
              {t.footer.explore}
            </Link>
          </div>
        </div>
      </Container>

      <Container className="relative grid gap-12 py-14 md:grid-cols-2 xl:grid-cols-[1.5fr_1fr_1fr_1.1fr]">
        <div>
          <div className="flex items-center gap-3">
            <LogoMark dark className="h-9 w-9" />
            <div className="leading-tight">
              <p className="display text-lg font-semibold">IonianDTwin</p>
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-cream/50">
                OPS 6061866
              </p>
            </div>
          </div>
          <p className="text-body mt-6 max-w-sm text-cream/55">{t.footer.blurb}</p>
          <ul className="mt-6 space-y-2.5 text-sm text-cream/60">
            <li className="flex items-center gap-2.5">
              <Mail className="h-3.5 w-3.5 shrink-0 text-clay" strokeWidth={1.75} />
              <a href={`mailto:${t.footer.email}`} className="transition-colors hover:text-cream">
                {t.footer.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-clay" strokeWidth={1.75} />
              <span>{t.footer.address}</span>
            </li>
          </ul>
          <div className="mt-6 flex items-center gap-2">
            <PaletteSwitcher dark />
            <LanguageSwitcher dark />
          </div>
          <div className="mt-6 flex items-center gap-3 rounded-xl border border-cream/12 bg-cream/5 p-4">
            <EuFlag className="h-6 w-9 shrink-0" />
            <p className="text-small leading-snug text-cream/60">{t.footer.erdfNote}</p>
          </div>
        </div>

        {[
          { title: t.footer.colAbout, items: aboutNav },
          { title: t.footer.colPlatform, items: platformNav },
        ].map((col) => (
          <div key={col.title}>
          <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-clay">
            {col.title}
          </p>
            <ul className="mt-5 space-y-3">
              {col.items.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-[0.9375rem] text-cream/65 transition-colors hover:text-cream"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-clay">
            {t.footer.colResources}
          </p>
          <ul className="mt-5 space-y-3">
            {resourcesNav.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-[0.9375rem] text-cream/65 transition-colors hover:text-cream">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 font-mono text-[0.75rem] uppercase tracking-[0.18em] text-clay">
            {t.footer.colExternal}
          </p>
          <ul className="mt-4 space-y-3">
            {external.map((r) => (
              <li key={r.href}>
                <a
                  href={r.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-1.5 text-[0.9375rem] text-cream/65 transition-colors hover:text-cream"
                >
                  {r.label}
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="relative border-t border-cream/10">
        <Container className="flex flex-col items-start justify-between gap-3 py-6 sm:flex-row sm:items-center">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-cream/45">
            {t.footer.copyright}
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
            <Link
              to="/privacy"
              className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-cream/45 transition-colors hover:text-cream"
            >
              {t.footer.privacy}
            </Link>
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-cream/45">
              {t.footer.phase}
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
