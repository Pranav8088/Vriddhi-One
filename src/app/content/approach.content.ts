/**
 * How we work. Deliberately specific — a process page that could belong to
 * any company is worth nothing to the person reading it.
 */

export interface Phase {
  readonly no: string;
  readonly name: string;
  readonly duration: string;
  readonly intent: string;
  readonly activities: readonly string[];
  readonly exit: string;
  readonly icon: string;
}

export const PHASES: readonly Phase[] = [
  {
    no: '01',
    name: 'Understand',
    duration: '1–2 weeks',
    intent:
      'Learn the actual workflow before proposing anything. Most of what matters is undocumented and lives with the people doing the job.',
    activities: [
      'Sessions with the people who do the work today, not only the people commissioning the change',
      'Review of existing systems, data and integration points',
      'Define what success means in numbers you already track',
      'Name the risks, including the ones that could stop the project'
    ],
    exit:
      'A written problem statement, measurable success criteria, and an honest view on feasibility.',
    icon: 'search'
  },
  {
    no: '02',
    name: 'Prove',
    duration: '2–4 weeks',
    intent:
      'Build the narrowest thing that tests the riskiest assumption. For AI work that means measuring quality on your data, not a benchmark.',
    activities: [
      'A thin vertical slice running end to end on real data',
      'Evaluation set built from your own cases, including the awkward ones',
      'Baseline measurement, so later changes can be compared against something',
      'Cost per request projected to realistic volume'
    ],
    exit:
      'Numbers on real data, and a go / no-go recommendation we are willing to argue either way.',
    icon: 'target'
  },
  {
    no: '03',
    name: 'Build',
    duration: '6–12 weeks, typically',
    intent:
      'Turn the proven slice into a product. Shipped in milestones, each one demonstrable on a real environment.',
    activities: [
      'Two-week cycles, each ending in something you can use',
      'Automated tests on the paths that would hurt if they broke',
      'Accessibility and performance treated as acceptance criteria, not polish',
      'Infrastructure, CI/CD and staging set up in your accounts from day one'
    ],
    exit:
      'A working product in your infrastructure, with the pipeline that deploys it.',
    icon: 'code'
  },
  {
    no: '04',
    name: 'Harden',
    duration: '2–3 weeks',
    intent:
      'Make it survive contact with real users — and with a model provider having a bad day.',
    activities: [
      'Load and failure testing, including provider timeouts and rate limits',
      'Fallbacks and graceful degradation on every external dependency',
      'Logging, tracing and alerting wired to somebody who will see it',
      'Security review, data retention policy and access control audit'
    ],
    exit:
      'Runbooks, alerting, rollback procedure, and a system that fails visibly rather than silently.',
    icon: 'shield'
  },
  {
    no: '05',
    name: 'Operate',
    duration: 'Ongoing, if you want it',
    intent:
      'AI systems drift. Models get deprecated, data shifts, costs move. Someone has to watch.',
    activities: [
      'Regression suite run against every model and dependency upgrade',
      'Monthly review of quality, latency and cost trends',
      'Incident response against an agreed commitment',
      'A standing improvement budget instead of change-request friction'
    ],
    exit:
      'A system that keeps working — or your own team trained to keep it working without us.',
    icon: 'gauge'
  }
] as const;

/* ---------------------------------------------------------------------------
   PRINCIPLES
   --------------------------------------------------------------------------- */

export interface Principle {
  readonly title: string;
  readonly body: string;
  readonly icon: string;
}

