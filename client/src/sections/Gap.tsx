import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { staggerContainer, fadeUp, viewportOnce } from '@/lib/motion'
import { GAP_POINTS } from '@/lib/content'

export function Gap() {
  return (
    <Section
      id="gap"
      eyebrow="The Gap"
      title="U.S. logistics is fragmented"
      intro="Manufacturers entering the U.S. need execution — not just a list of vendors. Today, everything lives in separate silos with no single owner."
    >
      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid gap-4 sm:grid-cols-2"
      >
        {GAP_POINTS.map((point) => (
          <motion.div
            key={point.n}
            variants={fadeUp}
            className="card-hover group relative overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6"
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="grid h-11 w-11 place-items-center rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-soft)] text-[var(--color-accent)]">
                <point.icon className="h-5 w-5" />
              </span>
              <span className="font-mono text-sm text-[var(--color-ink-faint)]">{point.n}</span>
            </div>
            <h3 className="font-display text-lg font-semibold text-[var(--color-ink)]">{point.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-muted)]">{point.body}</p>
          </motion.div>
        ))}
      </motion.div>

      <Reveal className="mt-8">
        <div className="flex flex-col items-start gap-3 rounded-[var(--radius-card)] border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/[0.06] p-6 sm:flex-row sm:items-center">
          <ArrowRight className="h-5 w-5 shrink-0 text-[var(--color-accent)]" />
          <p className="text-[var(--color-ink)]">
            <span className="font-semibold">Voyager's opportunity:</span>{' '}
            <span className="text-[var(--color-ink-muted)]">
              become the control layer that coordinates the network and owns the customer experience.
            </span>
          </p>
        </div>
      </Reveal>
    </Section>
  )
}
