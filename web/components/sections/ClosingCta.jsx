'use client';

import { SectionHeading } from '../ds/Brand';
import { Container } from '../ds/Layout';
import { Button } from '../ds/Core';
import { useModal } from '../SearchModal';
import { us } from '@/lib/content/us';

export function ClosingCta({ content = us }) {
  const { open } = useModal();
  const { closing } = content;

  return (
    <section className="closing">
      <Container>
        <div className="closing__inner">
          <div data-anim="cta-heading" style={{ width: '100%' }}>
            <SectionHeading size="display" align="center" emphasis={closing.emphasis}>
              {closing.heading}
            </SectionHeading>
          </div>
          <div className="closing__copy" data-reveal="stagger">
            <p>{closing.body}</p>
            <div className="closing__ctas">
              <Button onClick={open}>Start a search</Button>
              <Button variant="secondary" withArrow={false} onClick={open}>Book a call</Button>
            </div>
            <span className="closing__fineprint">{closing.fineprint}</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
