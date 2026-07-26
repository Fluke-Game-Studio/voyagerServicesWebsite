/**
 * Scrolls to a #hash target, correctly handling sections inside the sticky
 * SectionStack. `scrollIntoView` fails there: a pinned band visually sits at
 * the viewport top even while covered by later cards, so the browser believes
 * the target is already in view and won't scroll back up. Instead we compute
 * the band's *flow* position — the stack parent's document offset plus the
 * heights of every band before it — which sticky positioning can't distort.
 */
export function scrollToHashTarget(hash: string, smooth = true): boolean {
  let el: HTMLElement | null = null
  try {
    el = document.querySelector<HTMLElement>(hash)
  } catch {
    return false
  }
  if (!el) return false

  const band = el.closest<HTMLElement>('[data-stack-band]')
  let top: number

  if (band?.parentElement) {
    const parent = band.parentElement
    let flow = parent.getBoundingClientRect().top + window.scrollY
    for (const sib of Array.from(parent.children)) {
      if (sib === band) break
      flow += (sib as HTMLElement).offsetHeight
    }
    // Land with the band's top at the viewport top — the natural "this card is
    // now the top of the deck" position (band padding keeps content clear of
    // the floating navbar).
    top = flow
  } else {
    // Non-stacked pages (e.g. contact): plain offset with navbar clearance.
    top = el.getBoundingClientRect().top + window.scrollY - 88
  }

  window.scrollTo({ top: Math.max(0, top), behavior: smooth ? 'smooth' : ('instant' as ScrollBehavior) })
  return true
}
