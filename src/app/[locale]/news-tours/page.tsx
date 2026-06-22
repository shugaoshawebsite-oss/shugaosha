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

export default async function NewsToursPage({ params }: PageProps) {
  const { locale: rawLocale } = await params
  const locale = (rawLocale === 'zh' ? 'zh' : 'en') as 'en' | 'zh'
  const dict = getDictionary(locale)
  const tours = await getTours()

  return (
    <div className="flex flex-col space-y-24 md:space-y-36 pb-24">
      {/* Page Header */}
      <section className="bg-gradient-to-b from-soft-bg to-white py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary block">
            {dict.newsTours.title}
          </span>
          <h1 className="text-3xl sm:text-5xl font-light text-foreground tracking-tight">
            {locale === 'en' ? 'News & Travel Schedule' : '最新動態與巡迴服務'}
          </h1>
          <p className="text-sm sm:text-base font-light text-charcoal/80 max-w-xl mx-auto leading-relaxed">
            {dict.newsTours.tourIntro}
          </p>
        </div>
      </section>

      {/* Global Tour Schedule */}
      <section className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 space-y-16">
        <div className="border-b border-gray-100 pb-6 flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl font-light text-foreground tracking-tight flex items-center gap-3">
            <Globe className="w-6 h-6 text-primary" />
            {dict.newsTours.tourTitle}
          </h2>
          <span className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full font-medium uppercase tracking-wider">
            {locale === 'en' ? 'Active' : '預約中'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tours.map((tour) => (
            <div 
              key={tour._id}
              className="bg-white border border-gray-100 rounded-2xl p-8 flex flex-col justify-between space-y-8 hover:shadow-md transition-shadow duration-300"
            >
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-semibold text-primary tracking-widest block">
                    {locale === 'en' ? 'Destination' : '巡迴城市'}
                  </span>
                  <h3 className="text-xl font-medium text-foreground">
                    {tour.city[locale] || tour.city.en}
                  </h3>
                </div>

                <div className="space-y-4">
                  <span className="text-[10px] uppercase font-semibold text-charcoal/40 tracking-widest block">
                    {locale === 'en' ? 'Availability / Upcoming Dates' : '歷史及近期時程'}
                  </span>
                  <ul className="space-y-3">
                    {tour.dates.map((date, idx) => (
                      <li key={idx} className="flex gap-3 items-center text-sm font-light text-charcoal/85">
                        <Calendar className="w-4 h-4 text-primary/50" />
                        <span>{date}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Booking trigger */}
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
          ))}
        </div>

        {/* Tour Booking Notice */}
        <div className="bg-primary/5 border border-primary/10 rounded-2xl p-8 sm:p-12 text-center space-y-4 max-w-4xl mx-auto">
          <h3 className="text-lg font-medium text-foreground tracking-wide">
            {locale === 'en' ? 'Important Travel Booking Note' : '巡迴預約須知'}
          </h3>
          <p className="text-sm font-light text-charcoal/85 max-w-xl mx-auto leading-relaxed">
            {dict.newsTours.bookingNote}
          </p>
        </div>
      </section>

      {/* Latest News & Updates (Instagram Feed Placeholder) */}
      <section className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
        <div className="border-b border-gray-100 pb-6">
          <h2 className="text-2xl sm:text-3xl font-light text-foreground tracking-tight flex items-center gap-3">
            <InstagramIcon className="w-6 h-6 text-primary" />
            {dict.newsTours.newsTitle}
          </h2>
        </div>

        {/* Premium Grid Placeholder mimicking Instagram posts */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div 
              key={i}
              className="aspect-square bg-gray-50 border border-gray-100 rounded-xl flex flex-col items-center justify-center text-center p-6 relative overflow-hidden group hover:bg-primary/[0.02] hover:border-primary/20 transition-all duration-300"
            >
              <InstagramIcon className="w-8 h-8 text-charcoal/30 group-hover:text-primary/60 transition-colors duration-300 mb-2" />
              <span className="text-[10px] text-charcoal/50 uppercase tracking-widest font-light">
                {locale === 'en' ? 'View Post' : '查看貼文'}
              </span>
              <div className="absolute inset-0 bg-primary/[0.01] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="https://instagram.com/shugaosha"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
          >
            {locale === 'en' ? 'Follow @shugaosha on Instagram' : '在 Instagram 上關注 @shugaosha'}
            <InstagramIcon className="w-4 h-4" />
          </a>
        </div>
      </section>
    </div>
  )
}
