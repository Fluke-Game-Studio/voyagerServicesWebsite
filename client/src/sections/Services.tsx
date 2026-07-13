import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { staggerContainer, fadeUp, viewportOnce } from '@/lib/motion'
import { SERVICES } from '@/lib/content'

export function Services() {
  return (
    <Section
      id="services"
      eyebrow="Service Scope"
      title="A modular menu that grows with you"
      intro="Start small and expand. Each capability can be switched on as the customer scales — from a single service to a full managed operation."
    >
      <motion.div
        variants={staggerContainer(0.09)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
      >
        {SERVICES.map((service, i) => (
          <motion.div
            key={service.title}
            variants={fadeUp}
            className={`card-hover rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 ${
              i === 4 ? 'lg:col-span-1' : ''
            }`}
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-soft)] text-[var(--color-accent)]">
                <service.icon className="h-5 w-5" />
              </span>
              <h3 className="font-display text-lg font-semibold text-[var(--color-ink)]">{service.title}</h3>
            </div>
            <ul className="space-y-2.5">
              {service.items.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-[var(--color-ink-muted)]">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent)]" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}
