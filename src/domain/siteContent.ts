export type IconName = 'network' | 'target' | 'shield' | 'bolt' | 'blocks' | 'chart' | 'clock';

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
  icon: Extract<IconName, 'network' | 'target' | 'shield' | 'bolt'>;
}

export interface ReliabilityMetric {
  label: string;
  value: string;
  icon: Extract<IconName, 'chart' | 'shield' | 'clock'>;
}

export interface WhyPillar {
  title: string;
  description: string;
  icon: Extract<IconName, 'target' | 'blocks' | 'shield'>;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterGroup {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  label: 'LinkedIn' | 'X' | 'GitHub';
  href: string;
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
    copyright: string;
    groups: FooterGroup[];
    socials: SocialLink[];
    policies: FooterLink[];
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
        step: '1',
        title: 'Trader Signals',
        shortTitle: 'Signals',
        description: "Ideas from Zeno's trader network.",
        icon: 'network'
      },
      {
        id: 'scoring',
        step: '2',
        title: 'Scoring Engine',
        shortTitle: 'Scoring Engine',
        description: 'Ranks ideas by confidence and context.',
        icon: 'target'
      },
      {
        id: 'risk',
        step: '3',
        title: 'Risk Controls',
        shortTitle: 'Risk Controls',
        description: 'Applies sizing, exposure, and drawdown rules.',
        icon: 'shield'
      },
      {
        id: 'execution',
        step: '4',
        title: 'Execution Layer',
        shortTitle: 'Execution',
        description: 'Routes orders across integrated platforms.',
        icon: 'bolt'
      }
    ],
    reliability: {
      eyebrow: 'Reliability you can count on',
      title: 'Proven. Measured. Consistent.',
      description: 'Internal performance since inception.',
      metrics: [
        { label: 'Sharpe Ratio', value: '1.72', icon: 'chart' },
        { label: 'Max Drawdown', value: '-6.1%', icon: 'shield' },
        { label: 'System Uptime', value: '99.6%', icon: 'clock' }
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
      copyright: 'Copyright 2025 Zeno Trading. All rights reserved.',
      groups: [
        {
          title: 'Products',
          links: [
            { label: 'Trader Signals', href: '#products' },
            { label: 'Scoring Engine', href: '#products' },
            { label: 'Risk Controls', href: '#products' },
            { label: 'Execution Layer', href: '#products' }
          ]
        },
        {
          title: 'Process',
          links: [
            { label: 'How It Works', href: '#process' },
            { label: 'Our Approach', href: '#process' }
          ]
        },
        {
          title: 'Reliability',
          links: [
            { label: 'Track Record', href: '#reliability' },
            { label: 'System Uptime', href: '#reliability' },
            { label: 'Risk Management', href: '#reliability' }
          ]
        },
        {
          title: 'Technology',
          links: [
            { label: 'Architecture', href: '#technology' },
            { label: 'Security', href: '#technology' },
            { label: 'Data & Infrastructure', href: '#technology' }
          ]
        },
        {
          title: 'Company',
          links: [
            { label: 'About Us', href: '#top' },
            { label: 'Careers', href: '#top' },
            { label: 'News', href: '#top' }
          ]
        },
        {
          title: 'Contact',
          links: [
            { label: 'Get In Touch', href: '#contact' },
            { label: 'Partnerships', href: '#contact' }
          ]
        }
      ],
      socials: [
        { label: 'LinkedIn', href: '#' },
        { label: 'X', href: '#' },
        { label: 'GitHub', href: '#' }
      ],
      policies: [
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' }
      ]
    }
  };
}
