'use client'

import { projects } from '@/data/projects'
import { ArrowLeft, ExternalLink, Github } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = projects.find((p) => p.id === params.id)
  if (!project) notFound()

  return (
    <div className="min-h-screen bg-cream">
      {/* ─── Minimal top bar ─── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-cream/90 backdrop-blur-md border-b border-charcoal/8">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-charcoal/60 hover:text-charcoal transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            back to home
          </Link>
          <span className="text-sm font-mono text-muted">{project.year}</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 pt-28 pb-24">

        {/* ─── Tags + type ─── */}
        <div className="flex items-center gap-2 mb-5">
          {project.tags.map((tag) => (
            <span key={tag} className="tag-pill">{tag}</span>
          ))}
          <span className="ml-auto text-xs font-mono text-muted">{project.type}</span>
        </div>

        {/* ─── Title ─── */}
        <h1 className="text-4xl md:text-5xl font-display font-semibold text-charcoal leading-tight tracking-tight mb-4">
          {project.title}
        </h1>
        <p className="text-base text-charcoal/60 mb-10 max-w-2xl leading-relaxed">
          {project.tagline}
        </p>

        {/* ─── Cover image ─── */}
        <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden bg-charcoal/8 mb-14 flex items-center justify-center">
          {/* Fallback content always visible  replaced by img if image loads */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-charcoal/5 to-charcoal/15">
            <span className="text-7xl select-none">
              {project.id === 'tkstream' ? '📺' : '✂️'}
            </span>
            <span className="text-sm font-mono text-muted">
              Add cover image to /public/images/projects/
            </span>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.coverImage}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
          />
        </div>

        {/* ─── Two-column layout ─── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14">

          {/* Left: full description + features */}
          <div className="md:col-span-2 space-y-12">

            {/* Overview */}
            <div>
              <h2 className="text-lg font-display font-semibold text-charcoal mb-4">Overview</h2>
              <div className="space-y-3">
                {project.longDescription.split('\n').filter(Boolean).map((para, i) => (
                  <p key={i} className="text-sm text-charcoal/70 leading-relaxed">
                    {para.trim()}
                  </p>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-lg font-display font-semibold text-charcoal mb-4">
                Key Features
              </h2>
              <ul className="space-y-2">
                {project.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-charcoal/70">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-charcoal shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
            </div>

            {/* Architecture (optional) */}
            {project.architecture && (
              <div>
                <h2 className="text-lg font-display font-semibold text-charcoal mb-4">
                  Architecture
                </h2>
                <pre className="bg-charcoal text-cream text-xs font-mono p-5 rounded-2xl overflow-x-auto leading-relaxed whitespace-pre">
                  {project.architecture}
                </pre>
              </div>
            )}

            {/* Video placeholder */}
            <div>
              <h2 className="text-lg font-display font-semibold text-charcoal mb-4">
                App Preview
              </h2>
              <div className="relative rounded-2xl overflow-hidden bg-charcoal/8 aspect-video flex items-center justify-center border border-charcoal/10">
                <div className="flex flex-col items-center gap-3 text-charcoal/40">
                  <span className="text-5xl">▶</span>
                  <span className="text-xs font-mono">Add your app demo video here</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right sidebar: tech stack + links */}
          <div className="space-y-8">

            {/* Tech Stack */}
            <div>
              <h3 className="text-xs font-mono text-muted uppercase tracking-wider mb-4">
                Tech Stack
              </h3>
              <ul className="space-y-3">
                {project.techStack.map((tech, i) => (
                  <li key={i} className="border-b border-charcoal/8 pb-3 last:border-0 last:pb-0">
                    <p className="text-sm font-medium text-charcoal">{tech.name}</p>
                    <p className="text-xs text-muted leading-snug">{tech.usage}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Links */}
            {(project.github || project.live) && (
              <div>
                <h3 className="text-xs font-mono text-muted uppercase tracking-wider mb-4">
                  Links
                </h3>
                <div className="space-y-2">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-charcoal hover:underline"
                    >
                      <Github size={14} /> GitHub
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-charcoal hover:underline"
                    >
                      <ExternalLink size={14} /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Level */}
            <div>
              <h3 className="text-xs font-mono text-muted uppercase tracking-wider mb-2">
                Complexity
              </h3>
              <div className="flex gap-1.5">
                {['Basic', 'Intermediate', 'Advanced'].map((lvl) => (
                  <div
                    key={lvl}
                    className={`h-1.5 flex-1 rounded-full transition-all ${
                      ['Basic', 'Intermediate', 'Advanced'].indexOf(lvl) <=
                      ['Basic', 'Intermediate', 'Advanced'].indexOf(project.level)
                        ? 'bg-charcoal'
                        : 'bg-charcoal/15'
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-muted mt-2">{project.level}</p>
            </div>
          </div>
        </div>

        {/* ─── Other projects ─── */}
        <div className="mt-20 pt-12 border-t border-charcoal/10">
          <h2 className="text-sm font-mono text-muted mb-6 uppercase tracking-wider">
            Other Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects
              .filter((p) => p.id !== project.id)
              .map((p) => (
                <Link
                  key={p.id}
                  href={`/projects/${p.id}`}
                  className="group flex items-center justify-between p-4 rounded-2xl border border-charcoal/10 hover:bg-charcoal hover:border-charcoal transition-all duration-200"
                >
                  <div>
                    <p className="text-sm font-medium text-charcoal group-hover:text-cream transition-colors">
                      {p.title}
                    </p>
                    <p className="text-xs text-muted group-hover:text-cream/60 transition-colors">
                      {p.tags.slice(0, 2).join(' · ')}
                    </p>
                  </div>
                  <ArrowLeft
                    size={14}
                    className="rotate-180 text-charcoal/30 group-hover:text-cream/60 group-hover:translate-x-1 transition-all"
                  />
                </Link>
              ))}
          </div>
        </div>
      </main>
    </div>
  )
}
