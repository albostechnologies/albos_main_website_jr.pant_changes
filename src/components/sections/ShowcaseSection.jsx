"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useAnimationFrame,
  animate,
} from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Data Types                                                        */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/*  Static Data — 4 unique cards per category                         */
/* ------------------------------------------------------------------ */

const showcaseData = [
  {
    key: "branding",
    label: "BRANDING",
    cards: [
      {
        image: "/images/expertise/branding/1.png",
        rotation: -6,
        scale: 0.85,
        isLandscape: true,
      },
      {
        image: "/images/expertise/branding/2.png",
        rotation: 4,
        scale: 0.9,
        isLandscape: true,
      },
      {
        image: "/images/expertise/branding/3.png",
        rotation: -3,
        scale: 0.82,
        isLandscape: true,
      },
      {
        image: "/images/expertise/branding/4.png",
        rotation: 5,
        scale: 0.88,
        isLandscape: false,
      },
    ],
  },
  {
    key: "design",
    label: "DESIGN",
    cards: [
      {
        image: "/images/expertise/design/1.png",
        rotation: 3,
        scale: 0.9,
        isLandscape: false,
      },
      {
        image: "/images/expertise/design/2.png",
        rotation: -5,
        scale: 0.85,
        isLandscape: false,
      },
      {
        image: "/images/expertise/design/3.png",
        rotation: -2,
        scale: 0.83,
        isLandscape: false,
      },
      {
        image: "/images/expertise/design/4.png",
        rotation: 4,
        scale: 0.87,
        isLandscape: true,
      },
    ],
  },
  {
    key: "development",
    label: "DEVELOPMENT",
    cards: [
      {
        image: "/images/expertise/development/1.png",
        rotation: -4,
        scale: 0.88,
        isLandscape: true,
      },
      {
        image: "/images/expertise/development/2.png",
        rotation: 5,
        scale: 0.82,
        isLandscape: true,
      },
      {
        image: "/images/expertise/development/3.png",
        rotation: 2,
        scale: 0.84,
        isLandscape: true,
      },
      {
        image: "/images/expertise/development/4.png",
        rotation: -3,
        scale: 0.86,
        isLandscape: true,
      },
    ],
  },
  {
    key: "strategy",
    label: "STRATEGY",
    cards: [
      {
        image: "/images/expertise/Strategy/1.png",
        rotation: 4,
        scale: 0.85,
        isLandscape: true,
      },
      {
        image: "/images/expertise/Strategy/2.png",
        rotation: -3,
        scale: 0.9,
        isLandscape: true,
      },
      {
        image: "/images/expertise/Strategy/3.png",
        rotation: -5,
        scale: 0.83,
        isLandscape: true,
      },
      {
        image: "/images/expertise/Strategy/4.png",
        rotation: 3,
        scale: 0.87,
        isLandscape: true,
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Responsive orbit configuration                                    */
/*  Single source of truth driven by CSS media queries (matchMedia).  */
/*  Each breakpoint defines the orbit radii AND the exact pixel size   */
/*  of every card so centering stays pixel-perfect at any width.       */
/* ------------------------------------------------------------------ */

const RESPONSIVE_BREAKPOINTS = [
  // Small phones
  {
    query: "(max-width: 380px)",
    rx: 132,
    ry: 96,
    land: { w: 132, h: 84 },
    port: { w: 88, h: 124 },
  },
  // Phones
  {
    query: "(max-width: 479px)",
    rx: 150,
    ry: 108,
    land: { w: 152, h: 96 },
    port: { w: 100, h: 140 },
  },
  // Large phones
  {
    query: "(max-width: 639px)",
    rx: 172,
    ry: 122,
    land: { w: 172, h: 108 },
    port: { w: 112, h: 158 },
  },
  // Small tablets
  {
    query: "(max-width: 767px)",
    rx: 214,
    ry: 144,
    land: { w: 200, h: 124 },
    port: { w: 128, h: 184 },
  },
  // Tablets
  {
    query: "(max-width: 1023px)",
    rx: 262,
    ry: 162,
    land: { w: 224, h: 138 },
    port: { w: 152, h: 208 },
  },
  // Small laptops
  {
    query: "(max-width: 1279px)",
    rx: 312,
    ry: 186,
    land: { w: 256, h: 156 },
    port: { w: 168, h: 232 },
  },
];

// Default (desktop / >= 1280px) — also the SSR fallback.
const RESPONSIVE_DEFAULT = {
  rx: 360,
  ry: 210,
  land: { w: 288, h: 176 },
  port: { w: 192, h: 256 },
};

/* ------------------------------------------------------------------ */
/*  Utility: shuffle array (Fisher-Yates)                             */
/* ------------------------------------------------------------------ */

function shuffleArray(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/* ------------------------------------------------------------------ */
/*  Orbiting card sub-component — continuous circular orbit           */
/*  Uses spring-animated slotAngle for smooth position shuffling      */
/* ------------------------------------------------------------------ */

function OrbitingCard({
  card,
  index,
  categoryKey,
  slotAngleDeg,
  orbitRadiusX,
  orbitRadiusY,
  cardW,
  cardH,
}) {
  // The continuously rotating base angle
  const baseAngle = useMotionValue(0);

  // The slot angle (which card position on the circle) — animated with spring
  const slotAngle = useMotionValue(slotAngleDeg);

  // Animate slotAngle when prop changes (spring transition)
  useEffect(() => {
    const controls = animate(slotAngle, slotAngleDeg, {
      type: "spring",
      stiffness: 80,
      damping: 16,
      mass: 1.2,
    });
    return () => controls.stop();
  }, [slotAngleDeg, slotAngle]);

  // Combined angle = base (continuous rotation) + slot (position on circle)
  const currentAngleRad = useTransform(
    [baseAngle, slotAngle],
    ([ba, sa]) => ((ba + sa) * Math.PI) / 180,
  );

  // Compute x,y from the orbit
  const x = useTransform(currentAngleRad, (a) => orbitRadiusX * Math.cos(a));
  const y = useTransform(currentAngleRad, (a) => orbitRadiusY * Math.sin(a));

  // Card tilt based on position
  const tilt = useTransform(
    currentAngleRad,
    (a) => Math.sin(a) * 10 + card.rotation,
  );

  // Depth scale based on position (cards "in back" are slightly smaller)
  const depthScale = useTransform(currentAngleRad, (a) => {
    const depthFactor = 0.1 * Math.sin(a);
    return card.scale + depthFactor;
  });

  // Depth z-index based on position
  const zIndex = useTransform(currentAngleRad, (a) =>
    Math.round(10 + Math.sin(a) * 8),
  );

  // Opacity based on depth (cards "behind" are slightly dimmer)
  const depthOpacity = useTransform(currentAngleRad, (a) => {
    return 0.82 + 0.18 * Math.sin(a);
  });

  // Continuous orbit animation
  useAnimationFrame((_, delta) => {
    baseAngle.set((baseAngle.get() + delta * 0.02) % 360);
  });

  // Exact pixel sizing keeps the card perfectly centered on its orbit point
  // at every breakpoint (half-offsets always match the rendered size).
  const halfW = cardW / 2;
  const halfH = cardH / 2;

  return (
    <motion.div
      key={`${categoryKey}-orbit-${index}`}
      className="absolute rounded-2xl overflow-hidden pointer-events-none"
      style={{
        width: cardW,
        height: cardH,
        x,
        y,
        rotate: tilt,
        scale: depthScale,
        zIndex,
        opacity: depthOpacity,
        left: "50%",
        top: "50%",
        marginLeft: `-${halfW}px`,
        marginTop: `-${halfH}px`,
      }}
      initial={{ opacity: 0, scale: 0.4, filter: "blur(16px)" }}
      animate={{
        opacity: 1,
        filter: "blur(0px)",
      }}
      exit={{
        opacity: 0,
        scale: 0.4,
        filter: "blur(12px)",
        transition: { duration: 0.3, ease: "easeInOut" },
      }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 18,
        opacity: { duration: 0.5, delay: index * 0.1 },
        filter: { duration: 0.5, delay: index * 0.1 },
      }}
      whileHover={false}
      whileTap={false}
    >
      {/* Glassmorphism card body */}
      <div className="relative w-full h-full rounded-2xl overflow-hidden border border-black/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.08),0_0_40px_rgba(249,115,22,0.04)] group">
        {/* Image */}
        <Image
          src={card.image}
          alt={`${categoryKey} showcase ${index + 1}`}
          fill
          className="object-cover rounded-2xl transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 479px) 152px, (max-width: 767px) 200px, (max-width: 1023px) 224px, 288px"
        />

        {/* Glassmorphism overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAFA]/80 via-[#FAFAFA]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[1]" />

        {/* Subtle top-edge shine line */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/[0.08] to-transparent z-[2]" />

        {/* Bottom accent line on hover */}
        <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-[#F97316]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[2]" />

        {/* Card number indicator */}
        <div className="absolute top-2 right-2 z-[3] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="font-[family-name:var(--font-jetbrains-mono)] text-[9px] tracking-wider text-black/60 bg-black/20 backdrop-blur-sm px-2 py-0.5 rounded-full border border-black/[0.06]">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Orbit ring decoration                                             */
/* ------------------------------------------------------------------ */

function OrbitRing({ radiusX, radiusY, opacity = 0.06 }) {
  return (
    <div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
      style={{
        width: radiusX * 2,
        height: radiusY * 2,
        border: `1px solid rgba(0,0,0,${opacity * 0.5})`,
        boxShadow: `0 0 40px rgba(249,115,22,0.02)`,
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Main Showcase Section                                             */
/* ------------------------------------------------------------------ */

// Base slot positions: 4 cards evenly spaced on circle
const BASE_SLOTS = [0, 90, 180, 270];

export function ShowcaseSection() {
  const [activeKey, setActiveKey] = useState(showcaseData[0].key);
  const [slotAssignments, setSlotAssignments] = useState([0, 90, 180, 270]);
  const containerRef = useRef(null);
  const autoShuffleRef = useRef(null);
  const lastShuffleTimeRef = useRef(0);

  const activeCategory =
    showcaseData.find((c) => c.key === activeKey) ?? showcaseData[0];

  // Shuffle card positions with spring animation
  const shufflePositions = useCallback(() => {
    const now = Date.now();
    // Debounce: don't shuffle more than once per 800ms
    if (now - lastShuffleTimeRef.current < 800) return;
    lastShuffleTimeRef.current = now;

    setSlotAssignments((prev) => {
      const shuffled = shuffleArray(BASE_SLOTS);
      // Avoid same arrangement
      if (shuffled.every((v, i) => v === prev[i])) {
        // Swap first two
        [shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]];
      }
      return shuffled;
    });
  }, []);

  // Handle keyword hover — switch category + shuffle
  const handleMouseEnter = useCallback(
    (key) => {
      setActiveKey(key);
      shufflePositions();
    },
    [shufflePositions],
  );

  const handleFocus = useCallback(
    (key) => {
      setActiveKey(key);
      shufflePositions();
    },
    [shufflePositions],
  );

  // Auto-shuffle every 4 seconds for continuous dynamic feel
  useEffect(() => {
    autoShuffleRef.current = setInterval(() => {
      shufflePositions();
    }, 4000);
    return () => {
      if (autoShuffleRef.current) clearInterval(autoShuffleRef.current);
    };
  }, [shufflePositions]);

  // Responsive orbit config (radii + card sizes), resolved via CSS media
  // queries with matchMedia so the orbit animation adapts cleanly from the
  // smallest phone up to large desktops — min/max-width breakpoints.
  const [responsive, setResponsive] = useState(RESPONSIVE_DEFAULT);

  useEffect(() => {
    // Build a MediaQueryList for each breakpoint (max-width ranges); the
    // default config applies above the largest breakpoint (min-width 1280px).
    const mqls = RESPONSIVE_BREAKPOINTS.map((bp) => ({
      bp,
      mql: window.matchMedia(bp.query),
    }));

    const resolve = () => {
      const match = mqls.find(({ mql }) => mql.matches);
      setResponsive(match ? match.bp : RESPONSIVE_DEFAULT);
    };

    resolve();
    mqls.forEach(({ mql }) => mql.addEventListener("change", resolve));
    return () =>
      mqls.forEach(({ mql }) => mql.removeEventListener("change", resolve));
  }, []);

  const orbitRadius = { rx: responsive.rx, ry: responsive.ry };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-[#FAFAFA] overflow-hidden"
      aria-label="Interactive showcase of our work categories"
    >
      {/* Dot-grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Noise texture overlay */}
      <div className="noise-overlay absolute inset-0 pointer-events-none z-0" />

      {/* Subtle radial glow behind active text */}
      <motion.div
        key={`glow-${activeKey}`}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 70%)",
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      />

      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 md:px-12 lg:px-20">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6 md:mb-10"
        >
          <span className="mono-label">Our Expertise</span>
        </motion.div>

        {/* Main keyword stack */}
        <h2 className="flex flex-col items-center text-center select-none relative z-20">
          {showcaseData.map((category) => {
            const isActive = activeKey === category.key;

            return (
              <motion.span
                key={category.key}
                className="block font-[family-name:var(--font-plus-jakarta)] font-extrabold leading-[1] tracking-tight cursor-pointer relative"
                style={{
                  fontSize: isActive
                    ? "clamp(3.2rem, 9vw, 9rem)"
                    : "clamp(2.8rem, 8vw, 8rem)",
                  color: isActive ? "#18181B" : "#D4D4D8",
                  opacity: isActive ? 1 : 0.35,
                  textShadow: isActive
                    ? "0 0 60px rgba(249,115,22,0.2), 0 4px 20px rgba(0,0,0,0.08)"
                    : "none",
                  transition:
                    "color 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.5s cubic-bezier(0.16,1,0.3,1), text-shadow 0.5s cubic-bezier(0.16,1,0.3,1), font-size 0.5s cubic-bezier(0.16,1,0.3,1)",
                }}
                onMouseEnter={() => handleMouseEnter(category.key)}
                onClick={() => handleMouseEnter(category.key)}
                onFocus={() => handleFocus(category.key)}
                onBlur={() => {
                  /* keep last active */
                }}
                tabIndex={0}
                role="button"
                aria-label={`Show ${category.label} projects`}
                aria-pressed={isActive}
                whileHover={{
                  opacity: 1,
                  color: "#18181B",
                  textShadow:
                    "0 0 60px rgba(249,115,22,0.2), 0 4px 20px rgba(0,0,0,0.08)",
                }}
                whileTap={{ scale: 0.97 }}
              >
                {/* Accent underline for active keyword */}
                {isActive && (
                  <motion.div
                    layoutId="showcase-accent-underline"
                    className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, #F97316, transparent)",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {category.label}
              </motion.span>
            );
          })}
        </h2>

        {/* Screen reader announcement for active category */}
        <div className="sr-only" role="status" aria-live="polite">
          Currently showing {activeCategory.label} projects
        </div>

        {/* Floating orbit cards — responsive across all screen sizes.
            Sits behind the headline on phones (z-0) so the active category
            stays readable, and in front from md up (md:z-30). */}
        <div className="absolute inset-0 pointer-events-none z-0 md:z-30">
          {/* Orbit rings for visual depth */}
          <OrbitRing
            radiusX={orbitRadius.rx}
            radiusY={orbitRadius.ry}
            opacity={0.04}
          />
          <OrbitRing
            radiusX={orbitRadius.rx * 0.65}
            radiusY={orbitRadius.ry * 0.65}
            opacity={0.025}
          />
          <OrbitRing
            radiusX={orbitRadius.rx * 1.3}
            radiusY={orbitRadius.ry * 1.3}
            opacity={0.02}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeKey}
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeCategory.cards.map((card, i) => {
                const dims = card.isLandscape
                  ? responsive.land
                  : responsive.port;
                return (
                  <OrbitingCard
                    key={`${activeKey}-orbit-${i}`}
                    card={card}
                    index={i}
                    categoryKey={activeKey}
                    slotAngleDeg={slotAssignments[i]}
                    orbitRadiusX={orbitRadius.rx}
                    orbitRadiusY={orbitRadius.ry}
                    cardW={dims.w}
                    cardH={dims.h}
                  />
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Center decorative pulse */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <motion.div
              className="w-4 h-4 rounded-full border border-[#F97316]/20"
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.div
              className="absolute inset-0 w-4 h-4 rounded-full border border-[#F97316]/10"
              animate={{
                scale: [1, 2.5, 1],
                opacity: [0.15, 0.3, 0.15],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />
          </div>

          {/* Small orbiting dots on the ring path */}
          {[0, 90, 180, 270].map((angle) => (
            <motion.div
              key={`orbit-dot-${angle}`}
              className="absolute w-1.5 h-1.5 bg-[#F97316]/15 rounded-full pointer-events-none"
              style={{
                left: "50%",
                top: "50%",
              }}
              animate={{
                x: [
                  orbitRadius.rx * Math.cos((angle * Math.PI) / 180),
                  orbitRadius.rx * Math.cos(((angle + 360) * Math.PI) / 180),
                ],
                y: [
                  orbitRadius.ry * Math.sin((angle * Math.PI) / 180),
                  orbitRadius.ry * Math.sin(((angle + 360) * Math.PI) / 180),
                ],
              }}
              transition={{
                duration: 60,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>

        {/* Bottom hint text */}
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FAFAFA] to-transparent pointer-events-none z-[15]" />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F97316]/20 to-transparent z-[15]" />

      {/* Decorative corner accents */}
      <div className="absolute top-0 left-0 w-24 h-24 pointer-events-none z-[15]">
        <div className="absolute top-6 left-6 w-12 h-[1px] bg-black/[0.06]" />
        <div className="absolute top-6 left-6 w-[1px] h-12 bg-black/[0.06]" />
      </div>
      <div className="absolute bottom-0 right-0 w-24 h-24 pointer-events-none z-[15]">
        <div className="absolute bottom-6 right-6 w-12 h-[1px] bg-black/[0.06]" />
        <div className="absolute bottom-6 right-6 w-[1px] h-12 bg-black/[0.06]" />
      </div>

      {/* Floating particle dots */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 1 + (i % 3),
            height: 1 + (i % 3),
            left: `${10 + i * 11}%`,
            top: `${15 + (i % 4) * 20}%`,
            backgroundColor:
              i % 3 === 0 ? "rgba(249,115,22,0.15)" : "rgba(0,0,0,0.04)",
          }}
          animate={{
            y: [0, -15 - i * 4, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 4 + i * 0.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.4,
          }}
        />
      ))}
    </section>
  );
}
