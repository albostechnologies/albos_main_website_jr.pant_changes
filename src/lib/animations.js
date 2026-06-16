// Fade up animation
export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

// Fade in animation
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

// Fade down (for nav)
export const fadeDown = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

// Stagger container
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

// Stagger container - fast
export const staggerContainerFast = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

// Reveal mask (clip path)
export const revealMask = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
  },
};

// Scale in
export const scaleIn = {
  hidden: { scale: 0.85, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

// Slide in from left
export const slideInLeft = {
  hidden: { x: -60, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

// Slide in from right
export const slideInRight = {
  hidden: { x: 60, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

// Character animation for split text
export const charReveal = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.03,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

// Word animation for text reveal
export const wordReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

// Line draw animation for timeline
export const lineDraw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] },
  },
};

// Card hover variants
export const cardHover = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -8,
    scale: 1.02,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
};

// Nav link underline
export const navUnderline = {
  rest: { scaleX: 0, originX: 0 },
  hover: {
    scaleX: 1,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
};

// Page transition
export const pageTransition = {
  initial: { opacity: 0, x: 40 },
  enter: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
  },
  exit: {
    opacity: 0,
    x: -40,
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
  },
};

// Bar chart animation
export const barGrow = (value) => ({
  hidden: { scaleX: 0 },
  visible: {
    scaleX: value / 100,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
  },
});

// Count up config
export const countUpConfig = {
  duration: 2,
  ease: [0.16, 1, 0.3, 1],
};

// Easing curves
export const easings = {
  outExpo: [0.16, 1, 0.3, 1],
  inOutQuart: [0.76, 0, 0.24, 1],
  outQuart: [0.25, 1, 0.5, 1],
};
