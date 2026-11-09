import { useRef, useState } from 'react';
import type { SiteContent } from '../../domain/siteContent';
import { FaqMobile } from '../components/Faq';
import { GoldOutlook } from '../components/GoldOutlook';
import { GuardDemo } from '../components/GuardDemo';
import { Icon, ThemeToggle } from '../components/Icons';
import { Legal } from '../components/Legal';
import { PricingMobile, trialLink } from '../components/Pricing';
import { Brand, ProductPanel, StepItem, TrustItem, bundlePrice } from '../components/Shared';
import { ThankYou } from '../components/ThankYou';
import { TrackRecordPanel } from '../components/TrackRecordPanel';
import { useScrollSpy } from '../hooks/useScrollSpy';
import type { useTheme } from '../hooks/useTheme';

type Theme = ReturnType<typeof useTheme>;

const TAB_HREFS = ['#top', '#products', '#pricing', '#faq'];

function ProductCarousel({ content }: { content: SiteContent }) {
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const goTo = (i: number) => {
    const track = trackRef.current;
    const card = track?.children[i] as HTMLElement | undefined;
    if (track && card) track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: 'smooth' });
    setIndex(i);
  };

  return (
    <>
      <div
        ref={trackRef}
        className="m-carousel"
        onScroll={(e) => {
          const el = e.currentTarget;
          setIndex(Math.round(el.scrollLeft / Math.max(1, el.clientWidth * 0.86)));
        }}
      >
        {content.products.map((product) => (
          <ProductPanel key={product.id} product={product} />
        ))}
      </div>
      <div className="m-dots" role="group" aria-label="Choose a product">
        {content.products.map((product, i) => (
          <button
            key={product.id}
            type="button"
            aria-label={`Show ${product.name}`}
            aria-pressed={index === i}
            className={index === i ? 'is-active' : ''}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </>
  );
}

export function MobileLanding({ content, theme }: { content: SiteContent; theme: Theme }) {
  const tabs = content.nav.filter((item) => TAB_HREFS.includes(item.href));
  const active = useScrollSpy(['top', 'products', 'pricing', 'faq']);

  return (
    <div className="m-shell" id="top">
      <header className="m-header">
        <Brand name={content.companyName} />
        <div className="m-header__actions">
          <ThemeToggle theme={theme.theme} next={theme.next} onToggle={theme.toggle} />
          <a href="#pricing" className="button button--primary button--small">
            Get Zeno
          </a>
        </div>
      </header>

      <main id="main">
        <ThankYou />

        <section className="m-hero" aria-labelledby="hero-title">
          <p className="eyebrow eyebrow--pill">Prop-firm tools for MT5</p>
          <h1 id="hero-title">{content.hero.mobileTitle}</h1>
          <p className="m-hero__subline">{content.hero.mobileSubline}</p>
          <GuardDemo variant="chips" />
          <p className="m-hero__hint">Tap a size to see Guard decide.</p>
          <div className="m-hero__actions">
            <a href="#pricing" className="button button--primary button--block button--large">
              {content.hero.primaryAction} <Icon name="arrow" />
            </a>
            {trialLink ? (
              <a href={trialLink} className="button button--ghost button--block">
                <Icon name="telegram" /> Try free for 7 days
              </a>
            ) : null}
          </div>
          <ul className="m-trust" aria-label="Why traders trust Zeno">
            {content.trust.map((point) => (
              <TrustItem key={point.label} point={point} />
            ))}
          </ul>
        </section>

        <section id="products" className="m-section" aria-labelledby="products-title">
          <p className="eyebrow">Products</p>
          <h2 id="products-title">Two tools, one goal.</h2>
          <ProductCarousel content={content} />
          <a href="#pricing" className="m-bundle">
            <span>
              <strong>Guard + Copier</strong>
              <span>Up to 3 MT5 accounts</span>
            </span>
            <span className="m-bundle__price">${bundlePrice}/mo</span>
          </a>
        </section>

        <section id="how" className="m-section" aria-labelledby="how-title">
          <p className="eyebrow">How it works</p>
          <h2 id="how-title">Running in three steps.</h2>
          <ol className="m-timeline">
            {content.steps.map((step, index) => (
              <StepItem key={step.title} step={step} index={index} />
            ))}
          </ol>
        </section>

        <PricingMobile />

        <section id="proof" className="m-section" aria-labelledby="proof-title">
          <p className="eyebrow">{content.proof.eyebrow}</p>
          <h2 id="proof-title">{content.proof.title}</h2>
          <TrackRecordPanel note={content.proof.trackRecordNote} />
        </section>

        <GoldOutlook compact />

        <FaqMobile items={content.faq} />

        <section id="contact" className="m-section m-cta" aria-labelledby="cta-title">
          <h2 id="cta-title">{content.cta.title}</h2>
          <p>{content.cta.description}</p>
          <a href="#pricing" className="button button--light button--block button--large">
            {content.cta.primaryAction}
          </a>
          <a href={`mailto:${content.contactEmail}`} className="m-cta__mail">
            {content.contactEmail}
          </a>
        </section>

        <Legal variant="accordion" />

        <footer className="m-footer">
          <p>{content.footer.copyright}</p>
        </footer>
      </main>

      <nav className="m-tabbar" aria-label="Primary navigation">
        {tabs.map((tab) => {
          const isActive = active === tab.href.slice(1);
          return (
            <a
              key={tab.href}
              href={tab.href}
              className={isActive ? 'is-active' : ''}
              aria-current={isActive ? 'location' : undefined}
            >
              <Icon name={tab.icon} />
              <span>{tab.label}</span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}
