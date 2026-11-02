# Component Reference — VriddhiOne AI Systems

Two kinds of thing live here: **Angular components** under
`src/app/components/`, and **CSS component classes** in
`src/styles/_components.scss`. Reach for the CSS class first — most "components"
are a class on a `<div>`, not a new Angular component.

---

## Angular components

### `<app-logo>`

The mark (three nested quarter-arcs radiating from an origin point) plus the
wordmark.

| Input      | Default | Purpose                                  |
|------------|---------|------------------------------------------|
| `showText` | `true`  | Render the "VriddhiOne" wordmark          |
| `showSub`  | `true`  | Render the "AI Systems" descriptor        |
| `stacked`  | `false` | Mark above wordmark instead of beside it  |

Size via `--logo-mark` and `--logo-size` on the host.

### `<app-icon>`

Inline SVG from a registry of ~50 stroke icons on a 24×24 grid. Inherits
`currentColor`.

```html
<app-icon name="arrow-right" />
<app-icon name="cpu" size="1.5rem" />
<app-icon [path]="social.icon" mode="fill" />   <!-- brand marks -->
```

| Input         | Default    | Purpose                                 |
|---------------|------------|-----------------------------------------|
| `name`        | `''`       | Registry key (see `ICONS` in the file)  |
| `path`        | `null`     | Raw path data, overrides `name`         |
| `size`        | `1.25rem`  | Width and height                        |
| `strokeWidth` | `1.6`      | Stroke weight                           |
| `mode`        | `'stroke'` | `'fill'` for solid brand marks          |

Add new icons to the `ICONS` map at the bottom of `icon.component.ts`.

### `<app-media-slot>`

Reserved space for artwork that does not exist yet. Renders a labelled
placeholder at the correct aspect ratio stating what belongs there and at what
size. Supply `src` and the real image takes the identical box.

| Input   | Default     | Purpose                                      |
|---------|-------------|----------------------------------------------|
| `label` | required    | What belongs here                             |
| `spec`  | `''`        | Dimension hint, e.g. `"1600×1000 JPG"`        |
| `ratio` | `'16 / 10'` | CSS `aspect-ratio`                            |
| `src`   | `null`      | Real image path — replaces the placeholder    |
| `alt`   | `''`        | Alt text; falls back to `label`               |
| `icon`  | `'image'`   | Placeholder glyph                             |

### `<app-vortex>`

Canvas particle background. Decorative, `aria-hidden`, position it with
`position: absolute` on the host (already set) and a `z-index`.

| Input       | Default | Purpose                                    |
|-------------|---------|--------------------------------------------|
| `density`   | `420`   | Particle count at desktop width             |
| `intensity` | `0.75`  | Overall opacity                             |
| `cx` / `cy` | `.5/.42`| Vortex centre as a fraction of the box      |

Suspends when off-screen or the tab is hidden; one static frame under reduced
motion; particle count scales down below 1000px and again below 600px.

### `<app-marquee>`

Seamless horizontal scroller. The list is rendered twice and the track
translates −50%, so the loop is invisible. The second copy is `aria-hidden`.

| Input       | Default  | Purpose                        |
|-------------|----------|--------------------------------|
| `items`     | required | `{ label, icon? }[]`           |
| `speed`     | `'42s'`  | Duration of one pass           |
| `gap`       | `2.75rem`| Space between items            |
| `ariaLabel` | `''`     | Accessible name for the list   |

### `<app-cta-band>`

Closing call to action. Every page ends with one. Contact details come from
`site.config.ts`, so only the copy is configurable.

| Input          | Purpose                           |
|----------------|-----------------------------------|
| `eyebrow`      | Small label above the heading     |
| `title`        | Heading                           |
| `body`         | Supporting paragraph              |
| `primaryLabel` | Primary button text               |

### `<app-navbar>` / `<app-footer>`

Rendered once by `AppComponent`. The navbar is scroll-aware (glass after 12px),
carries a read-progress hairline, and opens a full-screen drawer with staggered
links below 1024px. Both read their links from `PRIMARY_NAV` / `LEGAL_NAV`.

