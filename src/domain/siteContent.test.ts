import { createLandingContent } from './siteContent';

describe('createLandingContent', () => {
  it('leads with Guard and Copier for prop traders', () => {
    const content = createLandingContent();

    expect(content.companyName).toBe('Zeno');
    expect(content.hero.title).toBe('Pass the challenge. Keep the account.');
    expect(content.products.map((p) => p.name)).toEqual(['Zeno Guard', 'Zeno Copier']);
    expect(content.steps).toHaveLength(3);
    expect(content.trust.map((t) => t.label)).toContain('No KYC');
    // Mobile tab bar uses four of these; each needs an icon.
    expect(content.nav.every((item) => item.icon && item.href.startsWith('#'))).toBe(true);
    expect(content.faq.length).toBeGreaterThanOrEqual(5);
  });

  it('keeps unverified performance figures off the site', () => {
    const content = createLandingContent();
    const text = JSON.stringify(content);
    expect(text).not.toMatch(/sharpe|win rate|\d+(\.\d+)?%/i);
    expect(content.footer.policies.map((item) => item.label)).toEqual([
      'Privacy Policy',
      'Terms of Service',
      'Risk Disclosure'
    ]);
  });
});
