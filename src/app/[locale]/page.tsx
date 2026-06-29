import Link from 'next/link'
import Image from 'next/image'
import Script from 'next/script'
import { getDictionary } from '@/utils/dictionary'
import { getServices, getCelebrities, getCaseStudies, getReviews } from '@/utils/dataService'
import { Check, ArrowRight, MessageCircle, Star, Quote, Sparkles, Scale, Droplet, Sun, Heart, Leaf } from 'lucide-react'
import FaqSection from '@/components/FaqSection'
import HeroSection from '@/components/HeroSection'

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
  const reviews = await getReviews()

  const certImages = [
    { src: '/assets/cert/Outstanding Beauty Services_s.webp', alt: locale === 'en' ? 'Outstanding Beauty Services Award' : '卓越美容服務獎' },
    { src: '/assets/cert/ausbrb1_s.webp', alt: locale === 'en' ? 'Best Business Verification 1' : '最佳商業認證 1' },
    { src: '/assets/cert/ausbrb2_s.webp', alt: locale === 'en' ? 'Best Business Verification 2' : '最佳商業認證 2' },
    { src: '/assets/cert/ausbrb3_s.webp', alt: locale === 'en' ? 'Best Business Verification 3' : '最佳商業認證 3' },

  ]

  const featuredCelebrity = celebrities[0]
  const featuredCase = caseStudies[0]

  return (
    <div className="flex flex-col space-y-24 md:space-y-36 pb-24">

      {/* 1. Hero Section — GSAP animated, bottom-left layout */}
      <HeroSection locale={locale} dict={dict} />

      {/* 2. What is Shugaosha + image */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div className="space-y-8 order-2 lg:order-1">
            <div className="space-y-3">
              <span className="type-label text-primary">
                {locale === 'en' ? 'The Methodology' : '核心技術'}
              </span>
              <h2 className="type-heading text-foreground">
                {dict.home.whatWeDo.title}
              </h2>
            </div>
            <div className="space-y-4 type-body text-charcoal/80">
              <p>{dict.home.whatWeDo.description1}</p>
              <p>{dict.home.whatWeDo.description2}</p>
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

          {/* Image */}
          <div className="relative order-1 lg:order-2 w-full">
            <div className="relative aspect-4-5 w-full rounded-2xl overflow-hidden bg-gray-50">
              <Image
                src="/assets/Artboard 3photo3.webp"
                alt={locale === 'en' ? 'Shugaosha treatment' : '修顏社療程'}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
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
              {locale === 'en' ? 'Why Shugaosha' : '小顏矯正的好處'}
            </span>
            <h2 className="type-heading text-foreground">
              {locale === 'en' ? 'Benefits of The Shugaosha Way' : '修顏社療法的益處'}
            </h2>
          </div>

          {/* 6 Benefit Cards in Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Sparkles,
                title: locale === 'en' ? 'Lifted & Refined' : '提升與緊緻',
                desc: locale === 'en' ? 'Promotes a firmer, contoured facial appearance.' : '促進面部輪廓更加緊緻立體。'
              },
              {
                icon: Scale,
                title: locale === 'en' ? 'Facial Harmony' : '面部和諧',
                desc: locale === 'en' ? 'Encourages symmetrical balancing of facial features.' : '促進面部特徵的對稱平衡。'
              },
              {
                icon: Droplet,
                title: locale === 'en' ? 'Reduced Puffiness' : '減少浮腫',
                desc: locale === 'en' ? 'Helps minimize fluid retention and facial swelling.' : '有助於減少水分滯留與面部腫脹。'
              },
              {
                icon: Sun,
                title: locale === 'en' ? 'Refreshed Radiance' : '重塑光彩',
                desc: locale === 'en' ? 'Supports a vibrant and youthfully revitalized look.' : '展現充滿活力與年輕光澤的容顏。'
              },
              {
                icon: Heart,
                title: locale === 'en' ? 'Tension Relief' : '舒緩緊繃',
                desc: locale === 'en' ? 'Encourages deep relaxation of hypertonic facial muscles.' : '促進面部過度緊張肌肉的深層放鬆。'
              },
              {
                icon: Leaf,
                title: locale === 'en' ? 'Holistic Wellbeing' : '整體健康',
                desc: locale === 'en' ? 'Supports overall health and a lighter feeling.' : '支持整體健康，帶來更輕鬆愉悅的感受。'
              }
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <div
                  key={i}
                  className="flex gap-4 p-6 bg-[#f8f9fa] border border-gray-100 rounded-[2rem] hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-1">
                    <Icon className="w-5.5 h-5.5" />
                  </div>
                  <div className="space-y-1.5 text-left">
                    <h3 className="type-card-title text-foreground">{item.title}</h3>
                    <p className="type-body-sm text-charcoal/80">{item.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Book button */}
          <div className="flex justify-center">
            <a
              href="https://wa.me/61493552213"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center gap-3"
            >
              <MessageCircle className="w-4 h-4" />
              {locale === 'en' ? 'Book a Session' : '立即預約'}
            </a>
          </div>
        </div>
      </section>

      {/* 4. Certificates & Awards — Light grey background, compact y spacing */}
      <section className="w-full bg-[#f8f9fa] border-y border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-8">
          <div className="text-center">
            <span className="type-label text-primary">
              {locale === 'en' ? 'Certificate & Award' : '證書與獎項'}
            </span>
          </div>

          {/* Horizontal strip — no box, no shadow, max-height 100px */}
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-12">
            {certImages.map((cert, i) => (
              <div key={i} className="flex-shrink-0">
                <Image
                  src={cert.src}
                  alt={cert.alt}
                  width={150}
                  height={100}
                  className="object-contain h-[100px] w-auto"
                  sizes="150px"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
          <div className="md:col-span-5 space-y-6 w-full flex flex-col items-center md:items-start text-center md:text-left">
            <span className="type-label text-primary">
              {locale === 'en' ? 'Visual Evidence' : '療效對比'}
            </span>
            <h2 className="type-heading text-foreground">
              {locale === 'en' ? 'Real Results' : '真實療效'}
            </h2>
            <p className="type-body text-charcoal/80">
              {locale === 'en'
                ? 'These are real client progressions. Natural, consistent, and honest results from dedicated sessions.'
                : '以下均為真實客戶的療程進展對照，展示持續堅持後帶來的自然、誠實的效果。'}
            </p>
            {featuredCase && (
              <div className="space-y-2">
                <p className="type-body-sm font-medium text-foreground">{featuredCase.title[locale] || featuredCase.title.en}</p>
                <p className="type-body-sm text-charcoal/75">
                  {featuredCase.description ? (featuredCase.description[locale] || featuredCase.description.en) : ''}
                </p>
              </div>
            )}
            <Link
              href={`/${locale}/success-stories#before-after`}
              className="btn-secondary flex items-center gap-2 mx-auto md:mx-0"
            >
              {locale === 'en' ? 'More Success Stories' : '更多療效見證'}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {featuredCase && (
            <div className="md:col-span-7 w-full">
              <div className="grid grid-cols-2 gap-1.5 rounded-2xl overflow-hidden shadow-lg w-full">
                <div className="relative aspect-3-4 w-full">
                  <Image
                    src="/assets/bna/before1.jpg"
                    alt={locale === 'en' ? 'Original' : '原狀'}
                    fill
                    sizes="(max-width: 768px) 50vw, 35vw"
                    className="object-cover"
                  />
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[10px] font-semibold text-charcoal uppercase px-2.5 py-1 rounded">
                    {locale === 'en' ? 'Original' : '原狀'}
                  </span>
                </div>
                <div className="relative aspect-3-4 w-full">
                  <Image
                    src="/assets/bna/after1.jpg"
                    alt={locale === 'en' ? '3rd Session' : '第 3 次療程'}
                    fill
                    sizes="(max-width: 768px) 50vw, 35vw"
                    className="object-cover"
                  />
                  <span className="absolute top-3 left-3 bg-primary text-white text-[10px] font-semibold uppercase px-2.5 py-1 rounded shadow-sm">
                    {locale === 'en' ? '3rd Session' : '第 3 次療程'}
                  </span>
                </div>
              </div>
              <p className="type-caption text-charcoal/50 text-center mt-4">
                {locale === 'en' ? '3 sessions · Natural, hands-on results' : '3 次療程 · 自然純手工效果'}
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="bg-soft-bg border-y border-gray-100 py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">

            {/* Celebrity portrait */}
            {featuredCelebrity && (
              <div className="md:col-span-6 w-full">
                <div className="relative aspect-3-2 md:aspect-3-4 w-full rounded-2xl overflow-hidden bg-gray-100 shadow-xl">
                  {featuredCelebrity.imageRelativeUrl ? (
                    <Image
                      src={featuredCelebrity.imageRelativeUrl}
                      alt={featuredCelebrity.name[locale] || featuredCelebrity.name.en}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-primary text-6xl font-light">
                      {(featuredCelebrity.name[locale] || featuredCelebrity.name.en).charAt(0)}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Celebrity content */}
            {featuredCelebrity && (
              <div className="md:col-span-6 space-y-8 w-full text-center md:text-left flex flex-col items-center md:items-start">
                <div className="space-y-3">
                  <span className="type-label text-primary">
                    {locale === 'en' ? 'Celebrity Endorsements' : '名人明星推薦'}
                  </span>
                  <h2 className="type-heading text-foreground">
                    {locale === 'en'
                      ? "Trusted by Hong Kong Celebrities"
                      : '深受香港著名明星信賴'}
                  </h2>
                </div>

                <div className="space-y-4">
                  <Quote className="w-10 h-10 text-primary/15 mx-auto md:mx-0" />
                  <p className="type-body text-charcoal/85 italic text-center md:text-left">
                    {featuredCelebrity.quote[locale] || featuredCelebrity.quote.en}
                  </p>
                </div>

                <div className="flex flex-col items-center md:flex-row md:items-center gap-4 border-t border-gray-100 pt-6 w-full">
                  <div className="text-center md:text-left">
                    <p className="type-body font-medium text-foreground text-center md:text-left">
                      {featuredCelebrity.name[locale] || featuredCelebrity.name.en}
                    </p>
                    <p className="type-caption text-charcoal/65 text-center md:text-left">
                      {featuredCelebrity.role[locale] || featuredCelebrity.role.en}
                    </p>
                  </div>
                </div>

                <Link
                  href={`/${locale}/success-stories#celebrities`}
                  className="btn-secondary flex items-center gap-2 mx-auto md:mx-0"
                >
                  {locale === 'en' ? 'More Celebrity Stories' : '更多明星見證'}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 7. Google Reviews + flags */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center md:text-left max-w-2xl md:max-w-none mx-auto md:mx-0 space-y-4 mb-14">
          <span className="type-label text-primary">
            {locale === 'en' ? 'Client Voices' : '客戶心聲'}
          </span>
          <div className="flex justify-center md:justify-start items-center py-2">
            <Image
              src="/assets/Google_Review_light.svg"
              alt="Google Reviews"
              width={360}
              height={200}
              className="h-20 w-auto object-contain"
            />
          </div>
          {/* Flag row */}
          <div className="flex justify-center md:justify-start items-center gap-5 pt-0 flex-wrap">
            {['🇭🇰', '🇦🇺', '🇺🇸', '🇨🇦'].map((flag, idx) => (
              <span key={idx} className="text-3xl">{flag}</span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review._id} className="bg-white border border-gray-100 rounded-2xl p-8 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="space-y-4">
                <div className="flex gap-1 text-primary justify-center md:justify-start">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="type-body-sm text-charcoal/80 italic">
                  &ldquo;{review.reviewText[locale] || review.reviewText.en}&rdquo;
                </p>
              </div>
              <div className="border-t border-gray-50 pt-4 flex flex-col sm:flex-row items-center gap-4 text-center md:text-left justify-center md:justify-start">
                <span className="text-3xl flex-shrink-0">{countryFlags[review.location] || '⭐'}</span>
                <div>
                  <span className="type-body-sm font-medium text-foreground block text-center md:text-left">{review.clientName}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

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
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
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
      <section className="max-w-7xl mx-auto w-full px-0">
        <div className="elfsight-app-79831042-0a38-4901-8e6a-93cc7c0dadcf" data-elfsight-app-lazy></div>
        <Script src="https://elfsightcdn.com/platform.js" async />
      </section>

    </div>
  )
}
