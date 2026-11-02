# Design System — VriddhiOne AI Systems

Dark-first. One palette, no exceptions. Every value below is a CSS custom
property declared in `src/styles/_tokens.scss` — read them from there, never
hardcode a hex value in a component.

## Brand logic

*Vriddhi* (वृद्धि) is Sanskrit for growth. **Gold** carries the heritage and the
confidence; **violet** carries the machine intelligence. They meet in the brand
gradient. Teal appears only for live/data states. Nothing else is an accent.

## Surfaces

| Token        | Value     | Use                          |
|--------------|-----------|------------------------------|
| `--ink-1000` | `#04050a` | Footer, page floor           |
| `--ink-900`  | `#070810` | Page background              |
| `--ink-800`  | `#0a0c15` | Alternating section band     |
| `--ink-700`  | `#0e1120` | Card                         |
| `--ink-600`  | `#141829` | Card hover, inset            |
| `--ink-500`  | `#1b2033` | Raised chrome                |
| `--ink-400`  | `#262c42` | Strongest fill, scrollbar    |

Hairlines: `--line` (7%), `--line-mid` (12%), `--line-strong` (20%),
plus `--line-gold` and `--line-violet` for brand-tinted borders.

## Brand colour

| Token          | Value     |
|----------------|-----------|
| `--gold-300`   | `#f6dc9a` |
| `--gold-400`   | `#f0c96a` |
| `--gold-500`   | `#e3b341` | ← primary
| `--gold-600`   | `#c2922c` |
| `--violet-300` | `#bda8ff` |
| `--violet-400` | `#9b7bff` |
| `--violet-500` | `#7c5cff` | ← secondary
| `--teal-400`   | `#4fd8cf` | live/data only

Washes (`--gold-wash`, `--violet-wash`) are the low-alpha fills that sit behind
brand-tinted chips, tiles and borders.

## Text

| Token        | Use                                       |
|--------------|-------------------------------------------|
| `--fg`       | Default body text                          |
| `--fg-strong`| Headings                                   |
| `--fg-muted` | Secondary copy (66%)                       |
| `--fg-faint` | Labels, captions (44%)                     |
| `--fg-ghost` | Decorative numerals, placeholders (26%)    |
| `--fg-on-gold` | Text on a gold fill — near-black, not white |

## Gradients

```scss
--grad-brand:      linear-gradient(118deg, #f6dc9a, #e3b341 26%, #9b7bff 74%, #7c5cff);
--grad-brand-flat: linear-gradient(118deg, #e3b341, #7c5cff);
--grad-gold:       linear-gradient(135deg, #f0c96a, #c2922c);   // primary button
--grad-violet:     linear-gradient(135deg, #9b7bff, #5e3fe0);
--grad-card:       // the subtle top-light sheen on every card
--grad-rule:       // hairline that fades out at both ends
```

Use `.grad-text` to run `--grad-brand` through type. It already compensates for
`background-clip: text` clipping descenders.

## Typography

| Family                | Token             | Role                                  |
|-----------------------|-------------------|---------------------------------------|
| **Sora**              | `--font-display`  | Headings, buttons, nav, card titles   |
| **Manrope**           | `--font-body`     | Body copy, prose                      |
| **Instrument Serif**  | `--font-serif`    | One italic accent word per headline   |
| **JetBrains Mono**    | `--font-mono`     | Eyebrows, labels, stats, machine output |

Fluid scale, all `clamp()`: `--t-display`, `--t-h1`…`--t-h4`, `--t-lead`,
`--t-body`, `--t-sm`, `--t-xs`, `--t-label`.

### The serif accent

The signature move. One word in a headline becomes italic serif and takes the
gradient. Exactly one per heading — more than that and it stops meaning anything.

```html
<h2 class="h2">The demo is the easy part. <em class="accent-serif grad-text">Production</em> is the job.</h2>
```

### Eyebrows

Every section opens with `.eyebrow` — mono, uppercase, gold, with a short
leading rule drawn by `::before`.

