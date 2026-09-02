const ROLES = ['manufacturer', 'warehouse', 'logistics', 'investor']
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^\+?[\d\s().-]{7,20}$/

/** Server-side validation mirroring the client, returning cleaned data or field errors. */
export function validateContact(body = {}) {
  const errors = {}
  const name = String(body.name ?? '').trim()
  const email = String(body.email ?? '').trim().toLowerCase()
  const company = String(body.company ?? '').trim()
  const phone = String(body.phone ?? '').trim()
  const role = String(body.role ?? '').trim()
  const message = String(body.message ?? '').trim()
  const smsConsent = body.smsConsent === true

  if (name.length < 2) errors.name = 'Please enter your name.'
  if (name.length > 120) errors.name = 'Name is too long.'
  if (!EMAIL_RE.test(email)) errors.email = 'Enter a valid email address.'
  if (phone && !PHONE_RE.test(phone)) errors.phone = 'Enter a valid phone number.'
  // A consent record is only meaningful alongside the number it applies to.
  if (smsConsent && !phone) errors.phone = 'Add a mobile number to receive SMS updates.'
  if (!ROLES.includes(role)) errors.role = 'Please select a valid role.'
  if (message.length < 10) errors.message = 'Please include a short message.'
  if (message.length > 4000) errors.message = 'Message is too long.'

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    data: {
      name,
      email,
      company: company.slice(0, 200),
      phone: phone.slice(0, 32),
      role,
      message,
      smsConsent,
      // The policy commits to keeping SMS consent records, so stamp when it was given.
      smsConsentAt: smsConsent ? new Date() : null,
    },
  }
}
