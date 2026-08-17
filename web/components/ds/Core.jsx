import { Icon } from './Icon';

const BTN_ICON_SIZE = { lg: 13, md: 12, sm: 11 };

/* The pill control. Primary carries a dark circular badge holding the arrow
   glyph by default — the pattern used for every "Start a search" CTA. Every
   secondary/ghost instance on this page passes withArrow={false} explicitly. */
export function Button({ children, variant = 'primary', size = 'lg', withArrow = variant === 'primary', href, onClick, type = 'button', className = '', ...rest }) {
  const Tag = href ? 'a' : 'button';
  const classes = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    withArrow ? '' : 'btn--no-arrow',
    className,
  ].filter(Boolean).join(' ');

  return (
    <Tag href={href} type={Tag === 'button' ? type : undefined} onClick={onClick} className={classes} {...rest}>
      <span>{children}</span>
      {withArrow ? (
        <span className="btn__badge" aria-hidden="true">
          <Icon name="arrow-right" size={BTN_ICON_SIZE[size]} />
        </span>
      ) : null}
    </Tag>
  );
}

export function CheckItem({ children, size = 'md', className = '' }) {
  return (
    <li className={`check-item${size === 'sm' ? ' check-item--sm' : ''} ${className}`.trim()}>
      <span className="check-item__icon"><Icon name="check" size={15} /></span>
      <span className="check-item__text">{children}</span>
    </li>
  );
}

export function Tag({ children }) {
  return <span className="tag">{children}</span>;
}

export function Badge({ children }) {
  return <span className="badge">{children}</span>;
}

export function AnnotationBadge({ children }) {
  return <span className="annotation-badge">{children}</span>;
}

/* 38px rounded square holding an 18px lime glyph — the header of every feature card. */
export function IconTile({ name = 'code-brackets', tone = 'accent' }) {
  return (
    <span className={`icon-tile${tone === 'caution' ? ' icon-tile--caution' : ''}`}>
      <Icon name={name} size={18} />
    </span>
  );
}

const PROGRESS_TONE_CLASS = { positive: '', caution: 'progress--caution', accent: 'progress--accent' };

export function ProgressBar({ value = 0, tone = 'positive', label }) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div
      className={`progress ${PROGRESS_TONE_CLASS[tone] || ''}`.trim()}
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
    >
      <div style={{ width: pct + '%' }} />
    </div>
  );
}

export function StatusDot({ tone = 'accent', className = '' }) {
  const toneClass = tone === 'live' ? 'status-dot--live' : tone === 'muted' ? 'status-dot--muted' : '';
  return <span className={`status-dot ${toneClass} ${className}`.trim()} aria-hidden="true" />;
}
