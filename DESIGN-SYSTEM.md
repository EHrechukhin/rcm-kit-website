# RCM Kit — Design System

## Philosophy

**Precision over personality.** Every element earns its place.  
**Trust through control.** The visual language reinforces safety, auditability, human oversight.  
**Data-forward.** Information hierarchy is always about clarity, never decoration.  
**Serious tech — not startup-casual, not enterprise-boring.** The buyers are CFOs and RCM Directors. The product is modern AI. Both truths coexist.

---

## Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Styling | Tailwind CSS v4 | Native CSS variables, utility-first, App Router compatible |
| Components | shadcn/ui | Accessible primitives, full source ownership, no vendor lock-in |
| Font — Display/Body | Inter (`next/font/google`) | Clean, authoritative, dominant in serious B2B products |
| Font — Mono | Geist Mono (`next/font/local`) | Technical details, audit references, numbered steps |
| Icons | Lucide React | Consistent line-weight, tree-shakable |

---

## Color System

### Design approach
Dark foundations for hero/marketing sections (premium, differentiated from legacy healthcare software).  
Light surfaces for content-heavy and data-heavy sections (readability, familiarity for enterprise buyers).

### Palette tokens

```css
:root {
  /* ── Foundations ── */
  --color-base:        #06090F;   /* page bg in dark sections */
  --color-navy:        #0A1628;   /* secondary dark surface */
  --color-navy-mid:    #122044;   /* elevated dark surface, borders */

  /* ── Light surfaces ── */
  --color-surface:     #FFFFFF;
  --color-surface-alt: #F8FAFC;   /* alternating section bg */
  --color-border:      #E2E8F0;   /* light-mode dividers */

  /* ── Primary — Trust blue ── */
  --color-primary-600: #2563EB;
  --color-primary-500: #3B82F6;
  --color-primary-400: #60A5FA;   /* on-dark variant */
  --color-primary-100: #DBEAFE;   /* tint for badges */

  /* ── Success / Revenue — Emerald ── */
  --color-success-600: #059669;
  --color-success-500: #10B981;
  --color-success-100: #D1FAE5;

  /* ── Warning / In Development — Amber ── */
  --color-warning-600: #D97706;
  --color-warning-500: #F59E0B;
  --color-warning-100: #FEF3C7;

  /* ── Roadmap — Slate ── */
  --color-muted-600:   #475569;
  --color-muted-400:   #94A3B8;
  --color-muted-100:   #F1F5F9;

  /* ── Danger ── */
  --color-danger-600:  #DC2626;
  --color-danger-100:  #FEE2E2;

  /* ── Text ── */
  --color-text-primary:   #0F172A;
  --color-text-secondary: #475569;
  --color-text-tertiary:  #94A3B8;
  --color-text-inverse:   #F8FAFC;
  --color-text-inverse-muted: #94A3B8;
}
```

### Semantic agent status colors

| Status | Background | Text | Border |
|--------|-----------|------|--------|
| AVAILABLE | `success-100` | `success-600` | `success-500` |
| IN ACTIVE DEVELOPMENT | `warning-100` | `warning-600` | `warning-500` |
| ON THE ROADMAP | `muted-100` | `muted-600` | `muted-400` |
| FLAGSHIP | `primary-100` | `primary-600` | `primary-500` |

---

## Typography

**Font stack:**
- Display / Body: `Inter, system-ui, sans-serif`
- Mono: `'Geist Mono', 'JetBrains Mono', monospace`

### Type scale

| Token | Size | Line height | Weight | Use |
|-------|------|-------------|--------|-----|
| `display-xl` | 72px / 4.5rem | 1.05 | 700 | Hero headline (desktop) |
| `display-lg` | 56px / 3.5rem | 1.1 | 700 | Hero headline (mobile) |
| `h1` | 48px / 3rem | 1.15 | 700 | Page titles |
| `h2` | 36px / 2.25rem | 1.2 | 600 | Section headings |
| `h3` | 24px / 1.5rem | 1.3 | 600 | Card headings, group titles |
| `h4` | 18px / 1.125rem | 1.4 | 600 | Sub-headings, agent names |
| `overline` | 12px / 0.75rem | 1.5 | 700 | Section labels (PLATFORM, SOLUTIONS) — uppercase, tracked |
| `body-lg` | 18px / 1.125rem | 1.7 | 400 | Lead paragraphs |
| `body` | 16px / 1rem | 1.7 | 400 | Default body copy |
| `body-sm` | 14px / 0.875rem | 1.6 | 400 | Secondary text, card descriptions |
| `caption` | 12px / 0.75rem | 1.5 | 400 | Footnotes, source attribution |
| `mono` | 14px / 0.875rem | 1.5 | 400 | Audit references, code, numbered steps |
| `stat` | 48px / 3rem | 1.1 | 700 | Large metric numbers |

