import { createLandingContent } from './siteContent';

describe('createLandingContent', () => {
  it('defines a complete homepage structure for the first public Zeno site', () => {
    const content = createLandingContent();

    expect(content.companyName).toBe('Zeno');
    expect(content.hero.title).toBe("A modern front door for Zeno’s trading stack.");
    expect(content.hero.stats).toHaveLength(3);
    expect(content.sections.map((section) => section.id)).toEqual([
      'problem-value',
      'what-zeno-does',
      'credibility',
      'future-products'
    ]);
    expect(content.sections.every((section) => section.items.length === 3)).toBe(true);
    expect(content.cta.primaryAction).toBe('Review the homepage direction');
    expect(content.footer.links).toContain('Future products');
  });
});
