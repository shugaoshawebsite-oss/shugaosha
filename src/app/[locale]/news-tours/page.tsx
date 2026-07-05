import Image from 'next/image'
import Script from 'next/script'
import newsBg from '@/images/cherry-flowers-in-small-clusters-on-a-cherry-tree-2026-03-17-00-10-20-utc copy.webp'
import { getDictionary } from '@/utils/dictionary'
import { getTours } from '@/utils/dataService'
import { Calendar, Globe, MessageCircle } from 'lucide-react'

interface PageProps {
  params: Promise<{ locale: string }>
}

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
)

const cityEmojis: Record<string, string> = {
  'Hong Kong': '🇭🇰',
  'USA': '🇺🇸',
  'Canada': '🇨🇦',
  'Australia': '🇦🇺',
}

export default async function NewsToursPage({ params }: PageProps) {
  const { locale: rawLocale } = await params
  const locale = (rawLocale === 'zh' ? 'zh' : 'en') as 'en' | 'zh'
  const dict = getDictionary(locale)
  const tours = await getTours()

  return (
    <div className="flex flex-col space-y-24 md:space-y-36 pb-24">

      {/* Page Header */}
      <section className="relative min-h-[40vh] flex items-center overflow-hidden w-full bg-white">
        <div className="absolute inset-0 -z-10">
          <Image
            src={newsBg}
            alt="Hero Background"
            fill
            priority
            className="object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-white/55" />
        </div>

        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-36 pb-24 text-left">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/70 block mb-3">
            {dict.newsTours.title}
          </span>
          <h1 className="text-3xl sm:text-5xl font-light text-charcoal tracking-tight">
            {locale === 'en' ? 'News & Travel Schedule' : '最新動態與巡迴服務'}
          </h1>
          <p className="text-sm sm:text-base font-light text-charcoal/80 max-w-xl leading-relaxed mt-4">
            {dict.newsTours.tourIntro}
          </p>
        </div>
      </section>

      {/* Tour Schedule */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-16">
        <div className="border-b border-gray-100 pb-6 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary block mb-2">
              {locale === 'en' ? 'International Service' : '國際巡迴服務'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-light text-foreground tracking-tight flex items-center gap-3">
              <Globe className="w-6 h-6 text-primary" />
              {dict.newsTours.tourTitle}
            </h2>
          </div>
          <span className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full font-medium uppercase tracking-wider hidden sm:inline">
            {locale === 'en' ? 'Active' : '預約中'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tours.map((tour) => {
            const cityName = tour.city.en
            const flag = Object.entries(cityEmojis).find(([key]) => cityName.includes(key))?.[1] || '🌏'

            return (
              <div
                key={tour._id}
                className="bg-white border border-gray-100 rounded-2xl p-8 flex flex-col justify-between space-y-8 hover:shadow-md transition-shadow duration-300"
              >
                <div className="space-y-6">
                  <div className="space-y-1">
                    <span className="text-3xl">{flag}</span>
                    <span className="text-[10px] uppercase font-semibold text-primary tracking-widest block mt-3">
                      {locale === 'en' ? 'Destination' : '巡迴城市'}
                    </span>
                    <h3 className="text-xl font-medium text-foreground leading-snug">
                      {tour.city[locale] || tour.city.en}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <span className="text-[10px] uppercase font-semibold text-charcoal/40 tracking-widest block">
                      {locale === 'en' ? 'Past & Upcoming Dates' : '歷史及近期時程'}
                    </span>
                    <ul className="space-y-3">
                      {tour.dates.map((date, idx) => (
                        <li key={idx} className="flex gap-3 items-center text-sm font-light text-charcoal/85">
                          <Calendar className="w-4 h-4 text-primary/50 flex-shrink-0" />
                          <span>{date}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-50">
                  <a
                    href="https://wa.me/61493552213"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 border border-primary text-primary hover:bg-primary hover:text-white text-xs font-semibold px-4 py-3 rounded transition-all duration-300"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    {locale === 'en' ? 'Book Tour Session' : '預約此城市'}
                  </a>
                </div>
              </div>
            )
          })}
        </div>

        {/* Booking Notice */}
        <div className="bg-primary/5 border border-primary/10 rounded-2xl p-8 sm:p-12 text-center space-y-4 max-w-4xl mx-auto">
          <h3 className="text-lg font-medium text-foreground tracking-wide">
            {locale === 'en' ? 'Important Travel Booking Note' : '巡迴預約須知'}
          </h3>
          <p className="text-sm font-light text-charcoal/80 max-w-xl mx-auto leading-relaxed">
            {dict.newsTours.bookingNote}
          </p>
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
