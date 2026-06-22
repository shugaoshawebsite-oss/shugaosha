import { getDictionary } from '@/utils/dictionary'
import { MessageCircle, Mail, MapPin, Clock } from 'lucide-react'

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function ContactPage({ params }: PageProps) {
  const { locale: rawLocale } = await params
  const locale = (rawLocale === 'zh' ? 'zh' : 'en') as 'en' | 'zh'
  const dict = getDictionary(locale)

  return (
    <div className="flex flex-col space-y-24 pb-24">
      {/* Page Header */}
      <section className="bg-gradient-to-b from-soft-bg to-white py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary block">
            {dict.contact.title}
          </span>
          <h1 className="text-3xl sm:text-5xl font-light text-foreground tracking-tight">
            {dict.contact.subtitle}
          </h1>
          <p className="text-sm sm:text-base font-light text-charcoal/80 max-w-xl mx-auto leading-relaxed">
            {dict.contact.desc}
          </p>
        </div>
      </section>

      {/* Main Contact Content */}
      <section className="max-w-5xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          
          {/* Left Column: Interactive Contact Methods */}
          <div className="space-y-8 bg-soft-bg border border-gray-100 rounded-2xl p-8 sm:p-12">
            <h2 className="text-xl font-medium text-foreground tracking-wide">
              {locale === 'en' ? 'Direct Channels' : '即時預約管道'}
            </h2>
            
            <div className="space-y-6">
              {/* WhatsApp Option */}
              <a
                href="https://wa.me/61493552213"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 bg-white border border-gray-100 rounded-xl hover:border-primary/45 hover:shadow-sm transition-all duration-300 group"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-foreground">
                    WhatsApp / SMS
                  </h3>
                  <p className="text-xs font-light text-charcoal/70">
                    +61 493552213
                  </p>
                  <span className="text-[10px] font-semibold text-primary uppercase tracking-wider block pt-1">
                    {locale === 'en' ? 'Tap to message' : '點擊立即發送訊息'}
                  </span>
                </div>
              </a>

              {/* Email Option */}
              <a
                href="mailto:shugaosha@gmail.com"
                className="flex items-start gap-4 p-4 bg-white border border-gray-100 rounded-xl hover:border-primary/45 hover:shadow-sm transition-all duration-300 group"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-foreground">
                    Email Inquiry
                  </h3>
                  <p className="text-xs font-light text-charcoal/70">
                    shugaosha@gmail.com
                  </p>
                  <span className="text-[10px] font-semibold text-primary uppercase tracking-wider block pt-1">
                    {locale === 'en' ? 'Send an email' : '發送電子郵件'}
                  </span>
                </div>
              </a>
            </div>

            <div className="bg-white/60 rounded-xl p-6 border border-gray-50 flex gap-4">
              <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-xs font-medium text-foreground uppercase tracking-wider">
                  {locale === 'en' ? 'Response Time' : '回覆時間'}
                </h4>
                <p className="text-xs font-light text-charcoal/85 leading-relaxed">
                  {locale === 'en'
                    ? 'We typically respond within a few hours. Please feel free to send photos for initial facial symmetry assessment.'
                    : '我們通常會在數小時內回覆。歡迎在訊息中附上面部照片，以便進行初步對稱性評估。'}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Location details */}
          <div className="space-y-8 p-4">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-medium text-foreground tracking-wide">
                  {dict.contact.locationsTitle}
                </h2>
              </div>
              <p className="text-sm font-light text-charcoal/85 leading-relaxed">
                {dict.contact.primaryClinic}
              </p>
            </div>

            {/* Embedded maps or directions placeholder styling */}
            <div className="aspect-[4/3] bg-gray-50 border border-gray-100 rounded-2xl flex flex-col items-center justify-center text-center p-8 relative overflow-hidden">
              <MapPin className="w-10 h-10 text-primary/30 mb-3" />
              <h3 className="text-sm font-medium text-foreground mb-1">
                Gladesville, NSW, Australia
              </h3>
              <p className="text-xs font-light text-charcoal/60 max-w-xs leading-relaxed">
                {locale === 'en'
                  ? 'Conveniently located with street parking nearby. Close to public transport routes.'
                  : '交通便利，診所附近設有街邊停車位，鄰近公共交通路線。'}
              </p>
              <div className="absolute inset-0 bg-primary/[0.005] pointer-events-none" />
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}
