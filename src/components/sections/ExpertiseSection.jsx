"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MapPin, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SERVICES } from "@/lib/constants";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";

/* Register GSAP plugin */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** Viewport heights of scroll per card transition (higher = slower, more time on each card). */
const CARD_SCROLL_VH = 165;

/** Fraction of each segment where the card stays fully visible before animating to the next. */
const CARD_HOLD_RATIO = 0.62;

function scrollProgressToFloatIndex(progress, lastIndex) {
  const raw = progress * lastIndex;
  if (raw >= lastIndex) return lastIndex;

  const segment = Math.floor(raw);
  const frac = raw - segment;
  const holdEnd = CARD_HOLD_RATIO;

  if (frac < holdEnd) return segment;

  const transitionFrac = (frac - holdEnd) / (1 - holdEnd);
  return segment + transitionFrac;
}

function cardIndexToScrollProgress(index, lastIndex) {
  if (lastIndex === 0) return 0;
  if (index <= 0) return 0;
  if (index >= lastIndex) return 1;

  const holdCenter = index + CARD_HOLD_RATIO * 0.45;
  return holdCenter / lastIndex;
}

/* ─── Main Expertise Section ─── */
export function ExpertiseSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const cardRefs = useRef([]);
  const progressFillRef = useRef(null);

  /* ─── GSAP ScrollTrigger setup (runs on ALL viewports) ─── */
  useEffect(() => {
    if (typeof window === "undefined") return;

    ScrollTrigger.config({ ignoreMobileResize: true });

    const section = sectionRef.current;
    const container = cardsContainerRef.current;
    if (!section || !container) return;

    const cards = cardRefs.current.filter(Boolean);
    if (cards.length === 0) return;

    const cardCount = cards.length;
    const lastIndex = cardCount - 1;

    const syncNavState = (activeIdx) => {
      const clamped = Math.max(0, Math.min(lastIndex, activeIdx));
      setActiveIndex(clamped);
      if (progressFillRef.current) {
        progressFillRef.current.style.width = `${((clamped + 1) / cardCount) * 100}%`;
      }
    };

    const applyCardStates = (floatIndex) => {
      cards.forEach((card, i) => {
        if (i === 0) {
          if (floatIndex >= 1) {
            gsap.set(card, {
              rotation: -25,
              scale: 0.3,
              opacity: 0,
              yPercent: -10,
              x: -60,
            });
          } else {
            const p = floatIndex;
            gsap.set(card, {
              rotation: -25 * p,
              scale: 1 - 0.7 * p,
              opacity: 0.8 - p,
              yPercent: -10 * p,
              x: -60 * p,
            });
          }
          return;
        }

        if (i === lastIndex) {
          const p = gsap.utils.clamp(0, 1, floatIndex - (lastIndex - 1));
          gsap.set(card, {
            yPercent: 100 - 100 * p,
            rotation: 0,
            scale: 1,
            opacity: 1,
            x: 0,
          });
          return;
        }

        if (floatIndex < i) {
          const incomingP = gsap.utils.clamp(0, 1, floatIndex - (i - 1));
          if (floatIndex > i - 1) {
            gsap.set(card, {
              yPercent: 100 - 100 * incomingP,
              rotation: 0,
              scale: 1,
              opacity: 1,
              x: 0,
            });
          } else {
            gsap.set(card, {
              yPercent: 100,
              rotation: 0,
              scale: 1,
              opacity: 1,
              x: 0,
            });
          }
        } else if (floatIndex >= i + 1) {
          gsap.set(card, {
            rotation: -25,
            scale: 0.3,
            opacity: 0,
            yPercent: -10,
            x: -60,
          });
        } else {
          const p = floatIndex - i;
          gsap.set(card, {
            rotation: -25 * p,
            scale: 1 - 0.7 * p,
            opacity: 0.8 - p,
            yPercent: -10 * p,
            x: -60 * p,
          });
        }
      });
    };

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        gsap.set(card, {
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: cardCount + 10 - i,
          yPercent: i === 0 ? 0 : 100,
          scale: 1,
          rotation: 0,
          opacity: 1,
          x: 0,
          transformOrigin: "center center",
        });
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: `+=${lastIndex * CARD_SCROLL_VH}vh`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 1.25,
        onUpdate: (self) => {
          const floatIndex = scrollProgressToFloatIndex(
            self.progress,
            lastIndex,
          );
          applyCardStates(floatIndex);
          syncNavState(Math.round(floatIndex));
        },
      });
    }, section);

    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(refreshTimeout);
      ctx.revert();
    };
  }, []);

  /* ─── Click to navigate (desktop nav) ─── */
  const scrollToCard = useCallback((index) => {
    const section = sectionRef.current;
    if (!section) return;

    const lastIndex = SERVICES.length - 1;
    const pinTrigger = ScrollTrigger.getAll().find(
      (t) => t.trigger === section && t.vars.pin,
    );
    if (!pinTrigger) return;

    const targetProgress = cardIndexToScrollProgress(index, lastIndex);
    const scrollTarget =
      pinTrigger.start + (pinTrigger.end - pinTrigger.start) * targetProgress;

    window.scrollTo({ top: scrollTarget, behavior: "smooth" });
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative mesh-gradient-1 py-16 md:py-20 lg:py-28"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-black/[0.06]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-black/[0.06]" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-albos-accent/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-40 right-20 w-96 h-96 bg-albos-accent/[0.02] rounded-full blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-[var(--container-max)] px-6 md:px-12 lg:px-20">
        {/* Mobile heading — on desktop this lives inside the left nav column */}
        <div className="lg:hidden mb-8">
          <SectionLabel label="Our Expertise" className="mb-4" />
          <h2 className="font-[family-name:var(--font-plus-jakarta)] text-2xl font-bold text-albos-text leading-tight">
            What We <span className="text-gradient">Build</span>
          </h2>
          <p className="mt-3 text-albos-muted text-sm leading-relaxed font-[family-name:var(--font-inter)]">
            Six core disciplines. One integrated team. End-to-end delivery from
            strategy to scale.
          </p>
        </div>

        {/* ─── Unified GSAP stacked-card layout (desktop + mobile) ─── */}
        <div className="flex flex-col lg:flex-row lg:gap-16">
          {/* ─── LEFT: Sticky Navigation (desktop only) ─── */}
          <div className="hidden lg:block lg:w-[30%] shrink-0">
            <div className="sticky top-28">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="mb-10"
              >
                <SectionLabel label="Our Expertise" className="mb-5" />
                <h2 className="font-[family-name:var(--font-plus-jakarta)] text-3xl md:text-4xl font-bold text-albos-text leading-tight">
                  What We
                  <br />
                  <span className="text-gradient">Build</span>
                </h2>
                <p className="mt-4 text-albos-muted text-sm leading-relaxed font-[family-name:var(--font-inter)] max-w-xs">
                  Six core disciplines. One integrated team. End-to-end delivery
                  from strategy to scale.
                </p>
              </motion.div>

              <motion.nav
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className="flex flex-col relative"
              >
                <div className="absolute left-[20px] top-0 bottom-0 w-px bg-black/[0.06]" />
                {SERVICES.map((service, i) => (
                  <motion.button
                    key={service.id}
                    variants={fadeUp}
                    onClick={() => scrollToCard(i)}
                    className="group relative flex items-center gap-3 rounded-xl px-2 py-3 text-left transition-all duration-500"
                  >
                    <AnimatePresence>
                      {i === activeIndex && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{
                            duration: 0.4,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="absolute inset-0 rounded-xl bg-albos-accent/[0.06] border border-albos-accent/10 pointer-events-none"
                        />
                      )}
                    </AnimatePresence>
                    <div
                      className={cn(
                        "relative z-10 w-[25px] h-[25px] rounded-full flex items-center justify-center shrink-0 transition-all duration-500 border",
                        i === activeIndex
                          ? "bg-albos-accent border-albos-accent shadow-[0_0_20px_rgba(249,115,22,0.3)]"
                          : i < activeIndex
                            ? "bg-albos-accent/20 border-albos-accent/30"
                            : "bg-transparent border-black/[0.12] group-hover:border-black/25",
                      )}
                    >
                      <span
                        className={cn(
                          "font-mono text-[10px] font-bold transition-colors duration-500",
                          i === activeIndex
                            ? "text-albos-dark"
                            : i < activeIndex
                              ? "text-albos-accent"
                              : "text-albos-muted group-hover:text-albos-text/50",
                        )}
                      >
                        {service.id}
                      </span>
                    </div>
                    <div className="relative z-10 min-w-0">
                      <span
                        className={cn(
                          "block font-[family-name:var(--font-plus-jakarta)] text-sm font-semibold transition-all duration-500",
                          i === activeIndex
                            ? "text-albos-accent"
                            : "text-albos-text/70 group-hover:text-albos-text",
                        )}
                      >
                        {service.title}
                      </span>
                      <AnimatePresence>
                        {i === activeIndex && (
                          <motion.span
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="block text-[11px] text-albos-muted font-[family-name:var(--font-inter)] mt-0.5 overflow-hidden"
                          >
                            {service.metric}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                    <AnimatePresence>
                      {i === activeIndex && (
                        <motion.div
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -5 }}
                          transition={{ duration: 0.3 }}
                          className="ml-auto relative z-10"
                        >
                          <ChevronRight className="h-3.5 w-3.5 text-albos-accent" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                ))}
              </motion.nav>

              {/* Progress bar */}
              <div className="mt-10 ml-4">
                <div className="h-[3px] w-full max-w-[200px] rounded-full bg-black/[0.06] overflow-hidden">
                  <div
                    ref={progressFillRef}
                    className="h-full bg-gradient-to-r from-albos-accent to-[#FB923C] rounded-full transition-[width] duration-300 ease-out"
                    style={{ width: `${(1 / SERVICES.length) * 100}%` }}
                  />
                </div>
                <div className="mt-3 flex items-center justify-between max-w-[200px]">
                  <span className="text-[10px] text-albos-muted font-[family-name:var(--font-inter)] tracking-wider uppercase">
                    {String(activeIndex + 1).padStart(2, "0")} /{" "}
                    {String(SERVICES.length).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] text-albos-accent font-mono">
                    {Math.round(((activeIndex + 1) / SERVICES.length) * 100)}%
                  </span>
                </div>
              </div>

              {/* Accent dots */}
              <div className="mt-6 ml-4 flex gap-1.5">
                {SERVICES.map((_, i) => (
                  <motion.div
                    key={i}
                    className={cn(
                      "h-1 rounded-full transition-all duration-500",
                      i === activeIndex
                        ? "w-6 bg-albos-accent"
                        : i < activeIndex
                          ? "w-3 bg-albos-accent/30"
                          : "w-3 bg-black/[0.1]",
                    )}
                    animate={i === activeIndex ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.5 }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ─── RIGHT: Stacked Cards Container (all widths) ─── */}
          <div className="w-full lg:w-[70%] relative overflow-hidden">
            <div
              ref={cardsContainerRef}
              className="relative w-full h-[62vh] lg:h-[75vh]"
            >
              {SERVICES.map((service, i) => (
                <div
                  key={service.slug}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  className="w-full rounded-2xl border border-black/[0.08] bg-white overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.08)] h-[62vh] lg:h-[75vh]"
                >
                  <ServiceCardContent
                    service={service}
                    isActive={activeIndex === i}
                  />
                </div>
              ))}
            </div>

            {/* Mobile scroll hint */}
            <p className="lg:hidden mt-4 text-center text-[11px] uppercase tracking-[0.15em] text-albos-muted font-[family-name:var(--font-inter)]">
              Scroll to explore · {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(SERVICES.length).padStart(2, "0")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Shared card content component ─── */
function ServiceCardContent({ service, isActive }) {
  return (
    <div className="h-full flex flex-col">
      {/* Tab header */}
      <div
        className={cn(
          "h-7 flex items-center gap-3 px-5 sm:px-7 md:px-8 lg:px-10 border-b shrink-0",
          isActive
            ? "bg-gradient-to-r from-albos-accent/10 to-transparent border-albos-accent/10"
            : "bg-[#F5F5F0] border-black/[0.06]",
        )}
      >
        <span
          className={cn(
            "font-mono text-[10px] font-bold tracking-wider",
            isActive ? "text-albos-accent" : "text-albos-accent/40",
          )}
        >
          {service.id}
        </span>
        <span
          className={cn(
            "font-[family-name:var(--font-plus-jakarta)] text-[11px] font-semibold truncate",
            isActive ? "text-albos-text/80" : "text-albos-text/30",
          )}
        >
          {service.title}
        </span>
        {isActive && (
          <span className="ml-auto text-[10px] text-albos-accent/60 font-[family-name:var(--font-inter)]">
            {service.metric}
          </span>
        )}
      </div>

      {/* Active accent line */}
      {isActive && (
        <div className="h-[2px] bg-gradient-to-r from-[#F97316] via-[#FB923C] to-transparent shrink-0" />
      )}

      {/* Card body */}
      <div className="relative z-10 p-5 sm:p-7 md:p-8 lg:p-10 bg-white flex-1 overflow-y-auto">
        <div className="flex items-center gap-4 mb-3">
          <span
            className={cn(
              "font-[family-name:var(--font-plus-jakarta)] text-5xl sm:text-6xl font-extrabold leading-none transition-colors duration-500",
              isActive ? "text-albos-accent/25" : "text-albos-accent/[0.08]",
            )}
          >
            {service.id}
          </span>
          <h3 className="font-[family-name:var(--font-plus-jakarta)] text-2xl sm:text-3xl md:text-4xl font-bold text-albos-text leading-tight">
            {service.title}
          </h3>
        </div>

        <div className="mt-4 inline-flex">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-albos-accent/10 border border-albos-accent/20 px-3.5 py-1.5 text-xs font-semibold text-albos-accent font-[family-name:var(--font-inter)]">
            {service.metric}
          </span>
        </div>

        <p className="mt-5 text-albos-muted text-base md:text-lg leading-relaxed max-w-xl font-[family-name:var(--font-inter)]">
          {service.description}
        </p>


        <div className="mt-6">
          <span className="text-xs uppercase tracking-[0.15em] text-albos-muted font-[family-name:var(--font-inter)] mb-2.5 block">
            Capabilities
          </span>
          <div className="flex flex-wrap gap-2">
            {service.capabilities.map((cap) => (
              <span
                key={cap}
                className="rounded-full border border-black/[0.08] bg-black/[0.03] px-3 py-1 text-[11px] font-medium text-albos-text/70 font-[family-name:var(--font-inter)] hover:border-albos-accent/30 hover:text-albos-text transition-all duration-300"
              >
                {cap}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <span className="text-xs uppercase tracking-[0.15em] text-albos-muted font-[family-name:var(--font-inter)] mb-2.5 block">
            Tech Stack
          </span>
          <div className="flex flex-wrap gap-2">
            {service.techStack.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center gap-1.5 rounded-md bg-black/[0.04] border border-black/[0.06] px-2.5 py-1.5 text-[11px] font-mono text-albos-text/60 hover:text-albos-accent hover:border-albos-accent/30 transition-all duration-300"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-albos-accent/60" />
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <a
            href={`/services/${service.slug}`}
            className="group flex justify-end items-center gap-2 text-albos-accent font-[family-name:var(--font-inter)] text-sm font-semibold transition-colors duration-300 hover:text-albos-accent-hover cursor-pointer"
            aria-label={`Learn more about ${service.title}`}
          >
            Learn More
            <span className="flex items-center justify-center w-8 h-8 rounded-full border border-albos-accent/30 group-hover:bg-albos-accent group-hover:border-albos-accent transition-all duration-300">
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-albos-dark" />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
