import { randomUUID } from 'node:crypto';
import { NextResponse } from 'next/server';
import { profile } from '@/data/profile';
import { validateContact } from '@/lib/validators';

export const runtime = 'nodejs';

// Best-effort limiter: per instance, not shared across serverless instances.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const MAX_TRACKED_IPS = 5000;
const hits = new Map<string, { count: number; resetAt: number }>();
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  for (const [key, entry] of hits) if (entry.resetAt <= now) hits.delete(key);
  const entry = hits.get(ip);
  if (entry) {
    if (entry.count >= MAX_PER_WINDOW) return true;
    entry.count += 1;
    return false;
  }
  if (hits.size >= MAX_TRACKED_IPS) return true;
  hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
  return false;
}

function reply(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, { status, headers: { 'Cache-Control': 'private, no-store' } });
}

export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return reply({ error: 'Invalid request.' }, 400);
  }
  const input = body as Record<string, unknown>;
  // Honeypot: pretend it worked and discard the message without sending email.
  if (typeof input.company === 'string' && input.company.length > 0) return reply({ ok: true });

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (isRateLimited(ip)) return reply({ error: 'Too many messages. Try again in a few minutes.' }, 429);

  const { values, errors } = validateContact(input);
  if (Object.keys(errors).length > 0) return reply({ error: 'Check the form fields and try again.', errors }, 400);

  const requestKey = request.headers.get('Idempotency-Key');
  if (requestKey !== null && !UUID.test(requestKey)) return reply({ error: 'Invalid submission. Refresh the page and try again.' }, 400);

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim() || profile.email;
  const from = process.env.CONTACT_FROM_EMAIL?.trim() || 'Portfolio <onboarding@resend.dev>';
  if (!apiKey) return reply({ error: 'The contact form is temporarily unavailable. Please email me directly.' }, 503);

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': `portfolio-contact/${requestKey ?? randomUUID()}`,
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: values.email,
        subject: `Portfolio message from ${values.name}`,
        text: `Name: ${values.name}\nEmail: ${values.email}\n\n${values.message}`,
      }),
      cache: 'no-store',
      signal: AbortSignal.timeout(15_000),
    });
    const result = (await response.json().catch(() => null)) as { id?: unknown } | null;
    if (!response.ok || typeof result?.id !== 'string' || !result.id) {
      console.error('Contact email not accepted. HTTP status:', response.status);
      return reply({ error: 'The message could not be submitted right now. Please try again or email me directly.' }, 502);
    }
    // Provider acceptance does not confirm delivery to the recipient's inbox.
    return reply({ ok: true });
  } catch {
    console.error('Contact email request failed or timed out.');
    return reply({ error: 'The submission could not be confirmed. Please try again or email me directly.' }, 502);
  }
}
