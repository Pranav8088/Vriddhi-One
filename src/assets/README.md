# Assets

Drop artwork here and the matching media slots on the site fill themselves in —
no template changes needed.

| Path | Used for | Recommended size |
|------|----------|------------------|
| `brand/favicon.svg` | Browser tab icon | square SVG |
| `brand/apple-touch-icon.png` | iOS home screen | 180×180 |
| `brand/logo-mark.svg` | Navbar / footer mark | square SVG |
| `og/og-default.jpg` | Link previews (site-wide) | 1200×630 |
| `products/roomie-hunt.jpg` | Roomie Hunt product shot | 1600×1000 |
| `products/ca-hunt.jpg` | CA Hunt product shot | 1600×1000 |
| `team/ravindra-tambe.jpg` | Director portrait | 800×800, square |

To wire a new image into a slot, set the `src` input on `<app-media-slot>`
(see `src/app/components/media-slot/`) or the `portrait` field in
`src/app/core/site.config.ts`.
