import Link from 'next/link'
import { MapPin, Calendar } from 'lucide-react'
import WhatsAppIcon from './WhatsAppIcon'
import { TourSchedule } from '@/utils/dataService'

interface UpcomingVisitContentProps {
  locale: 'en' | 'zh'
  tour?: TourSchedule
}

export default function UpcomingVisitContent({ locale, tour }: UpcomingVisitContentProps) {
  // Destination
  const destination =
    (locale === 'zh' ? tour?.city?.zh : tour?.city?.en) ||
    tour?.city?.en ||
    tour?.city?.zh ||
    (locale === 'en' ? 'Hong Kong' : '香港')

  // Dates
  const dates =
    locale === 'zh'
      ? tour?.datesZh?.[0] ||
        (tour?.dates?.[0] === '26 September – 16 October 2026'
          ? '2026年9月26日至10月16日'
          : tour?.dates?.[0]) ||
        '2026年9月26日至10月16日'
      : tour?.dates?.[0] || '26 September – 16 October 2026'

  // Appointment information bullet points
  const bulletPoints =
    locale === 'en'
      ? [
          'By appointment only — all sessions must be arranged in advance.',
          'Limited availability — appointments are confirmed on a first-come, first-served basis.',
          'Bookings — please contact us directly via WhatsApp.',
          (
            <span key="policy">
              All appointments are subject to our{' '}
              <Link
                href={`/${locale}/appointment-policy`}
                className="underline hover:text-primary transition-colors font-medium"
              >
                Booking Policy
              </Link>
              .
            </span>
          ),
        ]
      : [
          '只接受預約 — 所有 Session 均需提前安排。',
          '名額有限 — 預約將以先到先得方式確認。',
          '預約方式 — 請直接透過 WhatsApp 與我們聯絡。',
          (
            <span key="policy">
              所有預約均受我們的
              <Link
                href={`/${locale}/appointment-policy`}
                className="underline hover:text-primary transition-colors font-medium"
              >
                「預約守則」
              </Link>
              約束。
            </span>
          ),
        ]

  return (
    <div className="space-y-10 w-full">
      {/* Header */}
      <div className="space-y-2 text-center sm:text-left">
        <h2
          className="type-label text-foreground !text-foreground block uppercase tracking-widest text-xs font-semibold font-[family-name:var(--font-montserrat)]"
          style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
        >
          {locale === 'en' ? 'UPCOMING VISIT' : '即將到訪'}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
        {/* Left: Destination, Dates & CTA */}
        <div className="space-y-8 text-center sm:text-left">
          <div className="space-y-6">
            {/* Destination */}
            <div className="flex items-start justify-center sm:justify-start gap-4">
              <div className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="text-center sm:text-left">
                <p className="type-label text-primary uppercase tracking-wider text-xs font-semibold mb-1">
                  {locale === 'en' ? 'DESTINATION' : '地點'}
                </p>
                <h3 className="text-2xl sm:text-3xl font-light text-foreground">
                  {destination}
                </h3>
              </div>
            </div>

            {/* Dates */}
            <div className="flex items-start justify-center sm:justify-start gap-4">
              <div className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                <Calendar className="w-5 h-5" />
              </div>
              <div className="text-center sm:text-left">
                <p className="type-label text-charcoal/50 uppercase tracking-wider text-xs font-semibold mb-1">
                  {locale === 'en' ? 'DATES' : '日期'}
                </p>
                <p className="text-base sm:text-lg font-medium text-foreground">
                  {dates}
                </p>
              </div>
            </div>
          </div>

          {/* Desktop WhatsApp Button */}
          <div className="pt-2 hidden sm:flex justify-start">
            <a
              href="https://wa.me/61493552213"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center gap-2.5 text-xs py-3.5 px-7 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>
                {locale === 'en' ? 'WHATSAPP FOR APPOINTMENTS' : 'WHATSAPP 預約'}
              </span>
            </a>
          </div>
        </div>

        {/* Right: Appointment Information */}
        <div className="bg-soft-bg border border-gray-100 rounded-2xl p-7 sm:p-8 space-y-5 text-left">
          <h3 className="text-xs font-semibold text-charcoal uppercase tracking-wider">
            {locale === 'en' ? 'APPOINTMENT INFORMATION' : '預約資訊'}
          </h3>

          <ul className="space-y-3.5 text-left">
            {bulletPoints.map((point, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-sm font-light text-charcoal/80 leading-relaxed"
              >
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                <span className="flex-1">{point}</span>
              </li>
            ))}
          </ul>

          {/* Mobile WhatsApp Button */}
          <div className="pt-3 sm:hidden flex justify-center">
            <a
              href="https://wa.me/61493552213"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center gap-2.5 text-xs py-3.5 px-7 shadow-sm hover:shadow-md transition-all duration-300 w-full justify-center"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>
                {locale === 'en' ? 'WHATSAPP FOR APPOINTMENTS' : 'WHATSAPP 預約'}
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
