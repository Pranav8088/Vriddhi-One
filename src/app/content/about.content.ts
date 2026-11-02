/**
 * About page content.
 *
 * Written for a company incorporated in 2026. No invented client counts, no
 * fabricated years of operation — the credibility has to come from being
 * specific about how we work, not from numbers we have not earned yet.
 */

export const STORY: readonly string[] = [
  'VriddhiOne started from a frustration that will be familiar to anyone who has watched an AI project up close: the demo is extraordinary, and then nothing reaches production. The prototype impresses a room, the pilot stalls, and eighteen months later the workflow it was meant to fix is being done the old way.',
  'The gap is almost never the model. It is everything around it — retrieval that cannot cite a source, no way to tell whether a prompt change made things worse, no fallback when a provider times out, no one who can answer what the system did last Tuesday. The unglamorous engineering that turns a capability into a product.',
  'That is the work we chose to do. We are an AI product and engineering company: we design the system, build the product around it, instrument it so it can be measured, and keep it running once real people depend on it. Occasionally the honest answer is that AI is the wrong tool for the problem, and we say so.',
  'The name is Sanskrit. Vriddhi (वृद्धि) means growth — the compounding kind that comes from steady accumulation rather than a sudden jump. It is the right word for how good software gets built, and for the sort of company we are trying to be.'
];

export interface Value {
  readonly title: string;
  readonly body: string;
  readonly icon: string;
}

export const VALUES: readonly Value[] = [
  {
    title: 'Evidence over enthusiasm',
    body: 'AI invites overclaiming. We hold ourselves to measurements on your data, and we report the numbers that are unflattering as readily as the ones that are not.',
    icon: 'gauge'
  },
  {
    title: 'Craft in the invisible parts',
    body: 'Error states, migrations, permissions, logs. Nobody demos them and everybody depends on them. We treat them as the actual work.',
    icon: 'terminal'
  },
  {
    title: 'Clients leave stronger',
    body: 'Success is your team being able to maintain, extend and reason about what we built. Dependency is not a business model we are interested in.',
    icon: 'graduation'
  },
  {
    title: 'Built for here',
    body: 'Indian conditions are the design target, not a localisation afterthought. Low-end devices, unreliable networks, data costs, Indian regulatory reality.',
    icon: 'globe'
  },
  {
    title: 'Small and deliberate',
    body: 'We take fewer projects than we could, so the people who scoped your work are the people doing it. Growth that costs us that is not growth.',
    icon: 'users'
  },
  {
    title: 'Straight answers',
    body: 'Including the expensive ones: this will take longer than you hoped, this is not worth building, we are not the right team for this.',
    icon: 'message'
  }
];

/* ---------------------------------------------------------------------------
   TIMELINE
   --------------------------------------------------------------------------- */

export const MILESTONES: readonly {
  when: string;
  what: string;
  detail: string;
}[] = [
  {
    when: '2026',
    what: 'VriddhiOne AI Systems incorporated',
    detail:
      'Registered as a private limited company in Maharashtra, India under CIN U78100ME2026PTC476757, with a registered office in Amravati.'
  },
  {
    when: '2026',
    what: 'Roomie Hunt goes live',
    detail:
      'Our first product ships — compatibility-based flatmate matching for Indian cities, built to work on low-end devices and patchy connections.'
  },
  {
    when: 'In progress',
    what: 'CA Hunt in development',
    detail:
      'A verified directory matching Indian businesses to Chartered Accountants by practice area and industry experience, rather than by proximity.'
  },
  {
    when: 'Next',
    what: 'Client engineering practice',
    detail:
      'Taking on a small number of AI product engagements alongside our own products, in the areas where our own work has already taught us something.'
  }
];

/* ---------------------------------------------------------------------------
   CAPABILITY AREAS — what we actually know how to do
   --------------------------------------------------------------------------- */

export const CAPABILITIES: readonly { area: string; items: readonly string[] }[] =
  [
    {
      area: 'AI systems',
      items: [
        'Retrieval-augmented generation with source attribution',
        'Agent architectures and bounded tool use',
        'Evaluation harnesses and regression suites',
        'Prompt and model version management',
        'Guardrails, structured output and schema validation',
        'Cost and latency instrumentation'
      ]
    },
    {
      area: 'Product engineering',
      items: [
        'Angular and TypeScript single-page applications',
        'Node.js and Python backend services',
        'REST API design, authentication and rate limiting',
        'Mobile applications, built mobile-first',
        'Payments, subscriptions and invoicing',
        'Accessibility to WCAG 2.1 AA'
      ]
    },
    {
      area: 'Platform & data',
      items: [
        'PostgreSQL schema design and query optimisation',
        'Vector search and embedding refresh pipelines',
        'Ingestion and transformation with schema validation',
        'Structured logging, tracing and audit trails',
        'CI/CD pipelines and staging environments',
        'Backup, retention and recovery procedures'
      ]
    }
  ];
