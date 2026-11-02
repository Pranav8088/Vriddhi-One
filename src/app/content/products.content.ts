/**
 * Our own products.
 *
 * These are built and operated by us, not client work. They are also where
 * our engineering opinions get tested against real users before we bring
 * them to anyone else's product.
 */

export type ProductStatus = 'live' | 'soon' | 'research';

export interface Product {
  readonly slug: string;
  readonly name: string;
  readonly status: ProductStatus;
  readonly statusLabel: string;
  readonly tagline: string;
  /** The problem, in plain terms. */
  readonly problem: string;
  /** What we do about it. */
  readonly approach: string;
  readonly features: readonly { title: string; body: string; icon: string }[];
  readonly audience: readonly string[];
  /**
   * Public URL once the product has one. Null renders the card without an
   * outbound link rather than pointing at a dead address.
   */
  readonly url: string | null;
  readonly icon: string;
  /** Screenshot path under /assets. Null renders a labelled media slot. */
  readonly shot: string | null;
}

export const PRODUCTS: readonly Product[] = [
  {
    slug: 'roomie-hunt',
    name: 'Roomie Hunt',
    status: 'live',
    statusLabel: 'Live',
    tagline: 'Find a flatmate you can actually live with.',
    problem:
      'Shared housing in Indian cities is matched on rent and pin code, and almost never on the things that decide whether it works — sleep hours, food, noise, guests, how a household splits its bills. People move in on a two-minute phone call and move out three months later.',
    approach:
      'Roomie Hunt profiles the things that actually cause friction, then matches on compatibility rather than proximity alone. Listings are verified, conversations stay inside the platform until both sides choose otherwise, and matches come with the reasons they were made, so you can disagree with them.',
    features: [
      {
        title: 'Compatibility matching',
        body: 'Scored on lifestyle, schedule, food, noise tolerance and cleanliness — not just budget and locality.',
        icon: 'sparkles'
      },
      {
        title: 'Verified listings',
        body: 'Identity and listing checks before a room goes live, so the flat you travel across the city for exists.',
        icon: 'shield'
      },
      {
        title: 'Explained matches',
        body: 'Every match shows why it was made and where you differ, so you can judge it yourself.',
        icon: 'info'
      },
      {
        title: 'Private until you choose',
        body: 'Contact details stay hidden behind in-app chat until both people agree to share them.',
        icon: 'lock'
      }
    ],
    audience: [
      'Students and young professionals',
      'Urban renters in metro and tier-2 cities',
      'People relocating for work',
      'Flat owners listing a spare room'
    ],
    // Add the live URL here and the card becomes a link automatically.
    url: null,
    icon: 'home',
    shot: null
  },
  {
    slug: 'ca-hunt',
    name: 'CA Hunt',
    status: 'soon',
    statusLabel: 'In development',
    tagline: 'The right Chartered Accountant, not just the nearest one.',
    problem:
      'Finding a CA in India runs on referrals and luck. A founder needing startup compliance, a freelancer needing one clean return and a manufacturer needing GST and audit work all get pointed at whoever a cousin used — and have no way to tell whether that person has done their kind of work before.',
    approach:
      'CA Hunt matches businesses to Chartered Accountants by the work actually needed: practice area, industry experience, filing type, language and location. Credentials are verified against the professional register, scope and fees are agreed in writing before work starts, and documents move through one audited channel instead of a WhatsApp thread.',
    features: [
      {
        title: 'Matched by practice area',
        body: 'GST, income tax, audit, startup compliance, ROC filings, transfer pricing — matched on the work, not the postcode.',
        icon: 'target'
      },
      {
        title: 'Verified credentials',
        body: 'Membership and firm details checked against the professional register before a profile is listed.',
        icon: 'check-circle'
      },
      {
        title: 'Scope agreed up front',
        body: 'Deliverables, timelines and fees written down before anyone starts, so there is no end-of-year surprise.',
        icon: 'clipboard-check'
      },
      {
        title: 'One document trail',
        body: 'Secure upload, structured requests and a full audit trail — instead of chasing attachments across chat apps.',
        icon: 'file-text'
      }
    ],
    audience: [
      'Small and medium businesses',
      'Startups and founders',
      'Freelancers and consultants',
      'Chartered Accountants building a practice'
    ],
    url: null,
    icon: 'briefcase',
    shot: null
  }
] as const;

/** Product principles — what holds for anything carrying our name. */
export const PRODUCT_PRINCIPLES: readonly {
  title: string;
  body: string;
  icon: string;
}[] = [
  {
    title: 'Built for Indian conditions',
    body: 'Designed against patchy connectivity, low-end Android devices and data costs that matter. If it only works on fast broadband, it does not work.',
    icon: 'globe'
  },
  {
    title: 'The model explains itself',
    body: 'Where a recommendation affects someone, it shows its reasoning. People should be able to disagree with a match and understand what it got wrong.',
    icon: 'bot'
  },
  {
    title: 'Data you can take with you',
    body: 'Export your data, delete your account, and have it actually be gone. No hostage-taking as a retention strategy.',
    icon: 'lock'
  },
  {
    title: 'Trust before scale',
    body: 'Verification and moderation come before growth targets. A marketplace nobody trusts is not worth the users it acquired.',
    icon: 'shield'
  }
] as const;
