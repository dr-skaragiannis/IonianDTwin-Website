import { useEffect, useState } from "react";
import {
  Bell,
  Gauge as GaugeIcon,
  Layers,
  Lock,
  MapPin,
  Satellite,
  Settings,
  Ship,
  Users,
} from "lucide-react";
import { useT } from "../i18n";
import { DemoBadge } from "./ui";
import IonianMap, { type MapPoint } from "./IonianMap";

/* ── Layers ─────────────────────────────────────────────────────────── */
type LayerId = "environment" | "transport" | "infrastructure";

const LAYER_ICONS: Record<LayerId, typeof Satellite> = {
  environment: Satellite,
  transport: Ship,
  infrastructure: Users,
};

/** True island label anchors (positioned offshore) */
const ISLAND_POS: [number, number][] = [
  [39.62, 19.52],
  [39.19, 20.02],
  [38.72, 20.42],
  [38.12, 20.22],
  [38.53, 20.88],
  [37.72, 20.52],
  [36.38, 22.82],
];

/** Monitoring network at real coordinates */
const POINTS: Record<LayerId, MapPoint[]> = {
  environment: [
    { name: "Glyfada", at: [39.575, 19.865], i: 0.92 },
    { name: "Paleokastritsa", at: [39.669, 19.7], i: 0.78 },
    { name: "Kassiopi", at: [39.76, 19.925], i: 0.5 },
    { name: "Antipaxos", at: [39.08, 20.22], i: 0.44 },
    { name: "Porto Katsiki", at: [38.636, 20.547], i: 0.58 },
    { name: "Myrtos", at: [38.315, 20.512], i: 0.72 },
    { name: "Gerakas", at: [37.69, 20.975], i: 0.55 },
    { name: "Navagio", at: [37.86, 20.625], i: 0.86 },
    { name: "Mylopotamos", at: [36.31, 22.98], i: 0.3 },
  ],
  transport: [
    { name: "Corfu Port", at: [39.563, 19.932], i: 0.88 },
    { name: "CFU Airport", at: [39.601, 19.912], i: 0.62 },
    { name: "Gaios", at: [39.19, 20.19], i: 0.38 },
    { name: "Lefkada Marina", at: [38.835, 20.712], i: 0.5 },
    { name: "Sami", at: [38.255, 20.59], i: 0.48 },
    { name: "Poros", at: [38.15, 20.78], i: 0.42 },
    { name: "Zakynthos Port", at: [37.793, 20.897], i: 0.66 },
    { name: "Diakofti", at: [36.265, 23.05], i: 0.24 },
  ],
  infrastructure: [
    { name: "Corfu Town", at: [39.559, 19.913], i: 0.9 },
    { name: "Gouvia", at: [39.625, 19.855], i: 0.52 },
    { name: "Lefkada Town", at: [38.833, 20.71], i: 0.46 },
    { name: "Argostoli", at: [38.175, 20.489], i: 0.6 },
    { name: "Vathy", at: [38.365, 20.719], i: 0.3 },
    { name: "Zakynthos Town", at: [37.792, 20.895], i: 0.68 },
    { name: "Chora, Kythira", at: [36.146, 22.99], i: 0.22 },
  ],
};

const HIST = [42, 48, 55, 61, 58, 66, 72, 70, 78, 84, 88, 86, 90, 92];
const FCST = [92, 94, 97, 99, 96, 91, 87, 90, 93, 89, 85, 82, 79, 77];

