import { useRef, type ReactNode } from 'react'
import gsap from 'gsap'

interface MagneticProps {
  children: ReactNode
  strength?: number
  className?: string
}

/* Wraps a child so it leans toward the cursor — desktop only. */
export default function Magnetic({ children, strength = 0.35, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent) => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const el = ref.current!
    const rect = el.getBoundingClientRect()
    const x = e.clientX - (rect.left + rect.width / 2)
    const y = e.clientY - (rect.top + rect.height / 2)
    gsap.to(el, { x: x * strength, y: y * strength, duration: 0.4, ease: 'power3.out' })
  }

  const onLeave = () => {
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' })
  }

  return (
    <div ref={ref} className={className} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </div>
  )
}
