/**
 * Careers.
 *
 * We are a 2026 company with a small team, so this page does not pretend to
 * carry a long requisition list. It describes the shapes of role we hire for
 * and invites speculative applications — which is the honest version.
 */

export interface RoleShape {
  readonly title: string;
  readonly icon: string;
  readonly summary: string;
  readonly youWould: readonly string[];
  readonly weLookFor: readonly string[];
}

export const ROLE_SHAPES: readonly RoleShape[] = [
  {
    title: 'AI / ML Engineer',
    icon: 'bot',
    summary:
      'Build the retrieval, agent and evaluation layers that make language models dependable in production.',
    youWould: [
      'Design retrieval pipelines and measure whether they actually retrieve',
      'Build evaluation sets from real cases and defend the numbers they produce',
      'Instrument cost and latency, then bring both down',
      'Own the fallback behaviour for when a provider fails'
    ],
    weLookFor: [
      'Python, and comfort reading a paper and then shipping from it',
      'Scepticism about your own results — you look for the case that breaks it',
      'Experience with retrieval, agents or evaluation beyond tutorial depth',
      'Clear written explanation of a trade-off you chose and why'
    ]
  },
  {
    title: 'Full-stack Product Engineer',
    icon: 'code',
    summary:
      'Build the product around the model — interface, API, data layer and the deployment path.',
    youWould: [
      'Ship features end to end, from schema to the pixel',
      'Build interfaces that work on a low-end Android on a weak connection',
      'Write the tests that would have caught the last bug',
      'Treat accessibility and performance as acceptance criteria'
    ],
    weLookFor: [
      'Strong TypeScript; Angular or React in depth, either is fine',
      'Backend confidence — Node.js or Python, and SQL you can reason about',
      'Care about the states nobody demos: empty, loading, error, offline',
      'Something you have built that you can walk us through honestly'
    ]
  },
  {
    title: 'Product Designer',
    icon: 'sparkles',
    summary:
      'Design products where the intelligence is legible — people should understand what the system did and why.',
    youWould: [
      'Design for uncertainty: confidence, partial answers, and being wrong',
      'Make model behaviour explainable without burying it in disclaimers',
      'Own flows end to end, including the unglamorous middle',
      'Work in the codebase enough to know what your design costs'
    ],
    weLookFor: [
      'Portfolio showing reasoning, not only final screens',
      'Comfort designing for Indian users across devices and languages',
      'Fluency in a real design system — tokens, states, accessibility',
      'Opinions you will argue for and change your mind about'
    ]
  },
  {
    title: 'Internships',
    icon: 'graduation',
    summary:
      'Three to six months on real work, with a named mentor and something shipped by the end.',
    youWould: [
      'Work on a real feature in a real repository, reviewed properly',
      'Pair with an engineer weekly rather than be left to sink',
      'Present what you built at the end of it',
      'Leave with code you can point at in an interview'
    ],
    weLookFor: [
      'Evidence you build things — side projects beat coursework',
      'Willingness to ask the question you think is stupid',
      'Final-year students and recent graduates welcome',
      'Based in or able to work from India'
    ]
  }
];

/* ---------------------------------------------------------------------------
   HIRING PROCESS
   --------------------------------------------------------------------------- */

export const HIRING_STEPS: readonly {
  no: string;
  name: string;
  detail: string;
}[] = [
  {
    no: '01',
    name: 'You write to us',
    detail:
      'A short note about what you have built and what you want to work on. A link to code or a portfolio beats a formatted CV. No cover letter theatre.'
  },
  {
    no: '02',
    name: 'A real conversation',
    detail:
      'Forty-five minutes about your work and ours. You interview us as much as we interview you — ask about the hard parts, because they exist.'
  },
  {
    no: '03',
    name: 'A paid exercise',
    detail:
      'A small problem close to the actual work, scoped to a few hours and paid for. No unpaid take-homes, no algorithm quizzes, no whiteboard.'
  },
  {
    no: '04',
    name: 'Walk us through it',
    detail:
      'You present your solution and we pick at it together. We are interested in how you reason and how you handle being pushed, not whether you got the intended answer.'
  },
  {
    no: '05',
    name: 'Decision, either way',
    detail:
      'Within a week, with actual reasons. If it is no, you get specifics you can use. Nobody gets left on read.'
  }
];

/* ---------------------------------------------------------------------------
   WHAT WE OFFER
   --------------------------------------------------------------------------- */

export const PERKS: readonly { title: string; body: string; icon: string }[] = [
  {
    title: 'Work that ships',
    body: 'Small team, real products, your name on things people use. Nothing you build sits in a demo folder.',
    icon: 'rocket'
  },
  {
    title: 'Learning as part of the job',
    body: 'Time and budget for courses, books and conferences. In this field, a team that stops learning is finished within a year.',
    icon: 'graduation'
  },
  {
    title: 'Flexible and remote-friendly',
    body: 'Remote across India. Asynchronous by default — we write things down instead of defending a calendar full of meetings.',
    icon: 'globe'
  },
  {
    title: 'Direct access',
    body: 'No management layers to route around. You will talk to whoever is making the decision, including about your own work.',
    icon: 'message'
  },
  {
    title: 'Honest ownership',
    body: 'You own areas, not tickets. With that comes the authority to say a deadline is wrong before it slips, not after.',
    icon: 'target'
  },
  {
    title: 'No fake urgency',
    body: 'Deadlines are real when they are real. We do not manufacture crunch to look busy, and sustained overtime is treated as a planning failure.',
    icon: 'gauge'
  }
];
