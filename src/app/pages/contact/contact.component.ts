import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { IconComponent } from '../../components/icon/icon.component';
import { LocationMapComponent } from '../../components/diagrams/location-map.component';
import { RevealDirective } from '../../directives/reveal.directive';
import { ContactService } from '../../core/contact.service';
import {
  ADDRESS,
  COMPANY,
  EMAILS,
  MAILTO_CONTACT,
  MAILTO_LEGAL,
  MAPS_HREF,
  PHONE,
  SOCIALS,
  STATUTORY,
  TEL_HREF
} from '../../core/site.config';

type FormState = 'idle' | 'sending' | 'sent' | 'error';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    IconComponent,
    LocationMapComponent,
    RevealDirective
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  private readonly fb = inject(FormBuilder);
  private readonly contact = inject(ContactService);

  readonly company = COMPANY;
  readonly statutory = STATUTORY;
  readonly address = ADDRESS;
  readonly emails = EMAILS;
  readonly phone = PHONE;
  readonly socials = SOCIALS;

  readonly mailtoContact = MAILTO_CONTACT;
  readonly mailtoLegal = MAILTO_LEGAL;
  readonly telHref = TEL_HREF;
  readonly mapsHref = MAPS_HREF;

  readonly topics = [
    'A new product or feature',
    'AI / LLM integration',
    'A discovery sprint',
    'Ongoing engineering capacity',
    'Early access to Roomie Hunt or CA Hunt',
    'Careers',
    'Something else'
  ];

  readonly state = signal<FormState>('idle');
  readonly errorText = signal('');

  readonly form: FormGroup = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    company: [''],
    topic: [this.topics[0]],
    message: ['', [Validators.required, Validators.minLength(20)]]
  });

  /** True once the field should start showing its error, not before. */
  invalid(field: string): boolean {
    const control = this.form.get(field);
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  submit(): void {
    if (this.state() === 'sending') return;

    if (this.form.invalid) {
      // Surface every error at once rather than one per attempt.
      this.form.markAllAsTouched();
      this.state.set('error');
      this.errorText.set(
        'Please check the highlighted fields and try again.'
      );
      return;
    }

    this.state.set('sending');
    this.errorText.set('');

    this.contact.send(this.form.getRawValue()).subscribe((result) => {
      if (result.ok) {
        this.state.set('sent');
        this.form.reset({ topic: this.topics[0] });
        return;
      }

      this.state.set('error');
      this.errorText.set(this.messageFor(result.reason));
    });
  }

  /** Reset back to a blank form after a successful send. */
  sendAnother(): void {
    this.state.set('idle');
  }

  private messageFor(reason: string): string {
    switch (reason) {
      case 'validation':
        return 'Some details were rejected. Please check the fields and try again.';
      case 'unconfigured':
        return `The form is not connected to a mailbox yet. Please email ${EMAILS.contact} directly — it reaches the same place.`;
      case 'network':
        return `We could not reach the server. Check your connection, or email ${EMAILS.contact} instead.`;
      default:
        return `Something went wrong on our side. Please email ${EMAILS.contact} and we will pick it up from there.`;
    }
  }
}
