import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

let uid = 0;

/**
 * The VriddhiOne mark and wordmark.
 *
 * The mark is three nested quarter-arcs radiating from a single origin point —
 * *vriddhi* (वृद्धि), growth, expanding outward from a seed. Gradient runs
 * gold to violet: the heritage and the machine.
 */
@Component({
  selector: 'app-logo',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="logo" [class.logo--stacked]="stacked">
      <svg
        class="logo__mark"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient [attr.id]="gid" x1="3" y1="21" x2="21" y2="3" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#F0C96A" />
            <stop offset="0.55" stop-color="#E3B341" />
            <stop offset="1" stop-color="#7C5CFF" />
          </linearGradient>
        </defs>
        <!-- origin -->
        <circle cx="3.6" cy="20.4" r="1.9" [attr.fill]="'url(#' + gid + ')'" />
        <!-- three expanding arcs -->
        <path
          d="M3.5 13.2A7.3 7.3 0 0 1 10.8 20.5"
          [attr.stroke]="'url(#' + gid + ')'"
          stroke-width="2"
          stroke-linecap="round"
          opacity="0.95"
        />
        <path
          d="M3.5 7.6A12.9 12.9 0 0 1 16.4 20.5"
          [attr.stroke]="'url(#' + gid + ')'"
          stroke-width="2"
          stroke-linecap="round"
          opacity="0.6"
        />
        <path
          d="M3.5 2A18.5 18.5 0 0 1 22 20.5"
          [attr.stroke]="'url(#' + gid + ')'"
          stroke-width="2"
          stroke-linecap="round"
          opacity="0.3"
        />
      </svg>

      @if (showText) {
        <span class="logo__text">
          <span class="logo__word">
            Vriddhi<span class="logo__word-alt">One</span>
          </span>
          @if (showSub) {
            <span class="logo__sub">AI Systems</span>
          }
        </span>
      }
    </span>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
        line-height: 0;
      }

      .logo {
        display: inline-flex;
        align-items: center;
        gap: 0.6rem;
      }

      .logo--stacked {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.85rem;
      }

      .logo__mark {
        flex: none;
        width: var(--logo-mark, 1.75rem);
        height: var(--logo-mark, 1.75rem);
        transition: transform var(--t-slow) var(--ease);
      }

      :host(:hover) .logo__mark {
        transform: rotate(-12deg) scale(1.06);
      }

      .logo__text {
        display: flex;
        flex-direction: column;
        gap: 0.1rem;
        line-height: 1;
      }

      .logo__word {
        font-family: var(--font-display);
        font-size: var(--logo-size, 1.12rem);
        font-weight: 700;
        letter-spacing: -0.035em;
        color: var(--fg-strong);
        white-space: nowrap;
      }

      /* "One" sits back a step so "Vriddhi" carries the name. */
      .logo__word-alt {
        font-weight: 400;
        color: var(--fg-faint);
      }

      .logo__sub {
        font-family: var(--font-mono);
        font-size: 0.56rem;
        font-weight: 500;
        letter-spacing: 0.26em;
        text-transform: uppercase;
        color: var(--accent);
      }
    `
  ]
})
export class LogoComponent {
  /** Show the wordmark alongside the glyph. */
  @Input() showText = true;

  /** Show the "AI Systems" descriptor under the wordmark. */
  @Input() showSub = true;

  /** Stack the glyph above the wordmark instead of beside it. */
  @Input() stacked = false;

  /** Unique gradient id, so several logos on one page don't collide. */
  readonly gid = `vo-logo-${++uid}`;
}
