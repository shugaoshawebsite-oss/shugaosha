import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { getDictionary } from '@/utils/dictionary'
import { getTeam } from '@/utils/dataService'
import WhatsAppIcon from '@/components/WhatsAppIcon'
import InteriorSlideshow from '@/components/InteriorSlideshow'
import CertGallery from '@/components/CertGallery'
import { Globe } from 'lucide-react'

interface PageProps {
  params: Promise<{ locale: string }>
}

const certGroups = [
  {
    titleEn: 'Northern Districts Local Business Awards – Outstanding Beauty Services Finalist',
    titleZh: 'Northern Districts 本地商業大獎 — 卓越美容服務決賽入圍',
    descEn: 'Being named a Finalist in the 2026 Northern Districts Local Business Awards – Outstanding Beauty Services is a significant recognition of our commitment to excellence, professionalism and exceptional client care.',
    descZh: '入圍 2026 年 Northern Districts 本地商業大獎（Outstanding Beauty Services）決賽，是對我們追求卓越、專業精神和卓越客戶護理的重大肯定。',
    thumbs: [
      { thumbSrc: '/assets/cert/Outstanding Beauty Services_s.webp', fullSrc: '/assets/cert/Outstanding Beauty Services.png', labelEn: 'Outstanding Beauty Services Finalist', labelZh: '卓越美容服務決賽入圍' },
    ],
  },
]

const interiorImages = [
  '/images/studio-9.jpeg',
  '/images/studio-1.jpeg',
  '/images/studio-2.jpeg',
  '/images/studio-3.jpeg',
  '/images/studio-4.jpeg',
  '/images/studio-5.jpeg',
  '/images/studio-6.jpeg',
  '/images/studio-7.jpeg',
  '/images/studio-8.jpeg',
]

