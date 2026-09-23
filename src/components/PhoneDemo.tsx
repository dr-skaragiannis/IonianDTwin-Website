import { useState } from "react";
import { Bell, Map as MapIcon, Moon, Radar, Smartphone, Sun } from "lucide-react";
import { useT } from "../i18n";
import { DemoBadge } from "./ui";

function PhoneFrame({ children, className = "", dark = true }: { children: React.ReactNode; className?: string; dark?: boolean }) {
  return (
    <div
      className={`relative w-[10.75rem] shrink-0 rounded-[2.2rem] border border-cream/15 bg-[#151915] p-1.5 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] sm:w-[13.25rem] sm:p-2 lg:w-[15.5rem] lg:rounded-[2.6rem] lg:p-2 ${className}`}
    >
      <div className={`relative h-[21.5rem] overflow-hidden rounded-[1.9rem] sm:h-[27rem] lg:h-[31.25rem] lg:rounded-[2.2rem] ${dark ? "bg-[#1E221D]" : "bg-cream"}`}>
        <div className="absolute left-1/2 top-2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-[#151915] sm:w-24" />
        {children}
      </div>
    </div>
  );
}

function PhoneHome({ dark = true }: { dark?: boolean }) {
  const ph = useT().mobile.phone;
  return (
    <div className={`flex h-full flex-col ${dark ? "text-cream" : "text-ink"}`}>
      <div className="flex items-center justify-between px-5 pt-10">
        <div>
          <p className={`font-mono text-[8.5px] uppercase tracking-[0.18em] ${dark ? "text-cream/50" : "text-clay"}`}>{ph.greet}</p>
          <p className="display text-base lg:text-lg">{ph.place}</p>
        </div>
        <span className={`flex h-8 w-8 items-center justify-center rounded-full ${dark ? "bg-cream/10" : "bg-ink/5 text-ink"}`}>
          <Bell className="h-3.5 w-3.5" strokeWidth={1.75} />
        </span>
      </div>
      <div className={`mx-4 mt-4 overflow-hidden rounded-2xl border ${dark ? "border-cream/10" : "border-line bg-paper"}`}>
        <div className={`relative h-[110px] lg:h-[150px] ${dark ? "bg-[radial-gradient(120%_120%_at_30%_20%,#2E362E_0%,#1E221D_70%)]" : "bg-[radial-gradient(120%_120%_at_30%_20%,#E9EBE1_0%,#DADFCC_75%)]"}`}>
          {[
            { x: "30%", y: "40%", c: "#C8502E" },
            { x: "55%", y: "60%", c: dark ? "#E4B671" : "#B9843A" },
            { x: "72%", y: "30%", c: "#0F80C5" },
          ].map((d, i) => (
            <span key={i} className="absolute h-2 w-2 rounded-full" style={{ left: d.x, top: d.y, background: d.c }} />
          ))}
          <div className="scanline" style={{ animationDuration: "5s" }} />
          <span className={`absolute bottom-2 left-2 rounded-full px-2 py-1 font-mono text-[7.5px] uppercase tracking-[0.14em] ${dark ? "bg-ink2/70 text-cream/70" : "bg-ink/80 text-cream"}`}>
            {ph.live}
          </span>
        </div>
      </div>
      <div className={`mx-4 mt-3 rounded-2xl border p-3 lg:p-4 ${dark ? "border-cream/10 bg-cream/[0.05]" : "border-line bg-paper"}`}>
        <div className="flex items-center justify-between">
          <p className={`font-mono text-[8px] uppercase tracking-[0.16em] lg:text-[8.5px] ${dark ? "text-cream/55" : "text-clay"}`}>
            {ph.crowd}
          </p>
          <span className={`rounded-full px-2 py-0.5 font-mono text-[8px] uppercase tracking-widest ${dark ? "bg-clay/20 text-clay" : "bg-ink text-cream"}`}>
            {ph.high}
          </span>
        </div>
        <p className="display mt-1 text-xl lg:text-2xl">0.82</p>
        <div className={`mt-2 h-1.5 overflow-hidden rounded-full ${dark ? "bg-cream/10" : "bg-sand"}`}>
          <div className={`h-full w-[82%] rounded-full ${dark ? "bg-gradient-to-r from-mist via-gold to-clay" : "bg-gradient-to-r from-clay to-gold"}`} />
        </div>
        <p className={`mt-2 text-[9.5px] leading-snug lg:text-[10.5px] ${dark ? "text-cream/55" : "text-smoke"}`}>{ph.altBody}</p>
      </div>
      <div className={`mx-4 mt-3 rounded-2xl border p-3 lg:p-4 ${dark ? "border-cream/10 bg-cream/[0.05]" : "border-line bg-paper"}`}>
        <p className={`font-mono text-[8px] uppercase tracking-[0.16em] lg:text-[8.5px] ${dark ? "text-cream/55" : "text-clay"}`}>
          {ph.suggested}
        </p>
        <div className="mt-2 space-y-2">
          {[
            { n: "Mon Repos", d: "34%" },
            { n: "Kanoni", d: "41%" },
          ].map((a) => (
            <div key={a.n} className={`flex items-center justify-between rounded-lg border px-3 py-2 ${dark ? "border-cream/10" : "border-line bg-cream"}`}>
              <p className={`text-[10.5px] font-medium lg:text-[11px] ${dark ? "" : "text-ink"}`}>{a.n}</p>
              <p className={`font-mono text-[8px] lg:text-[8.5px] ${dark ? "text-mist" : "text-smoke"}`}>{a.d}</p>
            </div>
          ))}
        </div>
      </div>
      <div className={`mt-auto flex items-center justify-around border-t px-4 py-3.5 ${dark ? "border-cream/10 bg-[#151915]" : "border-line bg-cream"}`}>
        {[MapIcon, Bell, Radar, Smartphone].map((I, i) => (
          <I key={i} className={`h-4 w-4 ${i === 0 ? "text-clay" : dark ? "text-cream/35" : "text-fog"}`} strokeWidth={1.75} />
        ))}
      </div>
    </div>
  );
}

