"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Quote, Star } from "lucide-react";
import { CASE_STUDIES, TESTIMONIALS } from "@/lib/constants";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { CountUp } from "@/components/ui/CountUp";
import { MagneticButton } from "@/components/ui/MagneticButton";
import {
  SingleDonutChart,
  MultiDonutChart,
} from "@/components/ui/AnimatedDonutChart";
import { cn } from "@/lib/utils";

const FILTER_CATEGORIES = [
  "All",
  "HealthTech",
  "FinTech",
  "EdTech",
  "Retail",
  "AI/ML",
  "Mobile",
];

// Map categories for filtering — some case studies use "Logistics" which isn't in filter
const categoryMap = {
  FinTech: "FinTech",
  HealthTech: "HealthTech",
  EdTech: "EdTech",
  Logistics: "All", // No direct filter, show in All
  Retail: "Retail",
  "AI/ML": "AI/ML",
};

const RESULTS_STATS = [
  { value: 50, prefix: "$", suffix: "M+", label: "Revenue Generated" },
  { value: 98, prefix: "", suffix: "%", label: "On-time Delivery" },
  { value: 4.9, prefix: "", suffix: "/5", label: "Clutch Rating" },
  { value: 180, prefix: "", suffix: "-day", label: "Avg Project Duration" },
];

/* ─── Featured Case Study Card ─── */
function FeaturedCard({ study }) {
  return (
    <Link
      href={`/case-studies/${study.slug}`}
      className="group relative overflow-hidden rounded-2xl card-hover-lift block"
    >
      <motion.div
        whileHover={{
          scale: 1.005,
          transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
        }}
      >
        <div className="flex flex-col lg:flex-row min-h-[400px] md:min-h-[480px] lg:min-h-[540px]">
          <div className="relative lg:w-[55%] min-h-[240px] lg:min-h-full">
            <Image
              src={study.image}
              alt={study.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
            <div className="absolute top-6 left-6 md:top-8 md:left-8 z-10">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F97316] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white font-[family-name:var(--font-inter)]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[#FAFAFA] opacity-50 animate-ping" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#FAFAFA]" />
                </span>
                FEATURED
              </span>
            </div>
            <div className="absolute inset-0 ring-1 ring-white/[0.06] group-hover:ring-[#F97316]/20 transition-all duration-500 rounded-l-2xl lg:rounded-l-2xl lg:rounded-r-none rounded-r-2xl lg:rounded-r-none" />
          </div>

          {/* Right: Details */}
          <div className="relative lg:w-[45%] bg-[#FAFAFA] p-6 md:p-8 lg:p-10 flex flex-col justify-between">
            <div className="absolute inset-0 ring-1 ring-white/[0.06] group-hover:ring-[#F97316]/20 transition-all duration-500 rounded-r-2xl lg:rounded-l-none rounded-l-2xl lg:rounded-l-none" />
            <div className="relative z-10">
              <span className="inline-flex items-center rounded-full bg-black/[0.06] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#18181B]/60 font-[family-name:var(--font-inter)] mb-4">
                {study.category}
              </span>
              <h3 className="font-[family-name:var(--font-plus-jakarta)] text-2xl md:text-3xl lg:text-4xl font-bold text-[#18181B] leading-tight">
                {study.title}
              </h3>
              <p className="mt-3 text-[#18181B]/50 text-sm md:text-base leading-relaxed font-[family-name:var(--font-inter)] max-w-md">
                {study.description}
              </p>

              {/* Result */}
              <div className="mt-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-black/[0.06] max-w-[60px]" />
                <span className="text-[#F97316] font-[family-name:var(--font-plus-jakarta)] text-lg md:text-xl font-bold">
                  {study.result}
                </span>
              </div>

              {/* Tech stack */}
              <div className="mt-4 flex flex-wrap gap-2">
                {study.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md bg-black/[0.06] px-2.5 py-1 text-[11px] font-medium text-[#18181B]/50 font-[family-name:var(--font-inter)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="relative z-10 mt-8">
              <span className="group/link inline-flex items-center gap-2 text-[#F97316] font-[family-name:var(--font-inter)] text-sm font-semibold">
                View Case Study
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

/* ─── Grid Case Study Card ─── */
function GridCard({ study, tall = false }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={`/case-studies/${study.slug}`}
      className={cn(
        "group relative overflow-hidden rounded-2xl block card-hover-lift",
        tall
          ? "min-h-[360px] md:min-h-[440px]"
          : "min-h-[280px] md:min-h-[340px]",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={study.image}
        alt={study.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 33vw"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
      <div className="absolute inset-0 rounded-2xl ring-1 ring-white/[0.06] group-hover:ring-[#F97316]/20 transition-all duration-500" />

      <div className="relative z-10 flex min-h-[inherit] flex-col justify-between p-6 md:p-7">
        <div>
          <span className="inline-flex items-center rounded-full bg-[#F97316]/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white font-[family-name:var(--font-inter)]">
            {study.category}
          </span>
        </div>
        <div>
          <h3
            className={cn(
              "font-[family-name:var(--font-plus-jakarta)] font-bold text-white leading-[1.05] transition-transform duration-500",
              tall ? "text-2xl md:text-3xl" : "text-xl md:text-2xl",
              isHovered && "translate-y-[-8px]",
            )}
          >
            {study.title}
          </h3>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: isHovered ? 0.6 : 0, y: isHovered ? 0 : 8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-2"
          >
            <span className="text-xs font-medium text-white/50 font-[family-name:var(--font-inter)]">
              {study.result}
            </span>
          </motion.div>
        </div>
      </div>

      {/* Hover overlay — always in DOM, animated via motion */}
      <motion.div
        initial={false}
        animate={{
          opacity: isHovered ? 1 : 0,
          y: isHovered ? "0%" : "100%",
        }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-7 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.3) 70%, transparent 100%)",
        }}
      >
        <p className="text-white/90 text-sm leading-relaxed max-w-md font-[family-name:var(--font-inter)] mb-4">
          {study.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-5">
          {study.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-white/10 px-2 py-0.5 text-[10px] font-medium text-white/70 font-[family-name:var(--font-inter)]"
            >
              {tech}
            </span>
          ))}
        </div>
        <span className="group/link inline-flex items-center gap-2 text-[#F97316] font-[family-name:var(--font-inter)] text-sm font-semibold">
          View →
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
        </span>
      </motion.div>
    </Link>
  );
}

/* ─── Star Rating ─── */
function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "h-3.5 w-3.5",
            i < rating
              ? "text-[#F97316] fill-[#F97316]"
              : "text-white/15 fill-[#FAFAFA]/15",
          )}
        />
      ))}
    </div>
  );
}

