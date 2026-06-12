import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeading from './ui/SectionHeading'
import { STEPS } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

/* 4 steps along a scroll-drawn spine */
export default function HowItWorks() {
  const rootRef = useRef<HTMLElement>(null)
  const spineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // spine draws as you scroll through the list
      gsap.fromTo(
        spineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '[data-steps]',
            start: 'top 70%',
            end: 'bottom 55%',
            scrub: 0.6,
          },
        },
      )

      gsap.utils.toArray<HTMLElement>('[data-step]').forEach((step, i) => {
        gsap.from(step, {
          opacity: 0,
          x: i % 2 ? 60 : -60,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: step, start: 'top 82%', once: true },
        })
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} id="how-it-works" className="relative px-5 py-28 sm:px-8 lg:py-36">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="How it works"
          description="Experience the future of payments with Hempay's multi-currency virtual cards."
          className="mb-20"
        >
          Up and running in <span className="serif-accent text-gradient">four steps.</span>
        </SectionHeading>

        <div data-steps className="relative">
          {/* spine */}
          <div className="absolute inset-y-0 left-5 w-px bg-cream/8 sm:left-1/2" aria-hidden>
            <div
              ref={spineRef}
              className="h-full w-full origin-top bg-gradient-to-b from-gold via-amber to-copper"
              style={{ transform: 'scaleY(0)' }}
            />
          </div>

          <ol className="space-y-14 sm:space-y-20">
            {STEPS.map((step, i) => (
              <li
                key={step.number}
                data-step
                className={`relative flex items-start gap-7 pl-14 sm:w-1/2 sm:pl-0 ${
                  i % 2
                    ? 'sm:ml-auto sm:pl-14'
                    : 'sm:flex-row-reverse sm:pr-14 sm:text-right'
                }`}
              >
                {/* node */}
                <span
                  className={`absolute left-5 top-1.5 flex h-4 w-4 -translate-x-1/2 items-center justify-center sm:top-2 ${
                    i % 2 ? 'sm:left-0' : 'sm:left-auto sm:right-0 sm:translate-x-1/2'
                  }`}
                  aria-hidden
                >
                  <span className="absolute h-4 w-4 rounded-full bg-amber/20" />
                  <span className="h-2 w-2 rounded-full bg-amber shadow-[0_0_12px_2px_rgba(232,154,79,0.6)]" />
                </span>

                <div>
                  <span className="font-display text-5xl font-semibold text-outline sm:text-6xl">
                    {step.number}
                  </span>
                  <h3 className="font-display mb-2.5 mt-3 text-xl font-semibold text-cream sm:text-2xl">
                    {step.title}
                  </h3>
                  <p className="max-w-sm text-sm leading-relaxed text-cream-2/85 sm:text-base">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
