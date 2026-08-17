import { Section } from '../ds/Layout';
import { FeatureCard } from '../ds/Cards';
import { us } from '@/lib/content/us';

export function Differentiators({ content = us }) {
  const { differentiators } = content;
  return (
    <Section eyebrow={differentiators.eyebrow} title={differentiators.heading} emphasis={differentiators.emphasis} after={differentiators.after} lead={differentiators.lead}>
      <div className="features__grid" data-anim="features" data-grid="feature">
        {differentiators.features.map((f) => (
          <FeatureCard key={f.title} icon={f.icon} title={f.title}>{f.body}</FeatureCard>
        ))}
      </div>
    </Section>
  );
}
