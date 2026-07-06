import Image from 'next/image'
import { getDictionary } from '@/utils/dictionary'
import { getCaseStudies, getCelebrities, getReviews } from '@/utils/dataService'
import successBg from '@/images/bg5.webp'
import { Star, Quote, MessageCircle } from 'lucide-react'
import StickySubNav from '@/components/StickySubNav'

interface PageProps {
  params: Promise<{ locale: string }>
}

const countryFlags: Record<string, string> = {
  'Australia': '🇦🇺',
  'Hong Kong': '🇭🇰',
  'USA': '🇺🇸',
  'Canada': '🇨🇦',
  'Australia / Hong Kong': '🇦🇺',
  'Google Review Client': '⭐',
}

// 7 before/after slots — 3 real, 4 placeholders
const beforeAfterSlots = [1, 2, 3, 4, 5, 6, 7]

export default async function SuccessStoriesPage({ params }: PageProps) {
  const { locale: rawLocale } = await params
  const locale = (rawLocale === 'zh' ? 'zh' : 'en') as 'en' | 'zh'
  const dict = getDictionary(locale)
  const caseStudies = await getCaseStudies()
  const celebrities = await getCelebrities()
  const reviews = await getReviews()

  return (
    <div className="flex flex-col pb-24">

      {/* Page Header */}
      <section className="relative min-h-[40vh] flex items-center overflow-hidden w-full">
        <div className="absolute inset-0 z-0">
          <Image
            src={successBg}
            alt="Hero Background"
            fill
            priority
            className="object-cover opacity-80"
          />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-36 pb-24 text-left">
          <span className="type-label text-charcoal/70 block mb-3">
            {dict.success.subtitle}
          </span>
          <h1 className="type-hero text-charcoal">
            {dict.success.title}
          </h1>
          <p className="type-body text-charcoal/80 max-w-xl mt-4">
            {locale === 'en'
              ? 'Real progression journeys and testimonials showcasing how consistency and hand alignment bring visible, natural results.'
              : '最真實的療程進展對照與見證，展示透過持續的日式小顏手感帶來的顯著與自然調整。'}
          </p>
        </div>
      </section>

      {/* Sticky Sub Nav */}
      <StickySubNav locale={locale} />

      <div className="flex flex-col space-y-28 mt-20">

        {/* Section A: Celebrity Endorsements */}
        <section id="celebrities" className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full scroll-mt-40">
          <div className="space-y-12">
            <div className="border-b border-gray-100 pb-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary block mb-3">
                {locale === 'en' ? 'Celebrity Stories' : '明星見證'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-light text-foreground tracking-tight">
                {dict.success.celebrityTitle}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-8">
              {celebrities.map((celebrity, i) => (
                <div
                  key={celebrity._id}
                  className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 grid grid-cols-1 md:grid-cols-12"
                >
                  {/* Left: Large Photo Column (3:2 ratio, same width, alternating position) */}
                  <div className={`md:col-span-6 relative aspect-[3/2] bg-gray-50 ${i % 2 === 1 ? 'md:order-last' : ''}`}>
                    {celebrity.imageRelativeUrl ? (
                      <Image
                        src={celebrity.imageRelativeUrl}
                        alt={celebrity.name[locale] || celebrity.name.en}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-primary text-6xl font-light bg-primary/5">
                        {(celebrity.name[locale] || celebrity.name.en).charAt(0)}
                      </div>
                    )}
                  </div>

                  {/* Right: Content Column */}
                  <div className="md:col-span-6 p-8 sm:p-10 flex flex-col justify-center space-y-6">
                    <div>
                      <h3 className="text-xl font-medium text-foreground leading-tight">
                        {celebrity.name[locale] || celebrity.name.en}
                      </h3>
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider block mt-1">
                        {celebrity.role[locale] || celebrity.role.en}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <Quote className="w-8 h-8 text-primary/15" />
                      <p className="text-base font-light text-charcoal/80 italic leading-relaxed">
                        {celebrity.quote[locale] || celebrity.quote.en}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section B: Before & After */}
        <section id="before-after" className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full scroll-mt-40">
          <div className="space-y-16">
            <div className="border-b border-gray-100 pb-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary block mb-3">
                {locale === 'en' ? 'Visual Evidence' : '視覺對比'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-light text-foreground tracking-tight">
                {dict.success.visualEvidence}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {beforeAfterSlots.map((slot) => {
                const cs = caseStudies[slot - 1]
                return (
                  <div key={slot} className="bg-white border border-gray-100 rounded-2xl overflow-hidden flex flex-col group hover:shadow-lg transition-all duration-300">
                    {/* Images */}
                    <div className="grid grid-cols-2 gap-0.5 bg-gray-100 h-64 relative">
                      {cs ? (
                        <>
                          <div className="relative h-full overflow-hidden">
                            <Image
                              src={cs.beforeImageRelativeUrl}
                              alt={`${cs.title[locale] || cs.title.en} - Before`}
                              fill
                              sizes="(max-width: 768px) 50vw, 20vw"
                              className="object-cover"
                            />
                            <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-[9px] uppercase font-semibold text-charcoal px-2 py-0.5 rounded z-10">
                              {locale === 'en' ? 'Before' : '前'}
                            </span>
                          </div>
                          <div className="relative h-full overflow-hidden">
                            <Image
                              src={cs.afterImageRelativeUrl}
                              alt={`${cs.title[locale] || cs.title.en} - After`}
                              fill
                              sizes="(max-width: 768px) 50vw, 20vw"
                              className="object-cover"
                            />
                            <span className="absolute top-2 left-2 bg-primary text-white text-[9px] uppercase font-semibold px-2 py-0.5 rounded shadow-sm z-10">
                              {locale === 'en' ? 'After' : '後'}
                            </span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="relative h-full bg-gray-100 flex items-center justify-center">
                            <span className="text-[9px] uppercase font-semibold text-charcoal/30 tracking-widest">
                              {locale === 'en' ? 'Before' : '前'}
                            </span>
                          </div>
                          <div className="relative h-full bg-gray-50 flex items-center justify-center">
                            <span className="text-[9px] uppercase font-semibold text-primary/30 tracking-widest">
                              {locale === 'en' ? 'After' : '後'}
                            </span>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-3">
                      {cs ? (
                        <>
                          <span className="text-[10px] font-semibold tracking-wider text-primary uppercase">
                            {cs.category === '4-session' ? (locale === 'en' ? '4-Session Progression' : '4次療程對照') :
                             cs.category === '8-session' ? (locale === 'en' ? '8-Session Progression' : '8次療程對照') :
                             (locale === 'en' ? 'Long Term Maintenance' : '長期保養維持')}
                          </span>
                          <h3 className="text-base font-medium text-foreground">
                            {cs.title[locale] || cs.title.en}
                          </h3>
                          {cs.description && (
                            <p className="text-sm font-light text-charcoal/75 leading-relaxed">
                              {cs.description[locale] || cs.description.en}
                            </p>
                          )}
                        </>
                      ) : (
                        <div className="space-y-2">
                          <div className="h-3 bg-gray-100 rounded-full w-1/3" />
                          <div className="h-4 bg-gray-100 rounded-full w-2/3" />
                          <p className="text-xs font-light text-charcoal/40 italic pt-1">
                            {locale === 'en' ? 'Case study coming soon' : '療程案例即將更新'}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
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
                    <div className="flex gap-1 text-primary">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm font-light text-charcoal/80 leading-relaxed italic">
                      &ldquo;{review.reviewText[locale] || review.reviewText.en}&rdquo;
                    </p>
                  </div>

                  <div className="border-t border-gray-50 pt-4 flex items-center gap-4">
                    <span className="text-3xl flex-shrink-0">{countryFlags[review.location] || '⭐'}</span>
                    <div>
                      <span className="text-sm font-medium text-foreground block">{review.clientName}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>

      {/* CTA */}
      <section className="w-full bg-primary/5 border-y border-primary/10 py-16 sm:py-20 mt-16 md:mt-24">
        <div className="max-w-7xl mx-auto px-6 text-center md:text-left space-y-8">
          <h2 className="text-2xl sm:text-4xl font-light text-foreground tracking-tight max-w-xl mx-auto md:mx-0 leading-tight">
            {locale === 'en'
              ? 'Start Your Own Success Story'
              : '開啟您自己的成功故事'}
          </h2>
          <p className="type-body-sm text-charcoal/70 max-w-md mx-auto md:mx-0">
            {locale === 'en'
              ? 'Book your personalized consultation or treatment session today.'
              : '立即預約您的個人化諮詢或療程。'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
            <a
              href="https://wa.me/61493552213"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center gap-3"
            >
              <MessageCircle className="w-5 h-5" />
              {locale === 'en' ? 'Book via WhatsApp' : 'WhatsApp 線上預約'}
            </a>
            <a
              href="sms:+61493552213"
              className="btn-secondary flex items-center gap-3 bg-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              {locale === 'en' ? 'Book via SMS' : 'SMS 簡訊預約'}
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
