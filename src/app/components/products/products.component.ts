import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  template: `
    <section class="section" id="products">
      <div class="container">

        <!-- Header -->
        <div class="section-header" appReveal>
          <span class="section-label">{{ t().products_label }}</span>
          <h2 class="section-title">
            @for (line of t().products_title.split('\\n'); track line) {
              <span [class.gradient-text]="$index === 1">{{ line }}</span><br *ngIf="$index === 0">
            }
          </h2>
          <p class="section-subtitle">{{ t().products_subtitle }}</p>
        </div>

        <!-- Product Cards Grid -->
        <div class="products-grid">

          <!-- Roomie Hunt -->
          <div class="product-card product-card--roomie" appReveal [revealDelay]="100">
            <div class="product-card__inner">
              <div class="product-card__header">
                <div class="product-card__icon-wrap product-card__icon-wrap--blue">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M4 12L16 3L28 12V28C28 28.552 27.552 29 27 29H20V21H12V29H5C4.448 29 4 28.552 4 28V12Z"
                          fill="rgba(59,91,219,0.15)" stroke="#3b5bdb" stroke-width="1.5"/>
                    <circle cx="16" cy="13" r="3" fill="#3b5bdb" opacity="0.5"/>
                  </svg>
                </div>
                <div class="product-card__status product-card__status--live">
                  <span class="status-dot"></span> Live
                </div>
              </div>

              <div class="product-card__body">
                <h3 class="product-card__name">{{ t().products_roomie_name }}</h3>
                <p class="product-card__tagline">{{ t().products_roomie_tagline }}</p>
                <p class="product-card__desc">{{ t().products_roomie_desc }}</p>
              </div>

              <div class="product-card__tags">
                <span class="chip chip--blue">AI Matching</span>
                <span class="chip chip--blue">Verified Profiles</span>
                <span class="chip chip--blue">Safe & Secure</span>
              </div>

              <div class="product-card__footer">
                <a href="#" class="btn btn--primary btn--sm">
                  {{ t().products_roomie_cta }}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2.5 7H11.5M11.5 7L8 3.5M11.5 7L8 10.5"
                          stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                  </svg>
                </a>
              </div>

              <div class="product-card__glow product-card__glow--blue"></div>
            </div>
          </div>

          <!-- CA Hunt -->
          <div class="product-card product-card--ca" appReveal [revealDelay]="200">
            <div class="product-card__inner">
              <div class="product-card__header">
                <div class="product-card__icon-wrap product-card__icon-wrap--purple">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <rect x="5" y="3" width="22" height="26" rx="2"
                          fill="rgba(132,94,247,0.15)" stroke="#845ef7" stroke-width="1.5"/>
                    <path d="M10 11H22M10 16H22M10 21H17"
                          stroke="#845ef7" stroke-width="1.5" stroke-linecap="round"/>
                  </svg>
                </div>
                <div class="product-card__status product-card__status--soon">
                  <span class="status-dot"></span> {{ t().products_coming_soon }}
                </div>
              </div>

              <div class="product-card__body">
                <h3 class="product-card__name">{{ t().products_ca_name }}</h3>
                <p class="product-card__tagline">{{ t().products_ca_tagline }}</p>
                <p class="product-card__desc">{{ t().products_ca_desc }}</p>
              </div>

              <div class="product-card__tags">
                <span class="chip chip--purple">Verified CAs</span>
                <span class="chip chip--purple">Smart Compare</span>
                <span class="chip chip--purple">GST & Tax</span>
              </div>

              <div class="product-card__footer">
                <a href="#" class="btn btn--outline btn--sm">
                  {{ t().products_ca_cta }}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2.5 7H11.5M11.5 7L8 3.5M11.5 7L8 10.5"
                          stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                  </svg>
                </a>
              </div>

              <div class="product-card__glow product-card__glow--purple"></div>
            </div>
          </div>

        </div>

        <!-- More Coming Banner -->
        <div class="more-banner" appReveal [revealDelay]="300">
          <div class="more-banner__icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="url(#bannerGrad)" stroke-width="1.5"/>
              <path d="M12 8V12M12 16H12.01" stroke="url(#bannerGrad)" stroke-width="1.5"
                    stroke-linecap="round"/>
              <defs>
                <linearGradient id="bannerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#3b5bdb"/>
                  <stop offset="100%" stop-color="#845ef7"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div class="more-banner__text">
            <h4>{{ t().products_more_title }}</h4>
            <p>{{ t().products_more_desc }}</p>
          </div>
          <div class="more-banner__dots">
            <div class="more-dot"></div>
            <div class="more-dot"></div>
            <div class="more-dot"></div>
          </div>
        </div>

      </div>
    </section>
  `,
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  private ts = inject(TranslationService);
  readonly t = this.ts.t;
}
