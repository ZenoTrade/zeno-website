import { useEffect, useState } from 'react';
import {
  createLandingContent,
  type ProductModule,
  type ReliabilityMetric,
  type SocialLink,
  type WhyPillar
} from '../domain/siteContent';
import { HeroVisual } from './components/HeroVisual';
import { BrandMark, Icon, SocialIcon, ThemeToggleIcon } from './components/Icons';

const content = createLandingContent();
const THEME_STORAGE_KEY = 'zeno-theme';

type ThemeMode = 'light' | 'dark';

function getThemeStorage(): Pick<Storage, 'getItem' | 'setItem'> | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const storage = window.localStorage;

  if (
    !storage ||
    typeof storage.getItem !== 'function' ||
    typeof storage.setItem !== 'function'
  ) {
    return null;
  }

  return storage;
}

function getInitialTheme(): ThemeMode {
  if (typeof window === 'undefined') {
    return 'light';
  }

  const storedTheme = getThemeStorage()?.getItem(THEME_STORAGE_KEY);

  if (storedTheme === 'light' || storedTheme === 'dark') {
    return storedTheme;
  }

  if (
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    return 'dark';
  }

  return 'light';
}

function ProductCard({ module }: { module: ProductModule }) {
  return (
    <article className="product-card">
      <span className="icon-shell">
        <Icon name={module.icon} />
      </span>
      <div className="product-card__copy">
        <h3>{module.title}</h3>
        <p>{module.description}</p>
      </div>
    </article>
  );
}

function MetricCard({ metric }: { metric: ReliabilityMetric }) {
  return (
    <article className="metric-card">
      <span className="metric-card__icon">
        <Icon name={metric.icon} />
      </span>
      <strong>{metric.value}</strong>
      <span>{metric.label}</span>
    </article>
  );
}

function WhyCard({ pillar }: { pillar: WhyPillar }) {
  return (
    <article className="why-card">
      <span className="icon-shell icon-shell--small">
        <Icon name={pillar.icon} />
      </span>
      <div>
        <h3>{pillar.title}</h3>
        <p>{pillar.description}</p>
      </div>
    </article>
  );
}

function PerformanceChart() {
  return (
    <div className="performance-chart">
      <div className="performance-chart__scales" aria-hidden="true">
        <span>+40%</span>
        <span>+20%</span>
        <span>-20%</span>
      </div>
      <svg viewBox="0 0 520 180" role="img" aria-label="Rising internal performance line chart">
        <line x1="24" y1="30" x2="496" y2="30" />
        <line x1="24" y1="88" x2="496" y2="88" />
        <line x1="24" y1="146" x2="496" y2="146" />
        <path d="M30 132C72 128 95 118 126 116C160 114 179 97 210 100C246 103 258 78 295 79C335 80 352 53 390 50C430 47 450 25 490 18" />
      </svg>
      <div className="performance-chart__months" aria-hidden="true">
        <span>Jan '24</span>
        <span>Apr '24</span>
        <span>Jul '24</span>
        <span>Oct '24</span>
        <span>Apr '25</span>
      </div>
    </div>
  );
}

function SocialLinkItem({ social }: { social: SocialLink }) {
  return (
    <a href={social.href} className="footer__social-link" aria-label={social.label}>
      <SocialIcon name={social.label} />
    </a>
  );
}

export function App() {
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    getThemeStorage()?.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const nextTheme = theme === 'light' ? 'dark' : 'light';

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

        <div className="topbar__actions">
          <button
            type="button"
            className="theme-toggle"
            aria-label={`Switch to ${nextTheme} mode`}
            aria-pressed={theme === 'dark'}
            onClick={() => setTheme(nextTheme)}
          >
            <span className="theme-toggle__icon">
              <ThemeToggleIcon theme={theme} />
            </span>
          </button>

          <a href="#contact" className="button button--primary topbar__cta">
            Request Access <span aria-hidden="true">→</span>
          </a>
        </div>
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
        <h2 id="products-title" className="sr-only">
          Products
        </h2>
        <div className="product-grid">
          {content.productModules.map((module) => (
            <ProductCard key={module.id} module={module} />
          ))}
        </div>
      </section>

      <section id="reliability" className="reliability" aria-labelledby="reliability-title">
        <article className="reliability-panel">
          <div className="reliability__copy">
            <p className="eyebrow">{content.reliability.eyebrow}</p>
            <h2 id="reliability-title">{content.reliability.title}</h2>
            <p>{content.reliability.description}</p>
          </div>

          <PerformanceChart />

          <div className="metric-grid">
            {content.reliability.metrics.map((metric) => (
              <MetricCard key={metric.label} metric={metric} />
            ))}
          </div>
        </article>
      </section>

      <section id="technology" className="why" aria-labelledby="why-title">
        <p className="eyebrow">{content.why.eyebrow}</p>
        <h2 id="why-title" className="sr-only">
          {content.why.eyebrow}
        </h2>
        <div className="why-grid">
          {content.why.pillars.map((pillar) => (
            <WhyCard key={pillar.title} pillar={pillar} />
          ))}
        </div>
      </section>

      <section id="contact" className="cta" aria-labelledby="cta-title">
        <div className="cta__mark">
          <BrandMark />
        </div>
        <div className="cta__copy">
          <h2 id="cta-title">{content.cta.title}</h2>
          <p>{content.cta.description}</p>
        </div>
        <a href="mailto:hello@zenotrade.com" className="button button--light">
          {content.cta.primaryAction} <span aria-hidden="true">→</span>
        </a>
      </section>

      <footer className="footer">
        <div className="footer__brand">
          <a href="#top" className="brand brand--footer" aria-label="Zeno home">
            <BrandMark />
            <span>{content.companyName}</span>
          </a>
          <p>{content.footer.tagline}</p>
        </div>

        <div className="footer__links">
          {content.footer.groups.map((group) => (
            <nav key={group.title} className="footer__group" aria-label={group.title}>
              <strong>{group.title}</strong>
              <ul>
                {group.links.map((link) => (
                  <li key={`${group.title}-${link.label}`}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="footer__contact">
          <div className="footer__socials" aria-label="Social links">
            {content.footer.socials.map((social) => (
              <SocialLinkItem key={social.label} social={social} />
            ))}
          </div>
        </div>

        <div className="footer__meta">
          <p>{content.footer.copyright}</p>
          <div className="footer__policies">
            {content.footer.policies.map((link) => (
              <a key={link.label} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
