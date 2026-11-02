import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CtaBandComponent } from '../../components/cta-band/cta-band.component';
import { IconComponent } from '../../components/icon/icon.component';
import { MediaSlotComponent } from '../../components/media-slot/media-slot.component';
import { PointerFxDirective } from '../../directives/pointer-fx.directive';
import { RevealDirective } from '../../directives/reveal.directive';

import { PRODUCTS, PRODUCT_PRINCIPLES } from '../../content/products.content';

@Component({
  selector: 'app-products',
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
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  readonly products = PRODUCTS;
  readonly principles = PRODUCT_PRINCIPLES;
}
