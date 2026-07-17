import { lazy, Suspense } from 'react'
import { Hero } from '@/sections/Hero'

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
 * Full-width section band: alternating backgrounds and a hairline divider give
 * the page rhythm while sections scroll in normal document flow. Each section
 * animates its own content into view (Reveal / whileInView staggers).
 */
function Band({ bg, children }: { bg: string; children: React.ReactNode }) {
  return (
    <div className={`relative border-t border-[var(--color-border-soft)] py-10 md:py-14 ${bg}`}>
      {children}
    </div>
  )
}

export function Landing() {
  return (
    <>
      <Hero />

      <Band bg="bg-[var(--color-surface)]">
        <Suspense fallback={<SectionSkeleton minH="min-h-[480px]" />}>
          <ControlTower />
        </Suspense>
      </Band>

      <Band bg="bg-[var(--color-bg)]">
        <Suspense fallback={<SectionSkeleton minH="min-h-[640px]" />}>
          <Process />
        </Suspense>
      </Band>

      <Band bg="bg-[var(--color-surface)]">
        <Suspense fallback={<SectionSkeleton />}>
          <Services />
        </Suspense>
      </Band>

      <Band bg="bg-[var(--color-bg)]">
        <Suspense fallback={<SectionSkeleton />}>
          <WhyVoyager />
        </Suspense>
      </Band>

      <Band bg="bg-[var(--color-surface)]">
        <Suspense fallback={<SectionSkeleton />}>
          <Audiences />
        </Suspense>
      </Band>

      <Band bg="bg-[var(--color-bg)]">
        <Suspense fallback={<SectionSkeleton />}>
          <CTA />
        </Suspense>
      </Band>
    </>
  )
}
