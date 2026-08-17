# Build brief — Direct Hire, United Kingdom

Single long-form marketing page for CloudEmployee's UK permanent-recruitment
offer, built on the CE Design System. Covers what exists in the repository
today, how the page is assembled, and what must be resolved before launch.

- **Owner:** Marketing / Web
- **Locale:** en-GB
- **Status:** build complete, guarantee wording and a few integrations pending

---

## 1. What is in the project

Two parallel implementations of the same page, both driven by the same tokens.

| Path | What it is |
| --- | --- |
| `static-site/uk.html` | Static build. Opens directly in a browser, no toolchain. Visually verified. |
| `static-site/index.html` | Static build, US variant of the same page. |
| `static-site/css/tokens.css` | CE Design System tokens — colour ramps, type scale, spacing, radii, elevation, motion. |
| `static-site/css/style.css` | Component and section styles for the static build. |
| `static-site/js/main.js` | GSAP + ScrollTrigger scroll animations, accordion, tabs, modal, scroll progress. |
| `web/` | Next.js (App Router) port of the same page. Never installed or run — treat as an unverified manual port. |
| `static-site/serve.ps1` | Local static server for the plain HTML build. |

The Next.js app splits the page into `components/sections/` (one file per
section), `components/ds/` (design-system primitives) and `lib/content/uk.js`
/ `lib/content/us.js` (every string as data), so the US and UK routes share
components and differ only in content. `web/styles/tokens.css` and
`web/styles/components.css` were intended to carry the static build's tokens
over unchanged, but **have since diverged** — see §5.

---

## 2. Page structure

Nine sections between a sticky navbar and the footer. Every primary CTA opens
the same "Start a search" modal.

| # | Section | Purpose | Notable UI |
| --- | --- | --- | --- |
| 1 | Hero | Positioning claim and primary CTA | Shortlist panel with two candidate cards, three trust checks |
| 2 | Problem | "AI ruined hiring" — why job posts fail | Animated job-post grid with floating profile cards |
| 3 | Explainer (`#how`) | 90-second CEO video | Video placeholder, to be filmed |
| 4 | Process (`#process`) | Three stages, then two stages in detail | Stage cards, live code panel, candidate report card with tabs and scores, funnel table |
| 5 | De-risk band | Four guarantees in one strip | Full-width band, animated on scroll |
| 6 | Differentiators | Four things a recruiter cannot do | Icon-tile feature cards |
| 7 | Pricing (`#pricing`) | Published fee, worked example | Pricing card plus rationale for the up-front payment |
| 8 | FAQ (`#faq`) | Ten questions founders and CTOs ask | Accordion, first item open by default; side card links to chatbot |
| 9 | Closing CTA | Restates the claim, two CTAs | Display heading, fine print |

**Modal:** work email, seniority select, role textarea, weekly-updates
checkbox. Currently front-end only — no submit handler (confirmed in both the
static build and the Next.js port, including its in-progress locale-aware
rewrite of `SearchModal.jsx`).

---

## 3. Design system

Values come from `static-site/css/tokens.css` in the static build. **The
Next.js port's `web/styles/tokens.css` no longer matches** — see §5.

- **Base:** navy ramp, `--navy-1000: #070D18` as page background.
- **Accent (static build):** lime `#D4FF3C`, hover `#DFFF6B`, active `#C2F022`.
- **Accent (Next.js port):** lime `#FCFF3C`, hover `#FDFF6B`, active `#EFF522` —
  a different value than the static build; needs reconciling.
- **Secondary accent:** teal `#4A9B9B`, used for section eyebrows.
- **Type:** Inter for UI and headings, Source Serif 4 italic for emphasis
  inside headings. Loaded from the Google Fonts CDN.
- **Motion:** GSAP with ScrollTrigger. Scroll-progress bar, staggered reveals,
  grid and card entrances, typed code panel, animated progress bars.

---

## 4. Content and assets still required

1. **Explainer video** — Seb Hall, 90 seconds, same framing as the homepage
   explainer. Currently a labelled placeholder (`static-site/uk.html` ~line 154).
2. **Photography** — two hero candidate portraits, two code-panel portraits
   (CE engineer and candidate), one report-card portrait. All are
   `REAL PHOTO` placeholders today.
3. **Chatbot endpoint** — the FAQ side card's "Open chat" button currently
   opens the search modal (`data-open-modal`) instead of a chat UI.
4. **Form handling** — modal submit needs a destination (CRM or email); the
   current handler only sets local "sent" state.

---

## 5. Open items to resolve before launch

- **Guarantee length is inconsistent.** The hero states a 3-month replacement
  guarantee; the de-risk band and closing fine print state 6 months. This
  affects both the UK and US variants. Pick one and reconcile everywhere.
- **Next.js design tokens have drifted from the static build.** `web/styles/tokens.css`
  uses a different lime accent (`#FCFF3C` vs `#D4FF3C`), different hover/active
  values, section-gap (140px vs 155px), eyebrow letter-spacing (1.32px vs
  1.76px), and mobile breakpoint (767px vs 768px) than
  `static-site/css/tokens.css`, despite `web/README.md` claiming they were
  carried over unchanged. Several `border-hairline` rules present in the
  static CSS are also missing from the web CSS.
- **Next.js port is unverified and references a missing source folder.**
  `web/README.md` states Node/npm were never available to install and run it,
  and it also references a `../design_handoff_directhire_us/` directory that
  does not exist in this repo. Run `npm install && npm run dev` in `web/` and
  diff against the static build before treating it as the source of truth.
- **Fonts load from CDN.** Swap for self-hosted or `next/font/local` if
  licensed files are supplied.

Note: earlier drafts of this brief claimed UK localisation (GBP figures, UK
cities), the footer link, and FAQ item 10 were unresolved. On inspection,
none of that is true — `static-site/uk.html` and `web/lib/content/uk.js` are
already fully localised (GBP amounts, Manchester/Bristol, footer correctly
linking to the US page, FAQ item 10 an intentional "do you operate in the US"
cross-sell). No action needed there.

---

## 6. Suggested build order

1. Decide the canonical implementation: static build or Next.js. Do not
   maintain both.
2. Reconcile the guarantee-length wording (3 vs 6 months) across both locales.
3. Reconcile the Next.js token/CSS drift against the static build, or decide
   the Next.js values are the new canonical ones and update the static build
   instead.
4. Wire the modal to its destination and the chatbot to its own trigger.
5. Drop in the video and photography as they arrive.
6. Verify the Next.js build if it is the chosen path, then accessibility and
   responsive passes.
