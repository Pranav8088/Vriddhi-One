import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { InteractiveSurfaceDirective } from '../../directives/interactive-surface.directive';
import { RevealDirective } from '../../directives/reveal.directive';
import { RippleDirective } from '../../directives/ripple.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RevealDirective, InteractiveSurfaceDirective, RippleDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  metrics = [
    { value: 'Build', label: 'custom software for real operating needs' },
    { value: 'Automate', label: 'AI and workflow tooling that cuts manual work' },
    { value: 'Refine', label: 'interfaces with clearer structure and faster decisions' },
    { value: 'Launch', label: 'practical releases backed by iteration and support' }
  ];

  focusAreas = [
    {
      title: 'Software that fits the job',
      desc: 'We build web apps, internal tools, and platform features around the way teams actually work.',
      points: ['Product scoping', 'Frontend + backend', 'Maintainable delivery']
    },
    {
      title: 'AI used with restraint',
      desc: 'We add language models and automation where they remove repetitive effort, improve search, or speed up support and ops.',
      points: ['Assistants and copilots', 'Workflow automation', 'Human review loops']
    },
    {
      title: 'Interfaces people understand',
      desc: 'Good interaction design lowers hesitation. We tighten copy, structure, and feedback so users know what to do next.',
      points: ['Clear information flow', 'Responsive states', 'Launch polish']
    }
  ];

  operatingSignals = [
    { icon: 'deployed_code', title: 'Built to ship', desc: 'Small teams move faster when scope, architecture, and delivery stay aligned.' },
    { icon: 'neurology', title: 'AI with a job to do', desc: 'We use AI where it improves a task, not where it only looks modern.' },
    { icon: 'gesture', title: 'Calmer user flows', desc: 'Better structure, sharper copy, and visible feedback reduce friction.' }
  ];

  deliveryFlow = [
    {
      step: '01',
      title: 'Start with the real problem',
      desc: 'We scope around bottlenecks, user confusion, and the workflows that matter most.'
    },
    {
      step: '02',
      title: 'Design and build in one pass',
      desc: 'Product thinking, UI, and engineering stay close so the work does not drift.'
    },
    {
      step: '03',
      title: 'Release, measure, improve',
      desc: 'Once it is live, we keep tightening the rough edges that slow users down.'
    }
  ];
}
