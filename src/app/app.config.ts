import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import {
  TitleStrategy,
  provideRouter,
  withInMemoryScrolling,
  withViewTransitions
} from '@angular/router';

import { routes } from './app.routes';
import { SeoTitleStrategy } from './core/seo';

export const appConfig: ApplicationConfig = {
  providers: [
    // Coalescing stops a burst of events in one task from scheduling several
    // change detection passes — noticeable on the scroll handlers.
    provideZoneChangeDetection({ eventCoalescing: true }),

    provideRouter(
      routes,
      // Cross-fades route changes where the browser supports it.
      withViewTransitions({ skipInitialTransition: true }),
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled'
      })
    ),

    provideHttpClient(withFetch()),

    // Drives <title>, meta description, canonical and OG tags off the routes.
    { provide: TitleStrategy, useClass: SeoTitleStrategy }
  ]
};
