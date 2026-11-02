import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ADDRESS } from '../../core/site.config';

/**
 * Registered office, plotted.
 *
 * Deliberately NOT a fake street map. Inventing road geometry for a place we
 * cannot verify would be a drawing that lies; a coordinate plot states only
 * what is true — the position, to two decimal places, inside a technical
 * frame. It also needs no map-tile provider, no API key, and no third-party
 * request from a page whose privacy policy promises none.
 *
 * Amravati sits at approximately 20.93° N, 77.75° E.
 */
@Component({
  selector: 'app-location-map',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      viewBox="0 0 640 400"
      role="img"
      aria-labelledby="lm-title lm-desc"
      preserveAspectRatio="xMidYMid meet"
    >
      <title id="lm-title">Registered office location</title>
      <desc id="lm-desc">
        {{ address.oneLine }}, plotted at approximately 20.93 degrees north,
        77.75 degrees east.
      </desc>

      <defs>
        <radialGradient id="lm-glow">
          <stop offset="0" stop-color="#e3b341" stop-opacity="0.3" />
          <stop offset="0.6" stop-color="#e3b341" stop-opacity="0.07" />
          <stop offset="1" stop-color="#e3b341" stop-opacity="0" />
        </radialGradient>

        <pattern id="lm-grid" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M48 0H0v48" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1" />
        </pattern>

        <pattern id="lm-grid-fine" width="12" height="12" patternUnits="userSpaceOnUse">
          <path d="M12 0H0v12" fill="none" stroke="rgba(255,255,255,0.022)" stroke-width="1" />
        </pattern>

        <clipPath id="lm-frame-clip">
          <rect x="24" y="24" width="592" height="352" rx="6" />
        </clipPath>
      </defs>

      <!-- Grid, clipped to the frame -->
      <g clip-path="url(#lm-frame-clip)">
        <rect x="24" y="24" width="592" height="352" fill="url(#lm-grid-fine)" />
        <rect x="24" y="24" width="592" height="352" fill="url(#lm-grid)" />

        <!-- Crosshair through the plotted point -->
        <line class="lm-cross" x1="24" y1="200" x2="616" y2="200" />
        <line class="lm-cross" x1="280" y1="24" x2="280" y2="376" />

        <!-- The point itself -->
        <circle cx="280" cy="200" r="70" fill="url(#lm-glow)" />
        <circle class="lm-ring lm-ring--3" cx="280" cy="200" r="56" />
        <circle class="lm-ring lm-ring--2" cx="280" cy="200" r="36" />
        <circle class="lm-ring lm-ring--1" cx="280" cy="200" r="18" />
        <circle class="lm-pin__halo" cx="280" cy="200" r="9" />
        <circle class="lm-pin" cx="280" cy="200" r="4.5" />
      </g>

      <!-- Technical frame with corner ticks -->
      <rect class="lm-frame" x="24" y="24" width="592" height="352" rx="6" />
      <path class="lm-tick" d="M24 44 V 24 H 44" />
      <path class="lm-tick" d="M596 24 H 616 V 44" />
      <path class="lm-tick" d="M616 356 V 376 H 596" />
      <path class="lm-tick" d="M44 376 H 24 V 356" />

      <!-- Title block -->
      <text class="lm-eyebrow" x="48" y="52">REGISTERED OFFICE</text>
      <text class="lm-city" x="48" y="80">{{ address.city }}</text>
      <text class="lm-region" x="48" y="98">
        {{ address.state }} · {{ address.country }}
      </text>

      <!-- Coordinate readout, beside the point -->
      <text class="lm-coord" x="348" y="194">20.93° N</text>
      <text class="lm-coord" x="348" y="210">77.75° E</text>
      <line class="lm-coord__rule" x1="340" y1="188" x2="340" y2="216" />

      <!-- Compass -->
      <g class="lm-compass">
        <path class="lm-compass__arrow" d="M584 48 l7 18 h-14 z" />
        <text class="lm-compass__n" x="584" y="82">N</text>
      </g>

      <!-- Street line -->
      <text class="lm-addr" x="48" y="356">
        {{ address.line1 }} · {{ address.postalCode }}
      </text>
    </svg>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }

      svg {
        width: 100%;
        height: auto;
        display: block;
      }

      /* ---- Frame -------------------------------------------------------- */

      .lm-frame {
        fill: none;
        stroke: rgba(255, 255, 255, 0.08);
        stroke-width: 1;
      }

      .lm-tick {
        fill: none;
        stroke: var(--gold-600);
        stroke-width: 1.5;
        opacity: 0.8;
      }

      .lm-cross {
        stroke: rgba(255, 255, 255, 0.14);
        stroke-width: 1;
        stroke-dasharray: 2 6;
      }

      /* ---- The point ----------------------------------------------------- */

      .lm-ring {
        fill: none;
        stroke: rgba(227, 179, 65, 0.3);
        stroke-width: 1;
        /* view-box makes transform-origin resolve in viewBox coordinates. */
        transform-box: view-box;
        transform-origin: 280px 200px;
      }

      .lm-ring--1 {
        animation: lm-pulse 3.6s var(--ease-in-out) infinite;
      }

      .lm-ring--2 {
        stroke: rgba(227, 179, 65, 0.2);
        animation: lm-pulse 3.6s var(--ease-in-out) infinite 0.5s;
      }

      .lm-ring--3 {
        stroke: rgba(124, 92, 255, 0.18);
        animation: lm-pulse 3.6s var(--ease-in-out) infinite 1s;
      }

      @keyframes lm-pulse {
        0%,
        100% {
          transform: scale(0.94);
          opacity: 0.5;
        }
        50% {
          transform: scale(1.06);
          opacity: 1;
        }
      }

      .lm-pin__halo {
        fill: none;
        stroke: var(--gold-500);
        stroke-width: 1.25;
      }

      .lm-pin {
        fill: var(--gold-400);
      }

      /* ---- Type ---------------------------------------------------------- */

      .lm-eyebrow {
        font-family: var(--font-mono);
        font-size: 8.5px;
        font-weight: 500;
        letter-spacing: 0.22em;
        fill: var(--gold-500);
      }

      .lm-city {
        font-family: var(--font-display);
        font-size: 22px;
        font-weight: 700;
        letter-spacing: -0.03em;
        fill: var(--fg-strong);
      }

      .lm-region {
        font-family: var(--font-mono);
        font-size: 9px;
        letter-spacing: 0.1em;
        fill: var(--fg-faint);
      }

      .lm-coord {
        font-family: var(--font-mono);
        font-size: 11px;
        font-weight: 500;
        letter-spacing: 0.06em;
        fill: var(--gold-300);
      }

      .lm-coord__rule {
        stroke: var(--gold-600);
        stroke-width: 1;
      }

      .lm-addr {
        font-family: var(--font-body);
        font-size: 10px;
        fill: var(--fg-faint);
      }

      .lm-compass__arrow {
        fill: none;
        stroke: var(--fg-faint);
        stroke-width: 1.25;
        stroke-linejoin: round;
      }

      .lm-compass__n {
        font-family: var(--font-mono);
        font-size: 9px;
        letter-spacing: 0.1em;
        fill: var(--fg-faint);
        text-anchor: middle;
      }

      @media (prefers-reduced-motion: reduce) {
        .lm-ring--1,
        .lm-ring--2,
        .lm-ring--3 {
          animation: none;
        }
      }
    `
  ]
})
export class LocationMapComponent {
  readonly address = ADDRESS;
}
