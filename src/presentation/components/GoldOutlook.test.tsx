import { render, screen } from '@testing-library/react';
import outlook from '../../../public/gold-outlook.json';
import { fanGeometry, monthsBetween, outlookUrls, type GoldOutlook as Outlook } from '../../domain/goldOutlook';
import { GoldOutlook } from './GoldOutlook';

const o = outlook as Outlook;

describe('GoldOutlook', () => {
  it('labels the outlook as a range, not a signal, and shows the ranges', () => {
    render(<GoldOutlook initial={o} />);
    expect(screen.getByRole('heading', { name: 'Gold monthly-average outlook' })).toBeInTheDocument();
    expect(screen.getByText('A range forecast, not a trading signal')).toBeInTheDocument();
    expect(screen.getByText(/not a buy or sell signal and not investment advice/)).toBeInTheDocument();
    expect(screen.getByText(/not the live spot price/)).toBeInTheDocument();
    const last = o.horizons[o.horizons.length - 1];
    expect(screen.getByText(`$${last.p10.toLocaleString('en-US')} – $${last.p90.toLocaleString('en-US')}`)).toBeInTheDocument();
    // No price target: the centre value is not printed as a number.
    expect(screen.queryByText(new RegExp(`\\$${last.centre.toLocaleString('en-US')}`))).not.toBeInTheDocument();
  });

  it('builds chart geometry and source urls', () => {
    expect(monthsBetween('2026-09', '2027-09')).toBe(12);
    const g = fanGeometry(o);
    expect(g.band80.split(' ')).toHaveLength(1 + 2 * o.horizons.length);
    expect(g.history.split(' ')).toHaveLength(o.history.length);
    expect(outlookUrls('https://api.x', '/zeno-website/')).toEqual([
      'https://api.x/outlook/gold.json',
      '/zeno-website/gold-outlook.json'
    ]);
    expect(outlookUrls('', '/')).toEqual(['/gold-outlook.json']);
  });
});
