import { lazy, Suspense } from 'react'
import { Hero } from '@/sections/Hero'
import { SectionStack } from '@/components/SectionStack'

// Below-the-fold sections — lazy-loaded so their JS doesn't block initial paint
const ControlTower   = lazy(() => import('@/sections/ControlTower').then(m => ({ default: m.ControlTower })))
const Process        = lazy(() => import('@/sections/Process').then(m => ({ default: m.Process })))
const Services       = lazy(() => import('@/sections/Services').then(m => ({ default: m.Services })))
const WhyVoyager     = lazy(() => import('@/sections/WhyVoyager').then(m => ({ default: m.WhyVoyager })))
const Audiences      = lazy(() => import('@/sections/Audiences').then(m => ({ default: m.Audiences })))
const CTA            = lazy(() => import('@/sections/CTA').then(m => ({ default: m.CTA })))

/** Invisible height holder — prevents layout shift when a lazy section resolves */
function SectionSkeleton({ minH = 'min-h-[320px]' }: { minH?: string }) {
  return <div className={`w-full ${minH}`} />
}

/**
 * Shared shell for every stacked band: hairline top edge, rounded "card" top,
 * soft lift shadow, clipped corners. Backgrounds alternate for rhythm and must
 * stay opaque so a covered band disappears behind the incoming one.
 */
const band =
  'overflow-clip rounded-t-[1.75rem] border-t border-[var(--color-border-soft)] ' +
  'shadow-[0_-28px_60px_-30px_rgba(2,6,23,0.55)] py-10 md:py-14'

export function Landing() {
  return (
    <SectionStack
      bands={[
        {
          key: 'hero',
          flush: true,
          className: 'bg-[var(--color-bg)]',
          node: <Hero />,
        },
        {
          key: 'control-tower',
          className: `${band} bg-[var(--color-surface)]`,
          node: (
            <Suspense fallback={<SectionSkeleton minH="min-h-[480px]" />}>
              <ControlTower />
            </Suspense>
          ),
        },
        {
          key: 'process',
          className: `${band} bg-[var(--color-bg)]`,
          node: (
            <Suspense fallback={<SectionSkeleton minH="min-h-[640px]" />}>
              <Process />
            </Suspense>
          ),
        },
        {
          key: 'services',
          className: `${band} bg-[var(--color-surface)]`,
          node: (
            <Suspense fallback={<SectionSkeleton />}>
              <Services />
            </Suspense>
          ),
        },
        {
          key: 'why',
          className: `${band} bg-[var(--color-bg)]`,
          node: (
            <Suspense fallback={<SectionSkeleton />}>
              <WhyVoyager />
            </Suspense>
          ),
        },
        {
          key: 'audiences',
          className: `${band} bg-[var(--color-surface)]`,
          node: (
            <Suspense fallback={<SectionSkeleton />}>
              <Audiences />
            </Suspense>
          ),
        },
        {
          key: 'cta',
          className: `${band} bg-[var(--color-bg)]`,
          node: (
            <Suspense fallback={<SectionSkeleton />}>
              <CTA />
            </Suspense>
          ),
        },
      ]}
    />
  )
}
