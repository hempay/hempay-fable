import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import Magnetic from './ui/Magnetic'
import BotButtons from './ui/BotButtons'

gsap.registerPlugin(ScrollTrigger, SplitText)

/* Final call: huge type, magnetic button, bots */
export default function CTA() {
  const rootRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const split = SplitText.create(titleRef.current!, {
        type: 'lines',
        mask: 'lines',
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.lines, {
            yPercent: 115,
            duration: 1.1,
            ease: 'power4.out',
            stagger: 0.1,
            scrollTrigger: { trigger: rootRef.current, start: 'top 75%', once: true },
          }),
      })
      titleRef.current!.classList.remove('split-ready')

      gsap.from('[data-cta-fade]', {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: { trigger: rootRef.current, start: 'top 70%', once: true },
      })

      return () => split.revert()
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={rootRef}
      id="get-started"
      className="relative overflow-hidden px-5 py-32 text-center sm:px-8 lg:py-44"
    >
      {/* glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[80vh] w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-[140px]"
        style={{ background: 'radial-gradient(closest-side, #7a3c14, transparent)' }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-4xl">
        <span
          data-cta-fade
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-copper/30 bg-copper/10 px-4 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-amber"
        >
          Start your journey today
        </span>

        <h2
          ref={titleRef}
          className="split-ready font-display text-[clamp(2.6rem,7.5vw,5.8rem)] font-semibold leading-[1.0] tracking-tight text-cream"
        >
          Ready for the future
          <br />
          <span className="serif-accent text-gradient">of payments?</span>
        </h2>

        <p data-cta-fade className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-cream-2 sm:text-lg">
          Join thousands of users who trust Hempay for their multi-currency virtual card needs.
          Start via app, WhatsApp, or Telegram!
        </p>

        <div data-cta-fade className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Magnetic>
            <a href="#top" className="btn-primary px-9 py-4.5 text-lg">
              Create a free account
            </a>
          </Magnetic>
          <a href="#top" className="btn-ghost px-9 py-4.5 text-lg">
            Contact sales
          </a>
        </div>

        <div data-cta-fade className="mt-8 flex justify-center">
          <BotButtons />
        </div>
      </div>
    </section>
  )
}
