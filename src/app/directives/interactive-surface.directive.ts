import { Directive, ElementRef, HostListener, Input, Renderer2, inject } from '@angular/core';

@Directive({
  selector: '[appInteractiveSurface]',
  standalone: true
})
export class InteractiveSurfaceDirective {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);

  @Input() interactionStrength = 10;

  constructor() {
    this.renderer.addClass(this.el.nativeElement, 'interactive-surface');
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    const host = this.el.nativeElement;
    const rect = host.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * this.interactionStrength;
    const rotateX = (0.5 - (y / rect.height)) * this.interactionStrength;

    this.renderer.addClass(host, 'interactive-surface--active');
    this.renderer.setStyle(host, '--pointer-x', `${x}px`);
    this.renderer.setStyle(host, '--pointer-y', `${y}px`);
    this.renderer.setStyle(host, '--rotate-x', `${rotateX.toFixed(2)}deg`);
    this.renderer.setStyle(host, '--rotate-y', `${rotateY.toFixed(2)}deg`);
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    const host = this.el.nativeElement;
    this.renderer.removeClass(host, 'interactive-surface--active');
    this.renderer.removeStyle(host, '--rotate-x');
    this.renderer.removeStyle(host, '--rotate-y');
  }
}
