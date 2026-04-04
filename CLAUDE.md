# Vriddhi One — CLAUDE.md

## Project Overview

**Vriddhi One** is an Indian software startup that:
- Builds AI-native software products for the Indian market (Roomie Hunt, CA Hunt)
- Provides custom software development and AI/LLM consultancy services
- Mission: Democratize digital innovation in India

## Tech Stack

| Layer       | Technology              |
|-------------|-------------------------|
| Framework   | Angular 17 (Standalone) |
| Language    | TypeScript 5.4          |
| Styles      | SCSS (component-scoped) |
| State       | Angular Signals         |
| Fonts       | Syne + Instrument Sans  |
| Build       | Angular CLI + Vite      |

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── navbar/           # Fixed nav with language switcher
│   │   ├── hero/             # Hero section with animated visuals
│   │   ├── stats/            # Stats row + tech marquee
│   │   ├── products/         # Roomie Hunt + CA Hunt cards
│   │   ├── services/         # 4-card services grid
│   │   ├── mission/          # Dark mission/vision section
│   │   ├── cta/              # Contact CTA section
│   │   └── footer/           # Footer with links
│   ├── directives/
│   │   └── reveal.directive.ts   # IntersectionObserver scroll reveal
│   ├── services/
│   │   └── translation.service.ts # Multi-lang (EN/HI/MR) with Signals
│   ├── app.component.ts
│   ├── app.config.ts
│   └── app.routes.ts
├── index.html
├── main.ts
└── styles.scss               # Global design tokens + utilities
```

## Commands

```bash
# Install dependencies
npm install

# Start dev server
ng serve          # → http://localhost:4200

# Production build
ng build

# Run tests
ng test
```

## Design System

See `.claude/docs/DESIGN.md` for full design token reference.

### Key CSS Variables
```scss
--primary:       #3b5bdb   // Brand blue
--accent:        #845ef7   // Purple accent
--gradient:      linear-gradient(135deg, #3b5bdb, #845ef7)
--font-display:  'Syne'
--font-body:     'Instrument Sans'
```

## Multi-Language Support

The site supports 3 languages via `TranslationService`:
- **English** (`en`) — default
- **Hindi** (`hi`) — हिंदी
- **Marathi** (`mr`) — मराठी

To add a new language, see `.claude/docs/TRANSLATIONS.md`.

## Products

### Roomie Hunt
- AI-powered roommate matching platform
- Status: **Live**
- Target: Urban Indian renters, students, young professionals

### CA Hunt
- Platform to find and connect with Chartered Accountants
- Status: **Coming Soon**
- Target: Indian SMEs, freelancers, startups

## Services

1. Custom Software Development (Web + Mobile)
2. AI & LLM Integration
3. Product Consultancy
4. Digital Transformation

## Key Contacts

- Email: teams@vriddhi-one.com
- Phone: +91 83293 84913
- Location: Pune, Maharashtra, India

## Development Guidelines

1. **Standalone Components** — All Angular 17 components use `standalone: true`
2. **Signals** — Use Angular signals for reactive state, not RxJS for simple state
3. **SCSS** — Keep styles component-scoped; use global tokens from `styles.scss`
4. **Accessibility** — All interactive elements need aria labels; maintain color contrast
5. **Performance** — Lazy-load heavy sections; keep animations CSS-only where possible
6. **i18n** — All user-facing strings must use `TranslationService`, never hardcode text

## Environment Notes

- Platform: Windows 11
- Node: v18+ required
- Angular CLI: v17.3+
