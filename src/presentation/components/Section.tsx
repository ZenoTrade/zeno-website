import type { SiteSection } from '../../domain/siteContent';

export function Section({ section }: { section: SiteSection }) {
  return (
    <section id={section.id} className="content-section" aria-labelledby={`${section.id}-title`}>
      <div className="content-section__intro">
        <div className="content-section__header">
          <p className="eyebrow">{section.eyebrow}</p>
          <h2 id={`${section.id}-title`}>{section.title}</h2>
          <p>{section.description}</p>
        </div>

        <figure className="section-visual">
          <img
            src={section.image.src}
            alt={section.image.alt}
            width={section.image.width}
            height={section.image.height}
            loading="lazy"
            decoding="async"
          />
          <figcaption>{section.image.caption}</figcaption>
        </figure>
      </div>

      <div className="content-grid">
        {section.items.map((item) => (
          <article key={item.title} className="content-card">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
