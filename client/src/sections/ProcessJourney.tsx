import { useLayoutEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { PROCESS_STEPS } from '@/lib/content'
import { staggerContainer, fadeUp, viewportOnce } from '@/lib/motion'
import { useTheme } from '@/lib/theme'
import { gsap } from '@/lib/gsap'

const VW = 1000
const VH = 520

// Serpentine waypoints: top row L→R (steps 1–4), bottom row R→L (steps 5–8).
const WAYPOINTS = [
  { x: 120, y: 150 },
  { x: 373, y: 150 },
  { x: 627, y: 150 },
  { x: 880, y: 150 },
  { x: 880, y: 370 },
  { x: 627, y: 370 },
  { x: 373, y: 370 },
  { x: 120, y: 370 },
]

const PATH_D = 'M120,150 L880,150 Q968,150 968,260 Q968,370 880,370 L120,370'

// Colourful node palette — deliberately darker/more saturated in the light theme
// so points, path and marker read clearly on a bright background.
const COLORS = {
  dark: ['#4da3ff', '#22d3ee', '#a78bfa', '#fbbf24'],
  light: ['#1d4ed8', '#0369a1', '#6d28d9', '#b45309'],
}



function WaypointAnimation({ index, color, isActive }: { index: number; color: string; isActive: boolean }) {
  const durationMultiplier = isActive ? 0.75 : 1.25

  switch (index) {
    case 0: // Customer Assessment (Radar Target)
      return (
        <g>
          <motion.circle
            cx={0}
            cy={0}
            r={14}
            fill="none"
            stroke={color}
            strokeWidth={1.5}
            animate={{ scale: [1, 1.35, 1], opacity: [0.3, 0.8, 0.3] }}
            transition={{ repeat: Infinity, duration: 2 * durationMultiplier, ease: 'easeInOut' }}
          />
          <motion.circle
            cx={0}
            cy={0}
            r={8}
            fill="none"
            stroke={color}
            strokeWidth={2}
            animate={{ scale: isActive ? [1, 0.75, 1] : [1, 0.85, 1] }}
            transition={{ repeat: Infinity, duration: 1.8 * durationMultiplier, ease: 'easeInOut' }}
          />
          <motion.line
            x1={-12}
            y1={0}
            x2={12}
            y2={0}
            stroke={color}
            strokeWidth={1}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 4 * durationMultiplier, ease: 'linear' }}
          />
          <circle cx={0} cy={0} r={3.5} fill={color} />
        </g>
      )
    case 1: // Network Design (Pulsing Nodes)
      return (
        <g>
          <line x1={0} y1={-8} x2={-8} y2={6} stroke={color} strokeWidth={1.5} opacity={isActive ? 0.85 : 0.4} />
          <line x1={0} y1={-8} x2={8} y2={6} stroke={color} strokeWidth={1.5} opacity={isActive ? 0.85 : 0.4} />
          <line x1={-8} y1={6} x2={8} y2={6} stroke={color} strokeWidth={1.5} opacity={isActive ? 0.85 : 0.4} />
          <motion.circle
            cx={0}
            cy={-8}
            r={3.5}
            fill={color}
            animate={{ scale: isActive ? [1, 1.5, 1] : [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 * durationMultiplier, delay: 0 }}
          />
          <motion.circle
            cx={-8}
            cy={6}
            r={3.5}
            fill={color}
            animate={{ scale: isActive ? [1, 1.5, 1] : [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 * durationMultiplier, delay: 0.5 }}
          />
          <motion.circle
            cx={8}
            cy={6}
            r={3.5}
            fill={color}
            animate={{ scale: isActive ? [1, 1.5, 1] : [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 * durationMultiplier, delay: 1 }}
          />
        </g>
      )
    case 2: // Inbound Coordination (Swaying Ship & Waves)
      return (
        <g>
          <motion.g
            animate={{ y: isActive ? [0, -3, 0] : [0, -1.5, 0], rotate: isActive ? [-4, 4, -4] : [-2, 2, -2] }}
            transition={{ repeat: Infinity, duration: 2.5 * durationMultiplier, ease: 'easeInOut' }}
          >
            <rect x={-3} y={-5} width={6} height={5} fill={color} opacity={0.8} rx={1} />
            <rect x={-1} y={-8} width={2} height={3} fill={color} />
            <path d="M -9,-1 L 9,-1 L 6,4 L -6,4 Z" fill={color} />
          </motion.g>
          <motion.path
            d="M -11,8 Q -5.5,6 0,8 Q 5.5,10 11,8"
            fill="none"
            stroke={color}
            strokeWidth={1.5}
            strokeLinecap='round'
            animate={{ x: isActive ? [-3, 3, -3] : [-1.5, 1.5, -1.5] }}
            transition={{ repeat: Infinity, duration: 2 * durationMultiplier, ease: 'easeInOut' }}
          />
          <motion.path
            d="M -9,11 Q -4.5,13 0,11 Q 4.5,9 9,11"
            fill="none"
            stroke={color}
            strokeWidth={1}
            opacity={0.5}
            strokeLinecap='round'
            animate={{ x: isActive ? [3, -3, 3] : [1.5, -1.5, 1.5] }}
            transition={{ repeat: Infinity, duration: 2 * durationMultiplier, ease: 'easeInOut' }}
          />
        </g>
      )
    case 3: // Warehouse Receiving (Box & Opening Flaps)
      return (
        <g>
          <motion.g
            animate={{ scale: isActive ? [1, 1.1, 1] : [1, 1.03, 1] }}
            transition={{ repeat: Infinity, duration: 2 * durationMultiplier, ease: 'easeInOut' }}
          >
            <path d="M -7,-2 L 7,-2 L 7,7 L -7,7 Z" fill="none" stroke={color} strokeWidth={2} strokeLinejoin='round' />
            <motion.path
              d="M -7,-2 L -11,-5 L -4,-5"
              fill="none"
              stroke={color}
              strokeWidth={1.5}
              animate={{ rotate: isActive ? [0, -25, 0] : [0, -12, 0] }}
              originX="-7px"
              originY="-2px"
              transition={{ repeat: Infinity, duration: 2 * durationMultiplier, ease: 'easeInOut' }}
            />
            <motion.path
              d="M 7,-2 L 11,-5 L 4,-5"
              fill="none"
              stroke={color}
              strokeWidth={1.5}
              animate={{ rotate: isActive ? [0, 25, 0] : [0, 12, 0] }}
              originX="7px"
              originY="-2px"
              transition={{ repeat: Infinity, duration: 2 * durationMultiplier, ease: 'easeInOut' }}
            />
          </motion.g>
          <motion.path
            d="M -3,2 L -1,4 L 3.5,-1.5"
            fill="none"
            stroke={color}
            strokeWidth={2}
            strokeLinecap='round'
            strokeLinejoin='round'
            animate={{ scale: isActive ? [0.75, 1.25, 0.75] : [0.9, 1.1, 0.9], opacity: [0.7, 1, 0.7] }}
            transition={{ repeat: Infinity, duration: 2 * durationMultiplier, ease: 'easeInOut' }}
          />
        </g>
      )
    case 4: // Inventory Visibility (Blinking Eye & Scanning Pupil)
      return (
        <g>
          <path d="M -11,0 Q 0,-7 11,0 Q 0,7 -11,0 Z" fill="none" stroke={color} strokeWidth={2} />
          <motion.circle
            cx={0}
            cy={0}
            r={3}
            fill={color}
            animate={{ x: isActive ? [-3.5, 3.5, -3.5] : [-2, 2, -2] }}
            transition={{ repeat: Infinity, duration: 3 * durationMultiplier, ease: 'easeInOut' }}
          />
          <motion.path
            d="M -11,0 Q 0,-7 11,0"
            fill="none"
            stroke={color}
            strokeWidth={2}
            animate={{
              d: [
                'M -11,0 Q 0,-7 11,0',
                'M -11,0 Q 0,0 11,0',
                'M -11,0 Q 0,-7 11,0'
              ]
            }}
            transition={{
              repeat: Infinity,
              duration: 3.5 * durationMultiplier,
              ease: 'easeInOut',
              times: [0, 0.08, 0.16, 1]
            }}
          />
        </g>
      )
    case 5: // Release Instruction (Sliding Paper Plane)
      return (
        <g>
          <motion.g
            animate={{
              x: isActive ? [-5, 7, -5] : [-3, 4, -3],
              y: isActive ? [5, -7, 5] : [3, -4, 3],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{ repeat: Infinity, duration: 2.2 * durationMultiplier, ease: 'easeInOut' }}
          >
            <path d="M -8,5 L 8,-7 L -2,0 Z" fill={color} />
            <path d="M -8,5 L -2,0 L -5,2 Z" fill={color} opacity={0.7} />
          </motion.g>
          <motion.line
            x1={-10}
            y1={8}
            x2={-6}
            y2={4}
            stroke={color}
            strokeWidth={1}
            opacity={0.4}
            animate={{ opacity: [0, 0.8, 0] }}
            transition={{ repeat: Infinity, duration: 2.2 * durationMultiplier, ease: 'easeInOut' }}
          />
        </g>
      )
    case 6: // Outbound Execution (Arrows Floating from Box)
      return (
        <g>
          <path d="M -8,2 L 8,2 L 6,8 L -6,8 Z" fill="none" stroke={color} strokeWidth={1.5} />
          <path d="M -8,2 L -11,-1" stroke={color} strokeWidth={1.5} />
          <path d="M 8,2 L 11,-1" stroke={color} strokeWidth={1.5} />
          <motion.g
            animate={{ y: isActive ? [3, -9, 3] : [2, -6, 2], opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 * durationMultiplier, ease: 'linear' }}
          >
            <path d="M -3,-2 L 0,-5 L 3,-2" fill="none" stroke={color} strokeWidth={1.5} strokeLinecap='round' />
            <line x1={0} y1={-5} x2={0} y2={1} stroke={color} strokeWidth={1.5} />
          </motion.g>
        </g>
      )
    case 7: // Final Delivery (Bouncing Pin & Ground Ripple)
      return (
        <g>
          <motion.ellipse
            cx={0}
            cy={8}
            rx={8}
            ry={2.5}
            fill="none"
            stroke={color}
            strokeWidth={1}
            animate={{ scale: isActive ? [0.4, 2.1] : [0.5, 1.6], opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 * durationMultiplier, ease: 'easeOut' }}
          />
          <motion.g
            animate={{ y: isActive ? [0, -5, 0] : [0, -2.5, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 * durationMultiplier, ease: 'easeInOut' }}
          >
            <path d="M 0,-7 C -4.5,-7 -7,-4.5 -7,-1 C -7,3.5 0,9 0,9 C 0,9 7,3.5 7,-1 C 7,-4.5 4.5,-7 0,-7 Z" fill={color} />
            <circle cx={0} cy={-2} r={2} fill="var(--color-bg)" />
          </motion.g>
        </g>
      )
    default:
      return <circle cx={0} cy={0} r={5} fill={color} />
  }
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
      // Scroll-scrubbing progress line and active step fill logic
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: wrap.current,
          start: 'top 72%',
          end: 'bottom 78%',
          scrub: true,
          onUpdate: (self) => {
            const currentProgress = self.progress
            let activeIndex = 0
            for (let i = 0; i < waypointT.length; i++) {
              if (currentProgress >= waypointT[i] - 0.05) {
                activeIndex = i
              }
            }
            if (activeIndex !== stepRef.current) {
              stepRef.current = activeIndex
              setStep(activeIndex)
            }
          }
        },
      })
    }, wrap)
    return () => ctx.revert()
  }, [reduce])

  return (
    <>
      {/* wide serpentine journey — md and up */}
      <div ref={wrap} className="relative hidden md:block">
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
                  <WaypointAnimation
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
                <WaypointAnimation index={i} color="var(--color-on-accent)" isActive={true} />
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
