# Tasks

## In Progress

_Nothing yet._

## Backlog

### Design Improvements — Non-standard sections & transitions

#### Нові секції

- [ ] **Pinned Agents Scroll** — 18 агентів у sticky-списку зліва, деталі активного агента справа при скролі (`useScroll` + `useTransform`)
- [ ] **Animated Claim Journey** — SVG-схема шляху claim: Submit → Eligibility → Coding → Payer → ERA → Reconcile. Частинки летять по SVG-path, denial-вузли — червоним
- [ ] **Before / After Timeline** — горизонтальні progress bar-и "До RCM Kit" (45 днів, червоний) vs "Після" (12 днів, зелений), анімуються при вході у viewport
- [ ] **Live Metrics Bar** — вузька смуга після Hero: claims processed today · denial rate · avg recovery. Числа "крутяться" при mount

#### Переходи між секціями

- [ ] **Clip-path diagonal reveal** — наступна секція відкривається по діагоналі. `clip-path: polygon()` анімується через Framer Motion при вході у viewport
- [ ] **SVG wave separator** — замість прямої `border-t` між секціями — органічна SVG-хвиля з parallax-зміщенням при скролі
- [ ] **Curved mask zoom** — секція Timeline починається як мале заокруглене вікно в центрі і розширюється на весь екран при скролі (`border-radius` + `scale`)

### Порядок реалізації (пріоритет)

1. Pinned Agents Scroll
2. Clip-path diagonal transition
3. Animated Claim Journey (SVG flow)
4. SVG wave separators
5. Before / After Timeline

---

## Done

_Nothing yet._
