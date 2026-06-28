import Image from 'next/image'
import { getDictionary } from '@/utils/dictionary'
import { MessageCircle, Mail, MapPin, Clock, Phone } from 'lucide-react'

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
      <section className="relative min-h-[40vh] flex items-center overflow-hidden w-full">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/assets/Artboard 1bg3.webp"
            alt="Hero Background"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>

        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-36 pb-24 text-left">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70 block mb-3">
            {dict.contact.title}
          </span>
          <h1 className="text-3xl sm:text-5xl font-light text-white tracking-tight">
            {dict.contact.subtitle}
          </h1>
          <p className="text-sm sm:text-base font-light text-white/80 max-w-xl leading-relaxed mt-4">
            {dict.contact.desc}
          </p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left: Contact Methods */}
          <div className="space-y-6">
            <h2 className="text-xl font-medium text-foreground tracking-wide">
              {locale === 'en' ? 'Reach Us Directly' : '直接聯絡我們'}
            </h2>

            {/* WhatsApp - primary */}
            <a
              href="https://wa.me/61493552213"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-5 p-6 bg-primary text-white rounded-2xl hover:bg-primary/95 transition-all duration-300 shadow-lg shadow-primary/20 group"
            >
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-medium">WhatsApp</h3>
                <p className="text-white/80 text-sm font-light">+61 493 552 213</p>
                <span className="text-xs text-white/60 uppercase tracking-wider font-light block">
                  {locale === 'en' ? 'Tap to message now — fastest response' : '點擊立即傳訊 — 最快回覆'}
                </span>
              </div>
            </a>

            {/* SMS - secondary */}
            <a
              href="sms:+61493552213"
              className="flex items-center gap-5 p-6 bg-soft-bg border border-gray-100 rounded-2xl hover:border-primary/30 hover:shadow-sm transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <Phone className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-medium text-foreground">SMS</h3>
                <p className="text-charcoal/70 text-sm font-light">+61 493 552 213</p>
                <span className="text-xs text-charcoal/50 uppercase tracking-wider font-light block">
                  {locale === 'en' ? 'Send a text message' : '發送短訊'}
                </span>
              </div>
            </a>

            {/* Email */}
            <a
              href="mailto:shugaosha@gmail.com"
              className="flex items-center gap-5 p-6 bg-soft-bg border border-gray-100 rounded-2xl hover:border-primary/30 hover:shadow-sm transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <Mail className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-medium text-foreground">
                  {locale === 'en' ? 'Email' : '電子郵件'}
                </h3>
                <p className="text-charcoal/70 text-sm font-light">shugaosha@gmail.com</p>
                <span className="text-xs text-charcoal/50 uppercase tracking-wider font-light block">
                  {locale === 'en' ? 'Send us an email' : '發送電子郵件'}
                </span>
              </div>
            </a>

            {/* Response time note */}
            <div className="bg-white border border-gray-100 rounded-xl p-5 flex gap-4">
              <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
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
            <h2 className="text-xl font-medium text-foreground tracking-wide flex items-center gap-3">
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
      </section>

    </div>
  )
}