---

## Spacing

4px base unit (Tailwind default). Key breakpoints in the scale used by this site:

| Token | Value | Common use |
|-------|-------|------------|
| `space-1` | 4px | Icon gap, tight padding |
| `space-2` | 8px | Inline spacing |
| `space-3` | 12px | Badge padding |
| `space-4` | 16px | Card inner padding (mobile) |
| `space-6` | 24px | Card inner padding (desktop) |
| `space-8` | 32px | Section element gap |
| `space-12` | 48px | Section vertical padding (mobile) |
| `space-16` | 64px | Section vertical padding (tablet) |
| `space-24` | 96px | Section vertical padding (desktop) |
| `space-32` | 128px | Hero vertical padding |

---

## Layout

**Max content width:** 1280px (`max-w-7xl`)  
**Content column:** 768px (`max-w-3xl`) for long-form text  
**Narrow column:** 640px (`max-w-2xl`) for CTAs, centered sections  
**Gutter:** 24px mobile / 40px desktop (`px-6 lg:px-10`)  
**Grid:** 12-column, gap-6 / gap-8

### Section surface pattern

| Section type | Background | Border/divider |
|-------------|-----------|----------------|
| Dark hero | `base` | none |
| Dark feature | `navy` | `navy-mid` subtle top border |
| Light default | `surface` | none |
| Light alt | `surface-alt` | none |
| Dark CTA | `base` or `navy` | top border `navy-mid` |

Sections alternate: dark hero → light problem/solution content → dark platform features → light agent grid → dark CTA

---

## Elevation & Borders

```css
/* Card on dark bg */
border: 1px solid var(--color-navy-mid);
background: var(--color-navy);
border-radius: 12px;

/* Card on light bg */
border: 1px solid var(--color-border);
background: var(--color-surface);
border-radius: 12px;
box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);

/* Hover elevation */
box-shadow: 0 4px 16px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.06);
```

Border radius scale: `4px` (badges), `8px` (inputs, buttons), `12px` (cards), `16px` (large cards), `full` (pills)

---

## Components

### 1 · Button

Three variants, two sizes.

```
Primary     bg-primary-600 text-white hover:bg-primary-700
Secondary   border border-primary-600 text-primary-600 bg-transparent hover:bg-primary-50
Ghost       text-primary-600 hover:bg-primary-50

On dark:
Primary     bg-primary-500 text-white
Secondary   border border-white/30 text-white hover:bg-white/10
Ghost       text-text-inverse-muted hover:text-white
```

Sizes: `sm` (h-8, px-3, text-sm) · `md` (h-10, px-4, text-sm) · `lg` (h-12, px-6, text-base)  
All buttons: `rounded-lg font-medium transition-colors` — no border-radius extremes, no drop shadows.  
CTA with arrow: `→` inline, no icon component, pure text character.

### 2 · Status Badge

Pill badge for agent status. Uppercase, mono font, tight tracking.

```tsx
<StatusBadge status="AVAILABLE" />
<StatusBadge status="IN_ACTIVE_DEVELOPMENT" />
<StatusBadge status="ON_THE_ROADMAP" />
<StatusBadge status="FLAGSHIP" />
```

Anatomy: `rounded-full px-3 py-0.5 text-xs font-mono font-semibold uppercase tracking-wide`

### 3 · Section Label (Overline)

Thin text that labels a section before the headline. Always uppercase, tracked.

```
PLATFORM  ·  SOLUTIONS  ·  SECURITY & TRUST
```

