import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Reveal } from './Reveal'

/** Consistent section wrapper: vertical rhythm, max width, optional header. */
export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className,
  headerClassName,
}: {
  id?: string
  eyebrow?: string
  title?: ReactNode
  intro?: ReactNode
  children: ReactNode
  className?: string
  headerClassName?: string
}) {
  return (
    <section id={id} className={cn('relative mx-auto w-full max-w-6xl px-6 py-8 md:py-10 lg:py-12', className)}>
      {(eyebrow || title || intro) && (
        <Reveal className={cn('mb-4 md:mb-6 max-w-2xl', headerClassName)}>
          {eyebrow && <p className="label-mono mb-2">{eyebrow}</p>}
          {title && (
            <h2 className="font-display text-3xl font-semibold leading-[1.1] tracking-tight text-[var(--color-ink)] md:text-[2.75rem]">
              {title}
            </h2>
          )}
          {intro && <p className="mt-3 text-base leading-relaxed text-[var(--color-ink-muted)]">{intro}</p>}
        </Reveal>
      )}
      {children}
    </section>
  )
}
