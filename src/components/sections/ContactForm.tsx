'use client';

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { LuSend } from 'react-icons/lu';
import { Button } from '@/components/ui/Button';
import { profile } from '@/data/profile';
import { validateContact, type ContactErrors } from '@/lib/validators';

type Status = 'idle' | 'sending' | 'sent' | 'error';
type ContactResponse = { ok?: boolean; error?: string; errors?: ContactErrors };

const inputClass =
  'w-full rounded-xl border border-line bg-surface px-4 py-3 text-base text-ink placeholder:text-muted/70 transition-colors focus:border-accent disabled:opacity-70 sm:text-sm';

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">{label}</label>
      {children}
      {error ? <p id={`${id}-error`} className="mt-2 text-sm text-red-500">{error}</p> : null}
    </div>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<ContactErrors>({});
  const [serverError, setServerError] = useState('');
  const [sentTo, setSentTo] = useState('');
  const inFlight = useRef(false);
  const attempt = useRef<{ body: string; key: string } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (status === 'sent') successRef.current?.focus();
    if (status === 'error') {
      const firstError = Object.keys(errors)[0];
      const field = firstError ? formRef.current?.elements.namedItem(firstError) : null;
      if (field instanceof HTMLElement) field.focus();
      else errorRef.current?.focus();
    }
  }, [status, errors]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const { values, errors: found } = validateContact({
      name: data.get('name'),
      email: data.get('email'),
      message: data.get('message'),
    });
    setErrors(found);
    setServerError('');
    const firstError = Object.keys(found)[0];
    if (firstError) {
      setStatus('error');
      return;
    }

    // A ref closes the gap before React renders the disabled submit button.
    inFlight.current = true;
    setStatus('sending');
    try {
      const body = JSON.stringify({ ...values, company: data.get('company') ?? '' });
      // Reuse the key when retrying the same message after an uncertain response.
      let submission = attempt.current;
      if (!submission || submission.body !== body) {
        submission = { body, key: crypto.randomUUID() };
        attempt.current = submission;
      }
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Idempotency-Key': submission.key },
        body,
        cache: 'no-store',
        signal: AbortSignal.timeout(25_000),
      });
      const result = (await response.json().catch(() => null)) as ContactResponse | null;
      if (!response.ok || result?.ok !== true) {
        const fieldErrors: ContactErrors = {};
        for (const field of ['name', 'email', 'message'] as const) {
          const error = result?.errors?.[field];
          if (typeof error === 'string') fieldErrors[field] = error;
        }
        setErrors(fieldErrors);
        setServerError(typeof result?.error === 'string' ? result.error : 'Your submission could not be confirmed. Try again in a moment.');
        setStatus('error');
        return;
      }
      setSentTo(values.email);
      form.reset();
      attempt.current = null;
      setStatus('sent');
    } catch {
      setServerError('Your submission could not be confirmed. Your message is still here; try again or contact me directly.');
      setStatus('error');
    } finally {
      inFlight.current = false;
    }
  }

  if (status === 'sent') {
    return (
      <div role="status" className="rounded-2xl border border-accent/30 bg-surface p-6 sm:p-8">
        <h3 ref={successRef} tabIndex={-1} className="font-display text-xl font-semibold">Message submitted</h3>
        <p className="mt-2 break-words text-sm leading-relaxed text-muted">
          Thanks for reaching out. I&apos;ll reply to {sentTo}.
        </p>
        <Button type="button" variant="secondary" className="mt-6" onClick={() => setStatus('idle')}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-label="Contact Rohit" aria-busy={status === 'sending'}>
      <fieldset disabled={status === 'sending'} className="min-w-0 space-y-4">
        <legend className="sr-only">Send a message</legend>
        <Field id="name" label="Name" error={errors.name}>
          <input
            id="name" name="name" type="text" autoComplete="name" placeholder="Your name" maxLength={100}
            aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined}
            className={inputClass} required
          />
        </Field>
        <Field id="email" label="Email" error={errors.email}>
          <input
            id="email" name="email" type="email" autoComplete="email" placeholder="you@company.com" maxLength={200}
            aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined}
            className={inputClass} required
          />
        </Field>
        <Field id="message" label="Message" error={errors.message}>
          <textarea
            id="message" name="message" rows={5} placeholder="Tell me about the role, team or product." maxLength={2000}
            aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'message-error message-hint' : 'message-hint'}
            className={inputClass} required
          />
        </Field>
        <p id="message-hint" className="text-xs text-muted">10 to 2,000 characters. I&apos;ll reply to the email you provide.</p>
        {/* Honeypot: real visitors never see or fill this. */}
        <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />
        <Button type="submit" disabled={status === 'sending'} className="w-full sm:w-auto" icon={<LuSend size={16} aria-hidden />}>
          {status === 'sending' ? 'Sending message...' : 'Send message'}
        </Button>
      </fieldset>
      <p role="status" aria-live="polite" className="sr-only">{status === 'sending' ? 'Sending your message.' : ''}</p>
      {status === 'error' ? (
        <p ref={errorRef} tabIndex={-1} role="alert" className="mt-4 text-sm leading-relaxed text-red-500">
          {serverError || 'Please check the highlighted fields.'} You can also email{' '}
          <a href={`mailto:${profile.email}`} className="break-all underline underline-offset-4">{profile.email}</a>.
        </p>
      ) : null}
    </form>
  );
}
