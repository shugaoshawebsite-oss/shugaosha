import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { getDictionary } from '@/utils/dictionary'
import { getTeam } from '@/utils/dataService'
import { MessageCircle } from 'lucide-react'
import InteriorSlideshow from '@/components/InteriorSlideshow'
import CertGallery from '@/components/CertGallery'

interface PageProps {
  params: Promise<{ locale: string }>
}

const certGroups = [
  {
    titleEn: 'Best Business Verification',
    titleZh: '最佳商業認證',
    descEn: 'Verified and recognised as an outstanding business for excellence in professional beauty services and client satisfaction.',
    descZh: '在專業美容服務及客戶滿意度方面，榮獲傑出商業驗證認可。',
    thumbs: [
      { thumbSrc: '/assets/cert/ausbrb1_s.webp', fullSrc: '/assets/cert/ausbrb1.avif', labelEn: 'Best Business Verification 1', labelZh: '最佳商業認證 1' },
      { thumbSrc: '/assets/cert/ausbrb2_s.webp', fullSrc: '/assets/cert/ausbrb2.avif', labelEn: 'Best Business Verification 2', labelZh: '最佳商業認證 2' },
      { thumbSrc: '/assets/cert/ausbrb3_s.webp', fullSrc: '/assets/cert/ausbrb3.avif', labelEn: 'Best Business Verification 3', labelZh: '最佳商業認證 3' },
    ],
  },
  {
    titleEn: 'NORTHERN DISTRICTS LOCAL BUSINESS AWARDS — Outstanding Beauty Services',
    titleZh: 'NORTHERN DISTRICTS 本地商業獎 — 卓越美容服務',
    descEn: 'Shugaosha Gladesville was honoured with the Outstanding Beauty Services award at the Northern Districts Local Business Awards — recognising our commitment to authentic, results-driven Japanese facial realignment.',
    descZh: 'Shugaosha Gladesville 榮獲 Northern Districts 本地商業獎卓越美容服務獎項，表揚我們對正宗日式小顏矯正的專業承諾。',
    thumbs: [
      { thumbSrc: '/assets/cert/Outstanding Beauty Services_s.webp', fullSrc: '/assets/cert/Outstanding Beauty Services.png', labelEn: 'Outstanding Beauty Services Award', labelZh: '卓越美容服務獎' },
    ],
  },
]

const interiorImages = [
  '/assets/interior/940182_55b53c02637849feaff1448ebad3120b~mv2.avif',
  '/assets/interior/940182_5f0bc9ebe8a54fdf8f2951381c9f2bdd~mv2.avif',
  '/assets/interior/940182_71f01d03a59242ca8e968d0a054bc1fb~mv2.avif',
  '/assets/interior/940182_d9e2d24fe2b34a4ebf191989453ec3df~mv2.avif',
  '/assets/interior/940182_eff1867ad1e243d2a67823b9cc52d734~mv2.avif',
  '/assets/interior/940182_f29bc537d3b642a291e85e8badd000b7~mv2.avif',
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
        <div className="absolute inset-0 -z-10">
          <Image
            src="/assets/Artboard 1bg2.webp"
            alt="Hero Background"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>

        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-36 pb-24 text-left">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70 block mb-3">
            {dict.about.title}
          </span>
          <h1 className="text-3xl sm:text-5xl font-light text-white tracking-tight">
            {dict.about.subtitle}
          </h1>
          <p className="text-sm sm:text-base font-light text-white/80 max-w-xl leading-relaxed mt-4">
            {locale === 'en'
              ? 'Our mission is to help restore balance, alignment, and harmony through non-surgical Japanese techniques.'
              : '我們致力於透過溫和的日式小顏手法，協助您恢復平衡、對稱與身心和諧。'}
          </p>
        </div>
      </section>

      {/* Specialists Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-16">
        <div className="border-b border-gray-100 pb-6">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary block mb-3">
            {locale === 'en' ? 'Meet the Team' : '認識我們的團隊'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-light text-foreground tracking-tight">
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
                    <h3 className="text-xl font-medium text-foreground">
                      {member.name[locale] || member.name.en}
                    </h3>
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider block mt-1">
                      {member.role[locale] || member.role.en}
                    </span>
                  </div>
                  <p className="text-sm font-light text-charcoal/80 leading-relaxed">
                    {member.bio[locale] || member.bio.en}
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center pt-2">
                    {(locale === 'en'
                      ? ['Japan-Certified', 'Manual Technique', 'Non-Invasive']
                      : ['日本認證', '純手工技術', '無入侵性']
                    ).map((tag) => (
                      <span key={tag} className="text-[10px] font-medium text-charcoal bg-soft-bg border border-gray-100 rounded-full px-3 py-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Certificates & Awards Section */}
      <section className="bg-soft-bg border-y border-gray-100 py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-16">
          {/* CertGallery handles lightbox state internally */}
          <CertGallery groups={certGroups} locale={locale} />

          <div className="text-center md:text-left max-w-2xl md:max-w-none mx-auto md:mx-0 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              {locale === 'en' ? 'Credentials & Recognition' : '認證與榮譽'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-light text-foreground tracking-tight">
              {locale === 'en' ? 'Certificate & Award' : '證書與獎項'}
            </h2>
          </div>
        </div>
      </section>

      {/* Shop Interior Slideshow */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Description */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                {locale === 'en' ? 'Our Clinic' : '我們的診所'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-light text-foreground tracking-tight">
                {locale === 'en' ? 'The Gladesville Studio' : 'Gladesville 診所'}
              </h2>
            </div>
            <p className="text-base font-light text-charcoal/80 leading-relaxed">
              {locale === 'en'
                ? 'Our newly relocated clinic in Gladesville is a calm, light-filled space designed for comfort and focus. Every detail has been considered to provide you with an elevated, serene wellness experience.'
                : '我們位於 Gladesville 的全新診所，是一個寧靜、採光充足的空間，專為舒適與專注而設計。每一個細節都經過精心考量，為您提供高品質、舒緩的健康體驗。'}
            </p>
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
        <div className="elfsight-app-79831042-0a38-4901-8e6a-93cc7c0dadcf" data-elfsight-app-lazy></div>
        <Script src="https://elfsightcdn.com/platform.js" async />
      </section>

      {/* CTA */}
      <section className="w-full bg-primary/5 border-y border-primary/10 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-6 text-center md:text-left space-y-8">
          <h2 className="text-2xl sm:text-4xl font-light text-foreground tracking-tight max-w-xl mx-auto md:mx-0 leading-tight">
            {locale === 'en'
              ? 'Visit Us in Gladesville'
              : '歡迎來到 Gladesville 診所'}
          </h2>
          <p className="text-sm font-light text-charcoal/70 max-w-md mx-auto md:mx-0 leading-relaxed">
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
