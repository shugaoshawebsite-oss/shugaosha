import Image from 'next/image'
import { Metadata } from 'next'
import { getTours } from '@/utils/dataService'
import UpcomingVisitContent from '@/components/UpcomingVisitContent'

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params
  const locale = (rawLocale === 'zh' ? 'zh' : 'en') as 'en' | 'zh'

  return {
    title: locale === 'en' ? 'Upcoming Visit | Shugaosha' : '即將到訪 | Shugaosha',
    description:
      locale === 'en'
        ? 'Confirmed upcoming visit dates and appointment information for Shugaosha.'
        : 'Shugaosha 即將到訪的最新行程與預約資訊。',
  }
}

export default async function UpcomingVisitPage({ params }: PageProps) {
  const { locale: rawLocale } = await params
  const locale = (rawLocale === 'zh' ? 'zh' : 'en') as 'en' | 'zh'
  const tours = await getTours()
  const activeTour = tours.find((t) => t.isActive)

  return (
    <div className="flex flex-col space-y-16 sm:space-y-24 pb-24 pt-0">
      {/* ── Page Header / Hero ── */}
      <section className="relative min-h-[40vh] sm:min-h-[45vh] flex items-center overflow-hidden w-full pt-20 sm:pt-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/images/hero5.webp"
            alt="Upcoming Visit Hero Background"
            fill
            priority
            className="object-cover opacity-80"
          />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-24 sm:pt-28 pb-16 sm:pb-20 text-center sm:text-left">
          <span className="type-label text-charcoal/70 block mb-3 uppercase tracking-widest text-xs font-semibold">
            {locale === 'en' ? 'INTERNATIONAL VISITS' : '期間限定巡迴'}
          </span>
          <h1 className="type-hero text-charcoal">
            {locale === 'en' ? 'Upcoming Visit' : '即將到訪'}
          </h1>
          <p className="type-body text-charcoal/80 max-w-2xl mt-4 leading-relaxed mx-auto sm:mx-0">
            {locale === 'en'
              ? 'From time to time, we visit clients in other cities. Below are confirmed visit details and appointment information.'
              : '我們會不定期前往其他城市拜訪客人。以下為已確認的行程與預約資訊。'}
          </p>
        </div>
      </section>

      {/* ── Main Upcoming Visit Content ── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <UpcomingVisitContent locale={locale} tour={activeTour} />
      </section>
    </div>
  )
}
