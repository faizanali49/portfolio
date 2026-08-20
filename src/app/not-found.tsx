import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center text-center px-6">
      <p className="text-8xl font-display font-semibold text-charcoal/10 mb-6">404</p>
      <h1 className="text-2xl font-display font-semibold text-charcoal mb-3">Page not found</h1>
      <p className="text-sm text-muted mb-8">This page doesn&apos;t exist yet  or was moved.</p>
      <Link
        href="/"
        className="text-sm border border-charcoal px-5 py-2 rounded-full hover:bg-charcoal hover:text-cream transition-all duration-200"
      >
        ← Back home
      </Link>
    </div>
  )
}
