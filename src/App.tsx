import { useEffect, useRef } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

import { LenisContext } from './lib/lenis-context'
import Cursor from './components/Cursor'
import Home from './pages/Home'
import Legal from './pages/Legal'
import { TERMS, PRIVACY } from './data/legal'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const lenisRef = useRef<Lenis | null>(null)
  const location = useLocation()
  const navigate = useNavigate()

  // ── one global Lenis instance, lives across route changes ──
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lenis = new Lenis({ lerp: prefersReduced ? 1 : 0.115, anchors: false })
    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  // ── in-page anchor handling (works cross-page too) ──
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a[href^="#"]')
      if (!anchor) return
      const hash = anchor.getAttribute('href')
      if (!hash || hash === '#') return
      e.preventDefault()
      // If the target exists on the current page (e.g. a legal-page TOC link),
      // scroll to it locally. Otherwise hop home and let the route effect handle it.
      const target = document.querySelector(hash)
      if (target) {
        lenisRef.current?.scrollTo(target as HTMLElement, { offset: -72, duration: 1.4 })
      } else if (location.pathname !== '/') {
        navigate('/' + hash)
      }
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [location.pathname, navigate])

  // ── reset scroll + refresh triggers on route change ──
  useEffect(() => {
    const lenis = lenisRef.current
    if (location.pathname === '/' && location.hash) {
      // wait for Home sections to mount, then scroll to the section
      const id = location.hash
      let tries = 0
      const tick = () => {
        const target = document.querySelector(id)
        if (target) {
          lenis?.scrollTo(target as HTMLElement, { offset: -72, duration: 1.2 })
          ScrollTrigger.refresh()
        } else if (tries++ < 40) {
          requestAnimationFrame(tick)
        }
      }
      requestAnimationFrame(tick)
      return
    }
    // plain navigation → top
    lenis?.scrollTo(0, { immediate: true })
    window.scrollTo(0, 0)
    requestAnimationFrame(() => ScrollTrigger.refresh())
  }, [location.pathname, location.hash])

  return (
    <LenisContext.Provider value={lenisRef}>
      <div className="grain">
        <Cursor />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/terms" element={<Legal doc={TERMS} />} />
          <Route path="/privacy" element={<Legal doc={PRIVACY} />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </LenisContext.Provider>
  )
}
