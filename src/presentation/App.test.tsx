import { render, screen } from '@testing-library/react';
import { App } from './App';

describe('App', () => {
  it('renders the modern homepage sections and calls to action', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', {
        name: 'Zeno builds disciplined trading systems for signal-driven markets.'
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('link', {
        name: 'Explore the platform'
      })
    ).toHaveAttribute('href', '#what-zeno-does');

    expect(
      screen.getByRole('heading', {
        name: 'A three-layer system for turning fragmented signals into disciplined execution.'
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        name: 'The company is being built to look more like infrastructure than signal hype.'
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        name: 'A credible trading company needs both technical depth and operational restraint.'
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        name: 'The near-term mission is simple: make the core loop reliable and make the company legible.'
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        name: 'A serious company introduction should feel calm, clear, and technically credible.'
      })
    ).toBeInTheDocument();

    expect(screen.getByText('Zeno — signal intelligence and execution infrastructure built for disciplined growth.')).toBeInTheDocument();
    expect(screen.getByText('Execution map')).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Primary navigation' })).toBeInTheDocument();
  });
});
