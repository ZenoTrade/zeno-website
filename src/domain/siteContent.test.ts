import { createLandingContent } from './siteContent';

describe('createLandingContent', () => {
  it('defines the redesigned homepage content structure', () => {
    const content = createLandingContent();

    expect(content.companyName).toBe('Zeno');
    expect(content.nav).toHaveLength(6);
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
    expect(content.reliability.metrics).toHaveLength(3);
    // Unverified performance figures stay off the site until the public track record backs them.
    expect(JSON.stringify(content.reliability)).not.toMatch(/sharpe|drawdown|uptime|\d+(\.\d+)?%/i);
    expect(content.why.pillars).toHaveLength(3);
    expect(content.cta.title).toBe('Build with Zeno.');
    expect(content.footer.groups).toHaveLength(6);
    expect(content.footer.socials.map((item) => item.label)).toEqual(['LinkedIn', 'X', 'GitHub']);
    expect(content.footer.policies.map((item) => item.label)).toEqual([
      'Privacy Policy',
      'Terms of Service',
      'Risk Disclosure'
    ]);
  });
});
