export interface NavLink {
  label: string;
  href: string;
}

export interface HeroContent {
  eyebrow: string;
  title: string;
  subline: string;
  primaryAction: string;
  secondaryAction: string;
}

export interface ProductModule {
  id: string;
  step: string;
  title: string;
  shortTitle: string;
  description: string;
  note: string;
  icon: 'network' | 'target' | 'shield' | 'bolt';
}

export interface ReliabilityMetric {
  label: string;
  value: string;
}

export interface WhyPillar {
  title: string;
  description: string;
  icon: 'target' | 'blocks' | 'shield';
}

export interface FooterGroup {
  title: string;
  links: string[];
}

export interface SiteContent {
  companyName: string;
  nav: NavLink[];
  hero: HeroContent;
  productModules: ProductModule[];
  reliability: {
    eyebrow: string;
    title: string;
    description: string;
    metrics: ReliabilityMetric[];
  };
  why: {
    eyebrow: string;
    pillars: WhyPillar[];
  };
  cta: {
    title: string;
    description: string;
    primaryAction: string;
  };
  footer: {
    tagline: string;
    groups: FooterGroup[];
  };
}

export function createLandingContent(): SiteContent {
  return {
    companyName: 'Zeno',
    nav: [
      { label: 'Products', href: '#products' },
      { label: 'Process', href: '#process' },
      { label: 'Reliability', href: '#reliability' },
      { label: 'Technology', href: '#technology' },
      { label: 'Contact', href: '#contact' }
    ],
    hero: {
      eyebrow: 'Trader-originated. Disciplined. Reliable.',
      title: 'Reliable Quant Infrastructure.',
      subline: 'Signals, scoring, risk, and execution - standalone or fully connected.',
      primaryAction: 'Explore Products',
      secondaryAction: 'Request Access'
    },
    productModules: [
      {
        id: 'signals',
        step: '01',
        title: 'Trader Signals',
        shortTitle: 'Signals',
        description: 'Ideas from Zeno trader network.',
        note: 'Standalone or integrated',
        icon: 'network'
      },
      {
        id: 'scoring',
        step: '02',
        title: 'Scoring Engine',
        shortTitle: 'Scoring Engine',
        description: 'Ranks ideas by confidence and context.',
        note: 'Standalone or integrated',
        icon: 'target'
      },
      {
        id: 'risk',
        step: '03',
        title: 'Risk Controls',
        shortTitle: 'Risk Controls',
        description: 'Applies sizing, exposure, and drawdown rules.',
        note: 'Standalone or integrated',
        icon: 'shield'
      },
      {
        id: 'execution',
        step: '04',
        title: 'Execution Layer',
        shortTitle: 'Execution',
        description: 'Routes orders across integrated platforms.',
        note: 'Standalone or integrated',
        icon: 'bolt'
      }
    ],
    reliability: {
      eyebrow: 'Reliability you can count on',
      title: 'Proven. Measured. Consistent.',
      description: 'Internal performance since inception.',
      metrics: [
        { label: 'Sharpe Ratio', value: '1.72' },
        { label: 'Max Drawdown', value: '-6.1%' },
        { label: 'System Uptime', value: '99.6%' }
      ]
    },
    why: {
      eyebrow: 'Why Zeno',
      pillars: [
        {
          title: 'Disciplined Process',
          description: 'Systematic, repeatable, risk-aware.',
          icon: 'target'
        },
        {
          title: 'Modular Design',
          description: 'Use modules independently or connect the full stack.',
          icon: 'blocks'
        },
        {
          title: 'Internal Validation',
          description: 'Rigorously tested. Continuously improved.',
          icon: 'shield'
        }
      ]
    },
    cta: {
      title: 'Build with Zeno.',
      description: 'Reliable quant infrastructure. Standalone or fully connected.',
      primaryAction: 'Request Access'
    },
    footer: {
      tagline: 'Quant infrastructure for disciplined execution.',
      groups: [
        { title: 'Products', links: ['Trader Signals', 'Scoring Engine', 'Risk Controls', 'Execution Layer'] },
        { title: 'Process', links: ['How It Works', 'Our Approach'] },
        { title: 'Reliability', links: ['Track Record', 'System Uptime', 'Risk Management'] },
        { title: 'Technology', links: ['Architecture', 'Security', 'Data & Infrastructure'] },
        { title: 'Company', links: ['About Us', 'Careers', 'News'] },
        { title: 'Contact', links: ['Get in Touch', 'Partnerships'] }
      ]
    }
  };
}
