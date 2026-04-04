import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { InteractiveSurfaceDirective } from '../../directives/interactive-surface.directive';
import { RevealDirective } from '../../directives/reveal.directive';
import { RippleDirective } from '../../directives/ripple.directive';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink, RevealDirective, InteractiveSurfaceDirective, RippleDirective],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsPageComponent {
  products = [
    {
      name: 'RoomiesNest',
      status: 'Live now',
      icon: 'home_pin',
      summary: 'A roommate matching product designed to make discovery feel safer, clearer, and faster.',
      accentClass: 'products-card--cyan',
      features: [
        'AI compatibility scoring',
        'Verified user profiles',
        'In-app conversations',
        'Location-sensitive search'
      ]
    },
    {
      name: 'CA Hunt',
      status: 'Coming soon',
      icon: 'account_balance',
      summary: 'A simpler way for founders and small businesses to find the right chartered accountant without cold outreach.',
      accentClass: 'products-card--amber',
      features: [
        'Verified CA discovery',
        'Expertise matching',
        'Transparent comparison',
        'Appointment workflow'
      ]
    }
  ];

  principles = [
    {
      title: 'Trust has to show up early',
      desc: 'Verification, context, and clear next steps need to appear before clever features do.'
    },
    {
      title: 'Intelligence should stay legible',
      desc: 'AI can rank, summarize, and guide decisions without hiding how the product works.'
    },
    {
      title: 'Feedback should be immediate',
      desc: 'Search, messaging, and onboarding should always tell the user what just happened and what comes next.'
    }
  ];
}
