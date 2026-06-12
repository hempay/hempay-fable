import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeading from './ui/SectionHeading'
import { FAQS } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function FAQ() {
  const rootRef = useRef<HTMLElement>(null)
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-faq-item]', {
        opacity: 0,
        y: 36,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.07,
        scrollTrigger: { trigger: '[data-faq-list]', start: 'top 82%', once: true },
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} id="faq" className="relative px-5 py-28 sm:px-8 lg:py-36">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="FAQ"
          description="Got questions? We've got answers. If you can't find what you're looking for, chat with us!"
          className="mb-14"
        >
          Asked &amp; <span className="serif-accent text-gradient">answered.</span>
        </SectionHeading>

        <div data-faq-list className="space-y-3.5">
          {FAQS.map((faq, i) => {
            const open = openIndex === i
            return (
              <div
                key={i}
                data-faq-item
                className={`panel overflow-hidden rounded-2xl transition-colors duration-500 ${
                  open ? 'border-copper/35' : ''
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : i)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left"
                >
                  <span className="font-display text-base font-semibold text-cream sm:text-lg">
                    {faq.question}
                  </span>
                  <span
                    className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
                      open ? 'rotate-45 border-amber bg-amber/10' : 'border-cream/20'
                    }`}
                    aria-hidden
                  >
                    <span className={`absolute h-3 w-px ${open ? 'bg-amber' : 'bg-cream-2'}`} />
                    <span className={`absolute h-px w-3 ${open ? 'bg-amber' : 'bg-cream-2'}`} />
                  </span>
                </button>
                <div
                  className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-sm leading-relaxed text-cream-2 sm:text-base">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
