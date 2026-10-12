import { useEffect, useState } from 'react';
import { fanGeometry, outlookUrls, type GoldOutlook as Outlook } from '../../domain/goldOutlook';
import { getCheckoutConfig } from '../../domain/pricing';

const usd = (v: number) => `$${Math.round(v).toLocaleString('en-US')}`;

async function loadOutlook(urls: string[]): Promise<Outlook | null> {
  for (const url of urls) {
    try {
      const r = await fetch(url);
      if (r.ok) return (await r.json()) as Outlook;
    } catch {
      // try the next source
    }
  }
  return null;
}

export function GoldOutlook({ initial = null }: { initial?: Outlook | null }) {
  const [outlook, setOutlook] = useState<Outlook | null>(initial);

  useEffect(() => {
    if (initial) return;
    let cancelled = false;
    loadOutlook(outlookUrls(getCheckoutConfig().apiUrl, import.meta.env.BASE_URL)).then((o) => {
      if (!cancelled) setOutlook(o);
    });
    return () => {
      cancelled = true;
    };
  }, [initial]);

  if (!outlook) return null;
  const g = fanGeometry(outlook);

  return (
    <section id="gold-outlook" className="outlook" aria-labelledby="outlook-title">
      <p className="eyebrow">Free research</p>
      <h2 id="outlook-title">{outlook.title}</h2>
      <p className="outlook__label">{outlook.label}</p>
      <p>
        {outlook.disclaimer} {outlook.volatility.note}
      </p>

      <figure className="outlook__chart">
        <svg
          viewBox={`0 0 ${g.width} ${g.height}`}
          role="img"
          aria-label={`Range outlook for the monthly average gold price from ${outlook.origin}`}
        >
          {g.yTicks.map((t) => (
            <g key={t.label}>
              <line className="outlook__grid" x1={56} x2={g.width - 12} y1={t.y} y2={t.y} />
              <text className="outlook__tick" x={50} y={t.y + 4} textAnchor="end">
                {t.label}
              </text>
            </g>
          ))}
          {g.xTicks.map((t, i) => (
            <text
              key={t.label}
              className="outlook__tick"
              x={t.x}
              y={g.height - 8}
              textAnchor={i === 0 ? 'start' : i === g.xTicks.length - 1 ? 'end' : 'middle'}
            >
              {t.label}
            </text>
          ))}
          <polygon className="outlook__band95" points={g.band95} />
          <polygon className="outlook__band80" points={g.band80} />
          <polyline className="outlook__history" points={g.history} />
          <polyline className="outlook__centre" points={g.centre} />
        </svg>
        <figcaption>
          Monthly averages to {outlook.origin} ({usd(outlook.origin_price)}/oz), then the centre line
          with 80% (darker) and 95% (lighter) ranges.
        </figcaption>
      </figure>

      <table className="outlook__table">
        <caption className="sr-only">Outlook ranges by month</caption>
        <thead>
          <tr>
            <th scope="col">Month (average)</th>
            <th scope="col">80% range</th>
            <th scope="col">95% range</th>
          </tr>
        </thead>
        <tbody>
          {outlook.horizons.map((h) => (
            <tr key={h.h}>
              <th scope="row">{h.target_month}</th>
              <td>
                {usd(h.p10)} – {usd(h.p90)}
              </td>
              <td>
                {usd(h.p2_5)} – {usd(h.p97_5)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="outlook__meta">
        Target: {outlook.target}. Data as of {outlook.data_fetched_at_utc.slice(0, 10)}; refreshed monthly.
      </p>
    </section>
  );
}
