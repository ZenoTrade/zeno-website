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
      eyebrow: 'Signal intelligence and execution infrastructure',
      title: 'Zeno builds disciplined trading systems for signal-driven markets.',
      description:
        'We are developing a focused trading infrastructure company around three core capabilities: signal collection, confidence-aware recommendation, and controlled multi-platform execution. Our approach is systematic, risk-aware, and designed to mature from internal trading operations into trusted external products.',
      primaryAction: 'Explore the platform',
      secondaryAction: 'Read our approach',
      stats: [
        { label: 'Core model', value: 'Collect → Score → Execute' },
        { label: 'Markets', value: 'Broker platforms and crypto venues' },
        { label: 'Operating principle', value: 'Reliability before scale' }
      ]
    },
    sections: [
      {
        id: 'what-zeno-does',
        eyebrow: 'What Zeno does',
        title: 'A three-layer system for turning fragmented signals into disciplined execution.',
        description:
          'Zeno is being structured around clear product boundaries so that signal ingestion, recommendation logic, and execution can improve without collapsing into one brittle workflow.',
        items: [
          {
            title: 'Signal Collector',
            description: 'Ingest and normalize signals from approved sources including Telegram, Discord, websites, APIs, and future connectors.'
          },
          {
            title: 'Recommender',
            description: 'Evaluate signal quality, estimate confidence, and improve decision structure with clearer SL/TP guidance and transparent logic.'
          },
          {
            title: 'ZenoTrade',
            description: 'Execute approved signals through multiple trading platforms and APIs with a path to both traditional broker connectivity and crypto support.'
          }
        ]
      },
      {
        id: 'how-zeno-operates',
        eyebrow: 'How Zeno operates',
        title: 'The company is being built to look more like infrastructure than signal hype.',
        description:
          'Trust in trading systems is earned through operating discipline. Zeno is intentionally prioritizing structure, visibility, and risk controls before broad commercialization.',
        items: [
          {
            title: 'Controlled rollout',
            description: 'The system is intended to prove itself internally before supporting broader external usage.'
          },
          {
            title: 'Observable decisions',
            description: 'Signals, confidence, and execution paths should be reviewable rather than hidden behind message forwarding.'
          },
          {
            title: 'Execution safeguards',
            description: 'Platform adapters, dry-run support, and replayable logs matter as much as the trading logic itself.'
          }
        ]
      },
      {
        id: 'why-zeno',
        eyebrow: 'Why Zeno',
        title: 'A credible trading company needs both technical depth and operational restraint.',
        description:
          'The goal is not to impress with complexity. The goal is to build a reliable trading stack that can be trusted by serious users, partners, and future clients.',
        items: [
          {
            title: 'Measured product strategy',
            description: 'Zeno is separating collection, recommendation, and execution so each layer can evolve with less operational risk.'
          },
          {
            title: 'Trust through system design',
            description: 'Confidence scoring, execution controls, and structured logs create a stronger basis for trust than marketing claims.'
          },
          {
            title: 'Built for expansion',
            description: 'The same foundation can support internal trading today and future product, API, and partnership surfaces later.'
          }
        ]
      },
      {
        id: 'company-focus',
        eyebrow: 'Current focus',
        title: 'The near-term mission is simple: make the core loop reliable and make the company legible.',
        description:
          'Zeno is still early. The right public posture is a mature explanation of what the company is building, how it thinks about risk, and why the architecture is being shaped carefully from the start.',
        items: [
          {
            title: 'Company clarity',
            description: 'Present Zeno as a serious trading infrastructure company rather than a prototype or internal note.'
          },
          {
            title: 'Execution maturity',
            description: 'Prepare the platform to support broker and crypto execution with clear boundaries and controlled growth.'
          },
          {
            title: 'Future product surface',
            description: 'Leave room for product pages, proof points, and commercial paths once the operating model is stronger.'
          }
        ]
      }
    ],
    cta: {
      title: 'A serious company introduction should feel calm, clear, and technically credible.',
      description:
        'This homepage establishes a more mature public face for Zeno now while leaving a clean foundation for future products, proof points, and partnerships.',
      primaryAction: 'Back to top'
    },
    footer: {
      tagline: 'Zeno — signal intelligence and execution infrastructure built for disciplined growth.',
      links: ['Company', 'Platform', 'Approach']
    }
  };
}
