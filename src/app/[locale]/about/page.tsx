import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { getDictionary } from '@/utils/dictionary'
import { getTeam } from '@/utils/dataService'
import WhatsAppIcon from '@/components/WhatsAppIcon'
import InteriorSlideshow from '@/components/InteriorSlideshow'
import CertGallery from '@/components/CertGallery'
import { Globe, Calendar } from 'lucide-react'

interface PageProps {
  params: Promise<{ locale: string }>
}

const certGroups = [
  {
    titleEn: '2026 Northern Districts Local Business Awards Finalist',
    titleZh: '2026 Northern Districts Local Business Awards 入圍商戶',
    descEn: 'Proudly recognised as a Finalist in the Outstanding Beauty Services category.',
    descZh: '榮獲 Outstanding Beauty Services（傑出美容服務） 組別入圍資格。',
    thumbs: [
      {
        thumbSrc: '/assets/cert/Outstanding Beauty Services.webp',
        fullSrc: '/assets/cert/Outstanding Beauty Services.png',
        labelEn: '2026 Northern Districts Local Business Awards Finalist',
        labelZh: '2026 Northern Districts Local Business Awards 入圍商戶'
      },
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
            {dict.about.description}
          </p>
        </div>
      </section>

      {/* Specialists Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-16">
        <div className="border-b border-gray-100 pb-6">
          <span className="type-label text-primary block mb-3">
            {dict.about.teamTag}
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
                  <p className="type-body-sm text-charcoal/80 whitespace-pre-line text-left leading-relaxed">
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
              {dict.about.awardsTag}
            </span>
            <h2 className="type-heading text-foreground">
              {dict.about.awardsTitle}
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
                {dict.about.journeyTag}
              </span>
              <h2 className="type-heading text-foreground">
                {dict.about.journeyTitle}
              </h2>
            </div>
            <div className="type-body text-charcoal/80 leading-relaxed space-y-4">
              <p>{dict.about.journeyP1}</p>
              <p>{dict.about.journeyP2}</p>
              <p>{dict.about.journeyP3}</p>
            </div>
          </div>

          {/* Right Column - Cities Visited Grid */}
          <div className="lg:col-span-7 bg-[#f8f9fa] border border-gray-100 rounded-[2rem] p-8 sm:p-10 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="type-card-title text-foreground">
                {dict.about.citiesServedTitle}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-6">
              {[
                { en: 'Hong Kong', zh: '香港', flag: '🇭🇰' },
                { en: 'Sydney', zh: '悉尼', flag: '🇦🇺' },
                { en: 'Melbourne', zh: '墨爾本', flag: '🇦🇺' },
                { en: 'Brisbane', zh: '布里斯本', flag: '🇦🇺' },
                { en: 'San Francisco', zh: '三藩市', flag: '🇺🇸' },
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
                {dict.about.studioTag}
              </span>
              <h2 className="type-subheading text-foreground">
                {dict.about.studioTitle}
              </h2>
            </div>
            <div className="type-body text-charcoal/80 space-y-4">
              <p>{dict.about.studioP1}</p>
              <p>{dict.about.studioP2}</p>
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
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center md:text-left space-y-8">
          <h2 className="type-heading text-foreground max-w-xl mx-auto md:mx-0">
            {dict.about.cta.title}
          </h2>
          <p className="type-body-sm text-charcoal/70 max-w-md mx-auto md:mx-0">
            {dict.about.cta.desc}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
            <a
              href="https://benotely.com/shugaosha/book"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center gap-3"
            >
              <Calendar className="w-5 h-5" />
              {dict.about.cta.bookButton}
            </a>
            <Link
              href={`/${locale}/contact`}
              className="btn-secondary flex items-center gap-3 bg-white"
            >
              {dict.about.cta.contactButton}
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
