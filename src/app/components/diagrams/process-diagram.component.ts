import { ChangeDetectionStrategy, Component } from '@angular/core';

interface Stage {
  readonly no: string;
  readonly name: string;
  readonly duration: string;
  readonly y: number;
}

/**
 * The five-phase engagement process, drawn rather than photographed.
 *
 * The point of the diagram is the gate: after Prove, the honest answer may be
 * "stop", and the dashed branch says so visually. A flowchart that only ever
 * goes forward would be a prettier lie.
 *
 * Layout notes — the vertical budget is tight, so the numbers matter:
 *   header rule 36 · nodes 70/138/248/316/384 · gate 193 · footer rule 418
 * The 110px gap between phases 02 and 03 exists to give the gate its own
 * band; node rings are r=22, so a 68px gap would leave no room for it.
 */
@Component({
  selector: 'app-process-diagram',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      viewBox="0 0 600 450"
      role="img"
      aria-labelledby="pd-title pd-desc"
      preserveAspectRatio="xMidYMid meet"
    >
      <title id="pd-title">The five-phase engagement process</title>
      <desc id="pd-desc">
        Understand, one to two weeks. Prove, two to four weeks, followed by a
        go or no-go decision gate from which the project may stop. Then Build,
        six to twelve weeks; Harden, two to three weeks; and Operate, ongoing.
      </desc>

      <defs>
        <!-- userSpaceOnUse is required: the spine is a vertical path, so its
             bounding box has zero width and an objectBoundingBox gradient
             degenerates to nothing — the line renders invisible. -->
        <linearGradient
          id="pd-spine"
          gradientUnits="userSpaceOnUse"
          x1="150"
          y1="70"
          x2="150"
          y2="384"
        >
          <stop class="pd-s0" offset="0" />
          <stop class="pd-s1" offset="0.45" />
          <stop class="pd-s2" offset="1" />
        </linearGradient>

        <radialGradient id="pd-halo">
          <stop class="pd-h0" offset="0" />
          <stop class="pd-h1" offset="1" />
        </radialGradient>

        <pattern id="pd-grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0H0v24" fill="none" class="pd-gridline" stroke-width="1" />
        </pattern>

        <radialGradient id="pd-fade">
          <stop offset="0.25" stop-color="#fff" stop-opacity="1" />
          <stop offset="1" stop-color="#fff" stop-opacity="0" />
        </radialGradient>
        <mask id="pd-grid-mask">
          <rect width="600" height="450" fill="url(#pd-fade)" />
        </mask>
      </defs>

      <rect width="600" height="450" fill="url(#pd-grid)" mask="url(#pd-grid-mask)" />

      <text class="pd-eyebrow" x="40" y="26">ENGAGEMENT PROCESS</text>
      <line class="pd-rule" x1="40" y1="36" x2="560" y2="36" />

      <path class="pd-spine" d="M150 70 V 384" stroke="url(#pd-spine)" />
      <path class="pd-pulse" d="M150 70 V 384" stroke="url(#pd-spine)" />

      <!-- Decision gate, in its own band between Prove and Build -->
      <g class="pd-gate">
        <circle cx="150" cy="193" r="28" fill="url(#pd-halo)" />
        <rect
          x="139"
          y="182"
          width="22"
          height="22"
          rx="4"
          transform="rotate(45 150 193)"
          class="pd-gate__shape"
        />
        <text class="pd-gate__mark" x="150" y="197">?</text>

        <!-- The branch that admits the project can end here -->
        <path class="pd-branch" d="M165 199 C 196 214, 214 216, 236 216" />
        <circle class="pd-branch__end" cx="238" cy="216" r="2.5" />
        <text class="pd-gate__label" x="248" y="213">NO-GO</text>
        <text class="pd-gate__sub" x="248" y="226">project can stop here</text>
      </g>

      @for (s of stages; track s.no) {
        <g class="pd-stage">
          <circle class="pd-node__ring" cx="150" [attr.cy]="s.y" r="22" />
          <circle class="pd-node" cx="150" [attr.cy]="s.y" r="12" />
          <circle class="pd-node__core" cx="150" [attr.cy]="s.y" r="3.5" />

          <text class="pd-no" x="196" [attr.y]="s.y - 7">{{ s.no }}</text>
          <text class="pd-name" x="196" [attr.y]="s.y + 9">{{ s.name }}</text>
          <text class="pd-dur" x="560" [attr.y]="s.y + 3">{{ s.duration }}</text>
        </g>
      }

      <line class="pd-rule" x1="40" y1="418" x2="560" y2="418" />
      <text class="pd-foot" x="40" y="437">
        Demonstrable software at the end of every two-week cycle
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

      /* Gradient stops cannot read var() from a presentation attribute, so
         they are styled here instead and follow the theme. */
      .pd-s0 { stop-color: var(--accent-strong); }
      .pd-s1 { stop-color: var(--accent); }
      .pd-s2 { stop-color: var(--accent-2); }
      .pd-h0 { stop-color: var(--accent); stop-opacity: 0.24; }
      .pd-h1 { stop-color: var(--accent); stop-opacity: 0; }
      .pd-gridline { stroke: var(--grid-line); }

      /* ---- Type ------------------------------------------------------ */

      .pd-eyebrow {
        font-family: var(--font-mono);
        font-size: 9px;
        font-weight: 500;
        letter-spacing: 0.22em;
        fill: var(--accent);
      }

      .pd-no {
        font-family: var(--font-mono);
        font-size: 8.5px;
        font-weight: 500;
        letter-spacing: 0.18em;
        fill: var(--fg-ghost);
      }

      .pd-name {
        font-family: var(--font-display);
        font-size: 17px;
        font-weight: 650;
        letter-spacing: -0.02em;
        fill: var(--fg-strong);
      }

      .pd-dur {
        font-family: var(--font-mono);
        font-size: 9.5px;
        letter-spacing: 0.04em;
        fill: var(--fg-faint);
        text-anchor: end;
      }

      .pd-foot {
        font-family: var(--font-body);
        font-size: 10.5px;
        fill: var(--fg-faint);
      }

      .pd-rule {
        stroke: var(--line);
        stroke-width: 1;
      }

      /* ---- Spine and nodes -------------------------------------------- */

      .pd-spine {
        fill: none;
        stroke-width: 1.5;
        opacity: 0.45;
      }

      /* A short dash travelling the spine. The path is 314 long, so the gap
         must exceed that for only one dash to be visible at a time. */
      .pd-pulse {
        fill: none;
        stroke-width: 2.5;
        stroke-linecap: round;
        stroke-dasharray: 26 320;
        stroke-dashoffset: 346;
        animation: pd-travel 4.5s linear infinite;
      }

      @keyframes pd-travel {
        to {
          stroke-dashoffset: 0;
        }
      }

      .pd-node__ring {
        fill: none;
        stroke: var(--line-mid);
        stroke-width: 1;
      }

      .pd-node {
        fill: var(--bg-raised);
        stroke: var(--accent);
        stroke-width: 1.5;
      }

      .pd-node__core {
        fill: var(--accent);
        transition: fill var(--t-base) var(--ease);
      }

      .pd-stage {
        transition: transform var(--t-base) var(--ease);
      }

      .pd-stage:hover {
        transform: translateX(3px);
      }

      .pd-stage:hover .pd-node__core {
        fill: var(--accent-strong);
      }

      /* ---- Gate -------------------------------------------------------- */

      .pd-gate__shape {
        fill: var(--bg-sunken);
        stroke: var(--accent);
        stroke-width: 1.5;
      }

      .pd-gate__mark {
        font-family: var(--font-display);
        font-size: 12px;
        font-weight: 700;
        fill: var(--accent);
        text-anchor: middle;
      }

      .pd-branch {
        fill: none;
        stroke: var(--accent-2);
        stroke-width: 1.25;
        stroke-dasharray: 3 4;
        opacity: 0.8;
      }

      .pd-branch__end {
        fill: var(--accent-2);
      }

      .pd-gate__label {
        font-family: var(--font-mono);
        font-size: 8.5px;
        font-weight: 500;
        letter-spacing: 0.14em;
        fill: var(--accent-2);
      }

      .pd-gate__sub {
        font-family: var(--font-body);
        font-size: 9.5px;
        font-style: italic;
        fill: var(--fg-ghost);
      }

      @media (prefers-reduced-motion: reduce) {
        .pd-pulse {
          animation: none;
          opacity: 0;
        }
      }
    `
  ]
})
export class ProcessDiagramComponent {
  readonly stages: readonly Stage[] = [
    { no: 'PHASE 01', name: 'Understand', duration: '1–2 weeks', y: 70 },
    { no: 'PHASE 02', name: 'Prove', duration: '2–4 weeks', y: 138 },
    { no: 'PHASE 03', name: 'Build', duration: '6–12 weeks', y: 248 },
    { no: 'PHASE 04', name: 'Harden', duration: '2–3 weeks', y: 316 },
    { no: 'PHASE 05', name: 'Operate', duration: 'ongoing', y: 384 }
  ];
}
