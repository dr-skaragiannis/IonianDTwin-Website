import { useEffect, useState } from "react";
import {
  Bell,
  CheckCircle,
  Clock,
  Filter,
  Gauge as GaugeIcon,
  Layers,
  Lock,
  MapPin,
  Radio,
  Satellite,
  Settings,
  Ship,
  Users,
  Zap,
} from "lucide-react";
import { useLang, useT } from "../i18n";
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
  [39.62, 19.52], // Corfu
  [39.19, 20.02], // Paxi
  [38.72, 20.42], // Lefkada
  [38.12, 20.22], // Kefalonia
  [38.53, 20.88], // Ithaca
  [37.72, 20.52], // Zakynthos
];

interface ExtendedPoint extends MapPoint {
  island: string;
  type: string;
  unit?: string;
  val: string;
  detail: string;
}

/** Island center targets for map pan/zoom */
const ISLAND_CENTERS: Record<string, { center: [number, number]; zoom: number }> = {
  all: { center: [38.65, 20.45], zoom: 7.5 },
  Corfu: { center: [39.62, 19.85], zoom: 9 },
  Paxi: { center: [39.19, 20.17], zoom: 10.5 },
  Lefkada: { center: [38.72, 20.65], zoom: 9.5 },
  Kefalonia: { center: [38.22, 20.52], zoom: 9 },
  Ithaca: { center: [38.40, 20.72], zoom: 10 },
  Zakynthos: { center: [37.78, 20.82], zoom: 9.5 },
};