export default async function AboutPage({ params }: PageProps) {
  const { locale: rawLocale } = await params
  const locale = (rawLocale === 'zh' ? 'zh' : 'en') as 'en' | 'zh'
  const dict = getDictionary(locale)
  const team = await getTeam()

  return (
    <div className="flex flex-col space-y-24 md:space-y-36 pb-24">

      {/* Page Header */}
      <section className="relative min-h-[40vh] flex items-center overflow-hidden w-full">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/images/hero2.webp"
            alt="Hero Background"
            fill
            priority
            className="object-cover opacity-80"
          />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-36 pb-24 text-left">
          <span className="type-label text-charcoal/70 block mb-3">
            {dict.about.title}
          </span>
          <h1 className="type-hero text-charcoal">
            {dict.about.subtitle}
          </h1>
          <p className="type-body text-charcoal/80 max-w-xl mt-4">
            {locale === 'en'
              ? 'Helping you achieve a naturally lifted, firmer and more balanced appearance through gentle Japanese hands-on techniques.'
              : '我們致力於透過溫和的日式徒手手法，幫助您獲得自然提升、緊緻且更加對稱平衡的面容。'}
          </p>
        </div>
      </section>

      {/* Specialists Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-16">
        <div className="border-b border-gray-100 pb-6">
          <span className="type-label text-primary block mb-3">
            {locale === 'en' ? 'Meet the Team' : '認識我們的團隊'}
          </span>
          <h2 className="type-heading text-foreground">
            {dict.about.foundersTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {team.map((member) => {
            const specialistImages: Record<string, string> = {
              't1': '/assets/specialist/specialist_teresa_soo.avif',
              't2': '/assets/specialist/specialist_Charles_Cho.avif',
            }
            const specialistImg = specialistImages[member._id] || member.imageRelativeUrl

            return (
              <div
                key={member._id}
                className="bg-white border border-gray-100/60 rounded-2xl p-8 flex flex-col items-center text-center space-y-6 hover:shadow-md transition-shadow duration-300"
              >
                {/* Profile Image cropped in a circle shape */}
                <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden bg-gray-50 shadow-md border-2 border-primary/10">
                  {specialistImg ? (
                    <Image
                      src={specialistImg}
                      alt={member.name[locale] || member.name.en}
                      fill
                      sizes="(max-width: 768px) 192px, 256px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-primary text-4xl md:text-5xl font-light">
                      {(member.name[locale] || member.name.en).charAt(0)}
                    </div>
                  )}
                </div>

                {/* Bio Details */}
                <div className="space-y-4 flex-grow flex flex-col items-center">
                  <div>
                    <h3 className="type-card-title text-foreground">
                      {member.name[locale] || member.name.en}
                    </h3>
                    <span className="type-label text-primary block mt-1">
                      {member.role[locale] || member.role.en}
                    </span>
                  </div>
                  <p className="type-body-sm text-charcoal/80">
                    {member.bio[locale] || member.bio.en}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Certificates & Awards Section */}
      <section className="bg-soft-bg border-y border-gray-100 py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-16">
          <div className="text-center md:text-left max-w-2xl md:max-w-none mx-auto md:mx-0 space-y-4">
            <span className="type-label text-primary">
              {locale === 'en' ? 'Credentials & Recognition' : '認證與榮譽'}
            </span>
            <h2 className="type-heading text-foreground">
              {locale === 'en' ? 'Certificate & Award' : '證書與獎項'}
            </h2>
          </div>

          {/* CertGallery handles lightbox state internally */}
          <CertGallery groups={certGroups} locale={locale} />
        </div>
      </section>

      {/* Our Journey Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <span className="type-label text-primary">
                {locale === 'en' ? 'Global Reach' : '環球足跡'}
              </span>
              <h2 className="type-heading text-foreground">
                {locale === 'en' ? 'Our Journey' : '我們的旅程'}
              </h2>
            </div>
            <p className="type-body text-charcoal/80 leading-relaxed">
              {locale === 'en'
                ? 'We are proud to have brought our tours to audiences across multiple international cities over the years. Our experience reflects our passion for sharing culture and creating memorable experiences.'
                : '多年來，我們非常榮幸能夠將巡迴服務帶到多個國際城市的客戶面前。我們的豐富經驗體現了我們對分享文化與創造難忘體驗的熱情。'}
            </p>
            <p className="type-body-sm text-charcoal/70 border-l-2 border-primary/30 pl-4 py-1">
              {locale === 'en'
                ? 'We look forward to bringing our tours to even more destinations in the future.'
                : '我們期待在未來將我們的巡迴服務帶到更多目的地。'}
            </p>
          </div>

          {/* Right Column - Cities Visited Grid */}
          <div className="lg:col-span-7 bg-[#f8f9fa] border border-gray-100 rounded-[2rem] p-8 sm:p-10 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="type-card-title text-foreground">
                {locale === 'en' ? "Cities We've Visited" : '我們曾造訪的城市'}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-6">
              {[
                { en: 'San Francisco', zh: '舊金山', flag: '🇺🇸' },
                { en: 'Los Angeles', zh: '洛杉磯', flag: '🇺🇸' },
                { en: 'Las Vegas', zh: '拉斯維加斯', flag: '🇺🇸' },
                { en: 'Vancouver', zh: '溫哥華', flag: '🇨🇦' },
                { en: 'Tokyo', zh: '東京', flag: '🇯🇵' },
                { en: 'Ho Chi Minh City', zh: '胡志明市', flag: '🇻🇳' },
              ].map((city, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5"
                >
                  <span className="text-base">{city.flag}</span>
                  <div>
                    <div className="font-medium text-foreground text-sm">{locale === 'en' ? city.en : city.zh}</div>
                    {locale === 'zh' && <div className="text-xs text-charcoal/50">{city.en}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Shop Interior Slideshow */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Description */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-3">
              <span className="type-label text-primary">
                {locale === 'en' ? 'Our Clinic' : '我們的診所'}
              </span>
              <h2 className="type-subheading text-foreground">
                {locale === 'en' ? 'The Shugaosha Studio' : 'The Shugaosha Studio 工作室'}
              </h2>
            </div>
            <div className="type-body text-charcoal/80 space-y-4">
              {locale === 'en' ? (
                <>
                  <p>Located in Gladesville, The Shugaosha Studio is a private, light-filled space designed for comfort, relaxation and personalised care.</p>
                  <p>Many clients tell us they feel deeply relaxed during and after their treatment. In this peaceful, unhurried environment, you can fully unwind while experiencing The Shugaosha Way and restoring your natural facial balance.</p>
                </>
              ) : (
                <>
                  <p>位於 Gladesville 的 Shugaosha 護理工作室，是一個私密、採光充足的空間，專為舒適、放鬆和個性化護理而設計。</p>
                  <p>許多客戶反映，在療程期間和之後都感到深度放鬆。在這個寧靜、不疾不徐的環境中，您可以徹底放鬆身心，同時體驗「修顏社小顏術」並恢復面部的自然平衡。</p>
                </>
              )}
            </div>
            <div className="space-y-2 text-sm font-light text-charcoal/70">
              <p className="font-medium text-foreground">5 Pittwater Road</p>
              <p>Gladesville NSW 2111</p>
              <p>Australia</p>
            </div>
          </div>

          {/* Slideshow */}
          <div className="lg:col-span-8">
            <InteriorSlideshow images={interiorImages} locale={locale} />
          </div>
        </div>
      </section>

      {/* Instagram Plugin */}
      <section className="max-w-7xl mx-auto w-full px-0">
        {/* Elfsight Instagram Feed | Shugaosha Instagram Feed */}
        <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
        <div className="elfsight-app-053d3d7a-69da-4f5a-a15a-eb53ed990fb7" data-elfsight-app-lazy></div>
      </section>

      {/* CTA */}
      <section className="w-full bg-primary/5 border-y border-primary/10 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-6 text-center md:text-left space-y-8">
          <h2 className="type-heading text-foreground max-w-xl mx-auto md:mx-0">
            {locale === 'en'
              ? 'Experience The Shugaosha Way'
              : '體驗 The Shugaosha Way'}
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
