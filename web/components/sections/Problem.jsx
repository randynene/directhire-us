import { Eyebrow, SectionHeading } from '../ds/Brand';
import { Container } from '../ds/Layout';
import { JobPostGrid } from '../ds/Media';
import { FloatingProfileCard } from '../ds/Cards';
import { us } from '@/lib/content/us';

export function Problem({ content = us }) {
  const { problem } = content;
  return (
    <section className="section">
      <Container>
        <div className="grid-2 problem__grid" data-grid="problem">
          <div className="problem__copy" data-reveal="stagger">
            <Eyebrow style={{ color: 'var(--teal-500)' }}>{problem.eyebrow}</Eyebrow>
            <SectionHeading size="h2">{problem.heading}</SectionHeading>
            {problem.paragraphs.map((p) => <p key={p}>{p}</p>)}
          </div>
          <div data-anim="grid">
            <JobPostGrid rows={16} columns={10} label={problem.gridLabel}>
              <div className="job-post-grid__floaters" data-anim="floaters">
                {problem.floaters.map((role) => <FloatingProfileCard key={role} role={role} />)}
                <span className="job-post-grid__caption">{problem.caption}</span>
              </div>
            </JobPostGrid>
          </div>
        </div>
      </Container>
    </section>
  );
}
