import Link from 'next/link'
import Image from 'next/image'
import Script from 'next/script'
import { getDictionary } from '@/utils/dictionary'
import { getServices, getCelebrities, getCaseStudies, getGoogleReviews } from '@/utils/dataService'
import { ArrowRight, Sparkles, Scale, Droplet, Sun, Smile, Shield, Calendar } from 'lucide-react'
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
                {dict.home.whatWeDo.button || (locale === 'en' ? 'EXPLORE OUR SERVICES' : '了解我們的服務')}
                <ArrowRight className="w-4 h-4" />
              </a>
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
                title: locale === 'en' ? 'Lifted & Refined' : '提升・細緻',
                desc: locale === 'en' ? 'Supports a firmer, more lifted and refined appearance.' : '幫助面部呈現更緊緻、提升及細緻的外觀。'
              },
              {
                icon: Scale,
                title: locale === 'en' ? 'Facial Balance & Alignment' : '面部平衡・對齊',
                desc: locale === 'en' ? 'Supports better balance, alignment and harmony across the face.' : '支援面部整體平衡、對齊與和諧感。'
              },
              {
                icon: Droplet,
                title: locale === 'en' ? 'Reduced Puffiness' : '減少浮腫感',
                desc: locale === 'en' ? 'Helps support a fresher, less puffy facial appearance.' : '幫助面部看起來更清爽，減少浮腫感。'
              },
              {
                icon: Sun,
                title: locale === 'en' ? 'Defined Contours' : '輪廓更立體清晰',
                desc: locale === 'en' ? 'Helps create clearer, more sculpted and three-dimensional facial contours.' : '幫助輪廓看起來更清晰、立體及細緻。'
              },
              {
                icon: Smile,
                title: locale === 'en' ? 'Tension Release' : '釋放繃緊',
                desc: locale === 'en' ? 'Helps release built-up tension through the face and connected areas.' : '幫助釋放面部及相關連部位累積的繃緊。'
              },
              {
                icon: Shield,
                title: locale === 'en' ? 'Overall Alignment' : '整體對齊',
                desc: locale === 'en' ? 'Supports balance and alignment through the upper body, neck, head and face.' : '支援上半身、頸部、頭部及面部的整體平衡與對齊。'
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
                {dict.about.awardItemTitle || (locale === 'en' ? '2026 Northern Districts Local Business Awards — Outstanding Beauty Services Finalist' : '2026 年 Northern Districts 當地商業大獎 — 卓越美容服務決賽入圍')}
              </h4>
              <p className="type-body-sm text-charcoal/80 leading-relaxed">
                {dict.about.awardItemDesc || (locale === 'en'
                  ? 'Proudly recognised as a Finalist in the 2026 Northern Districts Local Business Awards — Outstanding Beauty Services category, reflecting our commitment to precision, professionalism and exceptional client care.'
                  : '榮幸入圍 2026 年 Northern Districts 當地商業大獎 — 卓越美容服務（Outstanding Beauty Services）類別最終決賽，肯定了我們對精準手法、專業精神與卓越客戶護理的堅持。'
                )}
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
          <p className="type-caption text-charcoal/60">
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
