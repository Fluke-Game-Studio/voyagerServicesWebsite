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

interface StackSectionProps {
  id?: string
  children: React.ReactNode
  zIndex: number
  bg: string
  panelClassName?: string
  /** Only set this for sections that need extra scroll time (e.g. Process → "md:h-[200vh]") */
  trackHeight?: string
  noRound?: boolean
}

/**
 * Card-stack layout primitive.
 *
 * NORMAL sections → single sticky div. All siblings share the same scroll parent,
 * so each section slides up and stacks on top of the previous one as you scroll.
 *
 * PROCESS section → two-div pattern (outer track = 200vh, inner sticky panel = 100vh)
 * so the path animation plays fully before the next card covers it.
 */
function StackSection({ id, children, zIndex, bg, panelClassName, trackHeight, noRound }: StackSectionProps) {
  const cardClasses = [
    'w-full min-h-screen flex flex-col justify-center',
    bg,
    panelClassName || '',
    noRound ? '' : 'md:rounded-t-[20px] md:shadow-[0_-8px_32px_rgba(0,0,0,0.2)]',
  ].join(' ')

  if (trackHeight) {
    // Two-div: outer provides scroll length, inner sticks for that duration
    return (
      <div id={id} className={`relative w-full ${trackHeight}`} style={{ zIndex }}>
        <div className={`md:sticky md:top-0 md:h-screen ${cardClasses}`}>
          {children}
        </div>
      </div>
    )
  }

  // Single sticky div — the classic card stack pattern
  return (
    <div
      id={id}
      className={`md:sticky md:top-0 ${cardClasses}`}
      style={{ zIndex }}
    >
      {children}
    </div>
  )
}

export function Landing() {
  return (
    <>
      <StackSection zIndex={10} bg="bg-[var(--color-bg)]" noRound>
        <Hero />
      </StackSection>

      <StackSection zIndex={20} bg="bg-[var(--color-surface)]" panelClassName="pt-20">
        <Gap />
      </StackSection>

      <StackSection zIndex={30} bg="bg-[var(--color-bg)]" panelClassName="pt-20">
        <Market />
      </StackSection>

      <StackSection zIndex={40} bg="bg-[var(--color-surface)]" panelClassName="pt-20">
        <Suspense fallback={<SectionSkeleton minH="min-h-[480px]" />}>
          <ControlTower />
        </Suspense>
      </StackSection>

      {/* Process: sticky like other sections. Animation starts early so path completes before Services slides on top. */}
      <StackSection id="process-track" zIndex={50} bg="bg-[var(--color-bg)]" panelClassName="pt-20">
        <Suspense fallback={<SectionSkeleton minH="min-h-[640px]" />}>
          <Process />
        </Suspense>
      </StackSection>

      <StackSection zIndex={60} bg="bg-[var(--color-surface)]" panelClassName="pt-20">
        <Suspense fallback={<SectionSkeleton />}>
          <Services />
        </Suspense>
      </StackSection>

      <StackSection zIndex={70} bg="bg-[var(--color-bg)]" panelClassName="pt-20">
        <Suspense fallback={<SectionSkeleton />}>
          <WhyVoyager />
        </Suspense>
      </StackSection>

      <StackSection zIndex={80} bg="bg-[var(--color-surface)]" panelClassName="pt-20">
        <Suspense fallback={<SectionSkeleton />}>
          <Audiences />
        </Suspense>
      </StackSection>

      <StackSection zIndex={90} bg="bg-[var(--color-bg)]" panelClassName="pt-20">
        <Suspense fallback={<SectionSkeleton />}>
          <CTA />
        </Suspense>
      </StackSection>
    </>
  )
}

