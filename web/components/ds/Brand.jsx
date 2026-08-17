export function Eyebrow({ children, size = 'sm', className = '', style, ...rest }) {
  return (
    <span className={`eyebrow${size === 'lg' ? ' eyebrow--lg' : ''} ${className}`.trim()} style={style} {...rest}>
      {children}
    </span>
  );
}

const HEADING_SIZE_CLASS = { h1: 'heading--h1', display: 'heading--display', h2: 'heading--h2', h2sm: 'heading--h2sm' };

/* The signature heading: bold Inter with one clause in Source Serif 4 Italic,
   always lime (`emphasis`). `after` is plain text following the clause. */
export function SectionHeading({ children, emphasis, after, size = 'h2', align = 'left', as: Tag = 'h2', className = '', style, ...rest }) {
  return (
    <Tag
      className={`heading ${HEADING_SIZE_CLASS[size] || ''}${align === 'center' ? ' heading--center' : ''} ${className}`.trim()}
      style={style}
      {...rest}
    >
      {children}
      {emphasis ? <> <em>{emphasis}</em></> : null}
      {after ? <> {after}</> : null}
    </Tag>
  );
}

export function Wordmark({ name = 'CloudEmployee', href, className = '' }) {
  const content = (
    <span className={`wordmark ${className}`.trim()}>
      <span className="wordmark__ring" aria-hidden="true" />
      <span className="wordmark__name">{name}</span>
    </span>
  );
  return href ? <a href={href} style={{ textDecoration: 'none' }}>{content}</a> : content;
}
