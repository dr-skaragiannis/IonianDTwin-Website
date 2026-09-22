import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { useLang, useT } from "../i18n";
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
  const { lang } = useLang();
  const t = useT();
  const menu = useMenu();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
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

      {/* Top Announcement bar - collapses smoothly on scroll */}
      <div
        className={`fixed inset-x-0 top-0 z-50 overflow-hidden bg-ink2 text-cream transition-all duration-500 ease-in-out ${
          scrolled ? "max-h-0 opacity-0 pointer-events-none" : "max-h-12 opacity-100"
        }`}
      >
        <Container wide="95" className="flex h-9 items-center justify-between gap-4">
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

      {/* Main navigation header: transitions to dark background, compact height, and shadow with animations */}
      <header
        className={`fixed inset-x-0 z-40 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled
            ? "top-0 border-b border-cream/10 bg-ink2/95 text-cream backdrop-blur-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.6)] py-0"
            : "top-9 border-b border-transparent bg-transparent text-ink py-1"
        }`}
      >
        <Container wide="95">
          <div
            className={`flex items-center justify-between gap-4 transition-all duration-500 ${
              scrolled ? "h-14" : "h-16"
            }`}
          >
            {/* Logo and Brand Name */}
            <Link to="/" className="group flex items-center gap-2.5" aria-label="IonianDTwin home">
              <LogoMark
                dark={scrolled}
                className={`shrink-0 transition-all duration-500 group-hover:scale-105 ${
                  scrolled ? "h-7 w-7" : "h-9 w-9"
                }`}
              />
              <span className="hidden flex-col leading-none sm:flex">
                <span
                  className={`display font-semibold tracking-tight transition-all duration-500 ${
                    scrolled ? "text-[16px] text-cream" : "text-[18px] text-ink"
                  }`}
                >
                  IonianDTwin
                </span>
                <span
                  className={`mt-0.5 whitespace-nowrap font-sans text-[10.5px] font-normal tracking-tight transition-colors duration-500 ${
                    scrolled ? "text-cream/60" : "text-smoke"
                  }`}
                >
                  {lang === "el" ? "Ιόνια Νησιά" : "Ionian Islands"}
                </span>
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden items-center gap-3.5 2xl:flex 2xl:gap-5" aria-label="Primary">
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
                      className={`flex items-center gap-1.5 whitespace-nowrap py-2 font-medium tracking-tight transition-colors duration-300 ${
                        scrolled ? "text-[0.875rem]" : "text-[0.9375rem]"
                      } ${
                        item.children.some((c) => childActive(c.to))
                          ? "text-clay font-semibold"
                          : scrolled
                          ? "text-cream/75 hover:text-cream"
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

                    {/* Dropdown menu */}
                    <div
                      className={`absolute left-1/2 top-full z-50 w-[19.5rem] -translate-x-1/2 pt-2 transition-all duration-300 ${
                        openMenu === item.label
                          ? "visible translate-y-0 opacity-100"
                          : "invisible translate-y-2 opacity-0 pointer-events-none"
                      }`}
                    >
                      <div
                        className={`overflow-hidden rounded-2xl border p-2 shadow-[0_24px_48px_-16px_rgba(0,0,0,0.4)] ${
                          scrolled
                            ? "border-cream/15 bg-ink2/95 backdrop-blur-xl"
                            : "border-line bg-paper"
                        }`}
                      >
                        {item.children.map((c) => (
                          <NavLink
                            key={c.to}
                            to={c.to}
                            className={({ isActive }) =>
                              `block rounded-xl px-4 py-2.5 transition-colors ${
                                isActive
                                  ? scrolled
                                    ? "bg-cream/10 text-cream"
                                    : "bg-cream text-ink"
                                  : scrolled
                                  ? "text-cream/70 hover:bg-cream/10 hover:text-cream"
                                  : "text-smoke hover:bg-cream/70 hover:text-ink"
                              }`
                            }
                          >
                            <span className="flex items-center justify-between gap-2 text-[0.875rem] font-medium">
                              {c.label}
                              <span
                                className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                                  childActive(c.to) ? "bg-clay" : "bg-transparent"
                                }`}
                              />
                            </span>
                            <span
                              className={`mt-0.5 block text-xs ${
                                scrolled ? "text-cream/45" : "text-fog"
                              }`}
                            >
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
                      `whitespace-nowrap font-medium tracking-tight transition-colors duration-300 ${
                        scrolled ? "text-[0.875rem]" : "text-[0.9375rem]"
                      } ${
                        isActive
                          ? "text-clay font-semibold"
                          : scrolled
                          ? "text-cream/75 hover:text-cream"
                          : "text-smoke hover:text-ink"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                )
              )}
            </nav>

            {/* Right Controls */}
            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <div className="hidden 2xl:block">
                <PaletteSwitcher dark={scrolled} />
              </div>
              <div className="hidden 2xl:block">
                <LanguageSwitcher dark={scrolled} />
              </div>
              <Link
                to="/platform"
                className={`btn hidden rounded-full font-medium transition-all duration-300 2xl:inline-flex ${
                  scrolled
                    ? "bg-clay px-4 py-1.5 text-xs text-cream hover:bg-claydeep shadow-sm"
                    : "bg-ink px-5 py-2.5 text-[0.875rem] text-cream hover:bg-claydeep"
                }`}
              >
                {t.nav.explore}
              </Link>
              <button
                onClick={() => setMobileOpen(true)}
                className={`inline-flex items-center justify-center rounded-full border transition-all duration-300 2xl:hidden ${
                  scrolled
                    ? "h-9 w-9 border-cream/20 text-cream hover:bg-cream/10"
                    : "h-10 w-10 border-ink/15 text-ink hover:bg-ink hover:text-cream"
                }`}
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

        <Container wide="95" className="relative flex h-16 shrink-0 items-center justify-between">
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
          className="fs-menu-scroll relative flex-1 overflow-y-auto py-6"
          aria-label={t.nav.menuTitle}
        >
          <Container wide="95" className="flex flex-col gap-1">
            {menu.map((item, i) =>
              item.children ? (
                <div key={item.label} className="border-b border-cream/10 py-2">
                  <button
                    onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                    aria-expanded={expanded === item.label}
                    className="flex w-full min-h-[56px] items-center justify-between py-2 text-left"
                  >
                    <span className="flex items-baseline gap-4 display text-[1.75rem] font-medium tracking-tight text-cream">
                      <span className="font-mono text-[0.75rem] tracking-[0.16em] text-clay/70">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {item.label}
                    </span>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cream/15 text-cream/70">
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-300 ${
                          expanded === item.label ? "rotate-180 text-clay" : ""
                        }`}
                        strokeWidth={1.75}
                      />
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      expanded === item.label
                        ? "grid-rows-[1fr] opacity-100 pb-3"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden space-y-1 pl-8 pt-1">
                      {item.children.map((c) => (
                        <NavLink
                          key={c.to}
                          to={c.to}
                          onClick={() => setMobileOpen(false)}
                          className={({ isActive }) =>
                            `block rounded-xl px-4 py-2.5 transition-colors ${
                              isActive
                                ? "bg-cream/15 text-cream"
                                : "text-cream/75 hover:bg-cream/10 hover:text-cream"
                            }`
                          }
                        >
                          <span className="block text-sm font-medium">{c.label}</span>
                          <span className="block text-xs text-cream/45">{c.desc}</span>
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
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex min-h-[56px] items-center gap-4 border-b border-cream/10 py-3 display text-[1.75rem] font-medium tracking-tight ${
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
          <Container wide="95" className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
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