import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../services/translation.service';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [RouterLink, RevealDirective],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesPageComponent {
  private ts = inject(TranslationService);
  readonly t = this.ts.t;

  services = [
    {
      icon: '⚡',
      colorClass: 'orange',
      titleKey: 'svc_1_t' as const,
      descKey: 'svc_1_d' as const,
      tags: ['React', 'Angular', 'Node.js', 'PostgreSQL']
    },
    {
      icon: '🤖',
      colorClass: 'green',
      titleKey: 'svc_2_t' as const,
      descKey: 'svc_2_d' as const,
      tags: ['OpenAI', 'LangChain', 'Python', 'FastAPI']
    },
    {
      icon: '💡',
      colorClass: 'gold',
      titleKey: 'svc_3_t' as const,
      descKey: 'svc_3_d' as const,
      tags: ['Strategy', 'UX Design', 'Roadmap', 'GTM']
    },
    {
      icon: '🚀',
      colorClass: 'teal',
      titleKey: 'svc_4_t' as const,
      descKey: 'svc_4_d' as const,
      tags: ['Cloud', 'Docker', 'Kubernetes', 'AWS']
    }
  ];

  process = [
    { num: '01', title: 'Discovery & Scoping', desc: 'We dive deep into your business goals, map your requirements, and define a clear project scope.' },
    { num: '02', title: 'Design & Architecture', desc: 'Our team architects the system and designs UX flows before a single line of code is written.' },
    { num: '03', title: 'Agile Development', desc: 'Two-week sprints with daily standups, continuous integration, and regular client reviews.' },
    { num: '04', title: 'Launch & Support', desc: 'We deploy with zero downtime and stay on hand for 60 days post-launch to ensure stability.' },
  ];
}
