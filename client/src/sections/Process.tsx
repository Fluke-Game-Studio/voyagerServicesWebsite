import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { ProcessJourney } from './ProcessJourney'

export function Process() {
  return (
    <Section
      id="process"
      eyebrow="Operating Process"
      title="One route, eight steps"
      intro="We take each customer from assessment to final delivery — and the manufacturer never has to manage the operational handoffs in between."
      headerClassName="mb-2 md:mb-3"
    >
      <ProcessJourney />

      <Reveal className="mt-3">
        <p className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-bg-soft)] p-3 text-xs leading-relaxed text-[var(--color-ink-muted)]">
          <span className="font-semibold text-[var(--color-ink)]">Optional services</span> slot in without changing
          the core route — customs coordination, rework, returns, cross-dock, expedited transportation and reporting
          packages.
        </p>
      </Reveal>
    </Section>
  )
}