---

## Directives

### `[appReveal]`

```html
<div appReveal>…</div>
<div appReveal="right" [revealDelay]="120">…</div>
<div appReveal [revealStagger]="90">…</div>   <!-- staggers direct children -->
```

| Input             | Default | Purpose                                     |
|-------------------|---------|---------------------------------------------|
| `appReveal`       | `'up'`  | `up` `left` `right` `scale` `blur`          |
| `revealDelay`     | `0`     | ms before this element animates              |
| `revealStagger`   | `0`     | ms between direct children (host not animated) |
| `revealThreshold` | `0.12`  | Visible fraction needed to trigger           |
| `revealOnce`      | `true`  | Stay revealed after scrolling back out       |

One IntersectionObserver is shared by every instance. Skipped entirely under
reduced motion — elements are simply shown.

### `[appCountUp]`

```html
<span [appCountUp]="100" suffix="%"></span>
<span [appCountUp]="99.9" [decimals]="1"></span>
```

Writes `textContent` directly, eases out over `duration` (default 1600ms), fires
once on first intersection. Sets `tabular-nums` so the layout does not jump.

### `[appPointerFx]`

Publishes cursor position as CSS custom properties — `--mx` / `--my` for the
`.card--spot` spotlight, and `--rx` / `--ry` when `[tilt]="true"`.

```html
<article class="card card--spot" appPointerFx>…</article>
<article class="card card--spot" appPointerFx [tilt]="true" [tiltMax]="5">…</article>
```

Listeners attach on pointer entry only, coalesced to one update per frame. Skipped
for coarse pointers (touch) and under reduced motion.

---

## CSS component classes

### Buttons

```html
<a class="btn btn--primary btn--lg">Label <app-icon class="btn__icon" name="arrow-right" /></a>
```

`btn--primary` (gold gradient, light sweep on hover) · `btn--ghost` (glass) ·
`btn--link` (underline grows from the left) · `btn--violet`.
Sizes: `btn--lg`, `btn--sm`, `btn--icon`, `btn--block`, `btn--block-sm`.
`.btn__icon` nudges right on hover.

### Cards

```html
<article class="card card--hover card--spot card--topline" appPointerFx>
  <div class="card__head">
    <span class="icon-tile"><app-icon name="bot" /></span>
  </div>
  <h3 class="card__title">Title</h3>
  <p class="card__body">Body.</p>
  <div class="card__foot">…</div>
</article>
```

Modifiers: `--hover` (lift + gold border) · `--spot` (cursor spotlight, needs
`appPointerFx`) · `--topline` (gradient hairline on hover) · `--feature`
(corner-lit) · `--glass` · `--flush` (no padding) · `--pad-lg`.
Internals: `__head` `__title` `__body` `__foot` `__index`.

### Chips, badges, pills

`.chip` (`--gold`, `--violet`) — note chips are `white-space: nowrap`; if the
label is a full sentence, allow wrapping at phone width.
`.badge` (`--live` with a pulsing halo, `--soon`, `--neutral`) with `.badge__dot`.
`.kicker` — the glass pill above a hero headline.

### Data display

`.stat` / `.stat-row` (divided columns) · `.deflist` with `__row` `__key` `__val`
(statutory tables) · `.ticks` with `.ticks__mark` (checked lists) ·
`.timeline` with `__when` `__what` `__detail`.

### Forms

`.field` + `.field__label` + `.input` (+ `.is-invalid`) + `.field__error`.
`.notice` (`--ok`, `--err`, `--info`) for form-level feedback. `.spinner` for
the pending button state. `select.input` ships its own chevron.

### Sections

`.sec-head` (`--center`, `--split`) · `.phero` + `__inner` `__title` `__meta` ·
`.cta-band` · `.rule` · `.acc` (accordion, grid-template-rows transition) ·
`.linklist` · `.social` · `.progress`.
