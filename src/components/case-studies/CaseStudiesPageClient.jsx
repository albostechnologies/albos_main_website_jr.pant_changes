"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/utils";

const FILTER_CATEGORIES = [
  "All",
  "HealthTech",
  "FinTech",
  "EdTech",
  "Retail",
  "AI/ML",
  "Logistics",
];

const categoryMap = {
  FinTech: "FinTech",
  HealthTech: "HealthTech",
  EdTech: "EdTech",
  Logistics: "Logistics",
  Retail: "Retail",
  "AI/ML": "AI/ML",
};

function StudyCard({ study, large = false }) {
  return (
    <Link
      href={`/case-studies/${study.slug}`}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-black/[0.06] bg-white card-hover-lift block",
        large ? "md:col-span-2" : "",
      )}
    >
      <div
        className={cn(
          "relative w-full",
          large ? "aspect-[21/9]" : "aspect-[16/10]",
        )}
      >
        <Image
          src={study.image}
          alt={study.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes={
            large
              ? "(max-width: 768px) 100vw, 66vw"
              : "(max-width: 768px) 100vw, 33vw"
          }
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        {study.featured && (
          <span className="absolute top-4 left-4 z-10 inline-flex rounded-full bg-[#F97316] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
            Featured
          </span>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 z-10">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#F97316]">
            {study.category}
          </span>
          <h2
            className={cn(
              "mt-1 font-[family-name:var(--font-plus-jakarta)] font-bold text-white leading-tight",
              large ? "text-2xl md:text-3xl" : "text-xl md:text-2xl",
            )}
          >
            {study.title}
          </h2>
          <p className="mt-2 text-sm text-white/70 line-clamp-2 font-[family-name:var(--font-inter)]">
            {study.description}
          </p>
          <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#F97316] font-[family-name:var(--font-inter)]">
            View case study
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function CaseStudiesPageClient({ studies }) {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = studies.filter((s) => {
    if (activeFilter === "All") return true;
    const mapped = categoryMap[s.category] || s.category;
    return mapped === activeFilter;
  });

  const featured = filtered.find((s) => s.featured);
  const rest = filtered.filter((s) => s.slug !== featured?.slug);

  return (
    <>
      <Navbar activePage="case-studies" />

      <section className="relative bg-[#FAFAFA] pt-28 md:pt-36 pb-16 md:pb-20">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#F97316] via-[#FB923C] to-transparent" />
        <div className="mx-auto max-w-[var(--container-max)] px-6 md:px-12 lg:px-20">
          <ScrollReveal direction="up">
            <SectionLabel label="Selected Work" />
            <h1 className="mt-4 font-[family-name:var(--font-plus-jakarta)] text-4xl md:text-5xl lg:text-6xl font-bold text-[#18181B] leading-[1.05]">
              Case Studies
            </h1>
            <p className="mt-4 text-[#71717A] text-lg max-w-2xl font-[family-name:var(--font-inter)]">
              Real results from real partnerships — explore how Albos
              Technologies Pvt Ltd delivers measurable outcomes.
            </p>
          </ScrollReveal>

          <div className="mt-10 flex flex-wrap gap-2">
            {FILTER_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveFilter(cat)}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-medium font-[family-name:var(--font-inter)] transition-all",
                  activeFilter === cat
                    ? "bg-[#F97316] text-white shadow-lg shadow-[#F97316]/20"
                    : "bg-black/[0.06] text-[#71717A] hover:text-[#F97316]",
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="mt-12 space-y-6">
            {featured && <StudyCard study={featured} large />}
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {rest.map((study) => (
                  <motion.div
                    key={study.slug}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                  >
                    <StudyCard study={study} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {filtered.length === 0 && (
              <p className="py-16 text-center text-[#A1A1AA] font-[family-name:var(--font-inter)]">
                No case studies in this category yet.
              </p>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
