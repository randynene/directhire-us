'use client';

import { Section } from '../ds/Layout';
import { Card } from '../ds/Cards';
import { Button } from '../ds/Core';
import { Accordion } from '../ds/Accordion';
import { useModal } from '../SearchModal';
import { us } from '@/lib/content/us';

export function Faq({ content = us }) {
  const { open } = useModal();
  const { faq } = content;

  return (
    <Section id="faq" eyebrow={faq.eyebrow} title={faq.heading} emphasis={faq.emphasis} headingSize="h2sm">
      <div className="faq__grid" data-grid="faq">
        <div data-reveal="">
          <Card className="faq__side-card">
            <h3>{faq.sideCard.title}</h3>
            <p>{faq.sideCard.body}</p>
            <div>
              <Button size="sm" variant="secondary" withArrow={false} onClick={open}>{faq.sideCard.cta}</Button>
            </div>
          </Card>
        </div>
        <div data-anim="faq">
          <Accordion items={faq.items} defaultOpen={0} />
        </div>
      </div>
    </Section>
  );
}
