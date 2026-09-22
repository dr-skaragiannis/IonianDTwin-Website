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
      el: "Ένα «ψηφιακό δίδυμο» για τα Ιόνια Νησιά: το Ιόνιο Πανεπιστήμιο ξεκινά το έργο IonianDTwin για τον βιώσιμο τουρισμό",
      en: "A “digital twin” for the Ionian Islands: Ionian University launches the IonianDTwin project for sustainable tourism",
    },
    subtitle: {
      el: "«IonianDTwin: Ψηφιακό Δίδυμο για τη Δυναμική Μοντελοποίηση και την Ευφυή Εξισορρόπηση της Αστικής Βιωσιμότητας και του Τουρισμού των Ιονίων Νήσων»",
      en: "“IonianDTwin: Digital Twin for the Dynamic Modelling and Intelligent Balancing of Urban Sustainability and Tourism in the Ionian Islands”",
    },
    excerpt: {
      el: "Δεδομένα από δορυφόρους, αεροδρόμια, λιμάνια και ανοικτές πηγές θα δείχνουν έγκαιρα πού και πότε ο τουρισμός πιέζει τα νησιά, ώστε τα μέτρα να λαμβάνονται πριν η πίεση γίνει πρόβλημα.",
      en: "Data from satellites, airports, ports and open sources will show early where and when tourism is pressuring the islands, so that measures are taken before pressure turns into a problem.",
    },
    lead: {
      el: "Το Τμήμα Πληροφορικής του Ιονίου Πανεπιστημίου ξεκίνησε την υλοποίηση του ερευνητικού έργου «IonianDTwin: Ψηφιακό Δίδυμο για τη Δυναμική Μοντελοποίηση και την Ευφυή Εξισορρόπηση της Αστικής Βιωσιμότητας και του Τουρισμού των Ιονίων Νήσων». Σκοπός του έργου είναι να αποκτήσουν η Περιφέρεια, οι Δήμοι, οι επιχειρήσεις και οι πολίτες ένα κοινό εργαλείο που δείχνει με μετρήσιμα δεδομένα πώς επηρεάζει ο τουρισμός τα νησιά. Έτσι η τουριστική ανάπτυξη θα μπορεί να συμβαδίζει με την προστασία του περιβάλλοντος και την ποιότητα ζωής των κατοίκων.",
      en: "The Department of Informatics of the Ionian University has launched the research project “IonianDTwin: Digital Twin for the Dynamic Modelling and Intelligent Balancing of Urban Sustainability and Tourism in the Ionian Islands”. The project aims to give the Region, municipalities, businesses and citizens a shared tool that shows, with measurable data, how tourism affects the islands — so that tourism growth can go hand in hand with environmental protection and residents’ quality of life.",
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
          el: "Η πρόκληση",
          en: "The challenge",
        },
        paragraphs: {
          el: [
            "Τα Ιόνια Νησιά είναι από τους δημοφιλέστερους προορισμούς διεθνώς. Στην καλοκαιρινή αιχμή, η επισκεψιμότητα πιέζει τις υποδομές ύδρευσης, ενέργειας και μεταφορών, τις ακτές και τα θαλάσσια οικοσυστήματα, καθώς και την καθημερινότητα των μόνιμων κατοίκων. Τα στοιχεία που είναι σήμερα διαθέσιμα για τη διαχείριση αυτής της πίεσης είναι συνήθως αποσπασματικά και στατικά.",
          ],
          en: [
            "The Ionian Islands are among the world’s most popular destinations. At the summer peak, visitor numbers strain water, energy and transport infrastructure, beaches and marine ecosystems, as well as the daily life of permanent residents. The data currently available for managing this pressure is usually fragmented and static.",
          ],
        },
      },
      {
        title: {
          el: "Το ψηφιακό δίδυμο",
          en: "The digital twin",
        },
        paragraphs: {
          el: [
            "Το IonianDTwin θα αναπτύξει ένα «ψηφιακό δίδυμο» του προορισμού, δηλαδή ένα διαρκώς ενημερούμενο ψηφιακό αντίγραφο των νησιών πάνω σε χάρτη. Θα συνδυάζει περισσότερες από 25 πηγές δεδομένων: ποιότητα αέρα και θάλασσας από το ευρωπαϊκό πρόγραμμα Copernicus, ύδατα κολύμβησης, μικροκλίμα, αφίξεις σε αεροδρόμια και λιμάνια, πληρότητα παραλιών, κυκλοφοριακή συμφόρηση, κάλυψη δικτύων κινητής και οικονομικά στοιχεία του τουρισμού. Από αυτά θα υπολογίζονται 34 δείκτες βιωσιμότητας, ευθυγραμμισμένοι με τα διεθνή κριτήρια του Global Sustainable Tourism Council (GSTC).",
            "Μοντέλα μηχανικής μάθησης θα προβλέπουν την τουριστική ζήτηση, τη συμφόρηση και την επιβάρυνση των υποδομών. Μεγάλα Γλωσσικά Μοντέλα θα επιτρέπουν σε μη ειδικούς να αναζητούν πληροφορίες στο σύστημα με απλή, φυσική γλώσσα.",
          ],
          en: [
            "IonianDTwin will develop a “digital twin” of the destination — a continuously updated digital copy of the islands on a map. It will combine more than 25 data sources: air and sea quality from the European Copernicus programme, bathing waters, microclimate, airport and port arrivals, beach occupancy, traffic congestion, mobile network coverage and tourism economic data. From these, 34 sustainability indicators will be computed, aligned with the international criteria of the Global Sustainable Tourism Council (GSTC).",
            "Machine learning models will forecast tourism demand, congestion and infrastructure load. Large Language Models will allow non-experts to query the system in plain, natural language.",
          ],
        },
      },
      {
        title: {
          el: "Ποιοι ωφελούνται",
          en: "Who benefits",
        },
        paragraphs: {
          el: [],
          en: [],
        },
        cards: [
          {
            title: {
              el: "Η Περιφέρεια και οι Δήμοι",
              en: "The Region and Municipalities",
            },
            description: {
              el: "Μέσω μιας κεντρικής πλατφόρμας παρακολούθησης, πρόβλεψης και ειδοποίησης που θα στηρίζει τον σχεδιασμό παρεμβάσεων.",
              en: "Through a central monitoring, forecasting and alerting platform that will support the planning of interventions.",
            },
          },
          {
            title: {
              el: "Οι πολίτες και οι επισκέπτες",
              en: "Citizens and visitors",
            },
            description: {
              el: "Μέσω μιας εφαρμογής για κινητά με ενημέρωση και ειδοποιήσεις για τις περιβαλλοντικές συνθήκες και τη συμφόρηση, στην οποία θα μπορούν και οι ίδιοι να συνεισφέρουν δεδομένα.",
              en: "Through a mobile app with updates and alerts on environmental conditions and congestion, to which they will themselves be able to contribute data.",
            },
          },
          {
            title: {
              el: "Οι τουριστικές επιχειρήσεις",
              en: "Tourism businesses",
            },
            description: {
              el: "Με πρόσβαση σε αναλυτικά δεδομένα.",
              en: "With access to analytical data.",
            },
          },
          {
            title: {
              el: "Η ερευνητική κοινότητα",
              en: "The research community",
            },
            description: {
              el: "Με ανωνυμοποιημένα ανοικτά δεδομένα.",
              en: "With anonymised open data.",
            },
          },
        ],
      },
      {
        title: {
          el: "Πιλοτική εφαρμογή και επόμενα βήματα",
          en: "Pilot deployment and next steps",
        },
        paragraphs: {
          el: [
            "Η πλατφόρμα θα δοκιμαστεί πιλοτικά σε πραγματικές συνθήκες κατά τη διάρκεια της τουριστικής περιόδου.",
            "Κατά τους πρώτους μήνες υλοποίησης, η ομάδα του έργου θα συναντηθεί με τους αρμόδιους φορείς για να οριστικοποιηθεί το πλαίσιο των δεικτών. Κατά τη διάρκεια του έργου θα γίνουν επίσης θεματικά εργαστήρια ανοικτά στην τοπική κοινωνία.",
          ],
          en: [
            "The platform will be pilot-tested under real conditions during the tourist season.",
            "During the first months of implementation, the project team will meet the competent bodies to finalise the indicator framework. Thematic workshops open to the local community will also take place during the project.",
          ],
        },
      },
      {
        title: {
          el: "Ταυτότητα έργου",
          en: "Project identity",
        },
        paragraphs: {
          el: [],
          en: [],
        },
        cards: [
          {
            title: {
              el: "Τίτλος πράξης",
              en: "Project title",
            },
            description: {
              el: "«IonianDTwin: Ψηφιακό Δίδυμο για τη Δυναμική Μοντελοποίηση και την Ευφυή Εξισορρόπηση της Αστικής Βιωσιμότητας και του Τουρισμού των Ιονίων Νήσων»",
              en: "“IonianDTwin: Digital Twin for the Dynamic Modelling and Intelligent Balancing of Urban Sustainability and Tourism in the Ionian Islands”",
            },
          },
          {
            title: {
              el: "Δικαιούχος",
              en: "Beneficiary",
            },
            description: {
              el: "Ειδικός Λογαριασμός Κονδυλίων Έρευνας Ιονίου Πανεπιστημίου",
              en: "Special Account for Research Funds of the Ionian University",
            },
          },
          {
            title: {
              el: "Φορέας υλοποίησης",
              en: "Implementing body",
            },
            description: {
              el: "Τμήμα Πληροφορικής, Ιόνιο Πανεπιστήμιο",
              en: "Department of Informatics, Ionian University",
            },
          },
          {
            title: {
              el: "Επιστημονικός Υπεύθυνος",
              en: "Scientific Coordinator",
            },
            description: {
              el: "Καθηγητής Εμμανουήλ Μάγκος",
              en: "Professor Emmanouel Magkos",
            },
          },
          {
            title: {
              el: "Κωδικός ΟΠΣ",
              en: "OPS Code",
            },
            description: {
              el: "6061866",
              en: "6061866",
            },
          },
          {
            title: {
              el: "Προϋπολογισμός",
              en: "Budget",
            },
            description: {
              el: "239.900,00 €",
              en: "€239,900.00",
            },
          },
          {
            title: {
              el: "Διάρκεια",
              en: "Duration",
            },
            description: {
              el: "01/09/2026 – 31/03/2029",
              en: "01/09/2026 – 31/03/2029",
            },
          },
          {
            title: {
              el: "Πρόγραμμα",
              en: "Programme",
            },
            description: {
              el: "«Ιόνια Νησιά 2021–2027» — Η πράξη συγχρηματοδοτείται από το Ευρωπαϊκό Ταμείο Περιφερειακής Ανάπτυξης.",
              en: "“Ionian Islands 2021–2027” — The project is co-funded by the European Regional Development Fund.",
            },
          },
          {
            title: {
              el: "Ιστότοπος",
              en: "Website",
            },
            description: {
              el: "ioniandtwin.di.ionio.gr",
              en: "ioniandtwin.di.ionio.gr",
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
