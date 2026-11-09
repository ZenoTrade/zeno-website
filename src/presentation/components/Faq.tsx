import type { FaqItem } from '../../domain/siteContent';

export function FaqDesktop({ items }: { items: FaqItem[] }) {
  return (
    <section id="faq" className="d-section d-faq" aria-labelledby="faq-title">
      <div className="d-faq__intro">
        <p className="eyebrow">FAQ</p>
        <h2 id="faq-title">Straight answers.</h2>
        <p className="section-lead">Still unsure? Write to us and a person replies, usually the same day.</p>
        <a className="text-link" href="mailto:hello@zenotrade.com">
          hello@zenotrade.com
        </a>
      </div>
      <dl className="d-faq__list">
        {items.map((item) => (
          <div key={item.question}>
            <dt>{item.question}</dt>
            <dd>{item.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function FaqMobile({ items }: { items: FaqItem[] }) {
  return (
    <section id="faq" className="m-section m-faq" aria-labelledby="faq-title">
      <p className="eyebrow">FAQ</p>
      <h2 id="faq-title">Straight answers.</h2>
      <div className="m-faq__list">
        {items.map((item) => (
          <details key={item.question} className="accordion">
            <summary>{item.question}</summary>
            <p className="accordion__body">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
