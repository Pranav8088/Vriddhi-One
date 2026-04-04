import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink, RevealDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  values = [
    { icon: 'V', title: 'Vriddhi means growth', desc: 'The name comes from Sanskrit and gives the brand a clear idea to stand on: progress through steady improvement.' },
    { icon: 'IN', title: 'An Indian point of view', desc: 'The identity draws from Indian roots without turning culture into decoration or filler.' },
    { icon: 'AI', title: 'Human judgment plus systems', desc: 'The symbol joins a human, cognitive feel with structured digital logic, which matches the work itself.' },
    { icon: '1', title: 'One roof, connected work', desc: 'Software builds, AI workflows, and websites sit under one name instead of three disconnected offerings.' },
    { icon: 'UX', title: 'Simple enough to remember', desc: 'The mark is meant to stay readable, usable, and recognizable across product surfaces.' },
    { icon: 'CLR', title: 'Still evolving where it should', desc: 'The broader visual system can keep maturing, but the core idea of the brand is already stable.' }
  ];
}
