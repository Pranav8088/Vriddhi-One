import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { IconComponent } from '../icon/icon.component';
import { LogoComponent } from '../logo/logo.component';
import {
  ADDRESS,
  COMPANY,
  COPYRIGHT_YEAR,
  EMAILS,
  LEGAL_NAV,
  MAILTO_CONTACT,
  MAILTO_LEGAL,
  MAPS_HREF,
  PHONE,
  PRIMARY_NAV,
  SOCIALS,
  STATUTORY,
  TEL_HREF
} from '../../core/site.config';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, IconComponent, LogoComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  readonly company = COMPANY;
  readonly statutory = STATUTORY;
  readonly address = ADDRESS;
  readonly emails = EMAILS;
  readonly phone = PHONE;
  readonly socials = SOCIALS;
  readonly nav = PRIMARY_NAV;
  readonly legalNav = LEGAL_NAV;
  readonly year = COPYRIGHT_YEAR;

  readonly mailtoContact = MAILTO_CONTACT;
  readonly mailtoLegal = MAILTO_LEGAL;
  readonly telHref = TEL_HREF;
  readonly mapsHref = MAPS_HREF;
}