`text-xs font-mono font-semibold uppercase tracking-[0.15em] text-primary-400` (on dark)  
`text-xs font-mono font-semibold uppercase tracking-[0.15em] text-primary-600` (on light)

### 4 · Card

Two flavors: **FeatureCard** (icon + title + body) and **AgentCard** (agent name + status badge + description).

```
FeatureCard
├── Icon (24px, primary-400 on dark / primary-600 on light)
├── Title (h4)
└── Body (body-sm, text-secondary)

AgentCard
├── StatusBadge
├── AgentName (h4)
├── Description (body-sm)
└── optional: "→" link
```

### 5 · Agent Grid

18 agents across 8 lifecycle groups. Each group has:
- Group number (`01` – `08`) in mono
- Group name (h3)
- Group description (body-sm, text-secondary)
- Grid of AgentCards (2-col on tablet, 3-col on desktop)

### 6 · Step (Numbered Process)

Used for the 5-step agentic execution flow and the 4-step Early Access flow.

```
01 — Ingest
[body text]
```

Number: `font-mono text-5xl font-bold text-primary-600` (or `text-primary-400` on dark), large, left-aligned.  
Title: `h3`, follows immediately.  
A thin vertical rule or subtle connector line links steps in the desktop layout.

### 7 · Stat Block

Large metric with label and source attribution.

```
5–15%
First-pass denial rate
(published RCM industry research)
```

Number: `stat` token, `text-primary-400` on dark / `text-primary-600` on light.  
Label: `body-sm font-medium`.  
Source: `caption text-tertiary italic`.

### 8 · TrustBadge Strip

Horizontal row of inline trust signals.

```
HUMAN-IN-THE-LOOP · AUDITABLE · BUILT FOR HEALTHCARE
```

`text-xs font-mono font-semibold uppercase tracking-[0.12em] text-text-inverse-muted`  
Separator: ` · ` character, not an icon.

### 9 · Navigation

```
Header
├── Logo (left)
├── Nav links (center): Home, Platform, Solutions ▾, Security, Integrations, ROI Estimator
└── CTA (right): Request Early Access →

Solutions dropdown
├── Header: "18 agents. One workforce." + "See all →"
└── 8 lifecycle groups, each with 2–3 agent links
    [Group label] [Agent name] [StatusBadge]
```

Desktop: sticky, `bg-base/90 backdrop-blur-sm border-b border-navy-mid`.  
Mobile: hamburger → full-screen overlay.

### 10 · ROI Estimator Widget

```
[Slider: $20M ──────●────── $800M]
Annual net patient revenue: $150M

Illustrative recovered-revenue band:
≈ $2M – $4M / year

[Illustrative estimate disclaimer]
```

Slider: single-thumb range input, custom styled with primary-600 track fill.  
Output numbers: `stat` token size, emerald (`success-600`).

### 11 · Accordion (FAQ)

`border-b border-border` dividers. No card wrapper — inline list style.  
Chevron rotates 180° on open. Smooth height animation (`grid-rows` trick or `details` element).

### 12 · Integration Logo Grid

Logos in a wrapping flex row, `grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition`.  
On dark bg: `invert` filter for dark logos.

### 13 · Footer

Three-column: Logo + tagline · Nav links · Legal  
`bg-base border-t border-navy-mid text-text-inverse-muted text-sm`

---

## Motion

**Guiding rule:** motion should feel precise and controlled — not decorative. Matches the product's "control-first" positioning.

| Pattern | Duration | Easing |
|---------|----------|--------|
| Color/opacity transitions | 150ms | `ease-in-out` |
| Height/layout animations | 200ms | `ease-in-out` |
| Page transitions (if any) | 300ms | `ease-out` |
| Hover card lift | 200ms | `ease-out` |

No bounce, no spring, no parallax. Reduce motion: respect `prefers-reduced-motion` — all transitions off.

---

## Accessibility

- All color combinations must meet WCAG 2.1 AA (4.5:1 body, 3:1 large text)
- Focus ring: `outline-2 outline-offset-2 outline-primary-500` always visible — never removed, only styled
- All icons are decorative or have `aria-label`; never rely on color alone for status (always pair with text)
- Keyboard navigation: nav dropdown, accordion, slider all operable by keyboard

