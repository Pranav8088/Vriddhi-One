import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-cta',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  template: `
    <section class="cta-section" id="contact">

      <div class="cta-bg" aria-hidden="true">
        <div class="cta-orb cta-orb--1"></div>
        <div class="cta-orb cta-orb--2"></div>
        <div class="cta-grid"></div>
      </div>

      <div class="container">
        <div class="cta-inner">

          <!-- Label -->
          <div appReveal>
            <span class="section-label section-label--light">{{ t().cta_label }}</span>
          </div>

          <!-- Title -->
          <h2 class="cta-title" appReveal [revealDelay]="100">
            {{ t().cta_title }}
          </h2>

          <!-- Subtitle -->
          <p class="cta-subtitle" appReveal [revealDelay]="200">
            {{ t().cta_subtitle }}
          </p>

          <!-- Buttons -->
          <div class="cta-buttons" appReveal [revealDelay]="300">
            <a href="mailto:teams@vriddhi-one.com" class="btn btn--primary cta-btn-primary">
              {{ t().cta_primary }}
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3 9H15M15 9L10 4M15 9L10 14"
                      stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>
              </svg>
            </a>
            <a href="#products" class="btn btn--outline-light">
              {{ t().cta_secondary }}
            </a>
          </div>

          <!-- Contact Options -->
          <div class="contact-options" appReveal [revealDelay]="400">
            <div class="contact-option">
              <div class="contact-option__icon">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M3.5 4.5H14.5C15.328 4.5 16 5.172 16 6V12C16 12.828 15.328 13.5 14.5 13.5H3.5C2.672 13.5 2 12.828 2 12V6C2 5.172 2.672 4.5 3.5 4.5Z"
                        stroke="currentColor" stroke-width="1.25"/>
                  <path d="M2 6L9 9.75L16 6" stroke="currentColor" stroke-width="1.25"/>
                </svg>
              </div>
              <div>
                <div class="contact-option__label">Email Us</div>
                <a href="mailto:teams@vriddhi-one.com" class="contact-option__value">
                  teams&#64;vriddhi-one.com
                </a>
              </div>
            </div>

            <div class="contact-divider"></div>

            <div class="contact-option">
              <div class="contact-option__icon">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M16 12.92V15.42C16.001 15.656 15.952 15.889 15.855 16.104C15.758 16.319 15.616 16.511 15.438 16.666C15.260 16.821 15.051 16.935 14.824 17.001C14.597 17.067 14.359 17.083 14.125 17.048C11.782 16.796 9.533 16.000 7.557 14.723C5.720 13.558 4.155 12.017 2.965 10.206C1.658 8.255 0.855 6.033 0.6 3.718C0.563 3.490 0.579 3.257 0.646 3.035C0.713 2.813 0.830 2.608 0.988 2.433C1.146 2.259 1.342 2.119 1.561 2.023C1.780 1.927 2.017 1.878 2.258 1.879H4.758C5.181 1.875 5.591 2.022 5.913 2.293C6.234 2.564 6.445 2.941 6.508 3.352C6.625 4.173 6.840 4.976 7.148 5.746C7.261 6.023 7.237 6.334 7.082 6.591C6.927 6.848 6.659 7.024 6.358 7.078L5.258 7.278C6.328 9.449 8.126 11.224 10.333 12.27L10.533 11.18C10.588 10.883 10.766 10.618 11.025 10.464C11.284 10.311 11.596 10.286 11.875 10.398C12.652 10.700 13.462 10.911 14.292 11.022C14.713 11.083 15.100 11.295 15.374 11.619C15.649 11.943 15.793 12.356 15.783 12.78"
                        stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div>
                <div class="contact-option__label">Call Us</div>
                <a href="tel:+918329384913" class="contact-option__value">+91 83293 84913</a>
              </div>
            </div>

            <div class="contact-divider"></div>

            <div class="contact-option">
              <div class="contact-option__icon">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 1.5C5.686 1.5 3 4.186 3 7.5C3 11.625 9 16.5 9 16.5C9 16.5 15 11.625 15 7.5C15 4.186 12.314 1.5 9 1.5Z"
                        stroke="currentColor" stroke-width="1.25"/>
                  <circle cx="9" cy="7.5" r="2" stroke="currentColor" stroke-width="1.25"/>
                </svg>
              </div>
              <div>
                <div class="contact-option__label">Visit Us</div>
                <span class="contact-option__value">Pune, Maharashtra, India</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  `,
  styleUrl: './cta.component.scss'
})
export class CtaComponent {
  private ts = inject(TranslationService);
  readonly t = this.ts.t;
}
