/**
 * Home page content.
 *
 * Note on the figures below: every one is either a verifiable fact about the
 * company or a commitment we are making — not an invented client count or
 * fabricated track record. A 2026 company claiming "500+ projects delivered"
 * is the fastest way to lose a serious reader.
 */

/* ---------------------------------------------------------------------------
   HERO
   --------------------------------------------------------------------------- */

export const HERO = {
  kicker: 'Amravati, India · Est. 2026',
  /** Split so one word can carry the serif-italic accent. */
  titleLead: 'AI that survives',
  titleAccent: 'contact',
  titleTail: 'with real users.',
  lead:
    'VriddhiOne AI Systems designs, builds and operates AI-native software. Not prototypes that impress a room — systems with retrieval you can audit, evaluations that catch regressions, and fallbacks for the day a model provider has an outage.',
  primary: { label: 'Start a conversation', href: '/contact' },
  secondary: { label: 'See how we work', href: '/approach' }
} as const;

/* ---------------------------------------------------------------------------
   HEADLINE FIGURES
   --------------------------------------------------------------------------- */

export interface Figure {
  readonly value: number;
  readonly suffix?: string;
  readonly prefix?: string;
  readonly decimals?: number;
  readonly label: string;
  readonly note: string;
}

export const FIGURES: readonly Figure[] = [
  {
    value: 2,
    label: 'Products in market',
    note: 'Built, operated and supported by us — not client work.'
  },
  {
    value: 6,
    label: 'Capability areas',
    note: 'Strategy through to running the thing in production.'
  },
  {
    value: 1,
    suffix: ' day',
    label: 'Reply commitment',
    note: 'Every enquiry answered within one working day.'
  },
  {
    value: 100,
    suffix: '%',
    label: 'Client-owned',
    note: 'Code, infrastructure and model accounts, in your name.'
  }
];

/* ---------------------------------------------------------------------------
   PILLARS — the three things we are actually for
   --------------------------------------------------------------------------- */

export interface Pillar {
  readonly title: string;
  readonly body: string;
  readonly icon: string;
  readonly points: readonly string[];
}

export const PILLARS: readonly Pillar[] = [
  {
    title: 'Intelligence you can audit',
    icon: 'bot',
    body: 'Retrieval that cites its sources, structured output you can validate, and agents whose tool access is bounded on purpose.',
    points: [
      'Source attribution on every generated answer',
      'Schema-validated output, not free text to be parsed',
      'Explicit permission boundaries around tool use'
    ]
  },
  {
    title: 'Evaluation before deployment',
    icon: 'gauge',
    body: 'An evaluation suite built from your own cases, so you find out a change made things worse before your users do.',
    points: [
      'Scored test sets drawn from real cases, including the awkward ones',
      'Regression runs on every model and prompt change',
      'Cost and latency tracked per request path'
    ]
  },
  {
    title: 'Engineering around the model',
    icon: 'layers',
    body: 'The model is the smallest part. The product, the data layer, the permissions and the deployment pipeline are the job.',
    points: [
      'Accessible interfaces that work on low-end devices',
      'Fallbacks and graceful degradation on every dependency',
      'Logging and tracing that answer "what did it do, and when?"'
    ]
  }
];

/* ---------------------------------------------------------------------------
   DIFFERENTIATORS — the "why us" strip
   --------------------------------------------------------------------------- */

export const DIFFERENTIATORS: readonly {
  title: string;
  body: string;
  icon: string;
}[] = [
  {
    title: 'The people who scope it, build it',
    body: 'No account-management layer between you and the engineers. The person who estimated the work is the person doing it.',
    icon: 'users'
  },
  {
    title: 'We will tell you not to build it',
    body: 'If AI is the wrong tool or the project is not ready, you hear that in week one rather than after the invoice.',
    icon: 'shield'
  },
  {
    title: 'Nothing is held hostage',
    body: 'Repositories, cloud and model accounts are yours from the first commit. There is nothing to migrate if you leave.',
    icon: 'lock'
  },
  {
    title: 'Built for Indian conditions',
    body: 'Patchy networks, low-end Android, data costs that matter. Designed against reality rather than a fast office connection.',
    icon: 'globe'
  }
];

/* ---------------------------------------------------------------------------
   SECTORS
   --------------------------------------------------------------------------- */

export const SECTORS: readonly { name: string; body: string; icon: string }[] = [
  {
    name: 'Professional services',
    body: 'Document-heavy work where retrieval and summarisation save hours: accountancy, legal, consulting, compliance.',
    icon: 'briefcase'
  },
  {
    name: 'Marketplaces & platforms',
    body: 'Matching, ranking, trust and verification — the problems behind any two-sided platform. Both our products live here.',
    icon: 'users'
  },
  {
    name: 'Education & training',
    body: 'Adaptive content, assessment support and tutoring systems that explain their reasoning rather than just scoring.',
    icon: 'graduation'
  },
  {
    name: 'Operations & logistics',
    body: 'Forecasting, scheduling and exception handling where the data is messy and the constraints are real.',
    icon: 'workflow'
  }
];

/* ---------------------------------------------------------------------------
   STACK MARQUEE
   --------------------------------------------------------------------------- */

export const STACK = [
  { label: 'Angular', icon: 'code' },
  { label: 'TypeScript', icon: 'code' },
  { label: 'Python', icon: 'terminal' },
  { label: 'Node.js', icon: 'terminal' },
  { label: 'Claude', icon: 'sparkles' },
  { label: 'RAG', icon: 'search' },
  { label: 'Vector search', icon: 'database' },
  { label: 'PostgreSQL', icon: 'database' },
  { label: 'pgvector', icon: 'layers' },
  { label: 'Redis', icon: 'zap' },
  { label: 'Docker', icon: 'layers' },
  { label: 'OpenTelemetry', icon: 'gauge' },
  { label: 'Playwright', icon: 'check-circle' },
  { label: 'MCP', icon: 'workflow' },
  { label: 'React Native', icon: 'code' },
  { label: 'Vercel', icon: 'rocket' }
] as const;
