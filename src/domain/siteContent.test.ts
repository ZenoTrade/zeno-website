import { createLandingContent } from './siteContent';

describe('createLandingContent', () => {
  it('defines a complete homepage structure for the first public Zeno site', () => {
    const content = createLandingContent();

    expect(content.companyName).toBe('Zeno');
    expect(content.hero.title).toBe('Zeno builds disciplined trading systems for signal-driven markets.');
    expect(content.hero.stats).toHaveLength(3);
    expect(content.sections.every((section) => section.image.src.startsWith('/visuals/'))).toBe(true);
    expect(content.sections.every((section) => section.image.width === 1200 && section.image.height === 780)).toBe(true);
    expect(content.sections.map((section) => section.id)).toEqual([
      'what-zeno-does',
      'how-zeno-operates',
      'why-zeno',
      'company-focus'
    ]);
    expect(content.sections.every((section) => section.items.length === 3)).toBe(true);
    expect(content.cta.primaryAction).toBe('Back to top');
    expect(content.footer.links).toContain('Platform');
  });
});
