import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

import { COMPANY } from './site.config';

/**
 * Extra per-route SEO, declared on the route's `data`.
 *
 *   {
 *     path: 'services',
 *     title: 'Services',
 *     data: { description: '…' } satisfies RouteSeo
 *   }
 */
export interface RouteSeo {
  /** Meta description. Falls back to the company description. */
  description?: string;
  /** Overrides the og:title, which otherwise mirrors the page title. */
  ogTitle?: string;
  /** Set false on pages that should not be indexed. */
  index?: boolean;
}

/**
 * Keeps the document title and the social/meta tags in step with the router.
 *
 * Registered as Angular's `TitleStrategy`, so it runs on every successful
 * navigation without any page needing to remember to call it. Titles are
 * suffixed with the company name; the home route carries its own full title.
 */
@Injectable({ providedIn: 'root' })
export class SeoTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const pageTitle = this.buildTitle(snapshot);
    const seo = this.deepestData(snapshot);

    const fullTitle = pageTitle
      ? `${pageTitle} — ${COMPANY.fullName}`
      : `${COMPANY.fullName} — ${COMPANY.tagline}`;

    this.title.setTitle(fullTitle);

    const description = seo.description ?? COMPANY.description;
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({
      property: 'og:title',
      content: seo.ogTitle ?? fullTitle
    });
    this.meta.updateTag({ name: 'twitter:title', content: seo.ogTitle ?? fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: description });

    const url = `${COMPANY.url}${snapshot.url === '/' ? '/' : snapshot.url}`;
    this.meta.updateTag({ property: 'og:url', content: url });
    this.setCanonical(url);

    this.meta.updateTag({
      name: 'robots',
      content: seo.index === false ? 'noindex, follow' : 'index, follow'
    });
  }

  /** Walks to the leaf route and returns its SEO data. */
  private deepestData(snapshot: RouterStateSnapshot): RouteSeo {
    let route = snapshot.root;
    while (route.firstChild) route = route.firstChild;
    return (route.data ?? {}) as RouteSeo;
  }

  private setCanonical(url: string): void {
    let link = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]'
    );
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = url;
  }
}
