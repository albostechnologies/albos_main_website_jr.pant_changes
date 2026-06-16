"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, ArrowRight } from "lucide-react";
import { useEffect } from "react";

export function CaseStudyModal({ isOpen, onClose, study }) {
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

  if (!study) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 md:p-8"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-black/[0.08] bg-[#FFFFFF] shadow-2xl shadow-black/50"
          >
            {/* Header accent line */}
            <div className="h-1 bg-gradient-to-r from-[#F97316] via-[#FB923C] to-[#F97316]" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-black/[0.06] text-[#A1A1AA] hover:text-[#18181B] hover:bg-black/[0.1] transition-all duration-200"
              aria-label="Close"
            >
              <X className="size-4" />
            </button>

            <div className="p-6 md:p-8">
              {/* Category badge */}
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F97316]/10 border border-[#F97316]/20 px-3 py-1 text-xs font-semibold text-[#F97316] font-[family-name:var(--font-inter)]">
                {study.category}
              </span>

              {/* Title */}
              <h3 className="mt-4 font-[family-name:var(--font-plus-jakarta)] text-2xl md:text-3xl font-bold text-[#18181B]">
                {study.title}
              </h3>

              {/* Metric highlight */}
              <div className="mt-6 rounded-xl bg-[#FAFAFA] border border-black/[0.06] p-5">
                <span className="font-[family-name:var(--font-inter)] text-xs uppercase tracking-wider text-[#A1A1AA]">
                  Key Result
                </span>
                <p className="mt-1 font-[family-name:var(--font-plus-jakarta)] text-3xl md:text-4xl font-extrabold text-gradient">
                  {study.metric}
                </p>
              </div>

              {/* Description */}
              {study.description && (
                <p className="mt-6 font-[family-name:var(--font-inter)] text-[#71717A] leading-relaxed">
                  {study.description}
                </p>
              )}

              {/* Details grid */}
              {(study.tech || study.duration || study.team) && (
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {study.duration && (
                    <div className="rounded-lg border border-black/[0.06] bg-black/[0.02] p-4">
                      <span className="font-[family-name:var(--font-inter)] text-[10px] uppercase tracking-wider text-[#A1A1AA]">
                        Duration
                      </span>
                      <p className="mt-1 font-[family-name:var(--font-plus-jakarta)] text-sm font-bold text-[#18181B]">
                        {study.duration}
                      </p>
                    </div>
                  )}
                  {study.team && (
                    <div className="rounded-lg border border-black/[0.06] bg-black/[0.02] p-4">
                      <span className="font-[family-name:var(--font-inter)] text-[10px] uppercase tracking-wider text-[#A1A1AA]">
                        Team Size
                      </span>
                      <p className="mt-1 font-[family-name:var(--font-plus-jakarta)] text-sm font-bold text-[#18181B]">
                        {study.team}
                      </p>
                    </div>
                  )}
                  {study.tech && study.tech.length > 0 && (
                    <div className="rounded-lg border border-black/[0.06] bg-black/[0.02] p-4 sm:col-span-3">
                      <span className="font-[family-name:var(--font-inter)] text-[10px] uppercase tracking-wider text-[#A1A1AA]">
                        Technology Stack
                      </span>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {study.tech.map((t) => (
                          <span
                            key={t}
                            className="inline-flex items-center gap-1 rounded-md bg-[#F97316]/10 border border-[#F97316]/20 px-2.5 py-1 text-[11px] font-medium text-[#F97316] font-[family-name:var(--font-jetbrains-mono)]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* CTA */}
              <div className="mt-8 flex items-center gap-4 pt-6 border-t border-black/[0.06]">
                <button className="group inline-flex items-center gap-2 rounded-lg bg-[#F97316] px-5 py-2.5 font-[family-name:var(--font-inter)] text-sm font-semibold text-white transition-all duration-300 hover:bg-[#EA580C] hover:shadow-lg hover:shadow-[#F97316]/20">
                  View Full Case Study
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>
                <button className="inline-flex items-center gap-1.5 font-[family-name:var(--font-inter)] text-sm text-[#A1A1AA] transition-colors duration-300 hover:text-[#18181B]">
                  <ExternalLink className="size-3.5" />
                  Live Project
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
