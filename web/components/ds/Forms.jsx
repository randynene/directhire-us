'use client';

import { useEffect, useRef, cloneElement, isValidElement } from 'react';
import { Icon } from './Icon';
import { Card } from './Cards';

export function Field({ label, htmlFor, hint, children }) {
  const hintId = htmlFor && hint ? `${htmlFor}-hint` : undefined;
  const child = hintId && isValidElement(children)
    ? cloneElement(children, {
        'aria-describedby': [children.props['aria-describedby'], hintId].filter(Boolean).join(' ') || undefined,
      })
    : children;
  return (
    <div className="field">
      {label ? <label className="field__label" htmlFor={htmlFor}>{label}</label> : null}
      {child}
      {hint ? <span className="field__hint" id={hintId}>{hint}</span> : null}
    </div>
  );
}

export function Input(props) {
  return <input className="form-control" {...props} />;
}

export function Textarea({ rows = 4, ...rest }) {
  return <textarea className="form-control" rows={rows} {...rest} />;
}

export function Select({ options = [], placeholder, ...rest }) {
  return (
    <div className="select-wrap">
      <select className="form-control" {...rest}>
        {placeholder ? <option value="">{placeholder}</option> : null}
        {options.map((o) => {
          const value = typeof o === 'string' ? o : o.value;
          const label = typeof o === 'string' ? o : o.label;
          return <option key={value} value={value}>{label}</option>;
        })}
      </select>
      <span className="select-wrap__chevron" aria-hidden="true" />
    </div>
  );
}

export function Checkbox({ label, id, ...rest }) {
  return (
    <label className="checkbox" htmlFor={id}>
      <input type="checkbox" id={id} {...rest} />
      <span className="checkbox__box"><Icon name="check" size={12} /></span>
      <span className="checkbox__label">{label}</span>
    </label>
  );
}

/* Centred dialog on a heavy navy scrim. Closes on Escape or a scrim click —
   see the useModal hook in components/SearchModal.jsx for the open/close state.
   Focus moves into the dialog on open and returns to whatever triggered it on
   close, matching the reference behavior in static-site/js/main.js. */
export function Modal({ open, title, children, footer, onClose }) {
  const scrimRef = useRef(null);
  const lastFocused = useRef(null);

  useEffect(() => {
    if (!open) return;
    lastFocused.current = document.activeElement;
    const firstField = scrimRef.current && scrimRef.current.querySelector('input, textarea, select, button');
    if (firstField) firstField.focus();

    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      if (lastFocused.current && typeof lastFocused.current.focus === 'function') {
        lastFocused.current.focus();
      }
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      className="modal-scrim"
      role="presentation"
      ref={scrimRef}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <Card radius="lg" border="strong" float role="dialog" aria-modal="true" aria-labelledby={title ? 'modal-title' : undefined} className="modal">
        {title ? <h2 className="modal__title" id="modal-title">{title}</h2> : null}
        <div className="modal__body">{children}</div>
        {footer ? <div className="modal__footer">{footer}</div> : null}
      </Card>
    </div>
  );
}