---

## Tailwind Configuration (tailwind.config.ts sketch)

```ts
import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        base: '#06090F',
        navy: {
          DEFAULT: '#0A1628',
          mid: '#122044',
        },
        primary: {
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          100: '#DBEAFE',
        },
        success: {
          500: '#10B981',
          600: '#059669',
          100: '#D1FAE5',
        },
        warning: {
          500: '#F59E0B',
          600: '#D97706',
          100: '#FEF3C7',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'display-xl': ['4.5rem', { lineHeight: '1.05', fontWeight: '700' }],
        'display-lg': ['3.5rem', { lineHeight: '1.1', fontWeight: '700' }],
        'stat': ['3rem', { lineHeight: '1.1', fontWeight: '700' }],
      },
      maxWidth: {
        content: '1280px',
        prose: '768px',
        narrow: '640px',
      },
    },
  },
} satisfies Config
```

---

## File Structure (planned)

```
src/
├── app/
│   ├── layout.tsx          # fonts, global styles
│   ├── page.tsx            # Home
│   ├── platform/page.tsx
│   ├── solutions/
│   │   ├── page.tsx        # suite overview
│   │   └── [slug]/page.tsx # 18 agent pages
│   ├── security/page.tsx
│   ├── integrations/page.tsx
│   └── roi-estimator/page.tsx
├── components/
│   ├── ui/                 # shadcn base (Button, Accordion, Slider…)
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Section.tsx
│   ├── marketing/
│   │   ├── Hero.tsx
│   │   ├── SectionLabel.tsx
│   │   ├── StatBlock.tsx
│   │   ├── StepList.tsx
│   │   ├── TrustBadgeStrip.tsx
│   │   └── ROIEstimator.tsx
│   └── agents/
│       ├── AgentCard.tsx
│       ├── AgentGrid.tsx
│       ├── LifecycleGroup.tsx
│       └── StatusBadge.tsx
├── lib/
│   └── agents.ts           # agent data, types, status enum
└── styles/
    └── globals.css         # CSS variables, base reset
```

---

## Themes

### Overview

The site supports two full themes — **Light** and **Dark** — plus a third surface context: **Forced Dark**. Forced-dark sections (hero, CTA bands) remain dark regardless of the active theme. This creates structural visual anchors on every page.

```
Light theme + forced-dark hero   →  white body, dark hero, white rest
Dark theme  + forced-dark hero   →  dark body, deeper-dark hero, dark rest
```

Theme is applied via a `.dark` class on `<html>`. Default behaviour: match `prefers-color-scheme`. No manual toggle UI needed for the marketing site (no persistent user preference to save).

---

### Visual Character

#### Light — "Clinical Clarity"
Clean white backgrounds. Deep navy type. Authoritative without being sterile. Feels like Stripe, Linear, or a premium financial platform. The forced-dark hero provides contrast anchors so the page isn't flat white throughout. Blue accent at full saturation — legible, trustworthy.

**Mood:** Boardroom-ready. A CFO can forward a screenshot of this to their team.

#### Dark — "Command Center"
Deep navy base. Cool-blue-tinted surfaces. Text in cool near-white. Accent blue shifted lighter for contrast. The card borders glow subtly against the base. Feels like a well-designed monitoring dashboard or mission-critical ops tool.

**Mood:** The product itself — the AI workforce running in production.

---

### Semantic Token Layer

Components reference semantic tokens only — never raw palette values. The tokens resolve to theme-specific palette values via CSS custom properties.

```
Surface tokens       Text tokens          Interactive tokens
──────────────       ────────────         ──────────────────
--bg-page            --text-primary       --accent
--bg-surface         --text-secondary     --accent-hover
--bg-elevated        --text-tertiary      --accent-subtle-bg
--bg-subtle          --text-on-accent     --accent-subtle-text
--bg-overlay         --text-link          --accent-subtle-border
                     --text-link-hover
Border tokens
──────────────       Status tokens (semantic)
--border-default     --status-success          (icon, checkmark)
--border-strong      --status-success-bg       (badge bg)
--border-subtle      --status-success-text     (badge text)
                     --status-success-border   (badge border)
                     (same for: warning, muted)

Forced-dark tokens (constant across both themes)
─────────────────────────────────────────────────
--fd-bg              --fd-text
--fd-surface         --fd-text-secondary
--fd-border          --fd-accent
--fd-border-subtle   --fd-accent-subtle-bg
                     --fd-accent-subtle-text
```

