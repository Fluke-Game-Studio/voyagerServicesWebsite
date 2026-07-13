/**
 * WaypointIcons.tsx — CSS-animated SVG icons (zero Framer Motion / GSAP)
 * Each icon is a pure SVG with embedded @keyframes CSS.
 * Color is driven entirely via CSS `currentColor` — set `color` on the parent.
 * isActive controls animation speed via a CSS class.
 */

interface IconProps {
  isActive: boolean
  color: string  // passed as inline style so currentColor works
}

// ─── 1. Radar Target (Customer Assessment) ───────────────────────────────────
export function RadarIcon({ isActive, color }: IconProps) {
  const id = 'radar'
  return (
    <g overflow="visible" aria-hidden>
      <style>{`
        @keyframes ${id}-pulse-outer { 0%,100%{transform:scale(1);opacity:.3} 50%{transform:scale(1.35);opacity:.8} }
        @keyframes ${id}-pulse-inner { 0%,100%{transform:scale(1)} 50%{transform:scale(.75)} }
        @keyframes ${id}-spin { to{transform:rotate(360deg)} }
        .${id}-outer { animation:${id}-pulse-outer 1.5s ease-in-out infinite; transform-origin:0 0; }
        .${id}-inner { animation:${id}-pulse-inner 1.35s ease-in-out infinite; transform-origin:0 0; }
        .${id}-line  { animation:${id}-spin 3s linear infinite; transform-origin:0 0; }
        .${id}-slow.${id}-outer { animation-duration:2.5s; }
        .${id}-slow.${id}-inner { animation-duration:2.25s; }
        .${id}-slow.${id}-line  { animation-duration:5s; }
      `}</style>
      <circle cx={0} cy={0} r={14} fill="none" stroke={color} strokeWidth={1.5}
        className={`${id}-outer${isActive ? '' : ` ${id}-slow`}`} />
      <circle cx={0} cy={0} r={8} fill="none" stroke={color} strokeWidth={2}
        className={`${id}-inner${isActive ? '' : ` ${id}-slow`}`} />
      <line x1={-12} y1={0} x2={12} y2={0} stroke={color} strokeWidth={1}
        className={`${id}-line${isActive ? '' : ` ${id}-slow`}`} />
      <circle cx={0} cy={0} r={3.5} fill={color} />
    </g>
  )
}

// ─── 2. Network Nodes (Network Design) ───────────────────────────────────────
export function NetworkIcon({ isActive, color }: IconProps) {
  const id = 'net'
  const scale = isActive ? 1.5 : 1.2
  return (
    <g overflow="visible" aria-hidden>
      <style>{`
        @keyframes ${id}-a { 0%,100%{transform:scale(1)} 50%{transform:scale(${scale})} }
        @keyframes ${id}-b { 0%,100%{transform:scale(1)} 50%{transform:scale(${scale})} }
        @keyframes ${id}-c { 0%,100%{transform:scale(1)} 50%{transform:scale(${scale})} }
        .${id}-a { animation:${id}-a ${isActive ? 1.1 : 1.9}s ease-in-out infinite; transform-origin:0 -8px; }
        .${id}-b { animation:${id}-b ${isActive ? 1.1 : 1.9}s ease-in-out ${isActive ? 0.37 : 0.63}s infinite; transform-origin:-8px 6px; }
        .${id}-c { animation:${id}-c ${isActive ? 1.1 : 1.9}s ease-in-out ${isActive ? 0.74 : 1.25}s infinite; transform-origin:8px 6px; }
      `}</style>
      <line x1={0} y1={-8} x2={-8} y2={6} stroke={color} strokeWidth={1.5} opacity={isActive ? 0.85 : 0.4} />
      <line x1={0} y1={-8} x2={8} y2={6} stroke={color} strokeWidth={1.5} opacity={isActive ? 0.85 : 0.4} />
      <line x1={-8} y1={6} x2={8} y2={6} stroke={color} strokeWidth={1.5} opacity={isActive ? 0.85 : 0.4} />
      <circle cx={0} cy={-8} r={3.5} fill={color} className={`${id}-a`} />
      <circle cx={-8} cy={6} r={3.5} fill={color} className={`${id}-b`} />
      <circle cx={8} cy={6} r={3.5} fill={color} className={`${id}-c`} />
    </g>
  )
}

