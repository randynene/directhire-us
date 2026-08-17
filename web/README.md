# CE Direct Hire — US (Next.js)

Next.js (App Router) rebuild of the Claude Design handoff at
`../design_handoff_directhire_us/`, following the structure that handoff's
own README recommends. See `../static-site/` for a plain HTML/CSS/JS build
of the same page if you just want something to open directly in a browser.

## Setup

This machine did not have Node.js/npm installed, so this project has **not**
been installed or run yet. From a machine with Node 18+:

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Structure

- `app/layout.jsx` — global CSS, wraps every route in `ModalProvider` and mounts `<PageAnimations />`. No NavBar/Footer here — those render per-page since each locale has its own copy.
- `app/page.jsx` — the US route (`/`): NavBar + the nine sections + Footer, using `lib/content/us.js`.
- `app/uk/page.jsx` — the UK route (`/uk`): the same sections, same components, fed `lib/content/uk.js` instead. This is the second route the handoff README anticipated ("a UK page exists in the same Figma file... a locale-keyed content module makes that a second route rather than a second build").
- `components/ds/` — the CE Design System primitives (Button, Card, Section, Accordion, forms, etc.), ported from the handoff's `_ds_bundle.js` React source into plain components styled with the CSS in `styles/`.
- `components/sections/` — one file per page section (Hero, Problem, Explainer, Process, Differentiators, Pricing, Faq, ClosingCta). Each takes an optional `content` prop (defaults to `us`) so `app/uk/page.jsx` can reuse them unchanged by passing `content={uk}`.
- `components/SearchModal.jsx` — the "Start a search" modal + `useModal()` context hook used by every CTA.
- `lib/content/us.js`, `lib/content/uk.js` — every string on each locale's page as data. The UK file also carries `explainer.tight: true`, matching the one structural difference in the UK design source: the "How direct hire works" section gets 80px of top padding there instead of the uniform 140px (see `Section`'s `tight` prop).
- `lib/animations/usePageAnimations.js` — the full GSAP + ScrollTrigger spec from the handoff README, run once via `<PageAnimations />` in the root layout using `gsap.context()` with cleanup on unmount.
- `styles/tokens.css`, `styles/components.css` — the design system's tokens and component styles, carried over unchanged from `../static-site/css/`.

## Notes

- Fonts load from the Google Fonts CDN (`styles/tokens.css`), matching the handoff's own `tokens/fonts.css`. Swap for `next/font/local` if licensed font files are supplied later.
- Components are plain JavaScript (`.jsx`), not TypeScript — this was a deliberate choice given there was no way to run `tsc`/`next build` in the environment that generated this code to catch type errors.
- Because this couldn't be run or screenshotted here, treat it as a careful manual port rather than a verified build: run it locally and compare it against `../static-site/index.html`, which *has* been visually verified in a browser, before shipping.
