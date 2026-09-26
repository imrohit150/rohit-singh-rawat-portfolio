'use client';

import { useState, type FormEvent, type ReactNode } from 'react';
import { LuSend } from 'react-icons/lu';
import { Button } from '@/components/ui/Button';
import { profile } from '@/data/profile';
import { validateContact, type ContactErrors } from '@/lib/validators';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const inputClass =
  'w-full rounded-xl border border-line bg-surface px-4 py-3 text-ink placeholder:text-muted/70 transition-colors focus:border-accent focus:outline-none';

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-red-500">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<ContactErrors>({});
  const [serverError, setServerError] = useState('');
  const [sentTo, setSentTo] = useState('');

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const { values, errors: found } = validateContact({
      name: data.get('name'),
      email: data.get('email'),
      message: data.get('message'),
    });
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus('sending');
    setServerError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, company: data.get('company') ?? '' }),
      });
      const result = (await response.json().catch(() => ({}))) as { error?: string };

      if (!response.ok) {
        setServerError(result.error ?? 'Something went wrong. Try again in a moment.');
        setStatus('error');
        return;
      }

      setSentTo(values.email);
      form.reset();
      setStatus('sent');
    } catch {
      setServerError('Could not reach the server. Check your connection and try again.');
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div role="status" className="rounded-2xl border border-line bg-surface p-8">
        <h3 className="font-display text-xl font-semibold">Message sent</h3>
        <p className="mt-2 text-muted">
          Thanks for reaching out. I&apos;ll reply to {sentTo}.
        </p>
        <Button variant="secondary" className="mt-6" onClick={() => setStatus('idle')}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <Field id="name" label="Name" error={errors.name}>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Your name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'name-error' : undefined}
          className={inputClass}
          required
          aria-required="true"
        />
      </Field>

      <Field id="email" label="Email" error={errors.email}>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'email-error' : undefined}
          className={inputClass}
          required
          aria-required="true"
        />
      </Field>

      <Field id="message" label="Message" error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={6}
          placeholder="What would you like to talk about?"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className={inputClass}
          required
          aria-required="true"
        />
      </Field>

      {/* Honeypot: real visitors never see or fill this. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      {status === 'error' ? (
        <p role="alert" className="text-sm text-red-500">
          {serverError} You can also email{' '}
          <a href={`mailto:${profile.email}`} className="underline underline-offset-4">
            {profile.email}
          </a>
          .
        </p>
      ) : null}

      <Button type="submit" disabled={status === 'sending'} icon={<LuSend size={16} aria-hidden />}>
        {status === 'sending' ? 'Sending' : 'Send message'}
      </Button>
    </form>
  );
}
