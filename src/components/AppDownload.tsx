import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Smartphone } from 'lucide-react'
import BotButtons from './ui/BotButtons'
import { AppleIcon, PlayIcon } from './ui/icons'
import { LINKS } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

/* Big copper panel: get the app or use the bots */
export default function AppDownload() {
  const rootRef = useRef<HTMLElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        panelRef.current,
        { scale: 0.92, opacity: 0.6, borderRadius: '4rem' },
        {
          scale: 1,
          opacity: 1,
          borderRadius: '2.5rem',
          ease: 'power2.out',
          scrollTrigger: {
            trigger: panelRef.current,
            start: 'top 85%',
            end: 'top 35%',
            scrub: 0.6,
          },
        },
      )

      gsap.from('[data-dl-item]', {
        opacity: 0,
        y: 36,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: panelRef.current, start: 'top 60%', once: true },
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="relative px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div
          ref={panelRef}
          className="relative overflow-hidden px-7 py-16 text-center sm:px-12 lg:px-20 lg:py-24"
          style={{
            borderRadius: '2.5rem',
            background:
              'radial-gradient(130% 160% at 50% -30%, #c96f2e 0%, #7a3c14 42%, #2a1408 100%)',
          }}
        >
          {/* texture rings */}
          <div className="pointer-events-none absolute inset-0 opacity-20" aria-hidden>
            {[28, 46, 64, 82].map((r) => (
              <span
                key={r}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cream/30"
                style={{ width: `${r}rem`, height: `${r}rem` }}
              />
            ))}
          </div>

          <div className="relative z-10">
            <span
              data-dl-item
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-cream/25 bg-cream/10 px-4 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-cream backdrop-blur"
            >
              <Smartphone className="h-3.5 w-3.5" />
              Available everywhere
            </span>

            <h2
              data-dl-item
              className="font-display mx-auto max-w-3xl text-4xl font-semibold leading-[1.04] text-cream sm:text-5xl lg:text-6xl"
            >
              Access Hempay <span className="serif-accent">anywhere.</span>
            </h2>

            <p data-dl-item className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-cream/80 sm:text-lg">
              Download our mobile app or use our WhatsApp and Telegram bots. Choose what works best
              for you!
            </p>

            <div data-dl-item className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={LINKS.appStore}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-3 rounded-2xl bg-ink px-6 py-3.5 transition-transform duration-300 hover:-translate-y-1 sm:w-auto"
              >
                <AppleIcon className="h-7 w-7 text-cream" />
                <span className="text-left leading-tight">
                  <span className="block text-[0.6rem] uppercase tracking-wider text-cream-2">
                    Download on the
                  </span>
                  <span className="font-display block text-base font-semibold text-cream">App Store</span>
                </span>
              </a>
              <a
                href={LINKS.playStore}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-3 rounded-2xl bg-ink px-6 py-3.5 transition-transform duration-300 hover:-translate-y-1 sm:w-auto"
              >
                <PlayIcon className="h-6 w-6 text-cream" />
                <span className="text-left leading-tight">
                  <span className="block text-[0.6rem] uppercase tracking-wider text-cream-2">
                    Get it on
                  </span>
                  <span className="font-display block text-base font-semibold text-cream">Google Play</span>
                </span>
              </a>
            </div>

            <p data-dl-item className="mb-4 mt-9 text-[0.68rem] font-bold uppercase tracking-[0.28em] text-cream/60">
              No download? No problem
            </p>
            <div data-dl-item className="flex justify-center">
              <BotButtons />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
