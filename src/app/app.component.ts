import { Component, inject, OnInit, computed } from '@angular/core';
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
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
  `,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private ts = inject(TranslationService);

  ngOnInit(): void {
    // Apply initial RTL/LTR and lang
    const meta = this.ts.meta();
    document.documentElement.lang = this.ts.lang();
    document.documentElement.dir  = meta.dir;
  }
}
