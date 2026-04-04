import { Directive, ElementRef, HostListener, Renderer2, inject } from '@angular/core';

@Directive({
  selector: '[appRipple]',
  standalone: true
})
export class RippleDirective {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);

  constructor() {
    this.renderer.addClass(this.el.nativeElement, 'ui-ripple-host');
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    const host = this.el.nativeElement;
    const rect = host.getBoundingClientRect();
    const ripple = this.renderer.createElement('span');
    const size = Math.max(rect.width, rect.height) * 1.15;
    const left = event.clientX - rect.left - size / 2;
    const top = event.clientY - rect.top - size / 2;

    this.renderer.addClass(ripple, 'ui-ripple__wave');
    this.renderer.setStyle(ripple, 'width', `${size}px`);
    this.renderer.setStyle(ripple, 'height', `${size}px`);
    this.renderer.setStyle(ripple, 'left', `${left}px`);
    this.renderer.setStyle(ripple, 'top', `${top}px`);

    this.renderer.appendChild(host, ripple);
    setTimeout(() => this.renderer.removeChild(host, ripple), 650);
  }
}
