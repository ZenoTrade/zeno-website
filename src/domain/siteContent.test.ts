import { createLandingContent } from './siteContent';

describe('createLandingContent', () => {
  it('defines the redesigned homepage content structure', () => {
    const content = createLandingContent();

    expect(content.companyName).toBe('Zeno');
    expect(content.nav).toHaveLength(5);
    expect(content.hero.title).toBe('Reliable Quant Infrastructure.');
    expect(content.hero.subline).toBe(
      'Signals, scoring, risk, and execution - standalone or fully connected.'
    );
    expect(content.productModules).toHaveLength(4);
    expect(content.productModules[0]).toMatchObject({
      id: 'signals',
      step: '1',
      title: 'Trader Signals'
    });
    expect(content.reliability.metrics).toEqual([
      { label: 'Sharpe Ratio', value: '1.72', icon: 'chart' },
      { label: 'Max Drawdown', value: '-6.1%', icon: 'shield' },
      { label: 'System Uptime', value: '99.6%', icon: 'clock' }
    ]);
    expect(content.why.pillars).toHaveLength(3);
    expect(content.cta.title).toBe('Build with Zeno.');
    expect(content.footer.groups).toHaveLength(6);
    expect(content.footer.socials.map((item) => item.label)).toEqual(['LinkedIn', 'X', 'GitHub']);
    expect(content.footer.policies.map((item) => item.label)).toEqual([
      'Privacy Policy',
      'Terms of Service'
    ]);
  });
});
