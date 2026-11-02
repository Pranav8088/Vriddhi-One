# VriddhiOne AI Systems — CLAUDE.md

## Project Overview

**VriddhiOne AI Systems** (legal entity: *VriddhiOne AI Systems Private Limited*)
is an Indian AI product and engineering company based in Amravati, Maharashtra.

- Builds and operates its own products — **Roomie Hunt** (live), **CA Hunt** (in development)
- Provides AI product engineering, LLM/agent systems, custom software and platform work
- Positioning: AI-native software that reaches production, not prototypes

This repository is the public marketing website.

## Tech Stack

| Layer      | Technology                                   |
|------------|----------------------------------------------|
| Framework  | Angular 17 (standalone components)           |
| Language   | TypeScript 5.4                               |
| Styles     | Hand-written SCSS — **no Tailwind**          |
| State      | Angular Signals                              |
| Forms      | Reactive Forms                               |
| Fonts      | Sora · Manrope · Instrument Serif · JetBrains Mono |
| Build      | Angular CLI (esbuild application builder)    |
| Hosting    | Vercel **or** Netlify (both configured)      |

> Tailwind was removed in the November 2026 rebuild. Three conflicting palettes
> (SCSS tokens, hardcoded hex in `styles.scss`, and a Material palette in
> `tailwind.config.js`) were competing. Everything now derives from the custom
> properties in `src/styles/_tokens.scss`. Do not reintroduce a utility CSS
> framework without removing that token layer first.

## Commands

```bash
npm install                              # install dependencies
npm start                                # dev server → http://localhost:4200
npm run build                            # development build
npx ng build --configuration production  # production build → dist/vriddhi-one/browser
npm test                                 # unit tests (Karma + Jasmine)
```

## Project Structure

```
src/
├── app/
│   ├── core/
│   │   ├── site.config.ts        # ← SINGLE SOURCE OF TRUTH for company data
│   │   ├── seo.ts                # TitleStrategy: title, meta, OG, canonical
│   │   └── contact.service.ts    # Contact form submission + error mapping
│   ├── content/                  # Page copy as typed data, not inline strings
│   │   ├── home.content.ts
│   │   ├── services.content.ts
│   │   ├── products.content.ts
│   │   ├── approach.content.ts
│   │   ├── about.content.ts
│   │   └── careers.content.ts
│   ├── components/               # Shared, reusable
│   │   ├── navbar/  footer/  logo/  icon/
│   │   ├── vortex/               # Canvas particle background
│   │   ├── media-slot/           # Labelled placeholder for pending artwork
│   │   ├── marquee/  cta-band/
│   ├── directives/
│   │   ├── reveal.directive.ts      # [appReveal] scroll reveal (shared IO)
│   │   ├── count-up.directive.ts    # [appCountUp] number animation
│   │   └── pointer-fx.directive.ts  # [appPointerFx] spotlight + 3D tilt
│   └── pages/                    # One folder per route, all lazy-loaded
│       ├── home/ services/ products/ approach/
│       ├── about/ careers/ contact/
│       ├── legal/                # privacy + terms, shared legal.scss
│       └── not-found/
├── styles/
│   ├── _tokens.scss              # Colour, type, spacing, motion tokens
│   ├── _reset.scss               # Reset + focus + scrollbar + skip link
│   ├── _typography.scss          # Type scale and prose
│   ├── _layout.scss              # shell / section / grid / split primitives
│   ├── _components.scss          # btn, card, chip, badge, form, media-slot…
│   └── _animations.scss          # Keyframes + ambient background layers
├── styles.scss                   # Imports the above, in order
└── index.html                    # Meta, fonts, JSON-LD, boot splash

api/
├── _contact-core.js              # Shared validation, escaping, mail payload
└── contact.js                    # Vercel function adapter
netlify/functions/contact.js      # Netlify function adapter (same core)
```

## Non-Negotiables

1. **Company data lives in `src/app/core/site.config.ts`.** Never hardcode an
   email, phone number, address, CIN or social URL in a template. Change it
   once there and it updates every page, the footer and the JSON-LD.
2. **Page copy lives in `src/app/content/*.ts`** as typed objects. Templates
   iterate over data; they do not contain paragraphs of prose. (Legal pages are
   the deliberate exception — long-form legal text stays in its template.)
3. **Standalone components only.** `standalone: true`, explicit `imports`.
4. **Signals for state**, not RxJS, unless you genuinely need a stream.
5. **`ChangeDetectionStrategy.OnPush`** on every component.
6. **No invented metrics.** The company was incorporated in 2026. Do not add
   client counts, project totals or years of experience that are not real. Every
   figure on the site is either a verifiable fact or a stated commitment.
