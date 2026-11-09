import type { SiteContent } from '../../domain/siteContent';
import { FaqDesktop } from '../components/Faq';
import { GoldOutlook } from '../components/GoldOutlook';
import { GuardDemo } from '../components/GuardDemo';
import { Icon, ThemeToggle } from '../components/Icons';
import { Legal } from '../components/Legal';
import { PricingDesktop, trialLink } from '../components/Pricing';
import { Brand, ProductPanel, StepItem, TrustItem, bundlePrice } from '../components/Shared';
import { ThankYou } from '../components/ThankYou';
import { TrackRecordPanel } from '../components/TrackRecordPanel';
import type { useTheme } from '../hooks/useTheme';
import { useScrollSpy } from '../hooks/useScrollSpy';

type Theme = ReturnType<typeof useTheme>;

export function DesktopLanding({ content, theme }: { content: SiteContent; theme: Theme }) {
  const navItems = content.nav.filter((item) => item.href !== '#top');
  const active = useScrollSpy(navItems.map((item) => item.href.slice(1)));

  return (
    <div className="d-shell" id="top">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="d-header">
        <div className="d-header__inner">
          <Brand name={content.companyName} />
          <nav className="d-header__nav" aria-label="Primary navigation">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                aria-current={active === item.href.slice(1) ? 'location' : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="d-header__actions">
            <ThemeToggle theme={theme.theme} next={theme.next} onToggle={theme.toggle} />
            {trialLink ? (
              <a className="button button--ghost button--small" href={trialLink}>
                Free trial
              </a>
            ) : null}
            <a href="#pricing" className="button button--primary button--small">
              Get Zeno
            </a>
          </div>
        </div>
      </header>

      <main id="main">
        <ThankYou />

        <section className="d-hero" aria-labelledby="hero-title">
          <div className="d-hero__copy">
            <p className="eyebrow eyebrow--pill">{content.hero.eyebrow}</p>
            <h1 id="hero-title">{content.hero.title}</h1>
            <p className="d-hero__subline">{content.hero.subline}</p>
            <div className="d-hero__actions">
              <a href="#pricing" className="button button--primary button--large">
                {content.hero.primaryAction} <Icon name="arrow" />
              </a>
              <a href="#how" className="button button--secondary button--large">
                {content.hero.secondaryAction}
              </a>
            </div>
            <ul className="d-hero__trust" aria-label="Why traders trust Zeno">
              {content.trust.map((point) => (
                <TrustItem key={point.label} point={point} />
              ))}
            </ul>
          </div>
          <div className="d-hero__visual">
            <div className="d-hero__window">
              <div className="d-hero__window-bar" aria-hidden="true">
                <span />
                <span />
                <span />
                <em>Zeno Guard</em>
              </div>
              <GuardDemo variant="slider" />
              <p className="d-hero__hint">Drag the size. Guard checks it against today's limit.</p>
            </div>
          </div>
        </section>

        <section id="products" className="d-section" aria-labelledby="products-title">
          <div className="d-section__head">
            <p className="eyebrow">Products</p>
            <h2 id="products-title">Two tools. One goal: a funded account you keep.</h2>
          </div>
          <div className="d-products">
            {content.products.map((product) => (
              <ProductPanel key={product.id} product={product} />
            ))}
          </div>
          <a href="#pricing" className="d-bundle">
            <span className="d-bundle__label">Better together</span>
            <span>
              <strong>Guard + Copier</strong> on up to 3 MT5 accounts, each with its own limits.
            </span>
            <span className="d-bundle__price">
              ${bundlePrice}/month <Icon name="arrow" />
            </span>
          </a>
        </section>

        <section id="how" className="d-section d-how" aria-labelledby="how-title">
          <div className="d-section__head">
            <p className="eyebrow">How it works</p>
            <h2 id="how-title">Running in three steps.</h2>
          </div>
          <ol className="d-steps">
            {content.steps.map((step, index) => (
              <StepItem key={step.title} step={step} index={index} />
            ))}
          </ol>
        </section>

        <PricingDesktop />

        <section id="proof" className="d-section d-proof" aria-labelledby="proof-title">
          <div>
            <p className="eyebrow">{content.proof.eyebrow}</p>
            <h2 id="proof-title">{content.proof.title}</h2>
            <p className="section-lead">{content.proof.description}</p>
          </div>
          <TrackRecordPanel note={content.proof.trackRecordNote} />
        </section>

        <GoldOutlook />

        <FaqDesktop items={content.faq} />

        <section id="contact" className="d-cta" aria-labelledby="cta-title">
          <div>
            <h2 id="cta-title">{content.cta.title}</h2>
            <p>{content.cta.description}</p>
          </div>
          <div className="d-cta__actions">
            <a href="#pricing" className="button button--light button--large">
              {content.cta.primaryAction} <Icon name="arrow" />
            </a>
            <a href={`mailto:${content.contactEmail}`} className="button button--on-dark button--large">
              Talk to us
            </a>
          </div>
        </section>

        <Legal variant="columns" />
      </main>

      <footer className="d-footer">
        <div className="d-footer__brand">
          <Brand name={content.companyName} />
          <p>{content.footer.tagline}</p>
          <a className="text-link" href={`mailto:${content.contactEmail}`}>
            {content.contactEmail}
          </a>
        </div>
        <nav className="d-footer__group" aria-label="Product">
          <strong>Product</strong>
          <ul>
            {content.footer.product.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <nav className="d-footer__group" aria-label="Legal">
          <strong>Legal</strong>
          <ul>
            {content.footer.policies.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <p className="d-footer__meta">{content.footer.copyright}</p>
      </footer>
    </div>
  );
}
