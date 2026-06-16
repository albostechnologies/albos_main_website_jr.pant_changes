"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Clock,
  User,
  ArrowLeft,
  Linkedin,
  Link as LinkIcon,
  Check,
} from "lucide-react";
import { useEffect, useState } from "react";

/* ─── Category gradient map ─── */
const categoryGradients = {
  Engineering:
    "linear-gradient(135deg, #1a0800 0%, #2a1500 40%, #0d0d0d 70%, #1a0a00 100%)",
  "AI/ML":
    "linear-gradient(135deg, #0d0014 0%, #1a0033 40%, #0d0d0d 70%, #0a0014 100%)",
  Design:
    "linear-gradient(135deg, #001a0d 0%, #00331a 40%, #0d0d0d 70%, #001a10 100%)",
  Business:
    "linear-gradient(135deg, #1a0f00 0%, #332000 40%, #0d0d0d 70%, #1a1200 100%)",
  "Case Studies":
    "linear-gradient(135deg, #0a0014 0%, #1a002e 40%, #0d0d0d 70%, #14001a 100%)",
};

/* ─── Lorem ipsum paragraphs for article body ─── */
const articleBodies = {
  Engineering: [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
  ],
  "AI/ML": [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ac massa at ligula laoreet iaculis. Nulla neque dolor, sagittis eget, iaculis quis, molestie non, leo. Maecenas lacinia. Nam ipsum ligula, eleifend at, accumsan nec, suscipit a, ipsum.",
    "Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat. Praesent dapibus, neque id cursus faucibus, tortor neque egestas auguae, eu vulputate magna eros eu erat.",
    "Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus. Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus.",
  ],
  Design: [
    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
    "Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.",
    "Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.",
  ],
  Business: [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris.",
    "Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.",
    "Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor.",
  ],
  "Case Studies": [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus laoreet. Nullam tincidunt adipiscing enim. Phasellus porta. Fusce suscipit varius mi. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
    "Etiam vel tortor sodales, ultrices augue vel, blandit ipsum. In hac habitasse platea dictumst. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede.",
    "Mauris et orci. Aenean nec eros. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse sollicitudin velit sed leo. Ut pharetra augue nec augue. Nam elit agna, endrerit sit amet.",
  ],
};

/* ─── Tags per category ─── */
const categoryTags = {
  Engineering: [
    "Kubernetes",
    "Microservices",
    "Docker",
    "DevOps",
    "Cloud Native",
  ],
  "AI/ML": ["LLMs", "Generative AI", "Machine Learning", "NLP", "Python"],
  Design: [
    "Design Systems",
    "Figma",
    "Component Library",
    "Accessibility",
    "UX",
  ],
  Business: [
    "Cloud Migration",
    "Digital Transformation",
    "CTO",
    "Strategy",
    "ROI",
  ],
  "Case Studies": [
    "HIPAA",
    "Healthcare",
    "Compliance",
    "Telehealth",
    "Security",
  ],
};

