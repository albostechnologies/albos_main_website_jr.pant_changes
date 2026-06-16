"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { CASE_STUDIES } from "@/lib/constants";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { HoverCard } from "@/components/ui/HoverCard";
import { cn } from "@/lib/utils";

function CaseStudyCard({ study, featured = false }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={`/case-studies/${study.slug}`}
      className={cn(
        "group relative overflow-hidden rounded-2xl block magnetic-hover",
        featured
          ? "min-h-[400px] md:min-h-[520px] lg:min-h-[600px]"
          : "min-h-[280px] md:min-h-[320px] lg:min-h-[360px]",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={study.image}
        alt={study.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes={
          featured
            ? "(max-width: 768px) 100vw, 66vw"
            : "(max-width: 768px) 100vw, 33vw"
        }
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10" />
      <div className="absolute inset-0 rounded-2xl ring-1 ring-white/[0.06] group-hover:ring-albos-accent/20 transition-all duration-500" />

      <div className="relative z-10 flex min-h-[inherit] flex-col justify-between p-6 md:p-8">
        <div>
          <span className="inline-flex items-center rounded-full bg-albos-accent/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-albos-dark font-[family-name:var(--font-inter)]">
            {study.category}
          </span>
        </div>
        <div>
          <h3
            className={cn(
              "font-[family-name:var(--font-plus-jakarta)] font-bold text-white leading-[1.05] transition-transform duration-500",
              featured
                ? "text-3xl md:text-4xl lg:text-5xl"
                : "text-2xl md:text-3xl",
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

      <motion.div
        initial={false}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? "0%" : "100%" }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-8 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.3) 70%, transparent 100%)",
        }}
      >
        <p className="text-white/90 text-sm md:text-base leading-relaxed max-w-md font-[family-name:var(--font-inter)] mb-4">
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
        <span className="inline-flex items-center gap-2 text-albos-accent font-[family-name:var(--font-inter)] text-sm font-semibold">
          View Case Study
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </motion.div>
    </Link>
  );
}

export function CaseStudiesSection() {
  const featured = CASE_STUDIES.find((s) => s.featured);
  const others = CASE_STUDIES.filter((s) => !s.featured);

  return (
    <section
      id="case-studies"
      className="relative bg-albos-dark py-20 md:py-28 lg:py-36 overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-white/[0.06]" />

      <div className="mx-auto max-w-[var(--container-max)] px-6 md:px-12 lg:px-20">
        <ScrollReveal direction="up" className="mb-12 lg:mb-16">
          <SectionLabel label="Selected Work" />
          <h2 className="mt-4 font-[family-name:var(--font-plus-jakarta)] text-3xl md:text-4xl lg:text-5xl font-bold text-albos-light leading-tight">
            Projects That Define Us
          </h2>
          <p className="mt-4 text-albos-light/70 text-base md:text-lg max-w-xl font-[family-name:var(--font-inter)]">
            Real results from real partnerships. Explore how we&apos;ve helped
            businesses across industries scale and succeed.
          </p>
        </ScrollReveal>

        {featured && (
          <ScrollReveal direction="up" delay={0.1} className="mb-6 lg:mb-8">
            <HoverCard>
              <CaseStudyCard study={featured} featured />
            </HoverCard>
          </ScrollReveal>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {others.map((study, i) => (
            <ScrollReveal key={study.id} direction="up" delay={0.08 * (i + 1)}>
              <HoverCard>
                <CaseStudyCard study={study} />
              </HoverCard>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal
          direction="up"
          delay={0.3}
          className="mt-12 lg:mt-16 text-center"
        >
          <Link
            href="/case-studies"
            className="group inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.03] px-6 py-3 text-sm font-semibold text-albos-light font-[family-name:var(--font-inter)] transition-all duration-300 hover:border-albos-accent/40 hover:text-albos-accent hover:bg-albos-accent/[0.06]"
          >
            View All Projects
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
