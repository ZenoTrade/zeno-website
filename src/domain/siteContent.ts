export type IconName =
  | 'shield'
  | 'copy'
  | 'telegram'
  | 'bolt'
  | 'lock'
  | 'coin'
  | 'chart'
  | 'clock'
  | 'home'
  | 'grid'
  | 'tag'
  | 'help'
  | 'check'
  | 'arrow';

export interface NavLink {
  label: string;
  href: string;
  icon: IconName;
}

export interface Product {
  id: 'guard' | 'copier';
  name: string;
  kicker: string;
  summary: string;
  points: string[];
  icon: IconName;
}

export interface Step {
  title: string;
  description: string;
  icon: IconName;
}

export interface TrustPoint {
  label: string;
  detail: string;
  icon: IconName;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface SiteContent {
  companyName: string;
  contactEmail: string;
  nav: NavLink[];
  hero: {
    eyebrow: string;
    title: string;
    mobileTitle: string;
    subline: string;
    mobileSubline: string;
    primaryAction: string;
    secondaryAction: string;
  };
  trust: TrustPoint[];
  products: Product[];
  steps: Step[];
  proof: {
    eyebrow: string;
    title: string;
    description: string;
    trackRecordNote: string;
  };
  faq: FaqItem[];
  cta: {
    title: string;
    description: string;
    primaryAction: string;
  };
  footer: {
    tagline: string;
    copyright: string;
    product: FooterLink[];
    policies: FooterLink[];
  };
}

export function createLandingContent(): SiteContent {
  return {
    companyName: 'Zeno',
    contactEmail: 'hello@zenotrade.com',
    nav: [
      { label: 'Home', href: '#top', icon: 'home' },
      { label: 'Products', href: '#products', icon: 'grid' },
      { label: 'How it works', href: '#how', icon: 'bolt' },
      { label: 'Pricing', href: '#pricing', icon: 'tag' },
      { label: 'FAQ', href: '#faq', icon: 'help' }
    ],
    hero: {
      eyebrow: 'For prop-firm traders on MetaTrader 5',
      title: 'Pass the challenge. Keep the account.',
      mobileTitle: 'Trade your plan. Keep your account.',
      subline:
        'Zeno Guard stops the trade that would break your firm\'s rules before it reaches the market. Zeno Copier runs the Telegram signals you already follow on your own MT5, inside those limits.',
      mobileSubline: 'Hard prop-firm limits and Telegram signal copying for your own MT5.',
      primaryAction: 'See plans',
      secondaryAction: 'How it works'
    },
    trust: [
      { label: 'No KYC', detail: 'No ID, no card, no account', icon: 'lock' },
      { label: 'Crypto checkout', detail: 'BTC, Lightning, USDT, XMR', icon: 'coin' },
      { label: 'Runs on your PC', detail: 'Your broker login stays local', icon: 'shield' },
      { label: 'Key in minutes', detail: 'By Telegram or email', icon: 'clock' }
    ],
    products: [
      {
        id: 'guard',
        name: 'Zeno Guard',
        kicker: 'Rule enforcement',
        summary: 'Your firm\'s limits, enforced on every order.',
        points: [
          'Closes everything before the daily loss or max drawdown limit',
          'Blocks a trade whose stop could break a rule, and tells you the size that fits',
          'Static or trailing drawdown, with your firm\'s reset time',
          'Works with manual trading and with the Copier'
        ],
        icon: 'shield'
      },
      {
        id: 'copier',
        name: 'Zeno Copier',
        kicker: 'Signal copying',
        summary: 'The Telegram channels you follow, executed on your MT5.',
        points: [
          'Reads free-form signals, not only one format',
          'Drops signals without a stop, a target or a clear side',
          'Per-target risk split and automatic break-even',
          'Copies one master account to your prop accounts'
        ],
        icon: 'copy'
      }
    ],
    steps: [
      {
        title: 'Pay in crypto',
        description: 'Pick a plan and pay from any wallet. Your license key arrives by Telegram or email.',
        icon: 'coin'
      },
      {
        title: 'Connect MT5',
        description: 'Install Zeno next to MetaTrader 5 on your PC or VPS and enter your firm\'s rules.',
        icon: 'bolt'
      },
      {
        title: 'Trade inside the lines',
        description: 'Copy your channels or trade by hand. Guard checks every order first.',
        icon: 'shield'
      }
    ],
    proof: {
      eyebrow: 'Reliability you can verify',
      title: 'Measured in public.',
      description:
        'Every signal and its result is logged with a timestamp. We publish no performance numbers until they can be checked.',
      trackRecordNote:
        'The public track record opens once 30 days of trades are logged. Results will be published trade by trade, wins and losses alike.'
    },
    faq: [
      {
        question: 'Do I need to verify my identity?',
        answer:
          'No. You pay with crypto through our own BTCPay Server. We never ask for ID, a card or a customer account. An email or a Telegram chat is enough to receive your key.'
      },
      {
        question: 'Which platforms does Zeno work with?',
        answer:
          'MetaTrader 5 on Windows, on your own PC or a VPS. Zeno runs next to your terminal, so it works with any broker or prop firm that gives you an MT5 account.'
      },
      {
        question: 'Does Zeno hold my funds or my broker password?',
        answer:
          'Never. Zeno runs on your machine. Your MT5 login is stored encrypted on that machine only, and your money stays with your broker.'
      },
      {
        question: 'Which prop-firm rules can Guard enforce?',
        answer:
          'Daily loss, maximum drawdown (static or trailing) and risk per trade, with your firm\'s own reset time. You enter the numbers from your firm\'s rulebook.'
      },
      {
        question: 'Can I try it first?',
        answer:
          'Yes. Send /trial to the Zeno bot on Telegram for 7 free days of Guard and Copier. If the software cannot run on your setup, ask for a refund within 7 days of purchase.'
      },
      {
        question: 'Is this financial advice?',
        answer:
          'No. Zeno sells software and general trading information. You decide what runs on your account, and trading leveraged products can lose you money.'
      }
    ],
    cta: {
      title: 'Your next challenge, with a safety net.',
      description: 'Start with a free week, or pay in crypto and get your key in minutes.',
      primaryAction: 'Choose a plan'
    },
    footer: {
      tagline: 'Software for disciplined prop-firm trading.',
      copyright: 'Copyright 2026 Zeno Trading. All rights reserved.',
      product: [
        { label: 'Zeno Guard', href: '#products' },
        { label: 'Zeno Copier', href: '#products' },
        { label: 'Pricing', href: '#pricing' },
        { label: 'Track record', href: '#proof' },
        { label: 'Gold outlook', href: '#gold-outlook' }
      ],
      policies: [
        { label: 'Privacy Policy', href: '#privacy' },
        { label: 'Terms of Service', href: '#terms' },
        { label: 'Risk Disclosure', href: '#risk' }
      ]
    }
  };
}
