import { createLandingContent } from '../domain/siteContent';
import { HeroVisual } from './components/HeroVisual';
import { Section } from './components/Section';

const content = createLandingContent();

export function App() {
  return (
    <main className="page-shell">
      <header className="topbar">
        <strong className="topbar__brand">{content.companyName}</strong>
        <nav className="topbar__nav" aria-label="Primary navigation">
          <a href="#what-zeno-does">Platform</a>
          <a href="#how-zeno-operates">Approach</a>
          <a href="#company-focus">Focus</a>
        </nav>
      </header>

      <section className="hero">
        <div className="hero__copy">
          <p className="eyebrow">{content.hero.eyebrow}</p>
          <h1>{content.hero.title}</h1>
          <p className="hero__description">{content.hero.description}</p>
          <div className="hero__actions" aria-label="Primary website actions">
            <a href="#what-zeno-does" className="button button--primary">
              {content.hero.primaryAction}
            </a>
            <a href="#future-products" className="button button--secondary">
              {content.hero.secondaryAction}
            </a>
          </div>
        </div>

        <div className="hero__panel" aria-label="Zeno operating priorities">
          <HeroVisual />
          {content.hero.stats.map((stat) => (
            <div key={stat.label} className="stat-card">
              <span className="stat-card__label">{stat.label}</span>
              <strong className="stat-card__value">{stat.value}</strong>
            </div>
          ))}
        </div>
      </section>

      {content.sections.map((section) => (
        <Section key={section.id} section={section} />
      ))}

      <section className="cta" aria-labelledby="cta-title">
        <div>
          <p className="eyebrow">Company introduction</p>
          <h2 id="cta-title">{content.cta.title}</h2>
          <p>{content.cta.description}</p>
        </div>
        <a href="#top" className="button button--primary">
          {content.cta.primaryAction}
        </a>
      </section>

      <footer className="footer">
        <div>
          <strong>{content.companyName}</strong>
          <p>{content.footer.tagline}</p>
        </div>
        <nav aria-label="Footer navigation">
          <ul className="footer__links">
            {content.footer.links.map((link) => (
              <li key={link}>{link}</li>
            ))}
          </ul>
        </nav>
      </footer>
    </main>
  );
}
