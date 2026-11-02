/**
 * ============================================================================
 * VRIDDHI ONE — SINGLE SOURCE OF TRUTH
 * ============================================================================
 * Every company fact, link, address and contact detail used anywhere on the
 * site lives here. Nothing is hardcoded in a template. Change it once, it
 * updates across every page, the footer, the schema.org JSON-LD and the
 * contact form.
 * ============================================================================
 */

export interface SocialLink {
  readonly label: string;
  readonly handle: string;
  readonly href: string;
  /** Inline SVG path data, 24x24 viewBox. */
  readonly icon: string;
}

export interface Director {
  readonly name: string;
  readonly role: string;
  readonly bio: string;
  readonly focus: readonly string[];
  readonly linkedin: string | null;
  /** Portrait path under /assets. Null renders a labelled media slot. */
  readonly portrait: string | null;
}

/* ---------------------------------------------------------------------------
   IDENTITY
   --------------------------------------------------------------------------- */

export const COMPANY = {
  /** Trading / brand name as it appears in the wordmark. */
  name: 'VriddhiOne',
  /** Full name used in prose and headings. */
  fullName: 'VriddhiOne AI Systems',
  /** Registered legal entity name, for legal pages and the footer. */
  legalName: 'VriddhiOne AI Systems Private Limited',
  shortName: 'VriddhiOne',
  tagline: 'Rooted in wisdom. Engineered with AI.',
  /** One-line description for meta tags and JSON-LD. */
  description:
    'VriddhiOne AI Systems is an Indian AI product and engineering company. We design, build and operate AI-native software — from LLM and agent systems to full product engineering — for teams that need it to work in production.',
  foundedYear: 2026,
  domain: 'vriddhione.com',
  url: 'https://vriddhione.com'
} as const;

/* ---------------------------------------------------------------------------
   STATUTORY
   --------------------------------------------------------------------------- */

export const STATUTORY = {
  cin: 'U78100ME2026PTC476757',
  /** Not yet registered. Rendered as "Not registered" rather than hidden. */
  gstin: null as string | null,
  entityType: 'Private Limited Company',
  incorporatedIn: 'India',
  registrar: 'Ministry of Corporate Affairs, Government of India'
} as const;

/* ---------------------------------------------------------------------------
   CONTACT
   --------------------------------------------------------------------------- */

export const ADDRESS = {
  line1: 'Plot No. 39, Shriram Nagar',
  city: 'Amravati',
  state: 'Maharashtra',
  postalCode: '444602',
  country: 'India',
  countryCode: 'IN',
  /** Flat single-line form, for meta tags and JSON-LD. */
  oneLine:
    'Plot No. 39, Shriram Nagar, Amravati, Maharashtra 444602, India',
  mapsQuery: 'Shriram+Nagar,+Amravati,+Maharashtra+444602,+India'
} as const;

/**
 * Mailbox aliases on the company domain.
 *
 * Provisioned:  contact@, legal@
 * Reserved:     two further alias slots are held for director mailboxes or
 *               role addresses (e.g. careers@, billing@). Add them here and
 *               they become available to the whole site.
 */
export const EMAILS = {
  /** General enquiries, new business, partnerships. */
  contact: 'contact@vriddhione.com',
  /** Legal, privacy, grievance and compliance correspondence. */
  legal: 'legal@vriddhione.com'
} as const;

export const PHONE = {
  display: '+91 83293 84913',
  /** E.164, for tel: links. */
  e164: '+918329384913'
} as const;

/* ---------------------------------------------------------------------------
   SOCIAL
   --------------------------------------------------------------------------- */

const ICON_LINKEDIN =
  'M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13Zm1.78 13.02H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z';

const ICON_X =
  'M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.4l-5.8-7.58-6.63 7.58H.48l8.6-9.83L0 1.15h7.59l5.44 7.2 5.87-7.2Zm-1.29 19.5h2.04L6.48 3.24H4.29l13.32 17.41Z';

export const SOCIALS: readonly SocialLink[] = [
  {
    label: 'LinkedIn',
    handle: '/company/vriddhione',
    href: 'https://www.linkedin.com/company/vriddhione',
    icon: ICON_LINKEDIN
  },
  {
    label: 'X',
    handle: '@vriddhione',
    href: 'https://x.com/vriddhione',
    icon: ICON_X
  }
] as const;

/* ---------------------------------------------------------------------------
   LEADERSHIP
   --------------------------------------------------------------------------- */

/**
 * The second seat is intentionally unfilled — the card renders as a labelled
 * media slot until a name, role, bio and LinkedIn URL are supplied.
 */
export const DIRECTORS: readonly Director[] = [
  {
    name: 'Ravindra Tambe',
    role: 'Founder & Director',
    bio: 'Leads engineering and product at VriddhiOne. Works hands-on across the stack — from LLM system design and evaluation to the platform work that keeps those systems running once real users depend on them.',
    focus: ['AI systems', 'Product engineering', 'Platform architecture'],
    linkedin: 'https://www.linkedin.com/in/ravindra-tambe',
    portrait: null
  }
] as const;

/* ---------------------------------------------------------------------------
   NAVIGATION
   --------------------------------------------------------------------------- */

export interface NavItem {
  readonly label: string;
  readonly path: string;
}

export const PRIMARY_NAV: readonly NavItem[] = [
  { label: 'Services', path: '/services' },
  { label: 'Products', path: '/products' },
  { label: 'Approach', path: '/approach' },
  { label: 'About', path: '/about' },
  { label: 'Careers', path: '/careers' }
] as const;

export const LEGAL_NAV: readonly NavItem[] = [
  { label: 'Privacy Policy', path: '/privacy' },
  { label: 'Terms of Service', path: '/terms' }
] as const;

/* ---------------------------------------------------------------------------
   DERIVED HELPERS
   --------------------------------------------------------------------------- */

export const MAILTO_CONTACT = `mailto:${EMAILS.contact}`;
export const MAILTO_LEGAL = `mailto:${EMAILS.legal}`;
export const TEL_HREF = `tel:${PHONE.e164}`;
export const MAPS_HREF = `https://www.google.com/maps/search/?api=1&query=${ADDRESS.mapsQuery}`;

export const COPYRIGHT_YEAR = new Date().getFullYear();

/** schema.org Organization graph, injected into every page. */
export function organizationSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: COMPANY.fullName,
    legalName: COMPANY.legalName,
    alternateName: COMPANY.name,
    url: COMPANY.url,
    description: COMPANY.description,
    foundingDate: String(COMPANY.foundedYear),
    identifier: {
      '@type': 'PropertyValue',
      name: 'CIN',
      value: STATUTORY.cin
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: ADDRESS.line1,
      addressLocality: ADDRESS.city,
      addressRegion: ADDRESS.state,
      postalCode: ADDRESS.postalCode,
      addressCountry: ADDRESS.countryCode
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: EMAILS.contact,
        telephone: PHONE.e164,
        areaServed: 'IN',
        availableLanguage: ['en', 'hi', 'mr']
      },
      {
        '@type': 'ContactPoint',
        contactType: 'legal',
        email: EMAILS.legal
      }
    ],
    founder: DIRECTORS.filter((d) => d.linkedin).map((d) => ({
      '@type': 'Person',
      name: d.name,
      jobTitle: d.role,
      sameAs: d.linkedin
    })),
    sameAs: SOCIALS.map((s) => s.href)
  };
}