## Layout

| Class           | Purpose                                              |
|-----------------|------------------------------------------------------|
| `.shell`        | 1240px max, gutter padding                            |
| `.shell-wide`   | 1440px max                                            |
| `.section`      | Standard vertical rhythm (`--section-y`)              |
| `.section-band` | Darker band + top/bottom hairline, for alternation    |
| `.page-top`     | Clears the fixed navbar                               |
| `.phero`        | Shared page hero for every inner page                 |
| `.split`        | 1.05fr / 0.95fr                                       |
| `.split-wide`   | 1.4fr / 1fr                                           |
| `.split-sticky` | 0.8fr / 1.2fr, first column sticky                    |
| `.g-2` … `.g-4` | Fixed column grids, collapse at 1024/760px            |
| `.g-auto`       | `auto-fit, minmax(17rem, 1fr)` — the default choice    |

## Components

Defined in `_components.scss`. The full catalogue is in `COMPONENTS.md`.

`.btn` (`--primary` / `--ghost` / `--link` / `--violet`, sizes `--lg` / `--sm`),
`.card` (`--hover`, `--spot`, `--topline`, `--feature`, `--glass`, `--flush`),
`.icon-tile`, `.chip`, `.badge`, `.kicker`, `.stat` / `.stat-row`, `.deflist`,
`.ticks`, `.marquee`, `.input` / `.field`, `.notice`, `.media-slot`,
`.timeline`, `.acc`, `.linklist`, `.social`, `.cta-band`.

## Motion

| Token         | Value                            | Use                     |
|---------------|----------------------------------|-------------------------|
| `--ease`      | `cubic-bezier(.22,1,.36,1)`      | Default — almost everything |
| `--ease-in-out` | `cubic-bezier(.76,0,.24,1)`    | Ambient loops           |
| `--ease-spring` | `cubic-bezier(.34,1.46,.64,1)` | Icon tiles, social buttons |
| `--t-fast`    | 160ms                             | Colour changes          |
| `--t-base`    | 280ms                             | Hover, transform        |
| `--t-slow`    | 520ms                             | Scroll reveals          |

Under `prefers-reduced-motion: reduce`, the duration tokens collapse to 1ms and
every directive short-circuits. Animate only `transform` and `opacity`.

### Scroll reveal

```html
<div appReveal>…</div>
<div appReveal="left"  [revealDelay]="120">…</div>
<div appReveal="blur">…</div>
<div appReveal [revealStagger]="90">  <!-- staggers direct children -->
```

Variants: `up` (default), `left`, `right`, `scale`, `blur`. One
IntersectionObserver is shared across every instance on the page.

### Ambient background layers

`.orb` (+ `--gold` / `--violet` / `--teal`), `.grid-bg`, `.dots-bg`,
`.noise-bg`, `.top-glow`. All decorative — always `aria-hidden="true"`.

`<app-vortex>` is the canvas particle field: particles spiral inward with
angular velocity rising as radius falls, drawn as motion-blur trails. It
suspends itself when scrolled out of view or the tab is hidden, scales particle
count down on narrow viewports, and renders a single static frame under reduced
motion.

> `.top-glow` must never exceed `width: 100%`. Sections are not overflow-clipped,
> so a wider glow layer pushes the page's scroll width out on phones.

## Accessibility

- Focus is never removed, only restyled: 2px gold `:focus-visible` ring at 3px offset.
- A `.skip-link` is the first element in the tab order.
- Contrast: `--fg` on `--ink-900` ≈ 17:1; `--fg-muted` ≈ 11:1;
  `--gold-400` on `--ink-900` ≈ 11:1; `--fg-on-gold` on `--gold-500` ≈ 11:1.
- Decorative layers get `aria-hidden`; placeholders get `role="img"` and a label.
- `overflow-x: clip` (with a `hidden` fallback) on `html`/`body` — `clip` does
  not create a scroll container, so the sticky asides keep working.
