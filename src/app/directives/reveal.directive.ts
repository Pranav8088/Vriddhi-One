import {
  Directive,
  ElementRef,
  Input,
  afterNextRender,
  inject
} from '@angular/core';

/**
 * Marks an element for a scroll reveal.
 *
 *   <div appReveal>…</div>
 *   <div appReveal="left" [revealDelay]="120">…</div>
 *   <div appReveal [revealStagger]="80">   <!-- staggers direct children -->
 *
 * All this does is set `data-reveal` and, where a group needs staggering,
 * `--reveal-i`. The animation itself is native CSS scroll-driven motion
 * (`animation-timeline: view()`), so there is no IntersectionObserver, no
 * scroll handler and nothing to tear down — see `_animations.scss`.
 *
 * Runs in `afterNextRender`, not `ngOnInit`: when the children come from an
 * `@for` block they do not exist yet at init, so reading `el.children` there
 * returns nothing and the stagger silently does nothing at all.
 *
 * `revealDelay` is kept for template compatibility, but a time delay means
 * nothing on a scroll timeline — it is folded into the same stagger index,
 * which shifts where in the element's viewport pass the animation starts.
 */
@Directive({
  selector: '[appReveal]',
  standalone: true
})
export class RevealDirective {
  /** Entrance direction. Empty string (bare attribute) means "up". */
  @Input('appReveal') variant: '' | 'up' | 'left' | 'right' | 'scale' | 'blur' =
    'up';

  /** Historical millisecond delay; 80ms was the old unit, so 80ms = one step. */
  @Input() revealDelay = 0;

  /** Stagger the host's direct children instead of the host itself. */
  @Input() revealStagger = 0;

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    // Inputs are bound by the time the first render completes.
    afterNextRender(() => this.apply());
  }

  private apply(): void {
    const el = this.host.nativeElement;
    const variant = this.variant || 'up';
    const base = Math.round(this.revealDelay / 80);

    if (this.revealStagger > 0) {
      const children = Array.from(el.children) as HTMLElement[];
      if (children.length > 0) {
        children.forEach((child, i) => {
          child.setAttribute('data-reveal', variant);
          this.setIndex(child, base + i);
        });
        return;
      }
      // No children to stagger: reveal the host so the section still animates
      // rather than silently doing nothing.
    }

    el.setAttribute('data-reveal', variant);
    this.setIndex(el, base);
  }

  private setIndex(el: HTMLElement, index: number): void {
    if (index > 0) {
      // Capped: a long list must not push the last item's start past the end
      // of its own viewport pass, which would leave it never animating.
      el.style.setProperty('--reveal-i', String(Math.min(index, 8)));
    }
  }
}
