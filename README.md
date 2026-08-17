# Handoff: CloudEmployee Direct Hire — US landing page

## Overview

A single long-form marketing page for CloudEmployee's US **direct hire** service —
permanent placement of senior software engineers. The page argues one case (engineers
should be interviewed by engineers) and drives one action ("Start a search").

Target stack for the rebuild: **Next.js (App Router) + GSAP**.

## About the design files

The files in this bundle are **design references created in HTML**. They are
prototypes showing intended look, motion and behaviour — not production code to copy
verbatim. The task is to **recreate this design in a Next.js codebase** using proper
components, real routing, and the design system's tokens.

`Direct Hire Website - US.dc.html` is a live, scrollable prototype: open it in a
browser to see every animation, hover state and responsive breakpoint working. Treat
it as the spec of record for anything this README leaves ambiguous.

## Fidelity

**High-fidelity.** Colours, typography, spacing and interactions are final and were
transcribed from the source Figma file (`Direct_Hire_Website.fig`, page
`Direct-Hire-US`, one 1920×7873 frame). Rebuild pixel-accurately.

Two deliberate deviations from the Figma source, both approved in the design review:

1. **No section divider hairlines.** The Figma separates sections with 1px `#22314D`
   rules; the approved build removes all 1px borders (`[data-dh] * { border-width: 0 }`).
   Sections are separated by whitespace alone.
2. **Section rhythm is a uniform 140px.** Figma uses ~98px section padding with 155px
   between major blocks. The approved build normalises every boundary to a single
   140px gap: each section owns the space **above** it and adds none below. At
   <768px this compresses to 72px.

## Design system

The page is built entirely from the **CE Design System**, included at
`_ds/ce-design-system-2494c29e-0601-40ac-92aa-9a4dbc92b9b2/`.

- `tokens/*.css` — colours, typography, spacing, layout, elevation, motion. Port
  these into the Next.js app as global CSS custom properties; do not hardcode values.
- `_ds_bundle.js` — 45 React primitives (UMD, mounted on
  `window.CEDesignSystem_2494c2`). In Next.js, port these to proper ES modules under
  `components/ds/` rather than loading the UMD bundle.
- `readme.md` — the design system's own documentation.

**Build every UI element from these primitives.** Do not restyle raw HTML to imitate
them, and do not introduce components the system doesn't define.

### Primitives used on this page

```
brand/       Wordmark · Eyebrow · SectionHeading
layout/      Container · Section
core/        Button · NavLink · Tag · AnnotationBadge · CheckItem · IconTile
             ProgressBar · Icon
navigation/  NavBar · Footer · Tabs · DeRiskBand
cards/       Card · FeatureCard · StageCard · CandidateCard · ShortlistPanel
             FloatingProfileCard · AvatarPlaceholder · Callout
data/        PricingCard · PriceRow · FunnelTable · ReportCard · ScoreRow
media/       VideoPlaceholder · CodePanel · JobPostGrid
disclosure/  Accordion · AccordionItem
forms/       Field · Input · Textarea · Select · Checkbox · Modal
```

## Design tokens

### Colour

| Token | Value | Use |
| --- | --- | --- |
| `--navy-950` | `#070D18` | Page ground |
| `--lime-500` | `#D4FF3C` | The single accent — kickers, primary button, checks, serif emphasis |
| `--lime-hover` | `#DFFF6B` | Hover |
| `--lime-active` | `#C2F022` | Press |
| `--teal-500` | `#4A9B9B` | A strong score |
| `--amber-500` | `#C8862A` | A caveat, an unfinished slot |
| `--red-500` | `#E4646A` | Live indicator |
| `--text-primary` | white (~19:1) | Headings |
| `--text-body` | `#B8C2D1` (~9.6:1) | Body |
| `--text-muted` | (~4.9:1) | Supporting copy, 15px+ only |
| `--text-subtle` | (~3.3:1) | Annotations, disabled only |
| `--border-hairline` | `#22314D` | Inset card hairlines (removed on this build) |

The lime is **rationed**. It appears on kickers, the primary button, checks, the
serif emphasis clause, and the outcome row of the funnel table — nowhere else.

### Type

Inter in four weights for everything. **Source Serif 4 Italic** for exactly one
clause per heading, always lime (the `emphasis` prop on `SectionHeading`).

| Role | Size | Tracking |
| --- | --- | --- |
| h1 / display | 60px | −1.68px |
| h2 | 44px | −1.232px |
| h3 / h4 | per `tokens/typography.css` | |
| lead | 19.5px | line-height 1.55–1.6 |
| body | 15.5–17px | |
| eyebrow | 11px (16px in hero) | +1.32px, uppercase |
| caption | 13.5px min | |

