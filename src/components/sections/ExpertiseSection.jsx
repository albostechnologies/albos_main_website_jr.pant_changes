"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MapPin, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SERVICES } from "@/lib/constants";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";

/* Register GSAP plugin */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─── Main Expertise Section ─── */
export function ExpertiseSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const cardRefs = useRef([]);
  const progressFillRef = useRef(null);

  /* ─── GSAP ScrollTrigger setup ─── */
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth < 1024) return;

    const section = sectionRef.current;
    const container = cardsContainerRef.current;
    if (!section || !container) return;

    const cards = cardRefs.current.filter(Boolean);
    if (cards.length === 0) return;

    /* Kill ALL existing ScrollTriggers first (clean slate) */
    ScrollTrigger.getAll().forEach((t) => t.kill());

    /* ─── Set initial card states ─── */
    cards.forEach((card, i) => {
      gsap.set(card, {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: cards.length + 10 - i, // Card 0 highest z
        yPercent: i === 0 ? 0 : 100, // First card visible, rest hidden below
        scale: 1,
        rotation: 0,
        opacity: 1,
        x: 0,
        transformOrigin: "center center",
      });
    });

    /* ─── Create individual ScrollTrigger for each card transition ─── */
    /* Each transition: card[i] animates OUT, card[i+1] animates IN */

    for (let i = 0; i < cards.length - 1; i++) {
      const currentCard = cards[i];
      const nextCard = cards[i + 1];

      ScrollTrigger.create({
        trigger: section,
        start: `top+=${i * (100 / (cards.length - 1))}% top`,
        end: `top+=${(i + 1) * (100 / (cards.length - 1))}% top`,
        pin: false,
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress;

          /* Current card animates OUT */
          gsap.to(currentCard, {
            rotation: -35 * progress,
            scale: 1 - 0.7 * progress, // 1 → 0.3
            opacity: 1 - progress, // 1 → 0
            yPercent: -10 * progress, // slight upward
            x: -60 * progress, // shift left
            duration: 0,
            overwrite: "auto",
          });

          /* Next card animates IN */
          gsap.to(nextCard, {
            yPercent: 100 - 100 * progress, // 100% → 0%
            duration: 0,
            overwrite: "auto",
          });

          /* Update active index */
          if (progress > 1.5) {
            setActiveIndex(i + 1);
            if (progressFillRef.current) {
              progressFillRef.current.style.width = `${((i + 2) / cards.length) * 100}%`;
            }
          } else {
            setActiveIndex(i);
            if (progressFillRef.current) {
              progressFillRef.current.style.width = `${((i + 1) / cards.length) * 100}%`;
            }
          }
        },
      });
    }

    /* ─── Pin the section ─── */
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: `+=${(cards.length - 1) * 100}vh`,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
    });

    /* Refresh after a brief delay to recalculate positions */
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(refreshTimeout);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  /* ─── Click to navigate ─── */
  const scrollToCard = useCallback((index) => {
    const section = sectionRef.current;
    if (!section) return;

    /* Get the pin trigger */
    const allTriggers = ScrollTrigger.getAll();
    const pinTrigger = allTriggers.find((t) => t.pin === section);
    if (!pinTrigger) return;

    const targetProgress = index / (SERVICES.length - 1);
    const scrollTarget =
      pinTrigger.start + (pinTrigger.end - pinTrigger.start) * targetProgress;

    window.scrollTo({ top: scrollTarget, behavior: "smooth" });
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative mesh-gradient-1 py-20 md:py-28 lg:py-32"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-black/[0.06]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-black/[0.06]" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-albos-accent/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-40 right-20 w-96 h-96 bg-albos-accent/[0.02] rounded-full blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-[var(--container-max)] px-6 md:px-12 lg:px-20">
        <ScrollReveal direction="up" className="mb-12 lg:mb-16">
          <SectionLabel label="Our Expertise" />
        </ScrollReveal>

        {/* ─── Mobile: simple card list ─── */}
        <div className="lg:hidden">
          <div className="sticky top-16 z-30 -mx-6 px-6 py-3 bg-[#FAFAFA]/95 backdrop-blur-xl border-b border-black/[0.06] mb-6">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {SERVICES.map((service, i) => (
                <button
                  key={service.id}
                  onClick={() => {
                    const el = document.getElementById(`mobile-card-${i}`);
                    el?.scrollIntoView({ behavior: "smooth", block: "center" });
                  }}
                  className={cn(
                    "shrink-0 rounded-full px-4 py-2 text-xs font-semibold font-[family-name:var(--font-inter)] transition-all duration-300 whitespace-nowrap",
                    i === activeIndex
                      ? "bg-albos-accent text-albos-dark"
                      : "border border-black/[0.12] text-albos-text/70 hover:border-albos-accent/40",
                  )}
                >
                  <span className="text-albos-accent/60 mr-1.5">
                    {service.id}
                  </span>
                  {service.title}
                </button>
              ))}
            </div>
          </div>
          {SERVICES.map((service, i) => (
            <div
              key={service.slug}
              id={`mobile-card-${i}`}
              className="mb-4 rounded-2xl border border-black/[0.08] bg-white overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
            >
              <ServiceCardContent
                service={service}
                isActive={i === activeIndex}
              />
            </div>
          ))}
        </div>

        {/* ─── Desktop: GSAP ScrollTrigger pinned layout ─── */}
        <div className="hidden lg:flex lg:gap-16">
          {/* ─── LEFT: Sticky Navigation ─── */}
          <div className="lg:w-[30%] shrink-0">
            <div className="sticky top-28">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="mb-10"
              >
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
                <div className="absolute left-[15px] top-0 bottom-0 w-px bg-black/[0.06]" />
                {SERVICES.map((service, i) => (
                  <motion.button
                    key={service.id}
                    variants={fadeUp}
                    onClick={() => scrollToCard(i)}
                    className="group relative flex items-center gap-4 rounded-xl px-3 py-3.5 text-left transition-all duration-500"
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
                        "relative z-10 w-[30px] h-[30px] rounded-full flex items-center justify-center shrink-0 transition-all duration-500 border",
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

          {/* ─── RIGHT: Stacked Cards Container ─── */}
          <div className="lg:w-[70%] relative">
            <div
              ref={cardsContainerRef}
              className="relative w-full"
              style={{ height: "75vh" }}
            >
              {SERVICES.map((service, i) => (
                <div
                  key={service.slug}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  className="w-full rounded-2xl border border-black/[0.08] bg-white overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.08)]"
                  style={{ height: "75vh" }}
                >
                  <ServiceCardContent
                    service={service}
                    isActive={activeIndex === i}
                  />
                </div>
              ))}
            </div>
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
          <div className="flex items-center gap-2 mb-2.5">
            <MapPin className="h-3.5 w-3.5 text-albos-muted" />
            <span className="text-xs uppercase tracking-[0.15em] text-albos-muted font-[family-name:var(--font-inter)]">
              Offices
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {service.locations.map((loc, j) => (
              <span
                key={loc}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-xs font-medium font-[family-name:var(--font-inter)] transition-all duration-300",
                  j === 0
                    ? "bg-albos-accent text-albos-dark"
                    : "border border-black/[0.12] text-albos-text/70 hover:border-albos-accent/40 hover:text-albos-accent",
                )}
              >
                {loc}
              </span>
            ))}
          </div>
        </div>

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
            className="group inline-flex items-center gap-2 text-albos-accent font-[family-name:var(--font-inter)] text-sm font-semibold transition-colors duration-300 hover:text-albos-accent-hover cursor-pointer"
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
