import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  inject
} from '@angular/core';

/**
 * Scroll reveal.
 *
 * Adds `data-reveal="<variant>"` to the host (the CSS in `_animations.scss`
 * hides it) and `.is-in` once it crosses into the viewport.
 *
 *   <div appReveal>…</div>
 *   <div appReveal="left" [revealDelay]="120">…</div>
 *   <div appReveal [revealStagger]="80">   <!-- staggers direct children -->
 *
 * One IntersectionObserver is shared by every instance on the page, so a grid
 * of 40 cards still costs a single observer. Under `prefers-reduced-motion`
 * nothing is observed at all — elements are simply shown.
 */
@Directive({
  selector: '[appReveal]',
  standalone: true
})
export class RevealDirective implements OnInit, OnDestroy {
  /** Entrance direction. Empty string (bare attribute) means "up". */
  @Input('appReveal') variant: '' | 'up' | 'left' | 'right' | 'scale' | 'blur' =
    'up';

  /** Delay before this element animates, in ms. */
  @Input() revealDelay = 0;

  /**
   * When set, the host itself is not animated — its direct children are, each
   * one `revealStagger` ms after the last.
   */
  @Input() revealStagger = 0;

  /** Fraction of the element that must be visible to trigger. */
  @Input() revealThreshold = 0.12;

  /** Keep the element revealed after it scrolls back out. */
  @Input() revealOnce = true;

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  /** Elements this instance is responsible for (host, or its children). */
  private targets: HTMLElement[] = [];

  // --- Shared observer -----------------------------------------------------

  private static observer: IntersectionObserver | null = null;
  private static readonly registry = new WeakMap<Element, RevealDirective>();
  private static refCount = 0;

  private static ensureObserver(threshold: number): IntersectionObserver {
    if (!RevealDirective.observer) {
      RevealDirective.observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const el = entry.target as HTMLElement;
            const dir = RevealDirective.registry.get(el);
            if (!dir) continue;

            if (entry.isIntersecting) {
              el.classList.add('is-in');
              if (dir.revealOnce) {
                RevealDirective.observer?.unobserve(el);
                RevealDirective.registry.delete(el);
              }
            } else if (!dir.revealOnce) {
              el.classList.remove('is-in');
            }
          }
        },
        {
          threshold,
          // Trigger slightly before the element's top edge arrives, and
          // ignore the bottom 8% so things don't pop in at the fold.
          rootMargin: '0px 0px -8% 0px'
        }
      );
    }
    return RevealDirective.observer;
  }

  // --- Lifecycle -----------------------------------------------------------

  ngOnInit(): void {
    const el = this.host.nativeElement;
    const variant = this.variant || 'up';

    this.targets =
      this.revealStagger > 0
        ? (Array.from(el.children) as HTMLElement[])
        : [el];

    this.targets.forEach((target, i) => {
      target.setAttribute('data-reveal', variant);
      const delay = this.revealDelay + i * this.revealStagger;
      if (delay > 0) {
        target.style.setProperty('--reveal-delay', `${delay}ms`);
      }
    });

    if (this.prefersReducedMotion()) {
      this.targets.forEach((t) => t.classList.add('is-in'));
      return;
    }

    // IntersectionObserver is in every browser we target, but a missing
    // implementation must not leave the page invisible.
    if (typeof IntersectionObserver === 'undefined') {
      this.targets.forEach((t) => t.classList.add('is-in'));
      return;
    }

    const observer = RevealDirective.ensureObserver(this.revealThreshold);
    this.targets.forEach((target) => {
      RevealDirective.registry.set(target, this);
      observer.observe(target);
    });
    RevealDirective.refCount += this.targets.length;
  }

  ngOnDestroy(): void {
    if (!RevealDirective.observer) return;

    this.targets.forEach((target) => {
      if (RevealDirective.registry.has(target)) {
        RevealDirective.observer?.unobserve(target);
        RevealDirective.registry.delete(target);
        RevealDirective.refCount--;
      }
    });

    // Tear the observer down once the last reveal on the page has gone.
    if (RevealDirective.refCount <= 0) {
      RevealDirective.observer.disconnect();
      RevealDirective.observer = null;
      RevealDirective.refCount = 0;
    }
  }

  private prefersReducedMotion(): boolean {
    return (
      typeof matchMedia !== 'undefined' &&
      matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }
}
