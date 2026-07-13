import { useLayoutEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { PROCESS_STEPS } from '@/lib/content'
import { staggerContainer, fadeUp, viewportOnce } from '@/lib/motion'
import { useTheme } from '@/lib/theme'
import { gsap } from '@/lib/gsap'
import { WaypointIcon } from '@/components/WaypointIcons'

// ─── Animation mode toggle ────────────────────────────────────────────────────
// Set to `true` to swap all waypoint icons to pre-baked SVG/video assets.
// See: src/components/WaypointAnimationAsset.tsx for full instructions.
//
// import { WaypointAnimationAsset } from '@/components/WaypointAnimationAsset'
// const USE_ASSET_ANIMATIONS = true
//
// When true, replace <WaypointIcon index={i} ... /> with:
//   <WaypointAnimationAsset index={i} isActive={isFilled} />
// and place SVG files in /public/animations/waypoints/step-{1-8}-*.svg
// ─────────────────────────────────────────────────────────────────────────────

const VW = 1000
const VH = 460

// Serpentine waypoints: top row L→R (steps 1–4), bottom row R→L (steps 5–8).
const WAYPOINTS = [
  { x: 120, y: 100 },
  { x: 373, y: 100 },
  { x: 627, y: 100 },
  { x: 880, y: 100 },
  { x: 880, y: 350 },
  { x: 627, y: 350 },
  { x: 373, y: 350 },
  { x: 120, y: 350 },
]

const PATH_D = 'M120,100 L880,100 Q968,100 968,225 Q968,350 880,350 L120,350'

// Colourful node palette — deliberately darker/more saturated in the light theme
// so points, path and marker read clearly on a bright background.
const COLORS = {
  dark: ['#4da3ff', '#22d3ee', '#a78bfa', '#fbbf24'],
  light: ['#1d4ed8', '#0369a1', '#6d28d9', '#b45309'],
}

export function ProcessJourney() {
  const { theme } = useTheme()
  const colors = COLORS[theme]
  const wrap = useRef<HTMLDivElement>(null)
  const track = useRef<SVGPathElement>(null)
  const progress = useRef<SVGPathElement>(null)
  const reduce = useReducedMotion()
  const [step, setStep] = useState(0)
  const stepRef = useRef(0)

  useLayoutEffect(() => {
    const path = progress.current
    if (!path || !wrap.current) return
    const len = path.getTotalLength()
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: reduce ? 0 : len })

    // Programmatically trace exact t fractions for all 8 waypoints
    const waypointT: number[] = []
    for (let i = 0; i < WAYPOINTS.length; i++) {
      const wp = WAYPOINTS[i]
      let bestT = 0
      let minDist = Infinity
      for (let s = 0; s <= 500; s++) {
        const t = s / 500
        const pt = path.getPointAtLength(t * len)
        const dx = pt.x - wp.x
        const dy = pt.y - wp.y
        const d = dx * dx + dy * dy
        if (d < minDist) {
          minDist = d
          bestT = t
        }
      }
      waypointT.push(bestT)
    }

    if (reduce) {
      setStep(7)
      return
    }

    const ctx = gsap.context(() => {
      // Auto-play timeline: fires when section enters viewport, completes in ~2s.
      // This approach works with CSS sticky stack (no scroll-scrub conflicts).
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap.current,
          start: 'top 80%',
          toggleActions: 'play none none reset',
        },
        onUpdate() {
          const p = tl.progress()
          let activeIndex = 0
          for (let i = 0; i < waypointT.length; i++) {
            if (p >= waypointT[i] - 0.05) activeIndex = i
          }
          if (activeIndex !== stepRef.current) {
            stepRef.current = activeIndex
            setStep(activeIndex)
          }
        },
      })
      tl.to(path, { strokeDashoffset: 0, ease: 'none', duration: 2 })
    }, wrap)
    return () => ctx.revert()
  }, [reduce])

  return (
    <>
      {/* wide serpentine journey — md and up */}
      <div ref={wrap} className="relative hidden md:block md:-mt-20 md:-mb-6">
        <div className="relative w-full" style={{ aspectRatio: `${VW} / ${VH}` }}>
          <svg viewBox={`0 0 ${VW} ${VH}`} className="absolute inset-0 h-full w-full overflow-visible">
            <defs>
              <linearGradient id="journeyGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={colors[0]} />
                <stop offset="40%" stopColor={colors[1]} />
                <stop offset="70%" stopColor={colors[2]} />
                <stop offset="100%" stopColor={colors[3]} />
              </linearGradient>
            </defs>

            <path
              ref={track}
              d={PATH_D}
              fill="none"
              stroke="var(--color-border)"
              strokeWidth={3}
              strokeLinecap="round"
              strokeDasharray="1 12"
            />
            <path ref={progress} d={PATH_D} fill="none" stroke="url(#journeyGrad)" strokeWidth={4} strokeLinecap="round" />

            {/* Custom empty-to-filled SVG waypoints */}
            {WAYPOINTS.map((w, i) => {
              const isFilled = step >= i
              const dotColor = colors[i % 4]
              return (
                <g key={i} transform={`translate(${w.x}, ${w.y})`}>
                  {/* Backdrop circle: transitions between empty (bg + border) and filled (active color) */}
                  <motion.circle
                    cx={0}
                    cy={0}
                    r={20}
                    animate={{
                      fill: isFilled ? dotColor : 'var(--color-bg)',
                      stroke: isFilled ? dotColor : 'var(--color-border)',
                      strokeWidth: isFilled ? 1 : 2,
                      scale: isFilled ? 1.08 : 1,
                    }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    className="shadow-sm"
                  />
                  {/* Custom looping SVG animation inside */}
                  <WaypointIcon
                    index={i}
                    color={isFilled ? 'var(--color-on-accent)' : 'var(--color-ink-faint)'}
                    isActive={isFilled}
                  />
                </g>
              )
            })}
          </svg>

          {/* labels overlay */}
          {PROCESS_STEPS.map((stepItem, i) => {
            const w = WAYPOINTS[i]
            return (
              <div
                key={stepItem.n}
                className="absolute w-[22%] max-w-[190px] -translate-x-1/2 text-center text-[var(--color-ink)]"
                style={{
                  left: `${(w.x / VW) * 100}%`,
                  top: `${(w.y / VH) * 100}%`,
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="pt-7"
                >
                  <p className="font-mono text-[0.68rem]" style={{ color: colors[i % 4] }}>
                    STEP {stepItem.n}
                  </p>
                  <h4 className="font-display text-sm font-semibold leading-tight text-[var(--color-ink)]">{stepItem.title}</h4>
                  <p className="mt-1 text-[0.72rem] leading-snug text-[var(--color-ink-muted)]">{stepItem.body}</p>
                </motion.div>
              </div>
            )
          })}
        </div>
      </div>

      {/* vertical animated timeline — mobile */}
      <motion.ol
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="relative ml-3 space-y-6 border-l-2 border-dashed border-[var(--color-border)] pl-6 md:hidden"
      >
        {PROCESS_STEPS.map((stepItem, i) => (
          <motion.li key={stepItem.n} variants={fadeUp} className="relative">
            {/* Centered, high-fidelity animated SVG in a filled circle container */}
            <span
              className="absolute -left-[37px] top-0 grid h-8 w-8 place-items-center rounded-full border shadow-sm"
              style={{ backgroundColor: colors[i % 4], borderColor: colors[i % 4] }}
            >
              <svg viewBox="-16 -16 32 32" className="h-5 w-5 overflow-visible">
                <WaypointIcon index={i} color="var(--color-on-accent)" isActive={true} />
              </svg>
            </span>
            <p className="font-mono text-[0.65rem] text-[var(--color-ink-faint)]">STEP {stepItem.n}</p>
            <h4 className="font-display text-base font-semibold text-[var(--color-ink)]">{stepItem.title}</h4>
            <p className="mt-1 text-sm leading-relaxed text-[var(--color-ink-muted)]">{stepItem.body}</p>
          </motion.li>
        ))}
      </motion.ol>
</>
  )
}
