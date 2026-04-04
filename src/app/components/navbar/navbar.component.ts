import { Component, HostListener, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { InteractiveSurfaceDirective } from '../../directives/interactive-surface.directive';
import { RippleDirective } from '../../directives/ripple.directive';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    InteractiveSurfaceDirective,
    RippleDirective
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  scrolled = signal(false);
  menuOpen = signal(false);
  scrollProgress = signal(0);

  readonly navLinks = [
    { label: 'Home', href: '/', exact: true },
    { label: 'Products', href: '/products', exact: false },
    { label: 'Services', href: '/services', exact: false },
    { label: 'Company', href: '/about', exact: false },
    { label: 'Contact', href: '/contact', exact: false }
  ];

  ngOnInit(): void {
    this.onScroll();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;

    this.scrolled.set(window.scrollY > 20);
    this.scrollProgress.set(Math.min(progress, 100));
  }

  toggleMenu(): void {
    this.menuOpen.update((value) => !value);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
