import Image from 'next/image'
import Link from 'next/link'
import aboutBg from '@/images/evie-s-Sw7f58YJbc0-unsplash copy.webp'
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
    titleEn: 'Northern Districts Local Business Awards — Outstanding Beauty Services Finalist',
    titleZh: 'Northern Districts 本地商業獎 — 卓越美容服務決賽入圍',
    descEn: 'Being selected as a Finalist in the 2026 Northern Districts Local Business Awards reflects our ongoing commitment to providing authentic Japanese facial realignment with professionalism, integrity and personalised care.\n\nThis recognition celebrates our dedication to continuous learning, exceptional client experiences and helping every client achieve natural, balanced results through The Shugaosha Way.',
    descZh: '入圍 2026 年 Northern Districts 本地商業獎決賽，反映了我們一直致力於以專業、誠信和個性化的護理提供正宗的日式小顏矯正。\n\n這一認可肯定了我們對持續學習、卓越客戶體驗的專注，以及幫助每位客戶透過 The Shugaosha Way 實現自然平衡效果的努力。',
    thumbs: [
      { thumbSrc: '/assets/cert/Outstanding Beauty Services_s.webp', fullSrc: '/assets/cert/Outstanding Beauty Services.png', labelEn: 'Outstanding Beauty Services Finalist', labelZh: '卓越美容服務決賽入圍' },
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
      <section className="relative min-h-[40vh] flex items-center overflow-hidden w-full bg-white">
        <div className="absolute inset-0 -z-10">
          <Image
            src={aboutBg}
            alt="Hero Background"
            fill
            priority
            className="object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-white/55" />
        </div>

        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-36 pb-24 text-left">
          <span className="type-label text-charcoal/70 block mb-3">
            {dict.about.title}
          </span>
          <h1 className="type-hero text-charcoal">
            {dict.about.subtitle}
          </h1>
          <p className="type-body text-charcoal/80 max-w-xl mt-4">
            {locale === 'en'
              ? 'Our mission is to help restore balance, alignment, and harmony through non-surgical Japanese techniques.'
              : '我們致力於透過溫和的日式小顏手法，協助您恢復平衡、對稱與身心和諧。'}
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
                  <p>Located in Gladesville, The Shugaosha Studio is a private, light-filled space created for comfort, relaxation and personalised care.</p>
                  <p>Every visit is designed to provide a peaceful, unhurried experience, allowing you to unwind while enjoying authentic Japanese facial realignment through The Shugaosha Way.</p>
                </>
              ) : (
                <>
                  <p>位於 Gladesville 的 Shugaosha 護理工作室，是一個私密、採光充足的空間，專為舒適、放鬆和個性化護理而設計。</p>
                  <p>每一次的到訪都旨在提供寧靜、從容的體驗，讓您在透過 The Shugaosha Way 享受正宗日式小顏矯正的同時，徹底放鬆身心。</p>
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
        <div className="elfsight-app-79831042-0a38-4901-8e6a-93cc7c0dadcf" data-elfsight-app-lazy></div>
        <Script src="https://elfsightcdn.com/platform.js" async />
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
