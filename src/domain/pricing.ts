export type BillingPeriod = 'monthly' | 'yearly';

export interface PricingPlan {
  family: 'copier' | 'signals' | 'bundle' | 'riskguard';
  name: string;
  tagline: string;
  features: string[];
  prices: Record<BillingPeriod, { planId: string; usd: number }>;
  featured?: boolean;
  comingSoon?: boolean;
}

// Mirrors zeno-platform/license_server/zeno_license/plans.py.
export const pricingPlans: PricingPlan[] = [
  {
    family: 'copier',
    name: 'Zeno Copier',
    tagline: 'Execute any signal channel on your own MT5.',
    features: [
      'Runs on your PC or VPS, next to your MT5',
      'Per-target risk split and auto break-even',
      'Your risk per trade, your rules',
      '1 MT5 account (+$15/month per extra account)'
    ],
    prices: {
      monthly: { planId: 'copier-monthly', usd: 49 },
      yearly: { planId: 'copier-yearly', usd: 399 }
    }
  },
  {
    family: 'bundle',
    name: 'Copier + Signals',
    tagline: 'Our gold and FX signals, executed for you.',
    features: [
      'Everything in Zeno Copier',
      'Private Zeno Signals channel',
      'Signals delivered straight to the Copier',
      'Every signal published in the public track record'
    ],
    prices: {
      monthly: { planId: 'bundle-monthly', usd: 99 },
      yearly: { planId: 'bundle-yearly', usd: 899 }
    },
    featured: true
  },
  {
    family: 'signals',
    name: 'Zeno Signals',
    tagline: 'The signals channel on its own.',
    features: [
      'Private Telegram channel',
      'Entry, targets and stop on every signal',
      'Copier-ready format'
    ],
    prices: {
      monthly: { planId: 'signals-monthly', usd: 79 },
      yearly: { planId: 'signals-yearly', usd: 690 }
    }
  },
  {
    family: 'riskguard',
    name: 'Zeno Risk Guard',
    tagline: 'Hard limits for prop-firm challenges.',
    features: ['Daily loss and max exposure limits', 'Auto break-even', 'Works with any EA or manual trading'],
    prices: {
      monthly: { planId: 'riskguard-monthly', usd: 29 },
      yearly: { planId: 'riskguard-yearly', usd: 249 }
    },
    comingSoon: true
  }
];

export const paymentMethods = ['Bitcoin', 'Lightning', 'USDT', 'Monero'];

export interface CheckoutConfig {
  apiUrl: string;
  botUsername: string;
}

export function getCheckoutConfig(env: Record<string, string | undefined> = import.meta.env): CheckoutConfig {
  return {
    apiUrl: (env.VITE_LICENSE_API_URL ?? '').replace(/\/$/, ''),
    botUsername: env.VITE_TELEGRAM_BOT ?? ''
  };
}

export function telegramBuyLink(config: CheckoutConfig): string | null {
  return config.botUsername ? `https://t.me/${config.botUsername}?start=buy` : null;
}

export async function startCheckout(
  config: CheckoutConfig,
  planId: string,
  email: string,
  fetchImpl: typeof fetch = fetch
): Promise<string> {
  if (!config.apiUrl) {
    throw new Error('Checkout is not open yet.');
  }
  const response = await fetchImpl(`${config.apiUrl}/v1/checkout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ plan_id: planId, email })
  });
  if (!response.ok) {
    throw new Error('Could not start checkout. Please try again.');
  }
  const data = (await response.json()) as { checkout_url: string };
  return data.checkout_url;
}

export interface TrackRecordSummary {
  trades: number;
  win_rate_pct: number;
  profit_factor: number | null;
  total_return_pct: number;
  max_drawdown_pct: number;
  first_trade: string | null;
  last_trade: string | null;
}

export const MIN_TRACK_RECORD_DAYS = 30;

// Numbers are shown only once the record covers at least 30 days.
export function isPublishable(summary: TrackRecordSummary | null, now: Date = new Date()): boolean {
  if (!summary || !summary.first_trade || summary.trades === 0) {
    return false;
  }
  const days = (now.getTime() - new Date(summary.first_trade).getTime()) / 86_400_000;
  return days >= MIN_TRACK_RECORD_DAYS;
}
