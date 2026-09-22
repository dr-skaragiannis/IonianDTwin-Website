import type { LucideIcon } from "lucide-react";
import {
  Waves,
  Leaf,
  Volume2,
  Users,
  Car,
  Zap,
  Trash2,
  Bird,
  Landmark,
  Coins,
  Plane,
  Ship,
  Satellite,
  Radio,
  Monitor,
  Smartphone,
  BrainCircuit,
  Wind,
  Droplets,
  Sun,
} from "lucide-react";

/* ── Navigation ─────────────────────────────────────────────────────── */
export interface NavChild {
  label: string;
  to: string;
  desc: string;
}
export interface NavItem {
  label: string;
  to?: string;
  children?: NavChild[];
}
export const MENU: NavItem[] = [
  { label: "Home", to: "/" },
  {
    label: "About",
    children: [
      { label: "Sustainability", to: "/about/challenge", desc: "Six pillars of a sustainable Ionian" },
      { label: "The Project", to: "/about/project", desc: "Funding, timeline and deliverables" },
      { label: "Architecture", to: "/about/architecture", desc: "Five layers, data to decision" },
      { label: "Technology", to: "/about/technology", desc: "Stack, standards and operations" },
    ],
  },
  {
    label: "Platform",
    children: [
      { label: "Overview", to: "/platform", desc: "One twin, three doors" },
      { label: "Web Dashboard", to: "/platform/dashboard", desc: "GIS maps, heatmaps and forecasts" },
      { label: "Mobile App", to: "/platform/mobile-app", desc: "Alerts and crowdsourcing on the go" },
      { label: "LLM Interface", to: "/platform/intelligence", desc: "Ask the twin anything" },
      { label: "Indicators", to: "/indicators", desc: "34 sustainability indicators across 10 categories" },
    ],
  },
  {
    label: "Resources",
    children: [
      { label: "Data Sources", to: "/resources/data-sources", desc: "Twelve feeds, one data lake" },
      { label: "Related Projects", to: "/resources/related-projects", desc: "The European digital-twin ecosystem" },
      { label: "References", to: "/resources/references", desc: "Standards, papers and providers" },
    ],
  },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];
export const ABOUT_NAV: NavChild[] = MENU[1].children!;
export const PLATFORM_NAV: NavChild[] = MENU[2].children!;
export const RESOURCES_NAV: NavChild[] = MENU[4].children!;

/* ── The seven Ionian islands ───────────────────────────────────────── */
export interface Island {
  name: string;
  greek: string;
  score: number; // composite sustainability score, illustrative (0–100, higher = better)
  note: string;
}
export const ISLANDS: Island[] = [
  { name: "Ithaca", greek: "Ithaki", score: 81, note: "Low-impact seasonality and strong community stewardship of heritage assets" },
  { name: "Paxi", greek: "Paxos", score: 74, note: "Compact land mass rewards careful visitor distribution and marine protection" },
  { name: "Kefalonia", greek: "Kefalonia", score: 66, note: "Dispersed seasonality supports balance; protected Caretta-caretta nesting sites monitored" },
  { name: "Lefkada", greek: "Lefkada", score: 63, note: "Coastal dune and Posidonia meadow conservation alongside managed beach access" },
  { name: "Zakynthos", greek: "Zakynthos", score: 55, note: "Marine protected areas around Navagio and Laganas under active restoration focus" },
  { name: "Corfu", greek: "Kerkyra", score: 48, note: "Regional flagship pilot — the largest opportunity to demonstrate measurable improvement" },
];

