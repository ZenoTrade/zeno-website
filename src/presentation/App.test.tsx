import { render, screen } from '@testing-library/react';
import { App } from './App';

describe('App', () => {
  it('renders the simplified modular Zeno landing page', () => {
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

    expect(screen.getByText('Signals, scoring, risk, and execution - standalone or fully connected.')).toBeInTheDocument();
    expect(screen.getByLabelText('Modular Zeno product architecture')).toBeInTheDocument();
    expect(screen.getByText('Use independently')).toBeInTheDocument();
    expect(screen.getByText('Or connect the full stack')).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        name: 'Use one module or the full stack.'
      })
    ).toBeInTheDocument();

    expect(screen.getAllByText('Trader Signals').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Scoring Engine').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Risk Controls').length).toBeGreaterThan(0);
    expect(screen.getByText('Execution Layer')).toBeInTheDocument();
    expect(screen.getAllByText('Standalone or integrated').length).toBe(4);

    expect(
      screen.getByRole('heading', {
        name: 'Standalone first. Connected when needed.'
      })
    ).toBeInTheDocument();

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
  });
});
