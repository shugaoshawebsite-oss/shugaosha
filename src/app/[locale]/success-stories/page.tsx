import Image from 'next/image'
import { getDictionary } from '@/utils/dictionary'
import { getCaseStudies, getCelebrities, getReviews } from '@/utils/dataService'
import { Star, Quote } from 'lucide-react'

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function SuccessStoriesPage({ params }: PageProps) {
  const { locale: rawLocale } = await params
  const locale = (rawLocale === 'zh' ? 'zh' : 'en') as 'en' | 'zh'
  const dict = getDictionary(locale)
  const caseStudies = await getCaseStudies()
  const celebrities = await getCelebrities()
  const reviews = await getReviews()

  return (
    <div className="flex flex-col space-y-24 md:space-y-36 pb-24">
      {/* Page Header */}
      <section className="bg-gradient-to-b from-soft-bg to-white py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary block">
            {dict.success.subtitle}
          </span>
          <h1 className="text-3xl sm:text-5xl font-light text-foreground tracking-tight">
            {dict.success.title}
          </h1>
          <p className="text-sm sm:text-base font-light text-charcoal/80 max-w-xl mx-auto leading-relaxed">
            {locale === 'en'
              ? 'Real progression journeys and testimonials showcasing how consistency and hand alignment bring visible, natural results.'
              : '最真實的療程進展對照與見證，展示透過持續的日式小顏手感，帶來的顯著與自然調整。'}
          </p>
        </div>
      </section>

      {/* Section A: Visual Evidence (Case Studies) */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="space-y-12">
          <div className="border-b border-gray-100 pb-6">
            <h2 className="text-2xl sm:text-3xl font-light text-foreground tracking-tight">
              {dict.success.visualEvidence}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {caseStudies.map((cs) => (
              <div 
                key={cs._id}
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden flex flex-col group hover:shadow-lg transition-all duration-300"
              >
                {/* Images placeholder / display container */}
                <div className="grid grid-cols-2 gap-0.5 bg-gray-100 h-64 sm:h-72 relative">
                  <div className="relative h-full w-full overflow-hidden border-r border-white/60 bg-gray-50">
                    {cs.beforeImageRelativeUrl ? (
                      <Image
                        src={cs.beforeImageRelativeUrl}
                        alt={`${cs.title[locale] || cs.title.en} - Before`}
                        fill
                        sizes="(max-width: 768px) 50vw, 33vw"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-charcoal/40">Pre</div>
                    )}
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[10px] uppercase font-semibold text-charcoal px-2.5 py-1 rounded z-10">
                      {locale === 'en' ? 'Before' : '前'}
                    </span>
                  </div>
                  <div className="relative h-full w-full overflow-hidden bg-primary/5">
                    {cs.afterImageRelativeUrl ? (
                      <Image
                        src={cs.afterImageRelativeUrl}
                        alt={`${cs.title[locale] || cs.title.en} - After`}
                        fill
                        sizes="(max-width: 768px) 50vw, 33vw"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-primary">Post</div>
                    )}
                    <span className="absolute top-3 left-3 bg-primary text-white text-[10px] uppercase font-semibold px-2.5 py-1 rounded shadow-sm z-10">
                      {locale === 'en' ? 'After' : '後'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[10px] font-semibold tracking-wider text-primary uppercase">
                      {cs.category === '4-session' ? (locale === 'en' ? '4-Session Progression' : '4次療程對照') :
                       cs.category === '8-session' ? (locale === 'en' ? '8-Session Progression' : '8次療程對照') :
                       (locale === 'en' ? 'Long Term Maintenance' : '長期保養維持')}
                    </span>
                    <h3 className="text-lg font-medium text-foreground tracking-wide">
                      {cs.title[locale] || cs.title.en}
                    </h3>
                    <p className="text-sm font-light text-charcoal/80 leading-relaxed">
                      {cs.description ? (cs.description[locale] || cs.description.en) : ''}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section B: Celebrity Endorsements */}
      <section className="bg-soft-bg border-y border-gray-100 py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-16">
          <div className="border-b border-gray-200/60 pb-6 max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-light text-foreground tracking-tight">
              {dict.success.celebrityTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {celebrities.map((celebrity) => (
              <div 
                key={celebrity._id} 
                className="bg-white border border-gray-100/60 rounded-2xl p-8 sm:p-10 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="space-y-4">
                  <Quote className="w-8 h-8 text-primary/20" />
                  <p className="text-sm sm:text-base font-light text-charcoal/85 italic leading-relaxed">
                    {celebrity.quote[locale] || celebrity.quote.en}
                  </p>
                </div>
                
                <div className="flex items-center gap-4 border-t border-gray-50 pt-6">
                  <div className="w-11 h-11 rounded-full overflow-hidden relative border border-gray-100 shadow-sm bg-primary/5">
                    {celebrity.imageRelativeUrl ? (
                      <Image
                        src={celebrity.imageRelativeUrl}
                        alt={celebrity.name[locale] || celebrity.name.en}
                        fill
                        sizes="44px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-primary font-medium text-sm">
                        {(celebrity.name[locale] || celebrity.name.en).charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-foreground">
                      {celebrity.name[locale] || celebrity.name.en}
                    </h4>
                    <p className="text-xs font-light text-charcoal/70">
                      {celebrity.role[locale] || celebrity.role.en}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section C: Everyday Client Reviews */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="space-y-12">
          <div className="border-b border-gray-100 pb-6">
            <h2 className="text-2xl sm:text-3xl font-light text-foreground tracking-tight">
              {dict.success.everydayTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div 
                key={review._id} 
                className="border border-gray-100 bg-white rounded-xl p-8 flex flex-col justify-between space-y-6 shadow-sm"
              >
                <div className="space-y-4">
                  <div className="flex gap-1 text-primary">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm font-light text-charcoal/80 leading-relaxed">
                    "{review.reviewText[locale] || review.reviewText.en}"
                  </p>
                </div>

                <div className="border-t border-gray-50 pt-4 flex flex-col">
                  <span className="text-sm font-medium text-foreground">{review.clientName}</span>
                  <span className="text-xs font-light text-charcoal/60">{review.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
