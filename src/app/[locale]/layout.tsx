import { ReactNode } from 'react'
import { Montserrat, Noto_Sans_TC } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import '../globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const notoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
  variable: '--font-noto-sans-tc',
  weight: ['300', '400', '500', '700'],
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
    <html lang={locale} className={`${montserrat.variable} ${notoSansTC.variable}`}>
      <body className="bg-white text-foreground flex flex-col min-h-screen">
        <Header locale={locale} />
        <main className="flex-grow">
          {children}
        </main>
        <Footer locale={locale} />
      </body>
    </html>
  )
}
