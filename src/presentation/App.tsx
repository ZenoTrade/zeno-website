import { createLandingContent } from '../domain/siteContent';
import { HeroVisual } from './components/HeroVisual';

const content = createLandingContent();

export function App() {
  return (
    <main className="page-shell" id="top">
      <header className="topbar">
        <strong className="topbar__brand">{content.companyName}</strong>
        <nav className="topbar__nav" aria-label="Primary navigation">
          <a href="#platform">Platform</a>
          <a href="#standards">Standards</a>
          <a href="#company">Company</a>
        </nav>
        <a href="#company-intro" className="topbar__cta">Company overview</a>
      </header>

      <section className="hero" aria-labelledby="company-intro">
        <div className="hero__copy">
          <p className="eyebrow">{content.hero.eyebrow}</p>
          <h1 id="company-intro">{content.hero.title}</h1>
          <p className="hero__subline">{content.hero.subline}</p>
          <p className="hero__description">{content.hero.description}</p>
          <div className="hero__trustband" aria-label="Zeno company qualities">
            {content.hero.trustPoints.map((point) => (
              <span key={point}>{point}</span>
            ))}
          </div>
          <div className="hero__actions" aria-label="Primary website actions">
            <a href="#platform" className="button button--primary">
              {content.hero.primaryAction}
            </a>
            <a href="#standards" className="button button--secondary">
              {content.hero.secondaryAction}
            </a>
          </div>
        </div>

        <div className="hero__panel" aria-label="Zeno operating priorities">
          <HeroVisual />
          <div className="hero__note">
            <span className="hero__note-label">Company posture</span>
            <p>Built to feel like a credible company introduction, not an internal project page.</p>
          </div>
          <div className="hero__stats">
            {content.hero.stats.map((stat) => (
              <div key={stat.label} className="stat-card">
                <span className="stat-card__label">{stat.label}</span>
                <strong className="stat-card__value">{stat.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id={content.platform.id} className="section-block section-block--platform" aria-labelledby="platform-title">
        <div className="section-block__header">
          <p className="eyebrow">{content.platform.eyebrow}</p>
          <h2 id="platform-title">{content.platform.title}</h2>
          <p>{content.platform.description}</p>
        </div>
        <div className="feature-grid">
          {content.platform.items.map((item) => (
            <article key={item.title} className="feature-card">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id={content.standards.id} className="section-block section-block--split" aria-labelledby="standards-title">
        <div className="section-block__header">
          <p className="eyebrow">{content.standards.eyebrow}</p>
          <h2 id="standards-title">{content.standards.title}</h2>
          <p>{content.standards.description}</p>
          <div className="standards-list">
            {content.standards.items.map((item) => (
              <article key={item.title} className="standard-row">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>

        <figure className="section-visual section-visual--tall">
          <img
            src={content.standards.visual.src}
            alt={content.standards.visual.alt}
            width={content.standards.visual.width}
            height={content.standards.visual.height}
            loading="lazy"
            decoding="async"
          />
        </figure>
      </section>

      <section id={content.rollout.id} className="section-block section-block--company" aria-labelledby="company-title">
        <div className="company-panel">
          <figure className="section-visual company-panel__visual">
            <img
              src={content.rollout.visual.src}
              alt={content.rollout.visual.alt}
              width={content.rollout.visual.width}
              height={content.rollout.visual.height}
              loading="lazy"
              decoding="async"
            />
          </figure>
          <div className="company-panel__content">
            <p className="eyebrow">{content.rollout.eyebrow}</p>
            <h2 id="company-title">{content.rollout.title}</h2>
            <p>{content.rollout.description}</p>
            <ul className="checkpoint-list">
              {content.rollout.checkpoints.map((checkpoint) => (
                <li key={checkpoint}>{checkpoint}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

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
