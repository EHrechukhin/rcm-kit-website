"use client";

/**
 * ImagePlaceholder — a theme-aware visual stand-in for real photography.
 *
 * Drop this anywhere a real image will eventually live. When the real assets
 * arrive, replace each <ImagePlaceholder /> with a <next/image> pointing at the
 * file in /public — the surrounding layout (aspect ratio, rounding, sizing) is
 * already set by the wrapper element's className, so the swap is mechanical.
 *
 * Colours are pulled from the active theme (primary / accent CSS variables),
 * so the placeholder restyles itself automatically when the theme switches.
 */

type IconKind = "image" | "user" | "team" | "office" | "workspace" | "growth";

function PlaceholderIcon({ kind, className }: { kind: IconKind; className?: string }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    viewBox: "0 0 24 24",
    className,
  };

  switch (kind) {
    case "user":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21c0-4.418 3.582-8 8-8s8 3.582 8 8" />
        </svg>
      );
    case "team":
      return (
        <svg {...common}>
          <circle cx="9" cy="9" r="3" />
          <path d="M2.5 20c0-3.314 2.91-6 6.5-6s6.5 2.686 6.5 6" />
          <path d="M16 6.5a3 3 0 010 5.8" />
          <path d="M21.5 20c0-2.5-1.6-4.6-4-5.4" />
        </svg>
      );
    case "office":
      return (
        <svg {...common}>
          <path d="M3 21h18" />
          <path d="M5 21V5a2 2 0 012-2h7a2 2 0 012 2v16" />
          <path d="M16 21V9h3a2 2 0 012 2v10" />
          <path d="M9 7h2M9 11h2M9 15h2" />
        </svg>
      );
    case "workspace":
      return (
        <svg {...common}>
          <rect x="2.5" y="4" width="19" height="12" rx="2" />
          <path d="M8 20h8M12 16v4" />
        </svg>
      );
    case "growth":
      return (
        <svg {...common}>
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
          <polyline points="16 7 22 7 22 13" />
        </svg>
      );
    case "image":
    default:
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
      );
  }
}

export interface ImagePlaceholderProps {
  /** Sizing / aspect / rounding utilities for the wrapper. */
  className?: string;
  /** Caption shown under the icon (e.g. "Team photo"). */
  label?: string;
  /** Which glyph to show. */
  icon?: IconKind;
  /**
   * "light"  → for placement on light backgrounds (default)
   * "dark"   → for placement on dark sections (Benefits)
   * "onBrand"→ for placement on a coloured/brand surface (e.g. Team lead card)
   */
  tone?: "light" | "dark" | "onBrand";
  /** Hide the small caption, keeping just the icon. */
  hideLabel?: boolean;
}

const TONES = {
  light: {
    surface: "bg-gradient-to-br from-primary-50 to-accent-50 border-slate-200/70",
    icon: "text-primary-400",
    text: "text-slate-400",
    dot: "bg-primary-300/50",
  },
  dark: {
    surface: "bg-white/[0.04] border-white/10",
    icon: "text-white/40",
    text: "text-white/35",
    dot: "bg-white/15",
  },
  onBrand: {
    surface: "bg-white/10 border-white/20 backdrop-blur-sm",
    icon: "text-white/70",
    text: "text-white/60",
    dot: "bg-white/30",
  },
} as const;

export default function ImagePlaceholder({
  className = "",
  label = "Image",
  icon = "image",
  tone = "light",
  hideLabel = false,
}: ImagePlaceholderProps) {
  const t = TONES[tone];

  return (
    <div
      role="img"
      aria-label={`${label} placeholder`}
      className={`relative flex flex-col items-center justify-center gap-3 overflow-hidden border ${t.surface} ${className}`}
    >
      {/* Subtle dot-grid texture */}
      <div
        className="absolute inset-0 opacity-[0.5] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          color: "rgb(var(--p400) / 0.12)",
        }}
      />

      {/* Diagonal hint that this is a placeholder slot */}
      <div className="absolute top-3 right-3 flex gap-1 pointer-events-none">
        <span className={`w-1.5 h-1.5 rounded-full ${t.dot}`} />
        <span className={`w-1.5 h-1.5 rounded-full ${t.dot}`} />
        <span className={`w-1.5 h-1.5 rounded-full ${t.dot}`} />
      </div>

      <div className={`relative z-10 ${t.icon}`}>
        <PlaceholderIcon kind={icon} className="w-9 h-9" />
      </div>

      {!hideLabel && (
        <span
          className={`relative z-10 text-[11px] font-semibold uppercase tracking-widest ${t.text}`}
        >
          {label}
        </span>
      )}
    </div>
  );
}