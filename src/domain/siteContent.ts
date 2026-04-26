export interface HeroContent {
  eyebrow: string;
  title: string;
  description: string;
  primaryAction: string;
  secondaryAction: string;
  stats: Array<{ label: string; value: string }>;
}

export interface SectionItem {
  title: string;
  description: string;
}

export interface SiteSection {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  items: SectionItem[];
}

export interface CtaContent {
  title: string;
  description: string;
  primaryAction: string;
}

export interface FooterContent {
  tagline: string;
  links: string[];
}

export interface SiteContent {
  companyName: string;
  hero: HeroContent;
  sections: SiteSection[];
  cta: CtaContent;
  footer: FooterContent;
}

export function createLandingContent(): SiteContent {
  return {
    companyName: 'Zeno',
    hero: {
      eyebrow: 'Quant systems, introduced properly',
      title: 'A modern front door for Zeno’s trading stack.',
      description:
        'Zeno is building systematic trading infrastructure with a disciplined path from internal edge to future productized offerings. This first website should explain the company clearly, build trust, and leave room for the commercial surface that comes next.',
      primaryAction: 'See what Zeno does',
      secondaryAction: 'Future products',
      stats: [
        { label: 'Current focus', value: 'Introduce the company clearly' },
        { label: 'Operating style', value: 'Systematic, controlled, testable' },
        { label: 'Next phase', value: 'Product and sales surfaces' }
      ]
    },
    sections: [
      {
        id: 'problem-value',
        eyebrow: 'Why this site exists',
        title: 'The current website undersells the seriousness of the work.',
        description:
          'A text-only placeholder does not communicate the quality of the system, the thinking behind it, or the roadmap ahead. The public surface needs to feel intentional and credible.',
        items: [
          {
            title: 'Clarity for partners',
            description: 'Explain what Zeno is building without forcing visitors to infer the business from fragments.'
          },
          {
            title: 'Trust through structure',
            description: 'Show that the company operates with design discipline, not improvised messaging.'
          },
          {
            title: 'Room to grow',
            description: 'Keep the foundation modular so future product pages and conversion paths can plug in cleanly.'
          }
        ]
      },
      {
        id: 'what-zeno-does',
        eyebrow: 'What Zeno does',
        title: 'Zeno turns market research and execution discipline into an evolving platform.',
        description:
          'The website should present the company as a systems builder: collecting signals, shaping decisions, and executing through controlled infrastructure rather than ad-hoc workflows.',
        items: [
          {
            title: 'Signal intake',
            description: 'Capture and normalize market inputs from approved sources into something the system can reason about.'
          },
          {
            title: 'Decision support',
            description: 'Make the reasoning legible with explicit models, reviewable criteria, and a path to stronger domain boundaries.'
          },
          {
            title: 'Execution discipline',
            description: 'Ship with controls, repeatability, and the expectation that public trust is earned through operations.'
          }
        ]
      },
      {
        id: 'credibility',
        eyebrow: 'Why trust Zeno',
        title: 'The company should feel measured, technical, and durable.',
        description:
          'Credibility is not a slogan. It comes from showing deliberate architecture, careful iteration, and a clear progression from internal use to external product readiness.',
        items: [
          {
            title: 'Built with process',
            description: 'Gitflow, review, CI, and test-first slices are part of the product story because they shape the outcome.'
          },
          {
            title: 'Modular by default',
            description: 'Reusable sections and separated content models make the site easier to extend without visual drift.'
          },
          {
            title: 'Prepared for commercialization',
            description: 'Today the site introduces Zeno. Tomorrow it should support products, proof points, and conversion.'
          }
        ]
      },
      {
        id: 'future-products',
        eyebrow: 'What comes next',
        title: 'This homepage is phase one of a broader product surface.',
        description:
          'The near-term goal is company introduction. The next iterations should add dedicated product narratives, credibility assets, and clear calls to action for serious prospects.',
        items: [
          {
            title: 'Product pages',
            description: 'Dedicated surfaces for offerings when Zeno is ready to sell them externally.'
          },
          {
            title: 'Proof and case studies',
            description: 'Evidence-oriented content that helps visitors understand both capability and restraint.'
          },
          {
            title: 'Lead capture',
            description: 'Clean conversion paths once the business decides how it wants prospects to engage.'
          }
        ]
      }
    ],
    cta: {
      title: 'Start with a credible public face, then expand deliberately.',
      description:
        'This version establishes a trustworthy structure for Zeno now and a scalable content system for future products later.',
      primaryAction: 'Review the homepage direction'
    },
    footer: {
      tagline: 'Zeno — systematic trading infrastructure with a long-term product horizon.',
      links: ['Company', 'Approach', 'Future products']
    }
  };
}
