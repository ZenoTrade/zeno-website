import { useEffect, useState, type ReactNode } from 'react';

const sections: { id: string; title: string; body: ReactNode }[] = [
  {
    id: 'risk',
    title: 'Risk disclosure',
    body: (
      <>
        <p>
          Trading forex, gold, CFDs and other leveraged products carries a high risk of losing
          money, including more than you deposit with some brokers. Most retail traders lose money.
        </p>
        <p>
          Zeno Signals are general information published to all subscribers alike. They are not
          personal advice and do not consider your finances or goals. Past results, including our
          public track record, do not guarantee future results. Only trade money you can afford to
          lose, and you alone decide what runs on your account.
        </p>
      </>
    )
  },
  {
    id: 'terms',
    title: 'Terms of service',
    body: (
      <ul>
        <li>You buy a license to use Zeno software and access Zeno Signals for the paid period.</li>
        <li>Zeno software runs on your own computer and your own trading account. Zeno never holds your funds or your broker password.</li>
        <li>One license covers the number of MT5 accounts in its plan. Do not share or resell keys.</li>
        <li>Licenses renew only when you pay a renewal invoice. Unpaid licenses stop working 3 days after expiry.</li>
        <li>If the software cannot run on your setup, ask for a refund within 7 days of purchase; we refund in the coin you paid with, minus network fees.</li>
        <li>Software is provided as is. Zeno is not liable for trading losses, broker or platform failures, or missed signals.</li>
        <li>You must follow your broker's and prop firm's terms and the laws where you live. Do not use Zeno where it is not permitted.</li>
      </ul>
    )
  },
  {
    id: 'privacy',
    title: 'Privacy',
    body: (
      <ul>
        <li>We collect only what delivery needs: your email or Telegram account, your orders, and which MT5 account numbers use your license.</li>
        <li>We never ask for ID documents, card details or broker passwords.</li>
        <li>Payments go through our own BTCPay Server. No third-party payment processor sees your order.</li>
        <li>We do not sell or share your data. Ask in the Zeno bot or by email to have your records deleted once your license ends.</li>
      </ul>
    )
  }
];

function useHash() {
  const [hash, setHash] = useState(() => (typeof window === 'undefined' ? '' : window.location.hash));
  useEffect(() => {
    const update = () => setHash(window.location.hash);
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, []);
  return hash.replace('#', '');
}

export function Legal({ variant = 'columns' }: { variant?: 'columns' | 'accordion' }) {
  const hash = useHash();

  if (variant === 'accordion') {
    return (
      <section id="legal" className="m-section m-legal" aria-labelledby="legal-title">
        <h2 id="legal-title" className="eyebrow">
          Legal
        </h2>
        {sections.map((s) => (
          <details key={s.id} id={s.id} className="accordion" open={hash === s.id || undefined}>
            <summary>{s.title}</summary>
            <div className="accordion__body">{s.body}</div>
          </details>
        ))}
      </section>
    );
  }

  return (
    <section id="legal" className="d-section d-legal" aria-labelledby="legal-title">
      <h2 id="legal-title" className="eyebrow">
        Legal
      </h2>
      <div className="d-legal__grid">
        {sections.map((s) => (
          <article key={s.id} id={s.id}>
            <h3>{s.title}</h3>
            {s.body}
          </article>
        ))}
      </div>
    </section>
  );
}
