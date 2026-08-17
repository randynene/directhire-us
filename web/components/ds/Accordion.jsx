'use client';

import { useState } from 'react';
import { Icon } from './Icon';

/* One row: a real <button> trigger with aria-expanded and a plus/minus
   glyph, plus the answer panel when open. Exported on its own so it can be
   reused/composed outside the numbered FAQ list if needed. */
export function AccordionItem({ index = 0, question, answer, isOpen = false, onToggle }) {
  return (
    <div className="accordion-item" data-open={isOpen}>
      <button
        type="button"
        className="accordion-item__trigger"
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        <span className="accordion-item__index">{String(index + 1).padStart(2, '0')}</span>
        <span className="accordion-item__question">{question}</span>
        <span className="accordion-item__icon">
          <Icon name={isOpen ? 'minus' : 'plus'} size={18} />
        </span>
      </button>
      {isOpen ? <div className="accordion-item__panel">{answer}</div> : null}
    </div>
  );
}

/* Numbers the items, keeps one open at a time. `defaultOpen` (an index)
   lets the first item start open — see design_handoff_directhire_us/README.md
   Accessibility. */
export function Accordion({ items = [], defaultOpen = 0 }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="accordion">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <AccordionItem
            key={item.question}
            index={i}
            question={item.question}
            answer={item.answer}
            isOpen={isOpen}
            onToggle={() => setOpen(isOpen ? -1 : i)}
          />
        );
      })}
    </div>
  );
}
