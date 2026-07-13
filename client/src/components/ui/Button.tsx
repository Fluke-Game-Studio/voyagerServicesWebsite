import { forwardRef } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'ghost' | 'outline'
type Size = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-200 ' +
  'active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap'

const variants: Record<Variant, string> = {
  primary:
    'bg-[var(--color-accent)] text-[#04101f] hover:bg-[var(--color-accent-glow)] ' +
    'shadow-[0_0_28px_-6px_var(--color-accent)] hover:shadow-[0_0_38px_-4px_var(--color-accent-glow)]',
  outline:
    'border border-[var(--color-border)] text-[var(--color-ink)] bg-[var(--color-surface)]/40 ' +
    'hover:border-[var(--color-accent)] hover:bg-[var(--color-surface)]',
  ghost: 'text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]',
}

const sizes: Record<Size, string> = {
  sm: 'text-sm px-4 h-9',
  md: 'text-sm px-5 h-11',
  lg: 'text-base px-7 h-13',
}

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  to?: string
  href?: string
}

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ className, variant = 'primary', size = 'md', to, href, children, ...props }, ref) => {
    const classes = cn(base, variants[variant], sizes[size], className)
    if (to) {
      return (
        <Link to={to} className={classes}>
          {children}
        </Link>
      )
    }
    if (href) {
      return (
        <a href={href} className={classes}>
          {children}
        </a>
      )
    }
    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    )
  },
)
Button.displayName = 'Button'
