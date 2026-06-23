# Architecture & Design Decisions

## Template

```
### [YYYY-MM-DD] Decision title
**Decision:** What was decided.
**Why:** Reason / context.
**Alternatives considered:** What else was evaluated.
```

---

## Log

### [2026-06-03] Project initialized
**Decision:** Use Next.js with App Router.
**Why:** Modern approach, built-in server components, better performance defaults.
**Alternatives considered:** Pages Router (legacy), Remix, Vite + React.

### [2026-06-03] Styling — Tailwind CSS v4
**Decision:** Tailwind CSS v4 as the styling foundation, with CSS custom properties as design tokens.
**Why:** Native CSS variable support, utility-first workflow, best-in-class Next.js App Router integration. v4 eliminates the separate `tailwind.config.js` file in favour of CSS-first config.
**Alternatives considered:** CSS Modules, styled-components, vanilla-extract.

### [2026-06-03] Component library — shadcn/ui
**Decision:** shadcn/ui for accessible base components (Button, Accordion, Slider, DropdownMenu, etc.).
**Why:** Full source ownership — components are copied into the repo, not wrapped behind a package. Accessible out of the box. Easy to extend or diverge from.
**Alternatives considered:** Radix UI direct, Headless UI, hand-rolled.

### [2026-06-03] Typography — Inter + Geist Mono
**Decision:** Inter for all display/body text; Geist Mono for monospace (numbered steps, audit references, status labels).
**Why:** Inter is the dominant trust-signal font in serious B2B products. Geist Mono is maintained by Vercel and ships with Next.js font optimisation for zero-CLS loading.
**Alternatives considered:** Geist Sans, DM Sans, custom typeface.

### [2026-06-03] Color — dark hero / light body, trust blue primary
**Decision:** Dark navy foundations for hero/marketing sections; light surfaces for content-heavy sections. Primary accent: `#2563EB` (blue). Success/revenue: emerald. Status badges use color + text (never color alone).
**Why:** Dark hero differentiates RCM Kit from legacy healthcare software (white/grey). Blue is the established trust signal in healthcare and enterprise tech. Emerald pairs intuitively with "revenue recovered."
**Alternatives considered:** All-dark, all-light, teal accent.
