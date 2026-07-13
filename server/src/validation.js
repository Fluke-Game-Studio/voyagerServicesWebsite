const ROLES = ['manufacturer', 'warehouse', 'logistics', 'investor']
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Server-side validation mirroring the client, returning cleaned data or field errors. */
export function validateContact(body = {}) {
  const errors = {}
  const name = String(body.name ?? '').trim()
  const email = String(body.email ?? '').trim().toLowerCase()
  const company = String(body.company ?? '').trim()
  const role = String(body.role ?? '').trim()
  const message = String(body.message ?? '').trim()

  if (name.length < 2) errors.name = 'Please enter your name.'
  if (name.length > 120) errors.name = 'Name is too long.'
  if (!EMAIL_RE.test(email)) errors.email = 'Enter a valid email address.'
  if (!ROLES.includes(role)) errors.role = 'Please select a valid role.'
  if (message.length < 10) errors.message = 'Please include a short message.'
  if (message.length > 4000) errors.message = 'Message is too long.'

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    data: { name, email, company: company.slice(0, 200), role, message },
  }
}
