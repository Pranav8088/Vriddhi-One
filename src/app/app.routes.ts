import { Routes } from '@angular/router';
import type { RouteSeo } from './core/seo';

/**
 * Every page is lazily loaded, so the initial bundle carries only the shell
 * and the home page. `title` and `data.description` are consumed by
 * SeoTitleStrategy — see `core/seo.ts`.
 */
export const routes: Routes = [
  {
    path: '',
    // Home sets its own full title rather than taking the "— VriddhiOne"
    // suffix, so it is left empty here.
    title: '',
    data: {
      description:
        'VriddhiOne AI Systems is an Indian AI product and engineering company. We design, build and operate AI-native software — LLM and agent systems, product engineering and the platform work that keeps them running.'
    } satisfies RouteSeo,
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent)
  },
  {
    path: 'services',
    title: 'Services',
    data: {
      description:
        'AI product engineering, LLM and agent systems, custom software, data platforms, AI strategy and modernisation — what we do and how each engagement runs.'
    } satisfies RouteSeo,
    loadComponent: () =>
      import('./pages/services/services.component').then(
        (m) => m.ServicesComponent
      )
  },
  {
    path: 'products',
    title: 'Products',
    data: {
      description:
        'Roomie Hunt, AI-powered roommate matching for Indian cities, and CA Hunt, a directory connecting Indian businesses with Chartered Accountants.'
    } satisfies RouteSeo,
    loadComponent: () =>
      import('./pages/products/products.component').then(
        (m) => m.ProductsComponent
      )
  },
  {
    path: 'approach',
    title: 'Approach',
    data: {
      description:
        'How we work: discovery, a scoped pilot with evaluation gates, production hardening, then operation. What we commit to and what we expect from you.'
    } satisfies RouteSeo,
    loadComponent: () =>
      import('./pages/approach/approach.component').then(
        (m) => m.ApproachComponent
      )
  },
  {
    path: 'about',
    title: 'About',
    data: {
      description:
        'VriddhiOne AI Systems Private Limited — our story, leadership, values and registered company details. Based in Amravati, Maharashtra, India.'
    } satisfies RouteSeo,
    loadComponent: () =>
      import('./pages/about/about.component').then((m) => m.AboutComponent)
  },
  {
    path: 'careers',
    title: 'Careers',
    data: {
      description:
        'Work on AI systems that reach production. Open roles, how we hire, and what it is like to build at VriddhiOne AI Systems.'
    } satisfies RouteSeo,
    loadComponent: () =>
      import('./pages/careers/careers.component').then(
        (m) => m.CareersComponent
      )
  },
  {
    path: 'contact',
    title: 'Contact',
    data: {
      description:
        'Talk to VriddhiOne AI Systems. Email contact@vriddhione.com, call +91 83293 84913, or send us a note about what you are building.'
    } satisfies RouteSeo,
    loadComponent: () =>
      import('./pages/contact/contact.component').then(
        (m) => m.ContactComponent
      )
  },
  {
    path: 'privacy',
    title: 'Privacy Policy',
    data: {
      description:
        'How VriddhiOne AI Systems collects, uses, stores and protects personal data, and the rights you have over it.'
    } satisfies RouteSeo,
    loadComponent: () =>
      import('./pages/legal/privacy.component').then((m) => m.PrivacyComponent)
  },
  {
    path: 'terms',
    title: 'Terms of Service',
    data: {
      description:
        'The terms that govern use of the VriddhiOne AI Systems website and the services we provide.'
    } satisfies RouteSeo,
    loadComponent: () =>
      import('./pages/legal/terms.component').then((m) => m.TermsComponent)
  },
  {
    path: '**',
    title: 'Page not found',
    data: { index: false } satisfies RouteSeo,
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      )
  }
];
