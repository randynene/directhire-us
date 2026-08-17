import { Card, AvatarPlaceholder } from './Cards';
import { ProgressBar } from './Core';
import { Tabs } from './Navigation';

export function PriceRow({ label, value, emphasis = false }) {
  return (
    <div className={`price-row${emphasis ? ' price-row--emphasis' : ''}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

export function PricingCard({ headline = '25%', subhead = 'of first-year base salary', rows = [], footnote }) {
  return (
    <Card radius="lg" border="strong" padding="lg" className="pricing-card">
      <div className="pricing-card__head">
        <span className="pricing-card__headline">{headline}</span>
        <span className="pricing-card__subhead">{subhead}</span>
      </div>
      <div className="pricing-card__rows">
        {rows.map((r) => <PriceRow key={r.label} {...r} />)}
      </div>
      {footnote ? <p className="pricing-card__foot">{footnote}</p> : null}
    </Card>
  );
}

export function FunnelTable({ label = 'The funnel, in numbers', rows = [] }) {
  const max = Math.max(...rows.map((r) => r.bar ?? 0), 1);
  return (
    <Card className="funnel-table">
      <span className="funnel-table__label">{label}</span>
      <div className="funnel-table__rows" role="table">
        {rows.map((r, i) => {
          const last = i === rows.length - 1;
          return (
            <div key={r.label} role="row" className={`funnel-row${last ? ' funnel-row--final' : ''}`}>
              <span className="funnel-row__label">{r.label}</span>
              <ProgressBar value={((r.bar ?? 0) / max) * 100} tone={last ? 'accent' : 'positive'} label={r.label} />
              <span className="funnel-row__value">{r.value}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export function ScoreRow({ label, value = 0, verdict, tone = 'positive' }) {
  return (
    <div className={`score-row${tone === 'caution' ? ' score-row--caution' : ''}`}>
      <span className="score-row__label">{label}</span>
      <ProgressBar value={value} tone={tone} label={label} />
      <span className="score-row__verdict">{verdict}</span>
    </div>
  );
}

export function ReportCard({ name, meta, action = 'Open report →', tabs = ['Overview', 'CV', 'Tech interview', 'Coding test'], activeTab, onTabChange, scores = [], footer }) {
  return (
    <div className="report-card">
      <div className="report-card__head">
        <AvatarPlaceholder size={42} radius="var(--radius-sm)" />
        <div className="report-card__meta">
          <span className="report-card__name">{name}</span>
          <span className="report-card__detail">{meta}</span>
        </div>
        <button type="button" className="report-card__action">{action}</button>
      </div>
      <div className="report-card__tabs">
        <Tabs items={tabs} value={activeTab} onChange={onTabChange} />
      </div>
      <div className="report-card__body">
        {scores.map((s) => <ScoreRow key={s.label} {...s} />)}
        {footer}
      </div>
    </div>
  );
}
