import Link from 'next/link'
import Image from 'next/image'
import { getDictionary } from '@/utils/dictionary'
import { getServices, getCelebrities } from '@/utils/dataService'
import { Check, ArrowRight, MessageCircle } from 'lucide-react'

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: PageProps) {
  const { locale: rawLocale } = await params
  const locale = (rawLocale === 'zh' ? 'zh' : 'en') as 'en' | 'zh'
  const dict = getDictionary(locale)
  const services = await getServices()
  const celebrities = await getCelebrities()

  return (
    <div className="flex flex-col space-y-24 md:space-y-36 pb-24">
      {/* 1. Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-gradient-to-b from-soft-bg via-white to-white px-6 overflow-hidden">
        {/* Subtle background abstract shape */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full filter blur-3xl -z-10" />
        
        <div className="max-w-4xl mx-auto text-center space-y-8 py-16">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary block">
            {dict.home.hero.subtitle}
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-light text-foreground tracking-tight leading-none">
            {dict.home.hero.title}
          </h1>
          <p className="text-base sm:text-lg md:text-xl font-light text-charcoal/90 leading-relaxed max-w-2xl mx-auto">
            {dict.home.hero.description}
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <Link
              href={`/${locale}/contact`}
              className="w-full sm:w-auto bg-primary text-white text-sm font-medium px-8 py-4 rounded hover:bg-primary/95 transition-all duration-300 shadow-sm shadow-primary/10 flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              {locale === 'en' ? 'Book a Session' : '立即預約'}
            </Link>
            <Link
              href={`/${locale}/success-stories`}
              className="w-full sm:w-auto border border-gray-200 text-charcoal hover:border-primary hover:text-primary text-sm font-light px-8 py-4 rounded transition-all duration-300 flex items-center justify-center gap-2"
            >
              {locale === 'en' ? 'View Success Stories' : '瀏覽療效分享'}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. What We Do & Benefits Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Column: Descriptions */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              {locale === 'en' ? 'The Methodology' : '核心技術'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-light text-foreground tracking-tight">
              {dict.home.whatWeDo.title}
            </h2>
            <div className="space-y-4 text-sm sm:text-base font-light text-charcoal/80 leading-relaxed">
              <p>{dict.home.whatWeDo.description1}</p>
              <p>{dict.home.whatWeDo.description2}</p>
            </div>
            <div className="pt-4">
              <div className="inline-flex items-center gap-3 bg-soft-bg border border-gray-100 rounded-full px-4 py-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-light text-charcoal">
                  {locale === 'en' ? '100% Non-Invasive & Manual' : '100% 日式純手工・無儀器無針藥'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Benefits list */}
          <div className="lg:col-span-7 bg-soft-bg border border-gray-100/50 rounded-2xl p-8 sm:p-12 space-y-8">
            <h3 className="text-lg font-medium text-foreground tracking-wide">
              {dict.home.whatWeDo.benefitsTitle}
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {dict.home.whatWeDo.benefits.map((benefit, i) => (
                <li key={i} className="flex gap-3.5 items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-sm font-light text-charcoal/90 leading-relaxed">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 3. Celebrity Teaser & Endorsements */}
      <section className="bg-soft-bg border-y border-gray-100 py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-16">
          <div className="max-w-3xl space-y-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              {locale === 'en' ? 'Celebrity Endorsements' : '名流實證'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-light text-foreground tracking-tight leading-tight">
              {dict.home.celebrityTeaser.title}
            </h2>
            <p className="text-sm sm:text-base font-light text-charcoal/80 leading-relaxed">
              {dict.home.celebrityTeaser.description}
            </p>
          </div>

          {/* Render 3 Selected Celebrities */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {celebrities.slice(0, 3).map((celebrity) => (
              <div 
                key={celebrity._id} 
                className="bg-white border border-gray-100/80 rounded-xl p-8 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <p className="text-sm font-light text-charcoal/80 italic leading-relaxed">
                  "{celebrity.quote[locale] || celebrity.quote.en}"
                </p>
                <div className="flex items-center gap-4 border-t border-gray-50 pt-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden relative border border-gray-100 shadow-sm bg-primary/5">
                    {celebrity.imageRelativeUrl ? (
                      <Image
                        src={celebrity.imageRelativeUrl}
                        alt={celebrity.name[locale] || celebrity.name.en}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-primary font-semibold text-sm">
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

          <div className="text-center pt-4">
            <p className="text-xs font-light text-charcoal/70 mb-4">
              {dict.home.celebrityTeaser.ctaText}
            </p>
            <Link
              href={`/${locale}/success-stories`}
              className="inline-flex items-center gap-2 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
            >
              {locale === 'en' ? 'Explore Testimonials & Journeys' : '瀏覽完整療效見證'}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. How It Works Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-20">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            {locale === 'en' ? 'Our Process' : '療程規劃'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-light text-foreground tracking-tight">
            {dict.home.howItWorks.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Subtle line connector for desktop */}
          <div className="hidden md:block absolute top-1/2 left-12 right-12 h-[1px] bg-gray-100 -z-10" />

          {dict.home.howItWorks.steps.map((step, i) => (
            <div key={i} className="bg-white rounded-xl p-8 text-center space-y-4 border border-gray-50 md:border-none">
              <div className="w-12 h-12 rounded-full bg-primary text-white font-medium flex items-center justify-center mx-auto text-base shadow-sm">
                {step.number}
              </div>
              <h3 className="text-lg font-medium text-foreground tracking-wide">
                {step.title}
              </h3>
              <p className="text-sm font-light text-charcoal/85 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Bottom CTA Section */}
      <section className="max-w-5xl mx-auto px-6">
        <div className="bg-primary/5 border border-primary/10 rounded-2xl p-8 sm:p-16 text-center space-y-8">
          <h2 className="text-2xl sm:text-4xl font-light text-foreground tracking-tight max-w-xl mx-auto leading-tight">
            {dict.home.cta.title}
          </h2>
          <div className="pt-2">
            <a
              href="https://wa.me/61493552213"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-primary text-white hover:bg-primary/95 text-sm sm:text-base font-medium px-8 py-4 sm:px-10 sm:py-5 rounded transition-all duration-300 shadow-md shadow-primary/15"
            >
              <MessageCircle className="w-5 h-5" />
              {dict.home.cta.button}
            </a>
          </div>
          <p className="text-xs font-light text-charcoal/65">
            {locale === 'en' 
              ? 'Appointments are highly personalized. WhatsApp messaging is our fastest booking channel.'
              : '專屬一對一客製化服務，敬請透過 WhatsApp 進行即時預約與諮詢。'}
          </p>
        </div>
      </section>
    </div>
  )
}
