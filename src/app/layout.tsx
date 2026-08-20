import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Faizan Ali  Flutter Developer',
  description: 'Flutter mobile app developer crafting high-quality cross-platform experiences. Based in Gujrat, Pakistan.',
  keywords: ['Flutter', 'mobile developer', 'Dart', 'Firebase', 'Riverpod', 'Pakistan'],
  openGraph: {
    title: 'Faizan Ali  Flutter Developer',
    description: 'Flutter mobile app developer crafting high-quality cross-platform experiences.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-cream text-charcoal antialiased">
        {children}
      </body>
    </html>
  )
}
