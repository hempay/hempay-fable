import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Zap, Clock, Lock } from 'lucide-react'
import SectionHeading from './ui/SectionHeading'
import BotButtons from './ui/BotButtons'
import { CHAT_SCRIPT } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

const PERKS = [
  { icon: Zap, title: 'Instant delivery', text: 'Get your cards instantly' },
  { icon: Clock, title: '24/7 availability', text: 'Available round the clock' },
  { icon: Lock, title: 'Secure transactions', text: 'Bank-level security' },
]

/* Bank-by-chat: the WhatsApp / Telegram bot conversation, animated in. */
export default function ChatDemo() {
  const rootRef = useRef<HTMLElement>(null)
  const phoneRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // phone tilts upright as it scrolls into view
      gsap.fromTo(
        phoneRef.current,
        { rotateX: 18, y: 90, opacity: 0 },
        {
          rotateX: 0,
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: phoneRef.current, start: 'top 85%', once: true },
        },
      )

      // messages pop in one by one, typing dots between bot replies
      const bubbles = gsap.utils.toArray<HTMLElement>('[data-chat-bubble]')
      const tl = gsap.timeline({
        scrollTrigger: { trigger: phoneRef.current, start: 'top 62%', once: true },
        delay: 0.3,
      })
      bubbles.forEach((b) => {
        tl.fromTo(
          b,
          { opacity: 0, y: 22, scale: 0.92, transformOrigin: b.dataset.chatBubble === 'user' ? '100% 100%' : '0% 100%' },
          { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'back.out(1.6)' },
          '+=0.42',
        )
      })

      // perks
      gsap.from('[data-perk]', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: { trigger: '[data-perks]', start: 'top 85%', once: true },
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="relative overflow-hidden px-5 py-28 sm:px-8 lg:py-36">
      {/* glow */}
      <div
        className="pointer-events-none absolute right-[-20%] top-[10%] h-[50vh] w-[50vw] rounded-full opacity-25 blur-[130px]"
        style={{ background: 'radial-gradient(closest-side, #58c27d, transparent)' }}
        aria-hidden
      />

      <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="No app needed"
            description="Create virtual cards in multiple currencies, make global payments, and manage your finances — all through WhatsApp or Telegram. No app download needed!"
            align="left"
          >
            Your bank lives <span className="serif-accent text-gradient">in your chats.</span>
          </SectionHeading>

          <div data-perks className="mt-12 grid gap-4 sm:grid-cols-3 lg:gap-5">
            {PERKS.map((p) => (
              <div key={p.title} data-perk className="panel rounded-2xl p-5">
                <p.icon className="mb-3 h-6 w-6 text-amber" strokeWidth={1.6} />
                <h3 className="mb-1 text-sm font-bold text-cream">{p.title}</h3>
                <p className="text-xs leading-relaxed text-mute">{p.text}</p>
              </div>
            ))}
          </div>

          <BotButtons className="mt-10 !items-start" />
        </div>

        {/* phone mockup */}
        <div className="flex justify-center" style={{ perspective: '1400px' }}>
          <div
            ref={phoneRef}
            className="w-full max-w-sm rounded-[2.4rem] border border-cream/10 bg-ink-2 p-3 shadow-[0_60px_120px_-40px_rgba(0,0,0,0.8)]"
          >
            <div className="rounded-[1.9rem] bg-gradient-to-b from-ink-3 to-ink p-5">
              {/* chat header */}
              <div className="mb-6 flex items-center gap-3 border-b hairline pb-4">
                <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border-2 border-leaf/70 bg-cream/95">
                  <img src="/logo.png" alt="Hempay" className="h-7 w-auto" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-cream">Hempay</h3>
                  <p className="flex items-center gap-1.5 text-xs text-leaf">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-leaf" />
                    Online
                  </p>
                </div>
                <span className="ml-auto rounded-full bg-leaf/10 px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-wider text-leaf">
                  Bot
                </span>
              </div>

              {/* messages */}
              <div className="flex min-h-72 flex-col justify-end gap-3.5">
                {CHAT_SCRIPT.map((m, i) =>
                  m.from === 'bot' ? (
                    <div key={i} data-chat-bubble="bot" className="flex max-w-[85%] items-end gap-2 opacity-0">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full bg-cream/95">
                        <img src="/logo.png" alt="" className="h-4.5 w-auto" />
                      </div>
                      <p className="rounded-2xl rounded-bl-sm bg-cream/8 px-4 py-2.5 text-[0.82rem] leading-snug text-cream/90">
                        {m.text}
                      </p>
                    </div>
                  ) : (
                    <div key={i} data-chat-bubble="user" className="self-end opacity-0">
                      <p className="max-w-60 rounded-2xl rounded-br-sm bg-gradient-to-br from-copper to-ember px-4 py-2.5 text-[0.82rem] font-medium leading-snug text-cream">
                        {m.text}
                      </p>
                    </div>
                  ),
                )}
              </div>

              {/* input bar */}
              <div className="mt-5 flex items-center gap-2 rounded-full border hairline bg-ink-2 px-4 py-2.5">
                <span className="text-xs text-mute">Message Hempay…</span>
                <span className="ml-auto flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-amber to-copper">
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-ink" fill="none" aria-hidden>
                    <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
