import { useEffect, useRef, useState } from 'react'

interface Props {
  onDone: () => void
}

/**
 * Full-screen branded loading screen.
 * Shows while Three.js + GSAP chunks load in the background,
 * then does a curtain slide-up reveal using native CSS transitions.
 * Immune to Framer Motion load ordering hangs.
 */
export function LoadingScreen({ onDone }: Props) {
  const [progress, setProgress] = useState(0)
  const [exiting, setExiting] = useState(false)
  const rafRef = useRef<number>(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const onDoneCalled = useRef(false)

  const handleDone = () => {
    if (!onDoneCalled.current) {
      onDoneCalled.current = true
      onDone()
    }
  }

  useEffect(() => {
    const MIN_MS = 1800  // always show for at least this long
    const MAX_MS = 3500  // always exit by this point regardless of chunk state
    const start = Date.now()

    // Animate a smooth eased progress bar
    const animateProgress = () => {
      const elapsed = Date.now() - start
      const t = Math.min(elapsed / MIN_MS, 1)
      const eased = 1 - Math.pow(1 - t, 2.5)
      setProgress(Math.min(eased * 88, 88))
      if (elapsed < MIN_MS) {
        rafRef.current = requestAnimationFrame(animateProgress)
      }
    }
    rafRef.current = requestAnimationFrame(animateProgress)

    // Hard timeout — screen ALWAYS exits after MAX_MS no matter what
    const hardTimeout = new Promise<void>(resolve => setTimeout(resolve, MAX_MS))

    // Try to load chunks — but don't block on failure or slowness
    const chunkLoad = Promise.all([
      import('@/three/GlobeScene').catch(() => {}),
      import('@/lib/gsap').catch(() => {}),
      import('@/sections/ControlTower').catch(() => {}),
      import('@/sections/ProcessJourney').catch(() => {}),
    ])

    // Whichever resolves first — chunks done OR hard timeout
    Promise.race([chunkLoad, hardTimeout]).then(() => {
      cancelAnimationFrame(rafRef.current)
      const elapsed = Date.now() - start
      // Ensure minimum display time, then fill bar and trigger exit
      setTimeout(() => {
        setProgress(100)
        setTimeout(() => {
          setExiting(true)
          // Fallback: trigger handleDone after 950ms if transitionend fails to fire
          setTimeout(handleDone, 950)
        }, 300)
      }, Math.max(0, MIN_MS - elapsed))
    })

    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  // When transition ends (slide up completes), trigger handleDone to mount the rest of the site
  const handleTransitionEnd = (e: React.TransitionEvent) => {
    if (e.propertyName === 'transform' && exiting) {
      handleDone()
    }
  }

  return (
    <div
      ref={containerRef}
      onTransitionEnd={handleTransitionEnd}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#070b14] select-none overflow-hidden"
      style={{
        transform: exiting ? 'translateY(-100%)' : 'translateY(0%)',
        transition: 'transform 0.8s cubic-bezier(0.76, 0, 0.24, 1)',
      }}
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
        <div className="relative mb-2 h-16 w-16 opacity-0 animate-fade-in">
          <svg viewBox="0 0 64 64" className="h-full w-full overflow-visible">
            <style>{`
              @keyframes loader-spin-cw { to { transform: rotate(360deg); } }
              @keyframes loader-spin-ccw { to { transform: rotate(-360deg); } }
              @keyframes loader-fade-in { to { opacity: 1; transform: translateY(0); } }
              .spin-cw {
                animation: loader-spin-cw 8s linear infinite;
                transform-origin: 32px 32px;
              }
              .spin-ccw {
                animation: loader-spin-ccw 5s linear infinite;
                transform-origin: 32px 32px;
              }
              .animate-fade-in {
                animation: loader-fade-in 0.6s ease-out forwards;
              }
              .animate-slide-up-fade {
                opacity: 0;
                transform: translateY(16px);
                animation: loader-fade-in 0.5s ease-out forwards;
              }
            `}</style>
            {/* Outer orbit */}
            <circle
              cx={32} cy={32} r={28}
              fill="none"
              stroke="rgba(77,163,255,0.25)"
              strokeWidth={1}
            />
            {/* Moving dot on outer orbit */}
            <circle
              cx={60} cy={32} r={3}
              fill="#4da3ff"
              className="spin-cw"
            />
            {/* Inner orbit — tilted */}
            <ellipse
              cx={32} cy={32} rx={18} ry={7}
              fill="none"
              stroke="rgba(34,211,238,0.3)"
              strokeWidth={1}
              style={{ transform: 'rotate(15deg)', transformOrigin: '32px 32px' }}
            />
            {/* Moving dot on inner orbit */}
            <circle
              cx={50} cy={32} r={2.5}
              fill="#22d3ee"
              className="spin-ccw"
            />
            {/* Core */}
            <circle cx={32} cy={32} r={5} fill="#4da3ff" opacity={0.9} />
          </svg>
        </div>

        {/* Brand name */}
        <div className="text-center animate-slide-up-fade" style={{ animationDelay: '0.2s' }}>
          <p className="font-display text-4xl font-bold tracking-[0.18em] text-white">
            VOYAGER
          </p>
          <p className="mt-1 font-mono text-[0.65rem] tracking-[0.3em] text-[#4da3ff] uppercase">
            Services
          </p>
        </div>

        {/* Tagline */}
        <p
          className="font-mono text-[0.65rem] tracking-widest text-white/30 uppercase animate-slide-up-fade"
          style={{ animationDelay: '0.45s' }}
        >
          Managed U.S. Supply Chain
        </p>

        {/* Progress bar */}
        <div className="mt-4 w-52 animate-slide-up-fade" style={{ animationDelay: '0.5s' }}>
          <div className="h-[2px] w-full overflow-hidden rounded-full bg-white/10">
            <div
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
        </div>
      </div>
    </div>
  )
}
