import { useEffect, useRef, useState, type FormEvent } from 'react';
import {
  getCheckoutConfig,
  paymentMethods,
  pricingPlans,
  startCheckout,
  telegramBuyLink,
  type BillingPeriod,
  type PricingPlan
} from '../../domain/pricing';
import { Icon } from './Icons';

const config = getCheckoutConfig();
const MAIN_FAMILIES: PricingPlan['family'][] = ['prop', 'riskguard', 'copier'];
const mainPlans = pricingPlans.filter((p) => MAIN_FAMILIES.includes(p.family));
const signalPlans = pricingPlans.filter((p) => !MAIN_FAMILIES.includes(p.family));

const per = (period: BillingPeriod) => (period === 'monthly' ? 'month' : 'year');

export const trialLink = config.botUsername ? `https://t.me/${config.botUsername}?start=trial` : null;

function BillingToggle({ period, onChange }: { period: BillingPeriod; onChange: (p: BillingPeriod) => void }) {
  return (
    <div className="segmented" role="group" aria-label="Billing period">
      {(['monthly', 'yearly'] as const).map((p) => (
        <button
          key={p}
          type="button"
          aria-pressed={period === p}
          className={period === p ? 'is-active' : ''}
          onClick={() => onChange(p)}
        >
          {p === 'monthly' ? 'Monthly' : 'Yearly'}
          {p === 'yearly' ? <span className="segmented__note">2 months free</span> : null}
        </button>
      ))}
    </div>
  );
}

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
      <div className="plan-card__top">
        <h3>{plan.name}</h3>
        {plan.featured ? <span className="plan-card__badge">Most popular</span> : null}
      </div>
      <p className="plan-card__tagline">{plan.tagline}</p>
      <p className="plan-card__price">
        <strong>${price.usd}</strong>
        <span>/{per(period)}</span>
      </p>
      <button
        type="button"
        className={`button ${plan.featured ? 'button--primary' : 'button--secondary'} button--block`}
        onClick={() => onBuy(plan)}
        disabled={plan.comingSoon}
      >
        {plan.comingSoon ? 'Coming soon' : `Buy ${plan.name}`}
      </button>
      <ul className="check-list">
        {plan.features.map((feature) => (
          <li key={feature}>
            <Icon name="check" />
            {feature}
          </li>
        ))}
      </ul>
    </article>
  );
}