Sentence case everywhere except uppercase kickers and annotation chips. Headings take
full stops. Never set below 9px, and 9px is reserved for placeholder captions.

### Layout & shape

- 1180px container centred, 32px gutters → 1116px of content.
- Card rows: 22px gap. Section rhythm: 140px (72px under 768px).
- Radius: 4px chips · 10–12px inline panels · 16px rows · 18px media · 20px cards ·
  22px hero-scale cards · full pill for every control.
- Card padding: 29px standard · 35px pricing · 23px compact shortlist panel.
- Control heights 58.39 / 52 / 46.39px — all above the 44px touch minimum.
- **Border-first system.** Only the two `FloatingProfileCard`s carry a shadow:
  `0 16px 40px rgba(7,13,24,.85)` plus a `0 0 0 6px rgba(7,13,24,.5)` halo.
- Header: 71px, fixed, `rgba(7,13,24,0.92)` over `blur(10px)`. Nothing else is pinned.

## Sections, in document order

Each is a `<Section>` with `eyebrow`, `title`, `emphasis` (the lime serif clause),
and optional `lead`.

### 1. Hero — `#top`
Two columns: `minmax(440px,552px) 1fr`, 96px gap, `align-items: start`.
Padding `155px 0 0`.

- Left: `Eyebrow size="lg"` "Direct hire — United States" · `SectionHeading as="h1"`
  "Hire US engineers / vetted by *engineers*" (line break preserved via
  `white-space: pre-line`) · lead paragraph · two `Button`s ("Start a search" primary,
  "How it works" secondary → `#how`) · three `CheckItem`s.
- Right: `ShortlistPanel` (offset `margin-top: 102px`), badge "2 profiles", two
  `CandidateCard`s (Senior AI Engineer, Austin TX · 9 yrs, $175,000 · Senior
  Full-Stack Engineer, Denver CO · 7 yrs, $160,000), footnote, and an
  `AnnotationBadge` reading "Illustrative".

### 2. "AI ruined hiring"
Two columns `1fr 508px`, 96px gap. Teal eyebrow.
Heading "Its easy to get 500 applicants in a week." (verbatim from Figma, including
the missing apostrophe — **do not correct it**).
Right column: `JobPostGrid` at 16×10 = 160 cells, label "What a job post gets you",
with two `FloatingProfileCard`s overlapping upward (`margin-top: -120px`) and a lime
"WHAT WE SEND" caption.

### 3. Explainer — `#how`
Eyebrow "90 seconds". `VideoPlaceholder` (Seb Hall, CEO & Co-Founder) with an
`AnnotationBadge` "Video slot — to film". Caption row below: attribution left, a lime
"Prefer to read? The three stages →" link right → `#process`.

### 4. Process — `#process`
Vertical stack, 44px gap:
1. Three `StageCard`s (01 Tell us what you need · 02 Interviewed by Engineers ·
   03 You pick. They start.), 22px gap.
2. **Stage 02 in practice** — `554px 1fr`: `CodePanel` (9 lines of Go-ish batch code
   plus two `AvatarPlaceholder` rail tiles marked "REAL PHOTO") beside copy
   "A person watching them think".
3. **Stage 03 in practice** — `1fr 510px`: copy "The report you get on both" beside
   `ReportCard` with three `ScoreRow`s (Coding test 88%, Interview 82% "Strong",
   Front-end 46% "Fair" `tone="caution"`) and a `Callout` footer.
