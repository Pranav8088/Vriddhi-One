import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { InteractiveSurfaceDirective } from '../../directives/interactive-surface.directive';
import { RevealDirective } from '../../directives/reveal.directive';
import { RippleDirective } from '../../directives/ripple.directive';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [RouterLink, RevealDirective, InteractiveSurfaceDirective, RippleDirective],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesPageComponent {
  services = [
    {
      icon: 'deployed_code',
      title: 'Product engineering',
      desc: 'Web apps, internal tools, backend systems, and production-ready features built with a clear delivery plan.',
      tags: ['Web apps', 'Internal tools', 'Backend systems']
    },
    {
      icon: 'neurology',
      title: 'AI systems and workflow automation',
      desc: 'LLM integrations, assistive experiences, and operational tooling that remove repetitive work.',
      tags: ['Assistants', 'Automation', 'Operational tooling']
    },
    {
      icon: 'explore',
      title: 'UX cleanup and launch polish',
      desc: 'We improve copy, structure, states, and interaction feedback so the product feels easier to trust and use.',
      tags: ['UX review', 'Interaction quality', 'Launch readiness']
    }
  ];

  process = [
    {
      step: '01',
      title: 'Find the bottleneck',
      desc: 'We start with the user journey, the operating pain, or the product gap that is actually slowing things down.'
    },
    {
      step: '02',
      title: 'Build the right slice',
      desc: 'We scope tightly, design the path, and ship the part of the system that changes the outcome fastest.'
    },
    {
      step: '03',
      title: 'Refine after release',
      desc: 'Once the work is live, we keep improving the rough edges that show up in real use.'
    }
  ];
}
