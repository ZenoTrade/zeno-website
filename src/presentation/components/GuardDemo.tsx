import { useId, useState } from 'react';
import { checkTrade, guardExample, usd } from '../../domain/guardDemo';
import { Icon } from './Icons';

type Variant = 'slider' | 'chips';

const CHIP_LOTS = [0.5, 0.8, 1.2];

export function GuardDemo({ variant = 'slider' }: { variant?: Variant }) {
  const [lots, setLots] = useState(1.2);
  const sliderId = useId();
  const verdict = checkTrade(lots);
  const usedPct = Math.min(100, (guardExample.lossToday / guardExample.dailyLimit) * 100);
  const projectedPct = Math.min(100, (verdict.projectedLoss / guardExample.dailyLimit) * 100);

  return (
    <figure className={`guard-demo guard-demo--${variant}`} aria-label="Zeno Guard example">
      <div className="guard-demo__head">
        <span className="guard-demo__badge">
          <Icon name="shield" /> Guard
        </span>
        <span className="guard-demo__tag">Example account</span>
      </div>

      <div className="guard-demo__meter">
        <div className="guard-demo__meter-row">
          <span>Daily loss</span>
          <strong>
            {usd(guardExample.lossToday)} <span>of {usd(guardExample.dailyLimit)}</span>
          </strong>
        </div>
        <div className="guard-demo__bar" aria-hidden="true">
          <span className="guard-demo__bar-used" style={{ width: `${usedPct}%` }} />
          <span
            className={`guard-demo__bar-next${verdict.allowed ? '' : ' is-over'}`}
            style={{ left: `${usedPct}%`, width: `${Math.max(0, projectedPct - usedPct)}%` }}
          />
        </div>
      </div>

      <div className="guard-demo__ticket">
        <div className="guard-demo__ticket-row">
          <span>Buy {guardExample.symbol}</span>
          <strong>{lots.toFixed(2)} lots</strong>
        </div>
        {variant === 'slider' ? (
          <>
            <label className="sr-only" htmlFor={sliderId}>
              Position size in lots
            </label>
            <input
              id={sliderId}
              type="range"
              min={0.1}
              max={2}
              step={0.1}
              value={lots}
              onChange={(e) => setLots(Number(e.target.value))}
            />
          </>
        ) : (
          <div className="guard-demo__chips" role="group" aria-label="Position size">
            {CHIP_LOTS.map((value) => (
              <button
                key={value}
                type="button"
                aria-pressed={lots === value}
                onClick={() => setLots(value)}
              >
                {value.toFixed(2)}
              </button>
            ))}
          </div>
        )}
      </div>

      <figcaption
        className={`guard-demo__verdict ${verdict.allowed ? 'is-allowed' : 'is-blocked'}`}
        aria-live="polite"
      >
        <Icon name={verdict.allowed ? 'check' : 'lock'} />
        {verdict.allowed ? (
          <span>
            <strong>Allowed.</strong> Worst case {usd(verdict.projectedLoss)}, inside your limit.
          </span>
        ) : (
          <span>
            <strong>Blocked.</strong> The stop would take you to {usd(verdict.projectedLoss)}. Up to{' '}
            {verdict.maxLots.toFixed(2)} lots fits.
          </span>
        )}
      </figcaption>
    </figure>
  );
}
