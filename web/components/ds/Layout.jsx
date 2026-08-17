import { SectionHeading } from './Brand';

export function Container({ children, className = '', ...rest }) {
  return <div className={`container ${className}`.trim()} {...rest}>{children}</div>;
}

/* Standard section shell: kicker, heading with serif emphasis, lead, then
   content. Section rhythm is a uniform 140px top / 0 bottom per the design
   review (see design_handoff_directhire_us/README.md). */
export function Section({ id, eyebrow, title, emphasis, after, lead, headingSize = 'h2', align = 'left', className = '', children }) {
  return (
    <section id={id} className={`section ${className}`.trim()}>
      <Container>
        <div className={`section__head${align === 'center' ? ' section__head--center' : ''}`} data-sec-head>
          {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
          {title ? (
            <SectionHeading size={headingSize} emphasis={emphasis} after={after} align={align} style={{ whiteSpace: 'pre-line' }}>
              {title}
            </SectionHeading>
          ) : null}
          {lead ? <p className="section__lead">{lead}</p> : null}
        </div>
        {children ? <div className="section__body">{children}</div> : null}
      </Container>
    </section>
  );
}
