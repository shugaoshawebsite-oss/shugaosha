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
    <div className="flex flex-col space-y-20 sm:space-y-28 pb-24 pt-0">

      {/* ── Page Header ── */}
      <section className="relative min-h-[40vh] sm:min-h-[45vh] flex items-center overflow-hidden w-full pt-20 sm:pt-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/images/hero5.webp"
            alt="Contact Hero Background"
            fill
            priority
            className="object-cover opacity-80"
          />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-24 sm:pt-28 pb-16 sm:pb-20 text-center sm:text-left">
          <span className="type-label text-charcoal/70 block mb-3 uppercase tracking-widest text-xs font-semibold">
            {dict.contact.title}
          </span>
          <h1 className="type-hero text-charcoal">
            {dict.contact.subtitle}
          </h1>
          <p className="type-body text-charcoal/80 max-w-2xl mt-4 leading-relaxed mx-auto sm:mx-0">
            {dict.contact.desc}
          </p>
        </div>
      </section>

      {/* ── Main Contact Section ── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full scroll-mt-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Left: Contact Methods */}
          <div className="space-y-6">
            <h2 className="text-xl font-medium text-foreground tracking-wide text-center sm:text-left">
              {locale === 'en' ? 'Book Your Appointment' : '預約您的 Session'}
            </h2>

            {/* Online Booking - Preferred Method */}
            <a
              href="https://benotely.com/shugaosha/book"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-5 p-6 bg-primary text-white rounded-2xl hover:bg-primary/95 transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.01] group w-full relative overflow-hidden text-left"
            >
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                <Calendar className="w-7 h-7" />
              </div>
              <div className="space-y-1 !text-left flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base font-medium !text-left">
                    {locale === 'en' ? 'Book a Session' : '網上預約'}
                  </h3>
                  <span className="text-[10px] font-medium uppercase tracking-wider bg-white/20 text-white px-2.5 py-0.5 rounded-full">
                    {locale === 'en' ? 'Preferred Method' : '建議方式'}
                  </span>
                </div>
                <p className="text-white/90 text-sm font-light !text-left">
                  {locale === 'en' ? 'Instant Online Booking' : '即時網上預約'}
                </p>
                <span className="text-xs text-white/80 font-light block !text-left">
                  {locale === 'en' ? 'Receive instant confirmation for your session.' : '預約完成後將即時收到確認。'}
                </span>
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/61493552213"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-5 p-6 bg-soft-bg border border-gray-100 rounded-2xl hover:border-primary/30 hover:shadow-sm transition-all duration-300 group w-full text-left"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <WhatsAppIcon className="w-7 h-7" />
              </div>
              <div className="space-y-1 !text-left">
                <h3 className="text-base font-medium text-foreground !text-left">WhatsApp</h3>
                <p className="text-charcoal/80 text-sm font-light !text-left">+61 493 552 213</p>
                <span className="text-xs text-charcoal/50 uppercase tracking-wider font-light block !text-left">
                  {locale === 'en' ? 'Enquiries & Bookings' : '查詢及預約'}
                </span>
              </div>
            </a>

            {/* SMS */}
            <a
              href="sms:+61493552213"
              className="flex items-center gap-5 p-6 bg-soft-bg border border-gray-100 rounded-2xl hover:border-primary/30 hover:shadow-sm transition-all duration-300 group w-full text-left"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <Phone className="w-6 h-6" />
              </div>
              <div className="space-y-1 !text-left">
                <h3 className="text-base font-medium text-foreground !text-left">SMS</h3>
                <p className="text-charcoal/80 text-sm font-light !text-left">+61 493 552 213</p>
                <span className="text-xs text-charcoal/50 uppercase tracking-wider font-light block !text-left">
                  {locale === 'en' ? 'Send a Text Message' : '發送短訊'}
                </span>
              </div>
            </a>

            {/* Email */}
            <a
              href="mailto:shugaosha@gmail.com"
              className="flex items-center gap-5 p-6 bg-soft-bg border border-gray-100 rounded-2xl hover:border-primary/30 hover:shadow-sm transition-all duration-300 group w-full text-left"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <Mail className="w-6 h-6" />
              </div>
              <div className="space-y-1 !text-left">
                <h3 className="text-base font-medium text-foreground !text-left">Email</h3>
                <p className="text-charcoal/80 text-sm font-light !text-left">shugaosha@gmail.com</p>
                <span className="text-xs text-charcoal/50 uppercase tracking-wider font-light block !text-left">
                  {locale === 'en' ? 'Send Us an Email' : '發送電郵'}
                </span>
              </div>
            </a>

            {/* Response time note */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col items-center text-center gap-3 w-full md:flex-row md:items-start md:text-left md:gap-4">
              <Clock className="w-5 h-5 text-primary flex-shrink-0 md:mt-0.5" />
              <div className="space-y-1 text-center md:text-left">
                <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">
                  {locale === 'en' ? 'RESPONSE TIME' : '回覆時間'}
                </h4>
                <p className="text-sm font-light text-charcoal/80 leading-relaxed">
                  {locale === 'en'
                    ? 'We typically respond within a few hours during business hours.'
                    : '我們通常會在辦公時間內數小時內回覆。'}
                </p>
              </div>
            </div>

            {/* Booking Terms card */}
            <div className="bg-white border border-primary/20 rounded-2xl p-6 shadow-sm flex flex-col items-center text-center gap-4 w-full md:flex-row md:items-start md:text-left md:gap-5">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6" />
              </div>
              <div className="space-y-3 text-center md:text-left flex-1">
                <div>
                  <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                    {locale === 'en' ? 'BOOKING TERMS' : '預約條款'}
                  </h4>
                  <p className="text-sm font-light text-charcoal/80 leading-relaxed mt-1">
                    {locale === 'en'
                      ? 'By making a booking, you acknowledge and agree to our Appointment Policy. Please read it carefully before scheduling.'
                      : '進行預約即表示您已閱讀並同意我們的預約政策。請在預約前仔細閱讀。'}
                  </p>
                </div>
                <div>
                  <Link
                    href={`/${locale}/appointment-policy`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white hover:bg-primary/90 rounded-xl text-xs font-medium tracking-wide transition-all duration-300 shadow-sm hover:shadow group/btn"
                  >
                    <Shield className="w-3.5 h-3.5" />
                    <span>{locale === 'en' ? 'READ OUR APPOINTMENT POLICY' : '閱讀預約政策'}</span>
                    <span className="transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Shop details + Map */}
          <div className="space-y-8 text-center sm:text-left">
            <h2 className="text-xl font-medium text-foreground tracking-wide flex items-center justify-center sm:justify-start gap-3">
              <MapPin className="w-5 h-5 text-primary" />
              {locale === 'en' ? 'OUR LOCATION' : '我們的地點'}
            </h2>

            <div className="space-y-4">
              <div className="bg-soft-bg border border-gray-100 rounded-2xl p-6 sm:p-7 space-y-3 text-center sm:text-left no-underline [text-decoration:none!important]">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary no-underline [text-decoration:none!important] [border-bottom:none!important]">
                  GLADESVILLE{'\u200C'} STUDIO
                </p>
                <div className="space-y-1 text-sm font-light text-charcoal/85 no-underline [text-decoration:none!important]">
                  <p className="font-medium text-foreground no-underline [text-decoration:none!important] [border-bottom:none!important]">
                    5{'\u200C'} Pittwater Road
                  </p>
                  <p className="no-underline [text-decoration:none!important] [border-bottom:none!important]">
                    Gladesville{'\u200C'} NSW 2111
                  </p>
                  <p className="no-underline [text-decoration:none!important] [border-bottom:none!important]">
                    Aust{'\u200C'}ralia
                  </p>
                </div>
                <p className="text-xs font-light text-charcoal/65 pt-2 leading-relaxed">
                  {locale === 'en'
                    ? 'Convenient council parking is available directly opposite the studio. Close to public transport.'
                    : 'Studio 正對面設有便利的市政府停車場，附近亦有公共交通工具。'}
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

            <div className="flex justify-center sm:justify-start">
              <a
                href="https://maps.google.com/?q=5+Pittwater+Road,+Gladesville+NSW+2111"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center gap-2"
              >
                <MapPin className="w-4 h-4" />
                <span>{locale === 'en' ? 'Open in Google Maps' : '在 Google 地圖中打開'}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── International Visits Section (Hong Kong) ── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full border-t border-gray-100 pt-16 scroll-mt-28 space-y-10">
        <div className="space-y-3 text-center sm:text-left">
          <span className="type-label text-primary block uppercase tracking-widest text-xs font-semibold">
            {locale === 'en' ? 'HONG KONG VISIT' : '香港期間限定'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-light text-foreground tracking-tight">
            {locale === 'en' ? 'Shugaosha in Hong Kong' : 'Shugaosha 香港'}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left: Tour Details */}
          <div className="space-y-8 w-full text-center sm:text-left">
            <div className="space-y-4">
              <div className="flex items-center justify-center sm:justify-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <p className="type-label text-primary uppercase tracking-wider text-xs font-semibold mb-1">
                    {locale === 'en' ? 'DESTINATION' : '期間限定地點'}
                  </p>
                  <h3 className="text-2xl font-light text-foreground">
                    {locale === 'en' ? 'Hong Kong' : '香港'}
                  </h3>
                </div>
              </div>

              <div className="flex items-center justify-center sm:justify-start gap-3 pt-2">
                <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <p className="type-label text-charcoal/50 uppercase tracking-wider text-xs font-semibold mb-1">
                    {locale === 'en' ? 'DATES' : '日期'}
                  </p>
                  <p className="text-base font-medium text-foreground">
                    {locale === 'en' ? '26 September – 16 October 2026' : '2026年9月26日至10月16日'}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-gray-100">
              <p className="type-body text-charcoal/80 leading-relaxed">
                {locale === 'en'
                  ? 'Shugaosha will be returning to Hong Kong for a limited time during these dates.'
                  : 'Shugaosha 將於以上日期期間限定回到香港。'}
              </p>
              <p className="type-body text-charcoal/80 leading-relaxed">
                {locale === 'en'
                  ? 'Appointments are limited and will be confirmed on a first-come, first-served basis.'
                  : '預約名額有限，並會按照先到先得的方式確認。'}
              </p>
              <p className="type-body text-charcoal/80 leading-relaxed">
                {locale === 'en'
                  ? 'To book a Hong Kong appointment, please contact us via WhatsApp.'
                  : '如欲預約香港 Session，請透過 WhatsApp 與我們聯絡。'}
              </p>
            </div>

            <div className="pt-2 flex justify-center sm:justify-start">
              <a
                href={encodeURI(
                  locale === 'en'
                    ? 'https://wa.me/61493552213?text=Hi, I would like to book an appointment for the Hong Kong Tour.'
                    : 'https://wa.me/61493552213?text=您好，我想預約香港期間限定服務。'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center gap-2 text-xs py-3 px-6 shadow-sm hover:shadow transition-all duration-300 w-full sm:w-auto justify-center"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>
                  {locale === 'en'
                    ? 'BOOK HONG KONG APPOINTMENT VIA WHATSAPP'
                    : '透過 WHATSAPP 預約香港 SESSION'}
                </span>
              </a>
            </div>
          </div>

          {/* Right: Important Booking Note */}
          <div className="bg-primary/5 border border-primary/10 rounded-2xl p-8 space-y-5 text-left">
            <div className="flex justify-center sm:justify-start">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <h4 className="text-base font-semibold text-foreground uppercase tracking-wide text-center sm:text-left">
              {locale === 'en' ? 'IMPORTANT BOOKING NOTE' : '重要預約須知'}
            </h4>
            <ul className="space-y-3 text-left">
              {[
                locale === 'en'
                  ? 'Appointments are available by prior arrangement only.'
                  : '所有預約均需提前安排。',
                locale === 'en'
                  ? 'Appointments are limited — early booking is recommended.'
                  : '預約名額有限，建議提早查詢及預約。',
                locale === 'en'
                  ? 'Booking and confirmation procedures may vary depending on location.'
                  : '預約及確認方式會因地點而有所不同。',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm font-light text-charcoal/80 text-left">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  <span className="text-left flex-1">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs font-light text-charcoal/60 pt-2 border-t border-primary/10 text-center sm:text-left">
              {locale === 'en' ? (
                <>
                  All sessions are subject to our{' '}
                  <Link href={`/${locale}/appointment-policy`} className="underline hover:text-primary transition-colors font-medium">
                    Appointment Policy
                  </Link>
                  .
                </>
              ) : (
                <>
                  所有服務均受我們的{' '}
                  <Link href={`/${locale}/appointment-policy`} className="underline hover:text-primary transition-colors font-medium">
                    預約政策
                  </Link>
                  {' '}約束。
                </>
              )}
            </p>
          </div>

        </div>
      </section>

    </div>
  )
}
