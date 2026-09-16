import { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Montserrat, Noto_Sans_TC, Gilda_Display } from 'next/font/google'
import AutoJustifyParagraphs from '@/components/AutoJustifyParagraphs'
import '../globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
})

const notoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
  variable: '--font-noto-sans-tc',
  weight: ['300', '400', '500', '700'],
  display: 'swap',
})

const gilda = Gilda_Display({
  subsets: ['latin'],
  variable: '--font-gilda-display',
  weight: ['400'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Book a Session — Shugaosha Japanese Facial Alignment | Gladesville Sydney',
  description:
    'Book your Shugaosha facial alignment session online. $200 per session · 45–60 minutes · Private studio in Gladesville, Sydney. 100% hands-on Japanese technique. Zero downtime. Instant confirmation.',
  openGraph: {
    title: 'Book a Session — Shugaosha',
    description: '$200 · 45–60 mins · Private Studio, Gladesville NSW. Book your Japanese facial alignment session today.',
    type: 'website',
  },
}

export default function BookingLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${notoSansTC.variable} ${gilda.variable}`}>
      <body className="bg-white text-foreground flex flex-col min-h-screen max-w-full overflow-x-hidden">
        {children}
        <AutoJustifyParagraphs />
      </body>
    </html>
  )
}
