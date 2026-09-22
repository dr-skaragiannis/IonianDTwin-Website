/* Per-route bilingual SEO copy for SeoSync.
 * Keep in sync with the ROUTES table in scripts/generate-route-shells.mjs
 * (that generator owns the static per-route shells; this module owns the
 * title/canonical/description tags once the SPA takes over the URL).
 * titleEl/titleEn are the full <title> strings as they should appear. */

export interface RouteSeo {
  titleEl: string;
  titleEn: string;
  descEl: string;
  descEn: string;
}

export const SEO: Record<string, RouteSeo> = {
  "/": {
    titleEl: "IonianDTwin — Ένα βιώσιμο Ιόνιο, μετρημένο σε πραγματικό χρόνο",
    titleEn: "IonianDTwin — A sustainable Ionian, measured in real time",
    descEl:
      "Το IonianDTwin είναι ένας γεωχωρικός Ψηφιακός Δίδυμος που μετρά συνεχώς τη βιωσιμότητα των Ιονίων Νήσων: οικοσυστήματα, ύδατα, ενέργεια, απόβλητα, βιοποικιλότητα και πολιτιστική κληρονομιά. Συγχρηματοδοτούμενο από την ΕΕ στο Πρόγραμμα «Ιόνια Νησιά» 2021–2027.",
    descEn:
      "IonianDTwin is a geospatial Digital Twin that continuously measures the sustainability of the Ionian Islands: ecosystems, water, energy, waste, biodiversity and cultural heritage. EU co-funded under the Ionian Islands 2021–2027 programme.",
  },
  "/about/challenge": {
    titleEl: "Η πρόκληση της βιωσιμότητας στα Ιόνια Νησιά — IonianDTwin",
    titleEn: "The sustainability challenge in the Ionian Islands — IonianDTwin",
    descEl:
      "Στην καλοκαιρινή αιχμή, η επισκεψιμότητα πιέζει τις υποδομές ύδρευσης, ενέργειας και μεταφορών, τις ακτές και τα θαλάσσια οικοσυστήματα, καθώς και την καθημερινότητα των μόνιμων κατοίκων. Τα διαθέσιμα στοιχεία είναι συνήθως αποσπασματικά και στατικά — το IonianDTwin τα αντικαθιστά με συνεχή, μετρήσιμη παρακολούθηση.",
    descEn:
      "At the summer peak, visitor numbers strain water, energy and transport infrastructure, beaches and marine ecosystems, and residents' daily life. Available evidence is usually fragmented and static — IonianDTwin replaces it with continuous, measurable monitoring.",
  },
  "/about/project": {
    titleEl: "Το έργο IonianDTwin — IonianDTwin",
    titleEn: "The IonianDTwin project — IonianDTwin",
    descEl:
      "«IonianDTwin: Ψηφιακό Δίδυμο για τη Δυναμική Μοντελοποίηση και την Ευφυή Εξισορρόπηση της Αστικής Βιωσιμότητας και του Τουρισμού των Ιονίων Νήσων». Σκοπός: να αποκτήσουν η Περιφέρεια, οι Δήμοι, οι επιχειρήσεις και οι πολίτες ένα κοινό εργαλείο που δείχνει με μετρήσιμα δεδομένα πώς επηρεάζει ο τουρισμός τα νησιά.",
    descEn:
      "“IonianDTwin: Digital Twin for the Dynamic Modelling and Intelligent Balancing of Urban Sustainability and Tourism in the Ionian Islands”. Goal: give the Region, municipalities, businesses and citizens a shared tool showing — with measurable data — how tourism affects the islands.",
  },
  "/about/architecture": {
    titleEl: "Αρχιτεκτονική του Ψηφιακού Διδύμου — IonianDTwin",
    titleEn: "Digital Twin architecture — IonianDTwin",
    descEl:
      "Πέντε συνεργαζόμενα επίπεδα: συλλογή δεδομένων (αισθητήρες, Copernicus, λιμάνια, αεροδρόμια), λίμνη δεδομένων και διαλειτουργικότητα, μηχανές δεικτών και μοντέλων, γεωχωρικές υπηρεσίες GIS και τρεις διεπαφές — πίνακας ελέγχου, κινητή εφαρμογή και διεπαφή φυσικής γλώσσας.",
    descEn:
      "Five cooperating layers: data capture (sensors, Copernicus, ports, airports), data lake and interoperability, indicator and model engines, geospatial GIS services, and three interfaces — dashboard, mobile app and natural-language access.",
  },
  "/about/technology": {
    titleEl: "Τεχνολογίες: Copernicus, μηχανική μάθηση, LLM — IonianDTwin",
    titleEn: "Technologies: Copernicus, machine learning, LLMs — IonianDTwin",
    descEl:
      "Δορυφορικά δεδομένα Copernicus (Sentinel, CAMS, CMEMS), επίγειοι αισθητήρες και ανοικτές πηγές τροφοδοτούν μοντέλα μηχανικής μάθησης για πρόβλεψη ζήτησης, συμφόρησης και φόρτου υποδομών. Μεγάλα Γλωσσικά Μοντέλα με ανάκτηση (RAG) απαντούν σε ερωτήσεις με απλή γλώσσα.",
    descEn:
      "Copernicus satellite data (Sentinel, CAMS, CMEMS), ground sensors and open sources feed machine-learning models forecasting demand, congestion and infrastructure load. Retrieval-augmented Large Language Models answer questions in plain language.",
  },
  "/platform": {
    titleEl: "Η πλατφόρμα IonianDTwin — IonianDTwin",
    titleEn: "The IonianDTwin platform — IonianDTwin",
    descEl:
      "Μία κεντρική πλατφόρμα παρακολούθησης, πρόβλεψης και ειδοποίησης για την Περιφέρεια και τους Δήμους, συνοδευόμενη από κινητή εφαρμογή για πολίτες και επισκέπτες και από ευφυή διεπαφή ερωτήσεων. Πιλοτική δοκιμή σε πραγματικές συνθήκες κατά την τουριστική περίοδο.",
    descEn:
      "One central monitoring, forecasting and alerting platform for the Region and municipalities, plus a mobile app for citizens and visitors and an intelligent query interface. Pilot-tested under real conditions during the tourist season.",
  },
  "/platform/dashboard": {
    titleEl: "Πίνακας ελέγχου σε πραγματικό χρόνο — IonianDTwin",
    titleEn: "Real-time dashboard — IonianDTwin",
    descEl:
      "Διαδραστικός γεωχωρικός πίνακας: χάρτης των Ιονίων με σταθμούς παρακολούθησης, θερμικοί χάρτες πίεσης, χρονοσειρές δεικτών, προβλέψεις και ειδοποιήσεις κατωφλίων — με φίλτρα ανά νησί, θεματικό επίπεδο και χρονικό ορίζοντα.",
    descEn:
      "Interactive geospatial dashboard: Ionian map with monitoring stations, pressure heatmaps, indicator time series, forecasts and threshold alerts — filterable by island, thematic layer and time horizon.",
  },
  "/platform/mobile-app": {
    titleEl: "Κινητή εφαρμογή για πολίτες και επισκέπτες — IonianDTwin",
    titleEn: "Mobile app for citizens and visitors — IonianDTwin",
    descEl:
      "Ενημέρωση και ειδοποιήσεις για περιβαλλοντικές συνθήκες και συμφόρηση, προτάσεις εναλλακτικών χαμηλής πίεσης και συμμετοχική συνεισφορά δεδομένων από τους ίδιους τους χρήστες — ο πολίτης ως αισθητήρας.",
    descEn:
      "Updates and alerts on environmental conditions and congestion, low-pressure alternative suggestions, and participatory data contribution by users themselves — the citizen as a sensor.",
  },
  "/platform/intelligence": {
    titleEl: "Τεχνητή νοημοσύνη και ερωτήσεις σε φυσική γλώσσα — IonianDTwin",
    titleEn: "Artificial intelligence and natural-language questions — IonianDTwin",
    descEl:
      "Ρωτήστε το δίδυμο με απλά λόγια: «Ποιες παραλίες πιέζονται περισσότερο αυτό το Σαββατοκύριακο;». Η μηχανή RAG συνδυάζει ζωντανά δεδομένα και τεκμηρίωση δεικτών και απαντά με πηγές, διαγράμματα και χάρτες.",
    descEn:
      "Ask the twin in plain words: “Which beaches are most pressured this weekend?”. The RAG engine combines live data with indicator documentation and answers with sources, charts and maps.",
  },
  "/indicators": {
    titleEl: "34 δείκτες βιωσιμότητας, ευθυγραμμισμένοι με το GSTC — IonianDTwin",
    titleEn: "34 sustainability indicators, aligned with GSTC — IonianDTwin",
    descEl:
      "Ποιότητα αέρα και ύδατος, θόρυβος, πυκνότητα πλήθους, μεταφορές, ενέργεια, απόβλητα, βιοποικιλότητα, πολιτιστική κληρονομιά και κοινωνικο-οικονομικά μεγέθη — 34 δείκτες ευθυγραμμισμένοι με τα διεθνή κριτήρια του Global Sustainable Tourism Council (GSTC).",
    descEn:
      "Air and water quality, noise, crowd density, transport, energy, waste, biodiversity, cultural heritage and socio-economic metrics — 34 indicators aligned with the Global Sustainable Tourism Council (GSTC) criteria.",
  },
  "/resources/data-sources": {
    titleEl: "Περισσότερες από 25 πηγές δεδομένων — IonianDTwin",
    titleEn: "More than 25 data sources — IonianDTwin",
    descEl:
      "Copernicus (αέρας, θάλασσα, βλάστηση), ύδατα κολύμβησης, μικροκλίμα, αφίξεις αεροδρομίων και λιμανιών, πληρότητα παραλιών, κυκλοφορία, κάλυψη κινητής και οικονομικά στοιχεία τουρισμού — ενοποιημένα σε ενιαίο γεωχωρικό μοντέλο.",
    descEn:
      "Copernicus (air, sea, vegetation), bathing waters, microclimate, airport and port arrivals, beach occupancy, traffic, mobile coverage and tourism economics — unified in a single geospatial model.",
  },
  "/resources/related-projects": {
    titleEl: "Συναφή έργα και συνέργειες — IonianDTwin",
    titleEn: "Related projects and synergies — IonianDTwin",
    descEl:
      "Το IonianDTwin συνομιλεί με ευρωπαϊκές και εθνικές πρωτοβουλίες για ψηφιακά δίδυμα προορισμών, βιώσιμο τουρισμό και παρατήρηση Γης — από το Destination Earth μέχρι περιφερειακά παρατηρητήρια.",
    descEn:
      "IonianDTwin connects with European and national initiatives on destination digital twins, sustainable tourism and Earth observation — from Destination Earth to regional observatories.",
  },
  "/resources/references": {
    titleEl: "Βιβλιογραφία και πρότυπα — IonianDTwin",
    titleEn: "Bibliography and standards — IonianDTwin",
    descEl:
      "GSTC Destination Criteria v2.0, τεκμηρίωση Copernicus (CAMS, CMEMS, CLMS), μεθοδολογίες φέρουσας ικανότητας και βασική βιβλιογραφία για ψηφιακά δίδυμα και βιώσιμο τουρισμό.",
    descEn:
      "GSTC Destination Criteria v2.0, Copernicus documentation (CAMS, CMEMS, CLMS), carrying-capacity methodologies and core literature on digital twins and sustainable tourism.",
  },
  "/blog": {
    titleEl: "Νέα, ανακοινώσεις και Δελτία Τύπου — IonianDTwin",
    titleEn: "News, announcements and press releases — IonianDTwin",
    descEl:
      "Επίσημο Δελτίο Τύπου έναρξης του έργου, επιστημονικές ανακοινώσεις για τους δείκτες GSTC και την παρατήρηση Γης, τεχνολογικές ενημερώσεις για AI και πιλοτικές εφαρμογές στα νησιά.",
    descEn:
      "Official project launch press release, scientific updates on GSTC indicators and Earth observation, technology briefings on AI, and island pilot deployments.",
  },
  "/contact": {
    titleEl: "Επικοινωνία με την ομάδα του έργου — IonianDTwin",
    titleEn: "Contact the project team — IonianDTwin",
    descEl:
      "Τμήμα Πληροφορικής, Ιόνιο Πανεπιστήμιο — Επιστημονικός Υπεύθυνος: Καθηγητής Εμμανουήλ Μάγκος. Φόρμα επικοινωνίας και στοιχεία για φορείς, επιχειρήσεις και ερευνητές.",
    descEn:
      "Department of Informatics, Ionian University — Scientific Coordinator: Professor Emmanouel Magkos. Contact form and details for authorities, businesses and researchers.",
  },
  "/privacy": {
    titleEl: "Απόρρητο και προστασία δεδομένων — IonianDTwin",
    titleEn: "Privacy and data protection — IonianDTwin",
    descEl:
      "Πώς συλλέγονται και προστατεύονται τα δεδομένα: ανωνυμοποίηση, συγκατάθεση, δικαιώματα υποκειμένων και συμμόρφωση με τον ΓΚΠΔ (GDPR) σε όλες τις διεπαφές του έργου.",
    descEn:
      "How data is collected and protected: anonymisation, consent, data-subject rights and GDPR compliance across all project interfaces.",
  },
};
