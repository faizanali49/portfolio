'use client'

import AboutSection from '@/components/AboutSection'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import ProjectsSection from '@/components/ProjectsSection'
import { ArrowDown } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const HeroOrbit    = dynamic(() => import('@/components/HeroOrbit'),    { ssr: false })
const CustomCursor = dynamic(() => import('@/components/CustomCursor'),  { ssr: false })

// Phrases that cycle in the typing effect
const PHRASES = [
  'Flutter Developer',
  'Mobile App Builder',
  'Clean Architecture',
  'Cross Platform Dev',
]

function TypingHeadline() {
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const target = PHRASES[phraseIdx]
    let timeout: ReturnType<typeof setTimeout>

    if (!isDeleting && displayed.length < target.length) {
      // Typing
      timeout = setTimeout(() => {
        setDisplayed(target.slice(0, displayed.length + 1))
      }, 85)
    } else if (!isDeleting && displayed.length === target.length) {
      // Pause at full word then start deleting
      timeout = setTimeout(() => setIsDeleting(true), 1800)
    } else if (isDeleting && displayed.length > 0) {
      // Deleting
      timeout = setTimeout(() => {
        setDisplayed(displayed.slice(0, -1))
      }, 45)
    } else if (isDeleting && displayed.length === 0) {
      // Move to next phrase
      setIsDeleting(false)
      setPhraseIdx(p => (p + 1) % PHRASES.length)
    }

    return () => clearTimeout(timeout)
  }, [displayed, isDeleting, phraseIdx])

  // Blinking cursor
  useEffect(() => {
    const id = setInterval(() => setShowCursor(p => !p), 530)
    return () => clearInterval(id)
  }, [])

  return (
    <h1 className="text-4xl md:text-5xl font-display font-semibold text-[#02569B] leading-tight tracking-tight mt-24 mb-4 min-h-[1.3em]">
  {displayed}
  <span
    className="inline-block w-[3px] h-[0.85em] bg-[#0175C2] ml-1 align-middle rounded-sm"
    style={{ opacity: showCursor ? 1 : 0, transition: 'opacity 0.1s' }}
  />
</h1>
  )
}

export default function HomePage() {
  return (
    <>
      <CustomCursor />
      <Navbar />

      <main>
        {/* ─── HERO ─── */}
        <section className="min-h-screen flex flex-col items-center justify-center pt-16 pb-8 px-6 relative overflow-hidden">

          {/* Subtle grain texture */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: '200px',
            }}
          />

          {/* Semi-circle orbit + avatar (no bottom margin  fog overlaps into text) */}
          <div className="relative z-0" style={{ marginBottom: '-32px' }}>
            <HeroOrbit />
          </div>

          {/* Text content sits on top of the fog layer */}
          <div className="relative z-10 text-center max-w-lg">
            <TypingHeadline />

            <p className="text-sm text-charcoal/55 mb-6 leading-relaxed">
              building cross-platform mobile experiences that feel native,
              look polished, and ship clean
            </p>

            {/* Status badge */}
            <div className="flex justify-center mb-10">
              <span className="status-badge">
                <span className="status-dot" />
                Available for work
              </span>
            </div>

            {/* Scroll cue */}
            <div className="flex items-center justify-center gap-2 text-xs font-mono text-muted animate-bounce">
              <ArrowDown size={12} />
              <span>welcome to my world</span>
              <ArrowDown size={12} />
            </div>
          </div>
        </section>

        {/* ─── PROJECTS ─── */}
        <ProjectsSection />

        {/* ─── ABOUT ─── */}
        <AboutSection />
      </main>

      <Footer />
    </>
  )
}
