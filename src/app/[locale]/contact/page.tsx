import Image from 'next/image'
import { getDictionary } from '@/utils/dictionary'
import { Mail, MapPin, Clock, Phone, Calendar } from 'lucide-react'
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
                <span className="text-xs text-white/60 uppercase tracking-wider font-light block !text-left">
                  {locale === 'en' ? 'Tap to message now — fastest response' : '點擊立即傳訊 — 最快回覆'}
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
                <h3 className="text-base font-medium text-foreground !text-left">
                  {locale === 'en' ? 'Email' : '電子郵件'}
                </h3>
                <p className="text-charcoal/70 text-sm font-light !text-left">shugaosha@gmail.com</p>
                <span className="text-xs text-charcoal/50 uppercase tracking-wider font-light block !text-left">
                  {locale === 'en' ? 'Send us an email' : '發送電子郵件'}
                </span>
              </div>
            </a>

            {/* Response time note */}
            <div className="bg-white border border-gray-100 rounded-xl p-5 flex gap-4 w-full">
              <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="space-y-1 text-left">
                <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">
                  {locale === 'en' ? 'Response Time' : '回覆時間'}
                </h4>
                <p className="text-sm font-light text-charcoal/80 leading-relaxed">
                  {locale === 'en'
                    ? 'We typically respond within a few hours. Feel free to send photos for an initial facial symmetry assessment.'
                    : '我們通常在數小時內回覆。歡迎附上照片以便初步進行面部對稱評估。'}
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
                    ? 'Street parking available nearby. Close to public transport.'
                    : '附近設有街邊停車，鄰近公共交通。'}
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
            {locale === 'en' ? 'Tour' : '巡迴行程'}
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
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                      <div>
                        <p className="type-label text-primary mb-1">
                          {locale === 'en' ? 'Destination' : '巡迴城市'}
                        </p>
                        <h3 className="text-xl font-medium text-foreground">
                          {cityLabel}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 pt-2">
                      <Calendar className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
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
              {locale === 'en'
                ? 'All sessions follow the Shugaosha Appointment Etiquette.'
                : '所有療程均遵循修顏社預約守則。'}
            </p>
          </div>
        </div>
      </section>

      {/* Appointment Etiquette */}
      <section className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 w-full space-y-16 pb-8">

        {/* Header */}
        <div className="text-center space-y-4 pb-8 border-b border-gray-100">
          <span className="type-label text-primary block">
            {locale === 'en' ? 'Appointment Policy' : '預約守則'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-light text-foreground tracking-tight">
            {locale === 'en' ? 'Our Appointment Etiquette' : '我們的預約守則'}
          </h2>
          <p className="type-body text-charcoal/70 max-w-2xl mx-auto">
            {locale === 'en'
              ? 'Thank you for choosing Shugaosha. Every appointment is thoughtfully reserved to provide a calm, personalised and uninterrupted experience. To help ensure the best experience for every client, we kindly ask that all appointments follow the etiquette below.'
              : '感謝您選擇修顏社。每個預約均經過精心安排，以提供平靜、個人化且不受打擾的體驗。為確保每位客人均能享有最佳體驗，敬請遵守以下預約守則。'}
          </p>
        </div>

        {/* Etiquette sections */}
        {[
          {
            title: locale === 'en' ? 'Appointment Confirmation' : '預約確認',
            items: locale === 'en'
              ? [
                'Appointment reminders are sent as a courtesy before your scheduled session.',
                'If you are unable to attend, we kindly ask that you let us know as soon as possible.',
                'Please note that not receiving or replying to a reminder does not cancel or change your appointment.',
              ]
              : [
                '預約提醒將在您的療程前作為提示發送。',
                '如無法出席，請盡快告知我們。',
                '請注意，未收到或未回覆提醒並不會取消或更改您的預約。',
              ],
          },
          {
            title: locale === 'en' ? 'Rescheduling' : '更改預約',
            items: locale === 'en'
              ? ['Appointments may be rescheduled once with at least 24 hours\' notice, subject to availability.']
              : ['預約可在至少提前 24 小時通知的情況下更改一次，視乎名額是否充足。'],
          },
          {
            title: locale === 'en' ? 'Feeling Unwell' : '身體不適',
            items: locale === 'en'
              ? [
                'If you are feeling unwell or experiencing symptoms of a cold, flu, COVID-19 or any other contagious illness, we kindly ask that you do not attend your appointment to help protect the wellbeing of other clients.',
                'If cancellation or rescheduling is required within 24 hours due to illness, our Short Notice Cancellations & Changes policy will still apply, as your appointment time has been reserved exclusively for you.',
                'Thank you for your understanding and kindness.',
              ]
              : [
                '如您感到不適，或出現感冒、流感、COVID-19 或其他傳染病症狀，請勿出席預約，以保障其他客人的健康。',
                '如因病需在 24 小時內取消或更改預約，我們的「短時間取消及更改」政策仍然適用，因為您的預約時段已專屬為您保留。',
                '感謝您的理解與體諒。',
              ],
          },
          {
            title: locale === 'en' ? 'Short Notice Cancellations & Changes' : '短時間取消及更改',
            items: locale === 'en'
              ? [
                'Appointments cancelled, changed or missed within 24 hours cannot be rescheduled and will be treated as a completed session.',
                'This applies to both individual appointments and package sessions.',
              ]
              : [
                '在 24 小時內取消、更改或缺席的預約將不予補期，並視作已完成療程。',
                '此政策適用於個別預約及套餐療程。',
              ],
          },
          {
            title: locale === 'en' ? 'Late Arrival' : '遲到',
            items: locale === 'en'
              ? [
                'Please arrive on time so you can enjoy your full treatment.',
                'Late arrival may result in a shortened treatment, or the appointment may not be able to proceed if there is insufficient time remaining.',
                'Your scheduled appointment will still be treated as a completed session.',
              ]
              : [
                '請準時到達，以享受完整的療程。',
                '遲到可能導致療程縮短，或在剩餘時間不足時無法進行預約。',
                '您的預約仍將視作已完成療程。',
              ],
          },
          {
            title: locale === 'en' ? 'Reserved Appointment Times' : '預留時段',
            items: locale === 'en'
              ? [
                'Each appointment is reserved exclusively for you.',
                'As appointment times are often fully booked, late cancellations or changes make it difficult to offer the reserved time to another client.',
                'Thank you for respecting the time reserved for your appointment and for helping us create a calm, seamless and enjoyable experience for every client.',
              ]
              : [
                '每個預約時段均專屬為您保留。',
                '由於預約時段通常已完全預訂，臨時取消或更改將令我們難以將該時段提供給其他客人。',
                '感謝您尊重您的預約時段，並協助我們為每位客人創造平靜、流暢且愉快的體驗。',
              ],
          },
        ].map((section, i) => (
          <div key={i} className="border-b border-gray-100 pb-10 space-y-4 last:border-0">
            <h3 className="text-base font-semibold text-foreground tracking-wide">
              {section.title}
            </h3>
            <ul className="space-y-2.5">
              {section.items.map((item, j) => (
                <li key={j} className="flex items-start gap-3 text-sm font-light text-charcoal/80 leading-relaxed">
                  <span className="mt-2 w-1 h-1 rounded-full bg-primary/60 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Footer note */}
        <div className="text-center space-y-3 pt-4">
          <p className="text-sm font-light text-charcoal/70">
            {locale === 'en' ? 'Thank you for choosing Shugaosha.' : '感謝您選擇修顏社。'}
          </p>
          <p className="text-base font-medium text-foreground tracking-wide">The Shugaosha Way</p>
          <p className="type-label text-primary">Balance • Harmony • Wellbeing</p>
          <p className="text-xs font-light text-charcoal/50 pt-2 max-w-md mx-auto">
            {locale === 'en'
              ? 'Booking an appointment with Shugaosha indicates acceptance of our Appointment Etiquette.'
              : '向修顏社預約即表示接受我們的預約守則。'}
          </p>
        </div>
      </section>

    </div>
  )
}
