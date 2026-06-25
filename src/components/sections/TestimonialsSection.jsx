"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const AUTOPLAY_INTERVAL = 5000;

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [manualPause, setManualPause] = useState(false);
  const total = TESTIMONIALS.length;
  const currentRef = useRef(current);
  const isPausedRef = useRef(isPaused);
  const manualPauseRef = useRef(manualPause);

  // Keep refs in sync
  useEffect(() => {
    currentRef.current = current;
  }, [current]);
  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);
  useEffect(() => {
    manualPauseRef.current = manualPause;
  }, [manualPause]);

  const advance = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total);
    setProgress(0);
  }, [total]);

  const goToSlide = useCallback((index) => {
    setCurrent(index);
    setProgress(0);
    setManualPause(true);
  }, []);

  // Reset manual pause after 3 seconds
  useEffect(() => {
    if (!manualPause) return;
    const timeout = setTimeout(() => setManualPause(false), 3000);
    return () => clearTimeout(timeout);
  }, [manualPause]);

  // Single interval: progress bar + auto-advance
  useEffect(() => {
    const step = 50;
    const increment = (step / AUTOPLAY_INTERVAL) * 100;

    const interval = setInterval(() => {
      // Check pause state from refs to avoid stale closures
      if (isPausedRef.current || manualPauseRef.current) return;

      setProgress((prev) => {
        const nextVal = prev + increment;
        if (nextVal >= 100) {
          // Schedule advance on next tick to avoid cascading renders
          setTimeout(advance, 0);
          return 100;
        }
        return nextVal;
      });
    }, step);

    return () => clearInterval(interval);
  }, [advance]);

  const prev = useCallback(() => {
    setCurrent((prevVal) => (prevVal - 1 + total) % total);
    setProgress(0);
  }, [total]);

  const testimonial = TESTIMONIALS[current];

  return (
    <section className="relative bg-[#FAFAFA] py-16 md:py-20 lg:py-28 overflow-hidden">
      {/* Gradient accent line above section */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#F97316]/50 to-transparent" />
      {/* Decorative top/bottom lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-black/[0.06]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-black/[0.06]" />

      <div className="mx-auto max-w-[var(--container-max)] px-6 md:px-12 lg:px-20">
        {/* Header */}
        <ScrollReveal direction="up" className="mb-12 lg:mb-16">
          <SectionLabel label="What Clients Say" dark />
          <h2 className="mt-4 font-[family-name:var(--font-plus-jakarta)] text-3xl md:text-4xl lg:text-5xl font-bold text-[#18181B] leading-tight">
            Trusted by Industry Leaders
          </h2>
        </ScrollReveal>

        {/* Testimonial carousel area */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Large decorative quote marks */}
          <div className="absolute -top-4 -left-2 md:-top-8 md:-left-4 pointer-events-none select-none">
            <svg
              className="h-24 w-24 md:h-40 md:w-40 text-[#F97316]/[0.08]"
              viewBox="0 0 100 100"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M30 20c-11 0-20 9-20 20s9 20 20 20c2 0 4-.3 6-.8C33 67 26 72 18 72v8c20 0 32-15 32-40 0-11-9-20-20-20zm44 0c-11 0-20 9-20 20s9 20 20 20c2 0 4-.3 6-.8C77 67 70 72 62 72v8c20 0 32-15 32-40 0-11-9-20-20-20z" />
            </svg>
          </div>
          <div className="absolute -bottom-4 -right-2 md:-bottom-8 md:-right-4 pointer-events-none select-none rotate-180">
            <svg
              className="h-24 w-24 md:h-40 md:w-40 text-[#F97316]/[0.08]"
              viewBox="0 0 100 100"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M30 20c-11 0-20 9-20 20s9 20 20 20c2 0 4-.3 6-.8C33 67 26 72 18 72v8c20 0 32-15 32-40 0-11-9-20-20-20zm44 0c-11 0-20 9-20 20s9 20 20 20c2 0 4-.3 6-.8C77 67 70 72 62 72v8c20 0 32-15 32-40 0-11-9-20-20-20z" />
            </svg>
          </div>

          {/* Carousel content - crossfade with slight scale */}
          <div className="relative min-h-[280px] md:min-h-[320px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.03 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-full glow-accent rounded-2xl p-4 -m-4"
              >
                {/* Star rating */}
                <div className="flex items-center gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className="h-5 w-5 text-[#F97316]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Quote text */}
                <blockquote className="font-[family-name:var(--font-inter)] text-xl md:text-2xl lg:text-3xl text-[#18181B] leading-relaxed md:leading-relaxed max-w-3xl italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                {/* Client info */}
                <div className="mt-8 flex flex-col">
                  <span className="font-[family-name:var(--font-plus-jakarta)] text-lg font-bold text-[#18181B]">
                    {testimonial.name}
                  </span>
                  <span className="mt-1 text-sm text-[#A1A1AA] font-[family-name:var(--font-inter)]">
                    {testimonial.title}, {testimonial.company}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress bar */}
          <div className="mt-6 h-1 w-full rounded-full bg-[#18181B]/10 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#F97316] to-[#FB923C]"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.05, ease: "linear" }}
            />
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6 md:mt-8">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`relative h-2.5 rounded-full transition-all duration-400 ${
                    i === current
                      ? "w-10 bg-[#F97316] shadow-[0_0_8px_rgba(249,115,22,0.4)]"
                      : "w-2.5 bg-[#18181B]/15 hover:bg-[#F97316]/40"
                  }`}
                />
              ))}
            </div>

            {/* Prev/Next arrows */}
            <div className="flex items-center gap-3">
              <button
                onClick={prev}
                aria-label="Previous testimonial"
                className="flex items-center justify-center w-10 h-10 rounded-full border border-black/[0.08] text-[#71717A] transition-all duration-300 hover:bg-[#18181B] hover:text-white hover:border-[#18181B]"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={advance}
                aria-label="Next testimonial"
                className="flex items-center justify-center w-10 h-10 rounded-full border border-black/[0.08] text-[#71717A] transition-all duration-300 hover:bg-[#18181B] hover:text-white hover:border-[#18181B]"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
