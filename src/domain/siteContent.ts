export interface HeroContent {
  eyebrow: string;
  title: string;
  subline: string;
  description: string;
  primaryAction: string;
  secondaryAction: string;
  stats: Array<{ label: string; value: string }>;
  trustPoints: string[];
}

export interface SectionItem {
  title: string;
  description: string;
}

export interface VisualAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface FeatureSection {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  items: SectionItem[];
}

export interface StandardsSection {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  items: SectionItem[];
  visual: VisualAsset;
}

export interface RolloutSection {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  checkpoints: string[];
  visual: VisualAsset;
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
  platform: FeatureSection;
  standards: StandardsSection;
  rollout: RolloutSection;
  cta: CtaContent;
  footer: FooterContent;
}

export function createLandingContent(): SiteContent {
  return {
    companyName: 'Zeno',
    hero: {
      eyebrow: 'Trading infrastructure',
      title: 'Signal in. Execution out.',
      subline: 'Built for disciplined trading teams.',
      description:
        'Zeno is building the infrastructure behind cleaner signal intake, stronger decision quality, and controlled multi-platform execution.',
      primaryAction: 'See the platform',
      secondaryAction: 'How we operate',
      stats: [
        { label: 'Core flow', value: 'Collect → Score → Execute' },
        { label: 'Coverage', value: 'Broker and crypto execution' },
        { label: 'Priority', value: 'Reliability before scale' }
      ],
      trustPoints: ['Structured architecture', 'Risk-aware execution', 'Measured growth']
    },
    platform: {
      id: 'platform',
      eyebrow: 'Platform',
      title: 'Three layers. One disciplined system.',
      description:
        'The platform is split into clear responsibilities so signal intake, decision logic, and execution can improve without creating one fragile workflow.',
      items: [
        {
          title: 'Signal collection',
          description: 'Bring approved sources into one cleaner operating flow.'
        },
        {
          title: 'Recommendation quality',
          description: 'Score signals and improve decision clarity before action.'
        },
        {
          title: 'Execution control',
          description: 'Route approved actions through controlled broker and crypto adapters.'
        }
      ]
    },
    standards: {
      id: 'standards',
      eyebrow: 'Standards',
      title: 'Trust is built through operating discipline.',
      description:
        'Zeno is being shaped to behave like infrastructure: observable decisions, controlled rollout, and systems judged by quality instead of noise.',
      items: [
        {
          title: 'Observable decisions',
          description: 'Signals, scoring, and execution paths should be reviewable.'
        },
        {
          title: 'Execution safeguards',
          description: 'Dry runs, adapters, and logs matter as much as strategy logic.'
        },
        {
          title: 'Commercial restraint',
          description: 'Expansion should follow proof, not pressure.'
        }
      ],
      visual: {
        src: 'visuals/credibility.svg',
        alt: 'Abstract market credibility illustration with measured growth and trust markers',
        width: 1200,
        height: 780
      }
    },
    rollout: {
      id: 'company',
      eyebrow: 'Company',
      title: 'Strengthen the core. Then expand.',
      description:
        'The near-term goal is clear: present Zeno well, prove the operating model, and expand the surface only when the foundation is ready.',
      checkpoints: [
        'Present a credible company story',
        'Stabilize the collection-to-execution loop',
        'Expand product surfaces when the foundation is ready'
      ],
      visual: {
        src: 'visuals/company-focus.svg',
        alt: 'Illustration of staged company growth built on a structured foundation',
        width: 1200,
        height: 780
      }
    },
    cta: {
      title: 'A company landing page should be clear, sharp, and credible.',
      description:
        'This version cuts the noise and focuses on the parts that build trust fastest.',
      primaryAction: 'Back to top'
    },
    footer: {
      tagline: 'Zeno — signal intelligence and execution infrastructure for disciplined growth.',
      links: ['Platform', 'Standards', 'Company']
    }
  };
}
