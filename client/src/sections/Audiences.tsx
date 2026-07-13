import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { staggerContainer, fadeUp, viewportOnce } from '@/lib/motion'
import { AUDIENCES } from '@/lib/content'

export function Audiences() {
  return (
    <Section
      id="audiences"
      eyebrow="Who We Serve"
      title="Built for four kinds of partners"
      intro="Wherever you sit in the network, there's a way to work with Voyager. Pick your role and we'll route you to the right conversation."
    >
      <motion.div
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid gap-4 sm:grid-cols-2"
      >
        {AUDIENCES.map((a) => (
          <motion.div key={a.value} variants={fadeUp}>
            <Link
              to={`/contact?role=${a.value}`}
              className="card-hover group flex h-full flex-col rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-7"
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-soft)] text-[var(--color-accent)]">
                  <a.icon className="h-5 w-5" />
                </span>
                <ArrowUpRight className="h-5 w-5 text-[var(--color-ink-faint)] transition-colors group-hover:text-[var(--color-accent)]" />
              </div>
              <h3 className="font-display text-xl font-semibold text-[var(--color-ink)]">{a.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-muted)]">{a.body}</p>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}
