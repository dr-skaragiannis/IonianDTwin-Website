import { useLang } from "./index";
import type { NavChild, NavItem } from "../data/content";

/* ── Bilingual site menu (labels resolved by active language) ───────── */

const EN_MENU: NavItem[] = [
  { label: "Home", to: "/" },
  {
    label: "About",
    children: [
      { label: "Why sustainability", to: "/about/challenge", desc: "Six pillars of a sustainable Ionian" },
      { label: "Funding & timeline", to: "/about/project", desc: "Funding, timeline and deliverables" },
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

const EL_MENU: NavItem[] = [
  { label: "Αρχική", to: "/" },
  {
    label: "Το Έργο",
    children: [
      { label: "Γιατί βιωσιμότητα", to: "/about/challenge", desc: "Έξι πυλώνες ενός βιώσιμου Ιονίου" },
      { label: "Χρηματοδότηση & Χρονοδιάγραμμα", to: "/about/project", desc: "Χρηματοδότηση, χρονοδιάγραμμα, παραδοτέα" },
      { label: "Αρχιτεκτονική", to: "/about/architecture", desc: "Πέντε επίπεδα, από τα δεδομένα στην απόφαση" },
      { label: "Τεχνολογία", to: "/about/technology", desc: "Υποδομή, πρότυπα και λειτουργία" },
    ],
  },
  {
    label: "Πλατφόρμα",
    children: [
      { label: "Επισκόπηση", to: "/platform", desc: "Ένα δίδυμο, τρεις διεπαφές" },
      { label: "Πίνακας Ελέγχου", to: "/platform/dashboard", desc: "Χάρτες GIS, θερμικοί χάρτες, προβλέψεις" },
      { label: "Εφαρμογή Κινητού", to: "/platform/mobile-app", desc: "Ειδοποιήσεις και συμμετοχική καταγραφή" },
      { label: "Διεπαφή LLM", to: "/platform/intelligence", desc: "Ρωτήστε το δίδυμο οτιδήποτε" },
      { label: "Δείκτες Βιωσιμότητας", to: "/indicators", desc: "34 δείκτες σε 10 κατηγορίες GSTC" },
    ],
  },
  {
    label: "Πόροι",
    children: [
      { label: "Πηγές Δεδομένων", to: "/resources/data-sources", desc: "Δώδεκα πηγές, μία λίμνη δεδομένων" },
      { label: "Συναφή Έργα", to: "/resources/related-projects", desc: "Το ευρωπαϊκό οικοσύστημα των ψηφιακών διδύμων" },
      { label: "Βιβλιογραφία", to: "/resources/references", desc: "Πρότυπα, δημοσιεύσεις, πάροχοι" },
    ],
  },
  { label: "Blog", to: "/blog" },
  { label: "Επικοινωνία", to: "/contact" },
];

export function useMenu(): NavItem[] {
  const { lang } = useLang();
  return lang === "el" ? EL_MENU : EN_MENU;
}

/** Children of a given top-level section, for section sub-navigation pills. */
export function useSubNav(prefix: "/about" | "/platform" | "/resources"): NavChild[] {
  const menu = useMenu();
  return (menu.find((m) => m.children?.[0]?.to.startsWith(prefix))?.children ?? []) as NavChild[];
}
