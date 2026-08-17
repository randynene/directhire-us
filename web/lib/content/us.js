/* All copy for the US Direct Hire page, kept out of JSX so a locale-keyed
   UK variant (same Figma file, same components) can reuse every section
   as a second route rather than a second build. Copy is final — transcribed
   verbatim from the design handoff; do not rewrite or "fix" it. */

export const us = {
  locale: 'US',

  nav: {
    brand: 'CloudEmployee',
    links: [
      { label: 'How it works', href: '#how' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'FAQ', href: '#faq' },
    ],
    cta: 'Start a search',
  },

  hero: {
    eyebrow: 'Direct hire — United States',
    heading: 'Hire US engineers\nvetted by',
    emphasis: 'engineers',
    lead: 'Permanent hires, on your payroll. On average you interview two, and hire one. All candidates interviewed by our senior engineers.',
    checks: [
      '2 matched profiles, not 200 CVs',
      'A senior engineer interviews every candidate',
      '6-month replacement guarantee',
    ],
    shortlist: {
      badge: '2 profiles',
      footnote: 'Each profile ships with a written report on why they fit.',
      candidates: [
        { role: 'Senior AI Engineer', meta: 'Austin, TX · 9 yrs', skills: ['Go', 'Postgres', 'AWS', 'Kafka'], salary: '$175,000' },
        { role: 'Senior Full-Stack Engineer', meta: 'Denver, CO · 7 yrs', skills: ['TypeScript', 'React', 'Node', 'GraphQL'], salary: '$160,000' },
      ],
    },
  },

  problem: {
    eyebrow: 'AI ruined hiring',
    heading: 'Its easy to get 500 applicants in a week.',
    paragraphs: [
      'Half of them AI-generated. Your best candidate is somewhere in that pile, and nobody on your team has a week to find them.',
      'Meanwhile the engineers you actually want aren’t applying to job posts at all. So we don’t fish that pool. We go and find people — and a senior engineer interviews them before you see a name.',
    ],
    gridLabel: 'What a job post gets you',
    floaters: ['Senior Backend Engineer', 'Senior Full-Stack Engineer'],
    caption: 'WHAT WE SEND',
  },

  explainer: {
    eyebrow: '90 seconds',
    heading: 'How direct hire works, from',
    emphasis: 'Seb',
    lead: 'Our CEO on what you get, what it costs, and why we only send two.',
    video: {
      name: 'Seb Hall',
      role: 'Cloud Employee · CEO & Co-Founder',
      caption: 'REAL VIDEO STILL GOES HERE\n(same framing as the homepage explainer)',
      annotation: 'Video slot — to film',
    },
    footAttribution: 'Seb Hall, CEO & Co-Founder · 90-second explainer',
    footLink: 'Prefer to read? The three stages →',
  },

  process: {
    eyebrow: 'Our process',
    heading: 'Three stages. No',
    emphasis: 'guessing.',
    lead: 'We define the role, we find and vet, you decide. That’s the whole thing.',
    stages: [
      { number: '01', title: 'Tell us what you need', note: '45 minutes, before we search.', body: 'A senior engineer scopes what you actually need. Your stack, company culture, mission.' },
      { number: '02', title: 'Interviewed by Engineers', note: '100+ sourced. Two profiles.', body: 'Sourced from networks and referrals, never a job board. Live coding interviews with a senior engineer, CTO sign-off.' },
      { number: '03', title: 'You pick. They start.', note: 'You decide. We handle the mechanics.', body: 'Both arrive with a written report on why they fit. We run scheduling, feedback, the offer — and the counteroffer conversation.' },
    ],
    stage2: {
      kicker: 'Stage 02, in practice',
      title: 'A person watching them think',
      paragraphs: [
        'Live pair programming on a real problem from a stack like yours. Not an algorithm puzzle, not a recorded assessment, not a take-home they can hand to an AI.',
        'The question that matters isn’t whether the code runs. It’s why they made that choice — and you can’t fake the answer to a follow-up.',
      ],
      code: {
        label: 'pair-session · your stack',
        lines: [
          'async function processBatch(jobs) {',
          '  const chunks = chunk(jobs, 250)',
          '  for (const c of chunks) {',
          '    await enqueue(c, { retries: 3 })',
          '  }',
          '}',
          '',
          '// "because a retry storm would take',
          '// the write replica down at 250k…"',
        ],
      },
    },
    stage3: {
      kicker: 'Stage 03, in practice',
      title: 'The report you get on both',
      paragraphs: [
        'Coding score, interview verdict, work history, and the parts where they’re a stretch. You see what our engineer saw.',
        'A candidate with no weaknesses listed just means nobody looked properly.',
      ],
      report: {
        name: 'Senior Backend Engineer',
        meta: 'Austin, TX · 9 yrs · Go, Postgres, AWS',
        tabs: ['Overview', 'CV', 'Tech interview', 'Coding test'],
        scores: [
          { label: 'Coding test', value: 88, verdict: '88%', tone: 'positive' },
          { label: 'Interview', value: 82, verdict: 'Strong', tone: 'positive' },
          { label: 'Front-end', value: 46, verdict: 'Fair', tone: 'caution' },
        ],
        footer: 'Worth knowing: front-end work is four years back. Fine for a backend-weighted role — a stretch if you need full-stack from week one.',
      },
    },
    funnel: [
      { label: 'Initial sourcing pool', bar: 100, value: '100+' },
      { label: 'After CV & AI screening', bar: 40, value: '~40' },
      { label: 'After technical interview', bar: 15, value: '~15' },
      { label: 'After live pair programming', bar: 6, value: '~6' },
      { label: 'You interview both. You hire one.', bar: 2, value: '2' },
    ],
  },

  deRisk: [
    'No fee unless you hire',
    '6-month replacement guarantee',
    'Weekly updates, news or not',
    'Anyone we place is off-limits to us, in writing',
  ],

  differentiators: {
    eyebrow: 'Engineers should hire engineers',
    heading: 'We do what a recruiter',
    emphasis: 'can’t',
    after: 'do',
    lead: 'We’ve been vetting senior engineers for companies for over ten years. This is the proven process.',
    features: [
      { icon: 'code-brackets', title: 'A senior engineer ran the interview', body: 'Live pair programming on a real problem, not a keyword match against a job description. You get their name and their notes.' },
      { icon: 'check', title: 'A written report on both finalists', body: 'Why they fit, and where they’re a stretch. A candidate with no weaknesses listed just means nobody looked properly.' },
      { icon: 'arrow-right', title: 'Weekly updates, news or not', body: 'Going quiet is the standard in this industry. It shouldn’t be. You hear from us every week the search is open.' },
      { icon: 'shield', title: 'We don’t come back for them', body: 'Anyone we place is off-limits to us permanently — and it’s in the contract, not just on this page.' },
    ],
  },

  pricing: {
    eyebrow: 'Pricing',
    heading: 'One fee.',
    emphasis: 'Published.',
    lead: 'Most agencies won’t tell you the number until they’ve pitched you. Here it is.',
    card: {
      headline: '25%',
      subhead: 'of first-year base salary',
      rows: [
        { label: 'Example: senior engineer at $140,000', value: '$35,000' },
        { label: 'Paid to start the search, credited in full', value: '− $3,000' },
        { label: 'Due when they start', value: '$32,000', emphasis: true },
      ],
      footnote: 'Base salary only — we don’t take a percentage of bonus, equity or signing. If you don’t hire anyone, the $3,000 is all you’ve spent.',
    },
    why: {
      title: 'Why we ask for $3,000 up front',
      body: 'Because contingent recruiters get paid only if they place someone — so they run twenty searches at once, send volume, and go quiet on the ones that look hard.',
      checks: [
        'It buys a committed search, not a place in a queue',
        'It pays for senior engineer interview time, which isn’t free',
        'It comes straight off the fee when you hire',
      ],
    },
  },

  faq: {
    eyebrow: 'Questions',
    heading: 'The questions\nfounders and CTOs',
    emphasis: 'actually ask.',
    sideCard: {
      title: 'Not answered here?',
      body: 'Ask our AI chatbot, trained on every sales call we’ve had.',
      cta: 'Open chat',
    },
    items: [
      { question: 'Two candidates? Other recruiters send me ten.', answer: 'They do — and you read all ten. Two is what’s left after 100+ sourced, a coding assessment on your stack, a live pair-programming session with a senior engineer, and a CTO sign-off. Anyone who didn’t survive that isn’t a candidate, they’re a CV. If neither of the two is right, we go again at no extra cost — the fee is for the hire, not the shortlist.' },
      { question: 'What if they quit, or it doesn’t work out?', answer: 'You get a replacement search at no additional fee inside the guarantee window. It is in the contract, not just on this page.' },
      { question: 'What if they accept and then take a counteroffer?', answer: 'We run the counteroffer conversation with them before it happens, and we keep the second finalist warm until the start date.' },
      { question: 'How is this different from the recruiters emailing me every week?', answer: 'They are paid only on placement, so they send volume. We are paid to run one committed search, and a senior engineer interviews every candidate before you see a name.' },
      { question: 'Who actually does the technical interview?', answer: 'A senior engineer, named in the report, with their notes attached.' },
      { question: 'How do you know they’re not using AI in the interview?', answer: 'Because it is a live pair-programming session on a real problem, and the follow-up questions are about why they made a choice.' },
      { question: 'Will you approach them again later?', answer: 'No. Anyone we place is off-limits to us permanently, in writing.' },
      { question: 'What does it cost?', answer: '25% of first-year base salary. $3,000 to start the search, credited in full against the fee.' },
      { question: 'How long does it take?', answer: 'Scoping takes 45 minutes. Most searches produce two vetted profiles within a few weeks.' },
      { question: 'Do you do this in the UK?', answer: 'Yes — permanent recruitment in the UK is available alongside US direct hire.' },
    ],
  },

  closing: {
    heading: 'Two engineers. One hire.',
    emphasis: 'Both interviewed by engineers.',
    body: 'Tell us the role. A senior engineer will scope it with you before we search.',
    fineprint: '$3,000 to start, credited to the fee · 6-month replacement guarantee',
  },

  footer: {
    left: '© 2026 CloudEmployee. Direct hire — United States.',
    right: 'Also available: permanent recruitment in the UK',
  },

  modal: {
    title: 'Start a search',
    intro: 'Tell us the role. A senior engineer will scope it with you before we search.',
    sentTitle: 'Thanks — we’ll be in touch',
    sentChecks: [
      'A senior engineer reads the brief today',
      '45-minute scoping call before we search',
      '$3,000 to start, credited in full to the fee',
    ],
  },
};
