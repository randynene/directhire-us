'use client';

import { useEffect } from 'react';
import { Icon } from './Icon';
import { Card } from './Cards';

export function Field({ label, htmlFor, hint, children }) {
  return (
    <div className="field">
      {label ? <label className="field__label" htmlFor={htmlFor}>{label}</label> : null}
      {children}
      {hint ? <span className="field__hint">{hint}</span> : null}
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
   see the useModal hook in components/SearchModal.jsx for the open/close state. */
export function Modal({ open, title, children, footer, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      className="modal-scrim"
      role="presentation"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <Card radius="lg" border="strong" float role="dialog" aria-modal="true" aria-labelledby="modal-title" className="modal">
        {title ? <h2 className="modal__title" id="modal-title">{title}</h2> : null}
        <div className="modal__body">{children}</div>
        {footer ? <div className="modal__footer">{footer}</div> : null}
      </Card>
    </div>
  );
}
