import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Smooth-scrolls to #anchors (including cross-page /#gap links) and to top on route change. */
export function ScrollToHash() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname, hash])

  return null
}
