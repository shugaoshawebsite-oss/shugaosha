import Image from 'next/image'
import { getDictionary } from '@/utils/dictionary'
import { getCaseStudies, getCelebrities, getReviews } from '@/utils/dataService'
import successBg from '@/images/bg5.webp'
import WhatsAppIcon from '@/components/WhatsAppIcon'
import StickySubNav from '@/components/StickySubNav'
import SuccessStoriesClient from '@/components/SuccessStoriesClient'

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

      {/* Success Stories Interactive Sections Wrapper */}
      <SuccessStoriesClient
        celebrities={celebrities}
        caseStudies={caseStudies}
        reviews={reviews}
        locale={locale}
        dict={dict}
      />

      {/* CTA */}
      <section className="w-full bg-primary/5 border-y border-primary/10 py-16 sm:py-20 mt-16 md:mt-24">
        <div className="max-w-7xl mx-auto px-6 text-center md:text-left space-y-8">
          <h2 className="type-heading text-foreground max-w-xl mx-auto md:mx-0 leading-tight">
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
              <WhatsAppIcon className="w-5 h-5" />
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
