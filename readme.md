# CE Design System

The design system for **CloudEmployee Direct Hire** — a permanent-placement service
for senior software engineers. The product represented here is a single surface: a
long-form marketing site that argues one case, that engineers should be interviewed
by engineers, and asks the reader to start a search.

Everything in this project is derived from one source.

## Sources

| Source | Detail |
| --- | --- |
| `Direct_Hire_Website.fig` | Attached Figma file, mounted read-only. Two pages: `Direct-Hire-US` (node `0:1`) and `Direct-Hire-UK` (node `1:1039`). Each holds one 1920×7873 frame — the complete landing page. |
| Figma Variables | Four variables in one ungrouped collection (`brand/navy-950`, `text/primary`, `font family/Font 1`, `line height/25`), materialised to `tokens/figma/fig-tokens.css`. |
| Figma text styles | None defined. The type scale in `tokens/typography.css` was transcribed value-by-value from the frames. |

No codebase, repository or deck was supplied. No live URL was given, so nothing here
was checked against a production site.

The file's own working annotations were preserved rather than resolved: amber
"ILLUSTRATIVE", "VIDEO SLOT — TO FILM" and "REAL PHOTO" markers appear in the
components and UI kit because they appear in the source, and because the file
explicitly instructs that the sample people are not real placements.

## What is in this project

| Path | What it holds |
| --- | --- |
| `styles.css` | The one file consumers link. `@import`s only. |
| `tokens/` | `colors` · `typography` · `spacing` · `layout` · `elevation` · `motion` · `fonts` · `base`, plus `figma/` for the materialised Variables. |
| `components/` | 45 React primitives in nine groups. Full list below. |
| `ui_kits/direct-hire-website/` | Interactive recreation of the landing page, US and UK. |
| `guidelines/` | 18 foundation specimen cards. |
| `assets/icons/` | Six SVGs exported verbatim from the file. |
| `SKILL.md` | Agent-skill entry point. |

---

## CONTENT FUNDAMENTALS

The copy is the strongest thing in this file, and it has a clear method.

**It addresses the reader as "you" and speaks as "we".** "Permanent hires, on your
payroll." "We go and find people." There is no third-person corporate voice
anywhere. The company is never called "CloudEmployee" in body copy — only in the
wordmark and the footer.

**It leads with a number, then defends it.** "Two engineers. One hire." "25% of
first-year base salary." "100+ sourced. Two profiles." Numbers arrive before
adjectives, and every number on the page is followed by a sentence explaining how it
was arrived at.

**It names the objection and answers it in the customer's own words.** The FAQ
questions are written as complaints, not as questions a marketer would invent: "Two
candidates? Other recruiters send me ten." "How is this different from the recruiters
emailing me every week?" The pricing section's heading is "Why we ask for $3,000 up
front" — the awkward question, asked out loud.

**It criticises the category, never a named competitor.** "Most agencies won't tell
you the number until they've pitched you." "Going quiet is the standard in this
industry. It shouldn't be." The antagonist is always a practice, never a company.

**It admits weakness on purpose.** "A candidate with no weaknesses listed just means
nobody looked properly." The sample candidate report carries an amber row rated
"Fair" and a caveat spelling out the risk. This is the system's most distinctive
content rule: the honest downside is a feature of the layout, not an exception to it.

