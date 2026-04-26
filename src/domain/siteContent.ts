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
      eyebrow: 'Signal intelligence and execution infrastructure',
      title: 'Zeno is building disciplined trading infrastructure for modern markets.',
      subline: 'A clearer company introduction for a platform focused on signal quality, controlled execution, and long-term trust.',
      description:
        'We are building a focused trading infrastructure company around signal collection, recommendation quality, and multi-platform execution. The goal is simple: reliable systems, measured expansion, and a public posture that feels credible from the start.',
      primaryAction: 'See the platform',
      secondaryAction: 'How we operate',
      stats: [
        { label: 'Core flow', value: 'Collect → Score → Execute' },
        { label: 'Coverage', value: 'Broker and crypto execution paths' },
        { label: 'Priority', value: 'Reliability before scale' }
      ],
      trustPoints: ['Structured architecture', 'Risk-aware execution', 'Measured company growth']
    },
    platform: {
      id: 'platform',
      eyebrow: 'Platform',
      title: 'One platform, three clear responsibilities.',
      description:
        'The platform is intentionally split into distinct layers so collection, decision-making, and execution can improve without becoming one fragile system.',
      items: [
        {
          title: 'Signal collection',
          description: 'Normalize inputs from approved channels, websites, and future integrations into a cleaner operating flow.'
        },
        {
          title: 'Recommendation quality',
          description: 'Score signal quality, improve clarity, and support more disciplined trade decisions.'
        },
        {
          title: 'Execution control',
          description: 'Route approved actions into broker and crypto venues through controlled, reviewable adapters.'
        }
      ]
    },
    standards: {
      id: 'standards',
      eyebrow: 'Standards',
      title: 'Trust comes from operating discipline, not marketing noise.',
      description:
        'Zeno is being shaped to look and behave like infrastructure: observable decisions, controlled rollout, and systems that can be evaluated on quality rather than promotion.',
      items: [
        {
          title: 'Observable decisions',
          description: 'Signals, scoring, and execution paths should be understandable and reviewable.'
        },
        {
          title: 'Execution safeguards',
          description: 'Dry-run capability, controlled adapters, and replayable logs matter as much as strategy logic.'
        },
        {
          title: 'Commercial restraint',
          description: 'The company should prove reliability internally before expanding its external surface.'
        }
      ],
      visual: {
        src: '/visuals/credibility.svg',
        alt: 'Abstract market credibility illustration with measured growth and trust markers',
        width: 1200,
        height: 780
      }
    },
    rollout: {
      id: 'company',
      eyebrow: 'Company',
      title: 'The rollout is deliberate: strengthen the operating core, then expand the surface area.',
      description:
        'The immediate goal is not to say everything. It is to present Zeno clearly, prove the operating model, and leave room for stronger product and partnership stories later.',
      checkpoints: [
        'Present a clear and credible company story',
        'Stabilize the core collection-to-execution loop',
        'Expand product surfaces only when the foundation deserves it'
      ],
      visual: {
        src: '/visuals/company-focus.svg',
        alt: 'Illustration of staged company growth built on a structured foundation',
        width: 1200,
        height: 780
      }
    },
    cta: {
      title: 'A professional landing page should explain the company quickly and leave a strong impression.',
      description:
        'This version is intentionally simpler: less repetition, less text, and a more standard company flow.',
      primaryAction: 'Back to top'
    },
    footer: {
      tagline: 'Zeno — signal intelligence and execution infrastructure built for disciplined growth.',
      links: ['Platform', 'Standards', 'Company']
    }
  };
}
