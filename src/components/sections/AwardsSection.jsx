"use client";

import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Award,
  ChevronLeft,
  ChevronRight,
  Shield,
  Trophy,
  Star,
  Medal,
} from "lucide-react";
import { AWARDS } from "@/lib/constants";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const awardIcons = [Trophy, Star, Shield, Award, Medal, Trophy, Star, Shield];

export function AwardsSection() {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 4);
  }, []);

  const scroll = useCallback(
    (direction) => {
      if (!scrollRef.current) return;
      const scrollAmount = 340;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScroll, 400);
    },
    [checkScroll],
  );

  return (
    <section className="relative py-20 md:py-28 lg:py-36 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAFAFA] via-[#FAFAFA] to-[#EBE9E4]" />
      {/* Subtle top/bottom accent lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-black/[0.06]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-black/[0.06]" />

      <div className="relative z-10 mx-auto max-w-[var(--container-max)] px-6 md:px-12 lg:px-20">
        {/* Header */}
        <ScrollReveal direction="up" className="mb-12 lg:mb-16">
          <SectionLabel label="Awards & Certificates" dark />
          <h2 className="mt-4 font-[family-name:var(--font-plus-jakarta)] text-3xl md:text-4xl lg:text-5xl font-bold text-[#18181B] leading-tight">
            Recognized for Excellence
          </h2>
          <p className="mt-4 text-[#A1A1AA] text-base md:text-lg max-w-xl font-[family-name:var(--font-inter)]">
            Industry accolades and certifications that validate our commitment
            to delivering world-class solutions.
          </p>
        </ScrollReveal>

        {/* Carousel container with arrows */}
        <div className="relative">
          {/* Desktop scroll arrows */}
          <div className="hidden md:flex absolute -left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-10 items-center gap-2">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label="Scroll awards left"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg border border-black/[0.06] text-[#18181B] transition-all duration-300 hover:bg-[#18181B] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-[#18181B]"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          </div>
          <div className="hidden md:flex absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-10 items-center gap-2">
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label="Scroll awards right"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg border border-black/[0.06] text-[#18181B] transition-all duration-300 hover:bg-[#18181B] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-[#18181B]"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Scrollable carousel */}
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-2 px-2"
          >
            {AWARDS.map((award, i) => {
              const Icon = awardIcons[i % awardIcons.length];
              return (
                <ScrollReveal
                  key={award.name + award.year}
                  direction="up"
                  delay={i * 0.06}
                >
                  <motion.div
                    className="group flex-shrink-0 w-[280px] sm:w-[300px] snap-start"
                    whileHover={{
                      y: -4,
                      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                    }}
                  >
                    <div className="h-full bg-white rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.06)] border border-black/[0.04] p-6 transition-all duration-300 group-hover:shadow-[0_8px_40px_rgba(0,0,0,0.1)] border-glow shimmer">
                      {/* Icon */}
                      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#F97316]/10 mb-5">
                        <Icon className="h-6 w-6 text-[#F97316]" />
                      </div>

                      {/* Award name */}
                      <h3 className="font-[family-name:var(--font-plus-jakarta)] text-lg font-bold text-[#18181B] leading-tight">
                        {award.name}
                      </h3>

                      {/* Detail */}
                      <p className="mt-1.5 text-sm text-[#A1A1AA] font-[family-name:var(--font-inter)]">
                        {award.detail}
                      </p>

                      {/* Year badge */}
                      <div className="mt-4 inline-flex items-center rounded-full bg-[#18181B]/[0.04] px-3 py-1">
                        <span className="text-xs font-semibold text-[#71717A] font-[family-name:var(--font-inter)]">
                          {award.year}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