---

### Token Values

#### Light theme (`:root`)

```css
:root {
  /* ── Surfaces ── */
  --bg-page:             #FFFFFF;
  --bg-surface:          #FFFFFF;
  --bg-elevated:         #F8FAFC;
  --bg-subtle:           #F1F5F9;
  --bg-overlay:          rgba(15, 23, 42, 0.5);

  /* ── Borders ── */
  --border-default:      #E2E8F0;
  --border-strong:       #CBD5E1;
  --border-subtle:       #F1F5F9;

  /* ── Text ── */
  --text-primary:        #0F172A;
  --text-secondary:      #475569;
  --text-tertiary:       #94A3B8;
  --text-on-accent:      #FFFFFF;
  --text-link:           #2563EB;
  --text-link-hover:     #1D4ED8;

  /* ── Accent (blue) ── */
  --accent:              #2563EB;
  --accent-hover:        #1D4ED8;
  --accent-subtle-bg:    #DBEAFE;
  --accent-subtle-text:  #1E40AF;
  --accent-subtle-border:#BFDBFE;

  /* ── Success / Available / Revenue ── */
  --status-success:             #059669;
  --status-success-bg:          #D1FAE5;
  --status-success-text:        #065F46;
  --status-success-border:      #A7F3D0;

  /* ── Warning / In Development ── */
  --status-warning:             #D97706;
  --status-warning-bg:          #FEF3C7;
  --status-warning-text:        #92400E;
  --status-warning-border:      #FDE68A;

  /* ── Muted / Roadmap ── */
  --status-muted:               #64748B;
  --status-muted-bg:            #F1F5F9;
  --status-muted-text:          #475569;
  --status-muted-border:        #E2E8F0;

  /* ── Shadows (light only) ── */
  --shadow-card:     0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
  --shadow-elevated: 0 4px 16px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.06);
  --shadow-dropdown: 0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06);
}
```

#### Dark theme (`.dark`)

```css
.dark {
  /* ── Surfaces ── */
  --bg-page:             #06090F;
  --bg-surface:          #0A1628;
  --bg-elevated:         #0F1F3D;
  --bg-subtle:           #0F1F3D;
  --bg-overlay:          rgba(0, 0, 0, 0.70);

  /* ── Borders ── */
  --border-default:      #1A2E54;
  --border-strong:       #1E3A6A;
  --border-subtle:       #0F1F3D;

  /* ── Text ── */
  --text-primary:        #F1F5F9;
  --text-secondary:      #94A3B8;
  --text-tertiary:       #475569;
  --text-on-accent:      #FFFFFF;
  --text-link:           #60A5FA;
  --text-link-hover:     #93C5FD;

  /* ── Accent (blue — lighter for dark bg) ── */
  --accent:              #3B82F6;
  --accent-hover:        #60A5FA;
  --accent-subtle-bg:    #1E3A6A;
  --accent-subtle-text:  #93C5FD;
  --accent-subtle-border:#1D4ED8;

  /* ── Success ── */
  --status-success:             #10B981;
  --status-success-bg:          #064E3B;
  --status-success-text:        #6EE7B7;
  --status-success-border:      #065F46;

  /* ── Warning ── */
  --status-warning:             #F59E0B;
  --status-warning-bg:          #451A03;
  --status-warning-text:        #FCD34D;
  --status-warning-border:      #78350F;

  /* ── Muted ── */
  --status-muted:               #64748B;
  --status-muted-bg:            #1E293B;
  --status-muted-text:          #94A3B8;
  --status-muted-border:        #334155;

  /* ── Shadows (dark: border-based, no drop shadows) ── */
  --shadow-card:     none;
  --shadow-elevated: none;
  --shadow-dropdown: none;
}
```

#### Forced-dark tokens (constant in both themes)

