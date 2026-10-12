import { useEffect, useState } from 'react';
import { fetchOrder, getCheckoutConfig, readOrderFromUrl, type OrderStatus } from '../../domain/pricing';

const config = getCheckoutConfig();
const POLL_MS = 5000;

export function ThankYou({ search = window.location.search }: { search?: string }) {
  const ref = readOrderFromUrl(search);
  const [order, setOrder] = useState<OrderStatus | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!ref) return;
    let stop = false;
    let timer: ReturnType<typeof setTimeout>;
    const poll = async () => {
      try {
        const status = await fetchOrder(config, ref.orderId, ref.token);
        if (stop) return;
        setOrder(status);
        if (status.status !== 'settled' && status.status !== 'expired' && status.status !== 'invalid') {
          timer = setTimeout(poll, POLL_MS);
        }
      } catch {
        if (!stop) timer = setTimeout(poll, POLL_MS);
      }
    };
    poll();
    return () => {
      stop = true;
      clearTimeout(timer);
    };
  }, [ref?.orderId, ref?.token]);

  if (!ref) return null;

  return (
    <section id="thanks" className="checkout thanks" aria-labelledby="thanks-title">
      <h2 id="thanks-title">Thank you for your order.</h2>
      {!order || order.status === 'new' ? (
        <p>Waiting for your payment to confirm. This page updates by itself.</p>
      ) : null}
      {order && (order.status === 'expired' || order.status === 'invalid') ? (
        <p>This invoice {order.status === 'expired' ? 'expired before payment arrived' : 'was not paid in full'}. Pick a plan again below to get a new one.</p>
      ) : null}
      {order?.status === 'settled' ? (
        <div className="thanks__key">
          <p>
            Your license is active until {order.expires_at.slice(0, 10)}. Keep this key safe; we also
            emailed it to you.
          </p>
          <code>{order.license_key}</code>
          <button
            type="button"
            className="button button--primary"
            onClick={() => {
              navigator.clipboard?.writeText(order.license_key);
              setCopied(true);
            }}
          >
            {copied ? 'Copied' : 'Copy key'}
          </button>
          {order.telegram_link ? (
            <a className="button button--secondary" href={order.telegram_link}>
              Connect Telegram for reminders{order.plan_id.startsWith('copier') ? '' : ' and the signals channel'}
            </a>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
