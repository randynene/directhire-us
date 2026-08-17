'use client';

import { useState } from 'react';
import { Section } from '../ds/Layout';
import { StageCard, Callout } from '../ds/Cards';
import { CodePanel, CodePanelRailTile } from '../ds/Media';
import { ReportCard, FunnelTable } from '../ds/Data';
import { us } from '@/lib/content/us';

export function Process({ content = us }) {
  const { process } = content;
  const [tab, setTab] = useState('Overview');

  const rail = (
    <>
      <CodePanelRailTile label="CE engineer" tileLabel={'REAL PHOTO\nsenior engineer'} />
      <CodePanelRailTile label="Candidate" tileLabel={'REAL PHOTO\ncandidate'} />
    </>
  );

  return (
    <Section id="process" eyebrow={process.eyebrow} title={process.heading} emphasis={process.emphasis} lead={process.lead}>
      <div className="process__stack">

        <div className="process__stages" data-anim="stages" data-grid="stages">
          {process.stages.map((s) => (
            <StageCard key={s.number} number={s.number} title={s.title} note={s.note}>{s.body}</StageCard>
          ))}
        </div>

        <div className="process__split process__split--stage2" data-grid="stage2">
          <div className="process__media" data-anim="codepanel" data-stage2-media>
            <CodePanel label={process.stage2.code.label} lines={process.stage2.code.lines} rail={rail} />
          </div>
          <div className="process__copy" data-reveal="stagger">
            <span className="process__kicker">{process.stage2.kicker}</span>
            <h3>{process.stage2.title}</h3>
            {process.stage2.paragraphs.map((p) => <p key={p}>{p}</p>)}
          </div>
        </div>

        <div className="process__split process__split--stage3" data-grid="stage3">
          <div className="process__copy" data-reveal="stagger">
            <span className="process__kicker">{process.stage3.kicker}</span>
            <h3>{process.stage3.title}</h3>
            {process.stage3.paragraphs.map((p) => <p key={p}>{p}</p>)}
          </div>
          <div data-anim="report">
            <ReportCard
              name={process.stage3.report.name}
              meta={process.stage3.report.meta}
              tabs={process.stage3.report.tabs}
              activeTab={tab}
              onTabChange={setTab}
              scores={process.stage3.report.scores}
              footer={<Callout>{process.stage3.report.footer}</Callout>}
            />
          </div>
        </div>

        <div data-anim="funnel">
          <FunnelTable rows={process.funnel} />
        </div>

      </div>
    </Section>
  );
}
