import { Component, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { InteractiveSurfaceDirective } from '../../directives/interactive-surface.directive';
import { RippleDirective } from '../../directives/ripple.directive';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, InteractiveSurfaceDirective, RippleDirective],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  private readonly sanitizer = inject(DomSanitizer);

  currentYear = new Date().getFullYear();

  footerGroups = [
    {
      title: 'Explore',
      links: [
        { label: 'Products', href: '/products' },
        { label: 'Services', href: '/services' },
        { label: 'About', href: '/about' }
      ]
    },
    {
      title: 'Start Here',
      links: [
        { label: 'Contact', href: '/contact' },
        { label: 'Start a project', href: '/contact' },
        { label: 'View products', href: '/products' }
      ]
    }
  ];

  socials: { name: string; href: string; svg: SafeHtml }[] = [
    {
      name: 'LinkedIn',
      href: '#',
      svg: this.sanitizer.bypassSecurityTrustHtml(`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>`)
    },
    {
      name: 'Twitter / X',
      href: '#',
      svg: this.sanitizer.bypassSecurityTrustHtml(`<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>`)
    },
    {
      name: 'GitHub',
      href: '#',
      svg: this.sanitizer.bypassSecurityTrustHtml(`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>
      </svg>`)
    }
  ];
}
