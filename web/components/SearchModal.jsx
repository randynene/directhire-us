'use client';

import { createContext, useContext, useState } from 'react';
import { Modal, Field, Input, Select, Textarea, Checkbox } from './ds/Forms';
import { Button, CheckItem } from './ds/Core';
import { us } from '@/lib/content/us';

const ModalContext = createContext(null);

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModal must be used within <ModalProvider>');
  return ctx;
}

export function ModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [updates, setUpdates] = useState(true);

  const open = () => { setSent(false); setIsOpen(true); };
  const close = () => setIsOpen(false);

  return (
    <ModalContext.Provider value={{ isOpen, open, close }}>
      {children}
      <SearchModal
        isOpen={isOpen}
        sent={sent}
        updates={updates}
        onToggleUpdates={() => setUpdates((u) => !u)}
        onSend={() => setSent(true)}
        onClose={close}
      />
    </ModalContext.Provider>
  );
}

function SearchModal({ isOpen, sent, updates, onToggleUpdates, onSend, onClose }) {
  const copy = us.modal;

  const footer = sent ? (
    <Button size="sm" withArrow={false} onClick={onClose}>Close</Button>
  ) : (
    <>
      <Button size="sm" onClick={onSend}>Send the brief</Button>
      <Button size="sm" variant="secondary" withArrow={false} onClick={onClose}>Cancel</Button>
    </>
  );

  const body = sent ? (
    <ul style={{ margin: 0, padding: 0, display: 'grid', gap: 11 }}>
      {copy.sentChecks.map((c) => <CheckItem key={c}>{c}</CheckItem>)}
    </ul>
  ) : (
    <>
      <span>{copy.intro}</span>
      <Field label="Work email" htmlFor="dh-email">
        <Input id="dh-email" type="email" placeholder="you@company.com" />
      </Field>
      <Field label="Seniority" htmlFor="dh-level">
        <Select id="dh-level" placeholder="Choose one" options={['Mid', 'Senior', 'Staff', 'Principal']} />
      </Field>
      <Field label="The role" htmlFor="dh-role" hint="Stack, first project, and what good looks like in month three.">
        <Textarea id="dh-role" rows={3} placeholder="Senior backend engineer, Go and Postgres…" />
      </Field>
      <Checkbox id="dh-updates" label="Send me weekly updates, news or not" checked={updates} onChange={onToggleUpdates} />
    </>
  );

  return (
    <Modal open={isOpen} title={sent ? copy.sentTitle : copy.title} footer={footer} onClose={onClose}>
      {body}
    </Modal>
  );
}
