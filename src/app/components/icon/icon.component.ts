import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

/**
 * Inline SVG icon.
 *
 *   <app-icon name="arrow-right" />
 *   <app-icon name="cpu" size="1.5rem" />
 *   <app-icon [path]="social.icon" mode="fill" />
 *
 * Icons are stroke-based on a 24x24 grid and inherit `currentColor`, so they
 * take the colour of whatever they sit in. Everything is inlined — no icon
 * font, no sprite request, no layout shift.
 */
@Component({
  selector: 'app-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      viewBox="0 0 24 24"
      [attr.width]="size"
      [attr.height]="size"
      [attr.fill]="mode === 'fill' ? 'currentColor' : 'none'"
      [attr.stroke]="mode === 'fill' ? 'none' : 'currentColor'"
      [attr.stroke-width]="mode === 'fill' ? null : strokeWidth"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path [attr.d]="d" />
    </svg>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
        flex: none;
        line-height: 0;
      }
    `
  ]
})
export class IconComponent {
  /** Key from the registry below. */
  @Input() name = '';

  /** Raw path data, used instead of `name` (for brand marks). */
  @Input() path: string | null = null;

  @Input() size = '1.25rem';
  @Input() strokeWidth = 1.6;
  @Input() mode: 'stroke' | 'fill' = 'stroke';

  get d(): string {
    return this.path ?? ICONS[this.name] ?? '';
  }
}

/* ============================================================================
   REGISTRY
   ============================================================================ */

export const ICONS: Record<string, string> = {
  /* --- Navigation & controls ------------------------------------------ */
  'arrow-right': 'M5 12h14M13 6l6 6-6 6',
  'arrow-up-right': 'M7 17 17 7M8 7h9v9',
  'arrow-down': 'M12 5v14M6 13l6 6 6-6',
  'chevron-down': 'M6 9l6 6 6-6',
  'chevron-right': 'M9 6l6 6-6 6',
  menu: 'M4 7h16M4 12h16M4 17h16',
  close: 'M6 6l12 12M18 6 6 18',
  plus: 'M12 5v14M5 12h14',
  check: 'M20 6 9 17l-5-5',
  external: 'M14 4h6v6M20 4l-8 8M18 14v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h5',

  /* --- Contact -------------------------------------------------------- */
  mail: 'M3 6h18v12H3zM3 7l9 6.5L21 7',
  phone:
    'M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3a1.5 1.5 0 0 1-1.7 1.5A17 17 0 0 1 4.5 5.2 1.5 1.5 0 0 1 6 3.5z',
  'map-pin':
    'M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11zM12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  message: 'M21 12a8 8 0 0 1-8 8H8l-5 3 1.2-4.3A8 8 0 0 1 13 4a8 8 0 0 1 8 8z',

  /* --- AI & engineering ----------------------------------------------- */
  cpu: 'M6 6h12v12H6zM9.5 9.5h5v5h-5zM9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3',
  bot: 'M7 8h10a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-5a3 3 0 0 1 3-3zM12 4v4M9.5 13.5h.01M14.5 13.5h.01',
  code: 'M9 18l-6-6 6-6M15 6l6 6-6 6',
  terminal: 'M4 4h16v16H4zM8 10l2.5 2.5L8 15M13 15h4',
  layers: 'M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5',
  database:
    'M12 3c4.4 0 8 1.1 8 2.5S16.4 8 12 8 4 6.9 4 5.5 7.6 3 12 3zM4 5.5v13C4 19.9 7.6 21 12 21s8-1.1 8-2.5v-13M4 12c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5',
  workflow: 'M5 4h5v5H5zM14 15h5v5h-5zM7.5 9v4a2 2 0 0 0 2 2h4.5',
  'git-branch':
    'M6 4v10M6 20a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM18 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM18 9v2a4 4 0 0 1-4 4H6',
  sparkles:
    'M12 3l1.9 4.6L18.5 9.5l-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9zM18 15l.9 2.1L21 18l-2.1.9L18 21l-.9-2.1L15 18l2.1-.9z',
  zap: 'M13 2L4 14h6l-1 8 9-12h-6z',
  gauge: 'M20.5 17a9.5 9.5 0 1 0-17 0M12 13l4.5-4.5',
  shield: 'M12 3l8 3v6c0 4.5-3.3 8.3-8 9.5-4.7-1.2-8-5-8-9.5V6z',
  lock: 'M5 11h14v10H5zM8 11V8a4 4 0 0 1 8 0v3',

  /* --- Product & business --------------------------------------------- */
  rocket:
    'M12 3c3 2 5 5.5 5 9.5V17l-5 4-5-4v-4.5C7 8.5 9 5 12 3zM12 11.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z',
  target:
    'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 16.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9zM12 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z',
  'trending-up': 'M3 17l6-6 4 4 8-8M15 7h6v6',
  users:
    'M16 20v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 10a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM17 4.5a3.5 3.5 0 0 1 0 7M22 20v-2a4 4 0 0 0-3-3.8',
  building:
    'M5 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M16 10h3a2 2 0 0 1 2 2v9M3 21h18M9 7h3M9 11h3M9 15h3',
  briefcase:
    'M4 8h16v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zM9 8V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M4 13h16',
  globe:
    'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3 12h18M12 3c2.5 2.4 3.8 5.5 3.8 9S14.5 18.6 12 21c-2.5-2.4-3.8-5.5-3.8-9S9.5 5.4 12 3z',
  search: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM16.8 16.8L21 21',
  home: 'M4 10l8-6 8 6v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zM9.5 21v-6h5v6',
  compass:
    'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM15.5 8.5l-2 5-5 2 2-5z',

  /* --- Process & documents -------------------------------------------- */
  'clipboard-check':
    'M9 4h6v2H9zM8 4H6a1 1 0 0 0-1 1v15a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-2M9 13l2 2 4-4',
  'file-text':
    'M14 3H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7zM14 3v4h4M9 12h6M9 16h6',
  scale:
    'M12 3v18M7 21h10M12 6l-6 2 3 6a3.2 3.2 0 0 1-6 0zM12 6l6 2-3 6a3.2 3.2 0 0 0 6 0z',
  graduation:
    'M2 9l10-4 10 4-10 4zM6 11v4c0 1.7 2.7 3 6 3s6-1.3 6-3v-4M20 10v5',
  calendar: 'M4 6h16v15H4zM4 10h16M9 3v4M15 3v4',

  /* --- Feedback ------------------------------------------------------- */
  'check-circle': 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM8.5 12.5l2.5 2.5 4.5-5',
  alert: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 8v5M12 16h.01',
  info: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 11v5M12 8h.01',
  image: 'M4 4h16v16H4zM9 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM4 16l5-4 4 3 3-2 4 3',

  /* --- Theme ----------------------------------------------------------- */
  sun: 'M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4',
  moon: 'M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z',
  monitor: 'M3 5h18v11H3zM9 20h6M12 16v4'
};
