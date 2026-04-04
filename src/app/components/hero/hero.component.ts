import { Component, inject, OnInit, signal, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="hero" id="hero">

      <!-- Animated background orbs -->
      <div class="hero__bg" aria-hidden="true">
        <div class="orb orb--1"></div>
        <div class="orb orb--2"></div>
        <div class="orb orb--3"></div>
        <div class="hero__grid"></div>
      </div>

      <!-- Floating abstract shapes -->
      <div class="hero__shapes" aria-hidden="true">
        <div class="shape shape--ring-1"></div>
        <div class="shape shape--ring-2"></div>
        <div class="shape shape--dot-cluster">
          @for (i of dots; track i) {
            <div class="dot" [style.animation-delay]="(i * 0.15) + 's'"></div>
          }
        </div>
        <div class="shape shape--hex"></div>
        <div class="shape shape--line-v"></div>
        <div class="shape shape--line-h"></div>
      </div>

      <div class="container hero__content">

        <!-- Left Column -->
        <div class="hero__left">

          <!-- Badge -->
          <div class="hero__badge animate-in delay-0">
            <span class="hero__badge-dot"></span>
            {{ t().hero_badge }}
          </div>

          <!-- Headline -->
          <h1 class="hero__headline animate-in delay-1">
            <span class="line">{{ t().hero_headline_1 }}</span>
            <span class="line gradient-text">{{ t().hero_headline_2 }}</span>
            <span class="line">{{ t().hero_headline_3 }}</span>
          </h1>

          <!-- Sub-label -->
          <p class="hero__sub animate-in delay-2">
            {{ t().hero_subtext }}
          </p>

          <!-- CTAs -->
          <div class="hero__ctas animate-in delay-3">
            <a href="#products" class="btn btn--primary">
              {{ t().hero_cta_primary }}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M13 8L9 4M13 8L9 12"
                      stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </a>
            <a href="#contact" class="btn btn--outline">
              {{ t().hero_cta_secondary }}
            </a>
          </div>

          <!-- Trust badges -->
          <div class="hero__trust animate-in delay-4">
            <div class="trust-item">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1L10 5.5H15L11 8.5L12.5 13L8 10.5L3.5 13L5 8.5L1 5.5H6L8 1Z"
                      fill="#D4B87A" stroke="#D4B87A" stroke-width="0.5"/>
              </svg>
              <span>Product-first company</span>
            </div>
            <div class="trust-divider"></div>
            <div class="trust-item">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 14C11.314 14 14 11.314 14 8C14 4.686 11.314 2 8 2C4.686 2 2 4.686 2 8C2 11.314 4.686 14 8 14Z"
                      stroke="#B19562" stroke-width="1.5"/>
                <path d="M5 8L7 10L11 6" stroke="#B19562" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
              <span>Built for India</span>
            </div>
            <div class="trust-divider"></div>
            <div class="trust-item">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="2" y="2" width="5" height="5" rx="1" fill="#294062" opacity="0.7"/>
                <rect x="9" y="2" width="5" height="5" rx="1" fill="#294062"/>
                <rect x="2" y="9" width="5" height="5" rx="1" fill="#294062"/>
                <rect x="9" y="9" width="5" height="5" rx="1" fill="#294062" opacity="0.5"/>
              </svg>
              <span>AI-native stack</span>
            </div>
          </div>
        </div>

        <!-- Right Column — Visual -->
        <div class="hero__right animate-in delay-2">
          <div class="hero__visual">
            <!-- Floating product cards -->
            <div class="product-preview product-preview--1">
              <div class="pp__icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M3 9L12 2L21 9V20C21 20.552 20.552 21 20 21H15V15H9V21H4C3.448 21 3 20.552 3 20V9Z"
                        fill="rgba(177,149,98,0.15)" stroke="#B19562" stroke-width="1.5"/>
                </svg>
              </div>
              <div class="pp__text">
                <div class="pp__name">RoomiesNest</div>
                <div class="pp__tag">Find Roommates · AI Matched</div>
              </div>
              <div class="pp__status pp__status--live">Live</div>
            </div>

            <div class="product-preview product-preview--2">
              <div class="pp__icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M14 2H6C5.448 2 5 2.448 5 3V21C5 21.552 5.448 22 6 22H18C18.552 22 19 21.552 19 21V7L14 2Z"
                        fill="rgba(41,64,98,0.15)" stroke="#294062" stroke-width="1.5"/>
                  <path d="M14 2V7H19" stroke="#294062" stroke-width="1.5"/>
                  <path d="M9 13H15M9 17H13" stroke="#294062" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </div>
              <div class="pp__text">
                <div class="pp__name">CA Hunt</div>
                <div class="pp__tag">Find CAs · Smart Connect</div>
              </div>
              <div class="pp__status pp__status--soon">Soon</div>
            </div>

            <!-- Central graphic -->
            <div class="hero__central-graphic">
              <div class="cg__ring cg__ring--outer"></div>
              <div class="cg__ring cg__ring--inner"></div>
              <div class="cg__core">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <defs>
                    <linearGradient id="coreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stop-color="#B19562"/>
                      <stop offset="100%" stop-color="#294062"/>
                    </linearGradient>
                  </defs>
                  <path d="M24 4L40 12V24C40 32.837 32.837 40 24 40C15.163 40 8 32.837 8 24V12L24 4Z"
                        fill="url(#coreGrad)" opacity="0.2"/>
                  <path d="M24 4L40 12V24C40 32.837 32.837 40 24 40C15.163 40 8 32.837 8 24V12L24 4Z"
                        stroke="url(#coreGrad)" stroke-width="1.5" fill="none"/>
                  <path d="M17 24L21.5 28.5L31 18"
                        stroke="url(#coreGrad)" stroke-width="2.5"
                        stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <!-- Orbiting dots -->
              <div class="cg__orbit">
                <div class="cg__orbit-dot cg__orbit-dot--1"></div>
                <div class="cg__orbit-dot cg__orbit-dot--2"></div>
                <div class="cg__orbit-dot cg__orbit-dot--3"></div>
              </div>
              <div class="cg__label">Vriddhi One</div>
            </div>

            <!-- Stat chips -->
            <div class="stat-chip stat-chip--1">
              <span class="stat-chip__num">2+</span>
              <span class="stat-chip__text">Products</span>
            </div>
            <div class="stat-chip stat-chip--2">
              <span class="stat-chip__num">AI</span>
              <span class="stat-chip__text">Powered</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll cue -->
      <div class="hero__scroll-cue animate-in delay-5" aria-hidden="true">
        <div class="scroll-cue__line"></div>
        <span>Scroll</span>
      </div>
    </section>
  `,
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  private ts = inject(TranslationService);
  readonly t = this.ts.t;
  readonly dots = Array.from({ length: 10 }, (_, i) => i);
}
