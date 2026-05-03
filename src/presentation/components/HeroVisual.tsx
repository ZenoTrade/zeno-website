import type { ProductModule } from '../../domain/siteContent';
import { Icon } from './Icons';

interface HeroVisualProps {
  modules: ProductModule[];
}

export function HeroVisual({ modules }: HeroVisualProps) {
  return (
    <aside
      id="process"
      className="hero-visual"
      aria-label="Modular Zeno product architecture"
      aria-labelledby="process-title"
    >
      <div className="hero-visual__frame">
        <h2 id="process-title" className="sr-only">
          Process
        </h2>
        <p className="hero-visual__label">Use independently</p>

        <div className="hero-visual__modules">
          {modules.map((module) => (
            <article key={module.id} className="hero-module">
              <span className="hero-module__step">{module.step}</span>
              <span className="hero-module__icon">
                <Icon name={module.icon} />
              </span>
              <h3>{module.shortTitle}</h3>
              <p>{module.description}</p>
            </article>
          ))}
        </div>

        <p className="hero-visual__label hero-visual__label--bottom">Or connect the full stack</p>
      </div>
    </aside>
  );
}
