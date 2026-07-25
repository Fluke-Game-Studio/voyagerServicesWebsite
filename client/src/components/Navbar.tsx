import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Logo } from './Logo'
import { Button } from './ui/Button'
import { ThemeToggle } from './ThemeToggle'
import { cn } from '@/lib/utils'
import { scrollToHashTarget } from '@/lib/scrollToHash'

const NAV_LINKS = [
  { label: 'How it works', href: '/#process' },
  { label: 'Services', href: '/#services' },
  { label: 'Who we serve', href: '/#audiences' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  /**
   * Handles section links in all cases the plain <a> can't:
   * on '/', scroll directly (works even when the hash is unchanged — the
   * router wouldn't re-fire — and navigates the sticky stack correctly);
   * from other pages, route to '/#x' client-side instead of a full reload.
   */
  const onNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const hash = href.slice(href.indexOf('#')) // '/#process' -> '#process'
    e.preventDefault()
    setOpen(false)
    if (pathname === '/') {
      if (window.location.hash !== hash) window.history.pushState(null, '', hash)
      scrollToHashTarget(hash)
    } else {
      navigate(`/${hash}`)
    }
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  return (
    <header
      className={cn(
        'fixed left-1/2 -translate-x-1/2 z-[200] overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
        scrolled
          ? 'top-4 w-[calc(100%-2rem)] max-w-5xl rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-bg)]/85 backdrop-blur-xl shadow-lg shadow-black/10'
          : 'top-0 w-full max-w-none bg-transparent border-b border-transparent',
      )}
    >
      <nav className="mx-auto flex h-18 max-w-6xl items-center justify-between px-6 py-3">
        <Link to="/" aria-label="Voyager Services home">
          <Logo />
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={(e) => onNavClick(e, l.href)}
              className="text-sm text-[var(--color-ink-muted)] transition-colors hover:text-[var(--color-ink)]"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <Button to="/contact" variant="outline" size="sm">
            Talk to us
          </Button>
          <Button to="/contact?role=investor" size="sm">
            Partner with us
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            className="text-[var(--color-ink)]"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-[var(--color-border-soft)] bg-[var(--color-bg)]/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={(e) => onNavClick(e, l.href)}
                  className="py-2 text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
                >
                  {l.label}
                </a>
              ))}
              <div className="mt-3 flex flex-col gap-2">
                <Button to="/contact" variant="outline">
                  Talk to us
                </Button>
                <Button to="/contact?role=investor">Partner with us</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
