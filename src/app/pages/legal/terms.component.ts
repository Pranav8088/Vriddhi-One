import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { IconComponent } from '../../components/icon/icon.component';
import { RevealDirective } from '../../directives/reveal.directive';
import {
  ADDRESS,
  COMPANY,
  EMAILS,
  MAILTO_LEGAL,
  STATUTORY
} from '../../core/site.config';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [RouterLink, IconComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './terms.component.html',
  styleUrl: './legal.scss'
})
export class TermsComponent {
  readonly company = COMPANY;
  readonly statutory = STATUTORY;
  readonly address = ADDRESS;
  readonly emails = EMAILS;
  readonly mailtoLegal = MAILTO_LEGAL;

  /** Update this whenever the terms below change. */
  readonly updated = '2 November 2026';

  readonly sections = [
    { id: 'scope', label: 'Scope of these terms' },
    { id: 'use', label: 'Using this website' },
    { id: 'content', label: 'Our content and marks' },
    { id: 'enquiries', label: 'Enquiries and the contact form' },
    { id: 'services', label: 'Engagements and service terms' },
    { id: 'ip', label: 'Intellectual property in client work' },
    { id: 'ai', label: 'AI-specific terms' },
    { id: 'products', label: 'Our own products' },
    { id: 'liability', label: 'Liability' },
    { id: 'links', label: 'Third-party links' },
    { id: 'law', label: 'Governing law' },
    { id: 'changes', label: 'Changes and contact' }
  ];
}
