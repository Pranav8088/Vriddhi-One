import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { IconComponent } from '../icon/icon.component';
import { ThemePreference, ThemeService } from '../../core/theme.service';

/**
 * Light / system / dark, as a three-position control.
 *
 * Buttons rather than a single cycling toggle: a visitor can see which of the
 * three is active, and "system" is reachable directly instead of by guessing
 * how many presses it takes.
 */
@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="tt" role="group" aria-label="Colour theme">
      @for (opt of options; track opt.value) {
        <button
          class="tt__btn"
          type="button"
          [class.is-on]="theme.preference() === opt.value"
          [attr.aria-pressed]="theme.preference() === opt.value"
          [attr.title]="opt.label + ' theme'"
          (click)="theme.set(opt.value)"
        >
          <app-icon [name]="opt.icon" size="0.95rem" />
          <span class="sr-only">{{ opt.label }} theme</span>
        </button>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
      }

      .tt {
        display: inline-flex;
        align-items: center;
        gap: 2px;
        padding: 3px;
        border: 1px solid var(--line);
        border-radius: var(--r-pill);
        background: var(--bg-sunken);
      }

      .tt__btn {
        display: grid;
        place-items: center;
        width: 1.85rem;
        height: 1.85rem;
        border-radius: var(--r-pill);
        color: var(--fg-faint);
        transition:
          color var(--t-fast) var(--ease),
          background-color var(--t-fast) var(--ease);
      }

      .tt__btn:hover {
        color: var(--fg);
      }

      .tt__btn.is-on {
        background: var(--bg-raised);
        color: var(--accent);
        box-shadow: var(--sh-sm);
      }
    `
  ]
})
export class ThemeToggleComponent {
  readonly theme = inject(ThemeService);

  readonly options: readonly {
    value: ThemePreference;
    label: string;
    icon: string;
  }[] = [
    { value: 'light', label: 'Light', icon: 'sun' },
    { value: 'system', label: 'System', icon: 'monitor' },
    { value: 'dark', label: 'Dark', icon: 'moon' }
  ];
}
