# Vriddhi One — Component Reference

All components are Angular 17 standalone components located in `src/app/components/`.

---

## NavbarComponent
**Selector:** `app-navbar`
**File:** `components/navbar/navbar.component.ts`

### Features
- Fixed position with scroll-triggered background blur
- Language switcher dropdown (EN / HI / MR)
- Mobile hamburger menu with slide-down overlay
- CTA "Get in Touch" button

### Signals
| Signal       | Type      | Description                     |
|--------------|-----------|---------------------------------|
| `isScrolled` | `boolean` | True when page scrollY > 20px   |
| `menuOpen`   | `boolean` | Mobile menu open/closed state   |
| `langOpen`   | `boolean` | Language dropdown open state    |

---

## HeroComponent
**Selector:** `app-hero`
**File:** `components/hero/hero.component.ts`

### Features
- Animated gradient background orbs
- Grid overlay pattern
- Floating geometric shapes (rings, dots, hexagon)
- Staggered CSS animation on load (delay-0 through delay-5)
- Right panel: Central orbit graphic + floating product preview cards
- Scroll cue at bottom

### Inputs
None — all content from `TranslationService`.

---

## StatsComponent
**Selector:** `app-stats`
**File:** `components/stats/stats.component.ts`

### Features
- 4 key metrics row (clients, products, team, countries)
- Gradient number display
- Infinite marquee of tech stack badges
- Responsive: stats wrap on mobile

---

## ProductsComponent
**Selector:** `app-products`
**File:** `components/products/products.component.ts`

### Products Displayed
| Product      | Status | Accent Color |
|--------------|--------|--------------|
| Roomie Hunt  | Live   | Blue `#3b5bdb` |
| CA Hunt      | Soon   | Purple `#845ef7` |

### Features
- 2-column card grid
- Top-border gradient on hover
- Glow effect on card hover
- "More products" dashed banner

---

## ServicesComponent
**Selector:** `app-services`
**File:** `components/services/services.component.ts`

### Services Listed
1. Custom Software Development
2. AI & LLM Integration
3. Product Consultancy
4. Digital Transformation

### Features
- 2-column grid (1-column mobile)
- Top accent line scales in on hover
- Arrow icon fades in on hover

---

## MissionComponent
**Selector:** `app-mission`
**File:** `components/mission/mission.component.ts`

### Features
- Full dark section with gradient orbs
- Large blockquote with the mission statement
- Side-by-side Vision + Values cards
- India identity strip at bottom

---

## CtaComponent
**Selector:** `app-cta`
**File:** `components/cta/cta.component.ts`

### Features
- Dark section with centered layout
- Primary and secondary CTA buttons
- Contact options row: email, phone, location

---

## FooterComponent
**Selector:** `app-footer`
**File:** `components/footer/footer.component.ts`

### Features
- Brand column with logo, tagline, social links
- 4-column links grid: Products, Services, Company, Legal
- Language quick-select buttons
- Bottom bar: copyright + "Made with ❤️ in India"

---

## RevealDirective
**Selector:** `[appReveal]`
**File:** `directives/reveal.directive.ts`

### Inputs
| Input              | Type     | Default | Description                    |
|--------------------|----------|---------|--------------------------------|
| `revealDelay`      | `number` | `0`     | Delay in ms before animating   |
| `revealThreshold`  | `number` | `0.15`  | IntersectionObserver threshold |

### Usage
```html
<div appReveal [revealDelay]="200">
  This element fades up when 15% visible in viewport
</div>
```

The directive adds `.reveal` class on init and `.visible` class when intersection
is triggered. Styles in `styles.scss` handle the CSS transition.
