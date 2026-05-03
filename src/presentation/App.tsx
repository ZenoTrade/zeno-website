import { createLandingContent, type ProductModule, type WhyPillar } from '../domain/siteContent';
import { HeroVisual } from './components/HeroVisual';

const content = createLandingContent();

type IconName = ProductModule['icon'] | WhyPillar['icon'];

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <svg viewBox="0 0 64 64" focusable="false">
        <path d="M16 10h34L28 32l22 22H16" />
        <path d="M14 12l20 20-20 20" />
        <circle cx="14" cy="12" r="5" />
        <circle cx="34" cy="32" r="6" />
        <circle cx="14" cy="52" r="5" />
        <circle cx="50" cy="54" r="5" />
      </svg>
    </span>
  );
}

function Icon({ name }: { name: IconName }) {
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

  if (name === 'bolt') {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M28 4L12 27h12l-4 17 16-24H24l4-16z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M17 15h14v14H17zM9 31h14v10H9zM25 31h14v10H25z" />
    </svg>
  );
}

function ProductCard({ module }: { module: ProductModule }) {
  return (
    <article className="product-card">
      <span className="icon-shell">
        <Icon name={module.icon} />
      </span>
      <h3>{module.title}</h3>
      <p>{module.description}</p>
      <span className="module-note">{module.note}</span>
    </article>
  );
}

export function App() {
  return (
    <main className="site-shell" id="top">
      <header className="topbar">
        <a href="#top" className="brand" aria-label="Zeno home">
          <BrandMark />
          <span>{content.companyName}</span>
        </a>
        <nav className="topbar__nav" aria-label="Primary navigation">
          {content.nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="topbar__cta">
          Request Access <span aria-hidden="true">→</span>
        </a>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__copy">
          <p className="eyebrow eyebrow--pill">{content.hero.eyebrow}</p>
          <h1 id="hero-title">{content.hero.title}</h1>
          <p className="hero__subline">{content.hero.subline}</p>
          <div className="hero__actions" aria-label="Primary website actions">
            <a href="#products" className="button button--primary">
              {content.hero.primaryAction} <span aria-hidden="true">→</span>
            </a>
            <a href="#contact" className="button button--secondary">
              {content.hero.secondaryAction}
            </a>
          </div>
        </div>

        <HeroVisual modules={content.productModules} />
      </section>

      <section id="products" className="products" aria-labelledby="products-title">
        <div className="section-heading">
          <p className="eyebrow">Products</p>
          <h2 id="products-title">Use one module or the full stack.</h2>
        </div>
        <div className="product-grid">
          {content.productModules.map((module) => (
            <ProductCard key={module.id} module={module} />
          ))}
        </div>
      </section>

      <section id="process" className="process" aria-labelledby="process-title">
        <p className="eyebrow">Process</p>
        <h2 id="process-title">Standalone first. Connected when needed.</h2>
        <div className="process__line">
          {content.productModules.map((module) => (
            <div key={module.id} className="process-step">
              <span className="process-step__number">{module.step}</span>
              <span className="icon-shell icon-shell--small">
                <Icon name={module.icon} />
              </span>
              <strong>{module.shortTitle}</strong>
            </div>
          ))}
        </div>
      </section>

      <section id="reliability" className="reliability" aria-labelledby="reliability-title">
        <div className="reliability__copy">
          <p className="eyebrow">{content.reliability.eyebrow}</p>
          <h2 id="reliability-title">{content.reliability.title}</h2>
          <p>{content.reliability.description}</p>
        </div>
        <div className="mini-chart" aria-label="Internal performance trend">
          <svg viewBox="0 0 420 180" role="img" aria-label="Rising internal performance line chart">
            <path d="M24 134 C82 128 96 112 134 111 C170 110 179 88 212 103 C246 119 255 77 292 75 C330 73 348 46 396 31" />
            <line x1="24" y1="140" x2="396" y2="140" />
            <line x1="24" y1="90" x2="396" y2="90" />
            <line x1="24" y1="40" x2="396" y2="40" />
          </svg>
        </div>
        <div className="metric-grid">
          {content.reliability.metrics.map((metric) => (
            <div key={metric.label} className="metric-card">
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="technology" className="why" aria-labelledby="why-title">
        <p className="eyebrow" id="why-title">
          {content.why.eyebrow}
        </p>
        <div className="why-grid">
          {content.why.pillars.map((pillar) => (
            <article key={pillar.title} className="why-card">
              <span className="icon-shell icon-shell--small">
                <Icon name={pillar.icon} />
              </span>
              <div>
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="cta" aria-labelledby="cta-title">
        <div className="cta__mark">
          <BrandMark />
        </div>
        <div>
          <h2 id="cta-title">{content.cta.title}</h2>
          <p>{content.cta.description}</p>
        </div>
        <a href="mailto:hello@zenotrade.com" className="button button--light">
          {content.cta.primaryAction} <span aria-hidden="true">→</span>
        </a>
      </section>

      <footer className="footer">
        <div className="footer__brand">
          <a href="#top" className="brand" aria-label="Zeno home">
            <BrandMark />
            <span>{content.companyName}</span>
          </a>
          <p>{content.footer.tagline}</p>
        </div>
        <nav className="footer__nav" aria-label="Footer navigation">
          {content.footer.groups.map((group) => (
            <div key={group.title}>
              <strong>{group.title}</strong>
              <ul>
                {group.links.map((link) => (
                  <li key={link}>{link}</li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </footer>
    </main>
  );
}
