import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import Magnetic from './ui/Magnetic'

const NAV_LINKS = [
  { href: '#cards', label: 'Cards' },
  { href: '#features', label: 'Why Hempay' },
  { href: '#services', label: 'Services' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#faq', label: 'FAQ' },
]

interface HeaderProps {
  ready: boolean
}

export default function Header({ ready }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const barRef = useRef<HTMLElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  // Slide the bar in once the preloader finishes
  useEffect(() => {
    if (!ready) return
    gsap.fromTo(
      barRef.current,
      { y: -90 },
      { y: 0, duration: 1, ease: 'power4.out', delay: 0.15 },
    )
  }, [ready])

  // Animate mobile menu open/close
  useEffect(() => {
    const menu = menuRef.current
    if (!menu) return
    if (menuOpen) {
      document.documentElement.style.overflow = 'hidden'
      gsap.fromTo(menu, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.65, ease: 'power4.inOut' })
      gsap.fromTo(
        menu.querySelectorAll('[data-menu-link]'),
        { y: 48, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.06, delay: 0.3 },
      )
    } else {
      document.documentElement.style.overflow = ''
    }
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <header
        ref={barRef}
        className="fixed inset-x-0 top-0 z-[100] border-b hairline bg-ink/70 backdrop-blur-xl"
        style={{ transform: 'translateY(-90px)' }}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:h-[72px]">
          <a href="#top" className="flex items-center gap-2.5" aria-label="Hempay home">
            <img src="/logo.png" alt="" className="h-8 w-auto lg:h-9" />
            <span className="font-display text-lg font-semibold tracking-tight text-cream">
              Hem<span className="text-amber">Pay</span>
            </span>
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-cream-2 transition-colors duration-300 hover:bg-cream/5 hover:text-cream"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href="mailto:support@hempayfinance.com?subject=Sales%20enquiry&body=Hi%20Hempay%20team%2C%0A%0AI%27d%20like%20to%20learn%20more%20about%20Hempay%20for%20my%20business.%0A%0A"
              className="text-sm font-medium text-cream-2 transition-colors hover:text-cream"
            >
              Contact sales
            </a>
            <Magnetic strength={0.25}>
              <a href="#get-started" className="btn-primary px-5 py-2.5 text-sm">
                Create a free account
              </a>
            </Magnetic>
          </div>

          {/* Mobile burger */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="relative z-[102] flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span
              className={`h-px w-6 bg-cream transition-transform duration-300 ${menuOpen ? 'translate-y-[3.5px] rotate-45' : ''}`}
            />
            <span
              className={`h-px w-6 bg-cream transition-transform duration-300 ${menuOpen ? '-translate-y-[3.5px] -rotate-45' : ''}`}
            />
          </button>
        </nav>
      </header>

      {/* Mobile full-screen menu */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="fixed inset-0 z-[99] flex flex-col justify-between bg-ink-2 px-6 pb-10 pt-28 md:hidden"
        >
          <nav className="flex flex-col gap-2">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.href}
                data-menu-link
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-display flex items-baseline gap-4 border-b hairline py-4 text-3xl font-semibold text-cream"
              >
                <span className="text-xs font-medium text-copper">0{i + 1}</span>
                {link.label}
              </a>
            ))}
          </nav>
          <div data-menu-link className="flex flex-col gap-3">
            <a
              href="#get-started"
              onClick={() => setMenuOpen(false)}
              className="btn-primary w-full px-6 py-4 text-base"
            >
              Create a free account
            </a>
            <a
              href="mailto:support@hempayfinance.com?subject=Sales%20enquiry&body=Hi%20Hempay%20team%2C%0A%0AI%27d%20like%20to%20learn%20more%20about%20Hempay%20for%20my%20business.%0A%0A"
              onClick={() => setMenuOpen(false)}
              className="btn-ghost w-full px-6 py-4 text-base"
            >
              Contact sales
            </a>
          </div>
        </div>
      )}
    </>
  )
}
