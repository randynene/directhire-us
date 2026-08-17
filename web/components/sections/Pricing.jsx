import { Section } from '../ds/Layout';
import { PricingCard } from '../ds/Data';
import { CheckItem } from '../ds/Core';
import { us } from '@/lib/content/us';

export function Pricing({ content = us }) {
  const { pricing } = content;
  return (
    <Section id="pricing" eyebrow={pricing.eyebrow} title={pricing.heading} emphasis={pricing.emphasis} lead={pricing.lead}>
      <div className="pricing__grid" data-grid="pricing">
        <div data-anim="pricing">
          <PricingCard headline={pricing.card.headline} subhead={pricing.card.subhead} rows={pricing.card.rows} footnote={pricing.card.footnote} />
        </div>
        <div className="pricing__copy" data-reveal="stagger">
          <h3>{pricing.why.title}</h3>
          <p>{pricing.why.body}</p>
          <ul className="pricing__checks">
            {pricing.why.checks.map((c) => <CheckItem key={c}>{c}</CheckItem>)}
          </ul>
        </div>
      </div>
    </Section>
  );
}
