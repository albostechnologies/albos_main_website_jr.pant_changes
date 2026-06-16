"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  ArrowUpRight,
  Clock,
  User,
  Check,
  Mail,
  Loader2,
  AlertCircle,
  Bookmark,
  BookmarkCheck,
  Twitter,
  Linkedin,
  Github,
  Users,
  Star,
} from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/utils";

/* ─── Constants ─── */
const CATEGORIES = [
  "All",
  "Engineering",
  "AI/ML",
  "Design",
  "Cloud",
  "Business",
  "DevOps",
  "Security",
  "Case Studies",
];

const POPULAR_TAGS = [
  { label: "TypeScript", count: 12 },
  { label: "React", count: 9 },
  { label: "AI", count: 15 },
  { label: "Kubernetes", count: 7 },
  { label: "Cloud", count: 8 },
  { label: "Microservices", count: 6 },
  { label: "Design Systems", count: 4 },
  { label: "Mobile", count: 5 },
  { label: "DevOps", count: 10 },
  { label: "Python", count: 11 },
];

const TAG_CATEGORY_MAP = {
  TypeScript: ["Engineering"],
  React: ["Engineering"],
  AI: ["AI/ML"],
  Kubernetes: ["Cloud"],
  Cloud: ["Cloud"],
  Microservices: ["Engineering"],
  "Design Systems": ["Design"],
  Mobile: ["Business"],
  DevOps: ["DevOps"],
  Python: ["AI/ML", "Engineering"],
};

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

const featuredGradients = [
  "linear-gradient(135deg, #1a0800 0%, #2a1500 30%, #0d0d0d 60%, #1a0a00 100%)",
];

const gridGradients = [
  "linear-gradient(145deg, #0d0014 0%, #0d0d0d 50%, #10001a 100%)",
  "linear-gradient(160deg, #001a0d 0%, #0d0d0d 50%, #001a10 100%)",
  "linear-gradient(125deg, #0a0014 0%, #0d0d0d 50%, #14001a 100%)",
  "linear-gradient(170deg, #1a0f00 0%, #0d0d0d 50%, #1a1200 100%)",
  "linear-gradient(150deg, #001a1a 0%, #0d0d0d 50%, #001414 100%)",
];

/* ─── Author Data ─── */
const FEATURED_AUTHOR = {
  name: "Alex Volkov",
  role: "Principal Engineer",
  bio: "Leading distributed systems architecture at Albos. 15+ years building scalable platforms. Regular speaker at KubeCon and AWS re:Invent.",
  articleCount: 23,
  initials: "AV",
  socials: {
    twitter: "https://twitter.com/alexvolkov",
    linkedin: "https://linkedin.com/in/alexvolkov",
    github: "https://github.com/alexvolkov",
  },
};

/* ─── Reading List Hook ─── */
function useReadingList() {
  const [readingList, setReadingList] = useState(() => {
    if (typeof window === "undefined") return new Set();
    try {
      const stored = localStorage.getItem("albos-reading-list");
      if (stored) return new Set(JSON.parse(stored));
    } catch {
      // localStorage not available
    }
    return new Set();
  });

  const toggleBookmark = useCallback((postId) => {
    setReadingList((prev) => {
      const next = new Set(prev);
      if (next.has(postId)) {
        next.delete(postId);
      } else {
        next.add(postId);
      }
      try {
        localStorage.setItem("albos-reading-list", JSON.stringify([...next]));
      } catch {
        // localStorage not available
      }
      return next;
    });
  }, []);

  return { readingList, toggleBookmark };
}

/* ─── Stagger Variants ─── */
const gridContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const gridItemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const tagItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] },
  }),
};

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
        "inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.1em] font-[family-name:var(--font-inter)] border",
        colors.bg,
        colors.text,
        colors.border,
      )}
    >
      {category}
    </span>
  );
}

