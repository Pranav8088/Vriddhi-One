# Vriddhi One — Design System

## Theme: "Indigo Horizon"

A **light, professional, modern SaaS** aesthetic inspired by tildei.com but with a distinctly Indian identity.
Key characteristics: clean white base, blue-purple gradient accents, subtle animations, generous whitespace.

---

## Color Palette

### Background Layers
| Token           | Value     | Usage                          |
|-----------------|-----------|--------------------------------|
| `--bg-base`     | `#ffffff` | Page background                |
| `--bg-subtle`   | `#f4f7ff` | Section alternates, input bg   |
| `--bg-muted`    | `#eef2ff` | Hover states, chip backgrounds |
| `--bg-dark`     | `#050d1f` | Dark sections (mission, CTA)   |

### Brand Colors
| Token              | Value     | Usage                   |
|--------------------|-----------|-------------------------|
| `--primary`        | `#3b5bdb` | Buttons, links, borders |
| `--primary-dark`   | `#1a2f6e` | Text in primary context |
| `--primary-light`  | `#dce4ff` | Chip backgrounds        |
| `--accent`         | `#845ef7` | Gradient partner, tags  |
| `--saffron`        | `#f59e0b` | Indian identity accent  |
| `--success`        | `#22c55e` | Live status indicators  |

### Gradient
```css
/* Primary brand gradient */
--gradient: linear-gradient(135deg, #3b5bdb 0%, #5c73f2 50%, #845ef7 100%);

/* Text gradient */
--gradient-text: linear-gradient(135deg, #3b5bdb, #845ef7);

/* Indian identity */
--gradient-saffron: linear-gradient(135deg, #f59e0b, #ef4444);
```

### Text
| Token              | Value     | Usage           |
|--------------------|-----------|-----------------|
| `--text-primary`   | `#0f1729` | Body text       |
| `--text-secondary` | `#3d4f70` | Supporting text |
| `--text-muted`     | `#8a96b0` | Placeholders    |

---

## Typography

### Font Stack
| Role    | Font             | Weights    | Usage                           |
|---------|------------------|------------|---------------------------------|
| Display | **Syne**         | 400–800    | All headings, logo              |
| Body    | **Instrument Sans** | 300–600 | Body copy, UI text              |
| Mono    | **JetBrains Mono** | 400–500  | Code, labels, section tags      |

### Type Scale
```scss
// Headings use Syne, letter-spacing: -0.02em to -0.04em
h1: clamp(2.5rem, 5vw, 4rem)    // Hero headline
h2: clamp(1.875rem, 4vw, 3rem)  // Section title
h3: 1.125–1.5rem                 // Card titles
```

---

## Spacing & Layout

```scss
--container-max:    1200px   // Max content width
--section-pad-y:    7rem     // Vertical section padding
--navbar-h:         72px     // Fixed navbar height
```

### Border Radius
```scss
--radius-sm:   8px
--radius-md:   14px
--radius-lg:   20px
--radius-xl:   28px
--radius-full: 9999px
```

---

## Shadows
```scss
--shadow-sm:  0 1px 3px rgba(15,23,41,0.06), 0 1px 2px rgba(15,23,41,0.04)
--shadow-md:  0 4px 16px rgba(59,91,219,0.10), 0 2px 6px rgba(15,23,41,0.06)
--shadow-lg:  0 16px 48px rgba(59,91,219,0.15), 0 4px 12px rgba(15,23,41,0.08)
--shadow-xl:  0 32px 80px rgba(59,91,219,0.20), 0 8px 24px rgba(15,23,41,0.10)
```

---

## Animations

### CSS Keyframes
| Name            | Duration  | Usage                         |
|-----------------|-----------|-------------------------------|
| `fadeUp`        | 0.8s      | Section entrances             |
| `float`         | 6–10s     | Hero floating elements        |
| `floatReverse`  | 6–9s      | Counter-direction float       |
| `pulseGlow`     | 2–6s      | Status dots, orb pulsing      |
| `counterSpin`   | 12–20s    | Orbit rings                   |
| `marqueeFwd`    | 30s       | Tech stack marquee            |

### Scroll Reveal
Apply `appReveal` directive to any element for intersection-observer-based fade-up.
```html
<div appReveal [revealDelay]="200">Content</div>
```

---

## Component Patterns

### Glass Card (dark sections)
```scss
background: rgba(255,255,255,0.05);
border: 1px solid rgba(255,255,255,0.08);
border-radius: var(--radius-lg);
backdrop-filter: blur(12px);
```

### Gradient Text
```scss
background: var(--gradient-text);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
```

### Section Label
```html
<span class="section-label">Label Text</span>
<!-- or for dark sections -->
<span class="section-label section-label--light">Label Text</span>
```
