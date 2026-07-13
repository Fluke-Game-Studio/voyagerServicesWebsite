import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { staggerContainer, fadeUp, viewportOnce } from '@/lib/motion'
import { DIFFERENTIATORS } from '@/lib/content'

const NOT = ['Just warehouse space', 'A vendor directory', 'Consulting slides only', 'Another parcel platform']

export function WhyVoyager() {
  return (
    <Section
      eyebrow="Why Voyager"
      title="Not warehouse space — a managed operating layer"
      intro="The market validates demand. Voyager's wedge is a manufacturer-first control tower with transparent execution and a partner-agnostic network."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <Reveal>
          <div className="h-full rounded-[var(--radius-card)] border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/[0.05] p-7">
            <p className="label-mono mb-5">What Voyager is</p>
            <motion.ul
              variants={staggerContainer(0.07)}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="space-y-3.5"
            >
              {DIFFERENTIATORS.map((item) => (
                <motion.li key={item} variants={fadeUp} className="flex items-center gap-3 text-[var(--color-ink)]">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[var(--color-accent)] text-[var(--color-on-accent)]">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="h-full rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-7">
            <p className="label-mono mb-5 !text-[var(--color-ink-faint)]">What Voyager is not</p>
            <ul className="space-y-3.5">
              {NOT.map((item) => (
                <li key={item} className="flex items-center gap-3 text-[var(--color-ink-muted)]">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-[var(--color-border)] text-[var(--color-ink-faint)]">
                    <X className="h-3.5 w-3.5" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-[var(--color-border)] pt-5 text-sm leading-relaxed text-[var(--color-ink-muted)]">
              Closest analogs — Flexe, Stord, Flowspace — validate flexible warehousing + tech. Voyager differentiates
              through manufacturing/import focus and transparent execution management.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
