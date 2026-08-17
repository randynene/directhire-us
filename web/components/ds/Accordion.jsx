'use client';

import { useState } from 'react';
import { Icon } from './Icon';

/* Numbers the items, keeps one open at a time. Real buttons with
   aria-expanded — see design_handoff_directhire_us/README.md Accessibility. */
export function Accordion({ items = [], defaultOpen = 0 }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="accordion">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div className="accordion-item" data-open={isOpen} key={item.question}>
            <button
              type="button"
              className="accordion-item__trigger"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? -1 : i)}
            >
              <span className="accordion-item__index">{String(i + 1).padStart(2, '0')}</span>
              <span className="accordion-item__question">{item.question}</span>
              <span className="accordion-item__icon">
                <Icon name={isOpen ? 'minus' : 'plus'} size={18} />
              </span>
            </button>
            {isOpen ? <div className="accordion-item__panel">{item.answer}</div> : null}
          </div>
        );
      })}
    </div>
  );
}
