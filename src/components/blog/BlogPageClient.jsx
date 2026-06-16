"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Clock,
  User,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Mail,
  Check,
  Loader2,
  AlertCircle,
  Search,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { cn } from "@/lib/utils";

/* ─── Types ─── */

/* ─── Category Colors ─── */
const CATEGORY_COLORS = {
  Engineering: {
    bg: "bg-blue-500/10",
    text: "text-blue-600",
    border: "border-blue-500/20",
  },
  "AI/ML": {
    bg: "bg-purple-500/10",
    text: "text-purple-600",
    border: "border-purple-500/20",
  },
  Design: {
    bg: "bg-pink-500/10",
    text: "text-pink-600",
    border: "border-pink-500/20",
  },
  Cloud: {
    bg: "bg-cyan-500/10",
    text: "text-cyan-600",
    border: "border-cyan-500/20",
  },
  Business: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-600",
    border: "border-emerald-500/20",
  },
  DevOps: {
    bg: "bg-amber-500/10",
    text: "text-amber-600",
    border: "border-amber-500/20",
  },
  Security: {
    bg: "bg-red-500/10",
    text: "text-red-600",
    border: "border-red-500/20",
  },
  "Case Studies": {
    bg: "bg-teal-500/10",
    text: "text-teal-600",
    border: "border-teal-500/20",
  },
};

const DEFAULT_CATEGORY_COLOR = {
  bg: "bg-[#F97316]/10",
  text: "text-[#F97316]",
  border: "border-[#F97316]/20",
};

/* ─── Categories ─── */
const CATEGORIES = [
  "All Posts",
  "Engineering",
  "AI/ML",
  "Design",
  "Cloud",
  "Business",
  "DevOps",
  "Security",
  "Case Studies",
];

/* ─── Date Formatting ─── */
function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/* ─── Category Badge ─── */
function CategoryBadge({ category }) {
  const colors = CATEGORY_COLORS[category] || DEFAULT_CATEGORY_COLOR;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] font-[family-name:var(--font-inter)] border",
        colors.bg,
        colors.text,
        colors.border,
      )}
    >
      {category}
    </span>
  );
}

