import { Component, HostListener, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslationService, Language, LANG_META } from '../../services/translation.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  private ts = inject(TranslationService);

  scrolled  = signal(false);
  menuOpen  = signal(false);
  langOpen  = signal(false);

  readonly t       = this.ts.t;
  readonly lang    = this.ts.lang;
  readonly meta    = this.ts.meta;
  readonly groups  = this.ts.groups;
  readonly langMeta = LANG_META;

  getLangsInGroup = (g: string) => this.ts.getLangsInGroup(g);

  @HostListener('window:scroll')
  onScroll() { this.scrolled.set(window.scrollY > 24); }

  @HostListener('document:click', ['$event'])
  onDocClick(e: MouseEvent) {
    if (!(e.target as Element).closest('.lang-menu')) this.langOpen.set(false);
  }

  toggleMenu() { this.menuOpen.update(v => !v); }
  closeMenu()  { this.menuOpen.set(false); }
  toggleLang() { this.langOpen.update(v => !v); }
  setLang(l: Language) { this.ts.set(l); this.langOpen.set(false); this.menuOpen.set(false); }
}
