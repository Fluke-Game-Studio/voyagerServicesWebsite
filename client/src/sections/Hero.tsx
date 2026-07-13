import { useLayoutEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, PlayCircle } from 'lucide-react'
import { GlobeScene } from '@/three/GlobeScene'
import { Button } from '@/components/ui/Button'
import { staggerContainer, fadeUp } from '@/lib/motion'
import { BRAND } from '@/lib/content'
import { useTheme } from '@/lib/theme'
import { gsap } from '@/lib/gsap'

export function Hero() {
  const { theme } = useTheme()
  const reduce = useReducedMotion()
  const section = useRef<HTMLElement>(null)
  const content = useRef<HTMLDivElement>(null)
  const globe = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (reduce || !section.current) return
    const ctx = gsap.context(() => {
      const st = { trigger: section.current, start: 'top top', end: 'bottom top', scrub: true }
      gsap.to(content.current, { yPercent: -16, opacity: 0.1, ease: 'none', scrollTrigger: st })
      gsap.to(globe.current, { yPercent: 14, scale: 1.06, ease: 'none', scrollTrigger: { ...st } })
    }, section)
    return () => ctx.revert()
  }, [reduce])

  return (
    <section ref={section} className="relative min-h-screen overflow-hidden">
      {/* Globe — masked to a soft circle so the canvas box never shows */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center lg:left-auto lg:right-[-8%] lg:w-[62%] lg:pointer-events-auto">
        <div
          ref={globe}
          className="h-[115vw] max-h-[880px] w-[115vw] max-w-[880px]"
          style={{
            maskImage: 'radial-gradient(circle at 50% 46%, #000 46%, transparent 68%)',
            WebkitMaskImage: 'radial-gradient(circle at 50% 46%, #000 46%, transparent 68%)',
          }}
        >
          <GlobeScene theme={theme} className="h-full w-full" />
        </div>
      </div>

      {/* legibility overlay — fades to the current theme background on the copy side */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_26%_46%,transparent_0%,color-mix(in_srgb,var(--color-bg)_72%,transparent)_60%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--color-bg)] to-transparent" />

      <div
        ref={content}
        className="pointer-events-none relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 pt-24"
      >
        <motion.div
          variants={staggerContainer(0.12, 0.1)}
          initial="hidden"
          animate="show"
          className="pointer-events-auto max-w-2xl"
        >
          <motion.div
            variants={fadeUp}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/60 px-4 py-1.5 backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-accent)] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-accent)]" />
            </span>
            <span className="label-mono !text-[var(--color-ink-muted)]">Your outsourced U.S. logistics department</span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-[var(--color-ink)] sm:text-5xl md:text-6xl lg:text-[4.25rem]"
          >
            You manufacture.
            <br />
            <span className="text-gradient">We coordinate.</span>
            <br />
            You sell. We deliver.
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--color-ink-muted)]">
            {BRAND.hero}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button to="/contact" size="lg">
              Run a pilot with us <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="#gap" variant="outline" size="lg">
              <PlayCircle className="h-4 w-4" /> See how it works
            </Button>
          </motion.div>

          <motion.p variants={fadeUp} className="mt-8 font-mono text-xs text-[var(--color-ink-faint)]">
            For manufacturers · warehouse partners · logistics providers · investors
          </motion.p>
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 lg:block">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="flex h-9 w-6 items-start justify-center rounded-full border border-[var(--color-border)] pt-1.5"
        >
          <span className="h-2 w-1 rounded-full bg-[var(--color-accent)]" />
        </motion.div>
      </div>
    </section>
  )
}
