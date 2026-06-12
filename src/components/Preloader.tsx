import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface PreloaderProps {
  onComplete: () => void
}

/* Counter → wordmark flash → curtain lift */
export default function Preloader({ onComplete }: PreloaderProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const countRef = useRef<HTMLSpanElement>(null)
  const wordRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const doneRef = useRef(onComplete)
  doneRef.current = onComplete

  useEffect(() => {
    const ctx = gsap.context(() => {
      const counter = { value: 0 }
      const tl = gsap.timeline({
        onComplete: () => doneRef.current(),
      })

      tl.to(counter, {
        value: 100,
        duration: 1.6,
        ease: 'power3.inOut',
        onUpdate: () => {
          if (countRef.current) {
            countRef.current.textContent = String(Math.round(counter.value)).padStart(3, '0')
          }
        },
      })
        .to(barRef.current, { scaleX: 1, duration: 1.6, ease: 'power3.inOut' }, 0)
        .to(countRef.current, { yPercent: -120, opacity: 0, duration: 0.45, ease: 'power3.in' })
        .fromTo(
          wordRef.current!.children,
          { yPercent: 110 },
          { yPercent: 0, duration: 0.7, ease: 'power4.out', stagger: 0.045 },
          '-=0.1',
        )
        .to(wordRef.current, { opacity: 1, duration: 0.01 }, '<')
        .to({}, { duration: 0.45 }) // beat
        .to(rootRef.current, {
          yPercent: -100,
          duration: 0.9,
          ease: 'power4.inOut',
        })
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[9995] flex flex-col items-center justify-center bg-ink"
      aria-hidden
    >
      <div className="overflow-hidden">
        <span
          ref={countRef}
          className="font-display block text-7xl font-semibold text-cream tabular-nums md:text-8xl"
        >
          000
        </span>
      </div>

      <div ref={wordRef} className="absolute flex overflow-hidden opacity-0">
        {'HEMPAY'.split('').map((ch, i) => (
          <span
            key={i}
            className="font-display inline-block text-6xl font-semibold tracking-tight text-gradient md:text-8xl"
            style={{ transform: 'translateY(110%)' }}
          >
            {ch}
          </span>
        ))}
      </div>

      <div className="absolute bottom-16 h-px w-48 bg-cream/15 md:w-72">
        <div
          ref={barRef}
          className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-copper to-gold"
        />
      </div>
    </div>
  )
}
