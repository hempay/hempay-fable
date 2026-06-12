import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

import Header from '../components/Header'
import Footer from '../components/Footer'
import type { LegalDoc } from '../data/legal'

gsap.registerPlugin(ScrollTrigger, SplitText)

interface LegalProps {
  doc: LegalDoc
}

export default function Legal({ doc }: LegalProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const [activeId, setActiveId] = useState(doc.sections[0]?.id)

  useEffect(() => {
    document.title = `${doc.title} ${doc.accent} — Hempay`
  }, [doc])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // title + intro reveal
      const split = SplitText.create(titleRef.current!, { type: 'lines', mask: 'lines' })
      titleRef.current!.classList.remove('split-ready')
      const tl = gsap.timeline({ delay: 0.15 })
      tl.from(split.lines, { yPercent: 115, duration: 1, ease: 'power4.out', stagger: 0.1 }).from(
        '[data-legal-fade]',
        { opacity: 0, y: 24, duration: 0.8, ease: 'power3.out', stagger: 0.1 },
        '-=0.5',
      )

      // section reveals + active-section tracking
      gsap.utils.toArray<HTMLElement>('[data-legal-section]').forEach((section) => {
        gsap.from(section, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 85%', once: true },
        })
        ScrollTrigger.create({
          trigger: section,
          start: 'top 45%',
          end: 'bottom 45%',
          onToggle: (self) => self.isActive && section.dataset.id && setActiveId(section.dataset.id),
        })
      })

      return () => split.revert()
    }, rootRef)
    return () => ctx.revert()
  }, [doc])

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
            data-legal-fade
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-cream-2 transition-colors hover:text-amber"
          >
            <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden>
              <path d="M14 8H3M7 3.5 2.5 8 7 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to home
          </Link>

          <span
            data-legal-fade
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-copper/30 bg-copper/10 px-4 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-amber"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-amber" />
            {doc.eyebrow}
          </span>

          <h1
            ref={titleRef}
            className="split-ready font-display text-[clamp(2.6rem,7vw,5rem)] font-semibold leading-[1.02] tracking-tight text-cream"
          >
            {doc.title} <span className="serif-accent text-gradient">{doc.accent}</span>
          </h1>

          <p data-legal-fade className="mt-5 text-sm font-medium uppercase tracking-[0.2em] text-mute">
            Last updated: {doc.updated}
          </p>
          <p data-legal-fade className="mt-6 max-w-2xl text-base leading-relaxed text-cream-2">
            {doc.intro}
          </p>
        </div>
      </header>

      {/* body: sticky TOC + sections */}
      <div className="mx-auto max-w-6xl px-5 pb-24 sm:px-8 lg:pb-32">
        <div className="grid gap-12 lg:grid-cols-[16rem_1fr] lg:gap-16">
          {/* TOC */}
          <aside className="hidden lg:block">
            <nav className="sticky top-28" aria-label="On this page">
              <p className="mb-4 text-[0.68rem] font-bold uppercase tracking-[0.25em] text-mute">
                On this page
              </p>
              <ul className="space-y-1 border-l hairline">
                {doc.sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#sec-${s.id}`}
                      className={`-ml-px block border-l py-1.5 pl-4 text-sm transition-colors duration-300 ${
                        activeId === s.id
                          ? 'border-amber font-semibold text-amber'
                          : 'border-transparent text-cream-2/70 hover:text-cream'
                      }`}
                    >
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* sections */}
          <article className="max-w-2xl">
            {doc.sections.map((section) => (
              <section
                key={section.id}
                id={`sec-${section.id}`}
                data-id={section.id}
                data-legal-section
                className="scroll-mt-28 border-t hairline py-9 first:border-t-0 first:pt-0"
              >
                <h2 className="font-display mb-4 text-xl font-semibold text-cream sm:text-2xl">
                  {section.heading}
                </h2>
                <div className="space-y-4">
                  {section.body.map((block, i) =>
                    block.type === 'p' ? (
                      <p key={i} className="text-[0.95rem] leading-relaxed text-cream-2/90">
                        {block.text}
                      </p>
                    ) : (
                      <ul key={i} className="space-y-2.5">
                        {block.items.map((item, j) => (
                          <li key={j} className="flex gap-3 text-[0.95rem] leading-relaxed text-cream-2/90">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-copper" aria-hidden />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    ),
                  )}
                </div>
              </section>
            ))}

            {/* cross-link to the other doc */}
            <div className="mt-12 flex flex-col gap-4 border-t hairline pt-10 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-mute">
                {doc.kind === 'terms' ? 'Looking for how we handle your data?' : 'Looking for the rules of the road?'}
              </p>
              <Link
                to={doc.kind === 'terms' ? '/privacy' : '/terms'}
                className="btn-ghost px-6 py-3 text-sm"
              >
                {doc.kind === 'terms' ? 'Read the Privacy Policy' : 'Read the Terms of Service'}
                <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden>
                  <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </article>
        </div>
      </div>

      <Footer />
    </div>
  )
}
