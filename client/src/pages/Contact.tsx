import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Loader2, Mail, ShieldCheck, Clock, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { staggerContainer, fadeUp } from '@/lib/motion'
import { AUDIENCES, BRAND } from '@/lib/content'
import { submitContact } from '@/lib/api'
import { cn } from '@/lib/utils'

type Status = 'idle' | 'submitting' | 'success' | 'error'
const ROLES = AUDIENCES.map((a) => ({ value: a.value, label: a.title }))
const isValidRole = (r: string | null): boolean => ROLES.some((x) => x.value === r)

const ASSURANCES = [
  { icon: ShieldCheck, text: 'Transparent pricing — actual operating costs plus a clearly defined Voyager fee.' },
  { icon: Clock, text: 'We respond within two business days with clear next steps for your operation.' },
  { icon: Mail, text: 'No spam, ever. Your details are used only to scope your operation.' },
]

export function Contact() {
  const [params] = useSearchParams()
  const initialRole = params.get('role')
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    role: isValidRole(initialRole) ? (initialRole as string) : 'manufacturer',
    message: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<Status>('idle')
  const [serverMsg, setServerMsg] = useState('')

  const set = (key: string, value: string) => {
    setForm((f) => ({ ...f, [key]: value }))
    setErrors((e) => ({ ...e, [key]: '' }))
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (form.name.trim().length < 2) e.name = 'Please enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address.'
    if (form.message.trim().length < 10) e.message = 'Tell us a little more (10+ characters).'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    if (!validate()) return
    setStatus('submitting')
    setServerMsg('')
    const res = await submitContact(form)
    if (res.ok) {
      setStatus('success')
    } else {
      setStatus('error')
      setServerMsg(res.message ?? 'Something went wrong.')
      if (res.errors) setErrors(res.errors)
    }
  }

  const inputBase =
    'w-full rounded-xl border bg-[var(--color-bg-soft)] px-4 py-3 text-[var(--color-ink)] placeholder:text-[var(--color-ink-faint)] transition-colors focus:outline-none focus:border-[var(--color-accent)]'

  return (
    <div className="relative min-h-screen overflow-hidden pt-28">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.3]" />
      <div className="pointer-events-none absolute -top-32 right-0 h-72 w-72 rounded-full bg-[var(--color-accent)] opacity-15 blur-[120px]" />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 pb-24 lg:grid-cols-[1fr_1.1fr]">
        {/* left: pitch + assurances */}
        <motion.div variants={staggerContainer(0.1)} initial="hidden" animate="show" className="lg:pt-6">
          <motion.p variants={fadeUp} className="label-mono mb-3">
            Contact
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-[var(--color-ink)] md:text-5xl"
          >
            Let's get your products moving
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-5 max-w-md text-lg leading-relaxed text-[var(--color-ink-muted)]">
            Tell us about your product and where it needs to go. We'll come back with a clear plan for storing and
            distributing it in the U.S. — starting with your first shipment.
          </motion.p>

          <motion.ul variants={staggerContainer(0.08, 0.2)} className="mt-10 space-y-5">
            {ASSURANCES.map((a) => (
              <motion.li key={a.text} variants={fadeUp} className="flex items-start gap-3.5">
                <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-accent)]">
                  <a.icon className="h-4.5 w-4.5" />
                </span>
                <p className="text-sm leading-relaxed text-[var(--color-ink-muted)]">{a.text}</p>
              </motion.li>
            ))}
          </motion.ul>

          <motion.a
            variants={fadeUp}
            href={`mailto:${BRAND.email}`}
            className="mt-10 inline-flex items-center gap-2 font-mono text-sm text-[var(--color-ink-muted)] hover:text-[var(--color-accent)]"
          >
            <Mail className="h-4 w-4" /> {BRAND.email}
          </motion.a>
        </motion.div>

        {/* right: form card */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="glass-raised rounded-[var(--radius-card)] p-6 md:p-8">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center py-14 text-center"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 14 }}
                    className="grid h-16 w-16 place-items-center rounded-full bg-[var(--color-success)]/15 text-[var(--color-success)]"
                  >
                    <CheckCircle2 className="h-8 w-8" />
                  </motion.span>
                  <h3 className="mt-6 font-display text-2xl font-semibold text-[var(--color-ink)]">Message received</h3>
                  <p className="mt-2 max-w-sm text-[var(--color-ink-muted)]">
                    Thanks, {form.name.split(' ')[0] || 'there'}. We'll be in touch within two business days.
                  </p>
                  <button
                    onClick={() => {
                      setStatus('idle')
                      setForm({ name: '', email: '', company: '', role: form.role, message: '' })
                    }}
                    className="mt-8 text-sm text-[var(--color-accent)] hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={onSubmit}
                  noValidate
                  className="space-y-5"
                >
                  {/* role selector */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[var(--color-ink)]">I am a…</label>
                    <div className="grid grid-cols-2 gap-2">
                      {ROLES.map((r) => (
                        <button
                          key={r.value}
                          type="button"
                          onClick={() => set('role', r.value)}
                          className={cn(
                            'rounded-xl border px-3 py-2.5 text-sm font-medium transition-all',
                            form.role === r.value
                              ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-ink)]'
                              : 'border-[var(--color-border)] bg-[var(--color-bg-soft)] text-[var(--color-ink-muted)] hover:border-[var(--color-accent)]/50',
                          )}
                        >
                          {r.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Full name" error={errors.name}>
                      <input
                        className={cn(inputBase, errors.name ? 'border-[var(--color-danger)]' : 'border-[var(--color-border)]')}
                        value={form.name}
                        onChange={(e) => set('name', e.target.value)}
                        placeholder="Jane Doe"
                        autoComplete="name"
                      />
                    </Field>
                    <Field label="Work email" error={errors.email}>
                      <input
                        type="email"
                        className={cn(inputBase, errors.email ? 'border-[var(--color-danger)]' : 'border-[var(--color-border)]')}
                        value={form.email}
                        onChange={(e) => set('email', e.target.value)}
                        placeholder="jane@company.com"
                        autoComplete="email"
                      />
                    </Field>
                  </div>

                  <Field label="Company" optional>
                    <input
                      className={cn(inputBase, 'border-[var(--color-border)]')}
                      value={form.company}
                      onChange={(e) => set('company', e.target.value)}
                      placeholder="Company name"
                      autoComplete="organization"
                    />
                  </Field>

                  <Field label="How can we help?" error={errors.message}>
                    <textarea
                      rows={4}
                      className={cn(inputBase, 'resize-none', errors.message ? 'border-[var(--color-danger)]' : 'border-[var(--color-border)]')}
                      value={form.message}
                      onChange={(e) => set('message', e.target.value)}
                      placeholder="Product type, volumes, destination markets, timeline…"
                    />
                  </Field>

                  {status === 'error' && serverMsg && (
                    <p className="rounded-lg border border-[var(--color-danger)]/40 bg-[var(--color-danger)]/10 px-4 py-2.5 text-sm text-[var(--color-danger)]">
                      {serverMsg}
                    </p>
                  )}

                  <Button type="submit" size="lg" className="w-full" disabled={status === 'submitting'}>
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                      </>
                    ) : (
                      <>
                        Send message <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function Field({
  label,
  error,
  optional,
  children,
}: {
  label: string
  error?: string
  optional?: boolean
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="mb-2 flex items-center justify-between text-sm font-medium text-[var(--color-ink)]">
        {label}
        {optional && <span className="text-xs font-normal text-[var(--color-ink-faint)]">optional</span>}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs text-[var(--color-danger)]">{error}</p>}
    </div>
  )
}