export function BlogArticleModal({ isOpen, onClose, article }) {
  const [copied, setCopied] = useState(false);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!article) return null;

  const gradient =
    categoryGradients[article.category] || categoryGradients.Engineering;
  const bodyParagraphs =
    articleBodies[article.category] || articleBodies.Engineering;
  const tags = categoryTags[article.category] || categoryTags.Engineering;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback - do nothing
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#FAFAFA]/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-3xl my-8 md:my-12 rounded-2xl border border-black/[0.08] bg-[#FAFAFA] shadow-2xl shadow-black/50"
          >
            {/* Hero Image Area */}
            <div className="relative h-56 md:h-72 overflow-hidden rounded-t-2xl">
              <div
                className="absolute inset-0"
                style={{ background: gradient }}
              />

              {/* Grid pattern overlay */}
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)",
                  backgroundSize: "50px 50px",
                }}
              />

              {/* Accent glow */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 50% 60% at 60% 40%, rgba(249, 115, 22, 0.15), transparent)",
                }}
              />

              {/* Header accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F97316] via-[#FB923C] to-[#F97316]" />

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-[#FAFAFA]/60 backdrop-blur-sm border border-black/[0.08] text-[#71717A] hover:text-[#18181B] hover:bg-[#FAFAFA]/80 transition-all duration-200"
                aria-label="Close"
              >
                <X className="size-4" />
              </button>

              {/* Category badge on hero */}
              <div className="absolute bottom-6 left-6 md:left-8">
                <span className="inline-flex items-center rounded-full bg-[#F97316]/10 border border-[#F97316]/20 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-[#F97316] font-[family-name:var(--font-inter)] backdrop-blur-sm">
                  {article.category}
                </span>
              </div>
            </div>

            {/* Article Content */}
            <div className="px-6 md:px-8 lg:px-10 py-8 md:py-10">
              {/* Title */}
              <h1 className="font-[family-name:var(--font-plus-jakarta)] text-2xl md:text-3xl lg:text-4xl font-bold text-[#18181B] leading-[1.15]">
                {article.title}
              </h1>

              {/* Author / Date / Read Time */}
              <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-[#A1A1AA] font-[family-name:var(--font-inter)]">
                <span className="flex items-center gap-1.5">
                  <User className="h-4 w-4" />
                  {article.author}
                </span>
                <span className="w-1 h-1 rounded-full bg-[#A1A1AA]/40" />
                <span>{article.date}</span>
                <span className="w-1 h-1 rounded-full bg-[#A1A1AA]/40" />
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {article.readTime}
                </span>
              </div>

              {/* Divider */}
              <div className="mt-6 h-px bg-gradient-to-r from-[#F97316]/30 via-black/[0.06] to-transparent" />

              {/* Article Body */}
              <div className="mt-8 space-y-5">
                {bodyParagraphs.map((paragraph, i) => (
                  <p
                    key={i}
                    className="font-[family-name:var(--font-inter)] text-[#71717A] text-base leading-[1.8]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Divider */}
              <div className="mt-8 h-px bg-black/[0.06]" />

              {/* Tags */}
              <div className="mt-6">
                <span className="text-xs uppercase tracking-[0.15em] text-[#A1A1AA] font-[family-name:var(--font-inter)] font-semibold">
                  Tags
                </span>
                <div className="mt-3 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full bg-black/[0.04] border border-black/[0.08] px-3 py-1.5 text-xs font-medium text-[#71717A] font-[family-name:var(--font-inter)] transition-colors duration-200 hover:border-[#F97316]/30 hover:text-[#F97316] cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Share Buttons */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="text-xs uppercase tracking-[0.15em] text-[#A1A1AA] font-[family-name:var(--font-inter)] font-semibold mr-1">
                  Share
                </span>
                <button
                  onClick={() => {
                    window.open(
                      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
                      "_blank",
                      "noopener,noreferrer",
                    );
                  }}
                  className="flex items-center gap-2 rounded-lg border border-black/[0.08] bg-black/[0.03] px-3.5 py-2 text-xs font-medium text-[#71717A] font-[family-name:var(--font-inter)] transition-all duration-200 hover:border-[#F97316]/30 hover:text-[#F97316] hover:bg-[#F97316]/5"
                >
                  <Linkedin className="h-3.5 w-3.5" />
                  LinkedIn
                </button>
                <button
                  onClick={() => {
                    window.open(
                      `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(article.title)}`,
                      "_blank",
                      "noopener,noreferrer",
                    );
                  }}
                  className="flex items-center gap-2 rounded-lg border border-black/[0.08] bg-black/[0.03] px-3.5 py-2 text-xs font-medium text-[#71717A] font-[family-name:var(--font-inter)] transition-all duration-200 hover:border-[#F97316]/30 hover:text-[#F97316] hover:bg-[#F97316]/5"
                >
                  <svg
                    className="h-3.5 w-3.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  Twitter
                </button>
                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-2 rounded-lg border border-black/[0.08] bg-black/[0.03] px-3.5 py-2 text-xs font-medium text-[#71717A] font-[family-name:var(--font-inter)] transition-all duration-200 hover:border-[#F97316]/30 hover:text-[#F97316] hover:bg-[#F97316]/5"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-green-400" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <LinkIcon className="h-3.5 w-3.5" />
                      Copy Link
                    </>
                  )}
                </button>
              </div>

              {/* Back to Blog */}
              <div className="mt-8 pt-6 border-t border-black/[0.06]">
                <button
                  onClick={onClose}
                  className="group inline-flex items-center gap-2 font-[family-name:var(--font-inter)] text-sm font-semibold text-[#F97316] transition-colors duration-200 hover:text-[#EA580C]"
                >
                  <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                  Back to Blog
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
