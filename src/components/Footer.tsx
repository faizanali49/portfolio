'use client'

import { Github, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-charcoal/10 mt-16">
      <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col items-center text-center gap-6">

        {/* Avatar initial */}
        <div className="w-10 h-10 rounded-full bg-charcoal flex items-center justify-center text-cream text-sm font-display font-semibold">
          F
        </div>

        <p className="text-lg font-display text-charcoal">
          Thanks for visiting. Let&apos;s get in touch!
        </p>

        <div className="flex items-center gap-6">
          <a
            href="mailto:faizan909552@gmail.com"
            className="text-sm text-charcoal/60 hover:text-charcoal transition-colors flex items-center gap-1.5"
          >
            <Mail size={13} />
            faizan909552@gmail.com
          </a>
          <a
            href="https://linkedin.com/in/faizanalitech"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-charcoal/60 hover:text-charcoal transition-colors flex items-center gap-1.5"
          >
            <Linkedin size={13} />
            LinkedIn
          </a>
          <a
            href="https://github.com/faizanali49/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-charcoal/60 hover:text-charcoal transition-colors flex items-center gap-1.5"
          >
            <Github size={13} />
            GitHub
          </a>
        </div>

        <p className="text-xs font-mono text-muted">© Faizan Ali {new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}