**Sentence craft.** Sentence case everywhere except the uppercase kickers and the
small annotation chips. Full stops at the ends of headings ("Three stages. No
guessing." / "One fee. Published."). Em dashes used to append a consequence, not for
decoration. Contractions throughout ("don't", "isn't", "they're"). Typographic
apostrophes and en dashes are used consistently. No exclamation marks anywhere.

**No emoji.** None appear in the file, and none should be added.

**Vibe.** Direct, technical, slightly impatient with its own industry. It reads like
an engineer explaining a process to another engineer over a call, not like marketing.
Nothing is hedged with "leading", "world-class" or "seamless"; there is no aspiration
copy at all.

---

## VISUAL FOUNDATIONS

**Palette.** A near-black navy ground (`#070D18`), a ramp of eight navy surfaces
above it, and exactly one accent: an electric lime, `#D4FF3C`. The lime is rationed —
it appears on kickers, the primary button, checks, the serif emphasis, and the
outcome row of a table, and nowhere else. Three secondary hues carry meaning only:
teal `#4A9B9B` for a strong score, amber `#C8862A` for a caveat or an unfinished
slot, red `#E4646A` for a live indicator. There are no other colours in the file.

**Type.** Inter for everything, in four weights; Source Serif 4 Italic for exactly
one clause per heading, always lime. Headings run tight and negative-tracked (60px
at −1.68px, 44px at −1.232px). Body copy sits at 15.5–19.5px with generous 1.55–1.6
line heights. Small print is set in `--text-subtle`, not shrunk further.

**Backgrounds.** Flat colour. No photography, no illustration, no texture, no noise.
Two decorative devices exist, both structural rather than pictorial: a 200-cell grid
of navy rectangles standing in for a flood of applicants, faded out at the bottom by
a linear mask, and diagonally striped navy tiles marking where photographs belong.

**Gradients.** Only as 45° two-stop stripes at ~8% intervals, used as the fill for
placeholder tiles and the video slot. Never as a decorative wash, and never
multi-hue. The file has no purple, no blue-to-pink, nothing atmospheric.

**Cards.** Navy fill, 1px *inset* hairline (`#22314D`), 18–22px radius, no shadow.
Radius scales with size: 4px annotation chips, 10–12px inline panels, 16px rows,
18px media panels, 20px content cards, 22px hero-scale cards, and a full pill for
every control. Padding is 29px on a standard card, 35px on the pricing card, 23px on
the compact shortlist panel.

**Borders and shadows.** The system is border-first. Sections are separated by 1px
hairlines; tables are ruled, never zebra-striped; the pricing card is promoted by a
*stronger* border rather than by elevation. Only one pair of elements carries a drop
shadow — the two profile cards floating over the applicant grid, with
`0 16px 40px rgba(7,13,24,.85)` plus a `0 0 0 6px rgba(7,13,24,.5)` halo that
separates them from the grid behind. Labels sitting on imagery get a
`0 1px 4px rgba(0,0,0,.8)` text shadow. That is the whole shadow system.

**Transparency and blur.** Used twice. The header is `rgba(7,13,24,0.92)` over a
`blur(10px)` backdrop. Tinted overlays sit at 8–12% opacity with a 25–40% ring —
lime for a feature icon tile, amber for a caveat. Nothing else is translucent, and
there is no glassmorphism.

**Layout.** A 1180px frame centred in a 1920px page, with 32px gutters giving 1116px
of content. Section rhythm is roughly 98px of padding with 155px between major
blocks. Rows of cards use a 22px gap. The header is 71px and fixed; nothing else is
pinned.

**Motion.** The source is static, so this system's motion is deliberately minimal:
80–320ms transitions on colour, background and ring only, on
`cubic-bezier(0.4,0,0.2,1)`. No entrance animation, no parallax, no bounce or spring,
no scroll-triggered reveals. `prefers-reduced-motion` zeroes every duration.

**States.** Hover lifts the lime (`#DFFF6B`) and turns grey nav text white; press
drops it (`#C2F022`). Outline and ghost controls hover on a 4% white wash rather
than a border change. Nothing scales or translates on press. Focus is a 2px lime
outline at 2px offset, applied globally in `tokens/base.css`. Disabled primary
buttons drop the lime to 35%.

**Imagery.** There is none to describe — the file ships zero bitmaps. Where photos
belong, it says so in 9px grey capitals on a striped tile. Treat that as the rule:
supply real photography or leave the marked slot visible. Do not substitute stock,
illustration or generated portraits.

---

## ICONOGRAPHY

Seven stroke glyphs, drawn as vectors inside the file itself — there is no icon font,
no icon library, and no PNG icons. Weights are 0.75–0.94px at their native box sizes
(13px, 15px and 18px), which is roughly a 1.5px stroke at 24px. Caps and joins are
round. Everything is monochrome and inherits `currentColor`; in practice icons are
always lime.

The set: a right arrow (the CTA badge), a check (reassurance lists), plus and minus
(the FAQ toggle), a shield (the "we don't come back for them" card), and a pair of
angle brackets (the "a senior engineer ran the interview" card). A filled triangle
serves as the play glyph.

- `assets/icons/` holds the verbatim exports: `arrow-right.svg`, `check.svg`,
  `check-sm.svg`, `shield-lock.svg`, `code-left.svg`, `code-right.svg`. These are
  outline-expanded strokes, so they scale as artwork rather than as strokes.
- `components/brand/icon-data.js` holds the same geometry re-expressed as strokes at
  the file's own vertices, which is what the `Icon` component renders. Use `Icon`
  in code; use the SVGs for hand-off and non-React contexts.

No emoji, and no unicode characters used as icons. Two unicode glyphs *are* used as
typography: `·` as a metadata separator ("Austin, TX · 9 yrs") and `→` appended to
text links ("Open report →").

**Logo:** the file contains no logo asset. The mark is a 17px circle with a 2px lime
inset ring beside the name in Inter Semi Bold — that is reproduced exactly in
`Wordmark`. If a real logo exists, drop it in `assets/` and replace the ring.

---

## Components

45 components in nine groups. Import from `window.CEDesignSystem_2494c2` in card
HTML, or read the sibling `.prompt.md` for usage.

**brand/** — `Wordmark` · `Eyebrow` · `SectionHeading` · `Icon`

**layout/** — `Container` · `Section`

**core/** — `Button` · `NavLink` · `Tag` · `Badge` · `AnnotationBadge` · `CheckItem` · `IconTile` · `ProgressBar` · `StatusDot` · `Divider`

**navigation/** — `NavBar` · `Footer` · `Tabs` · `DeRiskBand`

**cards/** — `Card` · `FeatureCard` · `StageCard` · `CandidateCard` · `ShortlistPanel` · `FloatingProfileCard` · `AvatarPlaceholder` · `Callout`

**data/** — `PricingCard` · `PriceRow` · `FunnelTable` · `ReportCard` · `ScoreRow`

**media/** — `VideoPlaceholder` · `PlayButton` · `CodePanel` · `JobPostGrid`

**disclosure/** — `Accordion` · `AccordionItem`

**forms/** — `Field` · `Input` · `Textarea` · `Select` · `Checkbox` · `Modal`

### Intentional additions

The source file defines no forms and no dialog, but every call to action on the page
is "Start a search", which has to land somewhere. Six components were added for that
path, built only from existing tokens and treatments: `Field`, `Input`, `Textarea`,
`Select`, `Checkbox`, `Modal`. `Icon` is also an addition — a wrapper so the file's
seven glyphs can be used without pasting SVG. Nothing else was invented: there is no
Avatar, Tooltip, Toast, Breadcrumb or Pagination here, because the source defines
none.

## Responsive behaviour

The source is desktop-only at 1920px. The rules below are this system's extension of
it, implemented in `tokens/layout.css`:

- **≥1281px** — source values as authored. 1180px container, three-across card rows,
  two-column section splits.
- **1024–1280px** — heading scale steps down (h1 48px, h2 36px). Two-column splits
  hold; three-across card rows become two-across.
- **768–1023px** — section splits stack, media panels go full width, the shortlist
  panel drops below the hero copy.
- **<768px** — h1 38px, h2 30px, lead 17px; gutters 20px; card padding 20px; section
  rhythm compresses from 155px to 72px. The nav keeps wordmark plus CTA and hides
  the link list. Card rows become single-column.

Controls keep their source heights (58.39 / 52 / 46.39px), all above the 44px touch
minimum recorded in `--touch-target-min`.

## Accessibility

- **Contrast.** White on `#070D18` is ~19:1; `--text-body` ~9.6:1; `--text-muted`
  ~4.9:1 — use it for supporting copy at 15px and above, not for small print.
  `--text-subtle` (~3.3:1) is for annotations and disabled states only. Lime on the
  navy ink is ~14:1 and the ink on lime is ~13:1, so the primary button is safe both
  ways. The one value to watch is the lime badge label in the source, which sets
  `--text-muted` on lime (~2.6:1); `Badge` keeps the source colour, so override it
  when the label carries meaning.
- **Focus.** A 2px lime outline at 2px offset on every focusable element, set once in
  `tokens/base.css`. Never remove it; the lime is bright enough to read on every
  surface in the system.
- **Semantics.** `Accordion` uses real buttons with `aria-expanded`; `Tabs` sets
  `role="tablist"` and `aria-selected`; `ProgressBar` carries value and label;
  `Modal` is `role="dialog"` `aria-modal` and closes on Escape; `JobPostGrid` is
  decorative and `aria-hidden`; `Icon` is `aria-hidden` unless given a `title`.
- **Motion.** Every duration token collapses to 0 under `prefers-reduced-motion`.
- **Type.** Nothing in the system is set below 9px, and that size is reserved for
  placeholder captions. Body copy never drops below 13.5px.

## Known substitutions and gaps

- **Fonts load from Google Fonts.** No font binaries were included in the .fig, so
  `tokens/fonts.css` pulls Inter and Source Serif 4 from the CDN. Both are the exact
  families the file names. **If you have licensed copies, send them and I'll swap in
  local `@font-face` rules.**
- **No logo file** — see ICONOGRAPHY above.
- **No photography** of any kind, and the file says so explicitly.
- **The UK page's footer says "United States"** in the source. That looks like an
  authoring slip; the UI kit's locale toggle sets it correctly per locale, and the
  discrepancy is flagged here rather than silently fixed in the tokens.
