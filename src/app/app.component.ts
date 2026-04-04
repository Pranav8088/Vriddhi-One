import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { TranslationService } from './services/translation.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  template: `
    <app-navbar></app-navbar>
    <main class="main-content">
      <div class="app-ambient" aria-hidden="true">
        <div class="app-ambient__orb app-ambient__orb--one"></div>
        <div class="app-ambient__orb app-ambient__orb--two"></div>
        <div class="app-ambient__orb app-ambient__orb--three"></div>
      </div>
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
  `,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private ts = inject(TranslationService);

  ngOnInit(): void {
    document.documentElement.lang = this.ts.lang();
  }
}
