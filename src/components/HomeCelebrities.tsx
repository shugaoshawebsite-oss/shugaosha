'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Quote } from 'lucide-react'
import MarqueeCarousel from './MarqueeCarousel'

interface Celebrity {
  _id: string
  name: { en: string; zh: string }
  role: { en: string; zh: string }
  quote: { en: string; zh: string }
  imageRelativeUrl?: string
}

interface HomeCelebritiesProps {
  celebrities: Celebrity[]
  locale: 'en' | 'zh'
}

export default function HomeCelebrities({ celebrities, locale }: HomeCelebritiesProps) {
  const [expandedQuotes, setExpandedQuotes] = useState<Record<string, boolean>>({})

  const toggleExpand = (id: string) => {
    setExpandedQuotes(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const truncateText = (text: string, limit = 50) => {
    const isZh = locale === 'zh'
    if (isZh) {
      if (text.length > 80) {
        return {
          truncated: text.slice(0, 80),
          shouldTruncate: true
        }
      }
    } else {
      const words = text.split(/\s+/)
      if (words.length > limit) {
        return {
          truncated: words.slice(0, limit).join(' '),
          shouldTruncate: true
        }
      }
    }
    return {
      truncated: text,
      shouldTruncate: false
    }
  }

  return (
    <section className="bg-soft-bg border-y border-gray-100 py-24 w-full">
      <div className="max-w-7xl mx-auto w-full">
        <div className="space-y-12 px-6 sm:px-8 lg:px-12 text-center md:text-left mb-12">
          <div className="space-y-3">
            <span className="type-label text-primary">
              {locale === 'en' ? 'Celebrity Endorsements' : '名人明星推薦'}
            </span>
            <h2 className="type-heading text-foreground">
              {locale === 'en' ? 'Trusted by Hong Kong Celebrities' : '深受香港著名明星信賴'}
            </h2>
          </div>
        </div>

        <MarqueeCarousel
          items={celebrities}
          speed={0.4}
          renderItem={(celebrity) => (
            <div
              className="w-full bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full text-left"
            >
              {/* Top: Photo (Square) */}
              <div className="relative aspect-square w-full bg-gray-50">
                {celebrity.imageRelativeUrl ? (
                  <Image
                    src={celebrity.imageRelativeUrl}
                    alt={celebrity.name[locale] || celebrity.name.en}
                    fill
                    sizes="(max-width: 768px) 100vw, 360px"
                    className="object-cover"
                    draggable="false"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-primary text-4xl font-light bg-primary/5">
                    {(celebrity.name[locale] || celebrity.name.en).charAt(0)}
                  </div>
                )}
              </div>

              {/* Bottom: Content */}
              <div className="p-6 flex flex-col justify-start flex-grow space-y-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-medium text-foreground leading-tight text-center md:text-left">
                    {celebrity.name[locale] || celebrity.name.en}
                  </h3>
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider block mt-1 text-center md:text-left">
                    {celebrity.role[locale] || celebrity.role.en}
                  </span>
                </div>

                <div className="space-y-2 border-t border-gray-50 pt-4">
                  <Quote className="w-6 h-6 text-primary/15 mx-auto md:mx-0" />
                  <p className="text-sm font-light text-charcoal/85 italic leading-relaxed text-center md:text-left">
                    {(() => {
                      const rawQuote = celebrity.quote[locale] || celebrity.quote.en
                      const isExpanded = !!expandedQuotes[celebrity._id]
                      const { truncated, shouldTruncate } = truncateText(rawQuote)
                      
                      if (isExpanded || !shouldTruncate) {
                        return (
                          <>
                            {rawQuote}
                            {shouldTruncate && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  toggleExpand(celebrity._id)
                                }}
                                className="ml-1 text-xs font-medium text-primary hover:underline focus:outline-none cursor-pointer inline-block"
                              >
                                {locale === 'en' ? ' read less' : ' 收起'}
                              </button>
                            )}
                          </>
                        )
                      }
                      
                      return (
                        <>
                          {truncated}
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleExpand(celebrity._id)
                            }}
                            className="ml-1 text-xs font-medium text-primary hover:underline focus:outline-none cursor-pointer inline-block"
                          >
                            {locale === 'en' ? '... read more' : '... 閱讀更多'}
                          </button>
                        </>
                      )
                    })()}
                  </p>
                </div>
              </div>
            </div>
          )}
        />
      </div>
    </section>
  )
}
