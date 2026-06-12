import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeading from './ui/SectionHeading'
import { FEATURES } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

/* "Why Hempay?" — editorial index rows with hover glow */
export default function Features() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-feature-row]').forEach((row) => {
        gsap.from(row, {
          opacity: 0,
          y: 56,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: row,
            start: 'top 88%',
            once: true,
          },
        })
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} id="features" className="relative px-5 py-28 sm:px-8 lg:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Why Hempay?"
          description="Creating a new era of financial freedom with innovative payments solutions."
          align="left"
          className="mb-16 lg:mb-20"
        >
          Built for how money <span className="serif-accent text-gradient">actually moves.</span>
        </SectionHeading>

        <div className="border-t hairline">
          {FEATURES.map((f) => (
            <article
              key={f.index}
              data-feature-row
              className="group relative grid cursor-default grid-cols-[auto_1fr] items-baseline gap-x-5 gap-y-3 border-b hairline py-8 transition-colors duration-500 hover:bg-cream/[0.025] sm:grid-cols-[4rem_1fr_1.2fr] sm:gap-x-10 lg:py-10"
            >
              <span className="font-display text-sm font-semibold text-copper transition-colors duration-500 group-hover:text-gold">
                {f.index}
              </span>
              <h3 className="font-display text-2xl font-semibold leading-tight text-cream transition-transform duration-500 group-hover:translate-x-2 sm:text-3xl lg:text-4xl">
                {f.title}
              </h3>
              <p className="col-span-2 max-w-xl text-base leading-relaxed text-cream-2/85 sm:col-span-1 sm:justify-self-end sm:text-lg">
                {f.description}
              </p>

              {/* hover underline sweep */}
              <span
                aria-hidden
                className="absolute bottom-[-1px] left-0 h-px w-0 bg-gradient-to-r from-copper via-amber to-transparent transition-all duration-700 ease-out group-hover:w-full"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