function CheckoutDialog({
  plan,
  period,
  variant,
  onClose
}: {
  plan: PricingPlan;
  period: BillingPeriod;
  variant: 'modal' | 'sheet';
  onClose: () => void;
}) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  const tgLink = telegramBuyLink(config);
  const price = plan.prices[period];

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    panelRef.current?.querySelector<HTMLElement>('a, input, button')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeRef.current();
    };
    document.addEventListener('keydown', onKey);
    document.body.classList.add('has-dialog');
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.classList.remove('has-dialog');
      previous?.focus?.();
    };
  }, []);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      window.location.assign(await startCheckout(config, price.planId, email));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Checkout failed.');
      setBusy(false);
    }
  }

  return (
    <div className={`dialog-backdrop dialog-backdrop--${variant}`} onClick={onClose}>
      <div
        ref={panelRef}
        className={`dialog dialog--${variant}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-title"
        onClick={(e) => e.stopPropagation()}
      >
        {variant === 'sheet' ? <span className="dialog__grabber" aria-hidden="true" /> : null}
        <div className="dialog__head">
          <h3 id="checkout-title">Checkout</h3>
          <button type="button" className="icon-button" aria-label="Close checkout" onClick={onClose}>
            <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <form className="checkout" onSubmit={submit} aria-label="Checkout">
          <div className="checkout__summary">
            <span>{plan.name}</span>
            <strong>
              ${price.usd}/{per(period)}
            </strong>
          </div>
          {tgLink ? (
            <a className="button button--primary button--block" href={tgLink}>
              <Icon name="telegram" /> Buy in Telegram (recommended)
            </a>
          ) : null}
          <label className="field">
            <span>{tgLink ? 'Or get your key by email' : 'Email for your license key'}</span>
            <input
              type="email"
              required
              autoComplete="email"
              inputMode="email"
              value={email}
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <button
            type="submit"
            className={`button ${tgLink ? 'button--secondary' : 'button--primary'} button--block`}
            disabled={busy}
          >
            {busy ? 'Opening checkout…' : 'Pay with crypto'}
          </button>
          {error ? (
            <p className="checkout__error" role="alert">
              {error}
            </p>
          ) : null}
          <p className="checkout__note">
            {paymentMethods.join(', ')}. No ID, no card, no account.
          </p>
        </form>
      </div>
    </div>
  );
}

function PricingIntro() {
  return (
    <p className="section-lead">
      Pay with {paymentMethods.join(', ')}. No ID, no card, no account. Your license key arrives by
      Telegram or email as soon as the payment confirms.
    </p>
  );
}

const RISK_NOTE =
  'Trading leveraged products carries a high risk of loss. Zeno sells software and general trading information, not financial advice or account management. Past results do not guarantee future results.';

export function PricingDesktop() {
  const [period, setPeriod] = useState<BillingPeriod>('monthly');
  const [selected, setSelected] = useState<PricingPlan | null>(null);

  return (
    <section id="pricing" className="d-section d-pricing" aria-labelledby="pricing-title">
      <div className="d-section__head d-section__head--split">
        <div>
          <p className="eyebrow">Pricing</p>
          <h2 id="pricing-title">Simple plans. Paid in crypto.</h2>
          <PricingIntro />
        </div>
        <div className="d-pricing__controls">
          <BillingToggle period={period} onChange={setPeriod} />
          {trialLink ? (
            <a className="text-link" href={trialLink}>
              Or try Guard and Copier free for 7 days <Icon name="arrow" />
            </a>
          ) : null}
        </div>
      </div>

      <div className="d-plan-grid">
        {mainPlans.map((plan) => (
          <PlanCard key={plan.family} plan={plan} period={period} onBuy={setSelected} />
        ))}
      </div>

      <div className="d-signal-plans" aria-label="Signal plans">
        <div>
          <h3>Want our signals too?</h3>
          <p>Zeno's own gold and FX channel. Every signal goes into the public track record.</p>
        </div>
        {signalPlans.map((plan) => (
          <div key={plan.family} className="d-signal-plans__item">
            <span>
              <strong>{plan.name}</strong> ${plan.prices[period].usd}/{per(period)}
            </span>
            <button type="button" className="button button--secondary button--small" onClick={() => setSelected(plan)}>
              Buy {plan.name}
            </button>
          </div>
        ))}
      </div>

      <p className="fine-print">{RISK_NOTE}</p>

      {selected ? (
        <CheckoutDialog plan={selected} period={period} variant="modal" onClose={() => setSelected(null)} />
      ) : null}
    </section>
  );
}

export function PricingMobile() {
  const [period, setPeriod] = useState<BillingPeriod>('monthly');
  const [planFamily, setPlanFamily] = useState<PricingPlan['family']>('prop');
  const [checkout, setCheckout] = useState<PricingPlan | null>(null);
  const plan = pricingPlans.find((p) => p.family === planFamily) ?? pricingPlans[0];

  return (
    <section id="pricing" className="m-section m-pricing" aria-labelledby="pricing-title">
      <p className="eyebrow">Pricing</p>
      <h2 id="pricing-title">Simple plans. Paid in crypto.</h2>
      <p className="section-lead">No ID, no card. Key by Telegram or email.</p>

      <BillingToggle period={period} onChange={setPeriod} />

      <div className="m-chip-scroll" role="radiogroup" aria-label="Plan">
        {pricingPlans.map((p) => (
          <button
            key={p.family}
            type="button"
            role="radio"
            aria-checked={p.family === planFamily}
            className={`chip${p.family === planFamily ? ' is-active' : ''}`}
            onClick={() => setPlanFamily(p.family)}
          >
            {p.name}
          </button>
        ))}
      </div>

      <PlanCard plan={plan} period={period} onBuy={setCheckout} />

      {trialLink ? (
        <a className="button button--ghost button--block" href={trialLink}>
          <Icon name="telegram" /> Start 7-day free trial
        </a>
      ) : null}

      <p className="fine-print">{RISK_NOTE}</p>

      {checkout ? (
        <CheckoutDialog plan={checkout} period={period} variant="sheet" onClose={() => setCheckout(null)} />
      ) : null}
    </section>
  );
}
