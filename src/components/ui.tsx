import {
  Fragment,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useT } from "../i18n";

/* ── Demo badge ──────────────────────────────────────────────────────── */
export function DemoBadge({
  dark = false,
  className = "",
}: {
  dark?: boolean;
  className?: string;
}) {
  const t = useT();
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[9px] uppercase tracking-[0.16em] ${
        dark
          ? "border-gold/40 bg-ink2/70 text-gold"
          : "border-gold/40 bg-gold/10 text-amber-900"
      } ${className}`}
    >
      <span className={`h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-gold`} />
      {t.demo.badge}
    </span>
  );
}

/* ── Wavy: rippling letters for text-clay emphasis words ──────────────── */
export function Wavy({ text, className = "" }: { text: string; className?: string }) {
  const words = text.split(/\s+/).filter(Boolean);
  let index = 0;
  return (
    <>
      {words.map((word, wi) => {
        const chars = Array.from(word);
        const start = index;
        index += chars.length;
        return (
          <Fragment key={wi}>
            {/* nowrap keeps each word intact — the whole word wraps, never splits */}
            <span className="whitespace-nowrap">
              {chars.map((ch, ci) => (
                <span key={ci} className={`wave-char ${className}`} style={{ animationDelay: `${(start + ci) * 80}ms` }}>
                  {ch}
                </span>
              ))}
            </span>
            {wi < words.length - 1 ? " " : null}
          </Fragment>
        );
      })}
    </>
  );
}

/* ── Container ──────────────────────────────────────────────────────── */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  /* Content spans up to 80% of the viewport on large screens (capped on
     ultrawide displays), growing from full-width on mobile. */
  return (
    <div
      className={`mx-auto w-full max-w-full px-5 md:px-8 xl:max-w-[min(80%,100rem)] ${className}`}
    >
      {children}
    </div>
  );
}

/* ── Reveal on scroll ───────────────────────────────────────────────── */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("is-visible");
            io.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}

/* ── Animated counter ───────────────────────────────────────────────── */
export function Counter({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1900,
  className = "",
}: {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const t0 = performance.now();
            const tick = (t: number) => {
              const p = Math.min(1, (t - t0) / duration);
              const eased = 1 - Math.pow(1 - p, 4);
              setVal(to * eased);
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);

  const formatted = val.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

/* ── Section heading ────────────────────────────────────────────────── */
export function SectionHead({
  eyebrow,
  title,
  lede,
  align = "left",
  dark = false,
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`${align === "center" ? "flex flex-col items-center text-center" : ""} ${className}`}
    >
      <Reveal>
        <span className={`eyebrow ${dark ? "eyebrow--dark" : ""}`}>{eyebrow}</span>
      </Reveal>
      <Reveal delay={80}>
        <h2
          className={`display mt-5 text-4xl md:text-5xl leading-[1.06] font-medium tracking-tight ${
            dark ? "text-cream" : "text-ink"
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {lede && (
        <Reveal delay={160}>
          <p
            className={`text-lede mt-5 max-w-2xl ${
              dark ? "text-cream/65" : "text-smoke"
            } ${align === "center" ? "mx-auto" : ""}`}
          >
            {lede}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ── Inner-page hero ────────────────────────────────────────────────── */
export function PageHero({
  eyebrow,
  title,
  lede,
  meta,
  trail,
  subNav,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: string;
  meta?: string[];
  trail?: { label: string; to?: string }[];
  subNav?: { label: string; to: string }[];
}) {
  const location = useLocation();
  return (
    <header className="relative overflow-hidden border-b border-line bg-cream bg-grid">
      <div className="pointer-events-none absolute -top-40 right-[-10%] h-[480px] w-[480px] rounded-full bg-clay/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-30%] left-[-5%] h-[420px] w-[420px] rounded-full bg-sea/10 blur-3xl" />
      <Container className="relative pb-14 pt-36 md:pb-20 md:pt-44">
        {trail && (
          <Reveal>
            <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em]">
              {trail.map((t, i) => (
                <span key={t.label} className="flex items-center gap-1.5">
                  {i > 0 && <span className="text-fog">/</span>}
                  {t.to ? (
                    <Link to={t.to} className="text-fog transition-colors hover:text-claydeep">
                      {t.label}
                    </Link>
                  ) : (
                    <span className={i === trail.length - 1 ? "text-ink" : "text-smoke/70"}>
                      {t.label}
                    </span>
                  )}
                </span>
              ))}
            </nav>
          </Reveal>
        )}
        <Reveal>
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>
        <Reveal delay={90}>
          <h1 className="h-display display mt-6 max-w-4xl font-medium tracking-tight text-ink">
            {title}
          </h1>
        </Reveal>
        {lede && (
          <Reveal delay={180}>
            <p className="text-lede mt-7 max-w-2xl text-smoke">{lede}</p>
          </Reveal>
        )}
        {meta && (
          <Reveal delay={260}>
            <div className="mt-8 flex flex-wrap gap-2">
              {meta.map((m) => (
                <span
                  key={m}
                  className="rounded-full border border-ink/15 bg-paper/70 px-3.5 py-1.5 font-mono text-[0.75rem] tracking-wide text-smoke"
                >
                  {m}
                </span>
              ))}
            </div>
          </Reveal>
        )}
        {subNav && (
          <Reveal delay={320}>
            <nav aria-label="Section" className="mt-10 flex flex-wrap gap-2">
              {subNav.map((s) => {
                const active =
                  s.to === "/platform"
                    ? location.pathname === "/platform"
                    : location.pathname.startsWith(s.to);
                return (
                  <Link
                    key={s.to}
                    to={s.to}
                    className={`rounded-full border px-4 py-2 text-[0.875rem] font-medium transition-all duration-300 ${
                      active
                        ? "border-ink bg-ink text-cream"
                        : "border-line bg-paper text-smoke hover:border-ink/40 hover:text-ink"
                    }`}
                  >
                    {s.label}
                  </Link>
                );
              })}
            </nav>
          </Reveal>
        )}
      </Container>
    </header>
  );
}

/* ── EU flag mark ───────────────────────────────────────────────────── */
export function EuFlag({ className = "h-5 w-8" }: { className?: string }) {
  const stars = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
    return { x: 50 + Math.cos(a) * 20, y: 33 + Math.sin(a) * 20 };
  });
  return (
    <svg viewBox="0 0 100 66" className={className} role="img" aria-label="Flag of the European Union">
      <rect width="100" height="66" rx="5" fill="#1a4fa0" />
      {stars.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r="3.2" fill="#ffcc00" />
      ))}
    </svg>
  );
}

