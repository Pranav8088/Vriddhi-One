import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CtaBandComponent } from '../../components/cta-band/cta-band.component';
import { IconComponent } from '../../components/icon/icon.component';
import { MarqueeComponent } from '../../components/marquee/marquee.component';
import { MediaSlotComponent } from '../../components/media-slot/media-slot.component';
import { VortexComponent } from '../../components/vortex/vortex.component';
import { CountUpDirective } from '../../directives/count-up.directive';
import { PointerFxDirective } from '../../directives/pointer-fx.directive';
import { RevealDirective } from '../../directives/reveal.directive';

import {
  DIFFERENTIATORS,
  FIGURES,
  HERO,
  PILLARS,
  SECTORS,
  STACK
} from '../../content/home.content';
import { PRODUCTS } from '../../content/products.content';
import { SERVICES } from '../../content/services.content';
import { COMPANY } from '../../core/site.config';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    IconComponent,
    VortexComponent,
    MarqueeComponent,
    MediaSlotComponent,
    CtaBandComponent,
    RevealDirective,
    CountUpDirective,
    PointerFxDirective
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  readonly company = COMPANY;
  readonly hero = HERO;
  readonly figures = FIGURES;
  readonly pillars = PILLARS;
  readonly differentiators = DIFFERENTIATORS;
  readonly sectors = SECTORS;
  readonly stack = STACK;
  readonly products = PRODUCTS;

  /** Three on the home page; the rest live on /services. */
  readonly services = SERVICES;

  /** Nodes of the pipeline diagram in the hero panel. */
  readonly pipeline = [
    { label: 'Query', icon: 'message', state: 'done' },
    { label: 'Retrieval', icon: 'search', state: 'done' },
    { label: 'Model', icon: 'bot', state: 'active' },
    { label: 'Validation', icon: 'shield', state: 'idle' },
    { label: 'Response', icon: 'check-circle', state: 'idle' }
  ] as const;
}
