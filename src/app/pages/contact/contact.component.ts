import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../services/translation.service';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterLink, RevealDirective],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  private ts = inject(TranslationService);
  readonly t = this.ts.t;

  name    = signal('');
  email   = signal('');
  message = signal('');
  sent    = signal(false);
  sending = signal(false);

  async submit(e: Event): Promise<void> {
    e.preventDefault();
    if (!this.name() || !this.email() || !this.message()) return;
    this.sending.set(true);
    await new Promise(r => setTimeout(r, 1200));
    this.sending.set(false);
    this.sent.set(true);
  }

  contactItems = [
    { icon: '📍', label: 'Address', value: 'Pune, Maharashtra, India' },
    { icon: '📧', label: 'Email', value: 'hello@vriddhione.com' },
    { icon: '📱', label: 'Phone', value: '+91 98765 43210' },
  ];

  socials = [
    { name: 'LinkedIn', href: '#', icon: 'in' },
    { name: 'Twitter', href: '#', icon: '𝕏' },
    { name: 'GitHub',  href: '#', icon: '⌥' },
  ];
}
