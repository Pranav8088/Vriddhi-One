# Vriddhi One — Translations Guide

## Supported Languages

| Code | Language | Native   | Status   |
|------|----------|----------|----------|
| `en` | English  | English  | Complete |
| `hi` | Hindi    | हिंदी    | Complete |
| `mr` | Marathi  | मराठी    | Complete |

---

## How to Add a New Language

### Step 1 — Add the Language Type
In `src/app/services/translation.service.ts`:

```typescript
// Line 1 — update the type union
export type Language = 'en' | 'hi' | 'mr' | 'ta';  // added Tamil example
```

### Step 2 — Add Translations Object
Copy the `EN` constant and create a new one (e.g., `TA`) with all values translated:

```typescript
const TA: Translations = {
  nav_products: 'தயாரிப்புகள்',
  nav_services: 'சேவைகள்',
  // ... all keys
};
```

### Step 3 — Register in the Map
```typescript
const TRANSLATIONS_MAP: Record<Language, Translations> = {
  en: EN, hi: HI, mr: MR, ta: TA  // add new entry
};
```

### Step 4 — Add Language Metadata
```typescript
export const LANGUAGES: Record<Language, { label: string; native: string; flag: string }> = {
  en: { label: 'English', native: 'English', flag: '🇬🇧' },
  hi: { label: 'Hindi',   native: 'हिंदी',   flag: '🇮🇳' },
  mr: { label: 'Marathi', native: 'मराठी',   flag: '🇮🇳' },
  ta: { label: 'Tamil',   native: 'தமிழ்',   flag: '🇮🇳' },  // new
};
```

The Navbar and Footer will automatically pick up the new language.

---

## Editing Existing Translations

All strings are in `src/app/services/translation.service.ts`.

The `Translations` interface at the top defines all available keys.
Each key corresponds to a piece of UI text.

Example:
```typescript
// Key definition
interface Translations {
  hero_headline_1: string;  // "We Build Software"
  // ...
}

// English value
const EN: Translations = {
  hero_headline_1: 'We Build Software',
  // ...
}

// Hindi value
const HI: Translations = {
  hero_headline_1: 'हम सॉफ्टवेयर बनाते हैं',
  // ...
}
```

---

## Using Translations in Components

```typescript
// Inject the service
private ts = inject(TranslationService);

// Create a computed signal for the translations
readonly t = this.ts.t;
```

```html
<!-- Use in template -->
<h1>{{ t().hero_headline_1 }}</h1>
```

The `t()` signal automatically re-renders when the user switches language.

---

## Language Persistence

The selected language is saved to `localStorage` with the key `v1_lang`.
On page load, the previously selected language is restored automatically.

---

## Adding Multi-line Translated Content

For strings that need line breaks in the template:

```typescript
// Use \n as separator in the translation string
products_title: 'Built for India,\nReady for the World.'
```

```html
<!-- Split and render in template -->
@for (line of t().products_title.split('\\n'); track $index) {
  <span>{{ line }}</span><br *ngIf="$index === 0">
}
```
