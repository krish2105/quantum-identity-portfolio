import type { Metadata } from 'next'
import { Syncopate, Space_Grotesk } from 'next/font/google'
import './globals.css'
import CRTOverlay from '@/components/CRTOverlay'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const syncopate = Syncopate({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-syncopate',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Krishna Mathur | Quantum Identity',
  description: 'AI & Big Data Engineer / Data Scientist Portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`dark ${spaceGrotesk.variable} ${syncopate.variable}`}>
      <body className="antialiased relative min-h-screen">
        {/* Z=0: Three.js Canvas container will go here (via a global provider/wrapper or fixed div) */}
        <div id="canvas-container" className="fixed inset-0 z-0 pointer-events-none" />

        {/* Z=10: Main content */}
        <main className="relative z-10">
          {children}
        </main>

        {/* Z=50: CRT / Scanline Effect */}
        <CRTOverlay />
      </body>
    </html>
  )
}
