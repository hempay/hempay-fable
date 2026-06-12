import { useEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

interface SectionHeadingProps {
  eyebrow: string
  children: ReactNode // the title (can include serif/gradient spans)
  description?: string
  align?: 'left' | 'center'
  className?: string
}

/* Shared section header: eyebrow chip + split-line title reveal */
export default function SectionHeading({
  eyebrow,
  children,
  description,
  align = 'center',
  className = '',
}: SectionHeadingProps) {
  const rootRef = useRef<HTMLDivElement>(null)
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
            duration: 1,
            ease: 'power4.out',
            stagger: 0.09,
            scrollTrigger: {
              trigger: rootRef.current,
              start: 'top 80%',
              once: true,
            },
          }),
      })
      titleRef.current!.classList.remove('split-ready')

      gsap.from('[data-sh-fade]', {
        opacity: 0,
        y: 24,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 80%',
          once: true,
        },
      })

      return () => split.revert()
    }, rootRef)
    return () => ctx.revert()
  }, [])

  const alignCls = align === 'center' ? 'items-center text-center' : 'items-start text-left'

  return (
    <div ref={rootRef} className={`flex flex-col ${alignCls} ${className}`}>
      <span
        data-sh-fade
        className="mb-5 inline-flex items-center gap-2 rounded-full border border-copper/30 bg-copper/10 px-4 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-amber"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-amber" />
        {eyebrow}
      </span>
      <h2
        ref={titleRef}
        className="split-ready font-display max-w-3xl text-4xl font-semibold leading-[1.05] text-cream sm:text-5xl lg:text-6xl"
      >
        {children}
      </h2>
      {description && (
        <p data-sh-fade className="mt-5 max-w-xl text-base leading-relaxed text-cream-2 sm:text-lg">
          {description}
        </p>
      )}
    </div>
  )
}
