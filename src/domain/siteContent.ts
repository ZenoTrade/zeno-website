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
    trackRecordNote: string;
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
      { label: 'Pricing', href: '#pricing' },
      { label: 'Reliability', href: '#reliability' },
      { label: 'Gold outlook', href: '#gold-outlook' },
      { label: 'Technology', href: '#technology' },
      { label: 'Contact', href: '#contact' }
    ],
    hero: {
      eyebrow: 'Trader-originated. Disciplined. Reliable.',
      title: 'Reliable Quant Infrastructure.',
      subline: 'Prop-firm rule enforcement and signal copying for MetaTrader 5 - standalone or connected.',
      primaryAction: 'Explore Products',
      secondaryAction: 'Request Access'
    },
    productModules: [
      {
        id: 'signals',
        step: '1',
        title: 'Signal Intake',
        shortTitle: 'Signals',
        description: 'Reads the Telegram channels you follow, in any format.',
        icon: 'network'
      },
      {
        id: 'scoring',
        step: '2',
        title: 'Signal Checks',
        shortTitle: 'Checks',
        description: 'Drops anything without a stop, a target or a clear side.',
        icon: 'target'
      },
      {
        id: 'risk',
        step: '3',
        title: 'Zeno Guard',
        shortTitle: 'Guard',
        description: 'Enforces daily loss, drawdown and per-trade risk limits.',
        icon: 'shield'
      },
      {
        id: 'execution',
        step: '4',
        title: 'Execution Layer',
        shortTitle: 'Execution',
        description: 'Places and manages orders on your own MT5 accounts.',
        icon: 'bolt'
      }
    ],
    reliability: {
      eyebrow: 'Reliability you can verify',
      title: 'Measured in public.',
      description: 'Every signal and its result is logged with a timestamp. No performance numbers until they can be checked.',
      trackRecordNote:
        'The public track record opens once 30 days of trades are logged. Results will be published trade by trade, wins and losses alike.',
      metrics: [
        { label: 'Signals published with results', value: 'Every one', icon: 'chart' },
        { label: 'Risk limits per account', value: 'Your rules', icon: 'shield' },
        { label: 'Track record access', value: 'Public', icon: 'clock' }
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
      copyright: 'Copyright 2026 Zeno Trading. All rights reserved.',
      groups: [
        {
          title: 'Products',
          links: [
            { label: 'Signal Intake', href: '#products' },
            { label: 'Signal Checks', href: '#products' },
            { label: 'Zeno Guard', href: '#products' },
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
        { label: 'Privacy Policy', href: '#privacy' },
        { label: 'Terms of Service', href: '#terms' },
        { label: 'Risk Disclosure', href: '#risk' }
      ]
    }
  };
}