7. **Accessibility is acceptance criteria**, not polish: real labels, visible
   focus rings, `aria-expanded` on disclosures, keyboard-reachable everything.
8. **Respect `prefers-reduced-motion`.** Every animation and the vortex canvas
   already check it. Anything new must too.

## Design System

Full reference: `.claude/docs/DESIGN.md`

Dark-first. Gold carries the heritage, violet carries the machine intelligence,
and they meet in the brand gradient. Nothing else gets to be an accent.

```scss
--ink-900:    #070810   // page background
--ink-700:    #0e1120   // card
--gold-500:   #e3b341   // primary accent
--violet-500: #7c5cff   // secondary accent
--grad-brand: linear-gradient(118deg, #f6dc9a, #e3b341 26%, #9b7bff 74%, #7c5cff)

--font-display: 'Sora'              // headings, buttons, UI
--font-body:    'Manrope'           // body copy
--font-serif:   'Instrument Serif'  // italic accent word in headlines
--font-mono:    'JetBrains Mono'    // labels, eyebrows, machine output
```

## Reserved Graphics Slots

Artwork that does not exist yet is represented by `<app-media-slot>`, which
renders a labelled placeholder at the correct aspect ratio. Supply a `src` and
the real image takes the identical box — no layout rework.

```html
<app-media-slot label="Platform diagram" spec="1600×1000 PNG" ratio="16 / 10" />
<app-media-slot label="Roomie Hunt" src="assets/products/roomie-hunt.jpg" ratio="16 / 10" />
```

Expected filenames are listed in `src/assets/README.md`. Director portraits are
wired through the `portrait` field in `site.config.ts`.

## Contact Form

Posts to `/api/contact`, implemented twice over one shared core so the same
frontend path works on either host:

- **Vercel** → `api/contact.js`
- **Netlify** → `netlify/functions/contact.js`, routed by `netlify.toml`

Required environment variable: `BREVO_API_KEY`.
Optional: `CONTACT_TO_EMAIL`, `CONTACT_SENDER_EMAIL`, `CONTACT_SENDER_NAME`,
`CONTACT_TO_NAME`, `CONTACT_SITE_DOMAIN` (defaults in `api/_contact-core.js`).

All submitted values are HTML-escaped before being placed in the notification
email, and CR/LF is stripped from header-bound fields.

## Deployment Notes

- Output directory is `dist/vriddhi-one/browser`.
- `optimization.styles.inlineCritical` is **off on purpose**. Angular's critical
  CSS inlining emits `onload="this.media='all'"` on the stylesheet link, which
  the Content-Security-Policy blocks — leaving the non-critical CSS unapplied.
  Do not turn it back on without also solving that.
- Both hosts set a CSP. `style-src` needs `'unsafe-inline'` because Angular
  injects component styles and style bindings inline.

## Company Reference

| Field             | Value                                                        |
|-------------------|--------------------------------------------------------------|
| Legal name        | VriddhiOne AI Systems Private Limited                         |
| CIN               | U78100ME2026PTC476757                                         |
| GSTIN             | Not registered                                                |
| Registered office | Plot No. 39, Shriram Nagar, Amravati, Maharashtra 444602, India |
| General email     | contact@vriddhione.com                                        |
| Legal email       | legal@vriddhione.com                                          |
| Phone             | +91 83293 84913                                               |
| LinkedIn          | https://www.linkedin.com/company/vriddhione                   |
| X                 | https://x.com/vriddhione                                      |
| Director          | Ravindra Tambe — https://www.linkedin.com/in/ravindra-tambe   |

Two further mailbox aliases are reserved (see the comment in `site.config.ts`).
The second board seat is held and renders as a reserved card on `/about` until
filled.

## Known Gaps

- **Multi-language (EN/HI/MR) is not implemented.** The previous
  `TranslationService` was removed in the rebuild. Content is now in typed files
  under `src/app/content/`, which is the right shape to layer i18n onto, but the
  translations themselves do not exist yet. Do not claim the site is trilingual.
- **No analytics.** Stated as fact in the privacy policy — add a consent
  mechanism and update `/privacy` before introducing any.
- **No automated tests yet** beyond the Karma scaffold.
- Product URLs for Roomie Hunt and CA Hunt are `null` in `products.content.ts`;
  cards render without an outbound link until real URLs are added.
