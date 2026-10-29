export type BillingPeriod = 'monthly' | 'yearly';

export interface PricingPlan {
  family: 'prop' | 'copier' | 'signals' | 'bundle' | 'riskguard';
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
    family: 'prop',
    name: 'Guard + Copier',
    tagline: 'For prop traders: pass the challenge, keep the account.',
    features: [
      'Everything in Zeno Guard and Zeno Copier',
      'Copy one master account to your prop accounts',
      'Guard on every account, each with its own limits',
      'Up to 3 MT5 accounts'
    ],
    prices: {
      monthly: { planId: 'prop-monthly', usd: 59 },
      yearly: { planId: 'prop-yearly', usd: 490 }
    },
    featured: true
  },
  {
    family: 'riskguard',
    name: 'Zeno Guard',
    tagline: 'Hard limits for prop-firm rules.',
    features: [
      'Closes everything before the daily loss or max drawdown limit',
      'Blocks trades whose stop could break a rule',
      'Static or trailing drawdown, your firm\'s reset time',
      'Works with manual trading and with the Copier'
    ],
    prices: {
      monthly: { planId: 'riskguard-monthly', usd: 29 },
      yearly: { planId: 'riskguard-yearly', usd: 249 }
    }
  },
  {
    family: 'copier',
    name: 'Zeno Copier',
    tagline: 'Execute any signal channel on your own MT5.',
    features: [
      'Runs on your PC or VPS, next to your MT5',
      'Reads free-form signals, not only one format',
      'Per-target risk split and auto break-even',
      '1 MT5 account per license'
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
    }
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

export interface OrderStatus {
  status: 'new' | 'settled' | 'expired' | 'invalid';
  plan_id: string;
  license_key: string;
  expires_at: string;
  telegram_link: string;
}

export function readOrderFromUrl(search: string): { orderId: string; token: string } | null {
  const params = new URLSearchParams(search);
  const orderId = params.get('order');
  const token = params.get('t');
  return orderId && token ? { orderId, token } : null;
}

export async function fetchOrder(
  config: CheckoutConfig,
  orderId: string,
  token: string,
  fetchImpl: typeof fetch = fetch
): Promise<OrderStatus> {
  const response = await fetchImpl(
    `${config.apiUrl}/v1/orders/${encodeURIComponent(orderId)}?t=${encodeURIComponent(token)}`
  );
  if (!response.ok) {
    throw new Error('Order not found');
  }
  return (await response.json()) as OrderStatus;
}
