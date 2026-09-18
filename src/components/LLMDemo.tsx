import { useEffect, useRef, useState } from "react";
import { LoaderCircle, Send, Sparkles } from "lucide-react";
import { useT } from "../i18n";
import { DemoBadge } from "./ui";

interface Msg {
  role: "user" | "assistant";
  text: string;
  stats?: { k: string; v: string }[];
  sources?: string[];
  typing?: boolean;
}

export default function LLMDemo() {
  const t = useT();
  const l = t.llm;
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "assistant", text: l.greeting, stats: [], sources: [] },
  ]);
  const [busy, setBusy] = useState(false);
  const [used, setUsed] = useState<number[]>([]);
  const chatRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);

  /* Reset the transcript when the language changes */
  useEffect(() => {
    if (!busy) {
      setMsgs([{ role: "assistant", text: l.greeting, stats: [], sources: [] }]);
      setUsed([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [l.greeting]);

  useEffect(() => () => timers.current.forEach((x) => window.clearTimeout(x)), []);

  useEffect(() => {
    const el = chatRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs]);

  const typeAnswer = (answer: Omit<Msg, "role" | "typing">) => {
    setBusy(true);
    setMsgs((m) => [...m, { role: "assistant", text: "", stats: [], sources: [], typing: true }]);
    const t1 = window.setTimeout(() => {
      setMsgs((m) => {
        const copy = [...m];
        copy[copy.length - 1] = { ...copy[copy.length - 1], text: "", typing: false };
        return copy;
      });
      let i = 0;
      const step = () => {
        i += 2 + Math.floor(Math.random() * 3);
        const done = i >= answer.text.length;
        const slice = answer.text.slice(0, i);
        setMsgs((m) => {
          const copy = [...m];
          copy[copy.length - 1] = {
            ...copy[copy.length - 1],
            text: slice,
            stats: done ? answer.stats : undefined,
            sources: done ? answer.sources : undefined,
          };
          return copy;
        });
        if (!done) {
          const x = window.setTimeout(step, 24);
          timers.current.push(x);
        } else setBusy(false);
      };
      step();
    }, 1100);
    timers.current.push(t1);
  };

  const ask = (idx: number) => {
    if (busy) return;
    const qa = l.qa[idx];
    setUsed((u) => (u.includes(idx) ? u : [...u, idx]));
    setMsgs((m) => [...m, { role: "user", text: qa.q }]);
    typeAnswer({ text: qa.a, stats: qa.stats, sources: qa.sources });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setMsgs((m) => [...m, { role: "user", text: l.placeholder }]);
    typeAnswer({ text: l.fallback, stats: [], sources: [] });
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-ink/12 bg-ink2 shadow-[0_40px_80px_-24px_rgba(19,18,16,0.45)]">
      <div className="flex items-center justify-between border-b border-cream/10 bg-[#191814] px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-clay/20">
            <Sparkles className="h-3.5 w-3.5 text-clay" strokeWidth={1.75} />
          </span>
          <div className="leading-tight">
            <p className="text-[13px] font-medium text-cream">{l.title}</p>
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-cream/40">{l.sub}</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <DemoBadge dark />
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-cream/35">
            {l.preview}
          </span>
        </div>
      </div>

      <div ref={chatRef} className="h-[23.75rem] space-y-4 overflow-y-auto p-5">
        {msgs.map((m, i) =>
          m.role === "user" ? (
            <div key={i} className="flex justify-end">
              <p className="max-w-[85%] rounded-2xl rounded-br-md bg-clay px-4 py-2.5 text-body leading-relaxed text-cream">
                {m.text}
              </p>
            </div>
          ) : (
            <div key={i} className="flex justify-start">
              <div className="max-w-[92%] rounded-2xl rounded-bl-md border border-cream/10 bg-cream/[0.05] px-4 py-3">
                {m.typing ? (
                  <p className="shimmer-text text-body leading-relaxed">{l.thinking}</p>
                ) : (
                  <>
                    <p className="text-body leading-relaxed text-cream/85">
                      {m.text}
                      {busy && i === msgs.length - 1 && (
                        <span className="caret ml-0.5 inline-block h-3.5 w-[7px] translate-y-[2px] bg-clay" />
                      )}
                    </p>
                    {m.stats && m.stats.length > 0 && (
                      <div className="mt-3 grid grid-cols-3 gap-2">
                        {m.stats.map((s) => (
                          <div key={s.k} className="rounded-lg border border-cream/10 bg-ink2/60 px-2.5 py-2">
                            <p className="display text-[1.0625rem] text-clay">{s.v}</p>
                            <p className="mt-0.5 font-mono text-[0.625rem] uppercase leading-tight tracking-[0.06em] text-cream/50">
                              {s.k}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                    {m.sources && m.sources.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {m.sources.map((s) => (
                          <span
                            key={s}
                            className="rounded-full border border-cream/12 px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.1em] text-cream/45"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )
        )}
      </div>

      <div className="flex flex-wrap gap-1.5 border-t border-cream/10 px-5 py-3">
        {l.qa.map((qa, i) => (
          <button
            key={qa.q}
            onClick={() => ask(i)}
            disabled={busy || used.includes(i)}
            className={`rounded-full border px-3 py-1.5 text-left text-[0.8125rem] leading-snug transition-all ${
              used.includes(i)
                ? "border-cream/8 text-cream/25"
                : "border-cream/15 text-cream/65 hover:border-clay hover:text-cream"
            } ${busy ? "cursor-not-allowed opacity-50" : ""}`}
          >
            {qa.q}
          </button>
        ))}
      </div>

      <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-cream/10 bg-[#191814] p-3.5">
        <input
          type="text"
          placeholder={l.placeholder}
          className="h-10 flex-1 rounded-full border border-cream/12 bg-cream/[0.05] px-4 text-[13px] text-cream placeholder:text-cream/30 focus:border-clay focus:outline-none"
          readOnly
        />
        <button
          type="submit"
          disabled={busy}
          aria-label={l.send}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-clay text-cream transition-colors hover:bg-claydeep disabled:opacity-50"
        >
          {busy ? (
            <LoaderCircle className="h-4 w-4 animate-spin" strokeWidth={1.75} />
          ) : (
            <Send className="h-4 w-4" strokeWidth={1.75} />
          )}
        </button>
      </form>
    </div>
  );
}