/* ── Sustainability pillars ─────────────────────────────────────────── */
export interface Problem {
  icon: LucideIcon;
  title: string;
  body: string;
  impact: string;
}
export const SUSTAINABILITY_PILLARS: Problem[] = [
  {
    icon: Leaf,
    title: "Nature & ecosystems",
    body: "Posidonia seagrass meadows, coastal dunes and maquis habitat that anchor the islands' identity — monitored for extent, condition and disturbance so protection can be targeted, not blanket.",
    impact: "Conservation that adapts",
  },
  {
    icon: Droplets,
    title: "Water resources",
    body: "A Mediterranean island reality: scarce supply meeting peak seasonal demand. The twin tracks quality, turbidity and abstraction to keep bathing and drinking water within safe limits.",
    impact: "Resources kept in balance",
  },
  {
    icon: Zap,
    title: "Energy & carbon",
    body: "Abundant sun and wind meet a demand curve that spikes each summer. Measuring the renewable share and the shape of that peak is the first step to flattening it.",
    impact: "A credible path to net zero",
  },
  {
    icon: Trash2,
    title: "Waste & circularity",
    body: "Per-visitor waste, recycling rates and single-use plastics, measured honestly — so circular-economy investment can be directed where it actually moves the number.",
    impact: "Less, reused, recovered",
  },
  {
    icon: Bird,
    title: "Biodiversity",
    body: "Sentinel-2 vegetation indices, habitat disturbance alerts and invasive-species signals give the region an early-warning system for the ecosystems that underpin its economy.",
    impact: "Early warning, not hindsight",
  },
  {
    icon: Landmark,
    title: "Culture & community",
    body: "Living heritage, historic town cores and the residents who sustain them. Sustainability is only real when the benefit stays local and the place keeps its character.",
    impact: "Benefit that stays local",
  },
];

/* ── Objectives ─────────────────────────────────────────────────────── */
export const OBJECTIVES = [
  {
    n: "01",
    title: "Build the Digital Twin",
    body: "A multi-layer geospatial twin integrating environmental, transport and digital-infrastructure monitoring for the entire Ionian region.",
  },
  {
    n: "02",
    title: "Integrate open and system data",
    body: "Combine open web data, Earth Observation and existing maritime, aviation, weather and traffic systems. Ten indoor collection stations provide complementary local measurements.",
  },
  {
    n: "03",
    title: "Fuse heterogeneous data",
    body: "Satellite (Copernicus), maritime (MarineTraffic), aviation (FlightRadar24), weather, traffic and crowdsourced citizen reports — one data lake.",
  },
  {
    n: "04",
    title: "Model with ML/AI",
    body: "Predictive analytics, anomaly detection and tourism-flow forecasting that link visitor activity to environmental outcomes.",
  },
  {
    n: "05",
    title: "Democratise access via LLM",
    body: "A natural-language interface that lets any stakeholder query the twin conversationally — no GIS expertise required.",
  },
  {
    n: "06",
    title: "Measure what matters",
    body: "34 sustainability indicators across 10 categories, aligned with GSTC Destination Criteria v2.0.",
  },
  {
    n: "07",
    title: "Put it in every pocket",
    body: "A mobile app for citizens and visitors: real-time alerts, crowdsourcing and alternative-activity recommendations.",
  },
  {
    n: "08",
    title: "Leave no one behind",
    body: "WCAG 2.0 Level AA and Greek Law 4074/2012 accessibility compliance across every digital touchpoint.",
  },
];

