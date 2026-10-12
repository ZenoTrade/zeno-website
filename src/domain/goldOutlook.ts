export interface OutlookHorizon {
  target_month: string;
  h: number;
  centre: number;
  p10: number;
  p90: number;
  p2_5: number;
  p97_5: number;
}

export interface GoldOutlook {
  title: string;
  label: string;
  target: string;
  origin: string;
  origin_price: number;
  data_fetched_at_utc: string;
  disclaimer: string;
  volatility: { vol_monthly: number; vs_median: number; percentile: number; note: string };
  horizons: OutlookHorizon[];
  history: { month: string; price: number }[];
}

// Served by zeno-platform (gold-outlook service, refreshed monthly); the copy in
// public/ is the fallback until the API is live.
export function outlookUrls(apiUrl: string, baseUrl: string): string[] {
  const urls = apiUrl ? [`${apiUrl}/outlook/gold.json`] : [];
  return [...urls, `${baseUrl}gold-outlook.json`];
}

export function monthsBetween(from: string, to: string): number {
  const [fy, fm] = from.split('-').map(Number);
  const [ty, tm] = to.split('-').map(Number);
  return (ty - fy) * 12 + (tm - fm);
}

export interface FanGeometry {
  width: number;
  height: number;
  history: string;
  centre: string;
  band80: string;
  band95: string;
  yTicks: { y: number; label: string }[];
  xTicks: { x: number; label: string }[];
  originX: number;
}

export function fanGeometry(o: GoldOutlook, width = 640, height = 260, pad = { l: 56, r: 12, t: 12, b: 28 }): FanGeometry {
  const first = o.history[0].month;
  const lastH = o.horizons[o.horizons.length - 1];
  const span = monthsBetween(first, lastH.target_month);
  const values = [...o.history.map((p) => p.price), ...o.horizons.flatMap((h) => [h.p2_5, h.p97_5])];
  const lo = Math.min(...values) * 0.95;
  const hi = Math.max(...values) * 1.02;
  const x = (month: string) => pad.l + (monthsBetween(first, month) / span) * (width - pad.l - pad.r);
  const y = (v: number) => pad.t + (1 - (v - lo) / (hi - lo)) * (height - pad.t - pad.b);
  const pt = (m: string, v: number) => `${x(m).toFixed(1)},${y(v).toFixed(1)}`;

  const origin = { month: o.origin, price: o.origin_price };
  const band = (low: keyof OutlookHorizon, high: keyof OutlookHorizon) => {
    const upper = o.horizons.map((h) => pt(h.target_month, h[high] as number));
    const lower = o.horizons.map((h) => pt(h.target_month, h[low] as number)).reverse();
    return [pt(origin.month, origin.price), ...upper, ...lower].join(' ');
  };

  const step = Math.pow(10, Math.floor(Math.log10((hi - lo) / 4)));
  const tickStep = [1, 2, 5, 10].map((m) => m * step).find((s) => (hi - lo) / s <= 6) ?? step * 10;
  const yTicks = [];
  for (let v = Math.ceil(lo / tickStep) * tickStep; v <= hi; v += tickStep) {
    yTicks.push({ y: y(v), label: `$${v.toLocaleString('en-US')}` });
  }
  const xTicks = [first, o.origin, lastH.target_month].map((m) => ({ x: x(m), label: m }));

  return {
    width,
    height,
    history: o.history.map((p) => pt(p.month, p.price)).join(' '),
    centre: [pt(origin.month, origin.price), ...o.horizons.map((h) => pt(h.target_month, h.centre))].join(' '),
    band80: band('p10', 'p90'),
    band95: band('p2_5', 'p97_5'),
    yTicks,
    xTicks,
    originX: x(o.origin)
  };
}
