import { cn } from '@/lib/utils'

/** Voyager wordmark with an orbit-ring + node mark echoing the hero globe. */
export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5 select-none', className)}>
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden className="shrink-0">
        <circle cx="14" cy="14" r="11" stroke="var(--color-accent)" strokeWidth="1.5" opacity="0.5" />
        <ellipse
          cx="14"
          cy="14"
          rx="11"
          ry="4.4"
          stroke="var(--color-accent-glow)"
          strokeWidth="1.5"
          transform="rotate(-28 14 14)"
          opacity="0.9"
        />
        <circle cx="14" cy="14" r="3.4" fill="var(--color-accent)" />
        <circle cx="23" cy="9.5" r="1.6" fill="var(--color-accent-glow)" />
      </svg>
      {!compact && (
        <span className="font-display leading-none">
          <span className="block text-[0.95rem] font-bold tracking-[0.14em] text-[var(--color-ink)]">VOYAGER</span>
          <span className="block text-[0.6rem] font-medium tracking-[0.42em] text-[var(--color-ink-muted)]">
            SERVICES
          </span>
        </span>
      )}
    </span>
  )
}
