import { createLandingContent } from '../domain/siteContent';

const content = createLandingContent();

export function App() {
  return (
    <main>
      <section>
        <p>{content.companyName}</p>
        <h1>{content.headline}</h1>
        <p>{content.subheadline}</p>
      </section>

      <section aria-labelledby="value-pillars-title">
        <h2 id="value-pillars-title">Why this first version exists</h2>
        <ul>
          {content.valuePillars.map((pillar) => (
            <li key={pillar.title}>
              <strong>{pillar.title}</strong>
              <p>{pillar.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
