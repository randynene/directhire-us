import { Section } from '../ds/Layout';
import { VideoPlaceholder } from '../ds/Media';
import { AnnotationBadge } from '../ds/Core';
import { us } from '@/lib/content/us';

export function Explainer({ content = us }) {
  const { explainer } = content;
  return (
    <Section id="how" eyebrow={explainer.eyebrow} title={explainer.heading} emphasis={explainer.emphasis} lead={explainer.lead} tight={explainer.tight}>
      <div data-anim="video" style={{ clipPath: 'inset(0 0 0 0)' }}>
        <VideoPlaceholder
          name={explainer.video.name}
          role={explainer.video.role}
          caption={explainer.video.caption}
          annotation={<AnnotationBadge>{explainer.video.annotation}</AnnotationBadge>}
        />
      </div>
      <div className="explainer__foot" data-reveal="">
        <span>{explainer.footAttribution}</span>
        <a href="#process">{explainer.footLink}</a>
      </div>
    </Section>
  );
}
