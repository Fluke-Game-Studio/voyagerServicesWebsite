import { Link } from 'react-router-dom'
import { Logo } from './Logo'
import { BRAND } from '@/lib/content'

export function Footer() {
  return (
    <footer className="relative z-50 md:z-[100] border-t border-[var(--color-border-soft)] bg-[var(--color-bg-soft)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-[var(--color-ink-muted)]">{BRAND.promise}</p>
        </div>

        <div>
          <p className="label-mono mb-4">Explore</p>
          <ul className="space-y-2.5 text-sm text-[var(--color-ink-muted)]">
            <li><a href="/#gap" className="hover:text-[var(--color-ink)]">The Gap</a></li>
            <li><a href="/#market" className="hover:text-[var(--color-ink)]">Market & Timing</a></li>
            <li><a href="/#process" className="hover:text-[var(--color-ink)]">How it works</a></li>
            <li><a href="/#services" className="hover:text-[var(--color-ink)]">Services</a></li>
          </ul>
        </div>

        <div>
          <p className="label-mono mb-4">Get in touch</p>
          <ul className="space-y-2.5 text-sm text-[var(--color-ink-muted)]">
            <li><Link to="/contact" className="hover:text-[var(--color-ink)]">Contact us</Link></li>
            <li><Link to="/contact?role=warehouse" className="hover:text-[var(--color-ink)]">Become a partner</Link></li>
            <li><Link to="/contact?role=investor" className="hover:text-[var(--color-ink)]">Investor enquiries</Link></li>
            <li><a href={`mailto:${BRAND.email}`} className="hover:text-[var(--color-ink)]">{BRAND.email}</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[var(--color-border-soft)]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-6 text-xs text-[var(--color-ink-faint)] sm:flex-row">
          <p>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
          <p className="font-mono">Managed U.S. supply chain · asset-light control tower</p>
        </div>
      </div>
    </footer>
  )
}
