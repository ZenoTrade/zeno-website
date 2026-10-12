import { render, screen } from '@testing-library/react';
import { ThankYou } from './ThankYou';

describe('ThankYou', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('renders nothing without an order in the URL', () => {
    const { container } = render(<ThankYou search="" />);
    expect(container).toBeEmptyDOMElement();
  });

  it('shows the license key once the order is settled', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          status: 'settled',
          plan_id: 'bundle-monthly',
          license_key: 'ZENO-abc.def',
          expires_at: '2026-11-12T00:00:00+00:00',
          telegram_link: 'https://t.me/ZenoBot?start=link_x_y'
        })
      })
    );
    render(<ThankYou search="?order=o1&t=tok" />);
    expect(await screen.findByText('ZENO-abc.def')).toBeInTheDocument();
    expect(screen.getByText(/active until 2026-11-12/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Connect Telegram/ })).toHaveAttribute(
      'href',
      'https://t.me/ZenoBot?start=link_x_y'
    );
  });
});
