# Design review: why it reads as AI-built, and what to do

Researched against the published "how to spot an AI-built site" checklists, then
scored against our own rendered DOM. Not opinion — counts.

---

## 1. The tells, scored

Designers have written these lists; our site hits most of them. One source puts
the threshold at **"six or eight from this list at once"** before a page is
likely AI-made.

| Tell (from the checklists) | Us? | Evidence |
|---|---|---|
| **Gradient headline text**, the most-cited tell | **Yes** | 16 instances across 7 pages |
| **One serif-italic word in the headline** | **Yes** | 16 instances — named explicitly as *the* AI move |
| **Instrument Serif** as that serif | **Yes** | named in the research as the usual AI pick |
| Soft round geometric sans (Sora, Manrope) | **Yes** | designers now actively mock this category |
| **Three identical cards in a row, icon on top** | **Yes** | 80 cards across 7 pages; the dominant layout |
| **A badge above the headline** | **Yes** | the hero `.kicker` is exactly this |
| **Coloured left borders** | **Yes** | the blockquote rule, the commitments table |
| Cards nested inside cards | **Yes** | cards inside `.cta-band`, inside `.split` |
| Frosted glass panels | Partly | `backdrop-filter` on nav, hero panel, CTA aside |
| Centred hero | No | ours is left-aligned |
| Emoji in headings | No | none |
| Vague copy ("unlock your potential") | No | copy is specific, if over-promising |

**Plus the label plague the checklists do not even cover:**

- **34 eyebrows** — every section opens with an uppercase mono label
- **40 mono labels** elsewhere
- **72 chips** — 44 on `/services` alone
- **146 small uppercase mono tags in total**

That is the "lot of unwanted tags" problem, measured.

**In the page source:** `index.html` ships developer notes-to-self as HTML
comments. Anyone who views source reads *"Drop a 1200x630 image at
/assets/og/og-default.jpg"* and *"Favicons: drop the files into
src/assets/brand/"*. Those go regardless of anything else here.

**In the copy:** 92 em dashes. The research is clear that removing them alone
does not fix it; the underlying rhythm does. Every section runs the same shape —
short declarative, longer qualifying sentence, contrast clause. Read three in a
row and the pattern is audible.

---

## 2. What to keep

Not everything needs tearing up. These are genuinely good:

- **The token architecture.** One source of truth for design tokens, one for
  company data, one for copy. This is why the site is cheap to change at all.
- **Accessibility.** Focus rings, skip link, `aria-expanded`, `title`/`desc` on
  the diagrams, `prefers-reduced-motion` throughout.
- **Performance.** 92 kB initial, every route lazily split.
- **Security posture.** CSP, HSTS, escaped mail payload, no analytics, no
  cookies, no third-party requests except fonts. A real differentiator, and the
  privacy policy depends on it.
- **The three SVG diagrams.** Drawn, specific, and they argue a point.
- **The structure.** Nine pages, the information architecture, the routing and
  SEO wiring are sound. This is a styling and writing problem, not a rebuild.

---

## 3. How the UI/UX should change

