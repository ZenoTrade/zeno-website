import { render, screen } from '@testing-library/react';
import { App } from './App';

describe('App', () => {
  it('renders a sharper professional landing flow', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', {
        name: 'Signal in. Execution out.'
      })
    ).toBeInTheDocument();

    expect(screen.getByRole('navigation', { name: 'Primary navigation' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Company overview' })).toHaveAttribute('href', '#company-intro');
    expect(screen.getByRole('link', { name: 'See the platform' })).toHaveAttribute('href', '#platform');
    expect(screen.getByRole('link', { name: 'How we operate' })).toHaveAttribute('href', '#standards');

    expect(
      screen.getByRole('heading', {
        name: 'Three layers. One disciplined system.'
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        name: 'Trust is built through operating discipline.'
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        name: 'Strengthen the core. Then expand.'
      })
    ).toBeInTheDocument();

    expect(screen.getByText('Built for disciplined trading teams.')).toBeInTheDocument();
    expect(screen.getByText('Measured growth')).toBeInTheDocument();
    expect(screen.getByText('Execution map')).toBeInTheDocument();
    expect(screen.getByText('Signal collection')).toBeInTheDocument();
    expect(screen.getByText('Observable decisions')).toBeInTheDocument();
    expect(screen.getByText('Present a credible company story')).toBeInTheDocument();

    const lazyImages = screen.getAllByRole('img').filter((image) => image.getAttribute('loading') === 'lazy');
    expect(lazyImages.length).toBeGreaterThan(0);
    expect(lazyImages.filter((image) => image.getAttribute('src')?.includes('visuals/')).length).toBeGreaterThan(0);
    expect(lazyImages.filter((image) => image.getAttribute('width') === '1200' && image.getAttribute('height') === '780').length).toBeGreaterThan(0);
  });
});
