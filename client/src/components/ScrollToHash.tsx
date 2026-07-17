import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Smooth-scrolls to #anchors (including cross-page /#process links) and to top on route change. */
export function ScrollToHash() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
      return
    }

    // Target sections may be behind a lazy-loaded Suspense boundary and not
    // yet in the DOM, so poll briefly instead of checking only once.
    let cancelled = false
    let attempts = 0
    const tryScroll = () => {
      if (cancelled) return
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
      attempts += 1
      if (attempts < 50) setTimeout(tryScroll, 100)
    }
    tryScroll()

    return () => {
      cancelled = true
    }
  }, [pathname, hash])

  return null
}
