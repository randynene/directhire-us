import { IconTile, Tag, Badge, StatusDot } from './Core';
import { Eyebrow } from './Brand';

const RADIUS_CLASS = { panel: 'card--panel', card: '', lg: 'card--lg' };

export function Card({ children, radius = 'card', border, padding, float, className = '', style, ...rest }) {
  const classes = [
    'card',
    RADIUS_CLASS[radius] || '',
    border === 'strong' ? 'card--strong' : '',
    float ? 'card--float' : '',
    padding === 0 ? 'card--pad-0' : padding === 'lg' ? 'card--pad-lg' : padding === 'sm' ? 'card--pad-sm' : '',
    className,
  ].filter(Boolean).join(' ');
  return <div className={classes} style={style} {...rest}>{children}</div>;
}

export function FeatureCard({ icon = 'code-brackets', title, children }) {
  return (
    <Card className="feature-card">
      <IconTile name={icon} />
      <div>
        <h3>{title}</h3>
        <p>{children}</p>
      </div>
    </Card>
  );
}

export function StageCard({ number, title, note, children }) {
  return (
    <Card radius="card" padding={0} className="stage-card">
      <div className="stage-card__body">
        <span className="stage-card__number">{number}</span>
        <h3 className="stage-card__title">{title}</h3>
        <p className="stage-card__text">{children}</p>
      </div>
      {note ? (
        <div className="stage-card__note"><span>{note}</span></div>
      ) : null}
    </Card>
  );
}

export function AvatarPlaceholder({ size = 52, radius = 'var(--radius-md)', label = 'REAL\nPHOTO', style, className = '' }) {
  return (
    <div
      className={`avatar-placeholder ${className}`.trim()}
      style={{ width: size, height: size, borderRadius: radius, ...style }}
    >
      {label}
    </div>
  );
}

export function CandidateCard({ role, meta, skills = [], salary, salaryNote = 'base sought' }) {
  return (
    <div className="candidate-card">
      <AvatarPlaceholder size={52} />
      <div className="candidate-card__body">
        <h4 className="candidate-card__role">{role}</h4>
        <span className="candidate-card__meta">{meta}</span>
        {skills.length ? (
          <div className="candidate-card__skills">
            {skills.map((s) => <Tag key={s}>{s}</Tag>)}
          </div>
        ) : null}
      </div>
      {salary ? (
        <div className="candidate-card__salary">
          <div className="candidate-card__salary-value">{salary}</div>
          <div className="candidate-card__salary-note">{salaryNote}</div>
        </div>
      ) : null}
    </div>
  );
}

export function ShortlistPanel({ label = 'Your shortlist', badge, children, footnote, annotation }) {
  return (
    <div className="shortlist-panel">
      <div className="shortlist-panel__head">
        <Eyebrow style={{ color: 'var(--text-muted)', letterSpacing: 'var(--ls-label-sm)' }}>{label}</Eyebrow>
        {badge ? <Badge>{badge}</Badge> : null}
      </div>
      <div className="shortlist-panel__list">{children}</div>
      {(footnote || annotation) ? (
        <div className="shortlist-panel__foot">
          <span className="shortlist-panel__footnote">{footnote}</span>
          {annotation}
        </div>
      ) : null}
    </div>
  );
}

export function FloatingProfileCard({ role, note = 'Interviewed by a senior engineer' }) {
  return (
    <div className="floating-profile-card">
      <StatusDot />
      <div className="floating-profile-card__body">
        <span className="floating-profile-card__role">{role}</span>
        <span className="floating-profile-card__note">{note}</span>
      </div>
    </div>
  );
}

export function Callout({ children }) {
  return <div className="callout">{children}</div>;
}
