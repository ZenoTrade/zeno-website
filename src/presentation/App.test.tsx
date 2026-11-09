import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from './App';

function mockStorage() {
  const storage = new Map<string, string>();
  const mock = {
    getItem: (key: string) => storage.get(key) ?? null,
    setItem: (key: string, value: string) => {
      storage.set(key, value);
    }
  };
  Object.defineProperty(window, 'localStorage', { configurable: true, value: mock });
  return mock;
}

function mockViewport(mobile: boolean) {
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    value: (query: string) => ({
      matches: query.includes('max-width') ? mobile : false,
      media: query,
      addEventListener: () => undefined,
      removeEventListener: () => undefined
    })
  });
}

afterEach(() => {
  // @ts-expect-error reset between tests
  delete window.matchMedia;
});

describe('App on desktop', () => {
  it('shows the top navigation, the slider demo and a modal checkout', async () => {
    const user = userEvent.setup();
    const storage = mockStorage();
    mockViewport(false);
    render(<App />);

    expect(screen.getByRole('heading', { level: 1, name: 'Pass the challenge. Keep the account.' })).toBeInTheDocument();
    const nav = screen.getByRole('navigation', { name: 'Primary navigation' });
    expect(within(nav).getByRole('link', { name: 'Pricing' })).toHaveAttribute('href', '#pricing');
    expect(screen.getByRole('slider', { name: 'Position size in lots' })).toBeInTheDocument();
    expect(screen.getByText(/Blocked\./)).toBeInTheDocument();

    expect(document.documentElement).toHaveAttribute('data-theme', 'light');
    await user.click(screen.getByRole('button', { name: 'Switch to dark mode' }));
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
    expect(storage.getItem('zeno-theme')).toBe('dark');

    expect(screen.getAllByRole('heading', { name: 'Zeno Guard', level: 3 }).length).toBeGreaterThan(0);
    expect(screen.getByRole('heading', { name: 'Simple plans. Paid in crypto.' })).toBeInTheDocument();
    // FAQ answers are always visible on desktop.
    expect(screen.getByText('Do I need to verify my identity?').tagName).toBe('DT');

    await user.click(screen.getByRole('button', { name: 'Buy Copier + Signals' }));
    const dialog = screen.getByRole('dialog', { name: 'Checkout' });
    expect(dialog).toHaveClass('dialog--modal');
    expect(screen.getByRole('form', { name: 'Checkout' })).toHaveTextContent('$99/month');
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /Yearly/ }));
    await user.click(screen.getByRole('button', { name: 'Buy Guard + Copier' }));
    expect(screen.getByRole('form', { name: 'Checkout' })).toHaveTextContent('$490/year');

    expect(screen.getByText(/public track record opens once 30 days/)).toBeInTheDocument();
    expect(screen.queryByText('99.6%')).not.toBeInTheDocument();
    expect(screen.getAllByText('Privacy Policy').length).toBeGreaterThan(0);
    expect(document.querySelector('.m-tabbar')).toBeNull();
  });
});

describe('App on mobile', () => {
  it('uses a bottom tab bar, tap-to-size demo, one plan at a time and a bottom sheet', async () => {
    const user = userEvent.setup();
    mockStorage();
    mockViewport(true);
    render(<App />);

    expect(screen.getByRole('heading', { level: 1, name: 'Trade your plan. Keep your account.' })).toBeInTheDocument();
    const tabs = screen.getByRole('navigation', { name: 'Primary navigation' });
    expect(tabs).toHaveClass('m-tabbar');
    expect(within(tabs).getAllByRole('link').map((a) => a.getAttribute('href'))).toEqual([
      '#top',
      '#products',
      '#pricing',
      '#faq'
    ]);

    expect(screen.queryByRole('slider')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: '0.80' }));
    expect(screen.getByText(/Allowed\./)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'Show Zeno Copier' })).toBeInTheDocument();

    // Only the chosen plan is shown.
    expect(screen.getAllByRole('button', { name: /^Buy / })).toHaveLength(1);
    await user.click(screen.getByRole('radio', { name: 'Copier + Signals' }));
    await user.click(screen.getByRole('button', { name: 'Buy Copier + Signals' }));
    expect(screen.getByRole('dialog', { name: 'Checkout' })).toHaveClass('dialog--sheet');
    expect(screen.getByRole('form', { name: 'Checkout' })).toHaveTextContent('$99/month');
    await user.click(screen.getByRole('button', { name: 'Close checkout' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    // FAQ collapses into tap-to-open rows.
    expect(screen.getByText('Do I need to verify my identity?').tagName).toBe('SUMMARY');
    expect(document.getElementById('risk')?.tagName).toBe('DETAILS');
  });
});
