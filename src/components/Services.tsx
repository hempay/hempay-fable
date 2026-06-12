import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Globe,
  CreditCard,
  ArrowLeftRight,
  Languages,
  Building2,
  Shield,
  Smartphone,
} from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import { SERVICES } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

const ICONS = [Globe, CreditCard, ArrowLeftRight, Languages, Building2, Shield, Smartphone]

/* Horizontal-scroll gallery of services (vertical stack on mobile) */
export default function Services() {
  const rootRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add('(min-width: 1024px)', () => {
        const track = trackRef.current!
        const getDistance = () => track.scrollWidth - window.innerWidth

        const tween = gsap.to(track, {
          x: () => -getDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top top',
            end: () => `+=${getDistance()}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        return () => {
          tween.scrollTrigger?.kill()
          tween.kill()
        }
      })

      mm.add('(max-width: 1023px)', () => {
        const cards = gsap.utils.toArray<HTMLElement>('[data-service-card]')
        cards.forEach((card) => {
          gsap.from(card, {
            opacity: 0,
            y: 48,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%', once: true },
          })
        })
      })

      return () => mm.revert()
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} id="services" className="relative overflow-hidden">
      <div className="flex flex-col py-28 lg:h-svh lg:justify-center lg:py-0">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Services"
            description="Fast, flexible, and forward-thinking. Access Hempay via mobile app, WhatsApp bot, or Telegram bot — choose what works for you."
            align="left"
            className="mb-14 lg:mb-16"
          >
            Your portal to the <span className="serif-accent text-gradient">future of finance.</span>
          </SectionHeading>
        </div>

        <div
          ref={trackRef}
          className="flex flex-col gap-5 px-5 sm:px-8 lg:flex-row lg:gap-6 lg:pl-[max(2rem,calc((100vw-72rem)/2+2rem))] lg:pr-24"
        >
          {SERVICES.map((s, i) => {
            const Icon = ICONS[i]
            return (
              <article
                key={s.title}
                data-service-card
                className="panel group relative shrink-0 overflow-hidden rounded-3xl p-7 transition-colors duration-500 hover:border-copper/40 lg:w-[24rem] lg:p-9"
              >
                {/* index watermark */}
                <span className="font-display pointer-events-none absolute -right-2 -top-6 text-[7rem] font-semibold leading-none text-cream/[0.035] transition-colors duration-500 group-hover:text-copper/10">
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div className="mb-7 flex h-13 w-13 items-center justify-center rounded-2xl border border-copper/30 bg-copper/10 p-3.5 transition-transform duration-500 group-hover:scale-110">
                  <Icon className="h-6 w-6 text-amber" strokeWidth={1.6} />
                </div>

                <h3 className="font-display mb-2.5 text-xl font-semibold text-cream lg:text-2xl">
                  {s.title}
                </h3>
                <p className="mb-7 text-sm leading-relaxed text-cream-2/80 lg:text-base">
                  {s.description}
                </p>

                <ul className="flex flex-wrap gap-2">
                  {s.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border hairline bg-cream/[0.04] px-3 py-1.5 text-xs font-semibold text-cream-2 transition-colors duration-300 group-hover:border-copper/25"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            )
          })}

          {/* end card */}
          <a
            href="#get-started"
            data-service-card
            className="group relative flex shrink-0 flex-col items-start justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-copper via-ember to-ink-3 p-7 lg:w-[24rem] lg:p-9"
          >
            <span className="font-display text-2xl font-semibold leading-snug text-cream lg:text-3xl">
              Ready when
              <br />
              <span className="serif-accent">you are.</span>
            </span>
            <span className="mt-10 flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-cream/90 lg:mt-0">
              Get started
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/30 transition-transform duration-500 group-hover:rotate-45">
                <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden>
                  <path d="M3 13 13 3M5.5 3H13v7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
