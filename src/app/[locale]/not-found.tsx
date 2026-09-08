"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight, Compass } from 'lucide-react'

export default function NotFound() {
  const pathname = usePathname()
  const isZh = pathname?.startsWith('/zh')

  const locale = isZh ? 'zh' : 'en'

  return (
    <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden px-6 py-20 bg-white">
      {/* Massive subtle background 404 text */}
      <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none z-0">
        <span className="font-serif text-[#C13825]/4 text-[12rem] sm:text-[18rem] md:text-[24rem] font-extrabold leading-none tracking-tighter">
          404
        </span>
      </div>

      <div className="relative z-10 max-w-lg w-full text-center space-y-8 flex flex-col items-center">
        {/* Animated Icon Ring */}
        <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-[#C13825]/5 text-[#C13825] animate-[pulse_3s_ease-in-out_infinite]">
          <Compass className="w-10 h-10 text-[#C13825] animate-[spin_20s_linear_infinite]" />
        </div>

        {/* Localized Headings */}
        <div className="space-y-3">
          <span className="type-label text-primary">
            {isZh ? '出錯了' : 'Error'}
          </span>
          <h1 className="type-heading text-foreground font-serif text-3xl sm:text-4xl">
            {isZh ? '頁面未找到' : 'Lost in Alignment'}
          </h1>
          <p className="type-body text-charcoal/80 max-w-md mx-auto mt-2">
            {isZh
              ? '您訪問的頁面已融入自然的對稱之中。它可能已被遷移，或根本不存在。'
              : 'The page you are looking for has faded into natural symmetry. It might have been relocated, or never existed.'}
          </p>
        </div>

        {/* Localized Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto pt-4">
          <Link href={`/${locale}/`} className="btn-primary flex items-center gap-2 w-full sm:w-auto text-center justify-center">
            {isZh ? '返回首頁' : 'Back to Home'}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href={`/${locale}/treatment`} className="btn-secondary w-full sm:w-auto text-center justify-center">
            {isZh ? '瀏覽服務' : 'Browse Services'}
          </Link>
        </div>
      </div>
    </div>
  )
}