/* ── System architecture layers ─────────────────────────────────────── */
export interface ArchComponent {
  name: string;
  desc: string;
}
export interface ArchLayer {
  id: string;
  index: string;
  name: string;
  tag: string;
  desc: string;
  components: ArchComponent[];
  tech: string[];
}
export const ARCH_LAYERS: ArchLayer[] = [
  {
    id: "presentation",
    index: "05",
    name: "Presentation Layer",
    tag: "Where people meet the twin",
    desc: "Three coordinated front doors into the platform: a full GIS web dashboard for analysts and policymakers, a mobile companion for citizens and visitors, and a conversational LLM interface for everyone else.",
    components: [
      { name: "Web Dashboard", desc: "GIS maps, heatmaps, layered overlays and trend analytics in the browser." },
      { name: "Mobile App", desc: "iOS/Android companion with alerts, crowdsourcing and offline-first design." },
      { name: "LLM Query Interface", desc: "Natural-language questions translated to SQL against the data lake." },
    ],
    tech: ["React / Vue", "Mapbox GL · Leaflet", "D3 · Chart.js", "React Native / Flutter"],
  },
  {
    id: "analytics",
    index: "04",
    name: "Analytics Layer",
    tag: "Where data becomes foresight",
    desc: "The intelligence of the twin: machine-learning models that detect anomalies, forecast conditions, and compute the composite Sustainability Index against GSTC v2.0.",
    components: [
      { name: "ML Models", desc: "Anomaly detection and supervised learning over fused environmental–tourism data." },
      { name: "Predictive Analytics", desc: "Time-series forecasting of visitor pressure, pollution and infrastructure load." },
      { name: "GSTC v2.0 Index", desc: "Composite index computation across 34 indicators and 10 categories." },
    ],
    tech: ["scikit-learn", "TensorFlow / PyTorch", "Prophet · time-series", "Hugging Face"],
  },
  {
    id: "processing",
    index: "03",
    name: "Data Processing Layer",
    tag: "Where streams become structure",
    desc: "Real-time stream processing alongside batch ETL, with spatial analytics served through PostGIS and GeoServer into every client.",
    components: [
      { name: "Stream Processing", desc: "Continuous ingestion and windowing of high-frequency feeds from open services, existing systems and complementary local measurements." },
      { name: "ETL / Batch", desc: "Cleansing, harmonising and joining slower statistical and satellite sources." },
      { name: "Spatial Analytics", desc: "PostGIS geometry operations and OGC services via GeoServer." },
    ],
    tech: ["Apache Kafka", "Apache Spark", "Apache Flink", "PostGIS · GeoServer"],
  },
  {
    id: "ingestion",
    index: "02",
    name: "Data Ingestion Layer",
    tag: "Where the world streams in",
    desc: "Twelve heterogeneous feeds — open web services, orbit, sea, sky, road and citizen sources — normalised into a single spatio-temporal data model.",
    components: [
      { name: "Earth Observation", desc: "Copernicus CAMS, CMEMS, Sentinel-1 SAR and Sentinel-2 optical." },
      { name: "Mobility Feeds", desc: "PeopleFlows movement data, MarineTraffic vessel positions, FlightRadar24 arrivals and Google traffic." },
      { name: "Citizen & Official", desc: "Crowdsourced reports from the mobile app, EU Tourism Dashboard statistics." },
    ],
    tech: ["MQTT broker", "LoRaWAN server", "REST / API connectors", "Copernicus CDSE"],
  },
  {
    id: "physical",
    index: "01",
    name: "Data Collection / Sensor Layer",
    tag: "Where the twin touches ground",
    desc: "Open web data and existing systems form the primary foundation of the twin. Ten indoor collection stations provide complementary local observations for selected air-quality, water-quality and crowd-density indicators.",
    components: [
      { name: "Open and system data", desc: "Public web sources, Earth Observation, maritime, aviation, weather and traffic systems provide the main data foundation." },
      { name: "Ten indoor collection stations", desc: "Complementary local observations for selected air-quality, water-quality and crowd-density indicators." },
      { name: "Privacy-preserving observations", desc: "Aggregated measurements and carefully governed collection methods support the twin without storing personal data." },
    ],
    tech: ["Battery + photovoltaic", "NB-IoT / LoRaWAN", "Edge processing", "IP-protected optics"],
  },
];

