'use client'

import { projects } from '@/data/projects'
import { ArrowUpRight, Github, X } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function ProjectsSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({})
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)
  const [galleryErrors, setGalleryErrors] = useState<Record<string, boolean>>({})
  const selectedProject = projects.find((project) => project.id === selectedProjectId)

  useEffect(() => {
    if (!selectedProject) return

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedProjectId(null)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [selectedProject])

  return (
    <section id="projects" className="max-w-6xl mx-auto px-6 py-24">
      {/* Section header */}
      <div className="flex items-baseline justify-between mb-12">
        <h2 className="text-2xl font-display font-semibold text-charcoal tracking-tight">
          Case Studies
        </h2>
        <span className="text-xs font-mono text-muted">{projects.length} projects</span>
      </div>

      {/* Project grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${project.id}`}
            className="group block"
            onMouseEnter={() => setHoveredId(project.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={(event) => {
              event.preventDefault()
              setSelectedProjectId(project.id)
            }}
          >
            <article className="project-card bg-white/60 backdrop-blur-sm rounded-3xl overflow-hidden border border-charcoal/8 cursor-none">
              {/* Meta row */}
              <div className="px-5 pt-5 pb-3 flex items-start justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag-pill">{tag}</span>
                  ))}
                </div>
                <span className="text-[11px] font-mono text-muted shrink-0">{project.type}</span>
              </div>

              {/* Title & tagline */}
              <div className="px-5 pb-3">
                <h3 className="text-xl font-display font-semibold text-charcoal mb-1 group-hover:underline decoration-1 underline-offset-2">
                  {project.title}
                </h3>
                <p className="text-sm text-charcoal/60 leading-snug">{project.description}</p>
              </div>

              {/* Cover image / video preview */}
              <div className="mx-5 mb-5 rounded-2xl overflow-hidden bg-charcoal/8 relative aspect-[16/9]">
                {!imgErrors[project.id] ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={() =>
                      setImgErrors((prev) => ({ ...prev, [project.id]: true }))
                    }
                  />
                ) : (
                  /* Placeholder when image not yet provided */
                  <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-charcoal/5 to-charcoal/15">
                    <span className="text-5xl select-none">
                      {project.id === 'tkstream' ? '📺' : '✂️'}
                    </span>
                    <span className="text-xs font-mono text-muted">{project.title}</span>
                  </div>
                )}

                {/* Hover overlay: arrow */}
                <div
                  className={`absolute inset-0 flex items-end justify-end p-4 bg-gradient-to-t from-charcoal/30 to-transparent transition-opacity duration-300 ${
                    hoveredId === project.id ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <span className="w-9 h-9 rounded-full bg-cream flex items-center justify-center shadow-md">
                    <ArrowUpRight size={16} className="text-charcoal" />
                  </span>
                </div>
              </div>

              {/* Year badge */}
              <div className="px-5 pb-5 flex items-center justify-between">
                <span className="text-xs font-mono text-muted">{project.year}</span>
                <span className="text-xs font-mono text-muted capitalize">{project.level}</span>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {selectedProject && (
        <div
          className="fixed inset-0 z-[100] bg-charcoal/55 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          role="presentation"
          onClick={() => setSelectedProjectId(null)}
        >
          <div
            className="w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl bg-cream shadow-2xl border border-white/30 flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-gallery-title"
            onClick={(event) => event.stopPropagation()}
          >
            <header className="shrink-0 flex items-center justify-between gap-4 px-5 py-4 md:px-7 border-b border-charcoal/10 bg-cream/95 backdrop-blur-md">
              <div>
                <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted">Project gallery</p>
                <h3 id="project-gallery-title" className="text-2xl font-display font-semibold text-charcoal">
                  {selectedProject.title}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${selectedProject.title} on GitHub`}
                    className="w-9 h-9 shrink-0 rounded-full border border-charcoal/15 flex items-center justify-center text-charcoal/70 hover:bg-charcoal hover:text-cream transition-colors"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <Github size={17} />
                  </a>
                )}
                <button
                  type="button"
                  aria-label="Close project gallery"
                  className="w-9 h-9 shrink-0 rounded-full border border-charcoal/15 flex items-center justify-center text-charcoal/70 hover:bg-charcoal hover:text-cream transition-colors"
                  onClick={() => setSelectedProjectId(null)}
                >
                  <X size={17} />
                </button>
              </div>
            </header>

            <div className="overflow-y-auto overscroll-contain px-5 py-5 md:px-7 md:py-7">
              <div className="space-y-5">
                {selectedProject.galleryImages.map((image, index) => {
                  const imageKey = `${selectedProject.id}-${index}`
                  const hasError = galleryErrors[imageKey]

                  return (
                    <figure key={imageKey} className="overflow-hidden rounded-2xl border border-charcoal/10 bg-charcoal/5">
                      {!hasError ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={image}
                          alt={`${selectedProject.title} screen ${index + 1}`}
                          className="block w-full max-h-[62vh] object-contain bg-white"
                          onError={() => setGalleryErrors((previous) => ({ ...previous, [imageKey]: true }))}
                        />
                      ) : (
                        <div className="min-h-56 flex flex-col items-center justify-center gap-2 px-6 text-center bg-gradient-to-br from-charcoal/5 to-charcoal/15">
                          <span className="text-4xl">{selectedProject.id === 'tkstream' ? '📺' : '✂️'}</span>
                          <span className="text-xs font-mono text-muted">Add image: {image}</span>
                        </div>
                      )}
                      <figcaption className="px-4 py-3 text-xs font-mono text-muted bg-cream/80">
                        {selectedProject.title} · screen {index + 1}
                      </figcaption>
                    </figure>
                  )
                })}

                {selectedProject.videoUrl && (
                  <figure className="overflow-hidden rounded-2xl border border-charcoal/10 bg-charcoal/5">
                    <video
                      className="block w-full max-h-[62vh] bg-charcoal object-contain"
                      controls
                      preload="metadata"
                      poster={selectedProject.coverImage}
                    >
                      <source src={selectedProject.videoUrl} type="video/mp4" />
                      Your browser does not support video playback.
                    </video>
                    <figcaption className="px-4 py-3 text-xs font-mono text-muted bg-cream/80">
                      {selectedProject.title} · app preview
                    </figcaption>
                  </figure>
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-charcoal/10">
                <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted mb-3">About this project</p>
                <p className="max-w-2xl text-sm text-charcoal/70 leading-relaxed">
                  {selectedProject.galleryDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
