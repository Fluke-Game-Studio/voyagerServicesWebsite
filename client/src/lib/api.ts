export interface ContactPayload {
  name: string
  email: string
  company?: string
  role: string
  message: string
}

export interface ContactResponse {
  ok: boolean
  message?: string
  errors?: Record<string, string>
}

/** POST the contact form. In dev, Vite proxies /api to the Express server on :5000. */
export async function submitContact(payload: ContactPayload): Promise<ContactResponse> {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = (await res.json().catch(() => ({}))) as ContactResponse
  if (!res.ok) {
    return { ok: false, message: data.message ?? 'Something went wrong. Please try again.', errors: data.errors }
  }
  return { ...data, ok: true }
}