/* ── Sustainability indicator categories ────────────────────────────── */
export interface IndicatorCategory {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
  gstc: string;
  desc: string;
  reading: string;
  indicators: string[];
  sample: { label: string; value: string; threshold: string };
}
export const INDICATOR_CATEGORIES: IndicatorCategory[] = [
  {
    id: "air",
    name: "Air Quality",
    icon: Wind,
    color: "#E2470B",
    gstc: "D(c) Waste & Emissions",
    desc: "Atmospheric pollutant concentrations measured in-situ and cross-validated against Copernicus CAMS regional forecasts.",
    indicators: ["O₃ concentration", "PM2.5", "PM10", "CO₂", "NOₓ", "SO₂"],
    reading: "PM10 is the mass of airborne particles under 10 µm that can reach the lungs. 27 µg/m³ is a daily mean well below the 50 µg/m³ advisory line; only a sustained breach raises a public alert.",
    sample: { label: "PM10 · Corfu town", value: "27 µg/m³", threshold: "alert when PM10 > 50 µg/m³" },
  },
  {
    id: "water",
    name: "Water Quality",
    icon: Droplets,
    color: "#0086EA",
    gstc: "D(b) Resource Management",
    desc: "Sea surface temperature, turbidity, chlorophyll-a and bacterial indicators from CMEMS and coastal stations.",
    indicators: ["Sea surface temp", "Turbidity", "Chlorophyll-a", "Coliform bacteria"],
    reading: "Chlorophyll-a is a proxy for phytoplankton and nutrient load. A coastal value of 0.42 mg/m³ indicates low nutrient pressure; 1.0 mg/m³ flags an increased risk of algal bloom.",
    sample: { label: "Chlorophyll-a · Glyfada", value: "0.42 mg/m³", threshold: "alert when chlorophyll-a > 1.0 mg/m³" },
  },
  {
    id: "noise",
    name: "Noise Pollution",
    icon: Volume2,
    color: "#7C6FF0",
    gstc: "D(c) Waste & Emissions",
    desc: "Decibel levels at key cultural and natural sites, with temporal patterns across the season.",
    indicators: ["dB levels at key sites", "Night-time noise", "Event peaks", "Temporal patterns"],
    reading: "A-weighted decibels approximate how loud a sound feels to humans. A night-time level of 61 dB(A) in a historic square exceeds the 55 dB(A) guideline and may disturb sleep.",
    sample: { label: "Old Town square, 23:00", value: "61 dB(A)", threshold: "alert when night noise > 55 dB(A)" },
  },
  {
    id: "crowd",
    name: "Crowd Density",
    icon: Users,
    color: "#FABF5D",
    gstc: "A(c) Managing Pressure",
    desc: "Pedestrian flow, dwell times and zone occupancy from privacy-preserving optical counting — the twin's core pressure signal.",
    indicators: ["Pedestrian flow rates", "Dwell times", "Zone occupancy", "Carrying capacity %"],
    reading: "Occupancy is the share of a site's carrying capacity currently in use. At 92%, the Old Port exceeds the 85% comfort threshold, triggering rerouting recommendations and crowd-management action.",
    sample: { label: "Old Port · Corfu", value: "92% capacity", threshold: "alert when occupancy > 85%" },
  },
  {
    id: "transport",
    name: "Transport Pressure",
    icon: Car,
    color: "#5A6258",
    gstc: "D(f) Transport",
    desc: "Road congestion, public-transport uptake and parking occupancy fused from traffic APIs and maritime/aviation arrivals.",
    indicators: ["Congestion index", "Public transport usage", "Parking occupancy", "Ferry & flight volumes"],
    reading: "Port arrivals count scheduled ferry calls per day. Twelve calls remain below the 14-per-day saturation line, so quay and road handling are still within the modelled capacity.",
    sample: { label: "Corfu port arrivals", value: "12 ferries/day", threshold: "alert when arrivals > 14 ferries/day" },
  },
  {
    id: "energy",
    name: "Energy Consumption",
    icon: Zap,
    color: "#E79A1F",
    gstc: "D(b) Resource Management",
    desc: "Tourism-sector energy demand and the renewable share of supply across islands.",
    indicators: ["Tourism-sector energy use", "Renewable share", "Peak demand", "Grid stress hours"],
    reading: "Peak demand is the seasonal maximum grid load compared with a low-season baseline. A +38% August peak exceeds the +30% stress line, indicating reduced supply margin and local grid strain.",
    sample: { label: "Peak demand · August", value: "+38% vs. baseline", threshold: "alert when increase > 30%" },
  },
  {
    id: "waste",
    name: "Waste Generation",
    icon: Trash2,
    color: "#6B8A3E",
    gstc: "D(c) Waste & Emissions",
    desc: "Solid waste per visitor, recycling rates and single-use plastic prevalence across destinations.",
    indicators: ["Solid waste per visitor", "Recycling rates", "Single-use plastics", "Collection overflows"],
    reading: "Solid waste per visitor-day estimates the tourism-related disposal load. 2.1 kg per day is below the 2.5 kg alert line, but remains above a low-impact target.",
    sample: { label: "Waste / visitor-day", value: "2.1 kg", threshold: "alert when waste > 2.5 kg/day" },
  },
  {
    id: "biodiversity",
    name: "Biodiversity Impact",
    icon: Bird,
    color: "#2F7D4A",
    gstc: "D(a) Conservation",
    desc: "NDVI vegetation trends from Sentinel-2, habitat disturbance indices and invasive-species alerts.",
    indicators: ["NDVI trends", "Habitat disturbance", "Posidonia meadow health", "Invasive species alerts"],
    reading: "The Normalised Difference Vegetation Index estimates green vegetation density from Sentinel-2 imagery. A 4.2% year-on-year decline beyond the 3% threshold signals possible habitat degradation at the dune sites.",
    sample: { label: "NDVI · dune sites", value: "−4.2% YoY", threshold: "alert when decline > 3% YoY" },
  },
  {
    id: "heritage",
    name: "Cultural Heritage",
    icon: Landmark,
    color: "#B93807",
    gstc: "C(a) Cultural Heritage",
    desc: "Visitor counts at monuments, structural monitoring and heritage-condition indices for the islands' historic assets.",
    indicators: ["Site visitor counts", "Structural monitoring", "Heritage condition index", "Carrying capacity"],
    reading: "Daily visitor throughput is a proxy for physical pressure on a monument. 6,400 visits remain below the 7,000-per-day conservation limit, keeping footfall within the modelled tolerance.",
    sample: { label: "Old Fortress · daily", value: "6,400 visitors", threshold: "alert when visitors > 7,000/day" },
  },
  {
    id: "socio",
    name: "Socio-Economic",
    icon: Coins,
    color: "#0069B8",
    gstc: "B(a) Economic Benefits",
    desc: "Visitor expenditure, local employment and the distribution of tourism's economic benefit across communities.",
    indicators: ["Visitor expenditure", "Local employment", "Benefit distribution", "Season length"],
    reading: "Average expenditure per visitor-day estimates how much tourism value remains in the local economy. At €142, the destination exceeds the €120 target, indicating meaningful local retention.",
    sample: { label: "Avg. spend / visitor-day", value: "€142", threshold: "target: ≥ €120/visitor-day" },
  },
];