/* ─── Bookmark Button ─── */
function BookmarkButton({ postId, isBookmarked, onToggle }) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onToggle(postId);
      }}
      className={cn(
        "relative z-20 p-1.5 rounded-full transition-all duration-300",
        isBookmarked
          ? "text-[#F97316] bg-[#F97316]/10"
          : "text-[#A1A1AA] hover:text-[#F97316] hover:bg-[#F97316]/10",
      )}
      aria-label={
        isBookmarked ? "Remove from reading list" : "Add to reading list"
      }
    >
      {isBookmarked ? (
        <BookmarkCheck className="h-4 w-4 fill-[#F97316]" />
      ) : (
        <Bookmark className="h-4 w-4" />
      )}
    </button>
  );
}

/* ─── Featured Post Card ─── */
function FeaturedPostCard({ post, isBookmarked, onToggleBookmark }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      className="group relative overflow-hidden rounded-2xl cursor-pointer bg-[#FFFFFF] card-hover-lift"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="flex flex-col lg:flex-row min-h-[360px] md:min-h-[440px]">
          {/* Left: Cover image / Gradient placeholder */}
          <div className="relative lg:w-[58%] aspect-video lg:aspect-auto lg:min-h-full overflow-hidden">
            {post.coverImage ? (
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-700 ease-out"
                style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
                sizes="(max-width: 1024px) 100vw, 58vw"
                priority
              />
            ) : (
              <>
                <div
                  className="absolute inset-0 transition-transform duration-700 ease-out"
                  style={{
                    background: featuredGradients[0],
                    transform: isHovered ? "scale(1.05)" : "scale(1)",
                  }}
                />

                <div
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{
                    background:
                      "radial-gradient(ellipse 50% 50% at 70% 30%, rgba(249,115,22,0.12), transparent)",
                    opacity: isHovered ? 1.2 : 0.5,
                  }}
                />

                <div
                  className="absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                  }}
                />
              </>
            )}
            <span className="absolute top-4 right-4 bg-[#F97316] text-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full z-10 font-[family-name:var(--font-inter)]">
              Featured
            </span>
            <div className="absolute top-6 left-6 md:top-8 md:left-8 z-10">
              <CategoryBadge category={post.category} />
            </div>
            <div className="absolute inset-0 ring-1 ring-white/[0.06] group-hover:ring-[#F97316]/20 transition-all duration-500 rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none rounded-b-none lg:rounded-b-none" />
          </div>

          {/* Right: Content */}
          <div className="relative lg:w-[42%] p-6 md:p-8 lg:p-10 flex flex-col justify-between">
            <div className="absolute inset-0 ring-1 ring-white/[0.06] group-hover:ring-[#F97316]/20 transition-all duration-500 rounded-b-2xl lg:rounded-r-2xl lg:rounded-l-none rounded-t-none lg:rounded-t-none" />
            <div className="relative z-10">
              <h2
                className={cn(
                  "font-[family-name:var(--font-plus-jakarta)] text-2xl md:text-3xl lg:text-4xl font-bold text-[#18181B] leading-[1.1] transition-all duration-300",
                  isHovered &&
                    "underline underline-offset-4 decoration-[#F97316]/60",
                )}
              >
                {post.title}
              </h2>
              <p className="mt-4 text-[#18181B]/50 text-sm md:text-base leading-relaxed font-[family-name:var(--font-inter)] line-clamp-3">
                {post.excerpt}
              </p>
            </div>
            <div className="relative z-10 mt-6 flex items-center justify-between">
              <div className="flex items-center gap-4 text-xs text-[#A1A1AA] font-[family-name:var(--font-inter)]">
                <span className="flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5" />
                  {post.author}
                </span>
                <span>{formatDate(post.createdAt)}</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {post.readTime} min
                </span>
              </div>
              <div className="flex items-center gap-2">
                <BookmarkButton
                  postId={post.id}
                  isBookmarked={isBookmarked}
                  onToggle={onToggleBookmark}
                />
                <span className="inline-flex items-center gap-1.5 text-[#F97316] font-[family-name:var(--font-inter)] text-sm font-semibold transition-colors duration-300 group-hover:text-[#EA580C]">
                  Read
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

