import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  onDone: () => void
}

/**
 * Full-screen branded loading screen.
 * Shows while Three.js + GSAP chunks load in the background,
 * then does a curtain slide-up reveal to expose the site.
 */
export function LoadingScreen({ onDone }: Props) {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const MIN_MS = 2000 // minimum screen time so it doesn't flash
    const start = Date.now()

    // Animate a smooth eased progress bar while chunks load
    const animateProgress = () => {
      const elapsed = Date.now() - start
      // Ease out: fills quickly at first, slows near 88% while waiting for chunks
      const t = Math.min(elapsed / MIN_MS, 1)
      const eased = 1 - Math.pow(1 - t, 2.5)
      setProgress(Math.min(eased * 88, 88)) // cap at 88% until chunks are ready
      if (elapsed < MIN_MS) {
        rafRef.current = requestAnimationFrame(animateProgress)
      }
    }
    rafRef.current = requestAnimationFrame(animateProgress)

    // Load the two heaviest chunks in parallel behind the screen
    Promise.all([
      import('@/three/GlobeScene'),
      import('@/lib/gsap'),
      import('@/sections/ControlTower'),
      import('@/sections/ProcessJourney'),
    ]).then(() => {
      cancelAnimationFrame(rafRef.current)
      const elapsed = Date.now() - start
      // Wait for the minimum time then snap to 100% and exit
      setTimeout(() => {
        setProgress(100)
        // Brief pause at 100% then slide away
        setTimeout(() => setVisible(false), 380)
      }, Math.max(0, MIN_MS - elapsed))
    })

    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          key="loader"
          // Slide the screen upward as a curtain reveal
          exit={{ y: '-100%' }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#070b14] select-none overflow-hidden"
        >
          {/* Subtle background radial glow */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(77,163,255,0.07) 0%, transparent 70%)',
            }}
          />

          {/* Grid texture overlay */}
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.15]" />

          {/* Center content */}
          <div className="relative flex flex-col items-center gap-6">
            {/* Animated logo mark — two orbital arcs */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative mb-2 h-16 w-16"
            >
              <svg viewBox="0 0 64 64" className="h-full w-full overflow-visible">
                {/* Outer orbit */}
                <motion.circle
                  cx={32} cy={32} r={28}
                  fill="none"
                  stroke="rgba(77,163,255,0.25)"
                  strokeWidth={1}
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
                  style={{ originX: '32px', originY: '32px' }}
                />
                {/* Moving dot on outer orbit */}
                <motion.circle
                  cx={60} cy={32} r={3}
                  fill="#4da3ff"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
                  style={{ originX: '32px', originY: '32px' }}
                />
                {/* Inner orbit — tilted */}
                <motion.ellipse
                  cx={32} cy={32} rx={18} ry={7}
                  fill="none"
                  stroke="rgba(34,211,238,0.3)"
                  strokeWidth={1}
                  animate={{ rotate: -360 }}
                  transition={{ repeat: Infinity, duration: 5, ease: 'linear' }}
                  style={{ originX: '32px', originY: '32px' }}
                />
                {/* Moving dot on inner orbit */}
                <motion.circle
                  cx={50} cy={32} r={2.5}
                  fill="#22d3ee"
                  animate={{ rotate: -360 }}
                  transition={{ repeat: Infinity, duration: 5, ease: 'linear' }}
                  style={{ originX: '32px', originY: '32px' }}
                />
                {/* Core */}
                <circle cx={32} cy={32} r={5} fill="#4da3ff" opacity={0.9} />
              </svg>
            </motion.div>

            {/* Brand name */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
              className="text-center"
            >
              <p className="font-display text-4xl font-bold tracking-[0.18em] text-white">
                VOYAGER
              </p>
              <p className="mt-1 font-mono text-[0.65rem] tracking-[0.3em] text-[#4da3ff] uppercase">
                Services
              </p>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="font-mono text-[0.65rem] tracking-widest text-white/30 uppercase"
            >
              Managed U.S. Supply Chain
            </motion.p>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-4 w-52"
            >
              <div className="h-[2px] w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #4da3ff, #22d3ee)',
                    width: `${progress}%`,
                    transition: 'width 0.3s ease-out',
                  }}
                />
              </div>
              <p className="mt-2 text-center font-mono text-[0.6rem] text-white/20">
                {Math.round(progress)}%
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