/* ── Technical stack ────────────────────────────────────────────────── */
export const STACK = [
  { layer: "Frontend — Web", tech: ["React / Vue.js", "Mapbox GL", "Leaflet", "D3.js", "Chart.js"], desc: "Accessible, map-first dashboards" },
  { layer: "Frontend — Mobile", tech: ["React Native / Flutter", "Push notifications", "Offline-first"], desc: "Citizen & visitor companion" },
  { layer: "Backend", tech: ["Python · FastAPI", "Django", "Node.js microservices"], desc: "APIs and service orchestration" },
  { layer: "GIS & Spatial", tech: ["PostGIS", "GeoServer", "QGIS", "Google Earth Engine"], desc: "The spatial nervous system" },
  { layer: "Data Processing", tech: ["Apache Kafka", "Apache Spark", "Apache Flink"], desc: "Streaming and batch pipelines" },
  { layer: "Databases", tech: ["PostgreSQL + PostGIS", "TimescaleDB", "Elasticsearch"], desc: "Spatial, time-series and search" },
  { layer: "ML / AI", tech: ["scikit-learn", "TensorFlow / PyTorch", "Hugging Face"], desc: "Forecasting and anomaly detection" },
  { layer: "LLM Interface", tech: ["RAG — LangChain / LlamaIndex", "NL-to-SQL", "Data warehouse"], desc: "Conversational access to the twin" },
  { layer: "IoT Ingestion", tech: ["MQTT broker", "LoRaWAN network server", "Azure / AWS IoT Hub"], desc: "Sensor-to-cloud connectivity" },
  { layer: "Satellite Data", tech: ["Copernicus CDSE", "Sentinel Hub", "Google Earth Engine"], desc: "Orbit-scale observation" },
  { layer: "Cloud & Hosting", tech: ["EU cloud (GDPR)", "Kubernetes / OpenShift"], desc: "European, sovereign by design" },
  { layer: "Monitoring & Ops", tech: ["Prometheus", "Grafana", "Email · push · SMS alerts"], desc: "Keep-the-lights-on layer" },
];

