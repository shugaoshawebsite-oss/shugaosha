import Image from 'next/image'
import Script from 'next/script'
import newsBg from '@/images/bg1.webp'
import { getDictionary } from '@/utils/dictionary'
import { MessageCircle, Calendar, MapPin } from 'lucide-react'

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function NewsToursPage({ params }: PageProps) {
  const { locale: rawLocale } = await params
  const locale = (rawLocale === 'zh' ? 'zh' : 'en') as 'en' | 'zh'
  const dict = getDictionary(locale)

  return (
    <div className="flex flex-col space-y-24 md:space-y-36 pb-24">

      {/* Page Header */}
      <section className="relative min-h-[40vh] flex items-center overflow-hidden w-full">
        <div className="absolute inset-0 z-0">
          <Image
            src={newsBg}
            alt="Hero Background"
            fill
            priority
            className="object-cover opacity-80"
          />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-36 pb-24 text-left">
          <span className="type-label text-charcoal/70 block mb-3">
            {dict.newsTours.title}
          </span>
          <h1 className="type-hero text-charcoal">
            {locale === 'en' ? 'International Visits' : '國際巡迴服務'}
          </h1>
          <p className="type-body text-charcoal/80 max-w-xl mt-4">
            {dict.newsTours.tourIntro}
          </p>
        </div>
      </section>

      {/* Confirmed Visits */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="border-b border-gray-100 pb-6 mb-12">
          <span className="type-label text-primary block mb-3">
            {locale === 'en' ? 'Confirmed Upcoming Visit' : '已確認即將行程'}
          </span>
          <h2 className="type-heading text-foreground">
            {locale === 'en' ? 'Hong Kong' : '香港'}
          </h2>
        </div>

        {/* Hong Kong Card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left: Details */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🇭🇰</span>
                <div>
                  <p className="type-label text-primary mb-1">
                    {locale === 'en' ? 'Destination' : '巡迴城市'}
                  </p>
                  <h3 className="text-xl font-medium text-foreground">
                    {locale === 'en' ? 'Hong Kong (Causeway Bay)' : '香港 (銅鑼灣)'}
                  </h3>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2">
                <Calendar className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="type-label text-charcoal/50 mb-1">
                    {locale === 'en' ? 'Dates' : '日期'}
                  </p>
                  <p className="text-base font-medium text-foreground">
                    27 September – 18 October 2026
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-2 border-t border-gray-100">
              <p className="type-body text-charcoal/80 leading-relaxed">
                {locale === 'en'
                  ? "I'll be returning to Hong Kong for a limited time during these dates."
                  : '我將於以上日期短暫返港。'}
              </p>
              <p className="type-body text-charcoal/80 leading-relaxed">
                {locale === 'en'
                  ? 'Appointments are limited and will be confirmed on a first-confirmed basis.'
                  : '名額有限，以先確認者為優先。'}
              </p>
              <p className="type-body text-charcoal/80 leading-relaxed">
                {locale === 'en'
                  ? "If you'd like to book a session during my Hong Kong visit, please contact me via WhatsApp."
                  : '如有意於香港行程期間預約，請透過 WhatsApp 聯絡我。'}
              </p>
            </div>

            <a
              href="https://wa.me/61493552213?text=Hi%2C%20I%27d%20like%20to%20book%20a%20Hong%20Kong%20appointment%20(27%20Sep%20%E2%80%93%2018%20Oct%202026)"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-primary text-white px-7 py-3.5 rounded-full text-sm font-medium tracking-wide hover:bg-primary/90 transition-all duration-300 hover:scale-[1.02]"
            >
              <MessageCircle className="w-4 h-4" />
              {locale === 'en' ? 'Book Hong Kong Appointment' : '預約香港療程'}
            </a>
          </div>

          {/* Right: Notice card */}
          <div className="bg-primary/5 border border-primary/10 rounded-2xl p-8 space-y-5">
            <MapPin className="w-6 h-6 text-primary" />
            <h4 className="text-base font-medium text-foreground">
              {locale === 'en' ? 'Important Booking Note' : '預約須知'}
            </h4>
            <ul className="space-y-3">
              {[
                locale === 'en'
                  ? 'Appointments are available by prior arrangement only.'
                  : '療程須事先安排，不接受即場預約。',
                locale === 'en'
                  ? 'Appointments are limited — early enquiry is recommended.'
                  : '名額有限，建議盡早查詢。',
                locale === 'en'
                  ? 'Sessions will be confirmed upon receipt of deposit.'
                  : '收到訂金後正式確認預約。',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm font-light text-charcoal/80">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-xs font-light text-charcoal/60 pt-2 border-t border-primary/10">
              {locale === 'en'
                ? 'All sessions follow the Shugaosha Appointment Etiquette.'
                : '所有療程均遵循修顏社預約守則。'}
            </p>
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="max-w-7xl mx-auto w-full px-0">
        <div className="elfsight-app-79831042-0a38-4901-8e6a-93cc7c0dadcf" data-elfsight-app-lazy></div>
        <Script src="https://elfsightcdn.com/platform.js" async />
      </section>

    </div>
  )
}
