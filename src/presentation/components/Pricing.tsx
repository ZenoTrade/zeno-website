import { useState, type FormEvent } from 'react';
import {
  getCheckoutConfig,
  paymentMethods,
  pricingPlans,
  startCheckout,
  telegramBuyLink,
  type BillingPeriod,
  type PricingPlan
} from '../../domain/pricing';

const config = getCheckoutConfig();

function PlanCard({
  plan,
  period,
  onBuy
}: {
  plan: PricingPlan;
  period: BillingPeriod;
  onBuy: (plan: PricingPlan) => void;
}) {
  const price = plan.prices[period];
  return (
    <article className={`plan-card${plan.featured ? ' plan-card--featured' : ''}`}>
      {plan.featured ? <p className="plan-card__badge">Most popular</p> : null}
      <h3>{plan.name}</h3>
      <p className="plan-card__tagline">{plan.tagline}</p>
      <p className="plan-card__price">
        <strong>${price.usd}</strong>
        <span>/{period === 'monthly' ? 'month' : 'year'}</span>
      </p>
      <ul>
        {plan.features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      <button
        type="button"
        className={`button ${plan.featured ? 'button--primary' : 'button--secondary'}`}
        onClick={() => onBuy(plan)}
        disabled={plan.comingSoon}
      >
        {plan.comingSoon ? 'Coming soon' : `Buy ${plan.name}`}
      </button>
    </article>
  );
}

export function Pricing() {
  const [period, setPeriod] = useState<BillingPeriod>('monthly');
  const [selected, setSelected] = useState<PricingPlan | null>(null);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const tgLink = telegramBuyLink(config);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!selected) return;
    setBusy(true);
    setError('');
    try {
      window.location.assign(await startCheckout(config, selected.prices[period].planId, email));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Checkout failed.');
      setBusy(false);
    }
  }

  return (
    <section id="pricing" className="pricing" aria-labelledby="pricing-title">
      <div className="pricing__header">
        <p className="eyebrow">Pricing</p>
        <h2 id="pricing-title">Simple plans. Paid in crypto.</h2>
        <p>
          Pay with {paymentMethods.join(', ')}. No ID, no card, no account. Your license key arrives
          by Telegram or email as soon as the payment confirms.
        </p>
        <div className="pricing__toggle" role="group" aria-label="Billing period">
          {(['monthly', 'yearly'] as const).map((p) => (
            <button
              key={p}
              type="button"
              aria-pressed={period === p}
              className={period === p ? 'is-active' : ''}
              onClick={() => setPeriod(p)}
            >
              {p === 'monthly' ? 'Monthly' : 'Yearly (2 months free)'}
            </button>
          ))}
        </div>
      </div>

      <div className="plan-grid">
        {pricingPlans.map((plan) => (
          <PlanCard key={plan.family} plan={plan} period={period} onBuy={setSelected} />
        ))}
      </div>

      {selected ? (
        <form className="checkout" onSubmit={submit} aria-label="Checkout">
          <p>
            <strong>{selected.name}</strong>, ${selected.prices[period].usd}/
            {period === 'monthly' ? 'month' : 'year'}
          </p>
          {tgLink ? (
            <a className="button button--primary" href={tgLink}>
              Buy in Telegram (recommended)
            </a>
          ) : null}
          <label>
            Or get your key by email
            <input
              type="email"
              required
              value={email}
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <button type="submit" className="button button--secondary" disabled={busy}>
            {busy ? 'Opening checkout…' : 'Pay with crypto'}
          </button>
          {error ? <p role="alert">{error}</p> : null}
        </form>
      ) : null}

      <p className="pricing__risk">
        Trading leveraged products carries a high risk of loss. Zeno sells software and general
        trading information, not financial advice or account management. Past results do not
        guarantee future results.
      </p>
    </section>
  );
}
