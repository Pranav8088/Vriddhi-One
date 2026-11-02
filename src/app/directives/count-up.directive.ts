import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  inject
} from '@angular/core';

/**
 * Counts a number up when it first scrolls into view.
 *
 *   <span [appCountUp]="12" suffix="+"></span>
 *   <span [appCountUp]="99.9" [decimals]="1" suffix="%"></span>
 *
 * Writes into textContent only — no template bindings, so it never fights
 * change detection. Under `prefers-reduced-motion` the final value is set
 * immediately.
 */
@Directive({
  selector: '[appCountUp]',
  standalone: true
})
export class CountUpDirective implements OnInit, OnDestroy {
  /** Target value. */
  @Input('appCountUp') target = 0;

  @Input() decimals = 0;
  @Input() prefix = '';
  @Input() suffix = '';

  /** Duration in ms. */
  @Input() duration = 1600;

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private observer: IntersectionObserver | null = null;
  private frame = 0;
  private started = false;

  ngOnInit(): void {
    const el = this.host.nativeElement;

    // Reserve the final width so the layout does not jump as digits grow.
    el.style.fontVariantNumeric = 'tabular-nums';
    this.render(0);

    if (this.prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
      this.render(this.target);
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting) && !this.started) {
          this.started = true;
          this.observer?.disconnect();
          this.observer = null;
          this.run();
        }
      },
      { threshold: 0.4 }
    );
    this.observer.observe(el);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    cancelAnimationFrame(this.frame);
  }

  private run(): void {
    const start = performance.now();
    const from = 0;
    const delta = this.target - from;

    const tick = (now: number) => {
      const t = Math.min((now - start) / this.duration, 1);
      // easeOutExpo — fast out of the gate, long settle.
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      this.render(from + delta * eased);

      if (t < 1) {
        this.frame = requestAnimationFrame(tick);
      } else {
        this.render(this.target);
      }
    };

    this.frame = requestAnimationFrame(tick);
  }

  private render(value: number): void {
    this.host.nativeElement.textContent =
      this.prefix + value.toFixed(this.decimals) + this.suffix;
  }

  private prefersReducedMotion(): boolean {
    return (
      typeof matchMedia !== 'undefined' &&
      matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }
}