/* ── Deliverables ───────────────────────────────────────────────────── */
export const DELIVERABLES = [
  { id: "D1", name: "Data Collection and Integration", desc: "Integration of open web data, existing systems and ten indoor collection stations for selected environmental observations.", phase: "2027 · H1" },
  { id: "D2", name: "Data Ingestion Platform", desc: "Unified pipeline for all heterogeneous streams — satellite, maritime, aviation, weather, traffic and crowdsourced.", phase: "2027 · H2" },
  { id: "D3", name: "Digital Twin Web Dashboard", desc: "Multi-layer GIS platform with real-time overlays, heatmaps and trend visualisation.", phase: "2028 · H1" },
  { id: "D4", name: "Dynamic Crowding & Pollution Map", desc: "Interactive map of pollutant concentrations, historical data and AI-predicted trends.", phase: "2028 · H1" },
  { id: "D5", name: "Composite Pressure & Sustainability Index", desc: "AI-derived composite metric aligned with GSTC v2.0, computed across 34 indicators.", phase: "2028 · H2" },
  { id: "D6", name: "ML/AI Predictive Engine", desc: "Correlation models linking tourism to environmental conditions; anomaly detection; forecasting.", phase: "2028 · H2" },
  { id: "D7", name: "LLM Query Interface", desc: "Natural-language interface for stakeholders to query the twin conversationally.", phase: "2028 · H2" },
  { id: "D8", name: "Mobile Application", desc: "Citizen and visitor app with alerts, crowdsourcing and alternative recommendations — WCAG 2.0 compliant.", phase: "2029 · H1" },
  { id: "D9", name: "Sustainability Assessment Report", desc: "Final evaluation of destination sustainability with concrete policy recommendations.", phase: "2029 · Q1" },
];

/* ── Timeline ───────────────────────────────────────────────────────── */
export const TIMELINE = [
  {
    period: "Jan — Jun 2027",
    title: "Integrate",
    body: "Open web data and existing system feeds are connected to the platform. Ten indoor collection stations provide complementary local measurements and establish baselines.",
    id: "D1",
  },
  {
    period: "Jul — Dec 2027",
    title: "Ingest",
    body: "Unified ingestion platform comes online. Satellite, maritime, aviation, weather, traffic and citizen streams fuse into one data lake.",
    id: "D2",
  },
  {
    period: "Jan — Dec 2028",
    title: "Model",
    body: "Dashboard, crowding map, composite index, predictive engine and LLM interface ship — the twin becomes fully operational.",
    id: "D3 – D7",
  },
  {
    period: "Jan — Mar 2029",
    title: "Empower",
    body: "Mobile app launch, WCAG-compliant roll-out and the final sustainability assessment with policy recommendations.",
    id: "D8 – D9",
  },
];

/* ── Funding facts ──────────────────────────────────────────────────── */
export const FUNDING = [
  { k: "Programme", v: "Operational Programme “Ionian Islands” 2021–2027" },
  { k: "Priority", v: "Regional competitiveness — entrepreneurship, innovation, digital transformation" },
  { k: "Specific objective", v: "RSO 1.1 — Enhancing research and innovation" },
  { k: "Sector", v: "Tourism" },
  { k: "Applicant", v: "Ionian University — ELKE-IP, Special Account for Research Funds" },
  { k: "Budget", v: "€250,000 — co-financed by the European Regional Development Fund" },
  { k: "Duration", v: "1 September 2026 → 31 March 2029 (30 months)" },
  { k: "Region", v: "Corfu · Paxi · Lefkada · Kefalonia · Ithaca · Zakynthos" },
];

