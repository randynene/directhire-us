import { iconData } from './icon-data';

/* Renders one glyph from the file's icon set. Stroke icons inherit currentColor. */
export function Icon({ name, size = 18, className = '', title, ...rest }) {
  const icon = iconData[name];
  if (!icon) return null;
  const scale = size / parseFloat(icon.viewBox.split(' ')[2]);
  const strokeWidth = icon.fill ? undefined : icon.stroke / scale;

  return (
    <svg
      viewBox={icon.viewBox}
      width={size}
      height={size}
      className={`icon${icon.fill ? ' icon--fill' : ''} ${className}`.trim()}
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
      focusable="false"
      strokeWidth={strokeWidth}
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      <path d={icon.body} />
    </svg>
  );
}
