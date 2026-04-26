import { render, screen } from '@testing-library/react';
import { App } from './App';

describe('App', () => {
  it('renders a simpler professional landing flow', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', {
        name: 'Zeno is building disciplined trading infrastructure for modern markets.'
      })
    ).toBeInTheDocument();

    expect(screen.getByRole('navigation', { name: 'Primary navigation' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Company overview' })).toHaveAttribute('href', '#company-intro');
    expect(screen.getByRole('link', { name: 'See the platform' })).toHaveAttribute('href', '#platform');
    expect(screen.getByRole('link', { name: 'How we operate' })).toHaveAttribute('href', '#standards');

    expect(
      screen.getByRole('heading', {
        name: 'One platform, three clear responsibilities.'
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        name: 'Trust comes from operating discipline, not marketing noise.'
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        name: 'The rollout is deliberate: strengthen the operating core, then expand the surface area.'
      })
    ).toBeInTheDocument();

    expect(screen.getByText('A clearer company introduction for a platform focused on signal quality, controlled execution, and long-term trust.')).toBeInTheDocument();
    expect(screen.getByText('Structured architecture')).toBeInTheDocument();
    expect(screen.getByText('Execution map')).toBeInTheDocument();
    expect(screen.getByText('Signal collection')).toBeInTheDocument();
    expect(screen.getByText('Observable decisions')).toBeInTheDocument();
    expect(screen.getByText('Present a clear and credible company story')).toBeInTheDocument();

    expect(screen.getAllByRole('img').filter((image) => image.getAttribute('loading') === 'lazy').length).toBeGreaterThan(0);
    expect(screen.getAllByRole('img').filter((image) => image.getAttribute('width') === '1200' && image.getAttribute('height') === '780').length).toBeGreaterThan(0);
  });
});
