import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

import Header from '../components/Header'
import Footer from '../components/Footer'
import { SUPPORT_CHANNELS, SUPPORT_EMAIL, SUPPORT_TOPICS } from '../data/support'

gsap.registerPlugin(ScrollTrigger, SplitText)

const CHANNEL_ICONS: Record<string, string> = {
  mail: 'M3 6h16v10H3V6Zm0 .5 8 5.5 8-5.5',
  whatsapp: 'M11 3.5a7.5 7.5 0 0 0-6.4 11.4L3.5 18.5l3.7-1a7.5 7.5 0 1 0 3.8-14Zm-2.3 4.2c.15 0 .3 0 .43.32.15.36.5 1.26.54 1.35.05.1.08.2.02.32-.28.56-.58.54-.3 1.02.5.86 1.1 1.42 1.95 1.86.13.06.28.05.38-.07.15-.18.6-.7.76-.94.11-.16.23-.13.38-.08.15.06 1 .47 1.17.56.17.08.28.12.32.19.05.1.05.5-.13 1-.18.48-1.06.94-1.46.97-.42.04-.9.2-3-.9a7.7 7.7 0 0 1-3-3c-.06-.1-.68-1.14-.68-2.18 0-1.03.55-1.53.74-1.74.17-.19.37-.24.5-.24Z',
  telegram: 'M18.5 4.5 2.8 10.6c-.7.28-.69.98.02 1.2l3.9 1.2 1.5 4.6c.2.6.36.5.72.28l2.2-1.6 3.9 2.9c.5.28.86.13 1-.44l2.4-11.4c.16-.7-.3-1.02-.84-.79ZM7.5 12.9l8-5-6.7 6.2-.3 2.5-1-3.7Z',
  app: 'M6.5 3h9v16h-9V3Zm0 12.5h9M11 17.2h.01',
}

export default function Support() {
  const rootRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [topic, setTopic] = useState(SUPPORT_TOPICS[0].value)
  const [message, setMessage] = useState('')

  useEffect(() => {
    document.title = 'Support — Hempay'
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const split = SplitText.create(titleRef.current!, { type: 'lines', mask: 'lines' })
      titleRef.current!.classList.remove('split-ready')
      const tl = gsap.timeline({ delay: 0.15 })
      tl.from(split.lines, { yPercent: 115, duration: 1, ease: 'power4.out', stagger: 0.1 }).from(
        '[data-support-fade]',
        { opacity: 0, y: 24, duration: 0.8, ease: 'power3.out', stagger: 0.1 },
        '-=0.5',
      )

      gsap.utils.toArray<HTMLElement>('[data-support-section]').forEach((section) => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`[${topic}] Support request`)
    const body = encodeURIComponent(
      `Name: ${name || '—'}\nEmail: ${email || '—'}\nTopic: ${topic}\n\n${message}`,
    )
    window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`
  }

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
            data-support-fade
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-cream-2 transition-colors hover:text-amber"
          >
            <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden>
              <path d="M14 8H3M7 3.5 2.5 8 7 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to home
          </Link>

          <span
            data-support-fade
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-copper/30 bg-copper/10 px-4 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-amber"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-amber" />
            Support
          </span>

          <h1
            ref={titleRef}
            className="split-ready font-display text-[clamp(2.6rem,7vw,5rem)] font-semibold leading-[1.02] tracking-tight text-cream"
          >
            We&apos;re here <span className="serif-accent text-gradient">for you.</span>
          </h1>

          <p data-support-fade className="mt-6 max-w-2xl text-base leading-relaxed text-cream-2">
            Reach the Hempay team any time. Pick the channel that suits you, or send us a message and
            we&apos;ll get back within one business day. Prefer to self-serve?{' '}
            <Link to="/help" className="font-semibold text-amber hover:underline">
              Visit the Help Center
            </Link>
            .
          </p>
        </div>
      </header>

      {/* body: channels + form */}
      <div className="mx-auto max-w-6xl px-5 pb-24 sm:px-8 lg:pb-32">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          {/* channels */}
          <div data-support-section>
            <h2 className="font-display mb-6 text-xl font-semibold text-cream sm:text-2xl">
              Contact channels
            </h2>
            <ul className="space-y-3">
              {SUPPORT_CHANNELS.map((ch) => (
                <li key={ch.id}>
                  <a
                    href={ch.href}
                    {...(ch.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                    className="group flex items-start gap-4 rounded-2xl border hairline bg-cream/[0.02] p-5 transition-colors hover:border-amber/40 hover:bg-cream/[0.04]"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-copper/30 bg-copper/10 text-amber">
                      <svg viewBox="0 0 22 22" className="h-5 w-5" fill="none" aria-hidden>
                        <path d={CHANNEL_ICONS[ch.icon]} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <div className="min-w-0">
                      <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-mute">
                        {ch.label}
                      </p>
                      <p className="mt-0.5 truncate font-medium text-cream group-hover:text-amber">
                        {ch.value}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-cream-2/80">{ch.detail}</p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* form */}
          <div data-support-section>
            <h2 className="font-display mb-6 text-xl font-semibold text-cream sm:text-2xl">
              Send us a message
            </h2>
            <form
              onSubmit={handleSubmit}
              className="space-y-5 rounded-3xl border hairline bg-cream/[0.02] p-6 sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-[0.7rem] font-bold uppercase tracking-[0.2em] text-mute">
                    Name
                  </span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full rounded-xl border hairline bg-cream/[0.03] px-4 py-3 text-sm text-cream placeholder:text-mute focus:border-amber/50 focus:outline-none"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-[0.7rem] font-bold uppercase tracking-[0.2em] text-mute">
                    Email
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border hairline bg-cream/[0.03] px-4 py-3 text-sm text-cream placeholder:text-mute focus:border-amber/50 focus:outline-none"
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-2 block text-[0.7rem] font-bold uppercase tracking-[0.2em] text-mute">
                  Topic
                </span>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full rounded-xl border hairline bg-cream/[0.03] px-4 py-3 text-sm text-cream focus:border-amber/50 focus:outline-none"
                >
                  {SUPPORT_TOPICS.map((t) => (
                    <option key={t.value} value={t.value} className="bg-ink-2 text-cream">
                      {t.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-[0.7rem] font-bold uppercase tracking-[0.2em] text-mute">
                  Message
                </span>
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  placeholder="How can we help?"
                  className="w-full resize-y rounded-xl border hairline bg-cream/[0.03] px-4 py-3 text-sm text-cream placeholder:text-mute focus:border-amber/50 focus:outline-none"
                />
              </label>

              <button type="submit" className="btn-primary w-full px-7 py-4 text-sm">
                Send message
              </button>
              <p className="text-center text-xs text-mute">
                This opens your email app addressed to {SUPPORT_EMAIL}.
              </p>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
