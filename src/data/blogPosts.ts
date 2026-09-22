export interface StructuredSection {
  title?: {
    el: string;
    en: string;
  };
  paragraphs: {
    el: string[];
    en: string[];
  };
  callout?: {
    el: string;
    en: string;
  };
  cards?: {
    badge?: {
      el: string;
      en: string;
    };
    title: {
      el: string;
      en: string;
    };
    description: {
      el: string;
      en: string;
    };
  }[];
}

export interface BlogPost {
  id: string;
  slug: string;
  type: "press-release" | "article" | "announcement" | "research" | "technology";
  category: "press" | "research" | "environment" | "technology" | "pilots";
  date: {
    el: string;
    en: string;
    iso: string;
  };
  location: {
    el: string;
    en: string;
  };
  author: {
    el: string;
    en: string;
  };
  readTime: {
    el: string;
    en: string;
  };
  tags: {
    el: string[];
    en: string[];
  };
  featured: boolean;
  title: {
    el: string;
    en: string;
  };
  subtitle?: {
    el: string;
    en: string;
  };
  excerpt: {
    el: string;
    en: string;
  };
  lead: {
    el: string;
    en: string;
  };
  sections: StructuredSection[];
  highlights?: {
    el: { label: string; value: string }[];
    en: { label: string; value: string }[];
  };
  fundingBox?: {
    title: {
      el: string;
      en: string;
    };
    programme: {
      el: string;
      en: string;
    };
    objective: {
      el: string;
      en: string;
    };
    budget: string;
    beneficiary: {
      el: string;
      en: string;
    };
  };
  opsCode?: string;
  fundingBadge?: {
    el: string;
    en: string;
  };
}

