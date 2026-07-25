import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, motionValue, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface StackBand {
  key: string
  /** Band shell styling (background, rounding, shadow). */
  className?: string
  /** Full-bleed band (hero): corners animate in only while it recedes. */
  flush?: boolean
  node: ReactNode
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v))

/**
 * Card-deck section stacking. All bands share one parent, each band is
 * `position: sticky`, so a band pins at the top while the next slides up and
 * covers it. The covered band "recedes": scales down slightly and fades toward
 * the page background, driven by how far the incoming band has risen.
 *
 * Mobile-safe: a band taller than the viewport gets a negative sticky top
 * (`viewport - height`), so its full content scrolls past before it pins —
 * nothing is ever unreachable on small screens. Reduced motion → plain flow.
 */
export function SectionStack({ bands }: { bands: StackBand[] }) {
  const reduce = useReducedMotion()
  const refs = useRef<(HTMLDivElement | null)[]>([])
  const [tops, setTops] = useState<number[]>(() => bands.map(() => 0))

  // One motion value trio per band, created once (band count is static).
  const scales = useRef(bands.map(() => motionValue(1)))
  const veils = useRef(bands.map(() => motionValue(0)))
  const radii = useRef(bands.map(() => motionValue(0)))

  const { scrollY } = useScroll()

  // Covering progress of band i = how far band i+1's top has risen through the
  // viewport (1 when it reaches the top and fully covers its predecessor).
  const update = () => {
    const vh = window.innerHeight
    for (let i = 0; i < bands.length - 1; i++) {
      const next = refs.current[i + 1]
      if (!next) continue
      const p = clamp01((vh - next.getBoundingClientRect().top) / vh)
      scales.current[i].set(1 - p * 0.06)
      veils.current[i].set(p * 0.6)
      radii.current[i].set(clamp01(p / 0.12) * 28)
    }
  }

  useMotionValueEvent(scrollY, 'change', update)

  useEffect(() => {
    if (reduce) return
    const measure = () => {
      const vh = window.innerHeight
      setTops(bands.map((_, i) => {
        const el = refs.current[i]
        return el ? Math.min(0, vh - el.offsetHeight) : 0
      }))
      update()
    }
    measure()
    const ro = new ResizeObserver(measure)
    refs.current.forEach((el) => el && ro.observe(el))
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce, bands.length])

  if (reduce) {
    return (
      <>
        {bands.map((b) => (
          <div key={b.key} className={cn('relative', b.className)}>
            {b.node}
          </div>
        ))}
      </>
    )
  }

  return (
    <div className="relative">
      {bands.map((b, i) => {
        const isLast = i === bands.length - 1
        return (
          <motion.div
            key={b.key}
            data-stack-band
            ref={(el) => {
              refs.current[i] = el
            }}
            style={{
              position: 'sticky',
              top: tops[i],
              scale: scales.current[i],
              transformOrigin: 'center top',
              zIndex: i + 1,
              ...(b.flush ? { borderRadius: radii.current[i], overflow: 'clip' } : {}),
            }}
            className={cn('will-change-transform', b.className)}
          >
            {b.node}
            {/* veil: fades the band toward the page background as it's covered */}
            {!isLast && (
              <motion.div
                aria-hidden
                style={{ opacity: veils.current[i] }}
                className="pointer-events-none absolute inset-0 z-30 bg-[var(--color-bg)]"
              />
            )}
          </motion.div>
        )
      })}
    </div>
  )
}
