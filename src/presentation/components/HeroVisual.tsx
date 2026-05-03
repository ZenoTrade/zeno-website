import type { ProductModule } from '../../domain/siteContent';

interface HeroVisualProps {
  modules: ProductModule[];
}

function ModuleIcon({ name }: { name: ProductModule['icon'] }) {
  if (name === 'network') {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="13" r="5" />
        <circle cx="13" cy="32" r="5" />
        <circle cx="35" cy="32" r="5" />
        <path d="M21 17l-6 10M27 17l6 10M18 32h12" />
      </svg>
    );
  }

  if (name === 'target') {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r="15" />
        <circle cx="24" cy="24" r="6" />
        <path d="M24 4v8M24 36v8M4 24h8M36 24h8" />
      </svg>
    );
  }

  if (name === 'shield') {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M24 6l15 6v11c0 10-6 16-15 19C15 39 9 33 9 23V12l15-6z" />
        <path d="M18 24l4 4 8-9" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M28 4L12 27h12l-4 17 16-24H24l4-16z" />
    </svg>
  );
}

export function HeroVisual({ modules }: HeroVisualProps) {
  return (
    <aside className="hero-visual" aria-label="Modular Zeno product architecture">
      <p className="hero-visual__label">Use independently</p>
      <div className="hero-visual__grid">
        {modules.map((module) => (
          <article key={module.id} className="hero-module">
            <span className="hero-module__step">{module.step}</span>
            <span className="hero-module__icon">
              <ModuleIcon name={module.icon} />
            </span>
            <h2>{module.shortTitle}</h2>
            <p>{module.description}</p>
          </article>
        ))}
      </div>
      <p className="hero-visual__label hero-visual__label--bottom">Or connect the full stack</p>
    </aside>
  );
}