export const PRINCIPLES: readonly Principle[] = [
  {
    title: 'Measured, not demoed',
    body: 'Anything that reaches production has an evaluation suite behind it. If we cannot measure whether a change made it better, we have not finished building it.',
    icon: 'gauge'
  },
  {
    title: 'You own everything',
    body: 'Code, infrastructure, model accounts, data. Set up in your name from the first commit. Our value is the work, not holding the keys.',
    icon: 'lock'
  },
  {
    title: 'Smallest useful slice first',
    body: 'A narrow thing in production teaches you more than a broad thing in staging. We ship the thin vertical and widen it from evidence.',
    icon: 'layers'
  },
  {
    title: 'Plain language',
    body: 'No jargon used to sound impressive and no certainty we have not earned. If something is a guess, we say it is a guess.',
    icon: 'message'
  },
  {
    title: 'The boring parts count',
    body: 'Logging, migrations, error states, empty states, permissions. The unglamorous work is what separates a demo from a product.',
    icon: 'terminal'
  },
  {
    title: 'We will say no',
    body: 'If AI is the wrong tool, or the project is not ready, or we are not the right team for it, we will tell you at the start rather than bill you to find out.',
    icon: 'shield'
  }
] as const;

/* ---------------------------------------------------------------------------
   COMMITMENTS
   --------------------------------------------------------------------------- */

export const COMMITMENTS: readonly { we: string; you: string }[] = [
  {
    we: 'A named engineer who knows your project, reachable directly.',
    you: 'One decision-maker who can approve scope without a committee.'
  },
  {
    we: 'Working software demonstrated every two weeks, on a real environment.',
    you: 'Access to the people who do the work today, for a few hours a cycle.'
  },
  {
    we: 'Estimates with the uncertainty stated, and early warning when they move.',
    you: 'Honesty about constraints — budget, deadline, politics — up front.'
  },
  {
    we: 'Documentation and a handover session, whether or not you retain us after.',
    you: 'Someone on your side who will own the system once it is live.'
  }
] as const;

/* ---------------------------------------------------------------------------
   FAQ
   --------------------------------------------------------------------------- */

export const FAQS: readonly { q: string; a: string }[] = [
  {
    q: 'We are a new company. Why should that not worry me?',
    a: 'It is a fair question, and you should ask it. VriddhiOne was incorporated in 2026, and we are deliberately small. What that buys you: the people who scope your project are the people who build it, there is no account-management layer between you and the work, and we take on fewer projects than a larger firm would. What it means in practice is that we are selective — if your project needs capacity we do not have, we will say so rather than stretch.'
  },
  {
    q: 'Do you only work on AI projects?',
    a: 'No. A good share of what gets asked for as an "AI project" turns out to need better software, cleaner data, or a fixed process — and we will tell you that rather than add a model to justify the invoice. We build conventional web and mobile software to the same standard.'
  },
  {
    q: 'Who owns the code and the data?',
    a: 'You do, entirely. Repositories, cloud accounts and model provider accounts are set up in your name from the beginning. We work inside your infrastructure rather than ours, so there is nothing to migrate if you stop working with us, and no leverage held over you.'
  },
  {
    q: 'How do you price work?',
    a: 'Discovery is fixed scope and fixed price. Build work is milestone-based against agreed deliverables, with change requests priced before they are started. Ongoing work is a monthly retainer for reserved capacity rather than hourly billing. You will always know the cost of the next step before it begins.'
  },
  {
    q: 'What happens if a model provider changes or deprecates something?',
    a: 'This is normal and we plan for it. Model calls sit behind an interface rather than being scattered through the codebase, prompts and model versions are tracked, and the evaluation suite runs against any upgrade before it ships. When a provider deprecates something, it is a scheduled change rather than an outage.'
  },
  {
    q: 'Can you work with our existing engineering team?',
    a: 'Yes, and it is usually the better outcome. We work in your repositories, your tracker and your review process, and we would rather leave your team able to maintain what we built than keep it dependent on us. Enablement sessions are part of handover, not an upsell.'
  },
  {
    q: 'Where are you based, and does that matter?',
    a: 'Amravati, Maharashtra. We work with clients across India and remotely beyond it. For projects needing on-site time we will travel; for everything else we have found that written communication and recorded demos beat meetings in most cases regardless of location.'
  }
] as const;
