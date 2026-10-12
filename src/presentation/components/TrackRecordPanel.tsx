import { useEffect, useState } from 'react';
import { isPublishable, type TrackRecordSummary } from '../../domain/pricing';

const pct = (v: number) => `${v > 0 ? '+' : ''}${v.toFixed(1)}%`;

export function TrackRecordPanel({ note, source = 'track-record.json' }: { note: string; source?: string }) {
  const [summary, setSummary] = useState<TrackRecordSummary | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`${import.meta.env.BASE_URL}${source}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!cancelled) setSummary(data?.summary ?? null);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [source]);

  if (!isPublishable(summary)) {
    return (
      <div className="performance-chart performance-chart--pending">
        <p className="eyebrow">Track record</p>
        <p>{note}</p>
      </div>
    );
  }

  const s = summary as TrackRecordSummary;
  return (
    <div className="performance-chart performance-chart--pending" aria-label="Public track record">
      <p className="eyebrow">Track record since {s.first_trade?.slice(0, 10)}</p>
      <dl className="track-record">
        <div>
          <dt>Trades</dt>
          <dd>{s.trades}</dd>
        </div>
        <div>
          <dt>Win rate</dt>
          <dd>{s.win_rate_pct.toFixed(1)}%</dd>
        </div>
        <div>
          <dt>Return</dt>
          <dd>{pct(s.total_return_pct)}</dd>
        </div>
        <div>
          <dt>Max drawdown</dt>
          <dd>{pct(s.max_drawdown_pct)}</dd>
        </div>
      </dl>
      <a href={`${import.meta.env.BASE_URL}${source}`}>Every trade (JSON)</a>
    </div>
  );
}
