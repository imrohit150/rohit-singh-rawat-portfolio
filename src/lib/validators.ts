export interface ContactValues {
  name: string;
  email: string;
  message: string;
}

export type ContactErrors = Partial<Record<keyof ContactValues, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const asText = (value: unknown): string => (typeof value === 'string' ? value.trim() : '');

/** Shared by the contact form (browser) and /api/contact (server). */
export function validateContact(input: Partial<Record<keyof ContactValues, unknown>>): {
  values: ContactValues;
  errors: ContactErrors;
} {
  const values: ContactValues = {
    name: asText(input.name),
    email: asText(input.email),
    message: asText(input.message),
  };
  const errors: ContactErrors = {};

  if (values.name.length < 2) errors.name = 'Enter your name.';
  else if (values.name.length > 100) errors.name = 'Keep your name under 100 characters.';

  if (!EMAIL_PATTERN.test(values.email)) errors.email = 'Enter a valid email address.';
  else if (values.email.length > 200) errors.email = 'Keep your email under 200 characters.';

  if (values.message.length < 10) errors.message = 'Write at least 10 characters.';
  else if (values.message.length > 2000) errors.message = 'Keep your message under 2,000 characters.';

  return { values, errors };
}
