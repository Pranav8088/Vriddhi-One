import { AfterViewInit, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  template: `
    <a class="skip-link" href="#main">Skip to content</a>

    <app-navbar />

    <main id="main" tabindex="-1">
      <router-outlet />
    </main>

    <app-footer />
  `,
  styles: [
    `
      main {
        display: block;
        min-height: 60vh;
      }

      main:focus {
        outline: none;
      }
    `
  ]
})
export class AppComponent implements AfterViewInit {
  private readonly doc = inject(DOCUMENT);

  ngAfterViewInit(): void {
    // The boot spinner in index.html covers the gap before the bundle lands.
    // Fade it out once there is something to look at.
    const boot = this.doc.getElementById('boot');
    if (!boot) return;

    boot.style.opacity = '0';
    const remove = () => boot.remove();
    boot.addEventListener('transitionend', remove, { once: true });
    // Belt and braces: if the transition never fires (reduced motion, or the
    // element was already at opacity 0), take it out anyway.
    setTimeout(remove, 600);
  }
}