/** Monitoring network at real coordinates */
const POINTS: Record<LayerId, ExtendedPoint[]> = {
  environment: [
    { name: "Glyfada", island: "Corfu", at: [39.575, 19.865], i: 0.92, type: "PM2.5 / Coastal", val: "38 µg/m³", detail: "Near threshold; high heat & dust" },
    { name: "Paleokastritsa", island: "Corfu", at: [39.669, 19.7], i: 0.78, type: "Chl-a / Seawater", val: "0.82 mg/m³", detail: "Nutrient watch band" },
    { name: "Kassiopi", island: "Corfu", at: [39.76, 19.925], i: 0.5, type: "Water Quality", val: "99.2% Good", detail: "Normal salinity & clarity" },
    { name: "Antipaxos", island: "Paxi", at: [39.08, 20.22], i: 0.44, type: "Turbidity NTU", val: "1.2 NTU", detail: "Crystalline waters, pristine" },
    { name: "Porto Katsiki", island: "Lefkada", at: [38.636, 20.547], i: 0.58, type: "Coastal Noise & UV", val: "UV Index 7.8", detail: "Peak solar irradiance" },
    { name: "Myrtos", island: "Kefalonia", at: [38.315, 20.512], i: 0.72, type: "Beach Occupancy", val: "72% Cap", detail: "Bathing water excellent" },
    { name: "Filiatro", island: "Ithaca", at: [38.358, 20.748], i: 0.35, type: "Marine Habitat", val: "Posidonia 94%", detail: "Dense seagrass meadow" },
    { name: "Gerakas", island: "Zakynthos", at: [37.69, 20.975], i: 0.55, type: "Caretta Habitat", val: "24 Nests", detail: "Protected sanctuary zone" },
    { name: "Navagio", island: "Zakynthos", at: [37.86, 20.625], i: 0.86, type: "Slope & Turbidity", val: "4.8 NTU", detail: "Restricted maritime boundary" },
  ],
  transport: [
    { name: "Corfu Port", island: "Corfu", at: [39.563, 19.932], i: 0.88, type: "Cruise & Ferries", val: "4 Berths", detail: "3 cruises + 8 ferries scheduled" },
    { name: "CFU Airport", island: "Corfu", at: [39.601, 19.912], i: 0.62, type: "Air Arrivals", val: "42 Flights", detail: "Steady runway throughput" },
    { name: "Gaios", island: "Paxi", at: [39.19, 20.19], i: 0.38, type: "Marina Mooring", val: "84% Slips", detail: "Yacht congestion moderate" },
    { name: "Lefkada Marina", island: "Lefkada", at: [38.835, 20.712], i: 0.5, type: "Canal Transit", val: "18 Boats/hr", detail: "Swing-bridge scheduled" },
    { name: "Sami", island: "Kefalonia", at: [38.255, 20.59], i: 0.48, type: "Ferry Terminal", val: "4 Connections", detail: "Patras & Ithaca lines on time" },
    { name: "Poros", island: "Kefalonia", at: [38.15, 20.78], i: 0.42, type: "Ferry Flow", val: "Kyllini Ferry", detail: "Normal maritime stream" },
    { name: "Pisaetos", island: "Ithaca", at: [38.348, 20.685], i: 0.32, type: "Coastal Link", val: "3 Ferries/day", detail: "Connecting to Sami & Astakos" },
    { name: "Zakynthos Port", island: "Zakynthos", at: [37.793, 20.897], i: 0.66, type: "Port Terminal", val: "1,420 Pass/hr", detail: "High turnover at ferry dock" },
  ],
  infrastructure: [
    { name: "Corfu Town", island: "Corfu", at: [39.559, 19.913], i: 0.9, type: "Old Fortress Flow", val: "0.90 Index", detail: "High pedestrian dwell time" },
    { name: "Gouvia", island: "Corfu", at: [39.625, 19.855], i: 0.52, type: "Power Substation", val: "74% Load", detail: "Grid frequency 50.02 Hz" },
    { name: "Lefkada Town", island: "Lefkada", at: [38.833, 20.71], i: 0.46, type: "Solid Waste", val: "68% Capacity", detail: "Smart bins regular cycle" },
    { name: "Argostoli", island: "Kefalonia", at: [38.175, 20.489], i: 0.6, type: "Water Network", val: "3.4 Bar", detail: "Water reservoir at 78%" },
    { name: "Vathy", island: "Ithaca", at: [38.365, 20.719], i: 0.3, type: "Desalination Unit", val: "1,200 m³/d", detail: "Reverse osmosis operating optimal" },
    { name: "Zakynthos Town", island: "Zakynthos", at: [37.792, 20.895], i: 0.68, type: "Water Pressure", val: "2.1 Bar", detail: "Urban water demand peak" },
    { name: "Keri", island: "Zakynthos", at: [37.662, 20.825], i: 0.41, type: "Solar Array", val: "1.4 MW", detail: "Clean energy peak delivery" },
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
  const { lang } = useLang();
  const t = useT();
  const d = t.dash;
  const isEl = lang === "el";

  const [layer, setLayer] = useState<LayerId>("environment");
  const [selectedIsland, setSelectedIsland] = useState<string>("all");
  const [selectedPoint, setSelectedPoint] = useState<ExtendedPoint | null>(POINTS.environment[0]);
  const [timeframe, setTimeframe] = useState<"24h" | "7d" | "14d" | "30d">("14d");
  const [gauge, setGauge] = useState(74);
  const [aqi, setAqi] = useState(41);
  const [crowd, setCrowd] = useState(0.82);

  // Live telemetry subtle fluctuation
  useEffect(() => {
    const id = window.setInterval(() => {
      setGauge((g) => Math.min(82, Math.max(66, g + (Math.random() - 0.5) * 2.4)));
      setAqi((a) => Math.min(48, Math.max(34, Math.round(a + (Math.random() - 0.5) * 3))));
      setCrowd((c) => Math.min(0.9, Math.max(0.72, c + (Math.random() - 0.5) * 0.03)));
    }, 2400);
    return () => window.clearInterval(id);
  }, []);

  // Update default selected point when layer changes
  useEffect(() => {
    const currentList = POINTS[layer];
    if (selectedIsland === "all") {
      setSelectedPoint(currentList[0]);
    } else {
      const match = currentList.find((p) => p.island === selectedIsland) ?? currentList[0];
      setSelectedPoint(match);
    }
  }, [layer, selectedIsland]);

  const arcLen = Math.PI * 60;
  const gaugeColor = gauge >= 75 ? "#C8502E" : gauge >= 55 ? "#E4B671" : "#0F80C5";
  const labels = Object.keys(LAYER_ICONS) as LayerId[];

  // Filtered points
  const pointsInLayer = POINTS[layer];
  const displayedPoints = selectedIsland === "all"
    ? pointsInLayer
    : pointsInLayer.filter((p) => p.island === selectedIsland);

  // Map center target
  const mapTarget = ISLAND_CENTERS[selectedIsland] ?? ISLAND_CENTERS.all;

  // Alerts per layer
  const ALERTS_DATA: Record<LayerId, { color: string; station: string; issue: string; time: string }[]> = {
    environment: [
      { color: "#C8502E", station: "Glyfada · Corfu", issue: isEl ? "Υπέρβαση PM2.5 (38 µg/m³)" : "PM2.5 threshold alert (38 µg/m³)", time: "2′" },
      { color: "#C8502E", station: "Navagio · Zakynthos", issue: isEl ? "Αυξημένη θολότητα υδάτων (4.8 NTU)" : "Turbidity spike in bay (4.8 NTU)", time: "18′" },
      { color: "#E4B671", station: "Paleokastritsa · Corfu", issue: isEl ? "Χλωροφύλλη-a σε ζώνη επιτήρησης" : "Chlorophyll-a watch band", time: "44′" },
    ],
    transport: [
      { color: "#C8502E", station: "Corfu Port", issue: isEl ? "Ταυτόχρονη άφιξη 3 κρουαζιερόπλοιων" : "Concurrent arrival: 3 cruise ships", time: "5′" },
      { color: "#E4B671", station: "Zakynthos Port", issue: isEl ? "Καθυστέρηση επιβίβασης πορθμείου" : "Ferry embarkation dwell spike", time: "26′" },
      { color: "#0F80C5", station: "CFU Airport", issue: isEl ? "Κανονική ροή αφίξεων (42/ημέρα)" : "Normal arrival rate (42 flights/day)", time: "1h" },
    ],
    infrastructure: [
      { color: "#C8502E", station: "Corfu Town", issue: isEl ? "Κορεσμός πεζών Παλαιού Φρουρίου (0.90)" : "Old Fortress pedestrian saturation (0.90)", time: "8′" },
      { color: "#E4B671", station: "Zakynthos Town", issue: isEl ? "Πτώση πίεσης δικτύου ύδρευσης (2.1 bar)" : "Water grid pressure drop (2.1 bar)", time: "31′" },
      { color: "#0F80C5", station: "Argostoli · Kefalonia", issue: isEl ? "Πληρότητα κάδων παραλίας στο 78%" : "Beach smart-bin fill rate at 78%", time: "2h" },
    ],
  };

  const currentAlerts = ALERTS_DATA[layer];

  // SVG Chart points
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

  const islandOptions = [
    { id: "all", label: isEl ? "Όλα τα Νησιά" : "All Islands" },
    { id: "Corfu", label: isEl ? "Κέρκυρα" : "Corfu" },
    { id: "Paxi", label: isEl ? "Παξοί" : "Paxi" },
    { id: "Lefkada", label: isEl ? "Λευκάδα" : "Lefkada" },
    { id: "Kefalonia", label: isEl ? "Κεφαλονιά" : "Kefalonia" },
    { id: "Ithaca", label: isEl ? "Ιθάκη" : "Ithaca" },
    { id: "Zakynthos", label: isEl ? "Ζάκυνθος" : "Zakynthos" },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-ink/12 bg-ink2 shadow-[0_40px_80px_-24px_rgba(30,34,29,0.45)]">
      {/* Top browser chrome */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cream/10 bg-[#262C25] px-4 py-3 sm:gap-4">
        <div className="hidden gap-1.5 sm:flex">
          <span className="h-2.5 w-2.5 rounded-full bg-cream/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-cream/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-cream/20" />
        </div>

        <div className="flex flex-1 max-w-sm items-center justify-center gap-2 rounded-md bg-cream/[0.07] px-3 py-1.5">
          <Lock className="hidden h-3 w-3 text-cream/40 sm:block" strokeWidth={1.75} />
          <span className="truncate font-mono text-[0.6875rem] text-cream/55 sm:text-[0.75rem]">
            twin.ioniandtwin.gr · {selectedIsland === "all" ? (isEl ? "Ιόνια Νησιά" : "Ionian Sea") : selectedIsland}
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <DemoBadge dark className="hidden sm:inline-flex" />
          <div className="flex items-center gap-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-clay sm:gap-2 sm:text-[0.75rem]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-clay opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-clay" />
            </span>
            Live Telemetry
          </div>
        </div>
      </div>

      {/* Island selector toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-cream/10 bg-[#232824] px-4 py-2.5">
        <div className="flex items-center gap-2 overflow-x-auto py-1 text-xs">
          <span className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-cream/40">
            <Filter className="h-3 w-3" />
            {isEl ? "Νησί:" : "Island:"}
          </span>
          {islandOptions.map((isl) => (
            <button
              key={isl.id}
              onClick={() => setSelectedIsland(isl.id)}
              className={`rounded-full px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-wider transition-colors ${
                selectedIsland === isl.id
                  ? "bg-clay text-cream"
                  : "bg-cream/[0.06] text-cream/65 hover:bg-cream/10 hover:text-cream"
              }`}
            >
              {isl.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 text-right">
          <span className="font-mono text-[9px] text-cream/40 hidden md:inline">
            {displayedPoints.length} {isEl ? "ενεργοί σταθμοί" : "active stations"}
          </span>
        </div>
      </div>

      {/* Main dashboard grid */}
      <div className="grid lg:grid-cols-[3.5rem_1fr] xl:grid-cols-[3.5rem_1fr_21.5rem]">
        {/* Left rail icons */}
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

        {/* Real Leaflet Map */}
        <div className="relative h-[360px] min-h-[360px] sm:h-[440px] lg:h-[540px] lg:min-h-0">
          <IonianMap
            points={displayedPoints}
            islandLabels={d.islandLabels.map((name, i) => ({ name, at: ISLAND_POS[i] }))}
            selectedPoint={selectedPoint?.name}
            onSelectPoint={(p) => {
              const full = pointsInLayer.find((x) => x.name === p.name) ?? null;
              setSelectedPoint(full);
            }}
            targetCenter={mapTarget.center}
            targetZoom={mapTarget.zoom}
          />
          <div className="scanline z-[450]" />

          {/* Layer switcher chips on top of map */}
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
                      : "bg-ink2/80 text-cream/70 hover:bg-ink2 hover:text-cream"
                  }`}
                >
                  <Icon className="h-3 w-3" strokeWidth={1.75} />
                  {d.layers[id]}
                </button>
              );
            })}
          </div>

          {/* Active station pill on bottom map */}
          {selectedPoint && (
            <div className="pointer-events-none absolute top-3 right-3 z-[600] hidden sm:block max-w-xs">
              <div className="pointer-events-auto rounded-xl border border-cream/15 bg-ink2/85 p-2.5 backdrop-blur shadow-xl">
                <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-clay">
                  <Radio className="h-3 w-3 animate-pulse" />
                  {selectedPoint.name} · {selectedPoint.island}
                </div>
                <p className="mt-1 font-mono text-[11px] text-cream font-medium">
                  {selectedPoint.type}: <span className="text-clay">{selectedPoint.val}</span>
                </p>
                <p className="text-[10px] text-cream/55">{selectedPoint.detail}</p>
              </div>
            </div>
          )}

          {/* Map legend */}
          <div className="pointer-events-none absolute bottom-3 left-3 z-[600] rounded-lg border border-cream/12 bg-ink2/80 px-3 py-2.5 backdrop-blur sm:bottom-4 sm:left-4 sm:px-3.5 sm:py-3">
            <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-cream/55 sm:text-[0.6875rem] sm:tracking-[0.16em]">
              {d.intensity}
            </p>
            <div
              className="mt-2 h-1.5 w-28 rounded-full sm:w-40"
              style={{ background: "linear-gradient(90deg,#0F80C5,#E4B671,#C8502E)" }}
            />
            <div className="mt-1.5 flex justify-between font-mono text-[0.625rem] text-cream/45 sm:text-[0.6875rem]">
              <span>{d.low}</span>
              <span>{d.watchLow}</span>
              <span>{d.alert}</span>
            </div>
          </div>
        </div>

        {/* Right side telemetry panel */}
        <div className="flex flex-col divide-y divide-cream/10 border-t border-cream/10 xl:border-l xl:border-t-0 bg-[#232824]">
          {/* Main Index Gauge */}
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
                <path
                  d="M20 84 A60 60 0 0 1 140 84"
                  fill="none"
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="9"
                  strokeLinecap="round"
                />
                <path
                  d="M20 84 A60 60 0 0 1 140 84"
                  fill="none"
                  stroke={gaugeColor}
                  strokeWidth="9"
                  strokeLinecap="round"
                  strokeDasharray={arcLen}
                  strokeDashoffset={arcLen * (1 - gauge / 100)}
                />
                <text
                  x="80"
                  y="74"
                  textAnchor="middle"
                  fontSize="28"
                  fontWeight="600"
                  fontFamily="Literata, Georgia, serif"
                  fill="#ffffff"
                >
                  {Math.round(gauge)}
                </text>
                <text
                  x="80"
                  y="88"
                  textAnchor="middle"
                  fontSize="8"
                  letterSpacing="1"
                  fontFamily="JetBrains Mono, monospace"
                  fill="rgba(255,255,255,0.45)"
                >
                  / 100
                </text>
              </svg>
              <div className="text-left text-xs leading-relaxed text-cream/65">
                <p className="font-medium text-cream">{isEl ? "Συνθετικός Δείκτης" : "Composite Health Index"}</p>
                <p className="text-[11px] text-cream/50 mt-0.5">
                  {selectedIsland === "all" ? (isEl ? "6 Νήσοι Ιονίου" : "6 Ionian Islands") : selectedIsland}
                </p>
                <span className="mt-1 inline-flex items-center gap-1 font-mono text-[9px] text-emerald-400">
                  <CheckCircle className="h-2.5 w-2.5" /> GSTC v2.0
                </span>
              </div>
            </div>
          </div>

          {/* Key telemetry metrics */}
          {[
            { label: d.aqi, value: String(aqi), unit: "/100", data: [52, 50, 49, 47, 45, 44, 43, aqi], color: "#0F80C5" },
            { label: d.crowd, value: crowd.toFixed(2), unit: "", data: [0.61, 0.66, 0.7, 0.68, 0.75, 0.79, 0.8, crowd], color: "#E4B671" },
            { label: d.seaTemp, value: "24.6", unit: "°C", data: [23.1, 23.4, 23.6, 23.9, 24.1, 24.3, 24.5, 24.6], color: "#0F80C5" },
          ].map((m) => (
            <div key={m.label} className="flex items-center justify-between gap-3 px-5 py-3">
              <div>
                <p className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-cream/50">{m.label}</p>
                <p className="display mt-0.5 text-xl text-cream">
                  {m.value}
                  <span className="ml-1 font-mono text-[10px] text-cream/40">{m.unit}</span>
                </p>
              </div>
              <svg viewBox="0 0 84 26" className="h-6 w-[5.25rem] shrink-0">
                <polyline
                  points={sparkPoints(m.data)}
                  fill="none"
                  stroke={m.color}
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          ))}

          {/* Selected Station Telemetry Card */}
          {selectedPoint && (
            <div className="p-4 bg-cream/[0.02]">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase tracking-wider text-clay">
                  {isEl ? "Επιλεγμένος Σταθμός" : "Station Telemetry"}
                </span>
                <span className="font-mono text-[9px] text-cream/40">{selectedPoint.island}</span>
              </div>
              <div className="mt-2 flex items-baseline justify-between">
                <p className="text-sm font-semibold text-cream">{selectedPoint.name}</p>
                <span className="font-mono text-xs text-clay font-bold">{selectedPoint.val}</span>
              </div>
              <p className="text-[11px] text-cream/60 mt-0.5">{selectedPoint.detail}</p>
              <div className="mt-2.5 flex items-center justify-between text-[9px] font-mono text-cream/40">
                <span className="flex items-center gap-1">
                  <Clock className="h-2.5 w-2.5" /> 12s ago
                </span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <Zap className="h-2.5 w-2.5" /> LoRaWAN / 4G
                </span>
              </div>
            </div>
          )}

          {/* Live Alerts List */}
          <div className="flex-1 p-5">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-cream/50">
                {d.alerts}
              </p>
              <span className="rounded-full bg-clay/20 px-2 py-0.5 font-mono text-[9px] text-clay">
                {currentAlerts.length}
              </span>
            </div>
            <ul className="mt-3 space-y-2.5">
              {currentAlerts.map((a, i) => (
                <li key={i} className="flex items-start gap-2.5 rounded-lg border border-cream/5 bg-cream/[0.02] p-2">
                  <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: a.color }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-medium text-cream truncate">{a.station}</p>
                    <p className="text-[10px] text-cream/65 leading-tight">{a.issue}</p>
                  </div>
                  <span className="font-mono text-[9px] text-cream/35 shrink-0">{a.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Forecast strip & time selector */}
      <div className="border-t border-cream/10 bg-[#232824] p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-cream/50 sm:text-[9.5px] sm:tracking-[0.18em]">
              {d.forecast}
            </p>
            <div className="hidden items-center gap-4 font-mono text-[9.5px] text-cream/45 sm:flex">
              <span className="flex items-center gap-1.5">
                <span className="h-px w-4 bg-cream/60" /> {d.observed}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-px w-4 border-t border-dashed border-clay" /> {d.forecasted}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-4 rounded-sm bg-clay/20" /> {d.confidence}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {(["24h", "7d", "14d", "30d"] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`rounded px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider transition-colors ${
                  timeframe === tf ? "bg-clay text-cream" : "text-cream/40 hover:text-cream"
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        <svg viewBox={`0 0 ${W} ${CH + 22}`} className="mt-3 w-full">
          {[0.25, 0.5, 0.75].map((f) => (
            <line
              key={f}
              x1={pad}
              x2={W - pad}
              y1={pad + f * (CH - pad * 2)}
              y2={pad + f * (CH - pad * 2)}
              stroke="rgba(255,255,255,0.07)"
            />
          ))}
          <line
            x1={xOf(HIST.length - 1)}
            x2={xOf(HIST.length - 1)}
            y1={pad}
            y2={CH}
            stroke="rgba(255,255,255,0.25)"
            strokeDasharray="3 4"
          />
          <text
            x={xOf(HIST.length - 1) + 6}
            y={pad + 10}
            fill="rgba(255,255,255,0.55)"
            fontSize="10"
            fontFamily="JetBrains Mono, monospace"
          >
            {d.today}
          </text>
          <polygon points={bandPts} fill="rgba(226,71,11,0.14)" />
          <polyline
            points={histPts}
            fill="none"
            stroke="rgba(255,255,255,0.7)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <polyline
            points={fcstPts}
            fill="none"
            stroke="#C8502E"
            strokeWidth="1.8"
            strokeDasharray="5 5"
            strokeLinecap="round"
          />
          <circle cx={xOf(total - 1)} cy={yOf(FCST[FCST.length - 1])} r="3.5" fill="#C8502E" />
        </svg>
      </div>

      <div className="border-t border-cream/10 bg-[#151915] px-5 py-2.5 flex flex-wrap items-center justify-between gap-2">
        <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-cream/40 sm:text-[0.6875rem] sm:tracking-[0.16em]">
          {d.disclaimer}
        </p>
        <span className="font-mono text-[9px] text-clay/70">
          OPS: 6061866 · ETPA 2021–2027
        </span>
      </div>
    </div>
  );
}
