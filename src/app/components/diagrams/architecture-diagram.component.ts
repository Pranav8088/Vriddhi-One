import { ChangeDetectionStrategy, Component } from '@angular/core';

interface Layer {
  readonly tag: string;
  readonly name: string;
  readonly parts: string;
  readonly y: number;
  /** The AI band is the one the whole diagram exists to place in context. */
  readonly accent?: boolean;
}

/**
 * How a VriddhiOne product is put together, layer by layer.
 *
 * Deliberately shows the model as *one band among five*, sitting between the
 * application and the data it reads — because the recurring argument on this
 * site is that the model is the smallest part of the work. An architecture
 * diagram with the AI in the middle of the stack makes that point faster than
 * a paragraph can.
 *
 * Layout: bands are 58 tall on a 70 pitch, from y=54 to y=392, with the
 * observability rail spanning the full stack on the right.
 */
@Component({
  selector: 'app-architecture-diagram',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      viewBox="0 0 600 450"
      role="img"
      aria-labelledby="ad-title ad-desc"
      preserveAspectRatio="xMidYMid meet"
    >
      <title id="ad-title">Product architecture, in five layers</title>
      <desc id="ad-desc">
        From top to bottom: client, edge and API, application, AI systems, and
        data. Observability spans every layer. The AI layer sits between the
        application and the data it reads, rather than standing alone.
      </desc>

      <defs>
        <linearGradient id="ad-band" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="rgba(255,255,255,0.065)" />
          <stop offset="1" stop-color="rgba(255,255,255,0.018)" />
        </linearGradient>

        <linearGradient id="ad-band-accent" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="rgba(227,179,65,0.16)" />
          <stop offset="0.6" stop-color="rgba(124,92,255,0.1)" />
          <stop offset="1" stop-color="rgba(124,92,255,0.04)" />
        </linearGradient>

        <linearGradient id="ad-rail" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="rgba(79,216,207,0.16)" />
          <stop offset="1" stop-color="rgba(79,216,207,0.04)" />
        </linearGradient>

        <pattern id="ad-grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0H0v24" fill="none" stroke="rgba(255,255,255,0.045)" stroke-width="1" />
        </pattern>
        <radialGradient id="ad-fade">
          <stop offset="0.3" stop-color="#fff" stop-opacity="1" />
          <stop offset="1" stop-color="#fff" stop-opacity="0" />
        </radialGradient>
        <mask id="ad-grid-mask">
          <rect width="600" height="450" fill="url(#ad-fade)" />
        </mask>
      </defs>

      <rect width="600" height="450" fill="url(#ad-grid)" mask="url(#ad-grid-mask)" />

      <text class="ad-eyebrow" x="40" y="26">PRODUCT ARCHITECTURE</text>
      <line class="ad-rule" x1="40" y1="36" x2="560" y2="36" />

      <!-- Observability rail, spanning the whole stack -->
      <g class="ad-railgroup">
        <rect
          class="ad-rail"
          x="494"
          y="54"
          width="66"
          height="338"
          rx="10"
          fill="url(#ad-rail)"
        />
        <text class="ad-rail__label" transform="rotate(-90 527 223)" x="527" y="223">
          OBSERVABILITY
        </text>
        @for (l of layers; track l.tag) {
          <line class="ad-rail__tick" x1="494" [attr.y1]="l.y + 29" x2="506" [attr.y2]="l.y + 29" />
        }
      </g>

      <!-- Layer bands -->
      @for (l of layers; track l.tag; let last = $last) {
        <g class="ad-layer" [class.ad-layer--accent]="l.accent">
          <rect
            class="ad-band"
            x="40"
            [attr.y]="l.y"
            width="440"
            height="58"
            rx="10"
            [attr.fill]="l.accent ? 'url(#ad-band-accent)' : 'url(#ad-band)'"
          />

          <text class="ad-tag" x="56" [attr.y]="l.y + 21">{{ l.tag }}</text>
          <text class="ad-name" x="56" [attr.y]="l.y + 39">{{ l.name }}</text>
          <text class="ad-parts" x="464" [attr.y]="l.y + 35">{{ l.parts }}</text>

          <!-- Flow chevron in the gap below each band except the last -->
          @if (!last) {
            <path class="ad-flow" [attr.d]="'M254 ' + (l.y + 63) + ' l6 5 l6 -5'" />
          }
        </g>
      }

      <line class="ad-rule" x1="40" y1="410" x2="560" y2="410" />
      <text class="ad-foot" x="40" y="430">
        The model is one band of five — the rest is the product
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

      /* ---- Type -------------------------------------------------------- */

      .ad-eyebrow {
        font-family: var(--font-mono);
        font-size: 9px;
        font-weight: 500;
        letter-spacing: 0.22em;
        fill: var(--gold-500);
      }

      .ad-tag {
        font-family: var(--font-mono);
        font-size: 8px;
        font-weight: 500;
        letter-spacing: 0.2em;
        fill: var(--fg-ghost);
      }

      .ad-name {
        font-family: var(--font-display);
        font-size: 15px;
        font-weight: 650;
        letter-spacing: -0.02em;
        fill: var(--fg-strong);
      }

      .ad-parts {
        font-family: var(--font-mono);
        font-size: 9px;
        letter-spacing: 0.02em;
        fill: var(--fg-faint);
        text-anchor: end;
      }

      .ad-foot {
        font-family: var(--font-body);
        font-size: 10.5px;
        fill: var(--fg-faint);
      }

      .ad-rule {
        stroke: rgba(255, 255, 255, 0.09);
        stroke-width: 1;
      }

      /* ---- Bands -------------------------------------------------------- */

      .ad-band {
        stroke: rgba(255, 255, 255, 0.1);
        stroke-width: 1;
        transition:
          stroke var(--t-base) var(--ease),
          transform var(--t-base) var(--ease);
      }

      .ad-layer {
        transition: transform var(--t-base) var(--ease);
      }

      .ad-layer:hover {
        transform: translateX(4px);
      }

      .ad-layer:hover .ad-band {
        stroke: rgba(255, 255, 255, 0.22);
      }

      /* The AI band carries the brand border and a soft outer glow. */
      .ad-layer--accent .ad-band {
        stroke: rgba(227, 179, 65, 0.42);
        filter: drop-shadow(0 0 14px rgba(227, 179, 65, 0.16));
      }

      .ad-layer--accent .ad-name {
        fill: var(--gold-300);
      }

      .ad-layer--accent .ad-parts {
        fill: rgba(240, 201, 106, 0.72);
      }

      .ad-flow {
        fill: none;
        stroke: rgba(255, 255, 255, 0.26);
        stroke-width: 1.4;
        stroke-linecap: round;
        stroke-linejoin: round;
      }

      /* ---- Observability rail -------------------------------------------- */

      .ad-rail {
        stroke: rgba(79, 216, 207, 0.3);
        stroke-width: 1;
      }

      .ad-rail__label {
        font-family: var(--font-mono);
        font-size: 9px;
        font-weight: 500;
        letter-spacing: 0.24em;
        fill: var(--teal-400);
        text-anchor: middle;
      }

      .ad-rail__tick {
        stroke: rgba(79, 216, 207, 0.45);
        stroke-width: 1;
      }
    `
  ]
})
export class ArchitectureDiagramComponent {
  readonly layers: readonly Layer[] = [
    { tag: 'L1', name: 'Client', parts: 'Angular SPA · Mobile', y: 54 },
    {
      tag: 'L2',
      name: 'Edge & API',
      parts: 'Auth · Rate limiting · Schema validation',
      y: 124
    },
    {
      tag: 'L3',
      name: 'Application',
      parts: 'Domain logic · Admin tooling · Jobs',
      y: 194
    },
    {
      tag: 'L4',
      name: 'AI systems',
      parts: 'Retrieval · Model · Guardrails · Evals',
      y: 264,
      accent: true
    },
    {
      tag: 'L5',
      name: 'Data',
      parts: 'PostgreSQL · pgvector · Object store',
      y: 334
    }
  ];
}
