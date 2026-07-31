import Link from 'next/link'
import Image from 'next/image'
import Script from 'next/script'
import { getDictionary } from '@/utils/dictionary'
import { getServices, getCelebrities, getCaseStudies, getGoogleReviews } from '@/utils/dataService'
import { ArrowRight, Sparkles, Scale, Droplet, Sun, Smile, Shield } from 'lucide-react'
import WhatsAppIcon from '@/components/WhatsAppIcon'
import FaqSection from '@/components/FaqSection'
import HeroSection from '@/components/HeroSection'
import HomeCaseStudies from '@/components/HomeCaseStudies'
import HomeCelebrities from '@/components/HomeCelebrities'
import HomeGoogleReviews from '@/components/HomeGoogleReviews'

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

export default async function HomePage({ params }: PageProps) {
  const { locale: rawLocale } = await params
  const locale = (rawLocale === 'zh' ? 'zh' : 'en') as 'en' | 'zh'
  const dict = getDictionary(locale)
  const celebrities = await getCelebrities()
  const caseStudies = await getCaseStudies()
  const googleReviews = await getGoogleReviews()



  // No static featured objects needed as we render all items inside marquee carousels

  return (
    <div className="flex flex-col space-y-24 md:space-y-36 pb-24 max-w-full overflow-x-hidden">

      {/* 1. Hero Section — GSAP animated, bottom-left layout */}
      <HeroSection locale={locale} dict={dict} />

      {/* 2. What is Shugaosha + image */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div className="space-y-8 order-1 lg:order-1 text-center lg:text-left">
            <div className="space-y-3">
              <span className="type-label text-primary">
                {locale === 'en' ? 'Our Approach' : '我們的方法'}
              </span>
              <h2 className="type-heading text-foreground">
                {dict.home.whatWeDo.title}
              </h2>
            </div>
            <div className="space-y-4 type-body text-charcoal/80">
              <p>{dict.home.whatWeDo.description1}</p>
              <p>{dict.home.whatWeDo.description2}</p>
              {dict.home.whatWeDo.description3 && <p>{dict.home.whatWeDo.description3}</p>}
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-4">
              <Link
                href={`/${locale}/treatment`}
                className="btn-secondary flex items-center gap-2"
              >
                {locale === 'en' ? 'Learn More' : '了解更多'}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Images */}
          <div className="relative order-2 lg:order-2 w-full space-y-6">
            <div className="relative aspect-[3/2] w-full rounded-2xl overflow-hidden bg-gray-50">
              <Image
                src="/assets/images/home1.webp"
                alt={locale === 'en' ? 'Shugaosha treatment' : '修顏社療程'}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
            <div className="relative aspect-[3/2] w-full rounded-2xl overflow-hidden bg-gray-50">
              <Image
                src="/assets/cha_wht.webp"
                alt={locale === 'en' ? 'Shugaosha environment' : '修顏社環境'}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Benefits of The Shugaosha Way */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-16">
          {/* Header */}
          <div className="text-center md:text-left max-w-2xl md:max-w-none mx-auto md:mx-0 space-y-3">
            <span className="type-label text-primary">
              {locale === 'en' ? 'Why Shugaosha' : '為什麼選擇修顏社小顏術'}
            </span>
            <h2 className="type-heading text-foreground">
              {locale === 'en' ? 'Benefits of The Shugaosha Way' : '修顏社小顏術的好處'}
            </h2>
          </div>

          {/* 6 Benefit Cards in Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {[
              {
                icon: Sparkles,
                title: locale === 'en' ? 'Lifted & Refined' : '提升與緊緻',
                desc: locale === 'en' ? 'Promotes a firmer, more contoured facial appearance.' : '促進面部輪廓更加緊緻立體。'
              },
              {
                icon: Scale,
                title: locale === 'en' ? 'Facial Harmony' : '面部和諧',
                desc: locale === 'en' ? 'Encourages better balance between facial features.' : '促進面部特徵之間更好的對稱與平衡。'
              },
              {
                icon: Droplet,
                title: locale === 'en' ? 'Reduced Puffiness' : '減少浮腫',
                desc: locale === 'en' ? 'Helps minimize facial swelling and fluid retention.' : '有助於減少水分滯留與面部腫脹。'
              },
              {
                icon: Sun,
                title: locale === 'en' ? 'Refreshed Radiance' : '煥新光彩',
                desc: locale === 'en' ? 'Supports a healthier, more radiant complexion.' : '改善面部血液循環，重塑健康紅潤氣色。'
              },
              {
                icon: Smile,
                title: locale === 'en' ? 'Tension Relief' : '舒緩緊繃',
                desc: locale === 'en' ? 'Encourages relaxation of facial muscles and everyday tension.' : '促進面部肌肉深層放鬆，舒緩日常張力。'
              },
              {
                icon: Shield,
                title: locale === 'en' ? 'Youthful Glow' : '年輕光采',
                desc: locale === 'en' ? 'Supports healthier-looking skin and a naturally refreshed appearance.' : '提升肌膚活力，帶來由內而外的自然健康光澤。'
              }
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <div
                  key={i}
                  className="flex items-center md:items-start gap-4 p-4 sm:p-5 md:p-6 bg-[#f8f9fa] border border-gray-100 rounded-[2rem] hover:shadow-md transition-shadow duration-300 flex-col md:flex-row text-center md:text-left"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto md:mx-0 md:mt-1">
                    <Icon className="w-5.5 h-5.5" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="type-card-title text-foreground">{item.title}</h3>
                    <p className="type-body-sm text-charcoal/80">{item.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Award/Trust Badge */}
          <div className="max-w-3xl mx-auto p-6 sm:p-8 rounded-[2rem] bg-[#f8f9fa] border border-gray-100/80 flex flex-col sm:flex-row items-center text-center sm:text-left gap-6 sm:gap-8 hover:shadow-sm transition-shadow duration-300">
            <div className="flex-shrink-0 flex justify-center items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100/50">
              <Image
                src="/assets/cert/Outstanding Beauty Services_s.webp"
                alt={locale === 'en' ? 'Outstanding Beauty Services Finalist' : '卓越美容服務決賽入圍'}
                width={150}
                height={100}
                className="h-20 w-auto object-contain"
                sizes="150px"
              />
            </div>
            <div className="space-y-2 flex-1">
              <h4 className="type-card-title text-foreground font-semibold">
                {locale === 'en' ? 'Local Business Awards Finalist' : '地區商業大獎最終決賽入圍'}
              </h4>
              <p className="type-body-sm text-charcoal/80 leading-relaxed">
                {locale === 'en'
                  ? 'Proudly recognised as a Finalist in the 2026 Northern Districts Local Business Awards, recognising our dedication to helping clients achieve natural, balanced results through The Shugaosha Way.'
                  : '榮幸入圍 2026 年北區地區商業大獎（Northern Districts Local Business Awards）最終決賽，肯定了我們致力透過「修顏社小顏術（The Shugaosha Way）」幫助客戶重拾自然平衡、和諧與自信的努力。'
                }
              </p>
            </div>
          </div>

          {/* Book button */}
          <div className="flex justify-center">
            <a
              href="https://wa.me/61493552213"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center gap-3"
            >
              <WhatsAppIcon className="w-4 h-4" />
              {locale === 'en' ? 'Book a Session' : '立即預約'}
            </a>
          </div>
        </div>
      </section>

      {/* 5. Before & After (Case Studies) */}
      <HomeCaseStudies caseStudies={caseStudies} locale={locale} />

      {/* 6. Celebrity Endorsements */}
      <HomeCelebrities celebrities={celebrities} locale={locale} />

      {/* 7. Google Reviews */}
      <HomeGoogleReviews placeData={googleReviews} locale={locale} />

      {/* 8. Our Process */}
      <section className="bg-soft-bg border-y border-gray-100 py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center md:text-left max-w-2xl md:max-w-none mx-auto md:mx-0 space-y-4 mb-20">
            <span className="type-label text-primary">
              {locale === 'en' ? 'Our Process' : '療程步驟'}
            </span>
            <h2 className="type-heading text-foreground">
              {dict.home.howItWorks.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-8 left-24 right-24 h-[1px] bg-gray-200 -z-10" />
            {dict.home.howItWorks.steps.map((step, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 text-center space-y-5 border border-gray-100 shadow-sm relative pt-10">
                {/* Visual Step Number */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold shadow-md">
                  {i + 1}
                </div>
                <div className="w-16 h-16 relative mx-auto flex items-center justify-center">
                  <Image
                    src={`/assets/step${i + 1}.svg`}
                    alt={`Step ${i + 1}`}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="type-card-title text-foreground">
                  {step.title}
                </h3>
                <p className="type-body-sm text-charcoal/80">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. CTA */}
      <section className="w-full bg-primary/5 border-y border-primary/10 py-16 sm:py-20 !mt-0">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center md:text-left space-y-8">
          <h2 className="type-heading text-foreground max-w-xl mx-auto md:mx-0">
            {dict.home.cta.title}
          </h2>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
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
          <p className="type-caption text-charcoal/60">
            {locale === 'en'
              ? 'Appointments are highly personalized. WhatsApp or SMS messaging is our fastest booking channel.'
              : '專屬一對一客製化服務，敬請透過 WhatsApp 或簡訊進行即時預約與諮詢。'}
          </p>
        </div>
      </section>

      {/* 10. FAQ Section */}
      <FaqSection dict={dict} locale={locale} />

      {/* 11. Instagram Section */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-6 pb-12">
        {/* Elfsight Instagram Feed | Shugaosha Instagram Feed */}
        <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
        <div className="elfsight-app-053d3d7a-69da-4f5a-a15a-eb53ed990fb7 w-full max-w-full overflow-hidden" data-elfsight-app-lazy></div>
        <div className="mt-4">
          <a
            href="https://www.instagram.com/shugaosha"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
            {locale === 'en' ? 'Follow @shugaosha' : '追蹤 @shugaosha'}
          </a>
        </div>
      </section>

    </div>
  )
}
