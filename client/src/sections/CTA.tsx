import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'

export function CTA() {
  return (
    <section className="relative mx-auto w-full max-w-6xl px-6 pb-20 pt-6">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface-raised)] px-8 py-16 text-center md:px-16 md:py-20">
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.4]" />
          <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-[var(--color-accent)] opacity-20 blur-[100px]" />
          <div className="relative">
            <p className="label-mono mb-4">Next step</p>
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight text-[var(--color-ink)] md:text-5xl">
              Start small. Scale with confidence.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[var(--color-ink-muted)]">
              Send us your first shipment and see how we work — we'll receive, store and deliver your products
              with full visibility at every step. Once you're confident, scaling up is easy.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button to="/contact" size="lg">
                Start the conversation <ArrowRight className="h-4 w-4" />
              </Button>
              <Button to="/contact?role=warehouse" variant="outline" size="lg">
                Become a partner
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
