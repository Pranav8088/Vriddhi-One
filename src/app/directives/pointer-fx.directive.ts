import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  inject
} from '@angular/core';

/**
 * Pointer-reactive surface.
 *
 * Tracks the cursor across the host and publishes its position as CSS custom
 * properties, so the visual treatment stays entirely in CSS:
 *
 *   --mx / --my   cursor position as a percentage (for the spotlight gradient)
 *   --rx / --ry   tilt rotation in deg (only when [tilt] is on)
 *
 *   <article class="card card--spot" appPointerFx>…</article>
 *   <article class="card card--spot" appPointerFx [tilt]="true">…</article>
 *
 * Listeners are passive and attached only on pointer entry, so a page full of
 * cards is idle until you actually touch one. Skipped entirely for coarse
 * pointers (touch) and under `prefers-reduced-motion`.
 */
@Directive({
  selector: '[appPointerFx]',
  standalone: true
})
export class PointerFxDirective implements OnInit, OnDestroy {
  /** Add a subtle 3D tilt as well as the spotlight. */
  @Input() tilt = false;

  /** Maximum tilt in degrees. */
  @Input() tiltMax = 5;

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private frame = 0;
  private enabled = false;

  private readonly onEnter = () => {
    this.host.nativeElement.addEventListener('pointermove', this.onMove, {
      passive: true
    });
  };

  private readonly onMove = (event: PointerEvent) => {
    // Coalesce to one update per frame; pointermove fires far faster.
    cancelAnimationFrame(this.frame);
    this.frame = requestAnimationFrame(() => this.apply(event));
  };

  private readonly onLeave = () => {
    cancelAnimationFrame(this.frame);
    this.host.nativeElement.removeEventListener('pointermove', this.onMove);

    const style = this.host.nativeElement.style;
    style.setProperty('--mx', '50%');
    style.setProperty('--my', '50%');
    if (this.tilt) {
      style.setProperty('--rx', '0deg');
      style.setProperty('--ry', '0deg');
    }
  };

  ngOnInit(): void {
    if (!this.supported()) return;

    this.enabled = true;
    const el = this.host.nativeElement;
    el.addEventListener('pointerenter', this.onEnter, { passive: true });
    el.addEventListener('pointerleave', this.onLeave, { passive: true });

    if (this.tilt) {
      el.style.transformStyle = 'preserve-3d';
      el.style.transform =
        'perspective(1100px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))';
    }
  }

  ngOnDestroy(): void {
    if (!this.enabled) return;

    cancelAnimationFrame(this.frame);
    const el = this.host.nativeElement;
    el.removeEventListener('pointerenter', this.onEnter);
    el.removeEventListener('pointerleave', this.onLeave);
    el.removeEventListener('pointermove', this.onMove);
  }

  private apply(event: PointerEvent): void {
    const el = this.host.nativeElement;
    const rect = el.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    // 0..1 across the element.
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    el.style.setProperty('--mx', `${(px * 100).toFixed(2)}%`);
    el.style.setProperty('--my', `${(py * 100).toFixed(2)}%`);

    if (this.tilt) {
      // Centre the range on 0 and invert Y so the surface leans toward the
      // cursor rather than away from it.
      el.style.setProperty(
        '--ry',
        `${((px - 0.5) * 2 * this.tiltMax).toFixed(2)}deg`
      );
      el.style.setProperty(
        '--rx',
        `${(-(py - 0.5) * 2 * this.tiltMax).toFixed(2)}deg`
      );
    }
  }

  private supported(): boolean {
    if (typeof matchMedia === 'undefined') return false;
    return (
      matchMedia('(hover: hover) and (pointer: fine)').matches &&
      !matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }
}
