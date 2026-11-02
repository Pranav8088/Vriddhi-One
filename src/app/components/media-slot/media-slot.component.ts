import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IconComponent } from '../icon/icon.component';

/**
 * Reserved space for artwork that hasn't been produced yet.
 *
 * Renders a labelled, correctly-proportioned placeholder telling whoever fills
 * it exactly what belongs there and at what size. The moment a real `src` is
 * supplied the placeholder disappears and the image takes the same box — so
 * the layout is designed once, against the final dimensions, and never has to
 * be reflowed when the graphics land.
 *
 *   <app-media-slot label="Platform diagram" spec="1600x1000 PNG" ratio="16/10" />
 *   <app-media-slot label="Roomie Hunt" src="assets/products/roomie-hunt.jpg" ratio="16/10" />
 */
@Component({
  selector: 'app-media-slot',
  standalone: true,
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (src) {
      <div class="media-slot media-slot--filled" [style.aspect-ratio]="ratio">
        <img
          class="media-slot__img"
          [src]="src"
          [alt]="alt || label"
          loading="lazy"
          decoding="async"
        />
      </div>
    } @else {
      <div
        class="media-slot"
        [style.aspect-ratio]="ratio"
        role="img"
        [attr.aria-label]="label + ' — artwork pending'"
      >
        <div class="media-slot__inner">
          <span class="media-slot__icon">
            <app-icon [name]="icon" size="1.2rem" />
          </span>
          <span class="media-slot__label">{{ label }}</span>
          @if (spec) {
            <span class="media-slot__spec">{{ spec }}</span>
          }
        </div>
      </div>
    }
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }
    `
  ]
})
export class MediaSlotComponent {
  /** What belongs in this slot. Shown to the person filling it. */
  @Input({ required: true }) label = '';

  /** Dimension hint, e.g. "1600x1000 JPG". */
  @Input() spec = '';

  /** CSS aspect-ratio for the box. */
  @Input() ratio = '16 / 10';

  /** Supply this and the real image replaces the placeholder. */
  @Input() src: string | null = null;

  /** Alt text for the real image. Falls back to `label`. */
  @Input() alt = '';

  /** Registry key for the placeholder glyph. */
  @Input() icon = 'image';
}
