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
      className="py-6 md:py-8 lg:py-10"
    >
      <motion.div
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid gap-3 sm:grid-cols-2"
      >
        {GAP_POINTS.map((point) => (
          <motion.div
            key={point.n}
            variants={fadeUp}
            className="card-hover group relative overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="grid h-8 w-8 place-items-center rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-soft)] text-[var(--color-accent)]">
                <point.icon className="h-4 w-4" />
              </span>
              <span className="font-mono text-xs text-[var(--color-ink-faint)]">{point.n}</span>
            </div>
            <h3 className="font-display text-sm font-semibold text-[var(--color-ink)]">{point.title}</h3>
            <p className="mt-1.5 text-xs leading-relaxed text-[var(--color-ink-muted)]">{point.body}</p>
          </motion.div>
        ))}
      </motion.div>

      <Reveal className="mt-4">
        <div className="flex items-start gap-3 rounded-[var(--radius-card)] border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/[0.06] p-4">
          <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent)]" />
          <p className="text-sm text-[var(--color-ink)]">
            <span className="font-semibold">Voyager's opportunity: </span>
            <span className="text-[var(--color-ink-muted)]">
              become the control layer that coordinates the network and owns the customer experience.
            </span>
          </p>
        </div>
      </Reveal>
    </Section>
  )
}

