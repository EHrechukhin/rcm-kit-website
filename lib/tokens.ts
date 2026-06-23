/**
 * MERIDIAN DESIGN TOKENS
 * Source of truth for design values in TypeScript.
 * Use in Framer Motion, inline styles, and computed values.
 * CSS custom properties are the authoritative source for theming.
 */

/* ── Duration ───────────────────────────────────────────────── */
export const duration = {
  instant:  50,
  fast:     150,
  medium:   300,
  slow:     500,
  showcase: 800,
} as const;

/* ── Easing ─────────────────────────────────────────────────── */
export const ease = {
  /** General-purpose transitions */
  standard:   [0.4, 0, 0.2, 1]      as const,
  /** Elements appearing — decelerates to rest */
  enter:      [0, 0, 0.2, 1]        as const,
  /** Elements leaving — accelerates */
  exit:       [0.4, 0, 1, 1]        as const,
  /** Premium, precise — the brand feel */
  emphasized: [0.21, 0.47, 0.32, 0.98] as const,
  /** Playful overshoot — showcase moments only */
  spring:     [0.34, 1.56, 0.64, 1] as const,
  /** Instant snap — microinteractions */
  crisp:      [0.16, 1, 0.3, 1]     as const,
} as const;

/* ── Motion presets (Framer Motion transition objects) ──────── */
export const motion = {
  instant:  { duration: duration.instant  / 1000, ease: ease.standard   },
  fast:     { duration: duration.fast     / 1000, ease: ease.standard   },
  medium:   { duration: duration.medium   / 1000, ease: ease.standard   },
  slow:     { duration: duration.slow     / 1000, ease: ease.enter      },
  showcase: { duration: duration.showcase / 1000, ease: ease.enter      },

  /** For elements entering the viewport */
  enter:    { duration: duration.slow     / 1000, ease: ease.enter      },
  /** For elements leaving the viewport */
  exit:     { duration: duration.fast     / 1000, ease: ease.exit       },
  /** For premium interactions */
  premium:  { duration: duration.medium   / 1000, ease: ease.emphasized },
  /** Spring feel */
  spring:   { type: "spring" as const, stiffness: 350, damping: 40      },
  /** Tight spring for snappy UI */
  springTight: { type: "spring" as const, stiffness: 500, damping: 50   },
} as const;

/* ── Spacing scale (px) ─────────────────────────────────────── */
export const spacing = {
  1:  4,
  2:  8,
  3:  12,
  4:  16,
  5:  20,
  6:  24,
  8:  32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
  24: 96,
  32: 128,
} as const;

/* ── Border radius (px) ─────────────────────────────────────── */
export const radius = {
  xs:   4,
  sm:   6,
  md:   8,
  lg:   12,
  xl:   16,
  "2xl": 20,
  "3xl": 24,
  full: 9999,
} as const;

/* ── Z-index scale ──────────────────────────────────────────── */
export const zIndex = {
  below:    -1,
  base:      0,
  raised:    10,
  float:     100,
  dropdown:  200,
  sticky:    300,
  overlay:   400,
  modal:     500,
  toast:     600,
  tooltip:   700,
  supreme:   9999,
} as const;

/* ── Breakpoints (px) ───────────────────────────────────────── */
export const breakpoints = {
  sm:  640,
  md:  768,
  lg:  1024,
  xl:  1280,
  "2xl": 1536,
} as const;

/* ── Raw color palette ──────────────────────────────────────── */
export const palette = {
  blue: {
    50:  "#EFF6FF",
    100: "#DBEAFE",
    200: "#BFDBFE",
    300: "#93C5FD",
    400: "#60A5FA",
    500: "#3B82F6",
    600: "#2563EB",
    700: "#1D4ED8",
    800: "#1E40AF",
    900: "#1E3A8A",
  },
  emerald: {
    50:  "#ECFDF5",
    100: "#D1FAE5",
    300: "#6EE7B7",
    400: "#34D399",
    500: "#10B981",
    600: "#059669",
    700: "#047857",
    900: "#064E3B",
  },
  amber: {
    50:  "#FFFBEB",
    100: "#FEF3C7",
    300: "#FCD34D",
    400: "#FBBF24",
    500: "#F59E0B",
    600: "#D97706",
    700: "#B45309",
    900: "#451A03",
  },
  violet: {
    50:  "#F5F3FF",
    100: "#EDE9FE",
    300: "#C4B5FD",
    400: "#A78BFA",
    500: "#8B5CF6",
    600: "#7C3AED",
  },
  sky: {
    200: "#BAE6FD",
    300: "#7DD3FC",
    400: "#38BDF8",
    500: "#0EA5E9",
  },
  ink: {
    950: "#050811",
    900: "#070D1A",
    800: "#0A1220",
    700: "#0D1728",
    600: "#111E34",
    500: "#162540",
    400: "#1E3154",
    300: "#2A4170",
    200: "#3D5A8C",
    100: "#5472A8",
  },
} as const;

