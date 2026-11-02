import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { IconComponent } from '../icon/icon.component';
import { RevealDirective } from '../../directives/reveal.directive';
import { EMAILS, MAILTO_CONTACT, PHONE, TEL_HREF } from '../../core/site.config';

/**
 * Closing call to action. Every page ends with one of these.
 */
@Component({
  selector: 'app-cta-band',
  standalone: true,
  imports: [RouterLink, IconComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section">
      <div class="shell">
        <div class="cta-band" appReveal="scale">
          <div class="cta-band__grid">
            <div class="stack-lg">
              <span class="eyebrow">{{ eyebrow }}</span>
              <h2 class="h2">{{ title }}</h2>
              <p class="lead">{{ body }}</p>

              <div class="row-wrap gap-sm">
                <a class="btn btn--primary btn--lg btn--block-sm" routerLink="/contact">
                  {{ primaryLabel }}
                  <app-icon class="btn__icon" name="arrow-right" size="1.05rem" />
                </a>
                <a class="btn btn--ghost btn--lg btn--block-sm" [href]="mailto">
                  <app-icon name="mail" size="1.05rem" />
                  {{ emails.contact }}
                </a>
              </div>
            </div>

            <!-- Direct lines, for people who would rather not use a form. -->
            <aside class="cta-band__aside">
              <p class="label">Straight to us</p>
              <ul class="cta-band__lines">
                <li>
                  <app-icon name="mail" size="1rem" />
                  <a [href]="mailto">{{ emails.contact }}</a>
                </li>
                <li>
                  <app-icon name="phone" size="1rem" />
                  <a [href]="telHref">{{ phone.display }}</a>
                </li>
                <li>
                  <app-icon name="scale" size="1rem" />
                  <a [href]="'mailto:' + emails.legal">{{ emails.legal }}</a>
                </li>
              </ul>
              <p class="cta-band__note">
                We read everything that arrives and reply within one working day.
              </p>
            </aside>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .cta-band__grid {
        display: grid;
        grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
        gap: clamp(2rem, 5vw, 4rem);
        align-items: center;
      }

      .cta-band__aside {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: clamp(1.25rem, 2vw, 1.75rem);
        border: 1px solid var(--line-mid);
        border-radius: var(--r-lg);
        background: rgba(7, 8, 16, 0.5);
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
      }

      .cta-band__lines {
        display: grid;
        gap: 0.85rem;
      }

      .cta-band__lines li {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        font-size: 0.92rem;
        color: var(--fg-muted);
      }

      .cta-band__lines app-icon {
        color: var(--gold-600);
      }

      .cta-band__lines a {
        transition: color var(--t-fast) var(--ease);
        overflow-wrap: anywhere;
      }

      .cta-band__lines a:hover {
        color: var(--gold-400);
      }

      .cta-band__note {
        padding-top: 0.85rem;
        border-top: 1px solid var(--line);
        font-size: 0.82rem;
        line-height: 1.6;
        color: var(--fg-faint);
      }

      @media (max-width: 900px) {
        .cta-band__grid {
          grid-template-columns: minmax(0, 1fr);
        }
      }
    `
  ]
})
export class CtaBandComponent {
  @Input() eyebrow = 'Next step';
  @Input() title = 'Tell us what you are trying to build.';
  @Input() body =
    'A short description of the problem is enough to start. We will tell you honestly whether it is a fit, what we would do first, and what it would take.';
  @Input() primaryLabel = 'Start a conversation';

  readonly emails = EMAILS;
  readonly phone = PHONE;
  readonly mailto = MAILTO_CONTACT;
  readonly telHref = TEL_HREF;
}
