import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../services/translation.service';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink, RevealDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  private ts = inject(TranslationService);
  readonly t = this.ts.t;

  values = [
    { icon: '🏗️', title: 'Build with Purpose', desc: 'Every product we create solves a real problem for real people — not just a feature on a roadmap.' },
    { icon: '🌱', title: 'Grow with India', desc: 'We are rooted in India\'s ecosystem and committed to building solutions that uplift its digital economy.' },
    { icon: '🔬', title: 'Engineer Excellence', desc: 'We obsess over code quality, performance, and security. Craftsmanship is non-negotiable.' },
    { icon: '🤝', title: 'Partner, Not Vendor', desc: 'We treat every client\'s business as our own — invested in your success from day one.' },
    { icon: '⚡', title: 'Move Decisively', desc: 'We move fast without breaking things — rapid iteration, thoughtful architecture, clear decisions.' },
    { icon: '🔓', title: 'Radical Transparency', desc: 'Open communication, honest timelines, and no surprises. You always know where things stand.' },
  ];
}
