import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import Magnetic from './ui/Magnetic'
import BotButtons from './ui/BotButtons'
import VCard from './ui/VCard'
import { CURRENCIES } from '../data/content'

gsap.registerPlugin(SplitText)

/* Floating currency glyphs scattered around the hero */
const GLYPHS = [
  { ch: '$', x: '8%', y: '22%', s: 'text-5xl', d: 0 },
  { ch: '€', x: '88%', y: '18%', s: 'text-4xl', d: 1.2 },
  { ch: '₦', x: '14%', y: '72%', s: 'text-6xl', d: 0.6 },
  { ch: '¥', x: '82%', y: '66%', s: 'text-5xl', d: 1.8 },
  { ch: '£', x: '70%', y: '10%', s: 'text-3xl', d: 0.3 },
  { ch: '₵', x: '28%', y: '12%', s: 'text-4xl', d: 2.1 },
]

const TICKER = ['USD', 'EUR', 'GBP', 'NGN', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'ZAR', 'GHS']

interface HeroProps {
  ready: boolean
}

export default function Hero({ ready }: HeroProps) {
  const rootRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const [hintGone, setHintGone] = useState(false)
  const topZ = useRef(10)

  // Click/tap a card → flip it, pop it to the front, and nudge its neighbours.
  // Animations target the inner [data-card-flip] wrapper so they don't fight
  // the outer card's parallax (x/rotY) and idle float (y).
  const handleCardClick = (index: number) => {
    setHintGone(true)
    const outers = gsap.utils.toArray<HTMLElement>('[data-hero-card]', stageRef.current!)
    outers.forEach((outer, i) => {
      const inner = outer.querySelector<HTMLElement>('[data-card-flip]')
      if (!inner) return
      if (i === index) {
        outer.style.zIndex = String(++topZ.current)
        gsap.to(inner, { rotationY: '+=360', duration: 1, ease: 'power3.inOut', overwrite: 'auto' })
        gsap.to(inner, {
          scale: 1.12,
          duration: 0.32,
          yoyo: true,
          repeat: 1,
          ease: 'power2.inOut',
          overwrite: false,
        })
        gsap.fromTo(
          inner,
          { y: 0 },
          { y: -22, duration: 0.7, ease: 'elastic.out(1, 0.5)', yoyo: true, repeat: 1 },
        )
      } else {
        // neighbours lean away then spring back
        const dir = i < index ? -1 : 1
        gsap.fromTo(
          inner,
          { x: 0, rotationZ: 0 },
          {
            x: dir * 34,
            rotationZ: dir * 4,
            duration: 0.32,
            yoyo: true,
            repeat: 1,
            ease: 'power2.out',
            overwrite: 'auto',
          },
        )
      }
    })
  }

  // Intro timeline — fires when the preloader curtain lifts
  useEffect(() => {
    if (!ready) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 })

      const split = SplitText.create(titleRef.current!, { type: 'lines', mask: 'lines' })
      titleRef.current!.classList.remove('split-ready')

      tl.from(split.lines, {
        yPercent: 115,
        duration: 1.15,
        ease: 'power4.out',
        stagger: 0.12,
      })
        .from(
          '[data-hero-fade]',
          { opacity: 0, y: 28, duration: 0.9, ease: 'power3.out', stagger: 0.1 },
          '-=0.6',
        )
        .from(
          '[data-hero-card]',
          {
            opacity: 0,
            y: 120,
            rotate: 0,
            scale: 0.85,
            duration: 1.4,
            ease: 'power4.out',
            stagger: 0.12,
          },
          '-=1.0',
        )
        .from(
          '[data-hero-glyph]',
          { opacity: 0, scale: 0, duration: 0.8, ease: 'back.out(2)', stagger: 0.07 },
          '-=1.1',
        )
        .from('[data-hero-ticker]', { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' }, '-=0.8')

      // Idle float for cards & glyphs
      gsap.utils.toArray<HTMLElement>('[data-hero-card]').forEach((el, i) => {
        gsap.to(el, {
          y: `+=${10 + i * 6}`,
          duration: 3 + i * 0.6,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
          delay: 1.8,
        })
      })
      gsap.utils.toArray<HTMLElement>('[data-hero-glyph]').forEach((el, i) => {
        gsap.to(el, {
          y: '+=18',
          rotation: i % 2 ? 8 : -8,
          duration: 4 + i * 0.5,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
        })
      })

      return () => split.revert()
    }, rootRef)
    return () => ctx.revert()
  }, [ready])

  // Mouse parallax on the card stage (desktop only)
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const stage = stageRef.current!
    const cards = gsap.utils.toArray<HTMLElement>('[data-hero-card]', stage.parentElement!)
    const glyphs = gsap.utils.toArray<HTMLElement>('[data-hero-glyph]', stage.parentElement!)

    const setters = cards.map((el) => ({
      x: gsap.quickTo(el, 'x', { duration: 0.9, ease: 'power3.out' }),
      rotY: gsap.quickTo(el, 'rotationY', { duration: 0.9, ease: 'power3.out' }),
      rotX: gsap.quickTo(el, 'rotationX', { duration: 0.9, ease: 'power3.out' }),
    }))
    const glyphSetters = glyphs.map((el) => ({
      x: gsap.quickTo(el, 'x', { duration: 1.4, ease: 'power3.out' }),
    }))

    const onMove = (e: MouseEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5
      const ny = e.clientY / window.innerHeight - 0.5
      setters.forEach((s, i) => {
        const depth = (i + 1) * 14
        s.x(nx * depth)
        s.rotY(nx * 10)
        s.rotX(-ny * 8)
      })
      glyphSetters.forEach((s, i) => s.x(nx * (i + 1) * -10))
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // Infinite FX ticker
  useEffect(() => {
    const track = rootRef.current!.querySelector<HTMLElement>('.marquee-track')!
    const tween = gsap.to(track, { xPercent: -50, duration: 28, ease: 'none', repeat: -1 })
    return () => {
      tween.kill()
    }
  }, [])

  const usd = CURRENCIES[0]
  const eur = CURRENCIES[1]
  const ngn = CURRENCIES[3]

  return (
    <section ref={rootRef} id="top" className="relative flex min-h-svh flex-col overflow-hidden">
      {/* ── ambient background ── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {/* copper glow */}
        <div
          className="absolute left-1/2 top-[-22%] h-[60vh] w-[90vw] -translate-x-1/2 rounded-full opacity-50 blur-[120px]"
          style={{ background: 'radial-gradient(closest-side, #7a3c14, transparent)' }}
        />
        <div
          className="absolute bottom-[-30%] right-[-10%] h-[55vh] w-[55vw] rounded-full opacity-35 blur-[130px]"
          style={{ background: 'radial-gradient(closest-side, #c96f2e, transparent)' }}
        />
        {/* fine grid */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #f3e9dc 1px, transparent 1px), linear-gradient(to bottom, #f3e9dc 1px, transparent 1px)',
            backgroundSize: '72px 72px',
            maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent)',
          }}
        />
      </div>

      {/* floating currency glyphs */}
      {GLYPHS.map((g) => (
        <span
          key={g.ch + g.x}
          data-hero-glyph
          aria-hidden
          className={`serif-accent pointer-events-none absolute z-[1] ${g.s} text-copper/25 max-md:hidden`}
          style={{ left: g.x, top: g.y }}
        >
          {g.ch}
        </span>
      ))}

      {/* ── main content ── */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-5 pb-10 pt-32 text-center sm:px-8 lg:pt-36">
        <div
          data-hero-fade
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-copper/30 bg-copper/10 px-4 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-amber"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-amber" />
          </span>
          The future of payments is here
        </div>

        <h1
          ref={titleRef}
          className="split-ready font-display text-[clamp(2.9rem,9.5vw,7.2rem)] font-semibold leading-[0.98] tracking-tight text-cream"
        >
          Go global,
          <br />
          <span className="serif-accent text-gradient pr-2">pay local.</span>
        </h1>

        <p
          data-hero-fade
          className="mt-7 max-w-2xl text-lg leading-relaxed text-cream-2 sm:text-xl"
        >
          The ultimate payment experience — up to{' '}
          <span className="font-bold text-cream">11 multi-currency virtual cards</span>, instant
          swaps, and global payments that move at the speed of chat.
        </p>

        <div data-hero-fade className="mt-9 flex flex-col items-center gap-4 sm:flex-row">
          <Magnetic>
            <a href="#get-started" className="btn-primary px-8 py-4 text-base">
              Create a free account
              <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden>
                <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </Magnetic>
          <a href="#cards" className="btn-ghost px-8 py-4 text-base">
            See the cards
          </a>
        </div>

        <div data-hero-fade className="mt-10">
          <p className="mb-4 text-[0.68rem] font-bold uppercase tracking-[0.28em] text-mute">
            Or start instantly via
          </p>
          <BotButtons />
        </div>

        {/* ── floating cards (tap to flip) ── */}
        <div
          ref={stageRef}
          className="relative z-[1] mt-14 h-44 w-full max-w-3xl sm:h-56 lg:mt-10 lg:h-64"
          style={{ perspective: '1200px' }}
        >
          <button
            type="button"
            data-hero-card
            data-cursor
            aria-label="Flip the EUR virtual card"
            onClick={() => handleCardClick(0)}
            className="absolute left-1/2 top-0 w-60 -translate-x-[88%] cursor-pointer appearance-none rounded-[1.4rem] bg-transparent p-0 outline-none focus-visible:ring-2 focus-visible:ring-amber/70 sm:w-72 lg:w-80"
            style={{ transform: 'translateX(-88%) rotate(-10deg)', transformStyle: 'preserve-3d' }}
          >
            <div data-card-flip style={{ transformStyle: 'preserve-3d' }}>
              <VCard currency={eur} number="•••• 8054" />
            </div>
          </button>
          <button
            type="button"
            data-hero-card
            data-cursor
            aria-label="Flip the NGN virtual card"
            onClick={() => handleCardClick(1)}
            className="absolute left-1/2 top-2 w-60 -translate-x-[12%] cursor-pointer appearance-none rounded-[1.4rem] bg-transparent p-0 outline-none focus-visible:ring-2 focus-visible:ring-amber/70 sm:w-72 lg:w-80"
            style={{ transform: 'translateX(-12%) rotate(9deg)', transformStyle: 'preserve-3d' }}
          >
            <div data-card-flip style={{ transformStyle: 'preserve-3d' }}>
              <VCard currency={ngn} number="•••• 2210" />
            </div>
          </button>
          <button
            type="button"
            data-hero-card
            data-cursor
            aria-label="Flip the USD virtual card"
            onClick={() => handleCardClick(2)}
            className="absolute left-1/2 top-6 z-[2] w-64 -translate-x-1/2 cursor-pointer appearance-none rounded-[1.4rem] bg-transparent p-0 outline-none focus-visible:ring-2 focus-visible:ring-amber/70 sm:w-80 lg:w-[22rem]"
            style={{ transform: 'translateX(-50%) rotate(-2deg)', transformStyle: 'preserve-3d' }}
          >
            <div data-card-flip style={{ transformStyle: 'preserve-3d' }}>
              <VCard currency={usd} number="•••• 1234" />
            </div>
          </button>
        </div>

        {/* discoverability hint */}
        <p
          data-hero-fade
          className={`mt-5 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-mute transition-opacity duration-500 ${
            hintGone ? 'opacity-0' : 'opacity-100'
          }`}
          aria-hidden
        >
          <span className="inline-block animate-bounce text-amber">✦</span>
          Tap a card to flip it
        </p>
      </div>

      {/* ── FX ticker ── */}
      <div
        data-hero-ticker
        className="relative z-10 w-full overflow-hidden border-y hairline bg-ink-2/60 py-3.5 backdrop-blur"
      >
        <div className="marquee-track items-center gap-10 pr-10">
          {[...TICKER, ...TICKER].map((code, i) => (
            <span key={i} className="flex shrink-0 items-center gap-10">
              <span className="flex items-center gap-2.5 text-sm font-bold tracking-[0.18em] text-cream-2">
                <span className="h-1.5 w-1.5 rotate-45 bg-copper" />
                {code}
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
