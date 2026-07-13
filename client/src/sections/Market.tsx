import { motion } from 'framer-motion'
import { Section } from '@/components/ui/Section'
import { CountUp } from '@/components/ui/CountUp'
import { staggerContainer, fadeUp, viewportOnce } from '@/lib/motion'
import { MARKET_STATS, MARKET_WHY } from '@/lib/content'

export function Market() {
  return (
    <div className="relative">
      {/* faint grid backdrop carries the telemetry motif */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.35]" />
      <Section
        id="market"
        eyebrow="Market & Timing"
        title="A large market, opening now"
        intro="Massive logistics spend plus newly-flexible industrial capacity creates room for a managed, asset-light model."
        className="relative py-6 md:py-8 lg:py-10"
      >
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid gap-4 sm:grid-cols-3"
        >
          {MARKET_STATS.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-7"
            >
              <div className="font-display text-5xl font-bold tracking-tight text-[var(--color-ink)] md:text-6xl">
                <CountUp
                  value={stat.value}
                  decimals={stat.decimals}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-muted)]">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-10 grid gap-x-10 gap-y-6 sm:grid-cols-2"
        >
          <motion.h3 variants={fadeUp} className="font-display text-sm font-semibold uppercase tracking-widest text-[var(--color-accent)] sm:col-span-2">
            Why now
          </motion.h3>
          {MARKET_WHY.map((item) => (
            <motion.div key={item.title} variants={fadeUp} className="border-t border-[var(--color-border)] pt-4">
              <h4 className="font-display text-base font-semibold text-[var(--color-ink)]">{item.title}</h4>
              <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-ink-muted)]">{item.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </Section>
    </div>
  )
}
