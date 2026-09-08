import Link from 'next/link'
import Image from 'next/image'
import Script from 'next/script'
import { getDictionary } from '@/utils/dictionary'
import { getServices, getCelebrities, getCaseStudies, getGoogleReviews } from '@/utils/dataService'
import { ArrowRight, Sparkles, Scale, Droplet, Sun, Smile, Shield, Calendar, Heart } from 'lucide-react'
import WhatsAppIcon from '@/components/WhatsAppIcon'
import FaqSection from '@/components/FaqSection'
import HeroSection from '@/components/HeroSection'
import ServicesSection from '@/components/ServicesSection'
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
                {dict.home.whatWeDo.approach || (locale === 'en' ? 'OUR APPROACH' : '我們的理念')}
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
              <a
                href="#services"
                className="btn-secondary flex items-center gap-2"
              >
                {dict.home.whatWeDo.button || (locale === 'en' ? 'EXPLORE SERVICES' : '了解服務')}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Images */}
          <div className="relative order-2 lg:order-2 w-full space-y-6">
            <div className="relative aspect-[3/2] w-full rounded-2xl overflow-hidden bg-gray-50">
              <Image
                src="/assets/images/home1.webp"
                alt={locale === 'en' ? 'Shugaosha treatment' : '修顏社小顏矯正'}
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

      {/* 3. Explore Our Services (Foundation & Lift) */}
      <ServicesSection dict={dict} locale={locale} />

      {/* 4. Benefits of Shugaosha */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-16">
          {/* Header */}
          <div className="text-center md:text-left max-w-2xl md:max-w-none mx-auto md:mx-0 space-y-3">
            <span className="type-label text-primary">
              {locale === 'en' ? 'Why Shugaosha' : '為什麼選擇修顏社'}
            </span>
            <h2 className="type-heading text-foreground">
              {dict.home.whatWeDo.benefitsTitle || (locale === 'en' ? 'Benefits of Shugaosha' : '修顏社的主要好處')}
            </h2>
          </div>

          {/* 6 Benefit Cards in Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {[
              {
                icon: Sparkles,
                title: locale === 'en' ? 'Lifted & Youthful' : '提升・年輕感',
                desc: locale === 'en' ? 'A firmer, lifted and more youthful appearance.' : '呈現更緊緻、提升及年輕的面容。'
              },
              {
                icon: Scale,
                title: locale === 'en' ? 'Facial Balance' : '面部平衡',
                desc: locale === 'en' ? 'Better balance, alignment and harmony.' : '提升面部平衡、對稱及和諧感。'
              },
              {
                icon: Droplet,
                title: locale === 'en' ? 'Lymphatic Flow' : '淋巴循環',
                desc: locale === 'en' ? 'Supports fluid movement and reduces puffiness.' : '促進淋巴流動，幫助減少浮腫。'
              },
              {
                icon: Sun,
                title: locale === 'en' ? 'Defined Contours' : '立體輪廓',
                desc: locale === 'en' ? 'Clearer, sculpted and more defined contours.' : '令面部輪廓更清晰、立體及精緻。'
              },
              {
                icon: Heart,
                title: locale === 'en' ? 'Circulation & Radiance' : '循環・亮澤',
                desc: locale === 'en' ? 'Supports circulation for a fresher, brighter complexion.' : '促進循環，令面色更清新亮澤。'
              },
              {
                icon: Smile,
                title: locale === 'en' ? 'Tension Release' : '舒緩繃緊',
                desc: locale === 'en' ? 'Helps release built-up facial tension.' : '幫助舒緩面部累積的繃緊感。'
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
                  <div className="space-y-1.5 text-center md:text-left">
                    <h3 className="type-card-title text-foreground">{item.title}</h3>
                    <p className="type-body-sm text-charcoal/80">{item.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Award/Trust Badge */}
          <div className="max-w-3xl mx-auto p-6 sm:p-12 rounded-[2.5rem] bg-[#f8f9fa] border border-gray-100/80 flex flex-col items-center text-center gap-8 hover:shadow-md transition-all duration-300">
            <div className="relative flex justify-center items-center bg-white p-6 sm:p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100/60 w-full max-w-[340px] sm:max-w-[420px] md:max-w-[460px]">
              <Image
                src="/assets/cert/Outstanding Beauty Services.png"
                alt={locale === 'en' ? '2026 Northern Districts Local Business Awards Finalist' : '2026 Northern Districts Local Business Awards 入圍商戶'}
                width={282}
                height={400}
                className="w-full max-w-[280px] sm:max-w-[360px] md:max-w-[400px] h-auto object-contain drop-shadow-md"
                sizes="(max-width: 640px) 280px, (max-width: 768px) 360px, 400px"
                priority
              />
            </div>
            <div className="space-y-3 max-w-xl">
              <h3 className="type-card-title text-foreground font-semibold text-xl sm:text-2xl">
                {dict.about.awardItemTitle || (locale === 'en'
                  ? '2026 Northern Districts Local Business Awards Finalist'
                  : '2026 Northern Districts Local Business Awards 入圍商戶')}
              </h3>
              <p className="type-body text-charcoal/80 leading-relaxed max-w-lg mx-auto">
                {dict.about.awardItemDesc || (locale === 'en'
                  ? 'Proudly recognised as a Finalist in the Outstanding Beauty Services category.'
                  : '榮獲 Outstanding Beauty Services（傑出美容服務） 組別入圍資格。')}
              </p>
            </div>
          </div>

          {/* Book button */}
          <div className="flex justify-center">
            <a
              href="https://benotely.com/shugaosha/book"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center gap-3"
            >
              <Calendar className="w-4 h-4" />
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
              {locale === 'en' ? 'The Process' : '流程'}
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
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
            <a
              href="https://benotely.com/shugaosha/book"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center gap-3"
            >
              <Calendar className="w-5 h-5" />
              {locale === 'en' ? 'Book a Session' : '立即預約'}
            </a>
            <Link
              href={`/${locale}/contact`}
              className="btn-secondary flex items-center gap-3 bg-white"
            >
              {locale === 'en' ? 'Contact Us' : '聯絡我們'}
            </Link>
          </div>
          <p className="type-caption text-charcoal/60 mx-auto md:mx-0">
            {locale === 'en'
              ? 'Appointments can be booked online instantly. Feel free to contact us for personalized enquiries.'
              : '您可以透過線上預約系統即時預約時段，亦歡迎隨時聯絡我們進行個別諮詢。'}
          </p>
        </div>
      </section>

      {/* 10. FAQ Section */}
      <FaqSection dict={dict} locale={locale} />

      {/* 11. Instagram Section */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-6 pb-12">
        {/* Elfsight Instagram Feed | Shugaosha Instagram Feed */}
        <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
        <div className="elfsight-app-053d3d7a-69da-4f5a-a15a-eb53ed990fb7 w-full max-w-full" data-elfsight-app-lazy></div>
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
