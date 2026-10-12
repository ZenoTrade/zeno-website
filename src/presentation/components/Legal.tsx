export function Legal() {
  return (
    <section id="legal" className="legal" aria-labelledby="legal-title">
      <p className="eyebrow">Legal</p>
      <h2 id="legal-title" className="sr-only">
        Terms, privacy and risk
      </h2>
      <div className="legal-grid">
        <article id="risk">
          <h3>Risk disclosure</h3>
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
        </article>
        <article id="terms">
          <h3>Terms of service</h3>
          <ul>
            <li>You buy a license to use Zeno software and access Zeno Signals for the paid period.</li>
            <li>The Zeno Copier runs on your own computer and your own trading account. Zeno never holds your funds or your broker password.</li>
            <li>One license covers the number of MT5 accounts in its plan. Do not share or resell keys.</li>
            <li>Licenses renew only when you pay a renewal invoice. Unpaid licenses stop working 3 days after expiry.</li>
            <li>If the Copier cannot run on your setup, ask for a refund within 7 days of purchase; we refund in the coin you paid with, minus network fees.</li>
            <li>Software is provided as is. Zeno is not liable for trading losses, broker or platform failures, or missed signals.</li>
            <li>You must follow your broker's terms and the laws where you live. Do not use Zeno where it is not permitted.</li>
          </ul>
        </article>
        <article id="privacy">
          <h3>Privacy</h3>
          <ul>
            <li>We collect only what delivery needs: your email or Telegram account, your orders, and which MT5 account numbers use your license.</li>
            <li>We never ask for ID documents, card details or broker passwords.</li>
            <li>Payments go through our own BTCPay Server. No third-party payment processor sees your order.</li>
            <li>We do not sell or share your data. Ask in the Zeno bot or by email to have your records deleted once your license ends.</li>
          </ul>
        </article>
      </div>
    </section>
  );
}
