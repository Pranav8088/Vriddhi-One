import { ChangeDetectionStrategy, Component, Input, computed, signal } from '@angular/core';
import { IconComponent } from '../icon/icon.component';

export interface MarqueeItem {
  readonly label: string;
  readonly icon?: string;
}

/**
 * Seamless horizontal scroller.
 *
 * The item list is rendered twice and the track translates by exactly -50%,
 * so the second copy lands where the first began and the loop is invisible.
 * Masked at both edges, pauses on hover, and collapses to a static centred
 * wrap under `prefers-reduced-motion` (handled in `_components.scss`).
 */
@Component({
  selector: 'app-marquee',
  standalone: true,
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="marquee"
      [style.--marquee-speed]="speed"
      [style.--marquee-gap]="gap"
      role="list"
      [attr.aria-label]="ariaLabel"
    >
      <div class="marquee__track">
        @for (item of doubled(); track $index) {
          <span
            class="marquee__item"
            role="listitem"
            [attr.aria-hidden]="$index >= items.length ? 'true' : null"
          >
            @if (item.icon) {
              <app-icon [name]="item.icon" size="1rem" />
            }
            {{ item.label }}
          </span>
        }
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `
  ]
})
export class MarqueeComponent {
  @Input({ required: true })
  set items(value: readonly MarqueeItem[]) {
    this.source.set(value);
  }
  get items(): readonly MarqueeItem[] {
    return this.source();
  }

  /** CSS duration for one full pass. Larger = slower. */
  @Input() speed = '42s';

  @Input() gap = '2.75rem';

  @Input() ariaLabel = '';

  private readonly source = signal<readonly MarqueeItem[]>([]);

  /** The list, twice — second copy is aria-hidden so SRs read it once. */
  readonly doubled = computed(() => [...this.source(), ...this.source()]);
}
