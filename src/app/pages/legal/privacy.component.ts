import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IconComponent } from '../../components/icon/icon.component';
import { RevealDirective } from '../../directives/reveal.directive';
import {
  ADDRESS,
  COMPANY,
  EMAILS,
  MAILTO_LEGAL,
  PHONE,
  STATUTORY,
  TEL_HREF
} from '../../core/site.config';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [IconComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './privacy.component.html',
  styleUrl: './legal.scss'
})
export class PrivacyComponent {
  readonly company = COMPANY;
  readonly statutory = STATUTORY;
  readonly address = ADDRESS;
  readonly emails = EMAILS;
  readonly phone = PHONE;
  readonly mailtoLegal = MAILTO_LEGAL;
  readonly telHref = TEL_HREF;

  /** Update this whenever the policy text below changes. */
  readonly updated = '2 November 2026';

  readonly sections = [
    { id: 'who-we-are', label: 'Who we are' },
    { id: 'what-we-collect', label: 'What we collect' },
    { id: 'why', label: 'Why we collect it' },
    { id: 'third-parties', label: 'Third parties' },
    { id: 'cookies', label: 'Cookies and tracking' },
    { id: 'retention', label: 'How long we keep it' },
    { id: 'security', label: 'How we protect it' },
    { id: 'your-rights', label: 'Your rights' },
    { id: 'client-data', label: 'Client project data' },
    { id: 'children', label: 'Children' },
    { id: 'changes', label: 'Changes to this policy' },
    { id: 'contact', label: 'How to reach us' }
  ];
}
