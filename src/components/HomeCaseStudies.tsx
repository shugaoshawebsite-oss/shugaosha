'use client'

import React from 'react'
import Image from 'next/image'
import MarqueeCarousel from './MarqueeCarousel'

interface CaseStudy {
  _id: string
  title?: { en: string; zh: string }
  sessionsCount: number
  category?: '4-session' | '8-session' | 'maintenance'
  imageRelativeUrl: string
  description?: { en: string; zh: string }
  specialist: 'Teresa Soo' | 'Charles Cho'
}

interface HomeCaseStudiesProps {
  caseStudies: CaseStudy[]
  locale: 'en' | 'zh'
}

function getOrdinalSessionText(count: number, locale: 'en' | 'zh') {
  if (locale === 'zh') {
    return `${count} 次矯正後`
  }
  const limit = Math.max(1, count)
  const word = limit === 1 ? 'Session' : 'Sessions'
  return `After ${limit} ${word}`
}

export default function HomeCaseStudies({ caseStudies, locale }: HomeCaseStudiesProps) {
  // Use real case studies from CMS, or fallback to placeholder slots if empty
  const beforeAfterSlots = caseStudies && caseStudies.length > 0 ? caseStudies : Array.from({ length: 4 }, () => null)

  return (
    <section id="real-results" className="max-w-7xl mx-auto w-full scroll-mt-40">
      <div className="space-y-12 px-6 sm:px-8 lg:px-12 text-left">
        <div className="space-y-3">
          <span className="type-label text-primary">
            {locale === 'en' ? 'Visual Evidence' : '真實案例'}
          </span>
          <h2 className="type-heading text-foreground">
            {locale === 'en' ? 'Real Results' : '真實效果'}
          </h2>
          <p className="type-body text-charcoal/80 max-w-2xl">
            {locale === 'en'
              ? 'These are real client progressions. Natural, consistent, and honest results from dedicated sessions.'
              : '以下均為真實客戶的矯正進展對照，展示持續堅持後帶來的自然、誠實的效果。'}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <MarqueeCarousel
          items={beforeAfterSlots}
          speed={0.5}
          renderItem={(cs) => (
            <div
              className="w-full bg-white border border-gray-100 rounded-2xl overflow-hidden flex flex-col group hover:shadow-lg transition-all duration-300 h-full text-left"
            >
              {/* Image */}
              <div className="relative aspect-square bg-gray-100 w-full overflow-hidden">
                {cs ? (
                  <Image
                    src={cs.imageRelativeUrl}
                    alt={locale === 'en' ? 'Before and after progression' : '小顏矯正前後對照'}
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
              <div className="p-6 space-y-3 flex-grow flex flex-col justify-between text-left">
                {cs ? (
                  <div className="space-y-2 text-left">
                    <h3 className="text-base font-semibold text-primary text-left mb-2">
                      {getOrdinalSessionText(cs.sessionsCount || 1, locale)}
                    </h3>
                    {cs.description && (
                      <p className="text-sm font-light text-charcoal/75 leading-relaxed text-left whitespace-pre-line">
                        {cs.description[locale] || cs.description.en}
                      </p>
                    )}
                    {cs.specialist && (
                      <p className="text-xs font-semibold text-primary pt-2 text-left">
                        Specialist: {cs.specialist}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2 text-left">
                    <div className="h-3 bg-gray-100 rounded-full w-1/3" />
                    <div className="h-4 bg-gray-100 rounded-full w-2/3" />
                    <p className="text-xs font-light text-charcoal/40 italic pt-1 text-left">
                      {locale === 'en' ? 'Case study coming soon' : '案例即將更新'}
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
