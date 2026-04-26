import { createLandingContent } from './siteContent';

describe('createLandingContent', () => {
  it('captures the current public positioning for Zeno', () => {
    const content = createLandingContent();

    expect(content.companyName).toBe('Zeno');
    expect(content.audiences).toEqual(['partners', 'future-customers']);
    expect(content.valuePillars).toHaveLength(3);
    expect(content.valuePillars.map((pillar) => pillar.title)).toContain('Clarity first');
  });
});
