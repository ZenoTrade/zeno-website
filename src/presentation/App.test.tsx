import { render, screen } from '@testing-library/react';
import { App } from './App';

describe('App', () => {
  it('renders the first-version positioning copy', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', {
        name: 'Systematic trading infrastructure, presented clearly.'
      })
    ).toBeInTheDocument();

    expect(screen.getByText('Why this first version exists')).toBeInTheDocument();
    expect(screen.getByText('Operational discipline')).toBeInTheDocument();
  });
});