/* ─── Featured Post Card ─── */
function FeaturedPostCard({ post }) {
  return (
    <article>
      <Link href={`/blog/${post.slug}`} className="group block">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#18181B] via-[#1a1a1e] to-[#0f0f12]">
          {/* Decorative grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* Radial accent glow */}
          <div className="absolute -top-1/3 -right-1/4 w-[60%] h-[120%] rounded-full bg-[#F97316]/[0.07] blur-[80px] pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row min-h-[360px] md:min-h-[420px]">
            {/* Left: Visual */}
            <div className="relative lg:w-[55%] aspect-video lg:aspect-auto lg:min-h-full overflow-hidden">
              {post.coverImage ? (
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  priority
                />
              ) : (
                <>
                  <div
                    className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{
                      background:
                        "linear-gradient(135deg, #1a0800 0%, #2a1500 30%, #0d0d0d 60%, #1a0a00 100%)",
                    }}
                  />

                  <div
                    className="absolute inset-0 transition-opacity duration-500"
                    style={{
                      background:
                        "radial-gradient(ellipse 50% 50% at 70% 30%, rgba(249,115,22,0.12), transparent)",
                      opacity: 0.6,
                    }}
                  />
                </>
              )}
              {/* Featured label */}
              <span className="absolute top-4 right-4 bg-[#F97316] text-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full z-10 font-[family-name:var(--font-inter)]">
                Featured
              </span>
              {/* Category badge */}
              <div className="absolute top-6 left-6 md:top-8 md:left-8 z-10">
                <span className="inline-flex items-center rounded-full bg-[#F97316]/15 text-[#F97316] border border-[#F97316]/30 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] font-[family-name:var(--font-inter)]">
                  {post.category}
                </span>
              </div>
            </div>

            {/* Right: Content */}
            <div className="relative lg:w-[45%] p-6 md:p-8 lg:p-10 flex flex-col justify-between">
              <div>
                <h2 className="font-[family-name:var(--font-plus-jakarta)] text-2xl md:text-3xl lg:text-4xl font-bold text-[#FAFAFA] leading-[1.1] tracking-tight group-hover:text-[#F97316] transition-colors duration-300">
                  {post.title}
                </h2>
                <p className="mt-4 text-[#A1A1AA] text-sm md:text-base leading-relaxed font-[family-name:var(--font-inter)] line-clamp-3">
                  {post.excerpt}
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs text-[#A1A1AA] font-[family-name:var(--font-inter)]">
                  <span className="flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5" />
                    {post.author}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatDate(post.createdAt)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {post.readTime} min
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[#F97316] font-[family-name:var(--font-inter)] text-sm font-semibold transition-colors duration-300 group-hover:text-[#FB923C]">
                  Read Article
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

/* ─── Blog Post Card ─── */
function BlogPostCard({ post, index }) {
  const gradientBackgrounds = [
    "linear-gradient(145deg, #0d0014 0%, #0d0d0d 50%, #10001a 100%)",
    "linear-gradient(160deg, #001a0d 0%, #0d0d0d 50%, #001a10 100%)",
    "linear-gradient(125deg, #0a0014 0%, #0d0d0d 50%, #14001a 100%)",
    "linear-gradient(170deg, #1a0f00 0%, #0d0d0d 50%, #1a1200 100%)",
    "linear-gradient(150deg, #001a1a 0%, #0d0d0d 50%, #001414 100%)",
  ];

  return (
    <div>
      <Link href={`/blog/${post.slug}`} className="group block">
        <article className="relative overflow-hidden rounded-xl bg-white border border-black/[0.06] card-hover-lift">
          {/* Cover image / Gradient placeholder */}
          <div className="relative aspect-[16/10] overflow-hidden">
            {post.coverImage ? (
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            ) : (
              <>
                <div
                  className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{
                    background:
                      gradientBackgrounds[index % gradientBackgrounds.length],
                  }}
                />

                <div
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(ellipse 50% 50% at ${50 + index * 12}% ${30 + index * 10}%, rgba(249,115,22,0.08), transparent)`,
                  }}
                />
              </>
            )}
            {/* Category badge */}
            <div className="absolute top-3 left-3 z-10">
              <CategoryBadge category={post.category} />
            </div>
            {/* Read time badge */}
            <div className="absolute top-3 right-3 z-10">
              <span className="inline-flex items-center gap-1 rounded-full bg-black/20 backdrop-blur-sm px-2.5 py-1 text-[10px] font-medium text-white/80 font-[family-name:var(--font-inter)]">
                <Clock className="h-3 w-3" />
                {post.readTime} min
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 md:p-6">
            <h3 className="font-[family-name:var(--font-plus-jakarta)] text-lg md:text-xl font-bold text-[#18181B] leading-tight line-clamp-2 group-hover:text-[#F97316] transition-colors duration-300">
              {post.title}
            </h3>
            <p className="mt-2 text-[#52525B] text-sm leading-relaxed font-[family-name:var(--font-inter)] line-clamp-2">
              {post.excerpt}
            </p>
            <div className="mt-4 flex items-center gap-3 text-[11px] text-[#A1A1AA] font-[family-name:var(--font-inter)]">
              <span className="flex items-center gap-1">
                <User className="h-3 w-3" />
                {post.author}
              </span>
              <span className="w-1 h-1 rounded-full bg-[#A1A1AA]/40" />
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formatDate(post.createdAt)}
              </span>
            </div>
          </div>
        </article>
      </Link>
    </div>
  );
}

/* ─── Newsletter Section ─── */
function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeError, setSubscribeError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubscribing(true);
    setSubscribeError(null);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubscribeError(
          data.error || "Something went wrong. Please try again.",
        );
        return;
      }
      setIsSubscribed(true);
    } catch {
      setSubscribeError("Network error. Please try again.");
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#F97316] via-[#EA580C] to-[#CC4A00]">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.2) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Radial accent glows */}
      <div className="absolute -top-1/3 -right-1/4 w-[70%] h-[140%] rounded-full bg-[#FB923C]/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-1/3 -left-1/4 w-[50%] h-[100%] rounded-full bg-[#F97316]/15 blur-3xl pointer-events-none" />

      <div className="relative z-10 px-6 md:px-10 lg:px-14 py-10 md:py-14 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        <div className="flex-1 text-center lg:text-left">
          <h3 className="font-[family-name:var(--font-plus-jakarta)] text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
            Stay ahead of the curve.
          </h3>
          <p className="mt-2 text-white/60 text-sm md:text-base font-[family-name:var(--font-inter)]">
            Weekly deep-dives on engineering, AI, and design delivered to your
            inbox. No spam, ever.
          </p>
        </div>

        <div className="w-full lg:w-auto lg:flex-1 max-w-md">
          <AnimatePresence mode="wait">
            {isSubscribed ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex items-center justify-center gap-3 bg-white/10 rounded-xl px-6 py-4"
              >
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20">
                  <Check className="h-4 w-4 text-white" />
                </span>
                <span className="font-[family-name:var(--font-inter)] text-white font-semibold">
                  You&apos;re subscribed!
                </span>
              </motion.div>
            ) : (
              <form
                key="form"
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3"
              >
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setSubscribeError(null);
                    }}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    disabled={isSubscribing}
                    placeholder="your@email.com"
                    className={cn(
                      "w-full rounded-xl bg-white/[0.08] border pl-11 pr-4 py-3.5 text-sm font-[family-name:var(--font-inter)] text-white placeholder:text-white/35 outline-none transition-all duration-300 disabled:opacity-50",
                      isFocused
                        ? "border-white/30 bg-white/[0.12] shadow-[0_0_20px_rgba(0,0,0,0.05)]"
                        : "border-white/15",
                    )}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubscribing}
                  className="shrink-0 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#18181B] font-[family-name:var(--font-inter)] transition-all duration-300 hover:bg-[#1a1a1a] hover:text-white hover:shadow-lg hover:shadow-black/20 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubscribing ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Subscribing…
                    </span>
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </form>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {subscribeError && !isSubscribed && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="mt-2 flex items-center gap-1.5 text-xs text-white/70 font-[family-name:var(--font-inter)]"
              >
                <AlertCircle className="size-3 shrink-0" />
                {subscribeError}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ─── Empty State ─── */
function EmptyState({ category }) {
  return (
    <div className="py-20 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F5F5F0] mb-6">
        <Search className="h-7 w-7 text-[#A1A1AA]" />
      </div>
      <h3 className="font-[family-name:var(--font-plus-jakarta)] text-xl font-bold text-[#18181B] mb-2">
        No posts found
      </h3>
      <p className="text-[#52525B] font-[family-name:var(--font-inter)] text-sm max-w-md mx-auto">
        {category !== "All Posts"
          ? `We don't have any ${category} articles yet. Check back soon or explore other categories.`
          : "There are no blog posts available at the moment. Check back soon for new content."}
      </p>
    </div>
  );
}

/* ─── Pagination ─── */
function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-black/[0.08] text-[#52525B] hover:border-[#F97316]/30 hover:text-[#F97316] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={cn(
            "inline-flex items-center justify-center w-10 h-10 rounded-lg text-sm font-medium font-[family-name:var(--font-inter)] transition-all duration-300",
            page === currentPage
              ? "bg-[#F97316] text-white shadow-lg shadow-[#F97316]/20"
              : "border border-black/[0.08] text-[#52525B] hover:border-[#F97316]/30 hover:text-[#F97316]",
          )}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-black/[0.08] text-[#52525B] hover:border-[#F97316]/30 hover:text-[#F97316] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}

/* ─── Main Client Component ─── */
export function BlogPageClient({ posts }) {
  const [activeCategory, setActiveCategory] = useState("All Posts");
  const [currentPage, setCurrentPage] = useState(1);
  const [hasInteracted, setHasInteracted] = useState(false);
  const POSTS_PER_PAGE = 9;

  const handleCategoryChange = useCallback((category) => {
    setActiveCategory(category);
    setCurrentPage(1);
    setHasInteracted(true);
  }, []);

  // Filter posts by category
  const filteredPosts = posts.filter((post) => {
    if (activeCategory === "All Posts") return true;
    return post.category === activeCategory;
  });

  // Separate featured post
  const featuredPost =
    activeCategory === "All Posts" && currentPage === 1
      ? posts.find((p) => p.featured)
      : null;

  // Non-featured posts for the grid
  const gridPosts = filteredPosts.filter((p) => p.id !== featuredPost?.id);

  // Pagination
  const totalPages = Math.ceil(gridPosts.length / POSTS_PER_PAGE);
  const paginatedGridPosts = gridPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setHasInteracted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
      <Navbar activePage="blog" />

      {/* ─── Hero Section ─── */}
      <section className="relative bg-[#18181B] overflow-hidden">
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Radial gradient glow */}
        <div className="absolute -top-1/2 -right-1/4 w-[60%] h-[150%] rounded-full bg-[#F97316]/[0.04] blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-1/2 -left-1/4 w-[40%] h-[120%] rounded-full bg-[#F97316]/[0.03] blur-[80px] pointer-events-none" />

        <div className="relative z-10 pt-28 md:pt-36 pb-20 md:pb-28">
          <div className="mx-auto max-w-[var(--container-max)] px-6 md:px-12 lg:px-20">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-2 text-sm font-[family-name:var(--font-inter)]">
                <li>
                  <Link
                    href="/"
                    className="text-[#A1A1AA] hover:text-[#F97316] transition-colors duration-300"
                  >
                    Home
                  </Link>
                </li>
                <li className="text-[#A1A1AA]/40">/</li>
                <li className="text-[#FAFAFA] font-medium">Blog</li>
              </ol>
            </nav>

            {/* Section Label */}
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#F97316] opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#F97316]" />
              </span>
              <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-[0.2em] text-[#F97316] font-semibold">
                Blog
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-[family-name:var(--font-plus-jakarta)] text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#FAFAFA] leading-[1.05] tracking-tight">
              Insights & <span className="text-gradient">Engineering</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-[#A1A1AA] text-lg md:text-xl font-[family-name:var(--font-inter)] max-w-2xl leading-relaxed">
              Deep dives into engineering, AI, cloud architecture, and design —
              written by the team building enterprise software at scale.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Category Filter Pills ─── */}
      <section className="py-8 md:py-10 bg-[#FAFAFA]">
        <div className="mx-auto max-w-[var(--container-max)] px-6 md:px-12 lg:px-20">
          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-medium font-[family-name:var(--font-inter)] transition-all duration-300",
                  activeCategory === cat
                    ? "bg-[#F97316] text-white shadow-lg shadow-[#F97316]/20"
                    : "border border-black/[0.08] text-[#A1A1AA] hover:border-[#F97316]/30 hover:text-[#F97316] hover:bg-[#F97316]/[0.04]",
                )}
              >
                {cat}
              </button>
            ))}
            <span className="ml-auto text-xs font-medium text-[#A1A1AA] font-[family-name:var(--font-inter)] hidden sm:inline-block">
              {filteredPosts.length} article
              {filteredPosts.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </section>

      {/* ─── Main Content ─── */}
      <main className="flex-1 pb-20 md:pb-28 bg-[#FAFAFA]">
        <div className="mx-auto max-w-[var(--container-max)] px-6 md:px-12 lg:px-20">
          {/* Featured Post */}
          {featuredPost && (
            <div className="mb-10 md:mb-14">
              <FeaturedPostCard post={featuredPost} />
            </div>
          )}

          {/* Blog Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeCategory}-${currentPage}`}
              initial={hasInteracted ? { opacity: 0, y: 8 } : false}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {paginatedGridPosts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                  {paginatedGridPosts.map((post, i) => (
                    <BlogPostCard key={post.id} post={post} index={i} />
                  ))}
                </div>
              ) : (
                <EmptyState category={activeCategory} />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </main>

      {/* ─── Newsletter CTA ─── */}
      <section className="py-20 md:py-28 bg-[#FAFAFA]">
        <div className="mx-auto max-w-[var(--container-max)] px-6 md:px-12 lg:px-20">
          <NewsletterCTA />
        </div>
      </section>

      {/* ─── Footer ─── */}
      <Footer />
    </div>
  );
}
