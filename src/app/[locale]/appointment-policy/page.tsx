import Image from 'next/image'
import { getDictionary } from '@/utils/dictionary'

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function AppointmentPolicyPage({ params }: PageProps) {
  const { locale: rawLocale } = await params
  const locale = (rawLocale === 'zh' ? 'zh' : 'en') as 'en' | 'zh'
  const dict = getDictionary(locale)

  const sections: { title: string; items: string[]; note?: string }[] = [
    {
      title: locale === 'en' ? 'Important Booking Note' : '重要預約須知',
      items: locale === 'en'
        ? [
          'Appointments are available by prior arrangement only.',
          'Appointments are limited — early booking is recommended.',
          'Booking and confirmation procedures may vary depending on location.',
        ]
        : [
          '所有預約均需提前安排。',
          '預約名額有限，建議提早查詢及預約。',
          '預約及確認方式會因地點而有所不同。',
        ],
      note: locale === 'en'
        ? 'All sessions are subject to our Appointment Policy.'
        : '所有服務均受我們的預約政策約束。',
    },
    {
      title: locale === 'en' ? 'Appointment Confirmation' : '預約確認',
      items: locale === 'en'
        ? [
          'Appointment reminders are sent as a courtesy before your scheduled session.',
          'If you are unable to attend, we kindly ask that you let us know as soon as possible.',
          'Please note that not receiving or replying to a reminder does not cancel or change your appointment.',
        ]
        : [
          '預約提醒將在您的預約前作為提示發送。',
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
          '在 24 小時內取消、更改或缺席的預約將不予補期，並視作已完成該次預約。',
          '此政策適用於單次預約及套票預約。',
        ],
    },
    {
      title: locale === 'en' ? 'Late Arrival' : '遲到安排',
      items: locale === 'en'
        ? [
          'Please allow a little extra travel time for traffic and parking, and check our Gladesville address before your appointment.',
          'If you arrive late, your session may need to be shortened depending on the time remaining.',
          'If there is insufficient time to proceed, the appointment will be treated as a completed session.',
        ]
        : [
          '請預留充足交通及泊車時間，並於出發前確認 Gladesville 地址。',
          '如遲到，療程時間可能因應剩餘時間而縮短。',
          '如剩餘時間不足以進行服務，該次預約將視作已完成。',
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
  ]

  return (
    <div className="flex flex-col space-y-24 pb-24">
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
            {locale === 'en' ? 'Policy' : '預約政策'}
          </span>
          <h1 className="type-hero text-charcoal">
            {locale === 'en' ? 'Appointment Policy' : '預約政策'}
          </h1>
          <p className="type-body text-charcoal/80 max-w-xl mt-4">
            {locale === 'en'
              ? 'Important guidelines to ensure a seamless, calm and professional experience for every client.'
              : '重要的預約守則，旨在確保每位客人都能享有流暢、寧靜且專業的服務體驗。'}
          </p>
        </div>
      </section>

      {/* Appointment Etiquette Content */}
      <section className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 w-full space-y-12">
        <div className="space-y-4 pb-8 border-b border-gray-100">
          <p className="type-body text-charcoal/70 max-w-2xl leading-relaxed">
            {locale === 'en'
              ? 'Thank you for choosing Shugaosha. Every appointment is thoughtfully reserved to provide a calm, personalised and uninterrupted experience. To help ensure the best experience for every client, we kindly ask that all appointments follow the guidelines below.'
              : '感謝您選擇修顏社。每個預約均經過精心安排，以提供平靜、個人化且不受打擾的體驗。為確保每位客人均能享有最佳體驗，敬請遵守以下預約守則。'}
          </p>
        </div>

        {/* Etiquette sections */}
        <div className="space-y-12">
          {sections.map((section, i) => (
            <div key={i} className="border-b border-gray-100 pb-10 space-y-4 last:border-0">
              <h3 className="text-base font-semibold text-foreground tracking-wide">
                {section.title}
              </h3>
              <ul className="space-y-2.5 text-left">
                {section.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm font-light text-charcoal/80 leading-relaxed text-left">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-left flex-1">{item}</span>
                  </li>
                ))}
              </ul>
              {section.note && (
                <p className="text-xs font-light text-charcoal/70 pt-2 border-t border-gray-50">
                  {section.note}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="text-center space-y-3 pt-8 border-t border-gray-100">
          <p className="text-sm font-light text-charcoal/70">
            {locale === 'en' ? 'Thank you for your understanding.' : '感謝您的理解與配合。'}
          </p>
          <p className="text-base font-medium text-foreground tracking-wide">The Shugaosha Way</p>
          <p className="type-label text-primary">
            {locale === 'en' ? 'PRECISION • BALANCE • HARMONY' : '精準・平衡・和諧'}
          </p>
          <p className="text-xs font-light text-charcoal/50 pt-2 max-w-md mx-auto">
            {locale === 'en'
              ? 'Booking an appointment with Shugaosha indicates acceptance of our Appointment Policy.'
              : '向修顏社預約即表示接受我們的預約政策。'}
          </p>
        </div>
      </section>
    </div>
  )
}
