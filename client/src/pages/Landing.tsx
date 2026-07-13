import { lazy, Suspense } from 'react'
import { Hero } from '@/sections/Hero'
import { Gap } from '@/sections/Gap'
import { Market } from '@/sections/Market'

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

export function Landing() {
  return (
    <>
      {/* Above the fold — render instantly */}
      <Hero />
      <Gap />
      <Market />

      {/* Below the fold — JS loads as user scrolls, skeleton holds height */}
      <Suspense fallback={<SectionSkeleton minH="min-h-[480px]" />}>
        <ControlTower />
      </Suspense>
      <Suspense fallback={<SectionSkeleton minH="min-h-[640px]" />}>
        <Process />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <Services />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <WhyVoyager />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <Audiences />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <CTA />
      </Suspense>
    </>
  )
}
