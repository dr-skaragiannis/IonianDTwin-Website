import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { useT } from "../i18n";
import { useMenu } from "../i18n/menu";
import LanguageSwitcher from "./LanguageSwitcher";
import PaletteSwitcher from "./PaletteSwitcher";
import { Container, EuFlag, LogoMark } from "./ui";

function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? window.scrollY / total : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed inset-x-0 top-0 z-[70] h-[2.5px] bg-transparent">
      <div
        className="h-full bg-clay transition-[width] duration-150 ease-out"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}

export default function Navbar() {
  const t = useT();
  const menu = useMenu();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const childActive = (to: string) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  return (
    <>
      <ScrollProgress />

      {/* Announcement bar */}
      <div
        className={`fixed inset-x-0 top-0 z-50 overflow-hidden bg-ink2 text-cream transition-all duration-500 ${
          scrolled ? "max-h-0" : "max-h-12"
        }`}
      >
        <Container className="flex h-9 items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-cream/75">
            <EuFlag className="h-3.5 w-5 shrink-0" />
            <span className="truncate">{t.announce.text}</span>
          </div>
          <a
            href="https://pepionia.gr"
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-1 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-clay transition-colors hover:text-cream sm:inline-flex"
          >
            {t.announce.ops}
            <ArrowUpRight className="h-3 w-3" />
          </a>
        </Container>
      </div>

      {/* Main nav */}
      <header
        className={`fixed inset-x-0 z-40 transition-all duration-500 ${
          scrolled
            ? "top-0 border-b border-line bg-cream/85 backdrop-blur-xl"
            : "top-9 border-b border-transparent bg-transparent"
        }`}
      >
        <Container>
          <div className="flex h-16 items-center justify-between gap-4">
            <Link to="/" className="group flex items-center gap-3" aria-label="IonianDTwin home">
              <LogoMark className="h-8 w-8 shrink-0 text-ink transition-transform duration-500 group-hover:rotate-[8deg]" />
              <span className="hidden flex-col leading-none sm:flex">
                <span className="display text-[17px] font-semibold tracking-tight text-ink">
                  IonianDTwin
                </span>
                <span className="mt-1 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.18em] text-fog">
                  {t.home.heroRegion}
                </span>
              </span>
            </Link>

            {/* Desktop nav — 2xl threshold: at 120% root zoom the six Greek
                labels plus logo and controls do not fit below 1536px */}
            <nav className="hidden items-center gap-4 2xl:flex 2xl:gap-5" aria-label="Primary">
              {menu.map((item) =>
                item.children ? (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setOpenMenu(item.label)}
                    onMouseLeave={() => setOpenMenu(null)}
                  >
                    <button
                      onClick={() => setOpenMenu(openMenu === item.label ? null : item.label)}
                      aria-expanded={openMenu === item.label}
                      className={`flex items-center gap-1.5 whitespace-nowrap py-2 text-[0.9375rem] font-medium tracking-tight transition-colors ${
                        item.children.some((c) => childActive(c.to))
                          ? "text-claydeep"
                          : "text-smoke hover:text-ink"
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        className={`h-3 w-3 transition-transform duration-300 ${
                          openMenu === item.label ? "rotate-180" : ""
                        }`}
                        strokeWidth={2}
                      />
                    </button>
                    <div
                      className={`absolute left-1/2 top-full z-50 w-[19rem] -translate-x-1/2 pt-2 transition-all duration-300 ${
                        openMenu === item.label
                          ? "visible translate-y-0 opacity-100"
                          : "invisible translate-y-2 opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden rounded-2xl border border-line bg-paper p-2 shadow-[0_24px_48px_-16px_rgba(19,18,16,0.25)]">
                        {item.children.map((c) => (
                          <NavLink
                            key={c.to}
                            to={c.to}
                            className={({ isActive }) =>
                              `block rounded-xl px-4 py-3 transition-colors ${
                                isActive ? "bg-cream text-ink" : "text-smoke hover:bg-cream/70 hover:text-ink"
                              }`
                            }
                          >
                            <span className="flex items-center justify-between gap-2 text-[0.9375rem] font-medium">
                              {c.label}
                              <span
                                className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                                  childActive(c.to) ? "bg-clay" : "bg-transparent"
                                }`}
                              />
                            </span>
                            <span className="mt-0.5 block text-small text-fog">
                              {c.desc}
                            </span>
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <NavLink
                    key={item.label}
                    to={item.to!}
                    end={item.to === "/"}
                    className={({ isActive }) =>
                      `whitespace-nowrap text-[0.9375rem] font-medium tracking-tight transition-colors ${
                        isActive ? "text-claydeep" : "text-smoke hover:text-ink"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                )
              )}
            </nav>

            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <div className="hidden 2xl:block">
                <PaletteSwitcher />
              </div>
              <div className="hidden 2xl:block">
                <LanguageSwitcher />
              </div>
              <Link
                to="/platform"
                className="btn hidden rounded-full bg-ink px-5 py-2.5 text-[0.875rem] font-medium text-cream transition-colors hover:bg-claydeep 2xl:inline-flex"
              >
                {t.nav.explore}
              </Link>
              <button
                onClick={() => setMobileOpen(true)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:bg-ink hover:text-cream 2xl:hidden"
                aria-label={t.nav.openMenu}
              >
                <Menu className="h-4.5 w-4.5" strokeWidth={1.75} />
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Full-screen mobile menu */}
      <div
        className={`fs-menu fixed inset-0 z-[80] flex flex-col bg-ink2 text-cream transition-all duration-500 2xl:hidden ${
          mobileOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-3 opacity-0"
        }`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!mobileOpen}
        aria-label={t.nav.menuTitle}
      >
        <div className="pointer-events-none absolute inset-0 bg-grid-dark" />
        <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-clay/10 blur-3xl" />

        <Container className="relative flex h-16 shrink-0 items-center justify-between">
          <Link to="/" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
            <LogoMark dark className="h-8 w-8" />
            <span className="display text-[17px] font-semibold">IonianDTwin</span>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 text-cream transition-colors active:bg-cream active:text-ink"
            aria-label={t.nav.closeMenu}
          >
            <X className="h-5 w-5" strokeWidth={1.75} />
          </button>
        </Container>

        <nav
          className="fs-menu-scroll relative min-h-0 flex-1 overflow-y-auto pb-8 pt-2"
          aria-label={t.nav.menuTitle}
        >
          <Container className="flex flex-col">
            <Link
              to="/platform"
              onClick={() => setMobileOpen(false)}
              className="mb-5 flex items-center justify-between rounded-2xl border border-cream/15 bg-cream/[0.06] px-5 py-4 active:bg-cream/15"
            >
              <span>
                <span className="block text-[15px] font-semibold text-cream">{t.nav.explore}</span>
                <span className="mt-0.5 block font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-clay">
                  {t.nav.ctaNote}
                </span>
              </span>
              <ArrowUpRight className="h-4.5 w-4.5 text-clay" strokeWidth={1.75} />
            </Link>

            {menu.map((item, i) =>
              item.children ? (
                <div key={item.label} className="border-b border-cream/10">
                  <button
                    onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                    aria-expanded={expanded === item.label}
                    className="flex min-h-[60px] w-full items-center justify-between gap-4 py-4 text-left"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="font-mono text-[0.75rem] tracking-[0.16em] text-clay/70">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="display text-[1.75rem] font-medium tracking-tight text-cream">
                        {item.label}
                      </span>
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-clay transition-transform duration-300 ${
                        expanded === item.label ? "rotate-180" : ""
                      }`}
                      strokeWidth={1.75}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-500 ${
                      expanded === item.label
                        ? "grid-rows-[1fr] pb-4 opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      {item.children.map((c) => (
                        <NavLink key={c.to} to={c.to} className="block rounded-xl">
                          {({ isActive }) => (
                            <span
                              className={`flex items-start gap-3 rounded-xl px-3 py-3.5 ${
                                isActive ? "bg-cream/10 text-cream" : "text-cream/65"
                              }`}
                            >
                              <span
                                className={`mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full ${
                                  isActive ? "bg-clay" : "bg-cream/25"
                                }`}
                              />
                              <span>
                                <span className="block text-[1rem] font-medium leading-snug">
                                  {c.label}
                                </span>
                                <span className="mt-0.5 block text-small leading-snug text-cream/45">
                                  {c.desc}
                                </span>
                              </span>
                            </span>
                          )}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <NavLink
                  key={item.label}
                  to={item.to!}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    `flex min-h-[60px] items-center gap-4 border-b border-cream/10 py-4 display text-[1.75rem] font-medium tracking-tight ${
                      isActive ? "text-clay" : "text-cream"
                    }`
                  }
                >
                  <span className="font-mono text-[0.75rem] tracking-[0.16em] text-clay/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </NavLink>
              )
            )}

            {/* Language + palette switchers inside the full-screen menu */}
            <div className="mt-7 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <PaletteSwitcher dark />
                <LanguageSwitcher dark />
              </div>
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-cream/40">
                {t.footer.phase.split("·")[0]}
              </span>
            </div>
          </Container>
        </nav>

        <div className="relative shrink-0 border-t border-cream/10 py-4">
          <Container className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-cream/50">
              {t.nav.lead}
            </span>
            <span className="flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-cream/50">
              <EuFlag className="h-3.5 w-5" /> {t.nav.funded}
            </span>
          </Container>
        </div>
      </div>
    </>
  );
}