function PhoneAlerts({ dark = true }: { dark?: boolean }) {
  const ph = useT().mobile.phone;
  const alerts = [
    { c: "#C8502E", t: "78%", d: "Glyfada", w: "2′" },
    { c: dark ? "#E4B671" : "#B9843A", t: "NTU ↑", d: "Ag. Georgios", w: "24′" },
    { c: "#0F80C5", t: "AQI 41", d: "Corfu", w: "3h" },
  ];
  return (
    <div className={`flex h-full flex-col ${dark ? "text-cream" : "text-ink"}`}>
      <div className="px-5 pt-10">
        <p className={`font-mono text-[8.5px] uppercase tracking-[0.18em] ${dark ? "text-cream/50" : "text-clay"}`}>
          {ph.alertsTitle}
        </p>
        <p className="display text-base lg:text-lg">{ph.watch}</p>
      </div>
      <div className="mt-4 space-y-3 px-4">
        {alerts.map((a) => (
          <div key={a.d} className={`rounded-2xl border p-3 lg:p-4 ${dark ? "border-cream/10 bg-cream/[0.05]" : "border-line bg-paper"}`}>
            <div className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full" style={{ background: a.c }} />
              <div className="flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <p className={`text-[11px] font-medium lg:text-[11.5px] ${dark ? "" : "text-ink"}`}>{a.t}</p>
                  <p className={`font-mono text-[8px] ${dark ? "text-cream/40" : "text-fog"}`}>{a.w}</p>
                </div>
                <p className={`mt-0.5 text-[10px] lg:text-[10.5px] ${dark ? "text-cream/60" : "text-smoke"}`}>{a.d}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={`mx-4 mt-3 rounded-2xl border p-3 lg:p-4 ${dark ? "border-cream/10 bg-cream/[0.05]" : "border-line bg-paper"}`}>
        <p className={`font-mono text-[8px] uppercase tracking-[0.16em] lg:text-[8.5px] ${dark ? "text-cream/55" : "text-clay"}`}>
          {ph.report}
        </p>
        <p className={`mt-1.5 text-[9.5px] leading-snug lg:text-[10.5px] ${dark ? "text-cream/60" : "text-smoke"}`}>
          {ph.reportBody}
        </p>
        <button className="mt-3 w-full rounded-full bg-clay py-2 text-[10.5px] font-medium text-cream lg:text-[11px]">
          {ph.reportBtn}
        </button>
      </div>
      <div className={`mt-auto flex items-center justify-around border-t px-4 py-3.5 ${dark ? "border-cream/10 bg-[#151915]" : "border-line bg-cream"}`}>
        {[MapIcon, Bell, Radar, Smartphone].map((I, i) => (
          <I key={i} className={`h-4 w-4 ${i === 1 ? "text-clay" : dark ? "text-cream/35" : "text-fog"}`} strokeWidth={1.75} />
        ))}
      </div>
    </div>
  );
}

export default function PhoneDemo() {
  const [dark, setDark] = useState(false);
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex items-center gap-4">
        <DemoBadge dark />
        <button
          onClick={() => setDark((d) => !d)}
          aria-pressed={!dark}
          className="flex items-center gap-2 rounded-full border border-cream/25 bg-ink2/70 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-cream backdrop-blur transition-colors hover:border-cream/50"
        >
          {dark ? (
            <Sun className="h-3.5 w-3.5" strokeWidth={1.75} />
          ) : (
            <Moon className="h-3.5 w-3.5" strokeWidth={1.75} />
          )}
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
      <div className="relative flex items-start justify-center gap-3 sm:gap-5">
        <PhoneFrame dark={dark} className="float-soft rotate-[-3deg]">
          <PhoneHome dark={dark} />
        </PhoneFrame>
        <PhoneFrame dark={dark} className="float-soft-delay mt-6 hidden rotate-[2.5deg] sm:mt-10 sm:block">
          <PhoneAlerts dark={dark} />
        </PhoneFrame>
      </div>
    </div>
  );
}