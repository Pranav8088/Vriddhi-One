import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CtaBandComponent } from '../../components/cta-band/cta-band.component';
import { IconComponent } from '../../components/icon/icon.component';
import { PointerFxDirective } from '../../directives/pointer-fx.directive';
import { RevealDirective } from '../../directives/reveal.directive';

import {
  COMMITMENTS,
  FAQS,
  PHASES,
  PRINCIPLES
} from '../../content/approach.content';

@Component({
  selector: 'app-approach',
  standalone: true,
  imports: [
    RouterLink,
    IconComponent,
    CtaBandComponent,
    RevealDirective,
    PointerFxDirective
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './approach.component.html',
  styleUrl: './approach.component.scss'
})
export class ApproachComponent {
  readonly phases = PHASES;
  readonly principles = PRINCIPLES;
  readonly commitments = COMMITMENTS;
  readonly faqs = FAQS;

  /** Index of the open FAQ, or null when all are closed. First is open. */
  readonly openFaq = signal<number | null>(0);

  toggleFaq(index: number): void {
    this.openFaq.update((current) => (current === index ? null : index));
  }
}
