'use client'

import { ExternalLink } from 'lucide-react'

const skills = [
  'Flutter', 'Dart', 'Firebase', 'Riverpod', 'GoRouter',
  'Python', 'Web Scraping', 'Android TV', 'REST APIs',
  'Flutter Animate', 'HLS Streaming', 'Git',
]

const certifications = [
  {
    issuer: 'Google / Coursera',
    title: 'Google Cybersecurity Professional Certificate',
    year: '2024',
    link: 'https://coursera.org/verify/Z9YFUBDZVJY2',
  },
  {
    issuer: 'EC-Council',
    title: 'Python Basics',
    year: '2024',
  },
  {
    issuer: 'EC-Council',
    title: 'HTML & CSS Web Techniques',
    year: '2024',
  },
  {
    issuer: 'JagoBD IT Solutions',
    title: 'Flutter App Development Internship',
    year: '2024',
  },
  {
    issuer: 'Vanderbilt / Coursera',
    title: 'Generative AI Primer',
    year: '2025',
    link: 'https://coursera.org/verify/TYME4IKQLO4F',
  },
]

export default function AboutSection() {
  return (
    <section id="about" className="max-w-6xl mx-auto px-6 py-24">
      <div className="section-divider mb-16" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Left: Bio */}
        <div>
          <h2 className="text-2xl font-display font-semibold text-charcoal mb-6 tracking-tight">
            About me
          </h2>
          <p className="text-sm text-charcoal/70 leading-relaxed mb-4">
            I&apos;m a Flutter developer and Computer Science graduate from Gujrat, Pakistan,
            I build cross-platform mobile applications. My journey
            is from a student to a professional developer with an internship at Scrapebyte, where I setup as python developer which later converted into Flutter internship and then into a full-time Assosiate Software
            Engineer role working mainly on Flutter and some time Python automation.
          </p>
          <p className="text-sm text-charcoal/70 leading-relaxed mb-8">
            I boosted myself into writing clean, maintainable code and shipping polished user experiences.
            While i use AI to boost my repeative work and focus on architecture Outside of code I&apos;m interested in designing, system architecture, and finding
            creative solutions to boring problems.
          </p>

          {/* Work experience */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono text-muted uppercase tracking-wider">Experience</h3>
            <div className="flex flex-col gap-1">
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-medium text-charcoal">Software Engineer</span>
                <span className="text-xs font-mono text-muted">2025</span>
              </div>
              <span className="text-sm text-charcoal/60">Scrapebyte Gujrat, Pakistan</span>
              <p className="text-xs text-charcoal/50 leading-relaxed mt-1">
                Mobile app development & Python automation. Where i worked on
                production features, contributed to projects.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Skills + Certs */}
        <div className="space-y-10">
          {/* Skills */}
          <div>
            <h3 className="text-xs font-mono text-muted uppercase tracking-wider mb-4">
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill} className="tag-pill text-xs">{skill}</span>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-xs font-mono text-muted uppercase tracking-wider mb-4">
              Certifications
            </h3>
            <ul className="space-y-3">
              {certifications.map((cert, i) => (
                <li key={i} className="flex items-start justify-between gap-3 group">
                  <div>
                    <p className="text-sm font-medium text-charcoal leading-snug">
                      {cert.title}
                    </p>
                    <p className="text-xs text-muted">{cert.issuer} · {cert.year}</p>
                  </div>
                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 p-1 rounded hover:bg-charcoal hover:text-cream transition-all"
                      aria-label={`Verify ${cert.title}`}
                    >
                      <ExternalLink size={12} />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-xs font-mono text-muted uppercase tracking-wider mb-4">
              Education
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-charcoal">BS Computer Science</p>
                <p className="text-xs text-muted">University of Gujrat · 2024–2025</p>
              </div>
              <div>
                <p className="text-sm font-medium text-charcoal">ADP Computer Science</p>
                <p className="text-xs text-muted">University of Sialkot · 2020–2022</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
