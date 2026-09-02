import { Calendar, Sparkles, Scale } from 'lucide-react'

interface ServicesSectionProps {
  dict: any
  locale: 'en' | 'zh'
}

export default function ServicesSection({ dict, locale }: ServicesSectionProps) {
  const s = dict.home.servicesSection

  return (
    <section id="services" className="scroll-mt-24 py-20 bg-[#fafafa]/80 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="type-label text-primary">
            {s.tag}
          </span>
          <h2 className="type-heading text-foreground">
            {s.title}
          </h2>
          {s.subtitle && (
            <p className="type-body-sm text-charcoal/70">
              {s.subtitle}
            </p>
          )}
        </div>

        {/* 2 Service Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          
          {/* Card 1: The Shugaosha Way — Foundation */}
          <div className="bg-white rounded-[2rem] p-8 sm:p-10 border border-gray-100/90 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-8 relative overflow-hidden group">
            <div className="space-y-6">
              {/* Header Badge & Icon */}
              <div className="flex items-center justify-between gap-4">
                <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary">
                  {s.foundation.badge}
                </span>
                <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary">
                  <Scale className="w-5 h-5" />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-2xl sm:text-3xl font-light text-foreground tracking-tight">
                {s.foundation.title}
              </h3>

              {/* Description Paragraphs */}
              <div className="space-y-4 text-sm sm:text-base font-light text-charcoal/80 leading-relaxed">
                <p>{s.foundation.p1}</p>
                <p>{s.foundation.p2}</p>
                <p>{s.foundation.p3}</p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4 border-t border-gray-100/80">
              <a
                href="https://benotely.com/shugaosha/book"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2.5"
              >
                <Calendar className="w-4 h-4" />
                <span>{s.foundation.bookButton}</span>
              </a>
            </div>
          </div>

          {/* Card 2: The Shugaosha Lift */}
          <div className="bg-white rounded-[2rem] p-8 sm:p-10 border border-gray-100/90 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-8 relative overflow-hidden group">
            <div className="space-y-6">
              {/* Header Badge & Icon */}
              <div className="flex items-center justify-between gap-4">
                <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary">
                  {s.lift.badge}
                </span>
                <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary">
                  <Sparkles className="w-5 h-5" />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-2xl sm:text-3xl font-light text-foreground tracking-tight">
                {s.lift.title}
              </h3>

              {/* Description Paragraphs */}
              <div className="space-y-4 text-sm sm:text-base font-light text-charcoal/80 leading-relaxed">
                <p>{s.lift.p1}</p>
                <p>{s.lift.p2}</p>
                <p>{s.lift.p3}</p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4 border-t border-gray-100/80">
              <a
                href="https://benotely.com/shugaosha/book"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2.5"
              >
                <Calendar className="w-4 h-4" />
                <span>{s.lift.bookButton}</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
