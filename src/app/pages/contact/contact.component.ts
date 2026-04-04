import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { InteractiveSurfaceDirective } from '../../directives/interactive-surface.directive';
import { RevealDirective } from '../../directives/reveal.directive';
import { RippleDirective } from '../../directives/ripple.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterLink, RevealDirective, InteractiveSurfaceDirective, RippleDirective],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  name = signal('');
  email = signal('');
  message = signal('');
  sent = signal(false);
  sending = signal(false);
  error = signal('');

  contactItems = [
    { icon: 'location_on', label: 'Base', value: 'Pune, Maharashtra, India' },
    { icon: 'mail', label: 'Email', value: 'teams@vriddhi-one.com' },
    { icon: 'phone', label: 'Phone', value: '+91 83293 84913' },
    { icon: 'schedule', label: 'Reply window', value: 'Usually within 1 business day' }
  ];

  updateName(value: string): void {
    this.name.set(value);
  }

  updateEmail(value: string): void {
    this.email.set(value);
  }

  updateMessage(value: string): void {
    this.message.set(value);
  }

  async submit(event: Event): Promise<void> {
    event.preventDefault();
    if (!this.name().trim() || !this.email().trim() || !this.message().trim()) {
      return;
    }

    this.sending.set(true);
    this.error.set('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: this.name(),
          email: this.email(),
          message: this.message(),
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to send');
      }

      this.sent.set(true);
      this.name.set('');
      this.email.set('');
      this.message.set('');
    } catch {
      this.error.set('Something went wrong. Please email us directly at teams@vriddhi-one.com');
    } finally {
      this.sending.set(false);
    }
  }
}