export const BLOG_CATEGORIES = [
  { id: "all", labelEl: "Όλα", labelEn: "All" },
  { id: "press", labelEl: "Δελτία Τύπου", labelEn: "Press Releases" },
  { id: "research", labelEl: "Έρευνα & Πρότυπα", labelEn: "Research & Standards" },
  { id: "environment", labelEl: "Περιβάλλον & EO", labelEn: "Environment & EO" },
  { id: "technology", labelEl: "Τεχνολογία & AI", labelEn: "Technology & AI" },
  { id: "pilots", labelEl: "Πιλοτικές Εφαρμογές", labelEn: "Pilot Deployments" },
] as const;

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "01-ekkinisi-praxis-ioniandtwin",
    slug: "ekkinisi-praxis-ioniandtwin",
    type: "press-release",
    category: "press",
    featured: true,
    opsCode: "6061866",
    fundingBadge: {
      el: "Συγχρηματοδότηση ΕΤΠΑ · Περιφέρεια Ιονίων Νήσων 2021–2027",
      en: "ERDF Co-funded · Regional Programme Ionian Islands 2021–2027",
    },
    date: {
      el: "21 Σεπτεμβρίου 2026",
      en: "September 21, 2026",
      iso: "2026-09-21",
    },
    location: {
      el: "Κέρκυρα",
      en: "Corfu, Greece",
    },
    author: {
      el: "Ιόνιο Πανεπιστήμιο — Ειδικός Λογαριασμός Κονδυλίων Έρευνας (ΕΛΚΕ)",
      en: "Ionian University — Special Account for Research Funds (ELKE)",
    },
    readTime: {
      el: "4 λεπτά ανάγνωσης",
      en: "4 min read",
    },
    tags: {
      el: ["Δελτίο Τύπου", "ΕΤΠΑ", "Περιφέρεια Ιονίων", "ΟΠΣ 6061866", "Ψηφιακό Δίδυμο", "GSTC v2.0", "Ιόνιο Πανεπιστήμιο"],
      en: ["Press Release", "ERDF", "Ionian Region", "OPS 6061866", "Digital Twin", "GSTC v2.0", "Ionian University"],
    },
    title: {
      el: "ΔΕΛΤΙΟ ΤΥΠΟΥ: Έναρξη υλοποίησης της Πράξης «IonianDTwin»",
      en: "PRESS RELEASE: Official Launch of the \"IonianDTwin\" Project",
    },
    subtitle: {
      el: "Ψηφιακό Δίδυμο Χωρικής και Περιβαλλοντικής Νοημοσύνης για τη Βιωσιμότητα των Ιονίων Νήσων",
      en: "Spatial and Environmental Intelligence Digital Twin for the Sustainability of the Ionian Islands",
    },
    excerpt: {
      el: "Ανακοινώνεται η επίσημη έναρξη υλοποίησης της ερευνητικής Πράξης «IonianDTwin» (Κωδικός ΟΠΣ: 6061866, Αριθμός Απόφασης Ένταξης: 34822) στο Περιφερειακό Πρόγραμμα «Ιόνια Νησιά 2021–2027», με συγχρηματοδότηση από το Ευρωπαϊκό Ταμείο Περιφερειακής Ανάπτυξης (ΕΤΠΑ).",
      en: "Official launch of the research project \"IonianDTwin\" (OPS Code: 6061866, Inclusion Decision No: 34822) under the Regional Programme \"Ionian Islands 2021–2027\", co-funded by the European Regional Development Fund (ERDF).",
    },
    lead: {
      el: "Ανακοινώνεται η επίσημη έναρξη υλοποίησης της ερευνητικής Πράξης «IonianDTwin, Ψηφιακό Δίδυμο Χωρικής και Περιβαλλοντικής Νοημοσύνης για τη Βιωσιμότητα των Ιονίων Νήσων» (Κωδικός ΟΠΣ: 6061866, Αριθμός Απόφασης Ένταξης: 34822). Η Πράξη εντάσσεται στο Περιφερειακό Πρόγραμμα «Ιόνια Νησιά 2021–2027», στον άξονα προτεραιότητας «Έρευνα, Τεχνολογική Ανάπτυξη & Καινοτομία» (Ειδικός Στόχος RSO 1.1) και συγχρηματοδοτείται εξ ολοκλήρου από το Ευρωπαϊκό Ταμείο Περιφερειακής Ανάπτυξης (ΕΤΠΑ).",
      en: "The official launch of the research project \"IonianDTwin, Spatial and Environmental Intelligence Digital Twin for the Sustainability of the Ionian Islands\" (OPS Code: 6061866, Inclusion Decision No: 34822) is hereby announced. The project is integrated into the Regional Programme \"Ionian Islands 2021–2027\", under the priority axis \"Research, Technological Development & Innovation\" (Specific Objective RSO 1.1) and is fully co-financed by the European Regional Development Fund (ERDF).",
    },
    highlights: {
      el: [
        { label: "Κωδικός ΟΠΣ", value: "6061866" },
        { label: "Απόφαση Ένταξης", value: "Αρ. 34822" },
        { label: "Δημόσια Δαπάνη", value: "€239.900,00" },
        { label: "Χρηματοδότηση", value: "100% ΕΤΠΑ" },
        { label: "Δείκτες Βιωσιμότητας", value: "34 Δείκτες GSTC" },
        { label: "Ψηφιακές Ροές", value: "25+ Ροές Δεδομένων" },
      ],
      en: [
        { label: "OPS Code", value: "6061866" },
        { label: "Inclusion Decision", value: "No. 34822" },
        { label: "Public Budget", value: "€239,900.00" },
        { label: "Co-financing", value: "100% ERDF" },
        { label: "Sustainability", value: "34 GSTC Indicators" },
        { label: "Digital Feeds", value: "25+ Live Streams" },
      ],
    },
    fundingBox: {
      title: {
        el: "Στοιχεία Συγχρηματοδότησης Πράξης",
        en: "Project Financing & Institutional Framework",
      },
      programme: {
        el: "Περιφερειακό Πρόγραμμα «Ιόνια Νησιά 2021–2027»",
        en: "Regional Operational Programme \"Ionian Islands 2021–2027\"",
      },
      objective: {
        el: "Άξονας: Έρευνα, Τεχνολογική Ανάπτυξη & Καινοτομία (Ειδικός Στόχος RSO 1.1)",
        en: "Priority Axis: Research, Technological Development & Innovation (Specific Objective RSO 1.1)",
      },
      budget: "€239.900,00 (100% Ευρωπαϊκό Ταμείο Περιφερειακής Ανάπτυξης - ΕΤΠΑ)",
      beneficiary: {
        el: "Ιόνιο Πανεπιστήμιο — Ειδικός Λογαριασμός Κονδυλίων Έρευνας (ΕΛΚΕ)",
        en: "Ionian University — Special Account for Research Funds (ELKE)",
      },
    },
    sections: [
      {
        title: {
          el: "Σκοπός και Θεσμικό Πλαίσιο",
          en: "Purpose and Institutional Framework",
        },
        paragraphs: {
          el: [
            "Δικαιούχος και φορέας υλοποίησης της Πράξης είναι το Ιόνιο Πανεπιστήμιο, μέσω του Ειδικού Λογαριασμού Κονδυλίων Έρευνας (ΕΛΚΕ). Η συνολική δημόσια δαπάνη της Πράξης ανέρχεται σε €239.900,00 και συγχρηματοδοτείται εξ ολοκλήρου από το Ευρωπαϊκό Ταμείο Περιφερειακής Ανάπτυξης (ΕΤΠΑ) και Εθνικούς Πόρους.",
            "Η πράξη αποσκοπεί στη δημιουργία μιας προηγμένης ψηφιακής υποδομής υψηλής ανάλυσης, η οποία θα αποτελέσει σημείο αναφοράς για την τεκμηριωμένη λήψη αποφάσεων σε περιφερειακό και τοπικό επίπεδο.",
          ],
          en: [
            "The beneficiary and executing authority is Ionian University, through its Special Account for Research Funds (ELKE). The total public expenditure of the project amounts to €239,900.00, fully co-funded by the European Regional Development Fund (ERDF) and National Resources.",
            "The initiative aims to build an advanced, high-resolution digital infrastructure that establishes an evidence-based foundation for regional and local policy decisions.",
          ],
        },
        callout: {
          el: "Η Πράξη εντάσσεται στον τομέα του τουρισμού και της περιβαλλοντικής προστασίας, ενισχύοντας την έρευνα και την εφαρμοσμένη τεχνολογική καινοτομία στην Περιφέρεια Ιονίων Νήσων.",
          en: "The project addresses tourism sustainability and environmental resilience, reinforcing research excellence and applied technological innovation across the Ionian Islands.",
        },
      },
      {
        title: {
          el: "Φυσικό Αντικείμενο και Αναγκαιότητα",
          en: "Scope and Necessity",
        },
        paragraphs: {
          el: [
            "Η Περιφέρεια Ιονίων Νήσων αποτελεί έναν από τους πλέον διεθνώς προβεβλημένους τουριστικούς προορισμούς της χώρας. Ωστόσο, η έντονη εποχικότητα και η τουριστική πίεση επιβαρύνουν σημαντικά τις υποδομές, τα οικοσυστήματα και την ποιότητα ζωής των μόνιμων κατοίκων.",
            "Για την αποτελεσματική διαχείριση αυτών των προκλήσεων απαιτούνται σύγχρονα υπολογιστικά εργαλεία πολυπαραγοντικής παρακολούθησης και πρόβλεψης. Το έργο IonianDTwin αναπτύσσει ένα ολοκληρωμένο σύστημα χωρικής και περιβαλλοντικής νοημοσύνης, βασισμένο στην τεχνολογία του Ψηφιακού Διδύμου (Digital Twin).",
            "Το σύστημα διασυνδέει πάνω από 25 ψηφιακές ροές δεδομένων πραγματικού και σχεδόν πραγματικού χρόνου, τροφοδοτώντας 34 δυναμικούς δείκτες βιωσιμότητας. Οι δείκτες καλύπτουν 24 από τα 38 κριτήρια του διεθνούς προτύπου GSTC Destination Criteria v2.0 (Global Sustainable Tourism Council).",
          ],
          en: [
            "The Region of Ionian Islands represents one of Greece's most prominent international tourism destinations. However, sharp seasonality and visitor saturation exert acute pressure on critical municipal infrastructures, fragile habitats, and the daily well-being of permanent island residents.",
            "Effectively addressing these challenges requires modern computational tools capable of multi-factor monitoring and predictive forecasting. IonianDTwin implements an integrated spatial and environmental intelligence ecosystem based on state-of-the-art Digital Twin technology.",
            "The system ingests over 25 live and near-real-time digital telemetry streams, feeding 34 dynamic sustainability indicators that cover 24 of the 38 destination criteria established by the international GSTC Destination Criteria v2.0 standard.",
          ],
        },
      },
      {
        title: {
          el: "Αρχιτεκτονική: Τρεις Συντονισμένες Διεπαφές",
          en: "Architecture: Three Coordinated Interfaces",
        },
        paragraphs: {
          el: [
            "Το Ψηφιακό Δίδυμο IonianDTwin προσφέρει τρεις διακριτές πύλες πρόσβασης που καλύπτουν τις ανάγκες των φορέων διοίκησης, των πολιτών και των επιστημονικών ερευνητών:",
          ],
          en: [
            "The IonianDTwin digital twin is structured across three complementary user interfaces designed for regional authorities, citizens, and scientific stakeholders:",
          ],
        },
        cards: [
          {
            badge: { el: "Διεπαφή 1", en: "Interface 1" },
            title: {
              el: "Κεντρικός Πίνακας Ελέγχου (Web Dashboard)",
              en: "Central Web Platform (GIS Dashboard)",
            },
            description: {
              el: "Προηγμένη γεωχωρική απεικόνιση GIS, πολυεπίπεδη επικάλυψη δεδομένων (περιβάλλον, θαλάσσια και αεροπορική κίνηση, υποδομές), θερμικοί χάρτες και προγνωστικά μοντέλα μηχανικής μάθησης.",
              en: "High-resolution geospatial GIS visualization, layered multi-thematic overlays (environment, maritime, aviation, infrastructure), heatmaps, and ML predictive analytics.",
            },
          },
          {
            badge: { el: "Διεπαφή 2", en: "Interface 2" },
            title: {
              el: "Εφαρμογή Κινητών Συσκευών (Mobile App)",
              en: "Mobile Application (iOS & Android)",
            },
            description: {
              el: "Ειδοποιήσεις πραγματικού χρόνου, συμμετοχική καταγραφή πολιτών (human-as-a-sensor), εναλλακτικές διαδρομές χαμηλής πίεσης, πλήρης προσβασιμότητα WCAG 2.0 AA και λειτουργία εκτός σύνδεσης.",
              en: "Real-time environmental notifications, citizen crowdsourcing, alternative low-saturation activity routing, WCAG 2.0 AA accessibility compliance, and offline-first caching.",
            },
          },
          {
            badge: { el: "Διεπαφή 3", en: "Interface 3" },
            title: {
              el: "Διεπαφή Φυσικής Γλώσσας (LLM Query Interface)",
              en: "Natural Language AI Interface (LLM & RAG)",
            },
            description: {
              el: "Απευθείας ερωτήσεις σε φυσική γλώσσα με τεχνολογία Retrieval-Augmented Generation (RAG) για άμεση παραγωγή τεκμηριωμένων αναλύσεων πολιτικής και απαντήσεων σε πραγματικό χρόνο.",
              en: "Plain-language conversational queries powered by Retrieval-Augmented Generation (RAG), translating natural queries into verified spatial data and policy recommendations.",
            },
          },
        ],
      },
    ],
  },
  {
    id: "02-gstc-sustainability-framework-ionian",
    slug: "gstc-sustainability-framework-ionian",
    type: "research",
    category: "research",
    featured: false,
    date: {
      el: "15 Οκτωβρίου 2026",
      en: "October 15, 2026",
      iso: "2026-10-15",
    },
    location: {
      el: "Κέρκυρα",
      en: "Corfu, Greece",
    },
    author: {
      el: "Επιστημονική Ομάδα IonianDTwin",
      en: "IonianDTwin Scientific Team",
    },
    readTime: {
      el: "5 λεπτά ανάγνωσης",
      en: "5 min read",
    },
    tags: {
      el: ["GSTC v2.0", "Δείκτες Βιωσιμότητας", "Φέρουσα Ικανότητα", "Περιβαλλοντικό Αποτύπωμα"],
      en: ["GSTC v2.0", "Sustainability Indicators", "Carrying Capacity", "Environmental Footprint"],
    },
    title: {
      el: "Εναρμόνιση των 34 Δεικτών του IonianDTwin με το Διεθνές Πρότυπο GSTC v2.0",
      en: "Aligning IonianDTwin's 34 Indicators with the Global GSTC v2.0 Standard",
    },
    subtitle: {
      el: "Επιστημονική μεθοδολογία σύνδεσης κριτηρίων προορισμού με αυτοματοποιημένες ροές τηλεμετρίας",
      en: "Scientific methodology linking destination sustainability criteria to automated telemetry streams",
    },
    excerpt: {
      el: "Πώς η ερευνητική ομάδα του Ιονίου Πανεπιστημίου συσχέτισε 24 από τα 38 κριτήρια προορισμών του GSTC με αυτοματοποιημένες ροές τηλεμετρίας και δορυφορικής ανάλυσης.",
      en: "How the Ionian University research team mapped 24 out of 38 GSTC destination criteria to automated telemetry streams and Earth Observation satellite feeds.",
    },
    lead: {
      el: "Το Παγκόσμιο Συμβούλιο Αειφόρου Τουρισμού (Global Sustainable Tourism Council - GSTC) ορίζει τα κορυφαία διεθνή πρότυπα για τη βιώσιμη διαχείριση προορισμών. Στο έργο IonianDTwin, οι 34 δυναμικοί δείκτες εναρμονίζονται πλήρως με τα 24 κρισιμότερα κριτήρια του GSTC v2.0, δομημένοι σε τέσσερις βασικούς πυλώνες.",
      en: "The Global Sustainable Tourism Council (GSTC) defines the premier international baseline criteria for sustainable destination stewardship. In IonianDTwin, 34 dynamic indicators align directly with 24 core GSTC v2.0 criteria across four foundational pillars.",
    },
    sections: [
      {
        title: {
          el: "Οι Τέσσερις Πυλώνες του Προτύπου GSTC",
          en: "The Four Pillars of the GSTC Standard",
        },
        paragraphs: {
          el: [
            "Κάθε δείκτης του συστήματος συνδέεται άμεσα με συγκεκριμένες πηγές ανοικτών δεδομένων και επίγειους αισθητήρες, προσφέροντας συνεχή παρακολούθηση της φέρουσας ικανότητας των νησιών.",
          ],
          en: [
            "Each system indicator connects directly to verified open data streams and in-situ sensors, providing continuous oversight of island carrying capacities.",
          ],
        },
        cards: [
          {
            badge: { el: "Πυλώνας Α", en: "Pillar A" },
            title: {
              el: "Αειφόρος Διαχείριση Προορισμού",
              en: "Sustainable Destination Management",
            },
            description: {
              el: "Συνεχής παρακολούθηση τουριστικής πυκνότητας, διαχείριση εποχικής κατανομής, ανθεκτικότητα υποδομών και ικανοποίηση επισκεπτών.",
              en: "Continuous monitoring of visitor density, seasonal load leveling, infrastructure resilience, and visitor experience.",
            },
          },
          {
            badge: { el: "Πυλώνας Β", en: "Pillar B" },
            title: {
              el: "Κοινωνικοοικονομική Βιωσιμότητα",
              en: "Socio-Economic Sustainability",
            },
            description: {
              el: "Ποιοτική απασχόληση, μέση διάρκεια παραμονής, κατά κεφαλήν δαπάνη και στήριξη τοπικών παραγωγών και επιχειρήσεων.",
              en: "Local employment metrics, length of stay, average daily expenditure, and support for local micro-enterprises.",
            },
          },
          {
            badge: { el: "Πυλώνας C", en: "Pillar C" },
            title: {
              el: "Πολιτιστική Βιωσιμότητα & Κληρονομιά",
              en: "Cultural Sustainability & Heritage",
            },
            description: {
              el: "Προστασία μνημείων UNESCO (Παλαιά Πόλη Κέρκυρας), ροές επισκεπτών σε φρούρια και διατήρηση της άυλης πολιτιστικής ταυτότητας.",
              en: "Preservation of UNESCO heritage sites (Corfu Old Town), visitor throughput in historic fortresses, and intangible cultural preservation.",
            },
          },
          {
            badge: { el: "Πυλώνας D", en: "Pillar D" },
            title: {
              el: "Περιβαλλοντική Βιωσιμότητα",
              en: "Environmental Sustainability",
            },
            description: {
              el: "Ποιότητα αέρα, υδάτινοι πόροι, θαλάσσιο περιβάλλον, διαχείριση αποβλήτων και προστασία οικοτόπων Natura 2000.",
              en: "Air quality indices, water network balance, coastal marine quality, solid waste recycling, and Natura 2000 biodiversity protection.",
            },
          },
        ],
      },
    ],
  },
  {
    id: "03-copernicus-sentinel-earth-observation",
    slug: "copernicus-sentinel-earth-observation",
    type: "research",
    category: "environment",
    featured: false,
    date: {
      el: "04 Νοεμβρίου 2026",
      en: "November 4, 2026",
      iso: "2026-11-04",
    },
    location: {
      el: "Κέρκυρα",
      en: "Corfu, Greece",
    },
    author: {
      el: "Εργαστήριο Γεωχωρικών Δεδομένων Ιονίου Πανεπιστημίου",
      en: "Ionian University Geospatial Data Laboratory",
    },
    readTime: {
      el: "4 λεπτά ανάγνωσης",
      en: "4 min read",
    },
    tags: {
      el: ["Copernicus", "Sentinel-2", "Ποσειδωνία", "Θολότητα Υδάτων", "CAMS", "CMEMS"],
      en: ["Copernicus", "Sentinel-2", "Posidonia", "Water Turbidity", "CAMS", "CMEMS"],
    },
    title: {
      el: "Δορυφορική Παρατήρηση Γης Copernicus & Sentinel-2 στο IonianDTwin",
      en: "Copernicus & Sentinel-2 Earth Observation Integration in IonianDTwin",
    },
    subtitle: {
      el: "Πώς η δορυφορική τηλεπισκόπηση προστατεύει τα παράκτια ύδατα και τα λιβάδια Ποσειδωνίας",
      en: "How satellite remote sensing monitors coastal waters and protects Posidonia meadows",
    },
    excerpt: {
      el: "Πώς τα πολυφασματικά δεδομένα των ευρωπαϊκών δορυφόρων Sentinel τροφοδοτούν τη λίμνη δεδομένων για τον εντοπισμό θολερότητας και την προστασία των λιβαδιών Ποσειδωνίας.",
      en: "How multi-spectral imagery from European Sentinel satellites powers the data lake to detect coastal turbidity and protect vulnerable Posidonia meadows.",
    },
    lead: {
      el: "Το σύστημα IonianDTwin αξιοποιεί την ευρωπαϊκή υποδομή Copernicus Data Space για συνεχή λήψη και επεξεργασία δορυφορικών δεδομένων υψηλής χωρικής και φασματικής ανάλυσης σε ολόκληρο το Ιόνιο Πέλαγος.",
      en: "IonianDTwin integrates the European Copernicus Data Space infrastructure for continuous processing and ingestion of high-resolution satellite Earth Observation datasets across the Ionian archipelago.",
    },
    sections: [
      {
        title: {
          el: "Δορυφορικές Υπηρεσίες & Ροές Δεδομένων",
          en: "Satellite Services & Data Pipelines",
        },
        paragraphs: {
          el: [
            "Η συνδυασμένη επεξεργασία των δορυφορικών δεδομένων με τους επίγειους αισθητήρες επιτρέπει τον έγκαιρο εντοπισμό περιβαλλοντικών ανωμαλιών, όπως η αύξηση της θολερότητας σε ευαίσθητους κόλπους ή η υποβάθμιση της ποιότητας του αέρα κατά τις τουριστικές αιχμές.",
          ],
          en: [
            "Cross-calibrating satellite telemetry with ground sensors enables prompt detection of environmental anomalies, including coastal turbidity spikes in fragile bays and air quality degradation during peak visitor periods.",
          ],
        },
        cards: [
          {
            badge: { el: "Ατμόσφαιρα", en: "Atmosphere" },
            title: {
              el: "Copernicus CAMS",
              en: "Copernicus CAMS",
            },
            description: {
              el: "Συνεχής παρακολούθηση συγκεντρώσεων αιωρούμενων σωματιδίων (PM2.5, PM10), διοξειδίου του αζώτου (NO2) και επιφανειακού όζοντος (O3).",
              en: "Continuous tracking of particulate matter (PM2.5, PM10), nitrogen dioxide (NO2), and tropospheric ozone (O3).",
            },
          },
          {
            badge: { el: "Θάλασσα", en: "Marine" },
            title: {
              el: "Copernicus CMEMS",
              en: "Copernicus CMEMS",
            },
            description: {
              el: "Θαλάσσια τηλεμετρία, θερμοκρασία επιφάνειας θάλασσας (SST), συγκέντρωση χλωροφύλλης-a και παράκτια θαλάσσια ρεύματα.",
              en: "Marine telemetry, Sea Surface Temperature (SST), Chlorophyll-a concentration, and coastal circulation currents.",
            },
          },
          {
            badge: { el: "Τηλεπισκόπηση", en: "Remote Sensing" },
            title: {
              el: "Sentinel-2 MSI",
              en: "Sentinel-2 MSI",
            },
            description: {
              el: "Πολυφασματικοί δείκτες NDVI και NDWI για την καταγραφή δασικής υγείας, βλάστησης και παράκτιας θολερότητας (NTU).",
              en: "Multi-spectral NDVI and NDWI vegetation and moisture indices for forest vigor and coastal turbidity proxies.",
            },
          },
        ],
      },
    ],
  },
  {
    id: "04-ai-rag-natural-language-interface",
    slug: "ai-rag-natural-language-interface",
    type: "technology",
    category: "technology",
    featured: false,
    date: {
      el: "28 Νοεμβρίου 2026",
      en: "November 28, 2026",
      iso: "2026-11-28",
    },
    location: {
      el: "Κέρκυρα",
      en: "Corfu, Greece",
    },
    author: {
      el: "Ομάδα Ανάπτυξης ΤΝ IonianDTwin",
      en: "IonianDTwin AI Development Team",
    },
    readTime: {
      el: "6 λεπτά ανάγνωσης",
      en: "6 min read",
    },
    tags: {
      el: ["Τεχνητή Νοημοσύνη", "LLM", "RAG Pipeline", "Natural Language", "PostGIS"],
      en: ["Artificial Intelligence", "LLM", "RAG Pipeline", "Natural Language", "PostGIS"],
    },
    title: {
      el: "Διεπαφή Φυσικής Γλώσσας και RAG: Δημοκρατικοποίηση της Γεωχωρικής Πληροφορίας",
      en: "Natural Language Interface and RAG: Democratizing Geospatial Intelligence",
    },
    subtitle: {
      el: "Από τα πολύπλοκα συστήματα GIS στην άμεση τεκμηριωμένη απάντηση",
      en: "From complex GIS datasets to instant, evidence-grounded insights",
    },
    excerpt: {
      el: "Πώς το μοντέλο Τεχνητής Νοημοσύνης επιτρέπει σε φορείς και πολίτες να υποβάλλουν απλές ερωτήσεις και να λαμβάνουν άμεσες, τεκμηριωμένες απαντήσεις από το ψηφιακό δίδυμο.",
      en: "How the Retrieval-Augmented Generation (RAG) AI engine empowers policymakers and citizens to query complex geospatial data in plain language.",
    },
    lead: {
      el: "Η πρωτοποριακή διεπαφή φυσικής γλώσσας (LLM Query Interface) του IonianDTwin γεφυρώνει το χάσμα ανάμεσα στις εξειδικευμένες χωρικές βάσεις δεδομένων και στους υπεύθυνους λήψης αποφάσεων, επιτρέποντας ερωτήσεις σε απλά Ελληνικά και Αγγλικά.",
      en: "IonianDTwin's innovative natural language interface (LLM) bridges the divide between complex spatial databases and executive decision-makers, allowing queries in natural Greek and English.",
    },
    sections: [
      {
        title: {
          el: "Πώς Λειτουργεί ο Αγωγός RAG",
          en: "How the RAG Pipeline Works",
        },
        paragraphs: {
          el: [
            "Ο χρήστης υποβάλλει οποιοδήποτε ερώτημα σχετικά με τη βιωσιμότητα, την τουριστική κίνηση ή το περιβαλλοντικό αποτύπωμα. Το σύστημα επεξεργάζεται το ερώτημα σε τρία στάδια, διασφαλίζοντας απόλυτη επιστημονική εγκυρότητα.",
          ],
          en: [
            "Users query sustainability indicators, transport throughput, or environmental telemetry. The engine processes inquiries across three sequential phases to ensure rigorous empirical grounding.",
          ],
        },
        cards: [
          {
            badge: { el: "Βήμα 1", en: "Step 1" },
            title: {
              el: "Σημασιολογική Ανάλυση Ερωτήματος",
              en: "Semantic Query Parsing",
            },
            description: {
              el: "Κατανόηση της πρόθεσης του χρήστη και αυτόματη εξαγωγή χωρικών και χρονικών παραμέτρων (π.χ. νησί, εύρος ημερομηνιών, τύπος δείκτη).",
              en: "Extracting user intent and spatial/temporal parameters (target island, date window, indicator category).",
            },
          },
          {
            badge: { el: "Βήμα 2", en: "Step 2" },
            title: {
              el: "Δυναμική Ανάκτηση & PostGIS SQL",
              en: "Dynamic Retrieval & PostGIS SQL",
            },
            description: {
              el: "Μετάφραση του ερωτήματος σε βελτιστοποιημένα χωρικά ερωτήματα SQL πάνω στη λίμνη δεδομένων και ανάκτηση επαληθευμένων μετρήσεων.",
              en: "Translating requests into optimized PostGIS spatial queries against the data lake to fetch verified telemetry.",
            },
          },
          {
            badge: { el: "Βήμα 3", en: "Step 3" },
            title: {
              el: "Επαληθευμένη Σύνθεση & Προτάσεις",
              en: "Evidence Synthesis & Recommendations",
            },
            description: {
              el: "Διαμόρφωση σαφούς απάντησης με πλήρη αναφορά στις πρωτογενείς πηγές και συγκεκριμένες προτάσεις πολιτικής διαχείρισης.",
              en: "Formulating crisp, structured answers complete with transparent source citations and actionable policy guidance.",
            },
          },
        ],
      },
    ],
  },
];
