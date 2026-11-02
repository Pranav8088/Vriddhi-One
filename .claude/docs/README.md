# VriddhiOne AI Systems — .claude/docs

Developer documentation for the VriddhiOne AI Systems website (Angular 17).

## Documents

| File            | Description                                              |
|-----------------|----------------------------------------------------------|
| `DESIGN.md`     | Design system: tokens, palette, typography, motion, a11y  |
| `COMPONENTS.md` | Angular components, directives, and CSS component classes |

Project-level conventions, company reference data and known gaps live in
`CLAUDE.md` at the repository root. Read that first.

## Quick start

```bash
npm install
npm start          # → http://localhost:4200
```

## Architecture in one paragraph

Angular 17 standalone components — there is no `NgModule`. Every route is lazily
loaded. State is held in **signals**, not RxJS subjects. Styling is hand-written
SCSS driven entirely by the custom properties in `src/styles/_tokens.scss`; there
is no utility CSS framework. Company data has exactly one home
(`src/app/core/site.config.ts`) and page copy has exactly one home
(`src/app/content/`) — templates iterate over typed data rather than carrying
prose.

## Where things are

| I want to change…              | Edit                                     |
|--------------------------------|------------------------------------------|
| An email, phone, address, CIN  | `src/app/core/site.config.ts`            |
| Navigation links               | `PRIMARY_NAV` in `site.config.ts`        |
| Page copy                      | `src/app/content/<page>.content.ts`      |
| Colours, type scale, motion    | `src/styles/_tokens.scss`                |
| A shared surface or button     | `src/styles/_components.scss`            |
| Page titles / meta description | `src/app/app.routes.ts`                  |
| An icon                        | `ICONS` map in `components/icon/`        |
| Contact form behaviour         | `api/_contact-core.js`                   |

## A note on history

The site was rebuilt from scratch in November 2026. The previous version mixed
three competing colour palettes (SCSS tokens, hardcoded hex, and a Tailwind
Material theme) and shipped a light theme that did not match its own token file.
Tailwind and the partially-populated `TranslationService` were both removed. If
you are reinstating multi-language support, build it on top of
`src/app/content/` rather than resurrecting the old service.
