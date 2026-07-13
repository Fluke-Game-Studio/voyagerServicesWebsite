import { useState } from 'react'
import { motion } from 'framer-motion'
import { Radio } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { viewportOnce, staggerContainer, fadeUp } from '@/lib/motion'
import { NETWORK_NODES } from '@/lib/content'

const W = 400
const H = 300
const CX = W / 2
const CY = H / 2
const RX = 150
const RY = 108

const nodes = NETWORK_NODES.map((node, i) => {
  const angle = (-90 + i * (360 / NETWORK_NODES.length)) * (Math.PI / 180)
  return { ...node, x: CX + RX * Math.cos(angle), y: CY + RY * Math.sin(angle) }
})

export function ControlTower() {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null)

  return (
    <Section
      eyebrow="What Voyager Does"
      title="One control tower for the whole network"
      intro="Voyager doesn't own every warehouse or truck. It coordinates the ecosystem — sourcing capacity, managing partners, maintaining visibility, handling exceptions — and owns the operating experience."
    >
      {/* radial diagram (md+) */}
      <Reveal className="hidden md:block">
        <div className="relative mx-auto aspect-[4/3] w-full max-w-4xl select-none">
          <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
            {nodes.map((n, i) => {
              const isHovered = hoveredNode === i
              return (
                <g key={i}>
                  {/* Connection line: highlights on hover */}
                  <motion.line
                    x1={CX}
                    y1={CY}
                    x2={n.x}
                    y2={n.y}
                    stroke={isHovered ? 'var(--color-accent-glow)' : 'var(--color-accent)'}
                    animate={{
                      strokeOpacity: isHovered ? 0.75 : 0.28,
                      strokeWidth: isHovered ? 2 : 1,
                    }}
                    transition={{ duration: 0.25 }}
                  />

                  {/* Dot 1: Inbound data (outer node -> center) */}
                  <motion.circle
                    r={isHovered ? 3.5 : 2.6}
                    fill="var(--color-accent-glow)"
                    initial={{ cx: n.x, cy: n.y, opacity: 0 }}
                    whileInView={{
                      cx: [n.x, CX],
                      cy: [n.y, CY],
                      opacity: [0, 1, 1, 0],
                    }}
                    viewport={viewportOnce}
                    transition={{
                      duration: isHovered ? 1.3 : 2.4, // speed up when hovered
                      repeat: Infinity,
                      delay: i * 0.35,
                      ease: 'easeInOut',
                    }}
                  />

                  {/* Dot 2: Outbound command (center -> outer node) */}
                  <motion.circle
                    r={isHovered ? 2.5 : 1.8}
                    fill="var(--color-accent)"
                    initial={{ cx: CX, cy: CY, opacity: 0 }}
                    whileInView={{
                      cx: [CX, n.x],
                      cy: [CY, n.y],
                      opacity: [0, 0.8, 0.8, 0],
                    }}
                    viewport={viewportOnce}
                    transition={{
                      duration: isHovered ? 1.3 : 2.4,
                      repeat: Infinity,
                      delay: i * 0.35 + 0.8,
                      ease: 'easeInOut',
                    }}
                  />
                </g>
              )
            })}
          </svg>

          {/* center hub */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            {/* Concentric wireless wave rings radiating outwards */}
            <div className="absolute inset-0 -z-10 flex items-center justify-center">
              <motion.div
                className="absolute h-24 w-40 rounded-2xl border border-[var(--color-accent)] opacity-20"
                animate={{ scale: [1, 1.45], opacity: [0.3, 0] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: 'easeOut' }}
              />
              <motion.div
                className="absolute h-24 w-40 rounded-2xl border border-[var(--color-accent-glow)] opacity-10"
                animate={{ scale: [1, 1.8], opacity: [0.18, 0] }}
                transition={{ repeat: Infinity, duration: 2.5, delay: 1.25, ease: 'easeOut' }}
              />
            </div>

            <div className="accent-glow flex flex-col items-center gap-1 rounded-2xl border border-[var(--color-accent)]/50 bg-[var(--color-surface-raised)] px-6 py-4 text-center shadow-lg">
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              >
                <Radio className="h-5 w-5 text-[var(--color-accent)]" />
              </motion.div>
              <span className="font-display text-sm font-bold tracking-wide text-[var(--color-ink)]">VOYAGER</span>
              <span className="label-mono !text-[0.6rem]">Control Tower</span>
            </div>
          </div>

          {/* node chips */}
          {nodes.map((n, i) => {
            const isHovered = hoveredNode === i
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={viewportOnce}
                transition={{ delay: 0.2 + i * 0.08, duration: 0.4 }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
                style={{ left: `${(n.x / W) * 100}%`, top: `${(n.y / H) * 100}%` }}
                onMouseEnter={() => setHoveredNode(i)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <motion.div
                  className="flex items-center gap-2 whitespace-nowrap rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-2 shadow-sm cursor-pointer transition-all duration-300"
                  animate={{
                    scale: isHovered ? 1.08 : 1,
                    borderColor: isHovered ? 'var(--color-accent)' : 'var(--color-border)',
                    boxShadow: isHovered
                      ? '0 0 15px color-mix(in srgb, var(--color-accent) 45%, transparent)'
                      : '0 1px 2px rgba(0, 0, 0, 0.05)',
                  }}
                >
                  <motion.span
                    animate={{
                      scale: isHovered ? 1.15 : 1,
                      rotate: isHovered ? [0, -10, 10, 0] : 0,
                    }}
                    transition={{ duration: 0.4 }}
                    className="text-[var(--color-accent)] flex items-center justify-center"
                  >
                    <n.icon className="h-4 w-4" />
                  </motion.span>
                  <span className="text-xs font-medium text-[var(--color-ink)]">{n.label}</span>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </Reveal>

      {/* stacked fallback (mobile) */}
      <div className="md:hidden">
        <div className="accent-glow mb-5 flex items-center gap-3 rounded-2xl border border-[var(--color-accent)]/50 bg-[var(--color-surface-raised)] px-5 py-4">
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            <Radio className="h-5 w-5 text-[var(--color-accent)]" />
          </motion.div>
          <div>
            <p className="font-display text-sm font-bold text-[var(--color-ink)]">VOYAGER Control Tower</p>
            <p className="label-mono !text-[0.6rem]">Coordinates every node below</p>
          </div>
        </div>
        <motion.div
          variants={staggerContainer(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid grid-cols-2 gap-3"
        >
          {nodes.map((n, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-3 active:border-[var(--color-accent)] transition-colors duration-200"
            >
              <n.icon className="h-4 w-4 shrink-0 text-[var(--color-accent)]" />
              <span className="text-xs font-medium text-[var(--color-ink)]">{n.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  )
}
