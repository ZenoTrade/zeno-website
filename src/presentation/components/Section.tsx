import type { FeatureSection } from '../../domain/siteContent';

export function Section({ section }: { section: FeatureSection }) {
  return (
    <section id={section.id} className="section-block" aria-labelledby={`${section.id}-title`}>
      <div className="section-block__header">
        <p className="eyebrow">{section.eyebrow}</p>
        <h2 id={`${section.id}-title`}>{section.title}</h2>
        <p>{section.description}</p>
      </div>

      <div className="feature-grid">
        {section.items.map((item) => (
          <article key={item.title} className="feature-card">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
