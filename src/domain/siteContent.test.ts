import { createLandingContent } from './siteContent';

describe('createLandingContent', () => {
  it('defines a simpler professional company landing structure', () => {
    const content = createLandingContent();

    expect(content.companyName).toBe('Zeno');
    expect(content.hero.title).toBe('Zeno is building disciplined trading infrastructure for modern markets.');
    expect(content.hero.stats).toHaveLength(3);
    expect(content.hero.trustPoints).toHaveLength(3);
    expect(content.platform.items).toHaveLength(3);
    expect(content.standards.items).toHaveLength(3);
    expect(content.rollout.checkpoints).toHaveLength(3);
    expect(content.standards.visual.src.startsWith('/visuals/')).toBe(true);
    expect(content.rollout.visual.src.startsWith('/visuals/')).toBe(true);
    expect(content.standards.visual.width).toBe(1200);
    expect(content.rollout.visual.height).toBe(780);
    expect(content.footer.links).toEqual(['Platform', 'Standards', 'Company']);
  });
});
