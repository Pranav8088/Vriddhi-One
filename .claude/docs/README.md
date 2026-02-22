# Vriddhi One — .claude/docs

This folder contains developer documentation for the Vriddhi One Angular 17 website.

## Documents

| File                  | Description                                      |
|-----------------------|--------------------------------------------------|
| `DESIGN.md`           | Design system: tokens, typography, color palette |
| `COMPONENTS.md`       | Component API reference and usage                |
| `TRANSLATIONS.md`     | How to add/edit multi-language translations      |

## Quick Start

```bash
cd "Vriddhi One"
npm install
ng serve
```

Visit `http://localhost:4200`

## Architecture

This is an Angular 17 **standalone components** app. There is no `NgModule`.
Each component is self-contained with its own template, styles, and imports.

The app uses **Angular Signals** for reactive state (translation, scroll state, etc.)
instead of traditional RxJS/Subject patterns for simplicity and performance.