function sparkPoints(data: number[], w = 84, h = 26, pad = 2) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  return data
    .map((v, i) => {
      const x = pad + (i / (data.length - 1)) * (w - pad * 2);
      const y = h - pad - ((v - min) / range) * (h - pad * 2);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

/* ── Component ──────────────────────────────────────────────────────── */
export default function DashboardMock() {
  const t = useT();
  const d = t.dash;
  const [layer, setLayer] = useState<LayerId>("environment");
  const [gauge, setGauge] = useState(74);
  const [aqi, setAqi] = useState(41);
  const [crowd, setCrowd] = useState(0.82);

  useEffect(() => {
    const id = window.setInterval(() => {
      setGauge((g) => Math.min(82, Math.max(66, g + (Math.random() - 0.5) * 2.4)));
      setAqi((a) => Math.min(48, Math.max(34, Math.round(a + (Math.random() - 0.5) * 3))));
      setCrowd((c) => Math.min(0.9, Math.max(0.72, c + (Math.random() - 0.5) * 0.03)));
    }, 2400);
    return () => window.clearInterval(id);
  }, []);

  const arcLen = Math.PI * 60;
  const gaugeColor = gauge >= 75 ? "#e0673a" : gauge >= 55 ? "#c9a24b" : "#7fb5ad";
  const labels = Object.keys(LAYER_ICONS) as LayerId[];

  const W = 900;
  const CH = 168;
  const pad = 10;
  const yOf = (v: number) => CH - pad - (v / 115) * (CH - pad * 2);
  const total = HIST.length + FCST.length;
  const xOf = (idx: number) => pad + (idx / (total - 1)) * (W - pad * 2);

  const histPts = HIST.map((v, i) => `${xOf(i).toFixed(1)},${yOf(v).toFixed(1)}`).join(" ");
  const fcstPts = FCST.map((v, i) => `${xOf(HIST.length + i).toFixed(1)},${yOf(v).toFixed(1)}`).join(" ");
  const spread = (i: number) => 4 + i * 0.85;
  const bandPts =
    FCST.map((v, i) => `${xOf(HIST.length + i).toFixed(1)},${yOf(v + spread(i)).toFixed(1)}`).join(" ") +
    " " +
    [...FCST].reverse().map((v, ri) => `${xOf(total - 1 - ri).toFixed(1)},${yOf(v - spread(total - 1 - HIST.length - ri)).toFixed(1)}`).join(" ");

  return (
    <div className="overflow-hidden rounded-2xl border border-ink/12 bg-ink2 shadow-[0_40px_80px_-24px_rgba(19,18,16,0.45)]">
      {/* Browser chrome */}
      <div className="flex items-center gap-3 border-b border-cream/10 bg-[#191814] px-4 py-3 sm:gap-4">
        {/* browser chrome — decorative */}
        <div className="hidden gap-1.5 sm:flex">
          <span className="h-2.5 w-2.5 rounded-full bg-cream/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-cream/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-cream/20" />
        </div>
        <div className="mx-auto flex w-full max-w-md items-center justify-center gap-2 rounded-md bg-cream/[0.07] px-3 py-1.5">
          <Lock className="hidden h-3 w-3 text-cream/40 sm:block" strokeWidth={1.75} />
          <span className="truncate font-mono text-[0.6875rem] text-cream/55 sm:text-[0.75rem]">
            twin.ioniandtwin.gr
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <DemoBadge dark className="hidden sm:inline-flex" />
          <div className="flex items-center gap-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-clay sm:gap-2 sm:text-[0.75rem]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-clay opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-clay" />
            </span>
            Live
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[3.5rem_1fr] xl:grid-cols-[3.5rem_1fr_19.5rem]">
        {/* Left rail */}
        <div className="hidden flex-col items-center gap-1 border-r border-cream/10 py-4 lg:flex">
          {[MapPin, GaugeIcon, Layers, Bell, Settings].map((Icon, i) => (
            <button
              key={i}
              tabIndex={-1}
              className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                i === 0 ? "bg-clay/20 text-clay" : "text-cream/40 hover:bg-cream/10 hover:text-cream"
              }`}
            >
              <Icon className="h-4 w-4" strokeWidth={1.75} />
            </button>
          ))}
        </div>

        {/* Real map */}
        <div className="relative h-[340px] min-h-[340px] sm:h-[420px] lg:h-[520px] lg:min-h-0">
          <IonianMap
            points={POINTS[layer]}
            islandLabels={d.islandLabels.map((name, i) => ({ name, at: ISLAND_POS[i] }))}
          />
          <div className="scanline z-[450]" />

          {/* layer chips */}
          <div className="pointer-events-none absolute left-3 top-3 z-[600] flex max-w-[calc(100%-6.5rem)] flex-wrap gap-1.5 sm:left-4 sm:top-4">
            {labels.map((id) => {
              const Icon = LAYER_ICONS[id];
              return (
                <button
                  key={id}
                  onClick={() => setLayer(id)}
                  className={`pointer-events-auto flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] backdrop-blur transition-all sm:text-[10.5px] sm:tracking-[0.12em] ${
                    layer === id
                      ? "bg-clay text-cream shadow-lg"
                      : "bg-ink2/70 text-cream/70 hover:bg-ink2/90 hover:text-cream"
                  }`}
                >
                  <Icon className="h-3 w-3" strokeWidth={1.75} />
                  {d.layers[id]}
                </button>
              );
            })}
          </div>

          {/* legend */}
          <div className="pointer-events-none absolute bottom-3 left-3 z-[600] rounded-lg border border-cream/12 bg-ink2/70 px-3 py-2.5 backdrop-blur sm:bottom-4 sm:left-4 sm:px-3.5 sm:py-3">
            <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-cream/55 sm:text-[0.6875rem] sm:tracking-[0.16em]">
              {d.intensity}
            </p>
            <div className="mt-2 h-1.5 w-28 rounded-full sm:w-40" style={{ background: "linear-gradient(90deg,#7fb5ad,#c9a24b,#e0673a)" }} />
            <div className="mt-1.5 flex justify-between font-mono text-[0.625rem] text-cream/45 sm:text-[0.6875rem]">
              <span>{d.low}</span>
              <span>{d.watchLow}</span>
              <span>{d.alert}</span>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="flex flex-col divide-y divide-cream/10 border-t border-cream/10 xl:border-l xl:border-t-0">
          <div className="p-5">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-cream/50">
                {d.sustainability}
              </p>
              <span
                className="rounded-full px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em]"
                style={{ background: `${gaugeColor}22`, color: gaugeColor }}
              >
                {d.watch}
              </span>
            </div>
            <div className="mt-2 flex items-center gap-4">
              <svg viewBox="0 0 160 92" className="h-[4.5rem] w-[8rem] shrink-0">
                <path d="M20 84 A60 60 0 0 1 140 84" fill="none" stroke="rgba(252,251,247,0.12)" strokeWidth="9" strokeLinecap="round" />
                <path
                  d="M20 84 A60 60 0 0 1 140 84"
                  fill="none"
                  stroke={gaugeColor}
                  strokeWidth="9"
                  strokeLinecap="round"
                  strokeDasharray={arcLen}
                  strokeDashoffset={arcLen * (1 - gauge / 100)}
                  style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(.22,1,.36,1), stroke .6s" }}
                />
                <text x="80" y="64" textAnchor="middle" fill="#fcfbf7" fontSize="26" fontWeight="500" fontFamily="Source Serif 4, serif">
                  {Math.round(gauge)}
                </text>
                <text x="80" y="80" textAnchor="middle" fill="rgba(252,251,247,0.45)" fontSize="9" fontFamily="IBM Plex Mono, monospace">
                  / 100
                </text>
              </svg>
              <div className="space-y-2 font-mono text-[10px] leading-relaxed text-cream/55">
                <p>{d.indicators}</p>
                <p>{d.categories}</p>
                <p className="text-cream/35">{d.updated}</p>
              </div>
            </div>
          </div>

          {[
            { label: d.aqi, value: String(aqi), unit: "/100", data: [52, 50, 49, 47, 45, 44, 43, aqi], color: "#7fb5ad" },
            { label: d.crowd, value: crowd.toFixed(2), unit: "", data: [0.61, 0.66, 0.7, 0.68, 0.75, 0.79, 0.8, crowd], color: "#c9a24b" },
            { label: d.seaTemp, value: "24.6", unit: "°C", data: [23.1, 23.4, 23.6, 23.9, 24.1, 24.3, 24.5, 24.6], color: "#7fb5ad" },
          ].map((m) => (
            <div key={m.label} className="flex items-center justify-between gap-3 px-5 py-3.5">
              <div>
                <p className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-cream/50">{m.label}</p>
                <p className="display mt-1 text-xl text-cream">
                  {m.value}
                  <span className="ml-1 font-mono text-[10px] text-cream/40">{m.unit}</span>
                </p>
              </div>
              <svg viewBox="0 0 84 26" className="h-6 w-[5.25rem] shrink-0">
                <polyline points={sparkPoints(m.data)} fill="none" stroke={m.color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          ))}

          <div className="flex-1 p-5">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-cream/50">
                {d.alerts}
              </p>
              <span className="rounded-full bg-clay/20 px-2 py-0.5 font-mono text-[9px] text-clay">3</span>
            </div>
            <ul className="mt-3 space-y-3">
              {[
                { c: "#e0673a", t: d.alerts, time: "2′" },
              ].map((a) => (
                <li key={a.time} className="flex items-start gap-2.5">
                  <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: a.c }} />
                  <p className="flex-1 text-[11.5px] leading-snug text-cream/70">
                    {POINTS[layer][0].name} · {Math.round(POINTS[layer][0].i * 100)}%
                  </p>
                  <span className="font-mono text-[9px] text-cream/35">{a.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Forecast strip */}
      <div className="border-t border-cream/10 bg-[#161512] p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-cream/50 sm:text-[9.5px] sm:tracking-[0.18em]">
              {d.forecast}
            </p>
            <div className="hidden items-center gap-4 font-mono text-[9.5px] text-cream/45 sm:flex">
              <span className="flex items-center gap-1.5"><span className="h-px w-4 bg-cream/60" /> {d.observed}</span>
              <span className="flex items-center gap-1.5"><span className="h-px w-4 border-t border-dashed border-clay" /> {d.forecasted}</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-4 rounded-sm bg-clay/20" /> {d.confidence}</span>
            </div>
          </div>
          <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-cream/35">{d.sources}</p>
        </div>
        <svg viewBox={`0 0 ${W} ${CH + 22}`} className="mt-3 w-full">
          {[0.25, 0.5, 0.75].map((f) => (
            <line key={f} x1={pad} x2={W - pad} y1={pad + f * (CH - pad * 2)} y2={pad + f * (CH - pad * 2)} stroke="rgba(252,251,247,0.06)" />
          ))}
          <line x1={xOf(HIST.length - 1)} x2={xOf(HIST.length - 1)} y1={pad} y2={CH} stroke="rgba(252,251,247,0.25)" strokeDasharray="3 4" />
          <text x={xOf(HIST.length - 1) + 6} y={pad + 10} fill="rgba(252,251,247,0.5)" fontSize="10" fontFamily="IBM Plex Mono, monospace">{d.today}</text>
          <polygon points={bandPts} fill="rgba(224,103,58,0.12)" />
          <polyline points={histPts} fill="none" stroke="rgba(252,251,247,0.65)" strokeWidth="1.8" strokeLinecap="round" />
          <polyline points={fcstPts} fill="none" stroke="#e0673a" strokeWidth="1.8" strokeDasharray="5 5" strokeLinecap="round" />
          <circle cx={xOf(total - 1)} cy={yOf(FCST[FCST.length - 1])} r="3.5" fill="#e0673a" />
        </svg>
      </div>

      <div className="border-t border-cream/10 bg-[#131210] px-5 py-2.5">
        <p className="text-center font-mono text-[0.625rem] uppercase tracking-[0.14em] text-cream/40 sm:text-[0.6875rem] sm:tracking-[0.16em]">
          {d.disclaimer}
        </p>
      </div>
    </div>
  );
}