/* ─── Recent Post Card ─── */
function RecentPostCard({ post, index, isBookmarked, onToggleBookmark }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={gridItemVariants}
      className="group relative overflow-hidden rounded-2xl bg-[#FFFFFF] cursor-pointer card-hover-lift"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{
        y: -4,
        transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
      }}
    >
      <Link href={`/blog/${post.slug}`} className="block">
        {/* Cover image / Gradient placeholder */}
        <div className="relative aspect-[16/10] overflow-hidden">
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 ease-out"
              style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
            />
          ) : (
            <>
              <div
                className="absolute inset-0 transition-transform duration-700 ease-out"
                style={{
                  background: gridGradients[index % gridGradients.length],
                  transform: isHovered ? "scale(1.05)" : "scale(1)",
                }}
              />

              <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(ellipse 50% 50% at ${50 + index * 15}% ${30 + index * 10}%, rgba(249,115,22,0.08), transparent)`,
                  opacity: isHovered ? 1.5 : 0.5,
                }}
              />
            </>
          )}
          <div className="absolute top-4 left-4 z-10">
            <CategoryBadge category={post.category} />
          </div>
          <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5">
            <BookmarkButton
              postId={post.id}
              isBookmarked={isBookmarked}
              onToggle={onToggleBookmark}
            />
            <span className="inline-flex items-center gap-1 rounded-full bg-black/[0.06] backdrop-blur-sm px-2.5 py-1 text-[10px] font-medium text-[#18181B]/60 font-[family-name:var(--font-inter)]">
              <Clock className="h-3 w-3" />
              {post.readTime} min
            </span>
          </div>
          <div className="absolute inset-0 ring-1 ring-white/[0.06] group-hover:ring-[#F97316]/20 transition-all duration-500 rounded-t-2xl" />
        </div>

        {/* Content */}
        <div className="p-5 md:p-6">
          <h3 className="font-[family-name:var(--font-plus-jakarta)] text-lg md:text-xl font-bold text-[#18181B] leading-tight line-clamp-2 group-hover:text-[#F97316] transition-colors duration-300">
            {post.title}
          </h3>
          <p className="mt-2 text-[#18181B]/45 text-sm leading-relaxed font-[family-name:var(--font-inter)] line-clamp-2">
            {post.excerpt}
          </p>
          <div className="mt-4 flex items-center gap-3 text-[11px] text-[#A1A1AA] font-[family-name:var(--font-inter)]">
            <span className="flex items-center gap-1">
              <User className="h-3 w-3" />
              {post.author}
            </span>
            <span className="w-1 h-1 rounded-full bg-[#A1A1AA]/40" />
            <span>{formatDate(post.createdAt)}</span>
            <span className="w-1 h-1 rounded-full bg-[#A1A1AA]/40" />
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {post.readTime} min
            </span>
          </div>
        </div>

        <div className="absolute inset-0 ring-1 ring-white/[0.06] group-hover:ring-[#F97316]/20 transition-all duration-500 rounded-2xl pointer-events-none" />
      </Link>
    </motion.div>
  );
}

/* ─── Author Spotlight Card ─── */
function AuthorSpotlight() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden rounded-2xl border border-[#F97316]/20 bg-white p-6 md:p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Accent border top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#F97316] via-[#FB923C] to-[#F97316]" />

      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      <div className="relative z-10">
        <p className="text-[10px] uppercase tracking-[0.2em] text-[#F97316] font-[family-name:var(--font-inter)] font-bold mb-5">
          Author Spotlight
        </p>

        <div className="flex flex-col sm:flex-row gap-5 sm:gap-6">
          {/* Avatar */}
          <div className="shrink-0 flex flex-col items-center sm:items-start">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#F97316] to-[#FB923C] flex items-center justify-center text-white text-2xl font-bold font-[family-name:var(--font-plus-jakarta)] shadow-lg shadow-[#F97316]/20">
              {FEATURED_AUTHOR.initials}
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-[10px] text-[#A1A1AA] font-[family-name:var(--font-inter)]">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Active now
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-[family-name:var(--font-plus-jakarta)] text-xl font-bold text-albos-text">
              {FEATURED_AUTHOR.name}
            </h3>
            <p className="text-[13px] text-[#F97316] font-semibold font-[family-name:var(--font-inter)] mt-0.5">
              {FEATURED_AUTHOR.role}
            </p>
            <p className="mt-3 text-[13px] text-[#52525B] font-[family-name:var(--font-inter)] leading-relaxed">
              {FEATURED_AUTHOR.bio}
            </p>

            {/* Stats row */}
            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center gap-1.5 bg-black/[0.04] rounded-full px-3 py-1.5">
                <Star className="h-3 w-3 text-[#F97316] fill-[#F97316]" />
                <span className="text-[11px] font-semibold text-albos-text font-[family-name:var(--font-inter)]">
                  {FEATURED_AUTHOR.articleCount} articles
                </span>
              </div>
            </div>

            {/* Social links */}
            <div className="mt-4 flex items-center gap-3">
              <a
                href={FEATURED_AUTHOR.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-black/[0.04] flex items-center justify-center text-albos-muted hover:text-albos-text hover:bg-black/[0.08] transition-all duration-300"
              >
                <Twitter className="h-3.5 w-3.5" />
              </a>
              <a
                href={FEATURED_AUTHOR.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-black/[0.04] flex items-center justify-center text-albos-muted hover:text-albos-text hover:bg-black/[0.08] transition-all duration-300"
              >
                <Linkedin className="h-3.5 w-3.5" />
              </a>
              <a
                href={FEATURED_AUTHOR.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-black/[0.04] flex items-center justify-center text-albos-muted hover:text-albos-text hover:bg-black/[0.08] transition-all duration-300"
              >
                <Github className="h-3.5 w-3.5" />
              </a>
              <Link
                href="/blog"
                className="ml-auto text-[12px] font-semibold text-[#F97316] font-[family-name:var(--font-inter)] hover:text-[#EA580C] transition-colors duration-300 inline-flex items-center gap-1"
              >
                View All Articles
                <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Popular Tags Sidebar ─── */
function PopularTagsSidebar({ activeTag, onTagClick }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      className="rounded-2xl border border-black/[0.06] bg-white p-6 md:p-7"
      initial={{ opacity: 0, x: 20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <p className="text-[10px] uppercase tracking-[0.2em] text-[#A1A1AA] font-[family-name:var(--font-inter)] font-bold mb-5">
        Popular Tags
      </p>
      <div className="flex flex-col gap-1.5">
        {POPULAR_TAGS.map((tag, i) => (
          <motion.button
            key={tag.label}
            custom={i}
            variants={tagItemVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            onClick={() => onTagClick(tag.label)}
            className={cn(
              "group/tag flex items-center justify-between rounded-lg px-3 py-2 text-left transition-all duration-300 font-[family-name:var(--font-inter)]",
              activeTag === tag.label
                ? "bg-[#F97316] text-white"
                : "text-albos-muted hover:bg-black/[0.04] hover:text-albos-text",
            )}
          >
            <span
              className={cn(
                "text-sm font-medium transition-colors duration-300",
                activeTag === tag.label ? "text-white" : "",
              )}
            >
              {tag.label}
            </span>
            <span
              className={cn(
                "text-[10px] font-semibold rounded-full px-2 py-0.5 transition-all duration-300",
                activeTag === tag.label
                  ? "bg-[#FFFFFF]/20 text-white"
                  : "bg-black/[0.05] text-albos-muted group-hover/tag:bg-black/[0.08]",
              )}
            >
              {tag.count}
            </span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Reading List Badge ─── */
function ReadingListBadge({ count }) {
  if (count === 0) return null;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      className="fixed bottom-24 right-8 z-40 flex items-center gap-2 bg-[#FFFFFF] text-[#18181B] rounded-full px-4 py-2.5 shadow-xl shadow-black/30 border border-[#F97316]/20"
    >
      <BookmarkCheck className="h-4 w-4 text-[#F97316] fill-[#F97316]" />
      <span className="text-sm font-semibold font-[family-name:var(--font-inter)]">
        {count} saved
      </span>
    </motion.div>
  );
}

/* ─── Newsletter Section (Enhanced) ─── */
function NewsletterSignup() {
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
      {/* Dramatic background pattern */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.2) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Radial accent glow */}
      <div className="absolute -top-1/3 -right-1/4 w-[70%] h-[140%] rounded-full bg-[#FB923C]/20 blur-3xl" />
      <div className="absolute -bottom-1/3 -left-1/4 w-[50%] h-[100%] rounded-full bg-[#F97316]/15 blur-3xl" />

      <div className="relative z-10 px-6 md:px-10 lg:px-14 py-10 md:py-14 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        <div className="flex-1 text-center lg:text-left">
          {/* Social proof stats */}
          <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
            <div className="flex -space-x-2">
              {["A", "K", "M", "S"].map((initial, i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full bg-[#FFFFFF]/20 border-2 border-[#F97316] flex items-center justify-center text-[10px] font-bold text-white"
                >
                  {initial}
                </div>
              ))}
            </div>
            <span className="text-[11px] text-white/70 font-[family-name:var(--font-inter)]">
              Join 2,500+ subscribers
            </span>
          </div>

          <h3 className="font-[family-name:var(--font-plus-jakarta)] text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
            Subscribe to our insights.
          </h3>
          <p className="mt-2 text-white/60 text-sm md:text-base font-[family-name:var(--font-inter)]">
            Weekly deep-dives on engineering, AI, and design delivered to your
            inbox. No spam, ever.
          </p>

          {/* Social proof badges */}
          <div className="mt-4 flex items-center justify-center lg:justify-start gap-3">
            <span className="inline-flex items-center gap-1 rounded-full bg-[#FFFFFF]/10 px-2.5 py-1 text-[10px] font-semibold text-white/70 font-[family-name:var(--font-inter)]">
              <Check className="h-3 w-3" />
              Free forever
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-[#FFFFFF]/10 px-2.5 py-1 text-[10px] font-semibold text-white/70 font-[family-name:var(--font-inter)]">
              <Users className="h-3 w-3" />
              Community access
            </span>
          </div>
        </div>

        <div className="w-full lg:w-auto lg:flex-1 max-w-md">
          <AnimatePresence mode="wait">
            {isSubscribed ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex items-center justify-center gap-3 bg-[#FFFFFF]/10 rounded-xl px-6 py-4"
              >
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#FFFFFF]/20">
                  <Check className="h-4 w-4 text-white" />
                </span>
                <span className="font-[family-name:var(--font-inter)] text-white font-semibold">
                  You&apos;re subscribed!
                </span>
              </motion.div>
            ) : (
              <div key="form-wrapper">
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
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
                        "w-full rounded-xl bg-[#FFFFFF]/[0.08] border pl-11 pr-4 py-3.5 text-sm font-[family-name:var(--font-inter)] text-white placeholder:text-white/35 outline-none transition-all duration-300 disabled:opacity-50",
                        isFocused
                          ? "border-[#FAFAFA]/30 bg-[#FFFFFF]/[0.12] shadow-[0_0_20px_rgba(0,0,0,0.05)]"
                          : "border-[#FAFAFA]/15",
                      )}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubscribing}
                    className="shrink-0 rounded-xl bg-[#FFFFFF] px-6 py-3.5 text-sm font-semibold text-[#18181B] font-[family-name:var(--font-inter)] transition-all duration-300 hover:bg-[#1a1a1a] hover:shadow-lg hover:shadow-black/20 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed"
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
                </motion.form>
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
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ─── Loading Skeleton for Blog ─── */
function BlogLoadingSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-[300px] rounded-2xl bg-black/[0.04]" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-2xl bg-black/[0.04]">
            <div className="aspect-[16/10] bg-black/[0.03] rounded-t-2xl" />
            <div className="p-5 space-y-3">
              <div className="h-4 bg-black/[0.04] rounded w-3/4" />
              <div className="h-3 bg-black/[0.04] rounded w-full" />
              <div className="h-3 bg-black/[0.04] rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Main Section ─── */
export function BlogSection() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeTag, setActiveTag] = useState(null);
  const { readingList, toggleBookmark } = useReadingList();

  // Fetch blog posts from API
  useEffect(() => {
    async function fetchPosts() {
      try {
        setIsLoading(true);
        const res = await fetch("/api/blog?limit=12");
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data = await res.json();
        setPosts(data.posts || []);
      } catch (err) {
        console.error("Error fetching blog posts:", err);
        setError("Failed to load blog posts. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const handleTagClick = (tag) => {
    setActiveTag(activeTag === tag ? null : tag);
    setActiveCategory("All");
  };

  // Filter posts by category and tag
  const filteredPosts = posts.filter((post) => {
    if (activeCategory !== "All" && post.category !== activeCategory)
      return false;
    if (activeTag) {
      const mappedCategories = TAG_CATEGORY_MAP[activeTag] || [];
      if (
        mappedCategories.length > 0 &&
        !mappedCategories.includes(post.category)
      )
        return false;
    }
    return true;
  });

  // Separate featured post
  const featuredPost =
    activeCategory === "All" && !activeTag
      ? posts.find((p) => p.featured)
      : null;

  // Non-featured posts for the grid
  const gridPosts = filteredPosts.filter((p) => p.id !== featuredPost?.id);

  return (
    <section id="blog" className="relative bg-[#FAFAFA] overflow-hidden">
      {/* ─── Hero ─── */}
      <div className="pt-28 md:pt-36 lg:pt-44 pb-8 md:pb-12">
        <div className="mx-auto max-w-[var(--container-max)] px-6 md:px-12 lg:px-20">
          <ScrollReveal direction="up">
            <SectionLabel label="Insights & Expertise" dark />
            <h1 className="mt-4 font-[family-name:var(--font-plus-jakarta)] text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-albos-text leading-[1.05] tracking-tight">
              The Albos Tech Blog
            </h1>
          </ScrollReveal>
        </div>
      </div>

      {/* ─── Category Filter Pills ─── */}
      <div className="pb-8 md:pb-12">
        <div className="mx-auto max-w-[var(--container-max)] px-6 md:px-12 lg:px-20">
          <ScrollReveal direction="up" delay={0.1}>
            <div className="flex flex-wrap items-center gap-2 md:gap-3">
              {CATEGORIES.map((cat) => (
                <motion.button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setActiveTag(null);
                  }}
                  className={cn(
                    "rounded-full px-5 py-2 text-sm font-medium font-[family-name:var(--font-inter)] transition-all duration-300",
                    activeCategory === cat
                      ? "bg-[#F97316] text-white shadow-lg shadow-[#F97316]/20"
                      : "border border-black/[0.08] text-albos-muted hover:border-[#F97316]/30 hover:text-[#F97316] hover:bg-[#F97316]/[0.04]",
                  )}
                  whileTap={{ scale: 0.96 }}
                >
                  {cat}
                </motion.button>
              ))}
              <span className="ml-auto text-xs font-medium text-[#A1A1AA] font-[family-name:var(--font-inter)]">
                Showing {filteredPosts.length} article
                {filteredPosts.length !== 1 ? "s" : ""}
              </span>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* ─── Main Content ─── */}
      {isLoading ? (
        <div className="pb-12 md:pb-16">
          <div className="mx-auto max-w-[var(--container-max)] px-6 md:px-12 lg:px-20">
            <BlogLoadingSkeleton />
          </div>
        </div>
      ) : error ? (
        <div className="pb-12 md:pb-16">
          <div className="mx-auto max-w-[var(--container-max)] px-6 md:px-12 lg:px-20 text-center py-20">
            <p className="text-[#A1A1AA] font-[family-name:var(--font-inter)] text-lg">
              {error}
            </p>
            <Link
              href="/blog"
              className="mt-4 inline-flex items-center gap-2 text-[#F97316] font-[family-name:var(--font-inter)] font-semibold hover:text-[#EA580C] transition-colors duration-300"
            >
              Go to Blog Page
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* ─── Featured Post ─── */}
          {featuredPost && (
            <div className="pb-8 md:pb-12">
              <div className="mx-auto max-w-[var(--container-max)] px-6 md:px-12 lg:px-20">
                <ScrollReveal direction="up" delay={0.15}>
                  <FeaturedPostCard
                    post={featuredPost}
                    isBookmarked={readingList.has(featuredPost.id)}
                    onToggleBookmark={toggleBookmark}
                  />
                </ScrollReveal>
              </div>
            </div>
          )}

          {/* ─── Blog Grid + Sidebar Layout ─── */}
          <div className="pb-12 md:pb-16">
            <div className="mx-auto max-w-[var(--container-max)] px-6 md:px-12 lg:px-20">
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
                {/* Main content: posts grid */}
                <div className="flex-1 min-w-0">
                  <motion.div
                    variants={gridContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6"
                  >
                    <AnimatePresence mode="popLayout">
                      {gridPosts.map((post, i) => (
                        <motion.div
                          key={post.id}
                          layout
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{
                            duration: 0.4,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        >
                          <RecentPostCard
                            post={post}
                            index={i}
                            isBookmarked={readingList.has(post.id)}
                            onToggleBookmark={toggleBookmark}
                          />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>

                  {gridPosts.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="py-20 text-center"
                    >
                      <p className="text-[#A1A1AA] font-[family-name:var(--font-inter)] text-lg">
                        No posts found for this category.
                      </p>
                      <Link
                        href="/blog"
                        className="mt-4 inline-flex items-center gap-2 text-[#F97316] font-[family-name:var(--font-inter)] font-semibold hover:text-[#EA580C] transition-colors duration-300"
                      >
                        View All Posts
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </motion.div>
                  )}

                  {/* View All Blog link */}
                  {gridPosts.length > 0 && (
                    <div className="mt-10 text-center">
                      <Link
                        href="/blog"
                        className="group inline-flex items-center gap-2 rounded-full bg-[#18181B] px-7 py-3 text-sm font-semibold text-white font-[family-name:var(--font-inter)] transition-all duration-300 hover:bg-[#F97316] hover:shadow-[0_0_30px_rgba(249,115,22,0.3)]"
                      >
                        View All Articles
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </div>
                  )}
                </div>

                {/* Sidebar */}
                <div className="w-full lg:w-[280px] xl:w-[300px] shrink-0 space-y-6">
                  <PopularTagsSidebar
                    activeTag={activeTag}
                    onTagClick={handleTagClick}
                  />
                  <AuthorSpotlight />
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ─── Newsletter Signup (Enhanced) ─── */}
      <div className="pb-12 md:pb-16">
        <div className="mx-auto max-w-[var(--container-max)] px-6 md:px-12 lg:px-20">
          <ScrollReveal direction="up">
            <NewsletterSignup />
          </ScrollReveal>
        </div>
      </div>

      {/* ─── Reading List Badge ─── */}
      <AnimatePresence>
        <ReadingListBadge count={readingList.size} />
      </AnimatePresence>
    </section>
  );
}
