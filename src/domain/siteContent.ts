export type Audience = 'partners' | 'future-customers';

export interface ValuePillar {
  title: string;
  description: string;
}

export interface SiteContent {
  companyName: string;
  headline: string;
  subheadline: string;
  audiences: Audience[];
  valuePillars: ValuePillar[];
}

export function createLandingContent(): SiteContent {
  return {
    companyName: 'Zeno',
    headline: 'Systematic trading infrastructure, presented clearly.',
    subheadline:
      'We are building the public face of Zeno now so partners can understand the team, the system, and the path toward future products.',
    audiences: ['partners', 'future-customers'],
    valuePillars: [
      {
        title: 'Clarity first',
        description: 'Explain who we are, what we build, and how the platform is evolving.'
      },
      {
        title: 'Architecture that can grow',
        description: 'Keep the site modular so product and sales surfaces can be added without rework.'
      },
      {
        title: 'Operational discipline',
        description: 'Ship through gitflow, tests, CI, and review instead of ad-hoc edits.'
      }
    ]
  };
}