// ─── 3. Ship & Waves (Inbound Coordination) ──────────────────────────────────
export function ShipIcon({ isActive, color }: IconProps) {
  const id = 'ship'
  const dur = isActive ? 1.9 : 3.1
  return (
    <g overflow="visible" aria-hidden>
      <style>{`
        @keyframes ${id}-sway { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(${isActive?-3:-1.5}px) rotate(${isActive?4:2}deg)} }
        @keyframes ${id}-wave1 { 0%,100%{transform:translateX(${isActive?-3:-1.5}px)} 50%{transform:translateX(${isActive?3:1.5}px)} }
        @keyframes ${id}-wave2 { 0%,100%{transform:translateX(${isActive?3:1.5}px)} 50%{transform:translateX(${isActive?-3:-1.5}px)} }
        .${id}-body { animation:${id}-sway ${dur}s ease-in-out infinite; transform-origin:0 0; }
        .${id}-w1   { animation:${id}-wave1 ${dur * 0.8}s ease-in-out infinite; }
        .${id}-w2   { animation:${id}-wave2 ${dur * 0.8}s ease-in-out infinite; }
      `}</style>
      <g className={`${id}-body`}>
        <rect x={-3} y={-5} width={6} height={5} fill={color} opacity={0.8} rx={1} />
        <rect x={-1} y={-8} width={2} height={3} fill={color} />
        <path d="M -9,-1 L 9,-1 L 6,4 L -6,4 Z" fill={color} />
      </g>
      <path d="M -11,8 Q -5.5,6 0,8 Q 5.5,10 11,8" fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" className={`${id}-w1`} />
      <path d="M -9,11 Q -4.5,13 0,11 Q 4.5,9 9,11" fill="none" stroke={color} strokeWidth={1} opacity={0.5} strokeLinecap="round" className={`${id}-w2`} />
    </g>
  )
}

// ─── 4. Box & Flaps (Warehouse Receiving) ────────────────────────────────────
export function BoxIcon({ isActive, color }: IconProps) {
  const id = 'box'
  const dur = isActive ? 1.5 : 2.5
  return (
    <g overflow="visible" aria-hidden>
      <style>{`
        @keyframes ${id}-scale { 0%,100%{transform:scale(1)} 50%{transform:scale(${isActive?1.1:1.03})} }
        @keyframes ${id}-flapL { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(${isActive?-25:-12}deg)} }
        @keyframes ${id}-flapR { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(${isActive?25:12}deg)} }
        @keyframes ${id}-check { 0%,100%{transform:scale(${isActive?.75:.9});opacity:.7} 50%{transform:scale(${isActive?1.25:1.1});opacity:1} }
        .${id}-body  { animation:${id}-scale ${dur}s ease-in-out infinite; transform-origin:0 0; }
        .${id}-flapL { animation:${id}-flapL ${dur}s ease-in-out infinite; transform-origin:-7px -2px; }
        .${id}-flapR { animation:${id}-flapR ${dur}s ease-in-out infinite; transform-origin:7px -2px; }
        .${id}-check { animation:${id}-check ${dur}s ease-in-out infinite; transform-origin:0 0; }
      `}</style>
      <g className={`${id}-body`}>
        <path d="M -7,-2 L 7,-2 L 7,7 L -7,7 Z" fill="none" stroke={color} strokeWidth={2} strokeLinejoin="round" />
        <path d="M -7,-2 L -11,-5 L -4,-5" fill="none" stroke={color} strokeWidth={1.5} className={`${id}-flapL`} />
        <path d="M 7,-2 L 11,-5 L 4,-5" fill="none" stroke={color} strokeWidth={1.5} className={`${id}-flapR`} />
      </g>
      <path d="M -3,2 L -1,4 L 3.5,-1.5" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={`${id}-check`} />
    </g>
  )
}

// ─── 5. Eye (Inventory Visibility) ───────────────────────────────────────────
export function EyeIcon({ isActive, color }: IconProps) {
  const id = 'eye'
  const travel = isActive ? 3.5 : 2
  const dur = isActive ? 2.25 : 3.75
  return (
    <g overflow="visible" aria-hidden>
      <style>{`
        @keyframes ${id}-pupil { 0%,100%{transform:translateX(-${travel}px)} 50%{transform:translateX(${travel}px)} }
        .${id}-pupil { animation:${id}-pupil ${dur}s ease-in-out infinite; }
      `}</style>
      <path d="M -11,0 Q 0,-7 11,0 Q 0,7 -11,0 Z" fill="none" stroke={color} strokeWidth={2} />
      <circle cx={0} cy={0} r={3} fill={color} className={`${id}-pupil`} />
    </g>
  )
}

