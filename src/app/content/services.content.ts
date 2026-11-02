/**
 * Service catalogue.
 *
 * Six capabilities, ordered the way an engagement usually moves: figure out
 * what to build, build the intelligence, build the product around it, build
 * the data underneath it, then modernise whatever it has to live alongside.
 */

export interface Service {
  readonly slug: string;
  readonly title: string;
  readonly icon: string;
  /** One line, used in cards and in the nav preview. */
  readonly summary: string;
  /** Two or three sentences, used on the services page. */
  readonly detail: string;
  /** Concrete artefacts the client ends up owning. */
  readonly deliverables: readonly string[];
  /** Tools and techniques, shown as chips. */
  readonly stack: readonly string[];
}

export const SERVICES: readonly Service[] = [
  {
    slug: 'ai-strategy',
    title: 'AI Strategy & Product Consultancy',
    icon: 'compass',
    summary:
      'Work out which problems AI actually solves for you — and which it does not.',
    detail:
      'Most AI projects fail before a line of code is written, because the problem was never the right shape for the technology. We start by mapping your workflows, finding the places where a model genuinely beats the current process, and sizing each one honestly against effort and risk. You get a prioritised plan, not a pitch.',
    deliverables: [
      'Opportunity map across your existing workflows',
      'Prioritised roadmap with effort, risk and expected payoff per item',
      'Build-versus-buy assessment for each component',
      'Cost model covering inference, infrastructure and operations',
      'A clear recommendation on what to do first — and what to leave alone'
    ],
    stack: ['Workflow mapping', 'Cost modelling', 'Technical due diligence']
  },
  {
    slug: 'llm-agent-systems',
    title: 'LLM & Agent Systems',
    icon: 'bot',
    summary:
      'Retrieval, agents, tool use and evaluation — built to be measured, not demoed.',
    detail:
      'A prompt that works in a notebook is not a system. We build the parts that make language models dependable in front of real users: retrieval that cites its sources, agents with bounded tool access, structured outputs you can validate, guardrails on both input and output, and an evaluation suite that tells you when a change made things worse.',
    deliverables: [
      'Retrieval pipeline with chunking, embeddings and source citation',
      'Agent and tool-use architecture with explicit permission boundaries',
      'Evaluation harness with regression suites and scored test sets',
      'Prompt and model version control, with rollback',
      'Guardrails, fallbacks and graceful degradation when a model is down',
      'Token and latency instrumentation per request path'
    ],
    stack: [
      'Claude',
      'RAG',
      'Vector search',
      'Function calling',
      'Evals',
      'Structured output',
      'MCP'
    ]
  },
  {
    slug: 'product-engineering',
    title: 'AI Product Engineering',
    icon: 'rocket',
    summary:
      'The whole product around the model — web, mobile, API, billing, admin.',
    detail:
      'The model is usually the smallest part. We build everything around it: the interface people actually touch, the authentication and permissions, the payment flow, the admin tooling your team needs on day two, and the deployment pipeline that gets changes out safely. End to end, by one team, so nothing falls down the gap between frontend and inference.',
    deliverables: [
      'Responsive web application, built mobile-first',
      'Cross-platform mobile app where the product needs one',
      'Versioned API with authentication and rate limiting',
      'Admin and internal tooling for your own team',
      'Payments, subscriptions and invoicing integration',
      'CI/CD pipeline, staging environment and release process'
    ],
    stack: [
      'Angular',
      'TypeScript',
      'Node.js',
      'Python',
      'PostgreSQL',
      'React Native',
      'Docker'
    ]
  },
  {
    slug: 'data-platform',
    title: 'Data & Platform Engineering',
    icon: 'database',
    summary:
      'The pipelines, stores and observability your AI depends on to be correct.',
    detail:
      'AI systems are only as good as the data reaching them, and only as operable as their instrumentation. We build the ingestion, cleaning and transformation layers, choose storage that fits the access pattern rather than the trend, and wire up the logging, tracing and alerting that let you answer "what did the system actually do?" months later.',
    deliverables: [
      'Ingestion and transformation pipelines with schema validation',
      'Operational and analytical data stores, modelled for their access pattern',
      'Embedding and index refresh jobs with change detection',
      'Structured logging, tracing and request-level audit trails',
      'Dashboards and alerting on quality, cost and latency',
      'Backup, retention and recovery procedures'
    ],
    stack: [
      'PostgreSQL',
      'pgvector',
      'Redis',
      'Python',
      'Airflow',
      'OpenTelemetry'
    ]
  },
  {
    slug: 'custom-software',
    title: 'Custom Software Development',
    icon: 'code',
    summary:
      'Web and mobile software built properly, whether or not AI is involved.',
    detail:
      'Plenty of worthwhile problems need good software rather than a model. We take these on the same way: understand the domain, design for the people who will use it daily, write code the next engineer can read, and test the paths that matter. Accessible, fast, and documented well enough that you are not dependent on us.',
    deliverables: [
      'Product and technical discovery, written down',
      'Accessible, responsive interfaces that work on low-end devices',
      'Automated test coverage on business-critical paths',
      'Performance budgets, enforced in the build',
      'Deployment and rollback runbooks',
      'Handover documentation and a walkthrough with your team'
    ],
    stack: [
      'Angular',
      'TypeScript',
      'SCSS',
      'Node.js',
      'REST',
      'Playwright',
      'Vercel'
    ]
  },
  {
    slug: 'modernisation',
    title: 'Digital Transformation & Modernisation',
    icon: 'git-branch',
    summary:
      'Bring existing systems forward without stopping the business to do it.',
    detail:
      'Working software that is hard to change is still working software. We modernise in slices — identify what hurts most, put a seam around it, replace it behind a stable interface, and repeat. Legacy data gets migrated with verification at both ends. Nothing goes dark while we do it, and your team learns the new stack as we go.',
    deliverables: [
      'Assessment of the current system, with a ranked list of what to change',
      'Incremental migration plan with a rollback path at every step',
      'Data migration with reconciliation and verification reports',
      'Integration layer between new services and existing systems',
      'Team enablement sessions on the new stack',
      'Decommissioning plan for what the migration replaces'
    ],
    stack: [
      'Incremental refactoring',
      'API gateways',
      'Data migration',
      'Cloud migration'
    ]
  }
] as const;

