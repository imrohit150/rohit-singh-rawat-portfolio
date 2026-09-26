import { NextResponse } from 'next/server';
import { profile } from '@/data/profile';
import { validateContact } from '@/lib/validators';

export const runtime = 'nodejs';

// Best-effort limiter: 5 messages per IP per 10 minutes (resets when the server restarts).
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  // Honeypot: bots fill this hidden field. Pretend it worked and drop the message.
  if (typeof body.company === 'string' && body.company.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many messages. Try again in a few minutes.' },
      { status: 429 },
    );
  }

  const { values, errors } = validateContact(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: 'Check the form fields and try again.', errors }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? profile.email;
  const from = process.env.CONTACT_FROM_EMAIL ?? 'Portfolio <onboarding@resend.dev>';

  if (!apiKey) {
    return NextResponse.json(
      { error: "The contact form isn't set up yet." },
      { status: 503 },
    );
  }

  let response: Response;
  try {
    response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: values.email,
        subject: `Portfolio message from ${values.name}`,
        text: `Name: ${values.name}\nEmail: ${values.email}\n\n${values.message}`,
      }),
    });
  } catch (error) {
    console.error('Resend request failed:', error);
    return NextResponse.json(
      { error: 'The email service could not be reached right now.' },
      { status: 502 },
    );
  }

  if (!response.ok) {
    const detail = await response.text();
    console.error('Resend rejected contact email:', response.status, detail);
    return NextResponse.json(
      { error: 'The message could not be sent right now.' },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
