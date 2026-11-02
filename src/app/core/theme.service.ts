import { DOCUMENT } from '@angular/common';
import { Injectable, computed, effect, inject, signal } from '@angular/core';

export type ThemePreference = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'vo-theme';

/** Page background per resolved theme, kept in step with _tokens.scss. */
const THEME_COLOR: Record<'light' | 'dark', string> = {
  light: '#fbfaf8',
  dark: '#0a0c11'
};

/**
 * Light / dark / system.
 *
 * "System" is the absence of a stored choice: the `data-theme` attribute is
 * removed and the CSS falls through to `prefers-color-scheme`. An explicit
 * choice sets the attribute, which always wins over the OS.
 *
 * The same attribute is applied before first paint by `theme-init.js`, so this
 * service is only responsible for changes made while the page is open.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly doc = inject(DOCUMENT);
  private readonly root = this.doc.documentElement;

  /** What the visitor chose. */
  readonly preference = signal<ThemePreference>(this.read());

  /** What the OS currently reports, kept live. */
  private readonly systemDark = signal(this.querySystemDark());

  /** What is actually on screen. */
  readonly resolved = computed<'light' | 'dark'>(() => {
    const pref = this.preference();
    if (pref === 'system') return this.systemDark() ? 'dark' : 'light';
    return pref;
  });

  constructor() {
    const media = this.media();
    if (media) {
      // Safari below 14 only has the deprecated addListener.
      const onChange = (e: MediaQueryListEvent) => this.systemDark.set(e.matches);
      if (typeof media.addEventListener === 'function') {
        media.addEventListener('change', onChange);
      } else if (typeof media.addListener === 'function') {
        media.addListener(onChange);
      }
    }

    effect(() => {
      const pref = this.preference();
      const resolved = this.resolved();

      if (pref === 'system') {
        this.root.removeAttribute('data-theme');
      } else {
        this.root.setAttribute('data-theme', pref);
      }

      this.syncThemeColor(resolved);
    });
  }

  set(preference: ThemePreference): void {
    this.preference.set(preference);
    try {
      if (preference === 'system') {
        localStorage.removeItem(STORAGE_KEY);
      } else {
        localStorage.setItem(STORAGE_KEY, preference);
      }
    } catch {
      /* Private mode or blocked storage: the choice holds for this page only. */
    }
  }

  // --- internals -----------------------------------------------------------

  private read(): ThemePreference {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'light' || stored === 'dark') return stored;
    } catch {
      /* ignore */
    }
    return 'system';
  }

  private media(): MediaQueryList | null {
    if (typeof matchMedia !== 'function') return null;
    return matchMedia('(prefers-color-scheme: dark)');
  }

  private querySystemDark(): boolean {
    return this.media()?.matches ?? false;
  }

  /**
   * The two media-scoped theme-color metas in index.html cover the system
   * case. Once a choice overrides the OS they no longer match, so replace
   * them with a single unscoped tag.
   */
  private syncThemeColor(resolved: 'light' | 'dark'): void {
    const head = this.doc.head;
    const scoped = head.querySelectorAll('meta[name="theme-color"][media]');

    if (this.preference() === 'system') {
      if (scoped.length === 0) {
        head
          .querySelectorAll('meta[name="theme-color"]')
          .forEach((el) => el.remove());
        for (const [scheme, color] of Object.entries(THEME_COLOR)) {
          const meta = this.doc.createElement('meta');
          meta.setAttribute('name', 'theme-color');
          meta.setAttribute('media', `(prefers-color-scheme: ${scheme})`);
          meta.setAttribute('content', color);
          head.appendChild(meta);
        }
      }
      return;
    }

    scoped.forEach((el) => el.remove());
    let meta = head.querySelector<HTMLMetaElement>(
      'meta[name="theme-color"]:not([media])'
    );
    if (!meta) {
      meta = this.doc.createElement('meta');
      meta.setAttribute('name', 'theme-color');
      head.appendChild(meta);
    }
    meta.setAttribute('content', THEME_COLOR[resolved]);
  }
}
