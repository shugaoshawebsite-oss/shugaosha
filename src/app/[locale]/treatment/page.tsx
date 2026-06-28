import Link from 'next/link'
import Image from 'next/image'
import { getDictionary } from '@/utils/dictionary'
import { Check, MessageCircle, ArrowRight, Shield, Sparkles, Heart, Zap, Scale, Smile } from 'lucide-react'

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function TreatmentPage({ params }: PageProps) {
  const { locale: rawLocale } = await params
  const locale = (rawLocale === 'zh' ? 'zh' : 'en') as 'en' | 'zh'
  const dict = getDictionary(locale)
  const t = dict.treatment

  const images = [
    '/assets/Artboard 3photo3.webp',
    '/assets/Artboard 3photo2.webp',
    '/assets/Artboard 3 copyphoto.webp',
  ]

  return (
    <div className="flex flex-col space-y-24 md:space-y-32 pb-24">

      {/* Page Header */}
      <section className="relative min-h-[40vh] flex items-center overflow-hidden w-full">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/assets/head1.avif"
            alt="Treatment Heading Background"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>

        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-36 pb-24 text-left">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-white/70 block mb-3">
            {t.title}
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-light text-white tracking-tight">
            {t.subtitle}
          </h1>
          <p className="text-sm sm:text-base font-light text-white/80 max-w-xl leading-relaxed mt-4">
            {t.tagline}
          </p>
        </div>
      </section>

      {/* Section 1: What Is It — Intro + Video */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Intro text */}
          <div className="space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                {locale === 'en' ? 'The Method' : '技術核心'}
              </span>
              <h2 className="text-3xl sm:text-4xl font-light text-foreground tracking-tight">
                {t.introTitle}
              </h2>
            </div>

            <p className="text-base font-light text-charcoal/80 leading-relaxed">
              {t.introDesc}
            </p>

            {/* 3 icons above CTA */}
            <div className="grid grid-cols-3 gap-4 pb-2 pt-2">
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-12 h-12 relative flex items-center justify-center">
                  <Image src="/assets/1no.svg" alt="No Machines" fill className="object-contain" />
                </div>
                <span className="text-xs font-medium text-charcoal/90">{locale === 'en' ? 'No Machines' : '無儀器'}</span>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-12 h-12 relative flex items-center justify-center">
                  <Image src="/assets/2no.svg" alt="No Needles" fill className="object-contain" />
                </div>
                <span className="text-xs font-medium text-charcoal/90">{locale === 'en' ? 'No Needles' : '無針藥'}</span>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-12 h-12 relative flex items-center justify-center">
                  <Image src="/assets/3no.svg" alt="No Surgery" fill className="object-contain" />
                </div>
                <span className="text-xs font-medium text-charcoal/90">{locale === 'en' ? 'No Surgery' : '無手術'}</span>
              </div>
            </div>
          </div>

          {/* Right: Portrait video */}
          <div>
            <div className="relative aspect-[9/16] max-h-[600px] bg-black border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
              <video
                src="/assets/treatment.mp4"
                controls
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
                poster="/assets/specialist/specialist_teresa_soo.avif"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Skull Science — alternating layout with image */}
      <section className="bg-soft-bg border-y border-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left: image */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md order-2 lg:order-1">
              <Image
                src={images[0]}
                alt={locale === 'en' ? 'Facial bone structure illustration' : '面部骨骼結構示意'}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {/* Right: text */}
            <div className="space-y-6 order-1 lg:order-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                {locale === 'en' ? 'The Science' : '科學原理'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-light text-foreground tracking-tight leading-snug">
                {t.skullTitle}
              </h2>
              <p className="text-base font-light text-charcoal/80 leading-relaxed">
                {t.skullDesc}
              </p>

              {/* 22 bones stat highlight */}
              <div className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                <div className="text-4xl font-light text-primary shrink-0">22</div>
                <p className="text-sm font-light text-charcoal/80 leading-snug">
                  {locale === 'en'
                    ? 'bones make up the human skull — and each gap matters.'
                    : '塊骨骼構成人類頭骨 — 每一個縫隙都至關重要。'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Technique — text + image */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: text */}
          <div className="space-y-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              {locale === 'en' ? 'The Technique' : '技術手法'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-light text-foreground tracking-tight leading-snug">
              {t.techniqueTitle}
            </h2>
            <p className="text-base font-light text-charcoal/80 leading-relaxed">
              {t.techniqueDesc}
            </p>
          </div>

          {/* Right: image */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
            <Image
              src={images[1]}
              alt={locale === 'en' ? 'Japanese face slimming technique' : '日式小顏矯正技術'}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Section 4: Muscle Memory + Natural Approach — 2-column info cards */}
      <section className="bg-soft-bg border-y border-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
          <div className="text-center md:text-left max-w-2xl md:max-w-none mx-auto md:mx-0 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              {locale === 'en' ? 'How It Works' : '療程原理'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-light text-foreground tracking-tight">
              {locale === 'en' ? 'Self-Healing & Natural Results' : '自我修復與自然效果'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Muscle memory card */}
            <div className="bg-white border border-gray-100 rounded-2xl p-8 space-y-5 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium text-foreground leading-snug">
                {t.muscleTitle}
              </h3>
              <p className="text-base font-light text-charcoal/80 leading-relaxed">
                {t.muscleDesc}
              </p>
            </div>

            {/* Natural approach card */}
            <div className="bg-white border border-gray-100 rounded-2xl p-8 space-y-5 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium text-foreground leading-snug">
                {t.naturalTitle}
              </h3>
              <p className="text-base font-light text-charcoal/80 leading-relaxed">
                {t.naturalDesc}
              </p>
            </div>
          </div>

          {/* Third supporting image */}
          <div className="relative aspect-[21/9] rounded-2xl overflow-hidden shadow-md">
            <Image
              src={images[2]}
              alt={locale === 'en' ? 'Shugaosha treatment result' : '修顏社療程效果'}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Core Benefits */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="space-y-12">
          <div className="text-center md:text-left max-w-2xl md:max-w-none mx-auto md:mx-0 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              {locale === 'en' ? 'What You Can Expect' : '您可以期待的效果'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-light text-foreground tracking-tight">
              {t.coreBenefitsTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Sparkles,
                title: locale === 'en' ? 'Lifted & Refined' : '提升與緊緻',
                desc: locale === 'en' ? 'Promotes a firmer, contoured facial appearance.' : '促進面部輪廓更加緊緻立體。'
              },
              {
                icon: Scale,
                title: locale === 'en' ? 'Facial Harmony' : '對稱平衡',
                desc: locale === 'en' ? 'Encourages symmetrical balancing of facial features.' : '調整面部骨骼比例，促進對稱和諧。'
              },
              {
                icon: Heart,
                title: locale === 'en' ? 'Reduced Puffiness' : '消腫排水',
                desc: locale === 'en' ? 'Helps minimize fluid retention and facial swelling.' : '促進淋巴循環，減少水分滯留與面部浮腫。'
              },
              {
                icon: Zap,
                title: locale === 'en' ? 'Refreshed Radiance' : '煥發光采',
                desc: locale === 'en' ? 'Supports a vibrant and youthfully revitalized look.' : '改善面部血液循環，重塑健康紅潤氣色。'
              },
              {
                icon: Smile,
                title: locale === 'en' ? 'Tension Relief' : '舒緩緊繃',
                desc: locale === 'en' ? 'Encourages deep relaxation of facial muscles.' : '深層放鬆咀嚼肌及面部肌肉，緩解日常緊張。'
              },
              {
                icon: Shield,
                title: locale === 'en' ? 'Youthful Glow' : '青春活力',
                desc: locale === 'en' ? 'Supports healthy skin and natural revitalisation.' : '提升肌膚活力，帶來由內而外的自然健康光澤。'
              }
            ].map((benefit, i) => {
              const IconComponent = benefit.icon
              return (
                <div
                  key={i}
                  className="bg-soft-bg border border-gray-100 rounded-2xl p-6 flex gap-4 items-start shadow-sm hover:shadow-md transition-shadow duration-300 group"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-semibold text-foreground tracking-wide">
                      {benefit.title}
                    </h3>
                    <p className="text-sm font-light text-charcoal/80 leading-relaxed">
                      {benefit.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Additional Benefits */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="space-y-10">
          <div className="space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              {locale === 'en' ? 'Further Advantages' : '更多好處'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-light text-foreground tracking-tight">
              {t.additionalBenefitsTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.additionalBenefits.map((benefit, i) => (
              <div key={i} className="flex gap-3 items-center p-4 bg-soft-bg border border-gray-100 rounded-xl">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <span className="text-base font-light text-charcoal/85">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-primary/5 border-y border-primary/10 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-6 text-center md:text-left space-y-8">
          <h2 className="text-2xl sm:text-4xl font-light text-foreground tracking-tight max-w-xl mx-auto leading-tight">
            {t.cta.title}
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/61493552213"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center gap-3"
            >
              <MessageCircle className="w-5 h-5" />
              {locale === 'en' ? 'Book via WhatsApp' : 'WhatsApp 線上預約'}
            </a>
            <a
              href="sms:+61493552213"
              className="btn-secondary flex items-center gap-3 bg-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              {locale === 'en' ? 'Book via SMS' : 'SMS 簡訊預約'}
            </a>
            <Link
              href={`/${locale}/success-stories`}
              className="btn-secondary flex items-center gap-2"
            >
              {locale === 'en' ? 'View Success Stories' : '查看療效見證'}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
