import { useState, useMemo, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Check,
  Clock,
  Copy,
  FileText,
  MapPin,
  Newspaper,
  Printer,
  Search,
  Tag as TagIcon,
  X,
} from "lucide-react";
import { useLang, useT } from "../i18n";
import { Container, EuFlag, Reveal } from "../components/ui";
import { BLOG_CATEGORIES, BLOG_POSTS } from "../data/blogPosts";

export default function BlogPage() {
  const { lang } = useLang();
  const t = useT();
  const isEl = lang === "el";
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedPostSlug = searchParams.get("post");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  // Active post for detailed reading view
  const activePost = useMemo(() => {
    if (!selectedPostSlug) return null;
    return BLOG_POSTS.find((p) => p.slug === selectedPostSlug) ?? null;
  }, [selectedPostSlug]);

  // Scroll to top when post changes
  useEffect(() => {
    if (activePost) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [activePost]);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const set = new Set<string>();
    BLOG_POSTS.forEach((p) => {
      const tags = isEl ? p.tags.el : p.tags.en;
      tags.forEach((tag) => set.add(tag));
    });
    return Array.from(set);
  }, [isEl]);

  // Filtered posts
  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((p) => {
      if (activeCategory !== "all" && p.category !== activeCategory) {
        return false;
      }
      if (selectedTag) {
        const tags = isEl ? p.tags.el : p.tags.en;
        if (!tags.includes(selectedTag)) return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const title = isEl ? p.title.el.toLowerCase() : p.title.en.toLowerCase();
        const excerpt = isEl ? p.excerpt.el.toLowerCase() : p.excerpt.en.toLowerCase();
        const author = isEl ? p.author.el.toLowerCase() : p.author.en.toLowerCase();
        const tags = isEl ? p.tags.el.join(" ").toLowerCase() : p.tags.en.join(" ").toLowerCase();
        return (
          title.includes(q) ||
          excerpt.includes(q) ||
          author.includes(q) ||
          tags.includes(q) ||
          (p.opsCode && p.opsCode.includes(q))
        );
      }
      return true;
    });
  }, [activeCategory, selectedTag, searchQuery, isEl]);

  const featuredPost = useMemo(() => {
    return BLOG_POSTS.find((p) => p.featured) || BLOG_POSTS[0];
  }, []);

  const handleSelectPost = (slug: string) => {
    setSearchParams({ post: slug });
  };

  const handleClearPost = () => {
    searchParams.delete("post");
    setSearchParams(searchParams);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <main>
      {/* If an active post is selected for full reading */}
      {activePost ? (
        <section className="border-b border-line bg-paper pt-28 pb-16 md:pt-36 md:pb-24">
          <Container className="max-w-4xl">
            {/* Top Navigation Bar */}
            <div className="flex items-center justify-between border-b border-line pb-6">
              <button
                onClick={handleClearPost}
                className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-smoke hover:text-clay transition-colors"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                {isEl ? "Επιστροφή σε όλα τα άρθρα" : "Back to all articles"}
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-cream px-3 py-1.5 font-mono text-[11px] text-smoke hover:text-ink hover:border-ink/40 transition-colors"
                  title={isEl ? "Αντιγραφή συνδέσμου" : "Copy link"}
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? (isEl ? "Αντιγράφηκε!" : "Copied!") : isEl ? "Κοινοποίηση" : "Share"}</span>
                </button>
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-cream px-3 py-1.5 font-mono text-[11px] text-smoke hover:text-ink hover:border-ink/40 transition-colors"
                  title={isEl ? "Εκτύπωση" : "Print"}
                >
                  <Printer className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">{isEl ? "Εκτύπωση" : "Print"}</span>
                </button>
              </div>
            </div>

            {/* Post Header */}
            <article className="mt-10">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="rounded-full bg-clay text-cream px-3.5 py-1 font-mono text-[11px] uppercase tracking-wider font-semibold shadow-sm">
                  {activePost.type === "press-release"
                    ? isEl
                      ? "ΕΠΙΣΗΜΟ ΔΕΛΤΙΟ ΤΥΠΟΥ"
                      : "OFFICIAL PRESS RELEASE"
                    : isEl
                    ? "ΕΠΙΣΤΗΜΟΝΙΚΗ ΑΝΑΚΟΙΝΩΣΗ"
                    : "SCIENTIFIC UPDATE"}
                </span>
                {activePost.opsCode && (
                  <span className="rounded-full border border-line bg-cream px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-fog">
                    ΚΩΔΙΚΟΣ ΟΠΣ: {activePost.opsCode}
                  </span>
                )}
                <span className="flex items-center gap-1 font-mono text-xs text-fog ml-auto">
                  <Clock className="h-3.5 w-3.5" />
                  {isEl ? activePost.readTime.el : activePost.readTime.en}
                </span>
              </div>

              <h1 className="display mt-6 text-3xl md:text-4xl lg:text-[2.75rem] font-medium leading-[1.12] tracking-tight text-ink">
                {isEl ? activePost.title.el : activePost.title.en}
              </h1>

              {activePost.subtitle && (
                <p className="display mt-3 text-xl md:text-2xl text-clay leading-snug">
                  {isEl ? activePost.subtitle.el : activePost.subtitle.en}
                </p>
              )}

              {/* Meta information bar */}
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-line py-4 text-xs text-smoke">
                <span className="flex items-center gap-1.5 font-medium">
                  <Calendar className="h-4 w-4 text-clay" />
                  {isEl ? activePost.date.el : activePost.date.en}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-clay" />
                  {isEl ? activePost.location.el : activePost.location.en}
                </span>
                <span className="flex items-center gap-1.5">
                  <Newspaper className="h-4 w-4 text-clay" />
                  {isEl ? activePost.author.el : activePost.author.en}
                </span>
              </div>

              {/* Key Indicators & Parameters Grid */}
              {activePost.highlights && (
                <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {(isEl ? activePost.highlights.el : activePost.highlights.en).map((h) => (
                    <div
                      key={h.label}
                      className="rounded-2xl border border-line bg-gradient-to-b from-cream/60 to-cream/20 p-4 transition-colors hover:border-clay/40"
                    >
                      <p className="font-mono text-[10px] uppercase tracking-wider text-fog">{h.label}</p>
                      <p className="display mt-1 text-lg md:text-xl font-semibold text-ink">{h.value}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Lead Paragraph Box */}
              <div className="mt-8 rounded-2xl border border-clay/25 bg-clay/5 p-6 md:p-8">
                <p className="text-base md:text-lg leading-relaxed text-ink font-sans font-medium">
                  {isEl ? activePost.lead.el : activePost.lead.en}
                </p>
              </div>

              {/* Structured Sections */}
              <div className="mt-10 space-y-12">
                {activePost.sections.map((sec, idx) => (
                  <div key={idx} className="space-y-6">
                    {sec.title && (
                      <div className="border-b border-line pb-3">
                        <h2 className="display text-2xl md:text-3xl font-medium tracking-tight text-ink">
                          {isEl ? sec.title.el : sec.title.en}
                        </h2>
                      </div>
                    )}

                    {sec.paragraphs && (
                      <div className="space-y-4">
                        {(isEl ? sec.paragraphs.el : sec.paragraphs.en).map((para, pIdx) => (
                          <p key={pIdx} className="text-[15.5px] leading-[1.8] text-smoke">
                            {para}
                          </p>
                        ))}
                      </div>
                    )}

                    {/* Optional Callout / Quote Box */}
                    {sec.callout && (
                      <div className="my-6 rounded-2xl border-l-4 border-clay bg-cream/60 p-5 md:p-6 text-sm md:text-base leading-relaxed text-ink font-medium">
                        {isEl ? sec.callout.el : sec.callout.en}
                      </div>
                    )}

                    {/* Structured Cards Grid */}
                    {sec.cards && (
                      <div className="my-6 grid gap-4 md:grid-cols-3">
                        {sec.cards.map((card, cIdx) => (
                          <div
                            key={cIdx}
                            className="rounded-2xl border border-line bg-cream/40 p-5 transition-all duration-300 hover:border-clay/40 hover:bg-cream/70 hover:shadow-sm"
                          >
                            {card.badge && (
                              <span className="inline-block rounded-full bg-clay/15 text-clay px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider font-semibold mb-2.5">
                                {isEl ? card.badge.el : card.badge.en}
                              </span>
                            )}
                            <h3 className="display text-lg font-medium text-ink leading-snug">
                              {isEl ? card.title.el : card.title.en}
                            </h3>
                            <p className="mt-2 text-xs md:text-sm leading-relaxed text-smoke">
                              {isEl ? card.description.el : card.description.en}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Funding & Institutional Summary Box */}
              {activePost.fundingBox && (
                <div className="mt-14 overflow-hidden rounded-3xl border border-line bg-gradient-to-b from-paper to-cream/40 shadow-sm">
                  <div className="border-b border-line bg-cream/70 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <EuFlag className="h-6 w-9 shrink-0" />
                      <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-ink">
                        {isEl ? activePost.fundingBox.title.el : activePost.fundingBox.title.en}
                      </h3>
                    </div>
                    <span className="font-mono text-[10.5px] uppercase tracking-wider text-clay font-semibold">
                      ΕΤΠΑ 2021–2027
                    </span>
                  </div>

                  <div className="p-6 md:p-8 space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="rounded-xl border border-line/80 bg-paper p-4">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-fog">
                          {isEl ? "Επιχειρησιακό Πρόγραμμα" : "Operational Programme"}
                        </span>
                        <p className="mt-1 text-sm font-medium text-ink">
                          {isEl ? activePost.fundingBox.programme.el : activePost.fundingBox.programme.en}
                        </p>
                      </div>

                      <div className="rounded-xl border border-line/80 bg-paper p-4">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-fog">
                          {isEl ? "Άξονας Προτεραιότητας" : "Priority Axis"}
                        </span>
                        <p className="mt-1 text-sm font-medium text-ink">
                          {isEl ? activePost.fundingBox.objective.el : activePost.fundingBox.objective.en}
                        </p>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 pt-1">
                      <div className="rounded-xl border border-line/80 bg-paper p-4">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-fog">
                          {isEl ? "Δικαιούχος & Φορέας Υλοποίησης" : "Beneficiary Organization"}
                        </span>
                        <p className="mt-1 text-sm font-medium text-ink">
                          {isEl ? activePost.fundingBox.beneficiary.el : activePost.fundingBox.beneficiary.en}
                        </p>
                      </div>

                      <div className="rounded-xl border border-line/80 bg-paper p-4">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-fog">
                          {isEl ? "Συνολική Δημόσια Δαπάνη" : "Total Public Expenditure"}
                        </span>
                        <p className="display mt-1 text-lg font-semibold text-clay">
                          {activePost.fundingBox.budget}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tag Cloud */}
              <div className="mt-12 pt-6 border-t border-line">
                <p className="font-mono text-xs uppercase tracking-wider text-fog mb-3">
                  {isEl ? "Ετικέτες Άρθρου" : "Article Tags"}
                </p>
                <div className="flex flex-wrap gap-2">
                  {(isEl ? activePost.tags.el : activePost.tags.en).map((tag) => (
                    <button
                      key={tag}
                      onClick={() => {
                        setSelectedTag(tag);
                        handleClearPost();
                      }}
                      className="rounded-full border border-line bg-cream px-3.5 py-1 text-xs font-medium text-smoke hover:border-clay hover:text-clay transition-colors"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Official Contact Callout */}
              <div className="mt-12 rounded-3xl border border-line bg-ink2 p-8 text-cream">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div>
                    <span className="eyebrow eyebrow--dark">
                      {isEl ? "ΕΠΙΣΗΜΗ ΕΠΙΚΟΙΝΩΝΙΑ" : "OFFICIAL INQUIRIES"}
                    </span>
                    <h4 className="display mt-2 text-xl font-medium text-cream">
                      {isEl ? "Επιστημονική Ομάδα IonianDTwin" : "IonianDTwin Scientific Team"}
                    </h4>
                    <p className="mt-1 text-xs text-cream/65">
                      {isEl
                        ? "Ιόνιο Πανεπιστήμιο · Πλατεία Τσιριγώτη 7, Κέρκυρα 491 00"
                        : "Ionian University · Tsirigoti Square 7, Corfu 491 00"}
                    </p>
                  </div>
                  <Link
                    to="/contact"
                    className="btn rounded-full bg-cream text-ink px-6 py-2.5 text-xs font-medium hover:bg-clay hover:text-cream transition-colors whitespace-nowrap"
                  >
                    {isEl ? "Επικοινωνία με την Ομάδα" : "Contact Team"}
                  </Link>
                </div>
              </div>
            </article>
          </Container>
        </section>
      ) : (
        <>
          {/* Featured Press Release Hero Spotlight */}
          <section className="border-b border-line bg-cream pt-28 pb-16 md:pt-36 md:pb-20">
            <Container>
              <Reveal>
                <div className="group relative overflow-hidden rounded-3xl border border-line bg-paper p-8 md:p-12 shadow-sm transition-all duration-500 hover:border-clay/40 hover:shadow-md">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-clay px-3.5 py-1 font-mono text-[11px] uppercase tracking-wider font-semibold text-cream">
                        {isEl ? "ΔΕΛΤΙΟ ΤΥΠΟΥ · ΚΟΡΥΦΑΙΑ ΑΝΑΚΟΙΝΩΣΗ" : "PRESS RELEASE · FEATURED"}
                      </span>
                      <span className="rounded-full border border-line bg-cream px-3 py-1 font-mono text-[10.5px] uppercase tracking-wider text-smoke hidden sm:inline">
                        OPS 6061866
                      </span>
                    </div>
                    <span className="flex items-center gap-1.5 font-mono text-xs text-fog">
                      <Calendar className="h-3.5 w-3.5 text-clay" />
                      {isEl ? featuredPost.date.el : featuredPost.date.en}
                    </span>
                  </div>

                  <h2 className="display mt-6 text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight text-ink leading-snug">
                    {isEl ? featuredPost.title.el : featuredPost.title.en}
                  </h2>

                  {featuredPost.subtitle && (
                    <p className="display mt-2 text-xl text-clay">
                      {isEl ? featuredPost.subtitle.el : featuredPost.subtitle.en}
                    </p>
                  )}

                  <p className="text-body mt-4 max-w-3xl text-smoke leading-relaxed">
                    {isEl ? featuredPost.excerpt.el : featuredPost.excerpt.en}
                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-2">
                    {(isEl ? featuredPost.tags.el : featuredPost.tags.en).slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-line bg-cream/70 px-3 py-1 font-mono text-[11px] text-smoke"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
                    <div className="flex items-center gap-3">
                      <EuFlag className="h-5 w-8 shrink-0" />
                      <span className="font-mono text-xs text-fog">
                        {isEl ? "Συγχρηματοδότηση ΕΤΠΑ · €239.900,00" : "ERDF Co-funded · €239,900.00"}
                      </span>
                    </div>

                    <button
                      onClick={() => handleSelectPost(featuredPost.slug)}
                      className="btn-primary group/btn inline-flex items-center gap-2"
                    >
                      <span>{isEl ? "Ανάγνωση Δελτίου Τύπου" : "Read Full Press Release"}</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </div>
              </Reveal>
            </Container>
          </section>

          {/* Search, Categories, and Tags Controls */}
          <section className="border-b border-line bg-paper py-12">
            <Container>
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                {/* Search Bar */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-fog" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={
                      isEl
                        ? "Αναζήτηση άρθρων, δελτίων τύπου, ετικετών..."
                        : "Search posts, press releases, keywords..."
                    }
                    className="w-full rounded-full border border-line bg-cream pl-11 pr-10 py-2.5 text-sm text-ink placeholder:text-fog focus:border-clay focus:outline-none"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-fog hover:text-ink"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {/* Category Pills */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {BLOG_CATEGORIES.map((cat) => {
                    const count =
                      cat.id === "all"
                        ? BLOG_POSTS.length
                        : BLOG_POSTS.filter((p) => p.category === cat.id).length;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`rounded-full px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 ${
                          activeCategory === cat.id
                            ? "bg-ink text-cream font-medium"
                            : "border border-line bg-cream/70 text-smoke hover:bg-cream hover:text-ink"
                        }`}
                      >
                        <span>{isEl ? cat.labelEl : cat.labelEn}</span>
                        <span
                          className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                            activeCategory === cat.id ? "bg-clay text-cream" : "bg-line text-fog"
                          }`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tag filters strip */}
              <div className="mt-6 flex flex-wrap items-center gap-2 pt-4 border-t border-line/60">
                <span className="flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-fog mr-2">
                  <TagIcon className="h-3 w-3 text-clay" />
                  {isEl ? "Ετικέτες:" : "Filter Tag:"}
                </span>
                {allTags.map((tag) => {
                  const isSelected = selectedTag === tag;
                  return (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(isSelected ? null : tag)}
                      className={`rounded-full px-3 py-1 font-mono text-[11px] transition-colors ${
                        isSelected
                          ? "bg-clay text-cream font-medium"
                          : "border border-line bg-cream/50 text-smoke hover:border-clay/50 hover:text-ink"
                      }`}
                    >
                      #{tag}
                    </button>
                  );
                })}
                {selectedTag && (
                  <button
                    onClick={() => setSelectedTag(null)}
                    className="inline-flex items-center gap-1 rounded-full bg-line px-2.5 py-1 font-mono text-[11px] text-smoke hover:text-ink"
                  >
                    <X className="h-3 w-3" />
                    {isEl ? "Καθαρισμός" : "Clear tag"}
                  </button>
                )}
              </div>
            </Container>
          </section>

          {/* Posts Grid */}
          <section className="border-b border-line bg-cream py-20 md:py-24">
            <Container>
              {filteredPosts.length === 0 ? (
                <div className="rounded-2xl border border-line bg-paper py-16 text-center">
                  <FileText className="mx-auto h-12 w-12 text-fog" strokeWidth={1.5} />
                  <p className="display mt-4 text-2xl font-medium text-ink">
                    {isEl ? "Δεν βρέθηκαν σχετικά άρθρα" : "No articles found"}
                  </p>
                  <p className="text-body mt-2 text-smoke">
                    {isEl
                      ? "Δοκιμάστε να αλλάξετε τα κριτήρια αναζήτησης ή την κατηγορία."
                      : "Try adjusting your search query or active category filters."}
                  </p>
                  <button
                    onClick={() => {
                      setActiveCategory("all");
                      setSelectedTag(null);
                      setSearchQuery("");
                    }}
                    className="btn-ghost mt-6 text-xs"
                  >
                    {isEl ? "Επαναφορά όλων των φίλτρων" : "Reset all filters"}
                  </button>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredPosts.map((post, i) => (
                    <Reveal key={post.id} delay={(i % 3) * 80}>
                      <article className="group flex h-full flex-col rounded-3xl border border-line bg-paper p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-clay/50 hover:shadow-lg">
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider font-semibold ${
                              post.type === "press-release"
                                ? "bg-clay/15 text-clay"
                                : "bg-sea/15 text-sea"
                            }`}
                          >
                            {post.type === "press-release"
                              ? isEl
                                ? "Δελτίο Τύπου"
                                : "Press Release"
                              : isEl
                              ? "Ανακοίνωση"
                              : "Article"}
                          </span>
                          <span className="flex items-center gap-1 font-mono text-[11px] text-fog">
                            <Clock className="h-3 w-3" />
                            {isEl ? post.readTime.el : post.readTime.en}
                          </span>
                        </div>

                        <h3 className="display mt-4 text-xl font-medium leading-snug tracking-tight text-ink group-hover:text-claydeep transition-colors">
                          {isEl ? post.title.el : post.title.en}
                        </h3>

                        {post.subtitle && (
                          <p className="mt-1 text-xs font-mono text-clay line-clamp-1">
                            {isEl ? post.subtitle.el : post.subtitle.en}
                          </p>
                        )}

                        <p className="text-small mt-3 flex-1 leading-relaxed text-smoke line-clamp-3">
                          {isEl ? post.excerpt.el : post.excerpt.en}
                        </p>

                        <div className="mt-5 flex flex-wrap gap-1.5">
                          {(isEl ? post.tags.el : post.tags.en).slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-line bg-cream px-2.5 py-0.5 font-mono text-[10px] text-fog"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>

                        <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
                          <span className="font-mono text-[11px] text-fog">
                            {isEl ? post.date.el : post.date.en}
                          </span>
                          <button
                            onClick={() => handleSelectPost(post.slug)}
                            className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-clay font-medium group-hover:translate-x-0.5 transition-transform"
                          >
                            <span>{isEl ? "Ανάγνωση" : "Read"}</span>
                            <ArrowRight className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </article>
                    </Reveal>
                  ))}
                </div>
              )}
            </Container>
          </section>

          {/* Press Inquiries Callout */}
          <section className="bg-paper py-20">
            <Container className="flex flex-col items-center text-center max-w-2xl">
              <Reveal>
                <span className="eyebrow">{isEl ? "ΓΡΑΦΕΙΟ ΤΥΠΟΥ" : "PRESS OFFICE"}</span>
                <h2 className="display mt-4 text-3xl font-medium tracking-tight text-ink">
                  {isEl ? "Δημοσιογραφικά Ερωτήματα & Υλικό" : "Press Inquiries & Media Kit"}
                </h2>
                <p className="text-body mt-3 text-smoke">
                  {isEl
                    ? "Για συνεντεύξεις, επίσημες δηλώσεις, φωτογραφικό υλικό υψηλής ανάλυσης και γραφήματα του ψηφιακού διδύμου, επικοινωνήστε με την ομάδα επικοινωνίας του έργου."
                    : "For interviews, official press statements, high-resolution media kits, and telemetry visual assets, get in touch with our communications team."}
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <Link to="/contact" className="btn-primary">
                    {isEl ? "Επικοινωνία με το Γραφείο Τύπου" : "Contact Press Office"}
                  </Link>
                  <Link to="/resources/references" className="btn-ghost">
                    {isEl ? "Βιβλιογραφία & Πηγές" : "References & Standards"}
                  </Link>
                </div>
              </Reveal>
            </Container>
          </section>
        </>
      )}
    </main>
  );
}
