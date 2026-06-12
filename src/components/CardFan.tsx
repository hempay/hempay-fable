import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import VCard from './ui/VCard'
import { CURRENCIES } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

/* Signature moment: a pinned scene where all 11 currency cards
   fan out of a single stack as you scroll. */
export default function CardFan() {
  const rootRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('[data-fan-card]')
      const mid = (cards.length - 1) / 2

      const mm = gsap.matchMedia()

      mm.add(
        {
          desktop: '(min-width: 768px)',
          mobile: '(max-width: 767px)',
        },
        (mmCtx) => {
          const { desktop } = mmCtx.conditions as { desktop: boolean }
          const spreadAngle = desktop ? 14 : 9.5
          const lift = desktop ? 70 : 36

          // start stacked
          gsap.set(cards, {
            rotation: 0,
            x: 0,
            y: 40,
            transformOrigin: '50% 320%',
          })

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: rootRef.current,
              start: 'top top',
              end: desktop ? '+=2200' : '+=1500',
              scrub: 1,
              pin: true,
              anticipatePin: 1,
            },
          })

          // headline drifts up slightly & fades behind the fan
          tl.fromTo(
            '[data-fan-title]',
            { y: 0 },
            { y: desktop ? -40 : -20, duration: 1, ease: 'none' },
            0,
          )

          // fan out
          cards.forEach((card, i) => {
            const offset = i - mid
            tl.to(
              card,
              {
                rotation: offset * spreadAngle,
                y: 40 - Math.abs(offset) * (lift / mid) * -1,
                duration: 1,
                ease: 'power1.inOut',
              },
              0.08 + Math.abs(offset) * 0.04,
            )
          })

          // counter 01 → 11
          const counter = { v: 1 }
          tl.to(
            counter,
            {
              v: 11,
              duration: 0.9,
              ease: 'none',
              onUpdate: () => {
                if (counterRef.current) {
                  counterRef.current.textContent = String(Math.round(counter.v)).padStart(2, '0')
                }
              },
            },
            0.08,
          )

          // gentle settle: slight breathing scale on the whole stage
          tl.fromTo(stageRef.current, { scale: 0.96 }, { scale: 1, duration: 1.2, ease: 'power1.out' }, 0)
        },
      )

      return () => mm.revert()
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} id="cards" className="relative overflow-hidden">
      <div className="relative flex h-svh flex-col items-center justify-center">
        {/* backdrop glow */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[70vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[140px]"
          style={{ background: 'radial-gradient(closest-side, #7a3c14, transparent)' }}
          aria-hidden
        />

        <div data-fan-title className="relative z-10 px-5 text-center">
          <span className="mb-5 inline-flex items-center gap-3 text-[0.7rem] font-bold uppercase tracking-[0.3em] text-amber">
            <span className="h-px w-8 bg-copper/60" />
            One wallet, eleven currencies
            <span className="h-px w-8 bg-copper/60" />
          </span>
          <h2 className="font-display text-[clamp(2.4rem,7vw,5.5rem)] font-semibold leading-[1.02] text-cream">
            <span ref={counterRef} className="text-gradient tabular-nums">
              01
            </span>{' '}
            cards.
            <br />
            <span className="serif-accent text-cream-2">Infinite reach.</span>
          </h2>
        </div>

        {/* the fan */}
        <div
          ref={stageRef}
          className="pointer-events-none relative z-[5] mt-6 h-[44vh] w-full max-w-5xl sm:mt-2"
          aria-hidden
        >
          {CURRENCIES.map((c, i) => (
            <div
              key={c.code}
              data-fan-card
              className="absolute left-1/2 top-8 w-52 -translate-x-1/2 sm:w-64 lg:w-72"
              style={{ zIndex: i }}
            >
              <VCard currency={c} number={`••••  ${String(1111 * ((i % 8) + 1)).padStart(4, '0')}`} />
            </div>
          ))}
        </div>

        <p className="relative z-10 mt-4 max-w-md px-6 text-center text-sm leading-relaxed text-mute sm:text-base">
          Create up to 11 virtual cards — one for every currency you live in. Customise each one
          and spend anywhere on earth.
        </p>
      </div>
    </section>
  )
}
