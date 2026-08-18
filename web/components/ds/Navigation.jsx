'use client';

import { Wordmark } from './Brand';
import { Button, StatusDot, NavLink } from './Core';
import { useModal } from '../SearchModal';

export function NavBar({ brand = 'CloudEmployee', links = [], cta = 'Start a search' }) {
  const { open } = useModal();
  return (
    <>
      <header className="navbar">
        <div className="navbar__inner">
          <Wordmark name={brand} href="#top" />
          <nav aria-label="Main" className="navbar__nav">
            {links.map((l) => (
              <NavLink key={l.href} href={l.href} active={l.active}>{l.label}</NavLink>
            ))}
          </nav>
          <Button size="md" onClick={() => open()}>{cta}</Button>
        </div>
      </header>
      <div className="scroll-progress" data-progress />
    </>
  );
}

export function Footer({ left, right, rightHref }) {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <span>{left}</span>
        {rightHref ? <a href={rightHref}>{right}</a> : <span>{right}</span>}
      </div>
    </footer>
  );
}

/* Underline tab strip from the candidate report card. */
export function Tabs({ items = [], value, onChange }) {
  return (
    <div className="tabs" role="tablist">
      {items.map((item) => {
        const on = item === value;
        return (
          <button
            key={item}
            type="button"
            role="tab"
            aria-selected={on}
            className="tab"
            onClick={() => onChange && onChange(item)}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}

export function DeRiskBand({ items = [] }) {
  return (
    <div className="derisk-wrap" data-anim="derisk">
      <div className="derisk-band">
        <div className="derisk-band__inner">
          {items.map((item) => (
            <span key={item} className="derisk-band__item">
              <StatusDot />
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
