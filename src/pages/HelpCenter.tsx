import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

import Header from '../components/Header'
import Footer from '../components/Footer'
import { HELP_CATEGORIES, SUPPORT_EMAIL } from '../data/support'

gsap.registerPlugin(ScrollTrigger, SplitText)

const ICONS: Record<string, string> = {
  rocket: 'M5 15c-1.5 1.2-2 4-2 4s2.8-.5 4-2M9 11a12 12 0 0 1 7-7c2 0 3 1 3 3a12 12 0 0 1-7 7l-3 .5L8.5 14 9 11ZM14 9.5a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4Z',
  card: 'M3 6.5h16v10H3v-10Zm0 3.2h16M6 13.5h4',
  shield: 'M11 3.5 4.5 6v4.5c0 4 2.8 6.6 6.5 8 3.7-1.4 6.5-4 6.5-8V6L11 3.5Zm-2.4 7.3 1.9 1.9 3.5-3.6',
  globe: 'M11 3.5a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15Zm-7 7.5h14M11 3.5c2 2 3 4.7 3 7.5s-1 5.5-3 7.5c-2-2-3-4.7-3-7.5s1-5.5 3-7.5Z',
  chat: 'M4 5h14v9H9l-4 3.5V14H4V5Z',
  help: 'M11 3.5a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15ZM8.7 8.6a2.3 2.3 0 0 1 4.5.6c0 1.6-2.2 1.9-2.2 3.4M11 15.4h.01',
}

interface AccordionProps {
  articles: { question: string; answer: string }[]
}

function Accordion({ articles }: AccordionProps) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <ul className="mt-6 space-y-2.5">
      {articles.map((a, i) => {
        const isOpen = open === i
        return (
          <li key={i} className="rounded-2xl border hairline bg-cream/[0.02] transition-colors">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="text-[0.95rem] font-medium text-cream">{a.question}</span>
              <svg
                viewBox="0 0 16 16"
                className={`h-4 w-4 shrink-0 text-amber transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                fill="none"
                aria-hidden
              >
                <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
            <div
              className="grid transition-[grid-template-rows] duration-300 ease-out"
              style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-[0.92rem] leading-relaxed text-cream-2/85">{a.answer}</p>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default function HelpCenter() {
  const rootRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const [query, setQuery] = useState('')

  useEffect(() => {
    document.title = 'Help Center — Hempay'
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const split = SplitText.create(titleRef.current!, { type: 'lines', mask: 'lines' })
      titleRef.current!.classList.remove('split-ready')
      const tl = gsap.timeline({ delay: 0.15 })
      tl.from(split.lines, { yPercent: 115, duration: 1, ease: 'power4.out', stagger: 0.1 }).from(
        '[data-help-fade]',
        { opacity: 0, y: 24, duration: 0.8, ease: 'power3.out', stagger: 0.1 },
        '-=0.5',
      )

      gsap.utils.toArray<HTMLElement>('[data-help-section]').forEach((section) => {
        gsap.from(section, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 85%', once: true },
        })
      })

      return () => split.revert()
    }, rootRef)
    return () => ctx.revert()
  }, [])

  const q = query.trim().toLowerCase()
  const categories = q
    ? HELP_CATEGORIES.map((c) => ({
        ...c,
        articles: c.articles.filter(
          (a) => a.question.toLowerCase().includes(q) || a.answer.toLowerCase().includes(q),
        ),
      })).filter((c) => c.articles.length > 0)
    : HELP_CATEGORIES

  return (
    <div ref={rootRef}>
      <Header ready />

      {/* hero band */}
      <header className="relative overflow-hidden px-5 pb-14 pt-32 sm:px-8 lg:pb-20 lg:pt-40">
        <div
          className="pointer-events-none absolute left-1/2 top-[-30%] h-[55vh] w-[80vw] -translate-x-1/2 rounded-full opacity-40 blur-[130px]"
          style={{ background: 'radial-gradient(closest-side, #7a3c14, transparent)' }}
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-4xl">
          <Link
            to="/"
            data-help-fade
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-cream-2 transition-colors hover:text-amber"
          >
            <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden>
              <path d="M14 8H3M7 3.5 2.5 8 7 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to home
          </Link>

          <span
            data-help-fade
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-copper/30 bg-copper/10 px-4 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-amber"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-amber" />
            Help Center
          </span>

          <h1
            ref={titleRef}
            className="split-ready font-display text-[clamp(2.6rem,7vw,5rem)] font-semibold leading-[1.02] tracking-tight text-cream"
          >
            How can we <span className="serif-accent text-gradient">help?</span>
          </h1>

          <p data-help-fade className="mt-6 max-w-2xl text-base leading-relaxed text-cream-2">
            Browse the topics below for quick answers about your account, virtual cards, payments and
            security. Still stuck? Our team is one message away.
          </p>

          {/* search */}
          <div data-help-fade className="relative mt-8 max-w-xl">
            <svg
              viewBox="0 0 20 20"
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-mute"
              fill="none"
              aria-hidden
            >
              <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.6" />
              <path d="m14 14 3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search help articles…"
              aria-label="Search help articles"
              className="w-full rounded-full border hairline bg-cream/[0.03] py-3.5 pl-12 pr-5 text-sm text-cream placeholder:text-mute focus:border-amber/50 focus:outline-none"
            />
          </div>
        </div>
      </header>

      {/* categories */}
      <div className="mx-auto max-w-6xl px-5 pb-24 sm:px-8 lg:pb-32">
        {categories.length === 0 ? (
          <p className="rounded-3xl border hairline bg-cream/[0.02] px-6 py-14 text-center text-cream-2">
            No articles match “{query}”. Try another search, or{' '}
            <Link to="/support" className="font-semibold text-amber hover:underline">
              contact our team
            </Link>
            .
          </p>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            {categories.map((cat) => (
              <section
                key={cat.id}
                data-help-section
                className="rounded-3xl border hairline bg-cream/[0.02] p-6 sm:p-8"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-copper/30 bg-copper/10 text-amber">
                    <svg viewBox="0 0 22 22" className="h-5 w-5" fill="none" aria-hidden>
                      <path d={ICONS[cat.icon]} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <div>
                    <h2 className="font-display text-xl font-semibold text-cream">{cat.title}</h2>
                    <p className="mt-1 text-sm text-cream-2/80">{cat.blurb}</p>
                  </div>
                </div>
                <Accordion articles={cat.articles} />
              </section>
            ))}
          </div>
        )}

        {/* still need help */}
        <div className="mt-14 flex flex-col items-center gap-5 rounded-3xl border hairline bg-cream/[0.02] px-6 py-12 text-center">
          <h2 className="font-display text-2xl font-semibold text-cream sm:text-3xl">
            Still need a hand?
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-cream-2/85">
            Our support team is available around the clock across app, WhatsApp, Telegram and email.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link to="/support" className="btn-primary px-7 py-3.5 text-sm">
              Contact support
            </Link>
            <a href={`mailto:${SUPPORT_EMAIL}?subject=Support%20request`} className="btn-ghost px-7 py-3.5 text-sm">
              Email {SUPPORT_EMAIL}
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
