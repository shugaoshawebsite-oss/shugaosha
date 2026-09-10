import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { Montserrat, Noto_Sans_TC, Gilda_Display } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import '../globals.css'

export const metadata: Metadata = {
  formatDetection: {
    telephone: false,
    date: false,
    email: false,
    address: false,
  },
}

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

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }]
}

interface LayoutProps {
  children: ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale: rawLocale } = await params
  const locale = (rawLocale === 'zh' ? 'zh' : 'en') as 'en' | 'zh'

  return (
    <html lang={locale} className={`${montserrat.variable} ${notoSansTC.variable} ${gilda.variable}`}>
      <head>
        <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
      </head>
      <body className="bg-white text-foreground flex flex-col min-h-screen max-w-full overflow-x-hidden">
        {/* Floating Island Navbar */}
        <Header locale={locale} />

        {/* Hero Sentinel — watched by navbar IntersectionObserver */}
        <div id="hero-sentinel" aria-hidden="true" />

        {/* Main content — no top padding; Hero handles its own 100dvh */}
        <main className="flex-grow max-w-full overflow-x-hidden">
          {children}
        </main>
        <Footer locale={locale} />
      </body>
    </html>
  )
}
