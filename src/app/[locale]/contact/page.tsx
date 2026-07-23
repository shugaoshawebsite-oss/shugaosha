import Image from 'next/image'
import Link from 'next/link'
import { getDictionary } from '@/utils/dictionary'
import { Mail, MapPin, Clock, Phone, Calendar, Shield } from 'lucide-react'
import WhatsAppIcon from '@/components/WhatsAppIcon'
import { getTours } from '@/utils/dataService'

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function ContactPage({ params }: PageProps) {
  const { locale: rawLocale } = await params
  const locale = (rawLocale === 'zh' ? 'zh' : 'en') as 'en' | 'zh'
  const dict = getDictionary(locale)
  const tours = await getTours()
  const activeTours = tours.filter(t => t.isActive)

  return (
    <div className="flex flex-col space-y-24 pb-24">

      {/* Page Header */}
      <section className="relative min-h-[40vh] flex items-center overflow-hidden w-full">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/images/hero5.webp"
            alt="Hero Background"
            fill
            priority
            className="object-cover opacity-80"
          />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-36 pb-24 text-left">
          <span className="type-label text-charcoal/70 block mb-3">
            {dict.contact.title}
          </span>
          <h1 className="type-hero text-charcoal">
            {dict.contact.subtitle}
          </h1>
          <p className="type-body text-charcoal/80 max-w-xl mt-4">
            {dict.contact.desc}
          </p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left: Contact Methods */}
          <div className="space-y-6">
            <h2 className="text-xl font-medium text-foreground tracking-wide text-left">
              {locale === 'en' ? 'Book Your Appointment' : '預約您的療程'}
            </h2>

            {/* WhatsApp - primary */}
            <a
              href="https://wa.me/61493552213"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-5 p-6 bg-primary text-white rounded-2xl hover:bg-primary/95 transition-all duration-300 shadow-lg shadow-primary/20 group w-full"
            >
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <WhatsAppIcon className="w-7 h-7" />
              </div>
              <div className="space-y-1 !text-left">
                <h3 className="text-base font-medium !text-left">WhatsApp</h3>
                <p className="text-white/80 text-sm font-light !text-left">+61 493 552 213</p>
                <span className="text-xs text-white/90 font-light block !text-left">
                  {locale === 'en' ? 'Our preferred contact method' : '我們首選的聯絡方式'}
                </span>
                <span className="text-[10px] text-white/60 uppercase tracking-wider font-light block mt-0.5 !text-left">
                  {locale === 'en' ? 'Fastest response' : '最快回覆'}
                </span>
              </div>
            </a>

            {/* SMS - secondary */}
            <a
              href="sms:+61493552213"
              className="flex items-center gap-5 p-6 bg-soft-bg border border-gray-100 rounded-2xl hover:border-primary/30 hover:shadow-sm transition-all duration-300 group w-full"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <Phone className="w-6 h-6" />
              </div>
              <div className="space-y-1 !text-left">
                <h3 className="text-base font-medium text-foreground !text-left">SMS</h3>
                <p className="text-charcoal/70 text-sm font-light !text-left">+61 493 552 213</p>
                <span className="text-xs text-charcoal/50 uppercase tracking-wider font-light block !text-left">
                  {locale === 'en' ? 'Send a text message' : '發送短訊'}
                </span>
              </div>
            </a>

            {/* Email */}
            <a
              href="mailto:shugaosha@gmail.com"
              className="flex items-center gap-5 p-6 bg-soft-bg border border-gray-100 rounded-2xl hover:border-primary/30 hover:shadow-sm transition-all duration-300 group w-full"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <Mail className="w-6 h-6" />
              </div>
              <div className="space-y-1 !text-left">
                <h3 className="text-base font-medium text-foreground !text-left">Email</h3>
                <p className="text-charcoal/70 text-sm font-light !text-left">shugaosha@gmail.com</p>
                <span className="text-xs text-charcoal/50 uppercase tracking-wider font-light block !text-left">
                  {locale === 'en' ? 'Send us an email' : '發送電子郵件'}
                </span>
              </div>
            </a>

            {/* Response time note */}
            <div className="bg-white border border-gray-100 rounded-xl p-5 flex flex-col items-center text-center gap-3 w-full md:flex-row md:items-start md:text-left md:gap-4">
              <Clock className="w-5 h-5 text-primary flex-shrink-0 md:mt-0.5" />
              <div className="space-y-1 text-center md:text-left">
                <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">
                  {locale === 'en' ? 'Response Time' : '回覆時間'}
                </h4>
                <p className="text-sm font-light text-charcoal/80 leading-relaxed">
                  {locale === 'en'
                    ? 'We typically respond within a few hours. You’re welcome to send photos if you’d like an initial facial balance assessment before booking.'
                    : '我們通常在數小時內回覆。如果您想在預約前進行初步的面部平衡評估，歡迎發送照片給我們。'}
                </p>
              </div>
            </div>

            {/* Booking Terms defensive box */}
            <div className="bg-white border border-gray-100 rounded-xl p-5 flex flex-col items-center text-center gap-3 w-full md:flex-row md:items-start md:text-left md:gap-4">
              <Shield className="w-5 h-5 text-primary flex-shrink-0 md:mt-0.5" />
              <div className="space-y-1 text-center md:text-left">
                <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">
                  {locale === 'en' ? 'Booking Terms' : '預約條款'}
                </h4>
                <p className="text-sm font-light text-charcoal/80 leading-relaxed">
                  {locale === 'en' ? (
                    <>
                      All bookings assume agreement to our{' '}
                      <Link href={`/${locale}/appointment-policy`} className="text-primary hover:underline font-medium">
                        Booking Policy
                      </Link>
                      . Please read it carefully before scheduling.
                    </>
                  ) : (
                    <>
                      所有預約皆視同您同意我們的{' '}
                      <Link href={`/${locale}/appointment-policy`} className="text-primary hover:underline font-medium">
                        預約須知與條款
                      </Link>
                      。預約前請務必詳閱。
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>



          {/* Right: Shop details + Map */}
          <div className="space-y-8">
            <h2 className="text-xl font-medium text-foreground tracking-wide flex items-center justify-center lg:justify-start gap-3">
              <MapPin className="w-5 h-5 text-primary" />
              {dict.contact.locationsTitle}
            </h2>

            <div className="space-y-4">
              <div className="bg-soft-bg border border-gray-100 rounded-xl p-6 space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  {locale === 'en' ? 'Gladesville Clinic (Primary)' : '主要診所 — Gladesville'}
                </p>
                <div className="space-y-1 text-sm font-light text-charcoal/85">
                  <p className="font-medium text-foreground">5 Pittwater Road</p>
                  <p>Gladesville NSW 2111</p>
                  <p>Australia</p>
                </div>
                <p className="text-xs font-light text-charcoal/65 pt-2">
                  {locale === 'en'
                    ? 'Convenient council parking is available directly opposite the clinic. Close to public transport.'
                    : '診所正對面設有便利的市政停車場（council parking）。鄰近大眾運輸。'}
                </p>
              </div>
            </div>

            {/* Google Maps embed */}
            <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3316.3847063073474!2d151.12664931521614!3d-33.832869380679!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12a1e1f10b9a3b%3A0x5017d681632a650!2s5%20Pittwater%20Rd%2C%20Gladesville%20NSW%202111%2C%20Australia!5e0!3m2!1sen!2sau!4v1690000000000!5m2!1sen!2sau"
                width="100%"
                height="320"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={locale === 'en' ? 'Shugaosha Gladesville Location' : '修顏社 Gladesville 位置'}
              />
            </div>

            <div className="flex justify-center md:justify-start">
              <a
                href="https://maps.google.com/?q=5+Pittwater+Road,+Gladesville+NSW+2111"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center gap-2"
              >
                <MapPin className="w-4 h-4" />
                {locale === 'en' ? 'Open in Google Maps' : '在 Google 地圖中打開'}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* International Visits Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full border-t border-gray-100 pt-16">
        <div className="border-b border-gray-100 pb-6 mb-12">
          <span className="type-label text-primary block mb-3">
            {locale === 'en' ? 'Confirmed Upcoming Visit' : '已確認即將行程'}
          </span>
          <h2 className="type-heading text-foreground">
            {locale === 'en' ? 'Hong Kong Visit' : '香港行程'}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Tours List */}
          <div className="space-y-12 w-full">
            {activeTours.map((tour) => {
              const cityLabel = tour.city[locale] || tour.city.en
              const whatsappMsg = encodeURIComponent(
                locale === 'en'
                  ? `Hi, I'd like to book a session for the upcoming visit to ${cityLabel} (${tour.dates.join(', ')})`
                  : `您好，我想預約即將前往 ${cityLabel} 的巡迴療程 (${tour.dates.join(', ')})`
              )
              return (
                <div key={tour._id} className="space-y-6 pb-8 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="space-y-4">
                    <div className="flex flex-col items-center justify-center text-center gap-2 md:flex-row md:items-center md:justify-start md:text-left md:gap-3">
                      <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                      <div className="text-center md:text-left">
                        <p className="type-label text-primary mb-1">
                          {locale === 'en' ? 'Destination' : '巡迴城市'}
                        </p>
                        <h3 className="text-xl font-medium text-foreground">
                          {cityLabel}
                        </h3>
                      </div>
                    </div>

                    <div className="flex flex-col items-center justify-center text-center gap-2 md:flex-row md:items-start md:justify-start md:text-left md:gap-3 pt-2">
                      <Calendar className="w-5 h-5 text-primary flex-shrink-0 md:mt-0.5" />
                      <div className="text-center md:text-left">
                        <p className="type-label text-charcoal/50 mb-1">
                          {locale === 'en' ? 'Dates' : '日期'}
                        </p>
                        <div className="space-y-1">
                          {tour.dates.map((date, i) => (
                            <p key={i} className="text-base font-medium text-foreground">
                              {date}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>


                  <div className="space-y-4 pt-2 border-t border-gray-100">
                    <p className="type-body text-charcoal/80 leading-relaxed">
                      {locale === 'en'
                        ? `I'll be returning to ${cityLabel} for a limited time during these dates.`
                        : `我將於以上日期短暫前往 ${cityLabel}。`}
                    </p>
                    <p className="type-body text-charcoal/80 leading-relaxed">
                      {locale === 'en'
                        ? 'Appointments are limited and will be confirmed on a first-confirmed basis.'
                        : '名額有限，以先確認者為優先。'}
                    </p>
                    <p className="type-body text-charcoal/80 leading-relaxed">
                      {locale === 'en'
                        ? `If you'd like to book a session during my visit, please contact me via WhatsApp.`
                        : `如有意於巡迴行程期間預約，請透過 WhatsApp 聯絡我。`}
                    </p>
                  </div>

                  <div className="flex justify-start">
                    <a
                      href={`https://wa.me/61493552213?text=${whatsappMsg}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 bg-primary text-white px-7 py-3.5 rounded-full text-sm font-medium tracking-wide hover:bg-primary/90 transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-primary/10"
                    >
                      <WhatsAppIcon className="w-4 h-4" />
                      {locale === 'en' ? `Book ${cityLabel} Appointment` : `預約 ${cityLabel} 療程`}
                    </a>
                  </div>
                </div>
              )
            })}
            {activeTours.length === 0 && (
              <p className="text-sm font-light text-charcoal/50 italic">
                {locale === 'en' ? 'No upcoming tour visits confirmed at the moment.' : '目前暫無已確認的巡迴行程。'}
              </p>
            )}
          </div>

          {/* Right: Notice card */}
          <div className="bg-primary/5 border border-primary/10 rounded-2xl p-8 space-y-5 lg:sticky lg:top-24">
            <div className="flex justify-center lg:justify-start">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <h4 className="text-base font-medium text-foreground text-center lg:text-left">
              {locale === 'en' ? 'Important Booking Note' : '預約須知'}
            </h4>
            <div className="flex justify-center lg:justify-start">
              <ul className="space-y-3 inline-block text-left">
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
            </div>
            <p className="text-xs font-light text-charcoal/60 pt-2 border-t border-primary/10">
              {locale === 'en' ? (
                <>
                  All sessions follow the{' '}
                  <Link href={`/${locale}/appointment-policy`} className="underline hover:text-primary transition-colors">
                    Booking Policy
                  </Link>
                  .
                </>
              ) : (
                <>
                  所有療程均遵循{' '}
                  <Link href={`/${locale}/appointment-policy`} className="underline hover:text-primary transition-colors">
                    預約政策
                  </Link>
                  。
                </>
              )}
            </p>
          </div>
        </div>
      </section>

    </div>
  )
}
