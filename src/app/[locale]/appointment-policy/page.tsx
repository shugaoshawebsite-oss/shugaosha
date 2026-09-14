import Image from 'next/image'

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function AppointmentPolicyPage({ params }: PageProps) {
  const { locale: rawLocale } = await params
  const locale = (rawLocale === 'zh' ? 'zh' : 'en') as 'en' | 'zh'

  const sections: { title: string; intro?: string[]; items?: string[]; note?: string }[] = [
    {
      title: locale === 'en' ? 'Booking Confirmation' : '預約確認',
      items: locale === 'en'
        ? [
          'A friendly reminder will be sent before your scheduled appointment.',
          'If you need to cancel or make a change, we kindly ask that you let us know at least 24 hours in advance whenever possible.',
          'Not receiving or replying to a reminder does not cancel or change your booking. Your appointment will remain confirmed unless another arrangement has been made directly with us.',
        ]
        : [
          '我們會在預約前發送溫馨提示。',
          '如需取消或更改預約，敬請盡可能於預約時間 24小時前通知我們，讓我們可以更妥善安排預留時段。',
          '未收到或未回覆提示訊息，並不代表預約已被取消或更改。除非已直接與我們另作安排，原有預約仍會保留。',
        ],
    },
    {
      title: locale === 'en' ? 'Rescheduling' : '更改預約',
      items: locale === 'en'
        ? [
          'We understand that plans can change. If you need to reschedule, please let us know at least 24 hours in advance.',
          'Each appointment may be rescheduled once, subject to availability. Changes within 24 hours will follow our Short Notice Cancellations & Changes Policy.',
        ]
        : [
          '我們明白行程有時會有變動。如需改期，敬請至少提前 24小時通知我們。',
          '每個預約可安排一次改期，並視乎當時可預約時段而定。24小時內提出的更改，將按照「24小時內取消及更改」守則處理。',
        ],
    },
    {
      title: locale === 'en' ? 'Feeling Unwell' : '身體不適',
      items: locale === 'en'
        ? [
          'If you are feeling unwell or experiencing cold, flu, COVID-19 or other contagious symptoms, we kindly ask that you reschedule your appointment.',
          'As our sessions involve close personal contact, this helps protect the health and wellbeing of both our clients and practitioners. Please let us know as early as possible so we can make the necessary arrangements.',
        ]
        : [
          '如您感到不適，或出現感冒、流感、COVID-19 或其他具傳染性的症狀，敬請安排改期。',
          '由於修顏過程需要近距離接觸，為保障客人及修顏師的健康，敬請盡早通知我們，以便作出適當安排。',
        ],
    },
    {
      title: locale === 'en' ? 'Short Notice Cancellations & Changes' : '24小時內取消及更改',
      intro: locale === 'en'
        ? [
          'Each appointment time is reserved especially for you. When a cancellation or change is made at short notice, it can be difficult for us to offer that time to another client.',
          'Cancellations or changes made within 24 hours of your appointment, including those due to illness, will be handled as follows:',
        ]
        : [
          '每個預約時段均特別為您預留。如在短時間內取消或更改預約，我們一般難以即時將該時段安排給其他客人。',
          '如在預約時間前24小時內取消或更改，包括因身體不適而取消或改期，將按以下方式處理：',
        ],
      items: locale === 'en'
        ? [
          'Within 24 hours: 25% of the booked session price',
          'Within 12 hours: 50% of the booked session price',
          'Within 6 hours or no-show: 100% of the booked session price',
          'Package Sessions: The scheduled session will be counted as completed.',
        ]
        : [
          '24小時內： 收取該次預約費用的25%',
          '12小時內： 收取該次預約費用的50%',
          '6小時內或未有出席： 收取該次預約的全額費用',
          '套票服務： 該次預約將視作已完成',
        ],
    },
    {
      title: locale === 'en' ? 'Late Arrival' : '遲到安排',
      items: locale === 'en'
        ? [
          'To ensure that every client receives their reserved appointment time, we kindly ask that you arrive on time.',
          'If you arrive late, we will do our best to accommodate you; however, your session may need to be shortened to avoid delaying the appointments that follow.',
          'If you arrive 30 minutes or more after your scheduled time, there may not be enough time to proceed with the session. In this situation, the full booked session fee will still apply, and package sessions will be counted as completed.',
        ]
        : [
          '為確保每位客人都能享有完整的預約時段，敬請準時到達。',
          '如您遲到，我們會盡力作出安排；惟為免影響其後客人的預約，服務時間可能需要相應縮短。',
          '如遲到30分鐘或以上，可能因剩餘時間不足而無法進行該次服務。在此情況下，仍須支付該次預約的全額費用；套票客人的該次預約將視作已完成。',
        ],
    },
    {
      title: locale === 'en' ? 'Respecting Reserved Appointment Times' : '尊重彼此的預約時間',
      intro: locale === 'en'
        ? [
          'We value your time and carefully reserve each appointment especially for you. We kindly ask for the same consideration for the time our practitioners have set aside for your session.',
          'Respecting each other’s time helps us maintain a smooth schedule and provide every client with a calm and enjoyable experience.',
        ]
        : [
          '我們重視每位客人的時間，亦會特別為您的服務預留專屬時段。同時，亦希望您能體諒並尊重修顏師為您預留的時間。',
          '彼此尊重大家的時間，有助我們維持順暢的預約安排，並為每位客人提供從容而舒適的服務體驗。',
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
            {locale === 'en' ? 'Policy' : '預約守則'}
          </span>
          <h1 className="type-hero text-charcoal">
            {locale === 'en' ? 'Booking Policy' : '預約守則'}
          </h1>
          <p className="type-body text-charcoal/80 max-w-2xl mt-4">
            {locale === 'en'
              ? 'Thank you for choosing Shugaosha. Each appointment time is reserved especially for you. To help us manage our schedule fairly and provide every client with the time and attention needed for their session, please read the following Booking Policy carefully before making your appointment.'
              : '感謝您選擇修顏社。每個預約時段都會特別為客人預留。為了讓我們能妥善安排時間，並讓每位客人都得到應有的修顏時間及專注服務，請在預約前仔細閱讀以下預約守則。'}
          </p>
        </div>
      </section>

      {/* Booking Policy Content */}
      <section className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 w-full space-y-12">

        {/* Etiquette sections */}
        <div className="space-y-12">
          {sections.map((section, i) => (
            <div key={i} className="border-b border-gray-100 pb-10 space-y-4 last:border-0">
              <h3 className="text-base font-semibold text-foreground tracking-wide">
                {section.title}
              </h3>
              {section.intro && section.intro.length > 0 && (
                <div className="space-y-3 text-sm font-light text-charcoal/80 leading-relaxed text-left">
                  {section.intro.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              )}
              {section.items && section.items.length > 0 && (
                <ul className="space-y-2.5 text-left">
                  {section.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm font-light text-charcoal/80 leading-relaxed text-left">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      <span className="text-left flex-1">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
              {section.note && (
                <p className="text-xs font-light text-charcoal/70 pt-2 border-t border-gray-50">
                  {section.note}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Footer Branding */}
        <div className="text-center space-y-2 pt-8 border-t border-gray-100">
          <p className="text-base font-medium text-foreground tracking-wide">The Shugaosha Way</p>
          <p className="type-label text-primary">
            {locale === 'en' ? 'PRECISION • BALANCE • HARMONY' : '精準・平衡・和諧'}
          </p>
        </div>
      </section>
    </div>
  )
}
