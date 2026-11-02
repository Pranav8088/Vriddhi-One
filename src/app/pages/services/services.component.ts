import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CtaBandComponent } from '../../components/cta-band/cta-band.component';
import { IconComponent } from '../../components/icon/icon.component';
import { ProcessDiagramComponent } from '../../components/diagrams/process-diagram.component';
import { PointerFxDirective } from '../../directives/pointer-fx.directive';
import { RevealDirective } from '../../directives/reveal.directive';

import { ENGAGEMENT_MODELS, SERVICES } from '../../content/services.content';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [
    RouterLink,
    IconComponent,
    ProcessDiagramComponent,
    CtaBandComponent,
    RevealDirective,
    PointerFxDirective
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
  readonly services = SERVICES;
  readonly models = ENGAGEMENT_MODELS;
}
