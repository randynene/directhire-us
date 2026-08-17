import { Icon } from './Icon';
import { StatusDot } from './Core';
import { AvatarPlaceholder } from './Cards';

export function PlayButton({ onClick, label = 'Play video' }) {
  return (
    <button type="button" className="play-button" aria-label={label} onClick={onClick}>
      <Icon name="play" size={26} />
    </button>
  );
}

export function VideoPlaceholder({ caption = 'REAL VIDEO STILL GOES HERE', name, role, annotation, onPlay }) {
  return (
    <div className="video-placeholder">
      {annotation ? <div className="video-placeholder__annotation">{annotation}</div> : null}
      <div className="video-placeholder__center">
        <PlayButton onClick={onPlay} />
        <span className="video-placeholder__caption">{caption}</span>
      </div>
      {(name || role) ? (
        <div className="video-placeholder__id">
          {name ? <span className="video-placeholder__name">{name}</span> : null}
          {role ? <span className="video-placeholder__role">{role}</span> : null}
        </div>
      ) : null}
    </div>
  );
}

/* Session window: chrome dots, context label, LIVE marker, monospaced lines
   split one-per-line so ScrollTrigger can stagger them, and an optional
   right rail of participant tiles. */
export function CodePanel({ label = 'pair-session · your stack', live = true, lines = [], rail }) {
  return (
    <div className="code-panel">
      <div className="code-panel__chrome">
        <span className="code-panel__dots">
          <StatusDot tone="muted" />
          <StatusDot tone="muted" />
          <StatusDot tone="muted" />
        </span>
        <span className="code-panel__label">{label}</span>
        {live ? (
          <span className="code-panel__live">
            <StatusDot tone="live" />
            <span>LIVE</span>
          </span>
        ) : null}
      </div>
      <div className={`code-panel__grid${rail ? '' : ' code-panel__grid--no-rail'}`}>
        <pre className="code-panel__pre">
          {lines.map((line, i) => (
            <div data-code-line key={i}>{line === '' ? ' ' : line}</div>
          ))}
        </pre>
        {rail ? <div className="code-panel__rail">{rail}</div> : null}
      </div>
    </div>
  );
}

export function CodePanelRailTile({ label, tileLabel }) {
  return (
    <div className="code-panel__rail-tile">
      <AvatarPlaceholder label={tileLabel} radius={0} style={{ width: '100%', height: '100%' }} />
      <span className="code-panel__rail-label">{label}</span>
    </div>
  );
}

/* Decorative 160-cell grid standing in for a flood of applicants, faded at
   the bottom by a mask. Floating profile cards sit on top of it. */
export function JobPostGrid({ rows = 16, columns = 10, label, children }) {
  const count = rows * columns;
  return (
    <div className="job-post-grid">
      {label ? <div className="job-post-grid__label">{label}</div> : null}
      <div className="job-post-grid__cells" aria-hidden="true">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="job-post-grid__cell" />
        ))}
      </div>
      {children}
    </div>
  );
}
