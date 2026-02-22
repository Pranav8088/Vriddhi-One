import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../services/translation.service';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink, RevealDirective],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsPageComponent {
  private ts = inject(TranslationService);
  readonly t = this.ts.t;

  roomieFeatures = [
    { icon: '🤖', label: 'AI Compatibility Scoring' },
    { icon: '✅', label: 'Verified Profiles Only' },
    { icon: '🔒', label: 'Safe & Secure Connections' },
    { icon: '📍', label: 'Location-based Search' },
    { icon: '💬', label: 'In-app Messaging' },
    { icon: '⭐', label: 'Ratings & Reviews' },
  ];

  caFeatures = [
    { icon: '📋', label: 'Verified CA Profiles' },
    { icon: '🔍', label: 'Expertise Matching' },
    { icon: '💰', label: 'Price Comparison' },
    { icon: '⭐', label: 'Client Reviews' },
    { icon: '📅', label: 'Easy Appointments' },
    { icon: '🤝', label: 'Trusted Network' },
  ];
}
