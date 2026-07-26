import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from '@/lib/theme'

/*
 * Always start reloads at the top of the page.
 * Two things otherwise drag a reload into the middle of the page:
 *  1. the browser restoring the previous scroll position (jarring here, since
 *     lazy sections + the sticky stack shift heights while loading), and
 *  2. a leftover #section hash in the URL from an earlier nav click, which
 *     re-triggers the section scroll.
 * Fresh visits with a hash (shared links like /#process) still work normally.
 */
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}
const navEntry = performance.getEntriesByType('navigation')[0] as
  | PerformanceNavigationTiming
  | undefined
if (navEntry?.type === 'reload') {
  if (window.location.hash) {
    window.history.replaceState(null, '', window.location.pathname + window.location.search)
  }
  window.scrollTo(0, 0)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
