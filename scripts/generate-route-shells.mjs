/* Generates static, SEO-readable HTML shells for every app route.
 * Run: node scripts/generate-route-shells.mjs
 * Outputs (committed to /public so every `vite build` ships them):
 *   public/<route>/index.html  × 15  +  public/404.html
 *
 * Why shells? The interactive app is a single-file SPA using BrowserRouter
 * with clean URLs, so crawlers and no-JS clients would otherwise see an
 * empty <div id="root">. Each shell carries route-specific title/meta/OG/
 * JSON-LD plus a static bilingual summary, then hands capable browsers to
 * the live app via a transient `?route=/<path>/` redirect that main.tsx
 * restores to the clean path (no hash, no lingering query string). When a
 * shell is opened straight from disk (file://) the redirect falls back to
 * the relative `index.html#/<path>/` form, which the app's file-mode
 * HashRouter understands.
 *
 * All in-site links, icons and the hand-off are written relative to the
 * shell's own depth (../ per path segment), so the same output works at the
 * domain root (ioniandtwin.di.ionio.gr) and under a sub-path such as GitHub
 * project pages. Canonical / Open Graph URLs stay absolute on purpose.
 */
import { mkdirSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pub = join(root, "public");
const SITE = "https://ioniandtwin.di.ionio.gr";

const FACTS_EL = "Κωδικός ΟΠΣ 6061866 · Προϋπολογισμός 239.900,00 € · Διάρκεια 01/09/2026–31/03/2029 · Συγχρηματοδότηση ΕΤΠΑ, Πρόγραμμα «Ιόνια Νησιά 2021–2027» · Δικαιούχος: ΕΛΚΕ Ιονίου Πανεπιστημίου · Φορέας υλοποίησης: Τμήμα Πληροφορικής.";
const FACTS_EN = "OPS code 6061866 · Budget €239,900.00 · Duration 01/09/2026–31/03/2029 · ERDF co-funded, “Ionian Islands 2021–2027” programme · Beneficiary: Ionian University ELKE · Implemented by the Department of Informatics.";

/** route, Greek title/lede, English title/lede */
const ROUTES = [
  {
    path: "about/challenge",
    crumb: ["About", "Challenge"],
    titleEl: "Η πρόκληση της βιωσιμότητας στα Ιόνια Νησιά",
    ledeEl: "Στην καλοκαιρινή αιχμή, η επισκεψιμότητα πιέζει τις υποδομές ύδρευσης, ενέργειας και μεταφορών, τις ακτές και τα θαλάσσια οικοσυστήματα, καθώς και την καθημερινότητα των μόνιμων κατοίκων. Τα διαθέσιμα στοιχεία είναι συνήθως αποσπασματικά και στατικά — το IonianDTwin τα αντικαθιστά με συνεχή, μετρήσιμη παρακολούθηση.",
    titleEn: "The sustainability challenge in the Ionian Islands",
    ledeEn: "At the summer peak, visitor numbers strain water, energy and transport infrastructure, beaches and marine ecosystems, and residents' daily life. Available evidence is usually fragmented and static — IonianDTwin replaces it with continuous, measurable monitoring.",
  },
  {
    path: "about/project",
    crumb: ["About", "Project"],
    titleEl: "Το έργο IonianDTwin",
    ledeEl: "«IonianDTwin: Ψηφιακό Δίδυμο για τη Δυναμική Μοντελοποίηση και την Ευφυή Εξισορρόπηση της Αστικής Βιωσιμότητας και του Τουρισμού των Ιονίων Νήσων». Σκοπός: να αποκτήσουν η Περιφέρεια, οι Δήμοι, οι επιχειρήσεις και οι πολίτες ένα κοινό εργαλείο που δείχνει με μετρήσιμα δεδομένα πώς επηρεάζει ο τουρισμός τα νησιά.",
    titleEn: "The IonianDTwin project",
    ledeEn: "“IonianDTwin: Digital Twin for the Dynamic Modelling and Intelligent Balancing of Urban Sustainability and Tourism in the Ionian Islands”. Goal: give the Region, municipalities, businesses and citizens a shared tool showing — with measurable data — how tourism affects the islands.",
  },
  {
    path: "about/architecture",
    crumb: ["About", "Architecture"],
    titleEl: "Αρχιτεκτονική του Ψηφιακού Διδύμου",
    ledeEl: "Πέντε συνεργαζόμενα επίπεδα: συλλογή δεδομένων (αισθητήρες, Copernicus, λιμάνια, αεροδρόμια), λίμνη δεδομένων και διαλειτουργικότητα, μηχανές δεικτών και μοντέλων, γεωχωρικές υπηρεσίες GIS και τρεις διεπαφές — πίνακας ελέγχου, κινητή εφαρμογή και διεπαφή φυσικής γλώσσας.",
    titleEn: "Digital Twin architecture",
    ledeEn: "Five cooperating layers: data capture (sensors, Copernicus, ports, airports), data lake and interoperability, indicator and model engines, geospatial GIS services, and three interfaces — dashboard, mobile app and natural-language access.",
  },
  {
    path: "about/technology",
    crumb: ["About", "Technology"],
    titleEl: "Τεχνολογίες: Copernicus, μηχανική μάθηση, LLM",
    ledeEl: "Δορυφορικά δεδομένα Copernicus (Sentinel, CAMS, CMEMS), επίγειοι αισθητήρες και ανοικτές πηγές τροφοδοτούν μοντέλα μηχανικής μάθησης για πρόβλεψη ζήτησης, συμφόρησης και φόρτου υποδομών. Μεγάλα Γλωσσικά Μοντέλα με ανάκτηση (RAG) απαντούν σε ερωτήσεις με απλή γλώσσα.",
    titleEn: "Technologies: Copernicus, machine learning, LLMs",
    ledeEn: "Copernicus satellite data (Sentinel, CAMS, CMEMS), ground sensors and open sources feed machine-learning models forecasting demand, congestion and infrastructure load. Retrieval-augmented Large Language Models answer questions in plain language.",
  },
  {
    path: "platform",
    crumb: ["Platform"],
    titleEl: "Η πλατφόρμα IonianDTwin",
    ledeEl: "Μία κεντρική πλατφόρμα παρακολούθησης, πρόβλεψης και ειδοποίησης για την Περιφέρεια και τους Δήμους, συνοδευόμενη από κινητή εφαρμογή για πολίτες και επισκέπτες και από ευφυή διεπαφή ερωτήσεων. Πιλοτική δοκιμή σε πραγματικές συνθήκες κατά την τουριστική περίοδο.",
    titleEn: "The IonianDTwin platform",
    ledeEn: "One central monitoring, forecasting and alerting platform for the Region and municipalities, plus a mobile app for citizens and visitors and an intelligent query interface. Pilot-tested under real conditions during the tourist season.",
  },
  {
    path: "platform/dashboard",
    crumb: ["Platform", "Dashboard"],
    titleEl: "Πίνακας ελέγχου σε πραγματικό χρόνο",
    ledeEl: "Διαδραστικός γεωχωρικός πίνακας: χάρτης των Ιονίων με σταθμούς παρακολούθησης, θερμικοί χάρτες πίεσης, χρονοσειρές δεικτών, προβλέψεις και ειδοποιήσεις κατωφλίων — με φίλτρα ανά νησί, θεματικό επίπεδο και χρονικό ορίζοντα.",
    titleEn: "Real-time dashboard",
    ledeEn: "Interactive geospatial dashboard: Ionian map with monitoring stations, pressure heatmaps, indicator time series, forecasts and threshold alerts — filterable by island, thematic layer and time horizon.",
  },
  {
    path: "platform/mobile-app",
    crumb: ["Platform", "Mobile app"],
    titleEl: "Κινητή εφαρμογή για πολίτες και επισκέπτες",
    ledeEl: "Ενημέρωση και ειδοποιήσεις για περιβαλλοντικές συνθήκες και συμφόρηση, προτάσεις εναλλακτικών χαμηλής πίεσης και συμμετοχική συνεισφορά δεδομένων από τους ίδιους τους χρήστες — ο πολίτης ως αισθητήρας.",
    titleEn: "Mobile app for citizens and visitors",
    ledeEn: "Updates and alerts on environmental conditions and congestion, low-pressure alternative suggestions, and participatory data contribution by users themselves — the citizen as a sensor.",
  },
  {
    path: "platform/intelligence",
    crumb: ["Platform", "Intelligence"],
    titleEl: "Τεχνητή νοημοσύνη και ερωτήσεις σε φυσική γλώσσα",
    ledeEl: "Ρωτήστε το δίδυμο με απλά λόγια: «Ποιες παραλίες πιέζονται περισσότερο αυτό το Σαββατοκύριακο;». Η μηχανή RAG συνδυάζει ζωντανά δεδομένα και τεκμηρίωση δεικτών και απαντά με πηγές, διαγράμματα και χάρτες.",
    titleEn: "Artificial intelligence and natural-language questions",
    ledeEn: "Ask the twin in plain words: “Which beaches are most pressured this weekend?”. The RAG engine combines live data with indicator documentation and answers with sources, charts and maps.",
  },
  {
    path: "indicators",
    crumb: ["Indicators"],
    titleEl: "34 δείκτες βιωσιμότητας, ευθυγραμμισμένοι με το GSTC",
    ledeEl: "Ποιότητα αέρα και ύδατος, θόρυβος, πυκνότητα πλήθους, μεταφορές, ενέργεια, απόβλητα, βιοποικιλότητα, πολιτιστική κληρονομιά και κοινωνικο-οικονομικά μεγέθη — 34 δείκτες ευθυγραμμισμένοι με τα διεθνή κριτήρια του Global Sustainable Tourism Council (GSTC).",
    titleEn: "34 sustainability indicators, aligned with GSTC",
    ledeEn: "Air and water quality, noise, crowd density, transport, energy, waste, biodiversity, cultural heritage and socio-economic metrics — 34 indicators aligned with the Global Sustainable Tourism Council (GSTC) criteria.",
  },
  {
    path: "resources/data-sources",
    crumb: ["Resources", "Data sources"],
    titleEl: "Περισσότερες από 25 πηγές δεδομένων",
    ledeEl: "Copernicus (αέρας, θάλασσα, βλάστηση), ύδατα κολύμβησης, μικροκλίμα, αφίξεις αεροδρομίων και λιμανιών, πληρότητα παραλιών, κυκλοφορία, κάλυψη κινητής και οικονομικά στοιχεία τουρισμού — ενοποιημένα σε ενιαίο γεωχωρικό μοντέλο.",
    titleEn: "More than 25 data sources",
    ledeEn: "Copernicus (air, sea, vegetation), bathing waters, microclimate, airport and port arrivals, beach occupancy, traffic, mobile coverage and tourism economics — unified in a single geospatial model.",
  },
  {
    path: "resources/related-projects",
    crumb: ["Resources", "Related projects"],
    titleEl: "Συναφή έργα και συνέργειες",
    ledeEl: "Το IonianDTwin συνομιλεί με ευρωπαϊκές και εθνικές πρωτοβουλίες για ψηφιακά δίδυμα προορισμών, βιώσιμο τουρισμό και παρατήρηση Γης — από το Destination Earth μέχρι περιφερειακά παρατηρητήρια.",
    titleEn: "Related projects and synergies",
    ledeEn: "IonianDTwin connects with European and national initiatives on destination digital twins, sustainable tourism and Earth observation — from Destination Earth to regional observatories.",
  },
  {
    path: "resources/references",
    crumb: ["Resources", "References"],
    titleEl: "Βιβλιογραφία και πρότυπα",
    ledeEl: "GSTC Destination Criteria v2.0, τεκμηρίωση Copernicus (CAMS, CMEMS, CLMS), μεθοδολογίες φέρουσας ικανότητας και βασική βιβλιογραφία για ψηφιακά δίδυμα και βιώσιμο τουρισμό.",
    titleEn: "Bibliography and standards",
    ledeEn: "GSTC Destination Criteria v2.0, Copernicus documentation (CAMS, CMEMS, CLMS), carrying-capacity methodologies and core literature on digital twins and sustainable tourism.",
  },
  {
    path: "blog",
    crumb: ["News"],
    titleEl: "Νέα, ανακοινώσεις και Δελτία Τύπου",
    ledeEl: "Επίσημο Δελτίο Τύπου έναρξης του έργου, επιστημονικές ανακοινώσεις για τους δείκτες GSTC και την παρατήρηση Γης, τεχνολογικές ενημερώσεις για AI και πιλοτικές εφαρμογές στα νησιά.",
    titleEn: "News, announcements and press releases",
    ledeEn: "Official project launch press release, scientific updates on GSTC indicators and Earth observation, technology briefings on AI, and island pilot deployments.",
  },
  {
    path: "contact",
    crumb: ["Contact"],
    titleEl: "Επικοινωνία με την ομάδα του έργου",
    ledeEl: "Τμήμα Πληροφορικής, Ιόνιο Πανεπιστήμιο — Επιστημονικός Υπεύθυνος: Καθηγητής Εμμανουήλ Μάγκος. Φόρμα επικοινωνίας και στοιχεία για φορείς, επιχειρήσεις και ερευνητές.",
    titleEn: "Contact the project team",
    ledeEn: "Department of Informatics, Ionian University — Scientific Coordinator: Professor Emmanouel Magkos. Contact form and details for authorities, businesses and researchers.",
  },
  {
    path: "privacy",
    crumb: ["Privacy"],
    titleEl: "Απόρρητο και προστασία δεδομένων",
    ledeEl: "Πώς συλλέγονται και προστατεύονται τα δεδομένα: ανωνυμοποίηση, συγκατάθεση, δικαιώματα υποκειμένων και συμμόρφωση με τον ΓΚΠΔ (GDPR) σε όλες τις διεπαφές του έργου.",
    titleEn: "Privacy and data protection",
    ledeEn: "How data is collected and protected: anonymisation, consent, data-subject rights and GDPR compliance across all project interfaces.",
  },
];

/* Brand: logo waves terracotta / sand / Ionian blue on the moss-charcoal tile.
   Keep in sync with public/favicon.svg and src/components/ui.tsx (BRAND_WAVES). */
const BRAND = { wave1: "#C8502E", wave2: "#E4B671", wave3: "#0F80C5", ink: "#1E221D" };
const LOGO = `<svg width="40" height="40" viewBox="0 0 32 32" aria-hidden="true"><rect width="32" height="32" rx="8" fill="${BRAND.ink}"/><path d="M6.5 10c3.1-2.4 6.4-2.4 9.5 0s6.4 2.4 9.5 0" stroke="${BRAND.wave1}" stroke-width="2.1" fill="none" stroke-linecap="round"/><path d="M6.5 16c3.1-2.4 6.4-2.4 9.5 0s6.4 2.4 9.5 0" stroke="${BRAND.wave2}" stroke-width="2.1" fill="none" stroke-linecap="round"/><path d="M6.5 22c3.1-2.4 6.4-2.4 9.5 0s6.4 2.4 9.5 0" stroke="${BRAND.wave3}" stroke-width="2.1" fill="none" stroke-linecap="round"/></svg>`;

/* Mirrors the "Ionian" palette in src/i18n/palette.tsx (system fonts only —
   shells must render before any web font is available). */
const CSS = `*{box-sizing:border-box}body{margin:0;font-family:"IBM Plex Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;background:#F7F5EF;color:#1E221D;line-height:1.65}header.top{background:#1E221D;color:#fff;padding:18px 24px;display:flex;align-items:center;gap:14px}header.top a{color:#fff;text-decoration:none;font-weight:700;font-size:20px}.waves{height:6px;background:linear-gradient(90deg,${BRAND.wave1} 0 33%,${BRAND.wave2} 33% 66%,${BRAND.wave3} 66% 100%)}main{max-width:760px;margin:0 auto;padding:40px 24px 64px}.eyebrow{font-family:ui-monospace,Menlo,monospace;font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:#0F80C5}h1{font-family:Literata,"Iowan Old Style","Palatino Linotype",Georgia,serif;font-weight:500;font-size:clamp(28px,5vw,42px);line-height:1.15;letter-spacing:-.01em;margin:12px 0 8px}h2{font-family:Literata,"Iowan Old Style","Palatino Linotype",Georgia,serif;font-weight:500;font-size:22px;margin:36px 0 8px}p{color:#4A4F47}.card{background:#fff;border:1px solid #DED9CD;border-radius:14px;padding:20px 22px;margin:22px 0}.cta{display:inline-block;background:#1E221D;color:#fff!important;font-weight:600;text-decoration:none;padding:13px 28px;border-radius:999px;margin-top:10px}.cta:hover{background:#0B669E}nav.links{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:10px;margin:26px 0}nav.links a{background:#fff;border:1px solid #DED9CD;border-radius:10px;padding:10px 14px;color:#1E221D;text-decoration:none;font-size:14px}nav.links a:hover{border-color:#0F80C5}footer{border-top:1px solid #DED9CD;padding:26px 24px;text-align:center;font-size:13px;color:#737870;background:#fff}.facts{font-size:13px}.skip{position:absolute;left:-9999px}`;

function navLinks(relRoot) {
  const items = [
    [relRoot, "Αρχική · Home"],
    ...ROUTES.map((r) => [relRoot + r.path + "/", r.crumb.join(" — ")]),
  ];
  return items.map(([href, label]) => `<a href="${href}">${label}</a>`).join("");
}

function jsonLd(r, url) {
  const items = [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE + "/" },
    ...r.crumb.map((c, i) => ({
      "@type": "ListItem",
      position: i + 2,
      name: c,
      item: url,
    })),
  ];
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${r.titleEl} — IonianDTwin`,
    description: r.ledeEl,
    url,
    inLanguage: ["el", "en"],
    isPartOf: { "@type": "WebSite", url: SITE + "/", name: "IonianDTwin" },
    breadcrumb: { "@type": "BreadcrumbList", itemListElement: items },
  };
}

function shell(r) {
  const url = `${SITE}/${r.path}/`;
  const cleanPath = `/${r.path}/`;
  const relRoot = "../".repeat(r.path.split("/").length);
  /* Hand-off target is relative to the shell, so it resolves to the app's
     index.html at whatever mount point the site is served from. */
  const appUrl = `${relRoot}?route=${cleanPath}`;
  return `<!doctype html>
<html lang="el">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${r.titleEl} — IonianDTwin</title>
<meta name="description" content="${r.ledeEl}" />
<meta name="description" lang="en" content="${r.ledeEn}" />
<meta name="robots" content="index, follow" />
<meta name="theme-color" content="#1E221D" />
<link rel="canonical" href="${url}" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="IonianDTwin" />
<meta property="og:locale" content="el_GR" />
<meta property="og:locale:alternate" content="en_US" />
<meta property="og:title" content="${r.titleEl} — IonianDTwin" />
<meta property="og:description" content="${r.ledeEl}" />
<meta property="og:url" content="${url}" />
<meta property="og:image" content="${SITE}/og-image-el.jpg" />
<meta property="og:image:width" content="1810" />
<meta property="og:image:height" content="922" />
<meta property="og:image:alt" content="IonianDTwin — Ψηφιακό Δίδυμο Ιονίων Νήσων" />
<meta property="og:image:type" content="image/jpeg" />
<meta property="og:image" content="${SITE}/og-image-en.jpg" />
<meta property="og:image:width" content="1775" />
<meta property="og:image:height" content="966" />
<meta property="og:image:alt" content="IonianDTwin — Digital Twin of the Ionian Islands" />
<meta property="og:image:type" content="image/jpeg" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${r.titleEl} — IonianDTwin" />
<meta name="twitter:description" content="${r.ledeEn}" />
<meta name="twitter:image" content="${SITE}/og-image-el.jpg" />
<meta name="twitter:image:alt" content="IonianDTwin — Ψηφιακό Δίδυμο Ιονίων Νήσων / Digital Twin of the Ionian Islands" />
<link rel="icon" type="image/svg+xml" href="${relRoot}favicon.svg" />
<link rel="apple-touch-icon" href="${relRoot}apple-touch-icon.png" />
<script type="application/ld+json">${JSON.stringify(jsonLd(r, url))}</script>
<style>${CSS}</style>
</head>
<body>
<a class="skip" href="#main">Μετάβαση στο περιεχόμενο</a>
<header class="top">${LOGO}<a href="${relRoot}">IonianDTwin</a></header>
<div class="waves" role="presentation"></div>
<main id="main">
<p class="eyebrow">${r.crumb.join(" · ")}</p>
<h1>${r.titleEl}</h1>
<p>${r.ledeEl}</p>
<div class="card">
<p style="margin-top:0"><strong>Διαδραστική εμπειρία:</strong> η πλήρης σελίδα με χάρτες, διαγράμματα και ζωντανά δεδομένα φορτώνει αυτόματα στην εφαρμογή IonianDTwin.</p>
<a class="cta" href="${appUrl}">Άνοιγμα στην εφαρμογή →</a>
</div>
<h2>In English — ${r.titleEn}</h2>
<p>${r.ledeEn}</p>
<p><a href="${appUrl}">Open the interactive page →</a></p>
<h2>Περιεχόμενα · Contents</h2>
<nav class="links" aria-label="Site">${navLinks(relRoot)}</nav>
<div class="card facts"><p style="margin:0"><strong>Ταυτότητα έργου · Project identity:</strong><br />${FACTS_EL}<br />${FACTS_EN}</p></div>
</main>
<div class="waves" role="presentation"></div>
<footer>IonianDTwin · Ιόνιο Πανεπιστήμιο — Τμήμα Πληροφορικής · OPS 6061866 · Συγχρηματοδότηση ΕΤΠΑ «Ιόνια Νησιά 2021–2027»<br /><a href="${relRoot}">ioniandtwin.di.ionio.gr</a></footer>
<script>(function(){try{location.replace(location.protocol==="file:"?"${relRoot}index.html#${cleanPath}":"${appUrl}");}catch(e){}})();</script>
</body>
</html>
`;
}

const NOT_FOUND = `<!doctype html>
<html lang="el">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Η σελίδα δεν βρέθηκε — IonianDTwin</title>
<meta name="description" content="Η σελίδα που ζητήσατε δεν υπάρχει. Επιστρέψτε στην αρχική του IonianDTwin." />
<meta name="robots" content="noindex, follow" />
<meta name="theme-color" content="#1E221D" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<style>${CSS}</style>
</head>
<body>
<header class="top">${LOGO}<a href="/" data-home>IonianDTwin</a></header>
<div class="waves" role="presentation"></div>
<main>
<p class="eyebrow">404</p>
<h1>Η σελίδα δεν βρέθηκε</h1>
<p>Η διεύθυνση που ζητήσατε δεν αντιστοιχεί σε περιεχόμενο. Αν ακολουθήσατε σύνδεσμο της εφαρμογής, θα μεταφερθείτε αυτόματα — διαφορετικά, επιστρέψτε στην αρχική.</p>
<p><a class="cta" href="/" data-home>Αρχική σελίδα →</a></p>
<h2>Περιεχόμενα · Contents</h2>
<nav class="links" aria-label="Site" data-links>${navLinks("/")}</nav>
</main>
<div class="waves" role="presentation"></div>
<footer>IonianDTwin · Ιόνιο Πανεπιστήμιο — Τμήμα Πληροφορικής · OPS 6061866</footer>
<script>(function(){try{
/* A 404 page is served at any URL, so the site root is unknown at author
   time. Match the request against the known app routes by suffix: the
   remainder is the mount point ("" at the domain root, "/<repo>" on GitHub
   Pages). Unknown paths keep root-absolute links. */
var p=location.pathname.replace(/\\/+$/,"");var known=${JSON.stringify(ROUTES.map((r) => "/" + r.path))};
var base="",route=null;for(var i=0;i<known.length;i++){if(p===known[i]||p.slice(-known[i].length)===known[i]){route=known[i];base=p.slice(0,p.length-known[i].length);break;}}
var root=base+"/";var els=document.querySelectorAll("[data-home],[data-links] a");for(var j=0;j<els.length;j++){var h=els[j].getAttribute("href");if(h&&h.charAt(0)==="/")els[j].setAttribute("href",root+h.slice(1));}
var ic=document.querySelector('link[rel="icon"]');if(ic)ic.setAttribute("href",root+"favicon.svg");
if(route!==null){location.replace(location.protocol==="file:"?"index.html#"+route+"/":root+"?route="+route+"/");}
}catch(e){}})();</script>
</body>
</html>
`;

for (const r of ROUTES) {
  const dir = join(pub, r.path);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), shell(r));
  console.log("shell:", r.path);
}
writeFileSync(join(pub, "404.html"), NOT_FOUND);
console.log("shell: 404.html");
console.log(`Done: ${ROUTES.length} route shells + 404.html in /public`);