```css
:root, .dark {
  /* Hero, CTA bands, nav on scroll — always this surface */
  --fd-bg:                  #06090F;
  --fd-surface:             #0A1628;
  --fd-border:              #122044;
  --fd-border-subtle:       #0A1628;
  --fd-text:                #F1F5F9;
  --fd-text-secondary:      #94A3B8;
  --fd-accent:              #60A5FA;
  --fd-accent-subtle-bg:    #1E3A6A;
  --fd-accent-subtle-text:  #93C5FD;
}

/* Deeper base in dark mode so forced-dark sections feel distinct */
.dark {
  --fd-bg:        #030508;
  --fd-surface:   #06090F;
  --fd-border:    #0A1628;
}
```

---

### Section Surface System

Every `<Section>` component accepts a `surface` prop. This drives both background and which token set children resolve to.

| `surface` | Light bg | Dark bg | Token context |
|-----------|----------|---------|---------------|
| `page` (default) | `--bg-page` | `--bg-page` | standard |
| `alt` | `--bg-elevated` (`#F8FAFC`) | `--bg-elevated` (`#0F1F3D`) | standard |
| `forced-dark` | `--fd-bg` (`#06090F`) | `--fd-bg` (`#030508`) | forced-dark |

```tsx
<Section surface="forced-dark">   {/* hero, CTA bands */}
<Section surface="page">          {/* default white/dark */}
<Section surface="alt">           {/* alternating tint */}
```

Typical page rhythm for every route:
```
forced-dark   Hero
page          The Problem / content
alt           Platform overview / feature list
page          Agent grid or stats
forced-dark   CTA band
page          FAQ
forced-dark   Footer
```

---

### Card Strategy per Theme

| Context | Light | Dark |
|---------|-------|------|
| Card on `page` surface | `bg-white` border `--border-default` shadow `--shadow-card` | `bg-[--bg-surface]` border `--border-default` no shadow |
| Card on `alt` surface | `bg-white` border `--border-default` shadow `--shadow-card` | `bg-[--bg-elevated]` border `--border-default` no shadow |
| Card on forced-dark | `bg-[--fd-surface]` border `--fd-border` no shadow | `bg-[--fd-surface]` border `--fd-border` no shadow |

In dark mode, elevation is expressed through **border brightness**, not box shadows. `--border-default` → `--border-strong` = one level of elevation.

---

### Typography Adjustments per Theme

| Property | Light | Dark |
|----------|-------|------|
| Body font-weight | 400 | 400 |
| Heading font-weight | 700 / 600 | 600 / 500 (slightly lighter renders crisper on dark) |
| Overline letter-spacing | `0.15em` | `0.15em` |
| Caption color | `--text-tertiary` = `#94A3B8` | `--text-tertiary` = `#475569` |
| Mono code/step numbers | `--text-secondary` | `--text-secondary` |

Headings in dark mode can drop one weight step (`700→600`, `600→500`) because dark backgrounds make heavy strokes feel heavier than they are. Apply via `dark:font-semibold` on elements that are `font-bold` by default.

---

### Logo & Image Treatment

| Asset type | Light | Dark |
|-----------|-------|------|
| Dark-on-light integration logos | As-is | `filter: invert(1)` |
| Light-on-dark integration logos | `filter: invert(1)` | As-is |
| SVG icons (Lucide) | `color: --text-secondary` | `color: --text-secondary` |
| Accent icons | `color: --accent` | `color: --accent` |

Recommended: ship logos in SVG with `currentColor` fill where possible — they inherit the correct color from context without filter hacks.

---

### globals.css Structure

```css
/* src/styles/globals.css */

@import "tailwindcss";

/* ── 1. Raw palette (never used in components directly) ── */
@layer base {
  :root {
    /* ... all --color-* palette tokens ... */
  }
}

/* ── 2. Semantic light tokens ── */
@layer base {
  :root {
    /* ... --bg-*, --text-*, --accent-*, --status-*, --shadow-*, --fd-* ... */
  }
}

/* ── 3. Semantic dark tokens ── */
@layer base {
  .dark {
    /* ... overrides ... */
  }
}

/* ── 4. System preference default ── */
@layer base {
  @media (prefers-color-scheme: dark) {
    :root:not(.light) {
      /* same overrides as .dark */
    }
  }
}

/* ── 5. Base resets ── */
@layer base {
  * { box-sizing: border-box; }
  html { color-scheme: light dark; }
  body {
    background-color: var(--bg-page);
    color: var(--text-primary);
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;
  }
  /* Theme transition — applies only when switching themes, not on initial load */
  .theme-transition,
  .theme-transition * {
    transition: background-color 200ms ease-in-out,
                border-color 200ms ease-in-out,
                color 150ms ease-in-out;
  }
}
```