/* ── Tag chip ───────────────────────────────────────────────────────── */
export function Tag({
  children,
  dark = false,
  className = "",
}: {
  children: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[0.75rem] tracking-wide ${
        dark
          ? "border-cream/20 bg-cream/5 text-cream/70"
          : "border-ink/15 bg-paper text-smoke"
      } ${className}`}
    >
      {children}
    </span>
  );
}

/* ── Outward link with arrow ────────────────────────────────────────── */
export function ArrowLink({
  to,
  children,
  dark = false,
  external = false,
  className = "",
}: {
  to: string;
  children: ReactNode;
  dark?: boolean;
  external?: boolean;
  className?: string;
}) {
  const cls = `group inline-flex items-center gap-2 text-[0.9375rem] font-medium link-underline ${
    dark ? "text-cream/85 hover:text-cream" : "text-ink hover:text-claydeep"
  } ${className}`;
  const inner = (
    <>
      {children}
      <ArrowUpRight
        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        strokeWidth={1.75}
      />
    </>
  );
  return external ? (
    <a href={to} target="_blank" rel="noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <Link to={to} className={cls}>
      {inner}
    </Link>
  );
}

/* ── Wordmark ───────────────────────────────────────────────────────── */
export function LogoMark({
  className = "h-8 w-8",
  dark = false,
}: {
  className?: string;
  dark?: boolean;
}) {
  /* On dark surfaces the ink rounded-square would vanish into the
     background, so we render the wave glyph alone at full width. */
  if (dark) {
    return (
      <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
        <path
          d="M6.5 10c3.1-2.4 6.4-2.4 9.5 0s6.4 2.4 9.5 0"
          stroke="#d98a63"
          strokeWidth="2.25"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M6.5 16c3.1-2.4 6.4-2.4 9.5 0s6.4 2.4 9.5 0"
          stroke="#a9c3bf"
          strokeWidth="2.25"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M6.5 22c3.1-2.4 6.4-2.4 9.5 0s6.4 2.4 9.5 0"
          stroke="#fcfbf7"
          strokeWidth="2.25"
          fill="none"
          strokeLinecap="round"
          opacity=".85"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="currentColor" />
      <path
        d="M6.5 10c3.1-2.4 6.4-2.4 9.5 0s6.4 2.4 9.5 0"
        stroke="var(--color-clay)"
        strokeWidth="2.1"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M6.5 16c3.1-2.4 6.4-2.4 9.5 0s6.4 2.4 9.5 0"
        stroke="var(--color-mist)"
        strokeWidth="2.1"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M6.5 22c3.1-2.4 6.4-2.4 9.5 0s6.4 2.4 9.5 0"
        stroke="var(--color-paper)"
        strokeWidth="2.1"
        fill="none"
        strokeLinecap="round"
        opacity=".85"
      />
    </svg>
  );
}
