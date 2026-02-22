import {
  Component, inject, OnInit, ElementRef, ViewChildren, QueryList, AfterViewInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  template: `
    <section class="stats-section">
      <div class="container">

        <div class="stats-inner" appReveal>
          @for (stat of getStats(); track stat.label; let i = $index) {
            <div class="stat-item" [class.reveal]="true" [style.transition-delay]="(i * 0.1) + 's'">
              <div class="stat-item__num">{{ stat.value }}</div>
              <div class="stat-item__label">{{ stat.label }}</div>
            </div>
            @if (i < getStats().length - 1) {
              <div class="stat-divider"></div>
            }
          }
        </div>

        <!-- Tech Stack Marquee -->
        <div class="tech-marquee" appReveal [revealDelay]="200">
          <span class="tech-marquee__label">Trusted Technologies</span>
          <div class="marquee-wrapper">
            <div class="marquee-track">
              @for (tech of techStack; track tech) {
                <span class="tech-badge">{{ tech }}</span>
              }
              @for (tech of techStack; track tech + '_dup') {
                <span class="tech-badge">{{ tech }}</span>
              }
            </div>
          </div>
        </div>

      </div>
    </section>
  `,
  styleUrl: './stats.component.scss'
})
export class StatsComponent {
  private ts = inject(TranslationService);
  readonly t = this.ts.t;

  techStack = [
    'Angular 17', 'React', 'Next.js', 'Node.js', 'Python',
    'FastAPI', 'PostgreSQL', 'MongoDB', 'Redis', 'OpenAI',
    'LangChain', 'AWS', 'Docker', 'Kubernetes', 'TypeScript',
    'TailwindCSS', 'GraphQL', 'Supabase', 'Firebase', 'Vercel'
  ];

  getStats() {
    const t = this.t();
    return [
      { value: t.stats_clients,  label: t.stats_clients_label },
      { value: t.stats_products, label: t.stats_products_label },
      { value: t.stats_team,     label: t.stats_team_label },
      { value: t.stats_countries, label: t.stats_countries_label },
    ];
  }
}
