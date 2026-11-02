import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CtaBandComponent } from '../../components/cta-band/cta-band.component';
import { IconComponent } from '../../components/icon/icon.component';
import { MediaSlotComponent } from '../../components/media-slot/media-slot.component';
import { PointerFxDirective } from '../../directives/pointer-fx.directive';
import { RevealDirective } from '../../directives/reveal.directive';

import {
  CAPABILITIES,
  MILESTONES,
  STORY,
  VALUES
} from '../../content/about.content';
import {
  ADDRESS,
  COMPANY,
  DIRECTORS,
  EMAILS,
  MAILTO_CONTACT,
  MAILTO_LEGAL,
  MAPS_HREF,
  PHONE,
  SOCIALS,
  STATUTORY,
  TEL_HREF
} from '../../core/site.config';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    RouterLink,
    IconComponent,
    MediaSlotComponent,
    CtaBandComponent,
    RevealDirective,
    PointerFxDirective
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  readonly company = COMPANY;
  readonly statutory = STATUTORY;
  readonly address = ADDRESS;
  readonly emails = EMAILS;
  readonly phone = PHONE;
  readonly socials = SOCIALS;
  readonly directors = DIRECTORS;

  readonly story = STORY;
  readonly values = VALUES;
  readonly milestones = MILESTONES;
  readonly capabilities = CAPABILITIES;

  readonly mailtoContact = MAILTO_CONTACT;
  readonly mailtoLegal = MAILTO_LEGAL;
  readonly telHref = TEL_HREF;
  readonly mapsHref = MAPS_HREF;

  /**
   * Board seats are fixed at two. One is filled; the other renders as a
   * reserved slot until a name and profile are supplied in site.config.ts.
   */
  readonly reservedSeats = Math.max(0, 2 - DIRECTORS.length);
  readonly reservedSeatList = Array.from({ length: this.reservedSeats });
}
