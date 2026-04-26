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
      screen.getByRole('link', {
        name: 'Read our approach'
      })
    ).toHaveAttribute('href', '#how-zeno-operates');

    expect(
      screen.getByRole('heading', {
        name: 'Zeno is building a structured platform for signal intelligence and controlled trade execution.'
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        name: 'The operating model is intentionally closer to infrastructure than signal hype.'
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        name: 'A trusted trading company needs both technical depth and visible operational restraint.'
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        name: 'The near-term mission is to make the core loop reliable and the company presentation mature.'
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
    expect(screen.getByText('Designed for disciplined market participation, measured product growth, and trust built through system quality.')).toBeInTheDocument();
    expect(screen.getAllByRole('img')).not.toHaveLength(0);
    expect(screen.getAllByRole('img').filter((image) => image.getAttribute('loading') === 'lazy').length).toBeGreaterThan(0);
  });
});