---

### Tailwind v4 Integration

In Tailwind v4, CSS variables are referenced directly in utilities. The `tailwind.config.ts` maps semantic tokens into Tailwind's theme so classes like `bg-surface`, `text-secondary`, `border-default` are available.

```css
/* In globals.css — Tailwind v4 theme extension */
@theme {
  --color-bg-page:            var(--bg-page);
  --color-bg-surface:         var(--bg-surface);
  --color-bg-elevated:        var(--bg-elevated);
  --color-bg-subtle:          var(--bg-subtle);

  --color-border-default:     var(--border-default);
  --color-border-strong:      var(--border-strong);

  --color-text-primary:       var(--text-primary);
  --color-text-secondary:     var(--text-secondary);
  --color-text-tertiary:      var(--text-tertiary);
  --color-text-link:          var(--text-link);

  --color-accent:             var(--accent);
  --color-accent-hover:       var(--accent-hover);

  --color-fd-bg:              var(--fd-bg);
  --color-fd-surface:         var(--fd-surface);
  --color-fd-border:          var(--fd-border);
  --color-fd-text:            var(--fd-text);
  --color-fd-text-secondary:  var(--fd-text-secondary);
  --color-fd-accent:          var(--fd-accent);

  /* Status */
  --color-success:            var(--status-success);
  --color-success-bg:         var(--status-success-bg);
  --color-success-text:       var(--status-success-text);
  --color-warning:            var(--status-warning);
  --color-warning-bg:         var(--status-warning-bg);
  --color-warning-text:       var(--status-warning-text);
  --color-muted:              var(--status-muted);
  --color-muted-bg:           var(--status-muted-bg);
  --color-muted-text:         var(--status-muted-text);
}
```

Usage in components:
```tsx
// Before (raw palette — avoid)
<div className="bg-white dark:bg-[#0A1628] border-slate-200 dark:border-[#1A2E54]">

// After (semantic — correct)
<div className="bg-surface border-border-default">

// Forced-dark section (always dark)
<section data-surface="forced-dark" className="bg-fd-bg border-fd-border">
  <h1 className="text-fd-text">...</h1>
  <p className="text-fd-text-secondary">...</p>
</section>
```

---

### WCAG Contrast Verification

All text/background combinations must clear AA. Critical pairs:

| Token pair | Light ratio | Dark ratio | AA? |
|-----------|-------------|------------|-----|
| `text-primary` on `bg-page` | 18.1:1 | 15.3:1 | ✓ AAA |
| `text-secondary` on `bg-page` | 7.0:1 | 4.6:1 | ✓ AA |
| `text-tertiary` on `bg-page` | 3.9:1 | 3.1:1 | ✓ AA (large text) |
| `accent` on `bg-page` | 5.9:1 | 3.1:1 (large text) | ✓ AA |
| `fd-text` on `fd-bg` | — | 15.3:1 | ✓ AAA |
| `fd-text-secondary` on `fd-bg` | — | 4.6:1 | ✓ AA |
| `status-success-text` on `status-success-bg` | 7.1:1 | 5.8:1 | ✓ AA |
| `status-warning-text` on `status-warning-bg` | 6.9:1 | 5.2:1 | ✓ AA |

*Ratios are approximations — verify with browser DevTools or a contrast checker before shipping.*

---

## Open Decisions

| # | Question | Options | Status |
|---|----------|---------|--------|
| 1 | Theme toggle UI | None — follow `prefers-color-scheme` only (recommended) vs add manual toggle in header | Open |
| 2 | Animation library | CSS transitions only (recommended) vs Framer Motion | Open |
| 3 | shadcn/ui vs fully custom | shadcn/ui (recommended) vs hand-rolled | Open |
