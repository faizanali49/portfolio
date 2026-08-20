'use client'

import { resumeUrl } from '@/data/media'
import { Github, Linkedin, Mail, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-cream/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left: name + socials */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-sm font-medium text-charcoal tracking-wide hover:opacity-60 transition-opacity"
          >
            faizan ali
          </Link>
          <div className="flex items-center gap-2">
            <a
              href="mailto:faizan909552@gmail.com"
              aria-label="Email"
              className="p-1.5 rounded-full hover:bg-charcoal hover:text-cream transition-all duration-200"
            >
              <Mail size={14} />
            </a>
            <a
              href="https://linkedin.com/in/faizanalitech"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-1.5 rounded-full hover:bg-charcoal hover:text-cream transition-all duration-200"
            >
              <Linkedin size={14} />
            </a>
            <a
              href="https://github.com/faizanali49/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-1.5 rounded-full hover:bg-charcoal hover:text-cream transition-all duration-200"
            >
              <Github size={14} />
            </a>
          </div>
        </div>

        {/* Right: nav links */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#projects"
            className="text-sm text-charcoal/70 hover:text-charcoal transition-colors"
          >
            Projects
          </a>
          <a
            href="#about"
            className="text-sm text-charcoal/70 hover:text-charcoal transition-colors"
          >
            About
          </a>
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm border border-charcoal px-4 py-1.5 rounded-full hover:bg-charcoal hover:text-cream transition-all duration-200"
          >
            Resume
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-cream border-t border-charcoal/10 px-6 py-4 flex flex-col gap-4">
          <a href="#projects" onClick={() => setMobileOpen(false)} className="text-sm">
            Projects
          </a>
          <a href="#about" onClick={() => setMobileOpen(false)} className="text-sm">
            About
          </a>
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm"
          >
            Resume ↗
          </a>
        </div>
      )}
    </nav>
  )
}
