import { Router } from 'express'
import { Contact } from '../models/Contact.js'
import { validateContact } from '../validation.js'
import { isDbConnected } from '../db.js'
import { appendContactToFile } from '../fileStore.js'

const router = Router()

// Lightweight in-memory rate limit: max 5 submissions per IP per 10 minutes.
const WINDOW_MS = 10 * 60 * 1000
const MAX = 5
const hits = new Map()

function rateLimited(ip) {
  const now = Date.now()
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  arr.push(now)
  hits.set(ip, arr)
  return arr.length > MAX
}

router.post('/', async (req, res) => {
  const ip = (req.headers['x-forwarded-for']?.split(',')[0] || req.ip || '').trim()

  if (rateLimited(ip)) {
    return res.status(429).json({ ok: false, message: 'Too many submissions. Please try again later.' })
  }

  const { valid, errors, data } = validateContact(req.body)
  if (!valid) {
    return res.status(400).json({ ok: false, message: 'Please fix the highlighted fields.', errors })
  }

  const record = { ...data, ip }

  try {
    if (isDbConnected()) {
      const saved = await Contact.create(record)
      console.log(`[contact] saved to MongoDB (${saved._id}) — ${data.role} — ${data.email}`)
    } else {
      const saved = await appendContactToFile(record)
      console.log(`[contact] saved to file (${saved._id}) — ${data.role} — ${data.email}`)
    }
    return res.status(201).json({ ok: true, message: 'Thanks — we will be in touch shortly.' })
  } catch (err) {
    console.error('[contact] save failed:', err)
    return res.status(500).json({ ok: false, message: 'Server error saving your message. Please try again.' })
  }
})

export default router
