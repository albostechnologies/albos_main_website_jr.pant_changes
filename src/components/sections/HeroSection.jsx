"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { VideoModal } from "@/components/ui/VideoModal";
import { HeroCanvas } from "@/components/three/HeroCanvas";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { fadeUp, staggerContainer } from "@/lib/animations";

export function HeroSection({ onNavigate }) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollIndicator(window.scrollY < 200);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative flex h-[100svh] items-center justify-center overflow-hidden bg-[#FAFAFA]">
      {/* Three.js Background Canvas */}
      <div className="absolute inset-0 z-0">
        <HeroCanvas />
      </div>

      {/* Light gradient overlay for depth — subtle so 3D particles remain visible */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(250,250,250,0.6) 0%, rgba(250,250,250,0.75) 50%, rgba(250,250,250,0.92) 100%)",
        }}
      />

      {/* Bottom fade to next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 z-[2] pointer-events-none"
        style={{
          background: "linear-gradient(to top, #FAFAFA 0%, transparent 100%)",
        }}
      />

      {/* Noise overlay for texture */}
      <div className="noise-overlay absolute inset-0 z-[3] pointer-events-none" />

      {/* Subtle grid pattern — black lines on light bg */}
      <div
        className="absolute inset-0 z-[3] pointer-events-none opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Decorative corner accents */}
      <div className="absolute top-0 left-0 w-32 h-32 z-[4] pointer-events-none">
        <div className="absolute top-8 left-8 w-16 h-[1px] bg-black/[0.08]" />
        <div className="absolute top-8 left-8 w-[1px] h-16 bg-black/[0.08]" />
      </div>
      <div className="absolute top-0 right-0 w-32 h-32 z-[4] pointer-events-none">
        <div className="absolute top-8 right-8 w-16 h-[1px] bg-black/[0.08]" />
        <div className="absolute top-8 right-8 w-[1px] h-16 bg-black/[0.08]" />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 flex h-full w-full flex-col justify-between px-6 py-8 md:px-12 lg:px-20">
        {/* Top row */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex items-start justify-between"
        >
          {/* Top-right: Small badge */}
          <ScrollReveal direction="down" delay={0.4}>
            <div className="hidden md:flex items-center gap-2 border border-black/[0.06] rounded-full px-4 py-2 bg-black/[0.02]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
              </span>
              <span className="font-[family-name:var(--font-inter)] text-[10px] font-medium uppercase tracking-wider text-[#71717A]">
                Accepting Projects
              </span>
            </div>
          </ScrollReveal>
        </motion.div>

        {/* Center content */}
        <div className="flex flex-1 flex-col items-center justify-center text-center -mt-4 md:-mt-12">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-7xl"
          >
            {/* H1 — Animated text reveal */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.2,
              }}
              className="mb-4"
            >
              <h1 className="hero-display-heading whitespace-nowrap font-[family-name:var(--font-plus-jakarta)] font-extrabold text-[#18181B]">
                Software That Scales.
                <br />
                <span className="text-gradient">Teams That Deliver.</span>
              </h1>
            </motion.div>

            {/* Hero description */}
            <motion.p
              variants={fadeUp}
              className="mx-auto mt-6 md:mt-8 max-w-3xl text-base sm:text-lg md:text-xl font-[family-name:var(--font-inter)] leading-relaxed text-[#71717A] px-4"
            >
              We build{" "}
              <span className="text-[#18181B] font-medium">
                secure, scalable, and high-performance
              </span>{" "}
              software solutions tailored to your business goals. From startups
              to enterprises, our expert team delivers technology that drives
              growth, improves efficiency, and creates lasting competitive
              advantages.
            </motion.p>

            {/* Stat pill */}
            <motion.div
              variants={fadeUp}
              className="mt-6 sm:mt-8 md:mt-10 flex justify-center px-4"
            >
              <div className="inline-flex items-center gap-2 sm:gap-3 rounded-full bg-gradient-to-r from-[#F97316] to-[#FB923C] px-3 sm:px-6 py-2 sm:py-3 shadow-[0_0_40px_rgba(249,115,22,0.3)] relative overflow-hidden">
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent shimmer" />
                <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-white" />
                </span>
                <span className="relative font-[family-name:var(--font-inter)] text-[9px] sm:text-[10px] md:text-xs font-bold uppercase tracking-wider text-white">
                  250+ Engineers
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom row */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex items-end justify-between"
        >
          {/* Bottom-center: Scroll indicator */}
          <AnimatePresence>
            {showScrollIndicator && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 1.8, duration: 0.6 }}
                className="absolute left-1/2 -translate-x-1/2 bottom-8 hidden md:flex flex-col items-center gap-2"
              >
                {/* Mouse outline */}
                <div className="w-6 h-10 rounded-full border-2 border-black/20 flex justify-center pt-2">
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full bg-[#F97316]"
                    animate={{ y: [0, 16, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>
                <span className="font-[family-name:var(--font-inter)] text-[9px] uppercase tracking-[0.2em] text-[#71717A]">
                  Scroll to explore
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom-right: CTA circular button */}
          <ScrollReveal direction="left" delay={1.0}>
            <div className="flex flex-col items-center gap-3">
              <MagneticButton strength={0.25}>
                <button
                  onClick={() => onNavigate?.("contact")}
                  aria-label="Start a project - contact us"
                  className="group relative flex h-12 w-12 sm:h-14 sm:w-14 md:h-20 md:w-20 items-center justify-center rounded-full bg-[#F97316] transition-all duration-300 hover:bg-[#EA580C] hover:shadow-[0_0_50px_rgba(249,115,22,0.4)] cursor-pointer"
                >
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white transition-transform duration-300 group-hover:translate-x-0.5" />
                  {/* Arc text around the button */}
                  <svg
                    className="absolute inset-0 h-full w-full animate-[spin_12s_linear_infinite]"
                    viewBox="0 0 80 80"
                    role="img"
                    aria-hidden="true"
                  >
                    <defs>
                      <path
                        id="circlePath"
                        d="M 40, 40 m -32, 0 a 32,32 0 1,1 64,0 a 32,32 0 1,1 -64,0"
                      />
                    </defs>
                    <text
                      className="fill-white/60"
                      fontSize="7.5"
                      fontWeight="600"
                      letterSpacing="3"
                    >
                      <textPath href="#circlePath">
                        GET STARTED • GET STARTED •{" "}
                      </textPath>
                    </text>
                  </svg>
                </button>
              </MagneticButton>
              <span className="font-[family-name:var(--font-inter)] text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#71717A]">
                Get Started
              </span>
            </div>
          </ScrollReveal>
        </motion.div>
      </div>

      {/* Floating gradient blob behind hero heading */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-[#F97316]/[0.04] rounded-full blur-[120px] pointer-events-none animate-pulse" />

      {/* Floating decorative shapes */}
      <div className="absolute top-1/4 left-[10%] w-20 h-20 border border-black/[0.04] rounded-full animate-float" />
      <div
        className="absolute bottom-1/3 right-[15%] w-32 h-32 border border-black/[0.03] rounded-full animate-float"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute top-1/2 right-[8%] w-2 h-2 bg-[#F97316]/30 rounded-full animate-float"
        style={{ animationDelay: "4s" }}
      />
      <div
        className="absolute top-[30%] left-[20%] w-1.5 h-1.5 bg-[#F97316]/20 rounded-full animate-float"
        style={{ animationDelay: "1s" }}
      />

      {/* Video Modal */}
      <VideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
    </section>
  );
}
