import type { Product, Step, TrustPoint } from '../../domain/siteContent';
import { pricingPlans } from '../../domain/pricing';
import { BrandMark, Icon } from './Icons';

export const bundlePrice = pricingPlans.find((p) => p.family === 'prop')?.prices.monthly.usd ?? 59;

export function Brand({ name }: { name: string }) {
  return (
    <a href="#top" className="brand" aria-label="Zeno home">
      <BrandMark />
      <span>{name}</span>
    </a>
  );
}

export function ProductPanel({ product }: { product: Product }) {
  return (
    <article className={`product-panel product-panel--${product.id}`}>
      <span className="icon-tile">
        <Icon name={product.icon} />
      </span>
      <p className="product-panel__kicker">{product.kicker}</p>
      <h3>{product.name}</h3>
      <p className="product-panel__summary">{product.summary}</p>
      <ul className="check-list">
        {product.points.map((point) => (
          <li key={point}>
            <Icon name="check" />
            {point}
          </li>
        ))}
      </ul>
    </article>
  );
}

export function TrustItem({ point }: { point: TrustPoint }) {
  return (
    <li className="trust-item">
      <Icon name={point.icon} />
      <span>
        <strong>{point.label}</strong>
        <span>{point.detail}</span>
      </span>
    </li>
  );
}

export function StepItem({ step, index }: { step: Step; index: number }) {
  return (
    <li className="step">
      <span className="step__index" aria-hidden="true">
        {index + 1}
      </span>
      <div>
        <h3>{step.title}</h3>
        <p>{step.description}</p>
      </div>
    </li>
  );
}
