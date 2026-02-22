import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../services/translation.service';
import { RevealDirective } from '../../directives/reveal.directive';
import { CountUpDirective } from '../../directives/count-up.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RevealDirective, CountUpDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private ts = inject(TranslationService);
  readonly t = this.ts.t;

  techStack = [
    'Angular', 'React Native', 'Node.js', 'Python', 'FastAPI',
    'PostgreSQL', 'Firebase', 'AWS', 'Docker', 'TypeScript',
    'TensorFlow', 'OpenAI GPT', 'LangChain', 'Supabase', 'Redis',
    'Kubernetes', 'GraphQL', 'Flutter'
  ];
}
