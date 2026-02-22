import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

@Directive({ selector: '[appReveal]', standalone: true })
export class RevealDirective implements OnInit, OnDestroy {
  @Input() revealDelay   = 0;
  @Input() revealDir: 'up'|'left'|'right' = 'up';
  @Input() revealThreshold = 0.12;

  private observer!: IntersectionObserver;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    const el = this.el.nativeElement;
    el.classList.add('reveal');
    if (this.revealDir === 'left')  el.classList.add('reveal--left');
    if (this.revealDir === 'right') el.classList.add('reveal--right');
    if (this.revealDelay) el.style.transitionDelay = `${this.revealDelay}ms`;

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          this.observer.unobserve(el);
        }
      },
      { threshold: this.revealThreshold }
    );
    this.observer.observe(el);
  }

  ngOnDestroy(): void { this.observer?.disconnect(); }
}
