import type { Variants, Transition } from 'framer-motion'

/** Shared easing — an ease-out curve that feels fast then settles. */
export const EASE: Transition['ease'] = [0.16, 1, 0.3, 1]

/** Fade + rise, the workhorse scroll reveal. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

/** Container that staggers its children as the group enters. */
export const staggerContainer = (stagger = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
})

/** Standard viewport config: reveal once, a little into view. */
export const viewportOnce = { once: true, amount: 0.2, margin: '0px 0px -10% 0px' } as const
