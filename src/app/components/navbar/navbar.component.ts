import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  HostListener,
  OnInit,
  inject,
  signal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs/operators';

import { IconComponent } from '../icon/icon.component';
import { LogoComponent } from '../logo/logo.component';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { MAILTO_CONTACT, PRIMARY_NAV, SOCIALS } from '../../core/site.config';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    IconComponent,
    LogoComponent,
    ThemeToggleComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly nav = PRIMARY_NAV;
  readonly socials = SOCIALS;
  readonly mailto = MAILTO_CONTACT;

  /** Past the top — switches the bar to its solid glass state. */
  readonly scrolled = signal(false);

  /** Mobile drawer. */
  readonly open = signal(false);

  /** 0..1 read progress, bound to the hairline under the bar. */
  readonly progress = signal(0);

  ngOnInit(): void {
    this.onScroll();

    // Any navigation closes the drawer — including a tap on the link for the
    // route we're already on, which emits no NavigationEnd but should still
    // dismiss it (handled in close() from the template).
    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => this.close());
  }

  @HostListener('window:scroll')
  onScroll(): void {
    const y = window.scrollY;
    this.scrolled.set(y > 12);

    const max = document.documentElement.scrollHeight - window.innerHeight;
    this.progress.set(max > 0 ? Math.min(y / max, 1) : 0);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.open()) this.close();
  }

  toggle(): void {
    this.open() ? this.close() : this.openDrawer();
  }

  private openDrawer(): void {
    this.open.set(true);
    // Stop the page behind the drawer from scrolling.
    document.body.style.overflow = 'hidden';
  }

  close(): void {
    if (!this.open()) return;
    this.open.set(false);
    document.body.style.overflow = '';
  }
}
