'use client'

import React from 'react'
import Image from 'next/image'
import { Star, Quote } from 'lucide-react'
import MarqueeCarousel from './MarqueeCarousel'

interface Celebrity {
  _id: string
  name: { en: string; zh: string }
  role: { en: string; zh: string }
  quote: { en: string; zh: string }
  imageRelativeUrl?: string
}

interface CaseStudy {
  _id: string
  title: { en: string; zh: string }
  sessionsCount: number
  category: '4-session' | '8-session' | 'maintenance'
  beforeImageRelativeUrl: string
  afterImageRelativeUrl: string
  description?: { en: string; zh: string }
}

interface Review {
  _id: string
  clientName: string
  location: string
  rating: number
  reviewText: { en: string; zh: string }
}

interface SuccessStoriesClientProps {
  celebrities: Celebrity[]
  caseStudies: CaseStudy[]
  reviews: Review[]
  locale: 'en' | 'zh'
  dict: any
}

const countryFlags: Record<string, string> = {
  'Australia': '🇦🇺',
  'Hong Kong': '🇭🇰',
  'USA': '🇺🇸',
  'Canada': '🇨🇦',
  'Australia / Hong Kong': '🇦🇺',
  'Google Review Client': '⭐',
}

export default function SuccessStoriesClient({
  celebrities,
  caseStudies,
  reviews,
  locale,
  dict,
}: SuccessStoriesClientProps) {
  // 7 slots for case studies: use real data if available, otherwise fallback/placeholder
  const beforeAfterSlots = Array.from({ length: 7 }, (_, i) => caseStudies[i] || null)

  return (
    <div className="flex flex-col space-y-28 mt-20">
      
      {/* Section A: Celebrity Endorsements */}
      <section id="celebrities" className="max-w-7xl mx-auto w-full scroll-mt-40">
        <div className="space-y-12 px-6 sm:px-8 lg:px-12">
          <div className="border-b border-gray-100 pb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary block mb-3">
              {locale === 'en' ? 'Celebrity Stories' : '明星見證'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-light text-foreground tracking-tight">
              {dict.success.celebrityTitle}
            </h2>
          </div>
        </div>

        {/* Marquee Carousel for Celebrities */}
        <div className="mt-8">
          <MarqueeCarousel
            items={celebrities}
            speed={0.4}
            renderItem={(celebrity) => (
              <div
                className="w-[85vw] sm:w-[500px] md:w-[600px] flex-shrink-0 bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 grid grid-cols-1 md:grid-cols-12 min-h-[380px] md:min-h-0"
              >
                {/* Left: Photo Column */}
                <div className="relative h-48 md:h-auto md:col-span-5 bg-gray-50">
                  {celebrity.imageRelativeUrl ? (
                    <Image
                      src={celebrity.imageRelativeUrl}
                      alt={celebrity.name[locale] || celebrity.name.en}
                      fill
                      sizes="(max-width: 768px) 100vw, 250px"
                      className="object-cover"
                      draggable="false"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-primary text-4xl font-light bg-primary/5">
                      {(celebrity.name[locale] || celebrity.name.en).charAt(0)}
                    </div>
                  )}
                </div>

                {/* Right: Content Column */}
                <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-center space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-foreground leading-tight">
                      {celebrity.name[locale] || celebrity.name.en}
                    </h3>
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider block mt-1">
                      {celebrity.role[locale] || celebrity.role.en}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <Quote className="w-6 h-6 text-primary/15" />
                    <p className="text-sm font-light text-charcoal/85 italic leading-relaxed">
                      {celebrity.quote[locale] || celebrity.quote.en}
                    </p>
                  </div>
                </div>
              </div>
            )}
          />
        </div>
      </section>

      {/* Section B: Before & After */}
      <section id="before-after" className="max-w-7xl mx-auto w-full scroll-mt-40">
        <div className="space-y-12 px-6 sm:px-8 lg:px-12">
          <div className="border-b border-gray-100 pb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary block mb-3">
              {locale === 'en' ? 'Visual Evidence' : '視覺對比'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-light text-foreground tracking-tight">
              {dict.success.visualEvidence}
            </h2>
          </div>
        </div>

        {/* Marquee Carousel for Before/After Case Studies */}
        <div className="mt-8">
          <MarqueeCarousel
            items={beforeAfterSlots}
            speed={0.5}
            renderItem={(cs) => (
              <div
                className="w-[75vw] sm:w-[320px] md:w-[360px] flex-shrink-0 bg-white border border-gray-100 rounded-2xl overflow-hidden flex flex-col group hover:shadow-lg transition-all duration-300 h-full"
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

      {/* Section C: Google Reviews */}
      <section id="reviews" className="bg-soft-bg border-y border-gray-100 py-24 scroll-mt-40">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-16">
          <div className="text-center md:text-left max-w-2xl md:max-w-none mx-auto md:mx-0 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              {locale === 'en' ? 'What Our Clients Say' : '客戶怎麼說'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-light text-foreground tracking-tight">
              {dict.success.everydayTitle}
            </h2>
            {/* Flags */}
            <div className="flex justify-center md:justify-start items-center gap-6 flex-wrap pt-2">
              {['🇭🇰', '🇦🇺', '🇺🇸', '🇨🇦'].map((flag, idx) => (
                <span key={idx} className="text-3xl">{flag}</span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="bg-white border border-gray-100 rounded-2xl p-8 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="space-y-4">
                  <div className="flex gap-1 text-primary justify-center md:justify-start">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm font-light text-charcoal/80 leading-relaxed italic">
                    &ldquo;{review.reviewText[locale] || review.reviewText.en}&rdquo;
                  </p>
                </div>

                <div className="border-t border-gray-50 pt-4 flex items-center gap-4 justify-center md:justify-start">
                  <span className="text-3xl flex-shrink-0">{countryFlags[review.location] || '⭐'}</span>
                  <div>
                    <span className="text-sm font-medium text-foreground block text-left">{review.clientName}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
