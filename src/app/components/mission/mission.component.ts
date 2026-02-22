import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-mission',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  template: `
    <section class="section mission-section" id="mission">

      <!-- Background -->
      <div class="mission-bg" aria-hidden="true">
        <div class="mission-orb mission-orb--1"></div>
        <div class="mission-orb mission-orb--2"></div>
        <div class="mission-bg__pattern"></div>
      </div>

      <div class="container">

        <!-- Label -->
        <div class="mission-label" appReveal>
          <span class="section-label section-label--light">{{ t().mission_label }}</span>
        </div>

        <!-- Big Mission Quote -->
        <div class="mission-quote" appReveal [revealDelay]="100">
          <div class="mission-quote__mark">"</div>
          <blockquote class="mission-quote__text">
            {{ t().mission_statement }}
          </blockquote>
          <div class="mission-quote__attribution">
            <div class="mission-quote__line"></div>
            <span>{{ t().mission_title }}</span>
          </div>
        </div>

        <!-- Vision + Mission Side by Side -->
        <div class="mission-cards" appReveal [revealDelay]="200">

          <div class="mission-card">
            <div class="mission-card__icon">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="6" stroke="white" stroke-width="1.5" opacity="0.7"/>
                <circle cx="14" cy="14" r="2" fill="white"/>
                <path d="M14 3V6M14 22V25M3 14H6M22 14H25M5.929 5.929L8.05 8.05M19.95 19.95L22.071 22.071M5.929 22.071L8.05 19.95M19.95 8.05L22.071 5.929"
                      stroke="white" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/>
              </svg>
            </div>
            <h3 class="mission-card__label">{{ t().vision_title }}</h3>
            <p class="mission-card__text">{{ t().vision_statement }}</p>
          </div>

          <div class="mission-card mission-card--values">
            <div class="mission-card__icon mission-card__icon--saffron">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M14 3L17.5 10.5H25L19 15L21 23L14 19L7 23L9 15L3 10.5H10.5L14 3Z"
                      stroke="white" stroke-width="1.5" stroke-linejoin="round" opacity="0.9"/>
              </svg>
            </div>
            <h3 class="mission-card__label">Our Values</h3>
            <div class="values-list">
              @for (v of values; track v) {
                <div class="value-item">
                  <span class="value-dot"></span>
                  {{ v }}
                </div>
              }
            </div>
          </div>

        </div>

        <!-- India Strip -->
        <div class="india-strip" appReveal [revealDelay]="300">
          <div class="india-strip__flag">🇮🇳</div>
          <div class="india-strip__text">
            <span class="india-strip__headline">Proudly Indian. Globally Ambitious.</span>
            <span class="india-strip__sub">Registered in India · Serving Globally · Building for Bharat</span>
          </div>
          <div class="india-strip__badge">
            <span>Made in India</span>
          </div>
        </div>

      </div>
    </section>
  `,
  styleUrl: './mission.component.scss'
})
export class MissionComponent {
  private ts = inject(TranslationService);
  readonly t = this.ts.t;

  values = [
    'Accessible Technology for All',
    'Ethical & Transparent Innovation',
    'India-First, Globally Competitive',
    'Human-Centric Design Thinking',
    'Relentless Execution Excellence',
  ];
}