The research on fundamentals is unanimous and unglamorous: **hierarchy comes
from contrast, size and spacing used together**, people scan rather than read
(NN/g's figure is roughly 20–28% of the text on a page), and whitespace is what
signals importance. None of that is achieved by adding another chip.

**Cut, do not add:**

1. **Kill gradient headline text.** All 16. Headlines in one solid colour.
2. **Kill the serif-italic accent word.** All 16. The single most identifiable
   AI gesture on the site.
3. **Cut eyebrows from 34 to about 6.** An eyebrow on every section means none
   of them signals anything.
4. **Cut chips hard, especially the 44 on /services.** A tech stack reads better
   as a sentence than as 44 pills.
5. **Break the card grid.** Not every section is three-cards-in-a-row. Some
   content is a list, some a table, some one large statement with nothing else
   on screen.
6. **Drop the frosted glass.** Decoration standing in for depth.

**Then build hierarchy properly:**

7. **Real scale contrast.** Our type spans 17px to 100px, but every section
   lands in the same middle band. One genuinely large moment per page, and a lot
   of quiet around it.
8. **Material contrast.** Dark cards on a dark background, everywhere.
   Introduce at least one light or inverted section so the page has a rhythm you
   can feel scrolling past at speed.
9. **Asymmetry.** Every section is centred or a 50/50 split. Editorial layouts
   earn their premium feel from deliberate imbalance.
10. **Typography.** Both sans faces and the serif are named in the research as
    AI-default. Needs a decision — see §6.

---

## 4. Animation

Our current scroll reveal is the AI-default: an IntersectionObserver adds a
class and everything fades up 24px. Same easing, same distance, everywhere.

**The 2026 technique is native CSS scroll-driven animation:**

- `animation-timeline: view()` ties an element's animation to its own progress
  through the viewport; `scroll()` ties it to the scroll container. No
  JavaScript, no observer.
- `animation-range: entry 20% cover 40%` controls which part of the pass the
  animation occupies. This is where the smooth, expensive feel comes from —
  motion that tracks your scroll rather than firing once.
- Only `transform` and `opacity`, so it runs on the compositor thread and is
  exactly as smooth as the scroll itself.
- Progressive enhancement: readable final state first, motion added inside
  `@supports (animation-timeline: view())`.
- Wrapped in `@media (prefers-reduced-motion: no-preference)`.

**What to actually animate**, given the brief that it should feel normal:

- Scroll-linked, not scroll-triggered. A long section that tracks progress reads
  as considered; a 300ms fade-up reads as a template.
- Vary distance and easing by element weight. A headline and a caption should
  not move the same amount.
- Motion that carries meaning: a diagram's progress, a number counting, a rule
  drawing itself. Not decoration.
- Remove the gradient-pan and pulse loops. Ambient animation with no purpose is
  what the checklists mean by motion for its own sake.

**One caveat:** a source claimed cross-engine support landed mid-2026, but that
was single and unverified and the sources' dates disagreed. The `@supports`
wrapper makes this safe either way, and I will check current support before
shipping rather than trusting a blog.

---

## 5. Copy

- Restructure the 92 em-dash sentences rather than swapping the punctuation.
- Vary sentence length and opening; the current rhythm is uniform.
- Specifics beat adjectives: a number, a date, a real constraint.
- This overlaps `CONTENT-TODO.md`, still unanswered. Rewriting copy that may be
  cut is wasted effort, so **Tier 1 answers come first**.

---

## 6. Decisions needed

| # | Decision | Why it blocks |
|---|---|---|
| 1 | **Typography direction** | Both sans faces and the serif are flagged. Everything else is downstream. |
| 2 | **Dark, light, or mixed** | Determines the whole material and contrast strategy. |
| 3 | **`CONTENT-TODO.md` Tier 1** | Copy rewriting is pointless until we know what stays. |

Paras's version would settle 1 and 2 in one look, if it can be found.

---

## Sequence, once decided

1. Strip the shipping developer comments from `index.html` *(no decision needed)*
2. Typography swap
3. Remove gradient text, serif accents, surplus eyebrows and chips
4. Rebuild section rhythm: scale, material and layout contrast
5. Replace scroll reveals with native scroll-driven animation
6. Copy pass, after Tier 1 answers

---

## Sources

AI-design tells — [SCALR](https://scalr.sg/blog/20-signs-a-website-was-made-by-ai/) ·
[Developers Digest](https://www.developersdigest.tech/blog/ai-design-slop-and-how-to-spot-it) ·
[vibecodekit](https://vibecodekit.dev/ai-slop-design) ·
[925studios](https://www.925studios.co/blog/ai-slop-design-tells) ·
[Joshua Snoddy](https://www.joshuasnoddy.com/blog/why-ai-websites-look-the-same/) ·
[Gabriel Hidalgo](https://www.gabrielhidalgo.design/blog/make-website-look-less-ai-generated)

Typography — [visiodesign](https://visiodesign.fi/en/blog/typografia-vaihtoehdot-inter-fontille) ·
[WhatFontIs](https://www.whatfontis.com/blog/designers-are-punishing-ai-fonts-in-2026-and-its-making-type-more-human/) ·
[Creatisimo](https://creatisimo.net/t/overused-fonts-and-their-better-alternatives-community-picks/220)

Scroll-driven animation — [WebKit](https://webkit.org/blog/17101/a-guide-to-scroll-driven-animations-with-just-css/) ·
[Chrome for Developers](https://developer.chrome.com/articles/scroll-driven-animations) ·
[modern-css](https://modern-css.com/scroll-linked-animations-without-a-library/)

UI/UX fundamentals — [Interaction Design Foundation](https://ixdf.org/literature/topics/visual-hierarchy?ep=loop-11) ·
[userpeek](https://userpeek.com/blog/why-visual-hierarchy-in-ux-is-important) ·
[raw.studio](https://raw.studio/blog/how-typography-hierarchy-boosts-ui-usability/)

Writing tells — [VentureBeat](https://venturebeat.com/ai/busted-by-the-em-dash-ais-favorite-punctuation-mark-and-how-its-blowing-your-cover) ·
[Optimizely](https://www.optimizely.com/no/field-notes/articles/in-defense-of-the-em-dash-and-everything-else-on-this-ai-tell-trial) ·
[GPTZero](https://www.gptzero.me/news/how-to-write-like-a-human/)
