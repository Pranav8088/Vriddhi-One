import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TranslationService } from '../../services/translation.service';
import { RevealDirective } from '../../directives/reveal.directive';

interface Service {
  icon: SafeHtml;
  colorClass: string;
  tagClass: string;
  tag: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  template: `
    <section class="section section--subtle" id="services">
      <div class="container">

        <!-- Header -->
        <div class="section-header" appReveal>
          <span class="section-label">{{ t().services_label }}</span>
          <h2 class="section-title">
            @for (line of t().services_title.split('\\n'); track $index) {
              <span [class.gradient-text]="$index === 0">{{ line }}</span><br *ngIf="$index === 0">
            }
          </h2>
          <p class="section-subtitle">{{ t().services_subtitle }}</p>
        </div>

        <!-- Services Grid -->
        <div class="services-grid">
          @for (s of services; track s.icon; let i = $index) {
            <div class="service-card" appReveal [revealDelay]="i * 100">
              <div class="service-card__top">
                <div class="service-card__icon" [ngClass]="s.colorClass"
                     [innerHTML]="s.icon"></div>
                <span class="chip" [ngClass]="s.tagClass">{{ s.tag }}</span>
              </div>
              <h3 class="service-card__title">{{ getTitle(i) }}</h3>
              <p class="service-card__desc">{{ getDesc(i) }}</p>
              <div class="service-card__arrow">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10H16M16 10L11 5M16 10L11 15"
                        stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </div>
            </div>
          }
        </div>

        <!-- CTA Row -->
        <div class="services-cta" appReveal [revealDelay]="400">
          <p>Ready to transform your business?</p>
          <a href="#contact" class="btn btn--primary">
            {{ t().services_cta }}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M13 8L9 4M13 8L9 12"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </a>
        </div>

      </div>
    </section>
  `,
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
  private ts        = inject(TranslationService);
  private sanitizer = inject(DomSanitizer);
  readonly t = this.ts.t;

  services: Service[] = [
    {
      colorClass: '--blue',
      tagClass: 'chip--blue',
      tag: 'Web & Mobile',
      icon: this.sanitizer.bypassSecurityTrustHtml(`<svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <rect x="2" y="3" width="22" height="16" rx="2" stroke="#B19562" stroke-width="1.5"/>
        <path d="M9 23H17M13 19V23" stroke="#B19562" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M7 11L10 8L13 11L16 8L19 11" stroke="#B19562" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`)
    },
    {
      colorClass: '--purple',
      tagClass: 'chip--purple',
      tag: 'AI/LLM',
      icon: this.sanitizer.bypassSecurityTrustHtml(`<svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <circle cx="13" cy="13" r="4" stroke="#294062" stroke-width="1.5"/>
        <path d="M13 3V6M13 20V23M3 13H6M20 13H23M5.636 5.636L7.757 7.757M18.243 18.243L20.364 20.364M5.636 20.364L7.757 18.243M18.243 7.757L20.364 5.636"
              stroke="#294062" stroke-width="1.5" stroke-linecap="round"/>
      </svg>`)
    },
    {
      colorClass: '--saffron',
      tagClass: 'chip--saffron',
      tag: 'Strategy',
      icon: this.sanitizer.bypassSecurityTrustHtml(`<svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <path d="M13 2L16 9H23L17.5 13.5L19.5 21L13 17L6.5 21L8.5 13.5L3 9H10L13 2Z"
              stroke="#D4B87A" stroke-width="1.5" stroke-linejoin="round"/>
      </svg>`)
    },
    {
      colorClass: '--green',
      tagClass: 'chip--green',
      tag: 'Enterprise',
      icon: this.sanitizer.bypassSecurityTrustHtml(`<svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <rect x="2" y="8" width="9" height="15" rx="1.5" stroke="#22c55e" stroke-width="1.5"/>
        <rect x="15" y="3" width="9" height="20" rx="1.5" stroke="#22c55e" stroke-width="1.5"/>
        <path d="M7 12H7.01M7 16H7.01M20 7H20.01M20 11H20.01M20 15H20.01"
              stroke="#22c55e" stroke-width="1.5" stroke-linecap="round"/>
      </svg>`)
    }
  ];

  getTitle(i: number): string {
    const titles = [
      this.t().services_s1_title,
      this.t().services_s2_title,
      this.t().services_s3_title,
      this.t().services_s4_title,
    ];
    return titles[i];
  }

  getDesc(i: number): string {
    const descs = [
      this.t().services_s1_desc,
      this.t().services_s2_desc,
      this.t().services_s3_desc,
      this.t().services_s4_desc,
    ];
    return descs[i];
  }
}