/* ── Related projects ───────────────────────────────────────────────── */
export const RELATED = [
  { name: "STAND — Corfu Pilot", desc: "AI-powered system combining real-time pollution data with tourism activity in Corfu — the project's closest precedent.", url: "https://indiaoutbound.info/trade-news/corfu-to-use-ai-to-measure-tourist-pressure-and-pollution/" },
  { name: "HERIT ADAPT", desc: "EU Interreg Euro-MED project applying digital twins and IoT to sustainable cultural-heritage tourism across the Mediterranean.", url: "https://heritadapt.interreg-euro-med.eu/" },
  { name: "3DxVERSE", desc: "EU initiative advancing open, interoperable Local Digital Twins for cities and communities.", url: "https://3dxverse.eu/" },
  { name: "HERITWIN", desc: "Horizon Europe project on Cultural Heritage Digital Twins with semantic interoperability.", url: "https://cordis.europa.eu/project/id/101287315" },
  { name: "TOURISMO", desc: "EU Interreg Euro-MED project on innovative tourism-flow monitoring with IoT and big data.", url: "https://www.veda-bg.eu/projects/tourismo" },
  { name: "BIONIAN", desc: "Ionian Islands biodiversity GIS platform with smart mapping systems.", url: "https://bionian-project.gr/en/index" },
  { name: "Pelourinho Digital Twin", desc: "QGIS-based, data-centric digital twin for tourism and heritage in Salvador, Brazil.", url: "https://doi.org/10.48550/arxiv.2603.00079" },
  { name: "Corfu Spatiotemporal Big Data", desc: "Prototype integrating IoT, EO imagery and user-generated data for Corfu tourism governance.", url: "https://doi.org/10.1007/s40558-025-00338-y" },
  { name: "Tourism Square — DestinE", desc: "ESA Destination Earth dashboard monitoring environmental indicators for tourism compatibility.", url: "https://platform.destine.eu/services/service/tourism-square/" },
  { name: "Trailblaze", desc: "ESA-funded AI platform integrating Copernicus EO data for personalised tourism recommendations.", url: "https://business.esa.int/projects/trailblaze" },
];

/* ── References ─────────────────────────────────────────────────────── */
export const REFERENCE_GROUPS = [
  {
    title: "Standards & Criteria",
    items: [
      { label: "GSTC Destination Criteria v2.0", source: "Global Sustainable Tourism Council, Dec 2019", url: "https://www.gstc.org/wp-content/uploads/GSTC-Destination-Criteria-v2.0-2022.pdf" },
      { label: "GSTC Destination Standard", source: "Official GSTC criteria page", url: "https://www.gstc.org/gstc-criteria/gstc-destination-criteria/" },
      { label: "WCAG 2.0", source: "W3C Web Content Accessibility Guidelines", url: "https://www.w3.org/TR/WCAG20/" },
    ],
  },
  {
    title: "Academic Literature",
    items: [
      { label: "Digital Twins in Smart Tourist Destinations", source: "MDPI, 2025", url: "https://www.mdpi.com/2673-4060/6/4/148" },
      { label: "Leveraging spatiotemporal big data for sustainable destination development", source: "Springer, 2025", url: "https://doi.org/10.1007/s40558-025-00338-y" },
      { label: "Dynamic Map-based Data-Centric Approach for Tourism & Cultural Heritage Digital Twins", source: "arXiv, 2026", url: "https://doi.org/10.48550/arxiv.2603.00079" },
      { label: "A Data-Scarce Digital Twin for Tourism-Driven Island Mobility: Milos, Greece", source: "Research Square, 2026", url: "https://doi.org/10.21203/rs.3.rs-9982997/v1" },
    ],
  },
  {
    title: "Data Providers",
    items: [
      { label: "Copernicus Atmosphere Monitoring Service (CAMS)", source: "Atmosphere data", url: "https://atmosphere.copernicus.eu/" },
      { label: "Copernicus Marine Service (CMEMS)", source: "Marine data", url: "https://marine.copernicus.eu/" },
      { label: "Copernicus Data Space Ecosystem", source: "Sentinel imagery", url: "https://dataspace.copernicus.eu/" },
      { label: "OpenWeather API", source: "Meteorological data", url: "https://openweathermap.org/api" },
      { label: "MarineTraffic", source: "Maritime AIS data", url: "https://www.marinetraffic.com/" },
      { label: "Google Maps Platform", source: "Traffic data", url: "https://mapsplatform.google.com/" },
    ],
  },
  {
    title: "Regional Context",
    items: [
      { label: "PEP Ionian Islands Programme", source: "Managing Authority, Ionian Islands 2021–2027", url: "https://pepionia.gr" },
      { label: "Ionian Islands Smart Sensor Initiative", source: "Travel and Tour World", url: "https://www.travelandtourworld.com/news/article/796q0nvewhb2/" },
      { label: "Corfu AI Tourist Pressure Monitoring", source: "India Outbound", url: "https://indiaoutbound.info/trade-news/corfu-to-use-ai-to-measure-tourist-pressure-and-pollution/" },
    ],
  },
];