// ─── 6. Paper Plane (Release Instruction) ────────────────────────────────────
export function PlaneIcon({ isActive, color }: IconProps) {
  const id = 'plane'
  const dx = isActive ? 7 : 4
  const dy = isActive ? -7 : -4
  const dur = isActive ? 1.65 : 2.75
  return (
    <g overflow="visible" aria-hidden>
      <style>{`
        @keyframes ${id}-fly { 0%,100%{transform:translate(-${dx/2}px,${Math.abs(dy)/2}px);opacity:.6} 50%{transform:translate(${dx/2}px,${dy/2}px);opacity:1} }
        @keyframes ${id}-trail { 0%,100%{opacity:0} 50%{opacity:.8} }
        .${id}-body  { animation:${id}-fly ${dur}s ease-in-out infinite; }
        .${id}-trail { animation:${id}-trail ${dur}s ease-in-out infinite; }
      `}</style>
      <g className={`${id}-body`}>
        <path d="M -8,5 L 8,-7 L -2,0 Z" fill={color} />
        <path d="M -8,5 L -2,0 L -5,2 Z" fill={color} opacity={0.7} />
      </g>
      <line x1={-10} y1={8} x2={-6} y2={4} stroke={color} strokeWidth={1} className={`${id}-trail`} />
    </g>
  )
}


// ─── 7. Package with Arrow (Outbound Execution) ───────────────────────────────
export function PackageIcon({ isActive, color }: IconProps) {
  const id = 'pkg'
  const travel = isActive ? -9 : -6
  const dur = isActive ? 1.35 : 2.25
  return (
    <g overflow="visible" aria-hidden>
      <style>{`
        @keyframes ${id}-arrow { 0%{transform:translateY(3px);opacity:0} 40%{opacity:1} 100%{transform:translateY(${travel}px);opacity:0} }
        .${id}-arrow { animation:${id}-arrow ${dur}s linear infinite; transform-origin:0 0; }
      `}</style>
      <path d="M -8,2 L 8,2 L 6,8 L -6,8 Z" fill="none" stroke={color} strokeWidth={1.5} />
      <path d="M -8,2 L -11,-1" stroke={color} strokeWidth={1.5} />
      <path d="M 8,2 L 11,-1" stroke={color} strokeWidth={1.5} />
      <g className={`${id}-arrow`}>
        <path d="M -3,-2 L 0,-5 L 3,-2" fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
        <line x1={0} y1={-5} x2={0} y2={1} stroke={color} strokeWidth={1.5} />
      </g>
    </g>
  )
}

// ─── 8. Map Pin (Final Delivery) ──────────────────────────────────────────────
export function MapPinIcon({ isActive, color }: IconProps) {
  const id = 'pin'
  const bounce = isActive ? -5 : -2.5
  const dur = isActive ? 1.35 : 2.25
  return (
    <g overflow="visible" aria-hidden>
      <style>{`
        @keyframes ${id}-ripple { 0%{transform:scale(.4);opacity:1} 100%{transform:scale(${isActive?2.1:1.6});opacity:0} }
        @keyframes ${id}-bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(${bounce}px)} }
        .${id}-ripple { animation:${id}-ripple ${dur}s ease-out infinite; transform-origin:0px 8px; }
        .${id}-body   { animation:${id}-bounce ${dur}s ease-in-out infinite; transform-origin:0 0; }
      `}</style>
      <ellipse cx={0} cy={8} rx={8} ry={2.5} fill="none" stroke={color} strokeWidth={1} className={`${id}-ripple`} />
      <g className={`${id}-body`}>
        <path d="M 0,-7 C -4.5,-7 -7,-4.5 -7,-1 C -7,3.5 0,9 0,9 C 0,9 7,3.5 7,-1 C 7,-4.5 4.5,-7 0,-7 Z" fill={color} />
        <circle cx={0} cy={-2} r={2} fill="var(--color-bg)" />
      </g>
    </g>
  )
}

// ─── Lookup array for easy index-based rendering ──────────────────────────────
const ICONS = [
  RadarIcon, NetworkIcon, ShipIcon, BoxIcon,
  EyeIcon, PlaneIcon, PackageIcon, MapPinIcon,
]

/**
 * Drop-in replacement for <WaypointAnimation>.
 * Same props interface — swap with a single import change.
 */
export function WaypointIcon({ index, color, isActive }: {
  index: number
  color: string
  isActive: boolean
}) {
  const Icon = ICONS[index % ICONS.length]
  return <Icon color={color} isActive={isActive} />
}