4. `FunnelTable` — 5 rows: 100+ → ~40 → ~15 → ~6 → **2** ("You interview both. You
   hire one.", the lime outcome row).

### 5. `DeRiskBand`
Four items: no fee unless you hire · 6-month replacement guarantee · weekly updates ·
off-limits in writing. `margin-top: 140px`.

### 6. Differentiators
Eyebrow "Engineers should hire engineers". Four `FeatureCard`s in a 2×2 grid, 22px
gap, icons `code-brackets` / `check` / `arrow-right` / `shield`.

### 7. Pricing — `#pricing`
`573px 1fr`, 57px gap. `PricingCard` with three `PriceRow`s ($35,000 → −$3,000 →
**$32,000** emphasised) and a footnote. Right: "Why we ask for $3,000 up front" plus
three `CheckItem`s.

### 8. FAQ — `#faq`
`381px 1fr`, 88px gap. Left: a `Card` "Not answered here?" with an "Open chat"
button. Right: `Accordion`, 10 items, first open by default. Questions are written as
complaints, verbatim from the Figma.

### 9. Closing CTA
Centred. `SectionHeading size="display" align="center"` — "Two engineers. One hire."
with emphasis "Both interviewed by engineers." Two buttons, then fine print
"$3,000 to start, credited to the fee · 6-month replacement guarantee".

### 10. `Footer`
Left "© 2026 CloudEmployee. Direct hire — United States." Right "Also available:
permanent recruitment in the UK".

## Interactions & behaviour

### Modal
Every "Start a search" / "Book a call" / "Open chat" opens one `Modal`
(`role="dialog"`, `aria-modal`, Escape closes). Body: work email `Input`, seniority
`Select` (Mid / Senior / Staff / Principal), role `Textarea`, a `Checkbox` for weekly
updates. On submit the modal swaps to a confirmation state — title "Thanks — we'll be
in touch", three `CheckItem`s, single Close button. No real submission is wired;
point it at your form endpoint.

### ReportCard tabs
`Tabs` with `role="tablist"` / `aria-selected`, controlled state, default "Overview".

### Accordion
Real `<button>`s with `aria-expanded`; plus/minus icon toggle.

### Scroll progress
A 2px lime bar fixed at `top: 71px`, `transform: scaleX()` scrubbed against total
scroll. Hidden under 768px.

## GSAP animation spec

All animation is authored with **GSAP 3.12 + ScrollTrigger**. Register ScrollTrigger
once; in Next.js use `gsap.context()` inside `useEffect` (or `useGSAP`) per component
and revert on unmount.

Global defaults: `ease: 'power3.out'`. Reveal triggers use
`toggleActions: 'play none none none'` — play once, never reverse.

### Critical implementation note

In the prototype the design system mounts asynchronously, so ScrollTrigger instances
built too early computed against a short page and fired instantly. The prototype
solves this by deferring **all** scroll animation until `window.load` + `document.fonts.ready`
+ eight consecutive stable `document.body.scrollHeight` samples, then calling
`ScrollTrigger.refresh()`.

**In Next.js this workaround is unnecessary and should be dropped** — components mount
synchronously. Just call `ScrollTrigger.refresh()` after fonts load and after any
image or embed settles.

### Page load (timeline, 0.1s delay)
| Target | From | Duration | At |
| --- | --- | --- | --- |
| header | `y: -24, opacity: 0` | 0.7 | 0 |
| hero copy children | `y: 28, opacity: 0`, stagger 0.075 | 0.85 | 0.15 |
| shortlist panel | `y: 44, opacity: 0, scale: 0.985` | 1.0 | 0.35 |
| candidate cards | `y: 14, opacity: 0`, stagger 0.09 | 0.6 | 0.7 |

### Scroll-triggered
| Element | Animation | Start |
| --- | --- | --- |
| Generic reveals | `y: 34, opacity: 0`, stagger 0.08, 0.85s | `top 86%` |
| Section headers | children `y: 26, opacity: 0`, stagger 0.1, 0.75s | `top 88%` |
| Applicant grid cells | `opacity: 0, scale: 0.55`, 0.5s, stagger `{each: 0.004, from: 'random'}` | `top 82%` |
| Grid cells (dim) | `opacity: 0.45` scrubbed | `top 45%` → `bottom 60%` |
| Grid wrapper | `yPercent: -6` parallax, scrub 0.6 | across viewport |
| Floating profile cards | `y: 34, opacity: 0, scale: 0.94`, stagger 0.13 | `top 92%` |
| Video panel | `clipPath` `inset(0 0 100% 0)` → `inset(0)`, 1.1s `power4.out`; inner `scale: 1.08` → 1, 1.4s | `top 82%` |
| Stage cards | `y: 46, opacity: 0`, stagger 0.12 | `top 84%` |
| Code panel lines | `x: -12, opacity: 0`, stagger 0.055 | `top 78%` |
| Report bars | `scaleX: 0` from `0% 50%`, 1.1s, stagger 0.14 | `top 78%` |
| Report percentages | count up 0 → value, 0.9s | `top 78%` |
| Funnel table | timeline: panel `y: 34`, then per row `y: 14, opacity: 0` + bar `scaleX: 0` (0.85s) + value count-up, offset `0.18 + i*0.11` | `top 78%` |
| De-risk items | `y: 16, opacity: 0`, stagger 0.09 | `top 92%` |
| Feature cards | `y: 40, opacity: 0`, stagger 0.1 | `top 84%` |
| Pricing card | `y: 44, opacity: 0`; price `scale: 0.9` `back.out(1.6)` | `top 84%` |
| FAQ buttons | `y: 22, opacity: 0`, stagger 0.06 | `top 86%` |
| Closing heading | `clipPath` `inset(0 0 100% 0)` → `inset(0 0 -12% 0)` + `y: 26`, 1.1s `power4.out` | `top 88%` |

**Rejected during review — do not reintroduce:** a pinned scroll-scrub on the funnel
table. It read as messy; the plain staggered reveal above replaced it.

### Micro-interactions (CSS, from `tokens/motion.css`)
80–320ms on colour, background and ring only, `cubic-bezier(0.4, 0, 0.2, 1)`.
Hover lifts lime to `#DFFF6B`, nav grey to white; press drops to `#C2F022`. Outline
and ghost controls hover on a 4% white wash. **Nothing scales or translates on press.**

### Reduced motion
`prefers-reduced-motion: reduce` skips GSAP entirely (all elements at rest) and every
CSS duration token collapses to 0. Non-negotiable.

## State

| State | Purpose |
| --- | --- |
| `modalOpen` | Modal visibility |
| `sent` | Modal form vs. confirmation |
| `updates` | Weekly-updates checkbox |
| `tab` | `ReportCard` active tab, default "Overview" |

Three prototype-only tweak props (`motionLevel`, `showAnnotations`, `accentColor`)
exist for design review. `showAnnotations` is worth keeping as a build flag so the
"Illustrative" / "Video slot" chips can be switched off at launch; the other two can
be dropped.

## Responsive

| Breakpoint | Behaviour |
| --- | --- |
| ≥1281px | As authored. 1180px container, 3-across cards, 2-column splits. |
| 1024–1280px | h1 48px, h2 36px. Hero and section splits → `1fr 1fr`, 44–56px gaps. Stage cards 2-across. |
| 768–1023px | All grids single column, 40px gap. Media panels full width. Shortlist panel drops below hero copy (`margin-top: 0`). Code panel reorders below its copy. |
| <768px | h1 38px, h2 30px, lead 17px. Gutters 20px, card padding 20px. Section rhythm 72px. Hero padding `104px 0 64px`. Nav keeps wordmark + CTA, hides links. Scroll progress bar hidden. |

## Accessibility

- Focus: 2px lime outline at 2px offset on every focusable element, set once in
  `tokens/base.css`. **Never remove it.**
- `--text-muted` only at 15px+; `--text-subtle` for annotations and disabled only.
- The lime `Badge` label sets `--text-muted` on lime (~2.6:1) — inherited from the
  Figma. Override the colour whenever that label carries meaning.
- `JobPostGrid` is decorative: `aria-hidden`. `Icon` is `aria-hidden` unless titled.
- `ProgressBar` carries value and label. Semantic headings throughout — one `h1`.

## Assets

**The design ships no bitmaps, and that is deliberate.**

- **No photography.** Every photo slot is a diagonally-striped navy tile labelled
  "REAL PHOTO" in 9px grey capitals (`AvatarPlaceholder`). Supply real photography or
  leave the marked slot visible. **Do not substitute stock, illustration, or generated
  portraits.**
- **No video.** The explainer is a `VideoPlaceholder` marked "VIDEO SLOT — TO FILM".
- **No logo file.** `Wordmark` is a 17px circle with a 2px lime inset ring beside the
  name in Inter Semi Bold. Replace the ring if a real mark exists.
- **Icons:** six SVGs in the design system, outline-expanded. No icon font, no library.
- **Fonts:** Inter and Source Serif 4 from Google Fonts (`tokens/fonts.css`) — no
  binaries were in the Figma. Swap to `next/font/local` if licensed copies exist.

## Suggested Next.js structure

```
app/
  layout.tsx              # fonts, token CSS imports, <NavBar>, <Footer>
  page.tsx                # composes the ten sections
components/
  ds/                     # CE Design System primitives, ported to ES modules
  sections/
    Hero.tsx  Problem.tsx  Explainer.tsx  Process.tsx  DeRisk.tsx
    Differentiators.tsx  Pricing.tsx  Faq.tsx  ClosingCta.tsx
  SearchModal.tsx
lib/
  animations/             # one module per section's GSAP timeline
  content/us.ts           # all copy as data — the UK page reuses the components
styles/tokens/            # colors · typography · spacing · layout · elevation · motion
```

Keep copy in `lib/content/` rather than inline in JSX: a **UK page** exists in the
same Figma file and reuses this structure with different copy, so a locale-keyed
content module makes that a second route rather than a second build.

Mark section components `'use client'` where they own GSAP; keep everything else a
server component.

## Copy

Every string is final and was transcribed from the Figma. **Do not rewrite, tighten,
or fix it** — including "Its easy to get 500 applicants in a week." Pull the exact
strings from the prototype's `renderVals()` (FAQ items, funnel rows, guarantees, code
panel lines) rather than retyping them.

## Files in this bundle

| File | What it is |
| --- | --- |
| `Direct Hire Website - US.dc.html` | The full interactive prototype — spec of record |
| `_ds/…/styles.css` | Design system entry stylesheet (imports only) |
| `_ds/…/tokens/*.css` | All design tokens |
| `_ds/…/_ds_bundle.js` | The 45 primitives (UMD) — port to ES modules |
| `_ds/…/readme.md` | Design system documentation |
