'use client'

import React from 'react'
import Image from 'next/image'
import MarqueeCarousel from './MarqueeCarousel'

interface CaseStudy {
  _id: string
  title: { en: string; zh: string }
  sessionsCount: number
  category: '4-session' | '8-session' | 'maintenance'
  beforeImageRelativeUrl: string
  afterImageRelativeUrl: string
  description?: { en: string; zh: string }
}

interface HomeCaseStudiesProps {
  caseStudies: CaseStudy[]
  locale: 'en' | 'zh'
}

export default function HomeCaseStudies({ caseStudies, locale }: HomeCaseStudiesProps) {
  // 7 slots for case studies
  const beforeAfterSlots = Array.from({ length: 7 }, (_, i) => caseStudies[i] || null)

  return (
    <section id="real-results" className="max-w-7xl mx-auto w-full scroll-mt-40">
      <div className="space-y-12 px-6 sm:px-8 lg:px-12 text-center md:text-left">
        <div className="space-y-3">
          <span className="type-label text-primary">
            {locale === 'en' ? 'Visual Evidence' : '視覺對比'}
          </span>
          <h2 className="type-heading text-foreground">
            {locale === 'en' ? 'Real Results' : '真實療效'}
          </h2>
          <p className="type-body text-charcoal/80 max-w-2xl mx-auto md:mx-0">
            {locale === 'en'
              ? 'These are real client progressions. Natural, consistent, and honest results from dedicated sessions.'
              : '以下均為真實客戶的療程進展對照，展示持續堅持後帶來的自然、誠實的效果。'}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <MarqueeCarousel
          items={beforeAfterSlots}
          speed={0.5}
          renderItem={(cs) => (
            <div
              className="w-[75vw] sm:w-[320px] md:w-[360px] flex-shrink-0 bg-white border border-gray-100 rounded-2xl overflow-hidden flex flex-col group hover:shadow-lg transition-all duration-300 h-full text-left"
            >
              {/* Image */}
              <div className="relative aspect-square bg-gray-100 w-full overflow-hidden">
                {cs ? (
                  <Image
                    src={cs.afterImageRelativeUrl}
                    alt={cs.title[locale] || cs.title.en}
                    fill
                    sizes="(max-width: 768px) 100vw, 360px"
                    className="object-cover"
                    draggable="false"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-50">
                    <span className="text-xs uppercase font-semibold text-charcoal/30 tracking-wider">
                      {locale === 'en' ? 'Coming Soon' : '即將推出'}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 space-y-3 flex-grow flex flex-col justify-between">
                {cs ? (
                  <div className="space-y-2">
                    <span className="text-[10px] font-semibold tracking-wider text-primary uppercase block text-center md:text-left">
                      {cs.category === '4-session' ? (locale === 'en' ? '4-Session Progression' : '4次療程對照') :
                       cs.category === '8-session' ? (locale === 'en' ? '8-Session Progression' : '8次療程對照') :
                       (locale === 'en' ? 'Long Term Maintenance' : '長期保養維持')}
                    </span>
                    <h3 className="text-base font-medium text-foreground text-center md:text-left">
                      {cs.title[locale] || cs.title.en}
                    </h3>
                    {cs.description && (
                      <p className="text-sm font-light text-charcoal/75 leading-relaxed text-center md:text-left">
                        {cs.description[locale] || cs.description.en}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-100 rounded-full w-1/3 mx-auto md:mx-0" />
                    <div className="h-4 bg-gray-100 rounded-full w-2/3 mx-auto md:mx-0" />
                    <p className="text-xs font-light text-charcoal/40 italic pt-1 text-center md:text-left">
                      {locale === 'en' ? 'Case study coming soon' : '療程案例即將更新'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        />
      </div>
    </section>
  )
}
