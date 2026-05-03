import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from './App';

describe('App', () => {
  it('renders the redesigned Zeno landing page and toggles theme', async () => {
    const user = userEvent.setup();
    const storage = new Map<string, string>();
    const localStorageMock = {
      getItem: (key: string) => storage.get(key) ?? null,
      setItem: (key: string, value: string) => {
        storage.set(key, value);
      }
    };

    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      value: localStorageMock
    });

    render(<App />);

    expect(
      screen.getByRole('heading', {
        name: 'Reliable Quant Infrastructure.'
      })
    ).toBeInTheDocument();

    expect(screen.getByRole('navigation', { name: 'Primary navigation' })).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: 'Zeno home' })[0]).toHaveAttribute('href', '#top');
    expect(screen.getByRole('link', { name: /Explore Products/ })).toHaveAttribute('href', '#products');
    expect(screen.getAllByRole('link', { name: /Request Access/ })[0]).toHaveAttribute('href', '#contact');

    expect(
      screen.getByText('Signals, scoring, risk, and execution - standalone or fully connected.')
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Modular Zeno product architecture')).toBeInTheDocument();
    expect(screen.getByText('Use independently')).toBeInTheDocument();
    expect(screen.getByText('Or connect the full stack')).toBeInTheDocument();
    expect(document.documentElement).toHaveAttribute('data-theme', 'light');

    await user.click(screen.getByRole('button', { name: 'Switch to dark mode' }));

    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
    expect(localStorageMock.getItem('zeno-theme')).toBe('dark');
    expect(screen.getByRole('button', { name: 'Switch to light mode' })).toBeInTheDocument();

    expect(screen.getAllByText('Trader Signals').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Scoring Engine').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Risk Controls').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Execution Layer').length).toBeGreaterThan(0);
    expect(screen.queryByText('Standalone or integrated')).not.toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        name: 'Proven. Measured. Consistent.'
      })
    ).toBeInTheDocument();
    expect(screen.getByText('1.72')).toBeInTheDocument();
    expect(screen.getByText('-6.1%')).toBeInTheDocument();
    expect(screen.getByText('99.6%')).toBeInTheDocument();

    expect(screen.getByText('Disciplined Process')).toBeInTheDocument();
    expect(screen.getByText('Modular Design')).toBeInTheDocument();
    expect(screen.getByText('Internal Validation')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Build with Zeno.' })).toBeInTheDocument();
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
    expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument();
    expect(screen.getByLabelText('X')).toBeInTheDocument();
    expect(screen.getByLabelText('GitHub')).toBeInTheDocument();
  });
});
