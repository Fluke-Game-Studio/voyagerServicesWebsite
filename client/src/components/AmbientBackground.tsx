import { useLayoutEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { gsap } from '@/lib/gsap'

/**
 * Fixed, slowly-drifting blurred color orbs behind the whole app — adds depth
 * so sections don't read as flat panels. Subtle in both themes.
 */
export function AmbientBackground() {
  const root = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  useLayoutEffect(() => {
    if (reduce || !root.current) return
    const ctx = gsap.context(() => {
      gsap.to('.orb-a', { x: 120, y: 80, duration: 18, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      gsap.to('.orb-b', { x: -100, y: -60, duration: 22, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      gsap.to('.orb-c', { x: 80, y: -100, duration: 26, repeat: -1, yoyo: true, ease: 'sine.inOut' })
    }, root)
    return () => ctx.revert()
  }, [reduce])

  return (
    <div ref={root} aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="orb-a absolute -left-40 top-[8%] h-[38rem] w-[38rem] rounded-full bg-[var(--color-accent)] opacity-[0.12] blur-[140px]" />
      <div className="orb-b absolute right-[-10%] top-[35%] h-[32rem] w-[32rem] rounded-full bg-[var(--color-accent-glow)] opacity-[0.10] blur-[150px]" />
      <div className="orb-c absolute bottom-[2%] left-[25%] h-[30rem] w-[30rem] rounded-full bg-[var(--color-accent-deep)] opacity-[0.10] blur-[150px]" />
    </div>
  )
}
