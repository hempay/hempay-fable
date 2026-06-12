import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FOOTER_LINKS, COMPANY } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // giant wordmark rises from below the fold
      gsap.fromTo(
        '[data-footer-word]',
        { yPercent: 42 },
        {
          yPercent: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: 0.6,
          },
        },
      )
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <footer ref={rootRef} className="relative overflow-hidden border-t hairline bg-ink-2/60">
      <div className="mx-auto max-w-6xl px-5 pt-16 sm:px-8 lg:pt-20">
        <div className="grid gap-12 pb-16 md:grid-cols-[1.4fr_repeat(4,1fr)] lg:gap-8">
          {/* brand */}
          <div>
            <a href="#top" className="mb-5 flex items-center gap-2.5">
              <img src="/logo.png" alt="Hempay" className="h-9 w-auto" />
              <span className="font-display text-xl font-semibold text-cream">
                Hem<span className="text-amber">Pay</span>
              </span>
            </a>
            <p className="mb-5 max-w-xs text-sm leading-relaxed text-cream-2/80">
              The Ultimate Payment Experience. Go Global, Pay Local with Hempay's Multi-Currency
              Virtual Cards.
            </p>
            <p className="max-w-xs text-xs leading-relaxed text-mute">
              Registered business name: <span className="font-semibold text-cream-2">{COMPANY.name}</span>{' '}
              ({COMPANY.rc}).
            </p>
          </div>

          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <nav key={title} aria-label={title}>
              <h3 className="mb-5 text-[0.68rem] font-bold uppercase tracking-[0.25em] text-mute">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith('/') ? (
                      <Link
                        to={link.href}
                        className="text-sm text-cream-2 transition-colors duration-300 hover:text-amber"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-sm text-cream-2 transition-colors duration-300 hover:text-amber"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t hairline py-7 text-center md:flex-row md:text-left">
          <p className="text-xs text-mute">
            © {new Date().getFullYear()} {COMPANY.name} ({COMPANY.rc}). All rights reserved.
          </p>
          <p className="text-xs text-mute">{COMPANY.tagline}</p>
        </div>
      </div>

      {/* giant wordmark */}
      <div className="pointer-events-none relative flex justify-center overflow-hidden" aria-hidden>
        <span
          data-footer-word
          className="font-display block translate-y-[42%] whitespace-nowrap text-[clamp(5rem,18vw,16rem)] font-bold leading-[0.78] tracking-tight"
          style={{
            background: 'linear-gradient(180deg, rgba(201,111,46,0.5), rgba(201,111,46,0.04))',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          HEMPAY
        </span>
      </div>
    </footer>
  )
}