/* ─── Main Section ─── */
export function CaseStudiesFullSection() {
  const [activeFilter, setActiveFilter] = useState("All");

  const featured = CASE_STUDIES.find((s) => s.featured);
  const filteredStudies = CASE_STUDIES.filter((s) => {
    if (activeFilter === "All") return !s.featured;
    const mapped = categoryMap[s.category] || s.category;
    return mapped === activeFilter && !s.featured;
  });

  // Masonry-ish: cards at index 0 and 3 are tall
  const tallIndices = [0, 3];

  return (
    <section
      id="case-studies-full"
      className="relative bg-[#FAFAFA] mesh-gradient-2 overflow-hidden"
    >
      {/* ─── Hero ─── */}
      <div className="pt-28 md:pt-36 lg:pt-44 pb-12 md:pb-16">
        {/* Gradient accent line at top */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#F97316] via-[#FB923C] to-transparent" />
        <div className="mx-auto max-w-[var(--container-max)] px-6 md:px-12 lg:px-20">
          <ScrollReveal direction="up">
            <SectionLabel label="Selected Work" dark />
            <h1 className="mt-4 font-[family-name:var(--font-plus-jakarta)] text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-albos-text leading-[1.05]">
              500+ Projects.
              <br />
              Zero Compromises.
            </h1>
          </ScrollReveal>
        </div>
      </div>

      {/* ─── Filter Pills ─── */}
      <div className="pb-8 md:pb-12">
        <div className="mx-auto max-w-[var(--container-max)] px-6 md:px-12 lg:px-20">
          <ScrollReveal direction="up" delay={0.1}>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {FILTER_CATEGORIES.map((cat) => (
                <motion.button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={cn(
                    "rounded-full px-5 py-2 text-sm font-medium font-[family-name:var(--font-inter)] transition-all duration-300 hover:bg-[#F97316]/10 hover:text-[#F97316] hover:border-[#F97316]/30",
                    activeFilter === cat
                      ? "bg-[#F97316] text-white shadow-lg shadow-[#F97316]/20"
                      : "bg-black/[0.06] text-albos-muted hover:bg-black/[0.1]",
                  )}
                  whileTap={{ scale: 0.96 }}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* ─── Featured Case Study ─── */}
      {featured && activeFilter === "All" && (
        <div className="pb-8 md:pb-12">
          <div className="mx-auto max-w-[var(--container-max)] px-6 md:px-12 lg:px-20">
            <ScrollReveal direction="up" delay={0.15}>
              <FeaturedCard study={featured} />
            </ScrollReveal>
          </div>
        </div>
      )}

      {/* ─── Case Study Grid ─── */}
      <div className="pb-16 md:pb-20">
        <div className="mx-auto max-w-[var(--container-max)] px-6 md:px-12 lg:px-20">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredStudies.map((study, i) => (
                <motion.div
                  key={study.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className={cn(tallIndices.includes(i) ? "sm:row-span-2" : "")}
                >
                  <GridCard study={study} tall={tallIndices.includes(i)} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredStudies.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-20 text-center"
            >
              <p className="text-[#A1A1AA] font-[family-name:var(--font-inter)] text-lg">
                No case studies found for this category yet.
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* ─── Results by Numbers — Dark Strip ─── */}
      <div className="bg-[#FAFAFA] py-16 md:py-20">
        <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F97316]/40 to-transparent" />
        <div className="mx-auto max-w-[var(--container-max)] px-6 md:px-12 lg:px-20">
          <ScrollReveal direction="up" className="mb-10 md:mb-12">
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-2xl md:text-3xl font-bold text-[#18181B] text-center">
              Results by Numbers
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {RESULTS_STATS.map((stat, i) => (
              <ScrollReveal key={stat.label} direction="up" delay={i * 0.1}>
                <div className="relative rounded-xl bg-[#FFFFFF] border border-black/[0.06] p-6 md:p-8 text-center group hover:border-[#F97316]/20 transition-all duration-500">
                  {/* Accent dot */}
                  <div className="absolute top-4 right-4 h-1.5 w-1.5 rounded-full bg-[#F97316]/40 group-hover:bg-[#F97316] transition-colors duration-300" />
                  <div className="font-[family-name:var(--font-plus-jakarta)] text-3xl md:text-4xl lg:text-5xl font-bold text-[#18181B]">
                    {stat.prefix}
                    {stat.value % 1 !== 0 ? (
                      <CountUp value={stat.value * 10} duration={2} />
                    ) : (
                      <CountUp value={stat.value} duration={2} />
                    )}
                    {stat.suffix}
                  </div>
                  <p className="mt-2 text-[#A1A1AA] text-sm font-[family-name:var(--font-inter)]">
                    {stat.label}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Key Metrics — Donut Charts ─── */}
      <div className="bg-[#FAFAFA] py-16 md:py-20">
        <div className="mx-auto max-w-[var(--container-max)] px-6 md:px-12 lg:px-20">
          <ScrollReveal direction="up" className="mb-10 md:mb-14">
            <SectionLabel label="Performance Metrics" />
            <h2 className="mt-4 font-[family-name:var(--font-plus-jakarta)] text-2xl md:text-3xl lg:text-4xl font-bold text-[#18181B] text-center">
              Key Metrics
            </h2>
            <p className="mt-3 text-[#71717A] text-sm md:text-base font-[family-name:var(--font-inter)] text-center max-w-lg mx-auto">
              Our track record speaks for itself. Consistent results across
              every engagement.
            </p>
          </ScrollReveal>

          {/* 3 single donut charts in responsive grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {/* Client Satisfaction */}
            <div className="glass-card rounded-2xl p-6 border border-black/[0.06] flex flex-col items-center justify-center">
              <SingleDonutChart
                percentage={96}
                color="#F97316"
                colorEnd="#FB923C"
                label="Client Satisfaction"
                size={160}
                strokeWidth={12}
                delay={0}
              />
            </div>

            {/* On-Time Delivery */}
            <div className="glass-card rounded-2xl p-6 border border-black/[0.06] flex flex-col items-center justify-center">
              <SingleDonutChart
                percentage={89}
                color="#2DD4BF"
                colorEnd="#14B8A6"
                label="On-Time Delivery"
                size={160}
                strokeWidth={12}
                delay={0.15}
              />
            </div>

            {/* Budget Adherence */}
            <div className="glass-card rounded-2xl p-6 border border-black/[0.06] flex flex-col items-center justify-center">
              <SingleDonutChart
                percentage={92}
                color="#6366F1"
                colorEnd="#A855F7"
                label="Budget Adherence"
                size={160}
                strokeWidth={12}
                delay={0.3}
              />
            </div>

            {/* Extra stat card for 4-col balance */}
            <div className="glass-card rounded-2xl p-6 border border-black/[0.06] flex flex-col items-center justify-center">
              <SingleDonutChart
                percentage={98}
                color="#F97316"
                colorEnd="#FB923C"
                label="Client Retention"
                size={160}
                strokeWidth={12}
                delay={0.45}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ─── Results by Industry — Multi-Segment Donut Chart ─── */}
      <div className="bg-[#FAFAFA] pb-16 md:pb-20">
        {/* Gradient accent line at top */}
        <div className="h-[2px] bg-gradient-to-r from-transparent via-[#F97316]/30 to-transparent" />
        <div className="mx-auto max-w-[var(--container-max)] px-6 md:px-12 lg:px-20 pt-12 md:pt-16">
          <ScrollReveal direction="up" className="mb-10 md:mb-14">
            <SectionLabel label="Industry Breakdown" />
            <h2 className="mt-4 font-[family-name:var(--font-plus-jakarta)] text-2xl md:text-3xl lg:text-4xl font-bold text-[#18181B] text-center">
              Results by Industry
            </h2>
            <p className="mt-3 text-[#71717A] text-sm md:text-base font-[family-name:var(--font-inter)] text-center max-w-lg mx-auto">
              Proven expertise across diverse sectors with measurable outcomes.
            </p>
          </ScrollReveal>

          <div className="glass-card rounded-2xl p-8 md:p-10 border border-black/[0.06]">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
              <MultiDonutChart
                segments={[
                  { label: "Healthcare", percentage: 25, color: "#F97316" },
                  { label: "FinTech", percentage: 30, color: "#2DD4BF" },
                  { label: "E-commerce", percentage: 20, color: "#6366F1" },
                  { label: "SaaS", percentage: 15, color: "#A855F7" },
                  { label: "Other", percentage: 10, color: "#FB923C" },
                ]}
                centerText="500+"
                centerSubText="Projects"
                size={240}
                strokeWidth={22}
                delay={0.2}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ─── Testimonials Row ─── */}
      <div className="py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-[var(--container-max)] px-6 md:px-12 lg:px-20">
          <ScrollReveal direction="up" className="mb-10 md:mb-14">
            <SectionLabel label="Client Voices" dark />
            <h2 className="mt-4 font-[family-name:var(--font-plus-jakarta)] text-2xl md:text-3xl lg:text-4xl font-bold text-albos-text">
              What Our Partners Say
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {TESTIMONIALS.slice(0, 3).map((t, i) => (
              <ScrollReveal key={t.name} direction="up" delay={i * 0.1}>
                <div className="relative rounded-2xl bg-white border border-black/[0.06] p-6 md:p-8 hover:shadow-lg hover:shadow-black/[0.04] transition-all duration-500 group h-full flex flex-col">
                  {/* Quote mark */}
                  <Quote className="h-8 w-8 text-[#F97316]/20 fill-[#F97316]/10 mb-4" />

                  {/* Text */}
                  <p className="text-albos-text/80 text-sm md:text-base leading-relaxed font-[family-name:var(--font-inter)] flex-1">
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  {/* Rating */}
                  <div className="mt-5">
                    <StarRating rating={5} />
                  </div>

                  {/* Author */}
                  <div className="mt-4 pt-4 border-t border-black/[0.06]">
                    <span className="font-[family-name:var(--font-plus-jakarta)] text-sm font-bold text-albos-text">
                      {t.name}
                    </span>
                    <p className="text-xs text-[#A1A1AA] font-[family-name:var(--font-inter)] mt-0.5">
                      {t.title}, {t.company}
                    </p>
                  </div>

                  {/* Hover accent */}
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#F97316] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* ─── CTA ─── */}
      <div className="py-16 md:py-20 bg-[#FAFAFA]">
        <div className="mx-auto max-w-[var(--container-max)] px-6 md:px-12 lg:px-20 text-center">
          <ScrollReveal direction="up">
            <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl md:text-4xl lg:text-5xl font-bold text-[#18181B]">
              Have a Project in Mind?
            </h2>
            <p className="mt-4 text-[#A1A1AA] text-base md:text-lg font-[family-name:var(--font-inter)] max-w-lg mx-auto">
              Let&apos;s discuss how we can bring your vision to life.
            </p>
            <div className="mt-8">
              <MagneticButton strength={0.2}>
                <a
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-[#F97316] px-8 py-4 text-base font-semibold text-white font-[family-name:var(--font-inter)] transition-all duration-300 hover:bg-[#EA580C] hover:shadow-[0_0_40px_rgba(249,115,22,0.3)]"
                >
                  Get a Free Consultation
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