/* ── Data sources table ─────────────────────────────────────────────── */
export interface DataSource {
  icon: LucideIcon;
  source: string;
  type: string;
  provides: string;
  access: string;
}
export const DATA_SOURCES: DataSource[] = [
  { icon: Radio, source: "Indoor collection stations (10)", type: "Complementary environmental", provides: "Selected air-quality, water-quality, noise and crowd observations", access: "Local systems → cloud" },
  { icon: Satellite, source: "Copernicus CAMS", type: "Atmospheric", provides: "European air-quality forecasts, pollutant concentrations", access: "API — CAMS Regional" },
  { icon: Waves, source: "Copernicus CMEMS", type: "Marine", provides: "Sea temperature, chlorophyll, turbidity, currents, waves", access: "Copernicus Marine Data Store" },
  { icon: Satellite, source: "Sentinel-2", type: "Optical imagery", provides: "NDVI vegetation health, land-cover change", access: "Copernicus Data Space" },
  { icon: Satellite, source: "Sentinel-1", type: "SAR radar", provides: "Crowd-density estimation, flood detection", access: "Copernicus Data Space" },
  { icon: Ship, source: "MarineTraffic", type: "Maritime", provides: "Vessel positions, port arrivals & departures, ship density", access: "API" },
  { icon: Plane, source: "FlightRadar24", type: "Aviation", provides: "Aircraft arrivals/departures, flight volume at regional airports", access: "API" },
  { icon: Sun, source: "OpenWeather", type: "Meteorological", provides: "Temperature, humidity, wind, precipitation, UV index", access: "API" },
  { icon: Car, source: "Google Maps Platform", type: "Traffic", provides: "Real-time congestion indices, road conditions", access: "API" },
  { icon: Radio, source: "PeopleFlows", type: "Mobility research", provides: "Movement-flow data for understanding pedestrian and visitor mobility patterns", access: "peopleflows.di.ionio.gr" },
  { icon: Coins, source: "EU Tourism Dashboard", type: "Statistics", provides: "Historical tourism statistics, expenditure, employment", access: "Eurostat / CSV" },
  { icon: Smartphone, source: "Citizen Reports", type: "Crowdsourced", provides: "Ground-level condition reports, photos, accessibility issues", access: "Mobile app → backend" },
];

/* ── Platform pillars ───────────────────────────────────────────────── */
export const PILLARS = [
  { icon: Monitor, title: "Web Dashboard", desc: "A big-data geospatial platform: environmental quality maps, layered overlays, predictive analytics and the region's composite sustainability index.", points: ["Dynamic environment & wellbeing map", "Multi-layer GIS overlays", "Composite GSTC v2.0 index", "Predictive analytics engine"] },
  { icon: Smartphone, title: "Mobile Application", desc: "The twin in every pocket — real-time alerts derived from integrated open and system data, citizen reports that complement the data lake, and greener-activity recommendations.", points: ["Air & water-quality alerts", "Citizen reports as complementary data", "Low-impact activity suggestions", "WCAG 2.0 · Law 4074/2012"] },
  { icon: BrainCircuit, title: "LLM Query Interface", desc: "Ask the twin anything. A RAG pipeline translates natural language into SQL against the data lake — stakeholders think out loud, the platform answers.", points: ["Natural language → SQL", "RAG over the data lake", "Multilingual stakeholder access", "No GIS expertise required"] },
];

/* ── Sustainability commitments ─────────────────────────────────────── */
export const GOALS = [
  {
    n: "01",
    title: "Protect the ecosystems",
    body: "Give Posidonia meadows, dunes and forest habitat a continuous, measurable line of defence rather than a once-a-year survey.",
  },
  {
    n: "02",
    title: "Keep resources in balance",
    body: "Match water and energy demand to what the islands can genuinely supply — and prove it with data, season after season.",
  },
  {
    n: "03",
    title: "Measure against GSTC v2.0",
    body: "Turn 34 indicators into one auditable index, so sustainability claims become evidence a certifier can verify.",
  },
  {
    n: "04",
    title: "Keep the benefit local",
    body: "Make visible where tourism's value lands, so policy can strengthen the communities who steward these islands.",
  },
];
