import Link from 'next/link'
import Image from 'next/image'
import { getDictionary } from '@/utils/dictionary'
import { Check, ArrowRight, Shield, Sparkles, Heart, Zap, Scale, Smile, Calendar, Droplet, Sun } from 'lucide-react'
import WhatsAppIcon from '@/components/WhatsAppIcon'
import TreatmentVideo from '@/components/TreatmentVideo'

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function TreatmentPage({ params }: PageProps) {
  const { locale: rawLocale } = await params
  const locale = (rawLocale === 'zh' ? 'zh' : 'en') as 'en' | 'zh'
  const dict = getDictionary(locale)
  const t = dict.treatment

  const images = [
    '/assets/images/img3.webp',
    '/assets/images/img2.webp',
    '/assets/Artboard 3 copyphoto.webp',
  ]

  return (
    <div className="flex flex-col space-y-24 md:space-y-32 pb-24">

      {/* Page Header */}
      <section className="relative min-h-[40vh] flex items-center overflow-hidden w-full">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/images/hero3.webp"
            alt="Treatment Heading Background"
            fill
            priority
            className="object-cover opacity-80"
          />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-36 pb-24 text-left">
          <span className="type-label text-charcoal/70 block mb-3">
            {t.title}
          </span>
          <h1 className="type-hero text-charcoal">
            {t.subtitle}
          </h1>
          <p className="type-body text-charcoal/80 max-w-xl mt-4">
            {t.tagline}
          </p>
        </div>
      </section>

      {/* Section 1: What Is It — Intro + Video */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Intro text */}
          <div className="space-y-8 text-center md:text-left">
            <div className="space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary block">
                {locale === 'en' ? 'Our Approach' : '我們的理念'}
              </span>
              <h2 className="text-3xl sm:text-4xl font-light text-foreground tracking-tight">
                {t.introTitle}
              </h2>
            </div>

            <div className="space-y-4 text-base font-light text-charcoal/80 leading-relaxed">
              <p>{t.introDesc1}</p>
              <p>{t.introDesc2}</p>
              <p>{t.introDesc3}</p>
              <p>{t.introDesc4}</p>
            </div>

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
            <div className="relative aspect-[9/16] max-h-[600px] w-full max-w-[337px] mx-auto bg-black border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
              <TreatmentVideo
                src="/assets/treatment.mp4"
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
            <div className="space-y-6 order-1 lg:order-2 text-center md:text-left">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary block">
                {locale === 'en' ? 'Why Balance Matters' : '為何平衡至關重要'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-light text-foreground tracking-tight leading-snug">
                {t.skullTitle}
              </h2>
              <div className="space-y-4 text-base font-light text-charcoal/80 leading-relaxed">
                <p>{t.skullDesc1}</p>
                <p>{t.skullDesc2}</p>
                <p>{t.skullDesc3}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Technique — text + image */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: text */}
          <div className="space-y-6 text-center md:text-left">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary block">
              {locale === 'en' ? 'The Technique' : '技術手法'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-light text-foreground tracking-tight leading-snug">
              {t.techniqueTitle}
            </h2>
            <div className="space-y-4 text-base font-light text-charcoal/80 leading-relaxed">
              <p>{t.techniqueDesc1}</p>
              <p>{t.techniqueDesc2}</p>
              <p>{t.techniqueDesc3}</p>
            </div>
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

      {/* Section 4: Muscle Memory + Natural Approach — Full-bleed background card */}
      <section className="relative overflow-hidden py-24 text-white shadow-xl w-full border-y border-gray-100">
        {/* Background Image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src={images[2]}
            alt={locale === 'en' ? 'Shugaosha treatment result' : '修顏社療程效果'}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          {/* Dim overlay */}
          <div className="absolute inset-0 bg-black/65" />
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
          <div className="space-y-6">
            <div className="text-center lg:text-left space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary block">
                {locale === 'en' ? 'How It Works' : '療程步驟'}
              </span>
              <h2 className="text-3xl sm:text-4xl font-light text-white tracking-tight">
                {locale === 'en' ? 'HOW IT WORKS' : '療程步驟'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
              {[
                {
                  step: "01",
                  title: locale === 'en' ? "Consultation & Assessment" : "諮詢與評估",
                  desc: locale === 'en'
                    ? "Every session begins with a brief consultation to understand your concerns and goals. We then assess your facial balance and natural features to personalise your treatment."
                    : "每次療程都從簡短的諮詢開始，以了解您的需求與目標。接著，我們評估您的面部對稱度與自然特徵，為您量身定制專屬療程。"
                },
                {
                  step: "02",
                  title: locale === 'en' ? "Personalised Hands-On Treatment" : "專屬徒手療程",
                  desc: locale === 'en'
                    ? "Using The Shugaosha Way, we work layer by layer with gentle hands-on techniques, carefully tailored to support your unique facial structure and natural balance."
                    : "採用修顏社獨特的小顏手法，以溫和的徒手技術進行層層調理，精心契合您獨特的面部結構與自然平衡。"
                },
                {
                  step: "03",
                  title: locale === 'en' ? "Progressive Journey" : "漸進式改善旅程",
                  desc: locale === 'en'
                    ? "As your facial balance improves over a series of sessions, changes become more refined, harmonious and long-lasting. Regular sessions help support and maintain your results over time."
                    : "隨著您的面部平衡在連續的療程中不斷改善，效果將變得更加細緻、和諧且持久。定期療程有助支持並維持逐步累積的改善效果。"
                }
              ].map((item, index) => (
                <div key={index} className="space-y-3 text-left bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                  <div className="text-4xl font-light text-primary" style={{ fontFamily: 'var(--font-gilda-display), Georgia, serif' }}>
                    {item.step}
                  </div>
                  <h3 className="text-base font-medium text-white tracking-wide">
                    {item.title}
                  </h3>
                  <p className="text-sm font-light text-white/80 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Benefits */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="space-y-12">
          <div className="text-center md:text-left max-w-2xl md:max-w-none mx-auto md:mx-0 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary block">
              {locale === 'en' ? 'What You Can Expect' : '您可以期待的效果'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-light text-foreground tracking-tight">
              {t.coreBenefitsTitle}
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                icon: Sparkles,
                title: locale === 'en' ? 'Lifted & Refined' : '提升與緊緻',
                desc: locale === 'en' ? 'Promotes a firmer, more contoured facial appearance.' : '促進面部輪廓更加緊緻立體。'
              },
              {
                icon: Scale,
                title: locale === 'en' ? 'Facial Harmony' : '面部和諧',
                desc: locale === 'en' ? 'Encourages better balance between facial features.' : '促進面部特徵之間更好的對稱與平衡。'
              },
              {
                icon: Droplet,
                title: locale === 'en' ? 'Reduced Puffiness' : '減少浮腫',
                desc: locale === 'en' ? 'Helps minimize facial swelling and fluid retention.' : '有助於減少水分滯留與面部腫脹。'
              },
              {
                icon: Sun,
                title: locale === 'en' ? 'Refreshed Radiance' : '煥新光彩',
                desc: locale === 'en' ? 'Supports a healthier, more radiant complexion.' : '改善面部血液循環，重塑健康紅潤氣色。'
              },
              {
                icon: Smile,
                title: locale === 'en' ? 'Tension Relief' : '舒緩緊繃',
                desc: locale === 'en' ? 'Encourages relaxation of facial muscles and everyday tension.' : '促進面部肌肉深層放鬆，舒緩日常張力。'
              },
              {
                icon: Shield,
                title: locale === 'en' ? 'Youthful Glow' : '年輕光采',
                desc: locale === 'en' ? 'Supports healthier-looking skin and a naturally refreshed appearance.' : '提升肌膚活力，帶來由內而外的自然健康光澤。'
              }
            ].map((benefit, i) => {
              const IconComponent = benefit.icon
              return (
                <div
                  key={i}
                  className="bg-soft-bg border border-gray-100 rounded-2xl p-4 sm:p-5 md:p-6 flex flex-col md:flex-row gap-4 items-center md:items-start shadow-sm hover:shadow-md transition-shadow duration-300 group text-center md:text-left"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300 mx-auto md:mx-0">
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
          <div className="space-y-3 text-center md:text-left">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary block">
              {locale === 'en' ? 'ADDITIONAL BENEFITS' : '附加功效'}
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
              href="https://benotely.com/shugaosha/book"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center gap-3"
            >
              <Calendar className="w-5 h-5" />
              {locale === 'en' ? 'Book a Session' : '立即預約'}
            </a>
            <Link
              href={`/${locale}/contact`}
              className="btn-secondary flex items-center gap-3 bg-white"
            >
              {locale === 'en' ? 'Contact Us' : '聯絡我們'}
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
