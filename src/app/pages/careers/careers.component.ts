import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { IconComponent } from '../../components/icon/icon.component';
import { MediaSlotComponent } from '../../components/media-slot/media-slot.component';
import { PointerFxDirective } from '../../directives/pointer-fx.directive';
import { RevealDirective } from '../../directives/reveal.directive';

import { HIRING_STEPS, PERKS, ROLE_SHAPES } from '../../content/careers.content';
import { EMAILS, MAILTO_CONTACT } from '../../core/site.config';

@Component({
  selector: 'app-careers',
  standalone: true,
  imports: [
    RouterLink,
    IconComponent,
    MediaSlotComponent,
    RevealDirective,
    PointerFxDirective
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './careers.component.html',
  styleUrl: './careers.component.scss'
})
export class CareersComponent {
  readonly roles = ROLE_SHAPES;
  readonly steps = HIRING_STEPS;
  readonly perks = PERKS;
  readonly emails = EMAILS;

  /**
   * Applications go to the general mailbox with a subject prefix, so they are
   * easy to filter. A careers@ alias can be added to site.config.ts later and
   * this picks it up without a template change.
   */
  readonly applyHref = `${MAILTO_CONTACT}?subject=${encodeURIComponent(
    'Application — '
  )}`;

  applyFor(role: string): string {
    return `${MAILTO_CONTACT}?subject=${encodeURIComponent(
      `Application — ${role}`
    )}`;
  }
}
