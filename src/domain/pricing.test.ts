import { getCheckoutConfig, isPublishable, pricingPlans, startCheckout, telegramBuyLink } from './pricing';

const summary = {
  trades: 40,
  win_rate_pct: 55,
  profit_factor: 1.4,
  total_return_pct: 6.2,
  max_drawdown_pct: -3.1,
  first_trade: '2026-10-01T00:00:00+00:00',
  last_trade: '2026-11-05T00:00:00+00:00'
};

describe('pricing', () => {
  it('matches the license server plan ids and prices', () => {
    const ids = pricingPlans.flatMap((p) => [p.prices.monthly.planId, p.prices.yearly.planId]);
    expect(ids).toEqual([
      'copier-monthly', 'copier-yearly', 'bundle-monthly', 'bundle-yearly',
      'signals-monthly', 'signals-yearly', 'riskguard-monthly', 'riskguard-yearly'
    ]);
    expect(pricingPlans.find((p) => p.family === 'bundle')?.prices.monthly.usd).toBe(99);
  });

  it('starts a checkout and returns the BTCPay link', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ checkout_url: 'https://pay.example/i/1' })
    });
    const url = await startCheckout({ apiUrl: 'https://api.x', botUsername: '' }, 'bundle-monthly', 'a@b.co', fetchMock);
    expect(url).toBe('https://pay.example/i/1');
    expect(fetchMock).toHaveBeenCalledWith('https://api.x/v1/checkout', expect.objectContaining({ method: 'POST' }));
    await expect(startCheckout({ apiUrl: '', botUsername: '' }, 'x', 'a@b.co', fetchMock)).rejects.toThrow();
  });

  it('builds config and telegram link', () => {
    const config = getCheckoutConfig({ VITE_LICENSE_API_URL: 'https://api.x/', VITE_TELEGRAM_BOT: 'ZenoBot' });
    expect(config.apiUrl).toBe('https://api.x');
    expect(telegramBuyLink(config)).toBe('https://t.me/ZenoBot?start=buy');
    expect(telegramBuyLink({ apiUrl: '', botUsername: '' })).toBeNull();
  });

  it('publishes track record numbers only after 30 days', () => {
    expect(isPublishable(null)).toBe(false);
    expect(isPublishable(summary, new Date('2026-10-20'))).toBe(false);
    expect(isPublishable(summary, new Date('2026-11-01'))).toBe(true);
    expect(isPublishable({ ...summary, trades: 0 }, new Date('2026-12-01'))).toBe(false);
  });
});
