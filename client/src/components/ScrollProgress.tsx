import { motion, useScroll, useSpring } from 'framer-motion'

/** Thin accent progress line at the very top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-glow)]"
    />
  )
}
