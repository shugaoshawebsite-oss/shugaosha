import Link from 'next/link'
import Image from 'next/image'
import { getDictionary } from '@/utils/dictionary'
import { Scale, Sparkles, Sun, Heart, Calendar } from 'lucide-react'
import TreatmentVideo from '@/components/TreatmentVideo'

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function ServicesPage({ params }: PageProps) {
  const { locale: rawLocale } = await params
  const locale = (rawLocale === 'zh' ? 'zh' : 'en') as 'en' | 'zh'
  const dict = getDictionary(locale)
  const t = dict.treatment

  const benefitIcons = [Scale, Sparkles, Sun, Heart]

  return (
    <div className="flex flex-col space-y-24 md:space-y-32 pb-24">

      {/* Page Header */}
      <section className="relative min-h-[40vh] flex items-center overflow-hidden w-full">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/images/hero3.webp"
            alt="Services Heading Background"
            fill
            priority
            className="object-cover opacity-80"
          />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-36 pb-24 text-left">
          <span className="type-label text-charcoal/70 block mb-3">
            {t.tag}
          </span>
          <h1 className="type-hero text-charcoal">
            {t.title}
          </h1>
          <p className="type-body text-charcoal/80 max-w-xl mt-4">
            {t.tagline}
          </p>
        </div>
      </section>

      {/* Section 1: How Are They Different? + Video */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left Column: Two services and how they work together */}
          <div className="lg:col-span-7 space-y-10 text-left">
            <div className="space-y-3">
              <span className="type-label text-primary block">
                {t.diffTag}
              </span>
            </div>

            {/* Service 1: The Shugaosha Way — Foundation */}
            <div className="space-y-3 p-6 sm:p-8 rounded-2xl bg-soft-bg border border-gray-100">
              <h3 className="type-card-title text-foreground font-semibold">
                {t.foundation.title}
              </h3>
              <div className="type-body text-charcoal/80 space-y-3 leading-relaxed">
                <p>{t.foundation.p1}</p>
              </div>
            </div>

            {/* Service 2: The Shugaosha Lift */}
            <div className="space-y-3 p-6 sm:p-8 rounded-2xl bg-soft-bg border border-gray-100">
              <h3 className="type-card-title text-foreground font-semibold">
                {t.lift.title}
              </h3>
              <div className="type-body text-charcoal/80 space-y-3 leading-relaxed">
                <p>{t.lift.p1}</p>
              </div>
            </div>

            {/* How They Work Together */}
            <div className="space-y-3 p-6 sm:p-8 rounded-2xl bg-white border border-primary/20 shadow-sm">
              <h3 className="type-card-title text-primary font-semibold">
                {t.together.title}
              </h3>
              <div className="type-body text-charcoal/80 space-y-3 leading-relaxed">
                <p>{t.together.p1}</p>
                <p>{t.together.p2}</p>
              </div>
            </div>

            {/* 3 icons */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
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
                <span className="text-xs font-medium text-charcoal/90">{locale === 'en' ? 'No Needles' : '無針'}</span>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-12 h-12 relative flex items-center justify-center">
                  <Image src="/assets/3no.svg" alt="No Surgery" fill className="object-contain" />
                </div>
                <span className="text-xs font-medium text-charcoal/90">{locale === 'en' ? 'No Surgery' : '無手術'}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Portrait Video */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="relative aspect-[9/16] max-h-[620px] w-full max-w-[340px] mx-auto bg-black border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
              <TreatmentVideo
                src="/assets/treatment.mp4"
                poster="/assets/specialist/specialist_teresa_soo.avif"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: What to Expect / How It Works */}
      <section className="relative overflow-hidden py-24 text-white shadow-xl w-full border-y border-gray-100">
        {/* Background Image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/assets/Artboard 3 copyphoto.webp"
            alt="How It Works Background"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          {/* Dim overlay */}
          <div className="absolute inset-0 bg-black/70" />
        </div>

        {/* Content */}
        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
          <div className="space-y-10">
            <div className="text-center md:text-left space-y-3">
              <span className="type-label !text-white/90 text-white/90 block">
                {t.expectTag}
              </span>
              <h2 className="type-heading !text-white text-white">
                {t.expectTitle}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {t.steps.map((item, index) => (
                <div key={index} className="space-y-4 text-center md:text-left bg-white/10 border border-white/15 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
                  <div className="text-3xl font-light !text-white text-white tracking-wide text-center md:text-left">
                    {item.step}
                  </div>
                  <h3 className="type-card-title !text-white text-white font-medium">
                    {item.title}
                  </h3>
                  <p className="type-body text-white/80 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: What You Can Expect / Core Benefits (4 Cards) */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="space-y-12">
          <div className="text-center md:text-left max-w-2xl md:max-w-none mx-auto md:mx-0 space-y-4">
            <span className="type-label text-primary block">
              {t.benefitsTag}
            </span>
            <h2 className="type-heading text-foreground">
              {t.benefitsTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.benefits.map((benefit, i) => {
              const IconComponent = benefitIcons[i % benefitIcons.length]
              return (
                <div
                  key={i}
                  className="bg-soft-bg border border-gray-100 rounded-2xl p-6 flex flex-col space-y-4 shadow-sm hover:shadow-md transition-shadow duration-300 group text-center sm:text-left"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300 mx-auto sm:mx-0">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="space-y-2 text-center sm:text-left">
                    <h3 className="type-card-title text-foreground font-semibold">
                      {benefit.title}
                    </h3>
                    <p className="type-body text-charcoal/80 leading-relaxed">
                      {benefit.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Section 4: CTA Section */}
      <section className="w-full bg-primary/5 border-y border-primary/10 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center md:text-left space-y-8">
          <h2 className="type-heading text-foreground max-w-xl mx-auto md:mx-0">
            {t.cta.title}
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
            <a
              href="https://benotely.com/shugaosha/book"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center gap-3"
            >
              <Calendar className="w-5 h-5" />
              {t.cta.bookButton}
            </a>
            <Link
              href={`/${locale}/contact`}
              className="btn-secondary flex items-center gap-3 bg-white"
            >
              {t.cta.contactButton}
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
