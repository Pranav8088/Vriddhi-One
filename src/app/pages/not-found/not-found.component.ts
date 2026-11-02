import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { IconComponent } from '../../components/icon/icon.component';
import { VortexComponent } from '../../components/vortex/vortex.component';
import { RevealDirective } from '../../directives/reveal.directive';
import { EMAILS, MAILTO_CONTACT, PRIMARY_NAV } from '../../core/site.config';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink, IconComponent, VortexComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="nf">
      <app-vortex class="nf__vortex" [density]="300" [intensity]="0.6" [cy]="0.5" />
      <div class="grid-bg" aria-hidden="true"></div>

      <div class="shell nf__inner">
        <span class="label nf__code" appReveal>Error 404</span>

        <h1 class="display nf__title" appReveal [revealDelay]="80">
          This page
          isn't
          here.
        </h1>

        <p class="lead nf__lead" appReveal [revealDelay]="150">
          The address does not match anything on the site. It may have moved,
          or the link that brought you here may have been wrong.
        </p>

        <div class="row-wrap center gap-sm nf__actions" appReveal [revealDelay]="220">
          <a class="btn btn--accent btn--lg" routerLink="/">
            <app-icon name="home" size="1.05rem" />
            Back to the homepage
          </a>
          <a class="btn btn--ghost btn--lg" [href]="mailto">
            <app-icon name="mail" size="1.05rem" />
            Tell us what broke
          </a>
        </div>

        <nav class="nf__links" aria-label="Site sections" appReveal [revealDelay]="280">
          <p class="label">Or try one of these</p>
          <div class="row-wrap center gap-xs">
            @for (item of nav; track item.path) {
              <a class="chip" [routerLink]="item.path">{{ item.label }}</a>
            }
            <a class="chip" routerLink="/contact">Contact</a>
          </div>
        </nav>
      </div>
    </section>
  `,
  styles: [
    `
      .nf {
        position: relative;
        display: grid;
        place-items: center;
        min-height: calc(100vh - var(--nav-h));
        padding: calc(var(--nav-h) + 4rem) 0 6rem;
        overflow: hidden;
        isolation: isolate;
        text-align: center;
      }

      .nf__vortex {
        z-index: -2;
      }

      .nf .grid-bg {
        z-index: -1;
        opacity: 0.5;
      }

      .nf__inner {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1.5rem;
      }

      .nf__code {
        color: var(--accent);
      }

      .nf__title {
        max-width: 20ch;
      }

      .nf__lead {
        max-width: 38rem;
      }

      .nf__actions {
        padding-top: 0.5rem;
      }

      .nf__links {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.85rem;
        margin-top: 2rem;
        padding-top: 2rem;
        border-top: 1px solid var(--line);
        width: min(100%, 44rem);
      }
    `
  ]
})
export class NotFoundComponent {
  readonly nav = PRIMARY_NAV;
  readonly emails = EMAILS;
  readonly mailto = `${MAILTO_CONTACT}?subject=${encodeURIComponent(
    'Broken link on vriddhione.com'
  )}`;
}
