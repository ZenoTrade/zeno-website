import { render, screen } from '@testing-library/react';
import { App } from './App';

describe('App', () => {
  it('renders the modern homepage sections and calls to action', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', {
        name: 'A modern front door for Zeno’s trading stack.'
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('link', {
        name: 'See what Zeno does'
      })
    ).toHaveAttribute('href', '#what-zeno-does');

    expect(
      screen.getByRole('heading', {
        name: 'The current website undersells the seriousness of the work.'
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        name: 'Zeno turns market research and execution discipline into an evolving platform.'
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        name: 'The company should feel measured, technical, and durable.'
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        name: 'This homepage is phase one of a broader product surface.'
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        name: 'Start with a credible public face, then expand deliberately.'
      })
    ).toBeInTheDocument();

    expect(screen.getByText('Zeno — systematic trading infrastructure with a long-term product horizon.')).toBeInTheDocument();
  });
});