/* ---------------------------------------------------------------------------
   ENGAGEMENT MODELS
   --------------------------------------------------------------------------- */

export interface EngagementModel {
  readonly name: string;
  readonly icon: string;
  readonly best: string;
  readonly shape: string;
  readonly points: readonly string[];
}

export const ENGAGEMENT_MODELS: readonly EngagementModel[] = [
  {
    name: 'Discovery sprint',
    icon: 'search',
    best: 'You have a problem but not yet a plan.',
    shape: 'One to two weeks, fixed scope and fixed price',
    points: [
      'Workshops with the people doing the work today',
      'Technical feasibility assessment, with the risks named',
      'Prioritised roadmap and cost model you can act on',
      'Ends with a written recommendation — including "do not build this" if that is the answer'
    ]
  },
  {
    name: 'Scoped build',
    icon: 'target',
    best: 'The outcome is clear and you want it delivered.',
    shape: 'Fixed scope, milestone-based, agreed up front',
    points: [
      'Defined deliverables with acceptance criteria per milestone',
      'Demo at the end of every milestone, on a real environment',
      'Change requests priced before they are picked up',
      'You own the code, the infrastructure and the accounts throughout'
    ]
  },
  {
    name: 'Embedded team',
    icon: 'users',
    best: 'You need sustained capacity alongside your own team.',
    shape: 'Monthly retainer, a named team, fixed capacity',
    points: [
      'Works in your tracker, your repos, your standups',
      'Capacity reserved monthly rather than billed by the hour',
      'Rolling priorities you set at the start of each cycle',
      'Thirty days notice either way, no lock-in'
    ]
  },
  {
    name: 'Run and improve',
    icon: 'gauge',
    best: 'The system is live and has to stay that way.',
    shape: 'Ongoing, with an agreed response commitment',
    points: [
      'Monitoring, alerting and on-call response',
      'Model and dependency upgrades, regression-tested before release',
      'Monthly report on cost, quality and latency trends',
      'A standing improvement budget rather than change-request friction'
    ]
  }
] as const;
