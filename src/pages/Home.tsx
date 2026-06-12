import { useEffect, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { useLenisRef } from '../lib/lenis-context'
import Preloader from '../components/Preloader'
import Header from '../components/Header'
import Hero from '../components/Hero'
import CardFan from '../components/CardFan'
import Features from '../components/Features'
import ChatDemo from '../components/ChatDemo'
import Services from '../components/Services'
import HowItWorks from '../components/HowItWorks'
import AppDownload from '../components/AppDownload'
import FAQ from '../components/FAQ'
import CTA from '../components/CTA'
import Footer from '../components/Footer'

// Play the intro preloader only on the first home visit of the session
let preloaderSeen = false

export default function Home() {
  const lenisRef = useLenisRef()
  const [ready, setReady] = useState(preloaderSeen)

  // Hold the page still while the preloader plays
  useEffect(() => {
    const lenis = lenisRef?.current
    if (!lenis) return
    if (ready) {
      lenis.start()
      ScrollTrigger.refresh()
    } else {
      lenis.stop()
    }
  }, [ready, lenisRef])

  const handleComplete = () => {
    preloaderSeen = true
    setReady(true)
  }

  return (
    <>
      {!ready && <Preloader onComplete={handleComplete} />}
      <Header ready={ready} />
      <main>
        <Hero ready={ready} />
        <CardFan />
        <Features />
        <ChatDemo />
        <Services />
        <HowItWorks />
        <AppDownload />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