/* ── Semantic dark-theme colors (matches CSS tokens) ────────── */
export const dark = {
  surface: {
    page:    palette.ink[950],
    base:    palette.ink[900],
    raised:  palette.ink[800],
    overlay: palette.ink[700],
    sunken:  "#030508",
  },
  text: {
    primary:   "#F1F5F9",
    secondary: "#94A3B8",
    tertiary:  "#475569",
    disabled:  "#334155",
    link:      palette.blue[400],
  },
  border: {
    default: "rgba(255, 255, 255, 0.08)",
    strong:  "rgba(255, 255, 255, 0.14)",
    subtle:  "rgba(255, 255, 255, 0.04)",
    focus:   palette.blue[500],
  },
  brand:  palette.blue[500],
  status: {
    success: { bg: "rgba(16,185,129,0.12)",  text: "#4ADE80",           border: "rgba(16,185,129,0.25)"  },
    warning: { bg: "rgba(245,158,11,0.12)",  text: "#FBBF24",           border: "rgba(245,158,11,0.25)"  },
    neutral: { bg: "rgba(148,163,184,0.10)", text: "#94A3B8",           border: "rgba(148,163,184,0.2)"  },
    flagship:{ bg: "rgba(59,130,246,0.12)",  text: palette.blue[300],   border: "rgba(59,130,246,0.25)"  },
  },
} as const;

/* ── Framer Motion animation variants ───────────────────────── */
export const variants = {
  fadeUp: {
    hidden:  { opacity: 0, y: 24, filter: "blur(4px)" },
    visible: { opacity: 1, y: 0,  filter: "blur(0px)", transition: { ...motion.enter, delay: 0 } },
  },
  fadeIn: {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: motion.enter },
  },
  scaleIn: {
    hidden:  { opacity: 0, scale: 0.94 },
    visible: { opacity: 1, scale: 1,    transition: motion.premium },
  },
  slideUp: {
    hidden:  { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0,  transition: motion.enter },
  },
  slideRight: {
    hidden:  { opacity: 0, x: -32 },
    visible: { opacity: 1, x: 0,   transition: motion.enter },
  },
  stagger: {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  },
  staggerFast: {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.05 } },
  },
  staggerSlow: {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  },
} as const;

/* ── Typography scale ───────────────────────────────────────── */
export const typography = {
  displayXl:  { fontSize: "clamp(2.8rem, 7.5vw, 5.5rem)", fontWeight: 800, lineHeight: 0.95,  letterSpacing: "-0.025em" },
  h1:         { fontSize: "clamp(1.875rem, 4vw, 3rem)",    fontWeight: 700, lineHeight: 1.1,   letterSpacing: "-0.015em" },
  h2:         { fontSize: "clamp(1.5rem, 3vw, 2.25rem)",   fontWeight: 600, lineHeight: 1.2,   letterSpacing: "-0.01em"  },
  h3:         { fontSize: "clamp(1.25rem, 2vw, 1.5rem)",   fontWeight: 600, lineHeight: 1.3,   letterSpacing: "-0.008em" },
  h4:         { fontSize: "1.125rem",                      fontWeight: 600, lineHeight: 1.4,   letterSpacing: "-0.005em" },
  bodyLg:     { fontSize: "1.125rem",                      fontWeight: 400, lineHeight: 1.7    },
  body:       { fontSize: "1rem",                          fontWeight: 400, lineHeight: 1.7    },
  bodySm:     { fontSize: "0.9375rem",                     fontWeight: 400, lineHeight: 1.6    },
  bodyXs:     { fontSize: "0.875rem",                      fontWeight: 400, lineHeight: 1.6    },
  overline:   { fontSize: "0.6875rem",                     fontWeight: 700, lineHeight: 1.5,   letterSpacing: "0.15em", textTransform: "uppercase" as const },
  mono:       { fontSize: "0.875rem",                      fontWeight: 400, lineHeight: 1.6,   fontFamily: "var(--font-mono, monospace)" },
  stat:       { fontSize: "clamp(2.5rem, 5vw, 4rem)",      fontWeight: 800, lineHeight: 1.0,   letterSpacing: "-0.03em", fontVariantNumeric: "tabular-nums" as const },
} as const;
