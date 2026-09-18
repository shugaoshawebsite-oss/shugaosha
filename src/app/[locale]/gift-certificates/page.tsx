import Image from 'next/image'
import Link from 'next/link'
import WhatsAppIcon from '@/components/WhatsAppIcon'
import { Gift, Calendar, Sparkles, CheckCircle2, Shield, Clock } from 'lucide-react'

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function GiftCertificatesPage({ params }: PageProps) {
  const { locale: rawLocale } = await params
  const locale = (rawLocale === 'zh' ? 'zh' : 'en') as 'en' | 'zh'

  const whatsappHref = encodeURI(
    locale === 'en'
      ? "https://wa.me/61493552213?text=Hi, I would like to arrange a Shugaosha Gift Certificate."
      : "https://wa.me/61493552213?text=您好，我想安排購買 Shugaosha 禮券。"
  )

  return (
    <div className="flex flex-col space-y-20 sm:space-y-28 md:space-y-36 pb-24 pt-0">

      {/* ── 1. Page Header / Hero ── */}
      <section className="relative min-h-[42vh] sm:min-h-[48vh] flex items-center overflow-hidden w-full pt-20 sm:pt-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/images/hero2.webp"
            alt="Gift Certificates Background"
            fill
            priority
            className="object-cover opacity-80"
          />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-24 sm:pt-28 pb-16 sm:pb-20 text-center sm:text-left">
          <span className="type-label text-charcoal/70 block mb-3 uppercase tracking-widest text-xs font-semibold">
            {locale === 'en' ? 'GIFT CERTIFICATES' : '禮券'}
          </span>
          <h1 className="type-hero text-charcoal max-w-3xl leading-tight mx-auto sm:mx-0">
            {locale === 'en' ? 'Give the Gift of Shugaosha' : '送上一份特別的 Shugaosha 體驗'}
          </h1>
          <p className="type-body text-charcoal/80 max-w-2xl mt-4 leading-relaxed mx-auto sm:mx-0">
            {locale === 'en'
              ? 'A Shugaosha Gift Certificate is a thoughtful way to give someone special a personalised facial correction experience.'
              : 'Shugaosha 禮券是一份細緻而貼心的禮物，讓重要的人親身體驗我們專業的面部矯正。'}
          </p>
        </div>
      </section>

      {/* ── 2. Gift Certificate Showcase & Ordering ── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full scroll-mt-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Description, Options & CTA */}
          <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <span className="type-label text-primary block uppercase tracking-widest text-xs font-semibold">
                {locale === 'en' ? 'PERSONALISED EXPERIENCE' : '專屬個人化體驗'}
              </span>
              <h2 className="type-heading font-light text-foreground tracking-tight">
                {locale === 'en' ? 'Choose the Perfect Shugaosha Experience' : '選擇最適合的 Shugaosha 體驗'}
              </h2>
              <p className="type-body font-light text-charcoal/85 leading-relaxed">
                {locale === 'en'
                  ? 'Gift Certificates can be arranged for either:'
                  : '禮券可選擇以下其中一項：'}
              </p>
            </div>

            {/* Service Options Cards */}
            <div className="space-y-3.5">
              {[
                {
                  title: 'The Shugaosha Way — Foundation',
                  desc: locale === 'en'
                    ? 'Our signature facial correction service focused on facial balance, contours and overall harmony.'
                    : '我們的標誌性修顏服務，專注於面部平衡、輪廓及整體協調。',
                },
                {
                  title: 'The Shugaosha Lift',
                  desc: locale === 'en'
                    ? 'Hands-on service working progressively through the upper body, neck, head and face.'
                    : '由上半身、頸部、頭部至面部循序漸進調整的徒手提升放鬆護理。',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 space-y-2 shadow-sm hover:border-primary/30 transition-all duration-300 text-center sm:text-left"
                >
                  <h3 className="type-card-title font-semibold text-foreground text-center sm:text-left">
                    {item.title}
                  </h3>
                  <p className="type-body font-light text-charcoal/75 leading-relaxed text-center sm:text-left">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Explanatory Body Paragraphs */}
            <div className="space-y-4" data-no-justify>
              <p className="type-body font-light text-charcoal/80 leading-relaxed">
                {locale === 'en'
                  ? 'For new clients, Foundation is the recommended starting point.'
                  : '對於新客人，我們建議先從 Foundation 開始。'}
              </p>

              <p className="type-body font-light text-charcoal/80 leading-relaxed">
                {locale === 'en'
                  ? 'Each Gift Certificate will be personalised with the recipient’s name and selected treatment.'
                  : '每張 Gift Certificate 都會加入收禮人的姓名及所選服務。'}
              </p>

              <p className="type-body font-light text-charcoal/80 leading-relaxed">
                {locale === 'en'
                  ? 'To arrange a Gift Certificate, please contact us via WhatsApp. The recipient can then book their appointment directly with us by quoting the voucher number.'
                  : '如需安排 Gift Certificate，請透過 WhatsApp 與我們聯絡。收禮人之後可憑 voucher number 直接與我們預約。'}
              </p>
            </div>

            <div className="pt-2 flex justify-center lg:justify-start">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-primary text-white px-8 py-4 rounded-full text-xs font-semibold tracking-wider uppercase hover:bg-primary/90 transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-primary/20"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>{locale === 'en' ? 'ARRANGE A GIFT CERTIFICATE' : '安排購買禮券'}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Gift Certificate Card Preview */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="relative w-full aspect-[1024/681] rounded-2xl overflow-hidden shadow-2xl border border-gray-200/80 bg-white group hover:shadow-primary/15 transition-all duration-500">
              <Image
                src="/assets/gift-certificates/gift_certificate.jpg"
                alt="Shugaosha Gift Certificate"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain group-hover:scale-[1.01] transition-transform duration-700"
              />
            </div>
            <p className="text-xs text-charcoal/50 font-light mt-3 text-center">
              {locale === 'en' ? 'Official Shugaosha Gift Certificate' : '修顏社官方禮券'}
            </p>
          </div>

        </div>
      </section>

      {/* ── 3. Gift Certificate Details / Terms ── */}
      <section className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 w-full scroll-mt-28">
        <div className="bg-primary/5 border border-primary/15 rounded-3xl p-8 sm:p-12 text-left space-y-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="type-card-title font-semibold text-foreground uppercase tracking-wider">
              {locale === 'en' ? 'GIFT CERTIFICATE DETAILS' : '禮券詳情'}
            </h3>
          </div>

          <ul className="space-y-3.5 text-left pt-2">
            {[
              locale === 'en' ? 'Valid for six months from the date of issue' : '禮券由發出日期起六個月內有效',
              locale === 'en' ? 'By appointment only' : '必須提前預約',
              locale === 'en' ? 'Non-refundable and not redeemable for cash' : '禮券不設退款，亦不可兌換現金',
              locale === 'en' ? 'Valid for the named recipient only' : '禮券只限指定收禮人使用',
            ].map((detail, i) => (
              <li key={i} className="flex items-start gap-3 type-body font-light text-charcoal/85 text-left">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                <span className="text-left flex-1">{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 4. Bottom Booking & Services CTA ── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full scroll-mt-28">
        <div className="bg-soft-bg border border-gray-100 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center md:items-center justify-between gap-8 text-center md:text-left">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="type-subheading font-light text-foreground">
              {locale === 'en' ? 'Have Questions or Need Help?' : '有任何問題或需要協助？'}
            </h3>
            <p className="type-body font-light text-charcoal/75 max-w-lg mx-auto md:mx-0">
              {locale === 'en'
                ? 'Contact our specialist team on WhatsApp (+61 493 552 213) to arrange your gift certificate or enquire about our services.'
                : '歡迎隨時透過 WhatsApp（+61 493 552 213）聯絡我們的專業團隊安排禮券或查詢服務。'}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-primary text-white px-7 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase hover:bg-primary/90 transition-all duration-300 hover:scale-[1.02] shadow-md shadow-primary/20"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>{locale === 'en' ? 'WHATSAPP US' : 'WHATSAPP 查詢'}</span>
            </a>
            <Link
              href={`/${locale}/treatment`}
              className="btn-secondary text-xs uppercase tracking-wider py-3.5 px-6"
            >
              {locale === 'en' ? 'VIEW SERVICES' : '瀏覽服務'}
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
