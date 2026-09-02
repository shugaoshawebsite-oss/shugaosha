'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ChevronDown,
  MapPin,
  Clock,
  DollarSign,
  Star,
  Award,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
} from 'lucide-react'
import caseStudiesData from '../../../content/caseStudies.json'
import enDict from '@/dictionaries/en.json'

/* ─── WhatsApp SVG Component ────────────────────────────────────────── */
function WhatsAppIcon({ size = 18, color = 'currentColor', className = '' }: { size?: number; color?: string; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill={color}
      className={`shrink-0 inline-block align-middle ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>WhatsApp</title>
      <path d="M26.576 5.363c-2.69-2.69-6.406-4.354-10.511-4.354-8.209 0-14.865 6.655-14.865 14.865 0 2.732 0.737 5.291 2.022 7.491l-0.038-0.070-2.109 7.702 7.879-2.067c2.051 1.139 4.498 1.809 7.102 1.809h0.006c8.209-0.003 14.862-6.659 14.862-14.868 0-4.103-1.662-7.817-4.349-10.507l0 0zM16.062 28.228h-0.005c-0 0-0.001 0-0.001 0-2.319 0-4.489-0.64-6.342-1.753l0.056 0.031-0.451-0.267-4.675 1.227 1.247-4.559-0.294-0.467c-1.185-1.862-1.889-4.131-1.889-6.565 0-6.822 5.531-12.353 12.353-12.353s12.353 5.531 12.353 12.353c0 6.822-5.53 12.353-12.353 12.353h-0zM22.838 18.977c-0.371-0.186-2.197-1.083-2.537-1.208-0.341-0.124-0.589-0.185-0.837 0.187-0.246 0.371-0.958 1.207-1.175 1.455-0.216 0.249-0.434 0.279-0.805 0.094-1.15-0.466-2.138-1.087-2.997-1.852l0.010 0.009c-0.799-0.74-1.484-1.587-2.037-2.521l-0.028-0.052c-0.216-0.371-0.023-0.572 0.162-0.757 0.167-0.166 0.372-0.434 0.557-0.65 0.146-0.179 0.271-0.384 0.366-0.604l0.006-0.017c0.043-0.087 0.068-0.188 0.068-0.296 0-0.131-0.037-0.253-0.101-0.357l0.002 0.003c-0.094-0.186-0.836-2.014-1.145-2.758-0.302-0.724-0.609-0.625-0.836-0.637-0.216-0.010-0.464-0.012-0.712-0.012-0.395 0.010-0.746 0.188-0.988 0.463l-0.001 0.002c-0.802 0.761-1.3 1.834-1.3 3.023 0 0.026 0 0.053 0.001 0.079l-0-0.004c0.131 1.467 0.681 2.784 1.527 3.857l-0.012-0.015c1.604 2.379 3.742 4.282 6.251 5.564l0.094 0.043c0.548 0.248 1.25 0.513 1.968 0.74l0.149 0.041c0.442 0.14 0.951 0.221 1.479 0.221 0.303 0 0.601-0.027 0.889-0.078l-0.031 0.004c1.069-0.223 1.956-0.868 2.497-1.749l0.009-0.017c0.165-0.366 0.261-0.793 0.261-1.242 0-0.185-0.016-0.366-0.047-0.542l0.003 0.019c-0.092-0.155-0.34-0.247-0.712-0.434z" />
    </svg>
  )
}

/* ─── Homepage Data ─────────────────────────────────────────────────── */
const homepageFaq = enDict.home.faq
const homepageBenefits = enDict.home.whatWeDo.benefits

/* Get latest case study from CRM JSON */
const latestCaseStudy = caseStudiesData && caseStudiesData.length > 0
  ? caseStudiesData[caseStudiesData.length - 1]
  : null

function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="flex flex-col gap-3">
      {homepageFaq.items.map((item, idx) => {
        const isOpen = openIndex === idx
        return (
          <div
            key={idx}
            className={`border rounded-2xl bg-white overflow-hidden transition-all duration-200 ${
              isOpen ? 'border-primary/30 shadow-sm' : 'border-black/[0.07] hover:border-black/15'
            }`}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="w-full flex justify-between items-center px-6 py-4 sm:py-5 text-left bg-transparent border-0 cursor-pointer focus:outline-none"
              aria-expanded={isOpen}
            >
              <span
                className={`text-sm font-semibold leading-snug transition-colors duration-200 ${
                  isOpen ? 'text-primary' : 'text-foreground'
                }`}
              >
                {item.question}
              </span>
              <ChevronDown
                className={`w-4 h-4 shrink-0 ml-4 transition-transform duration-300 ${
                  isOpen ? 'rotate-180 text-primary' : 'text-charcoal/60'
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? 'max-h-[600px] opacity-100 border-t border-black/[0.05]' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-6 py-4 text-[13px] leading-relaxed text-charcoal/80 bg-[#fcfcfc] whitespace-pre-line">
                {item.answer}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function BookingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f9f7f5]">
      {/* ══════════════════════════════════════════════
          1. TOP BAR
      ══════════════════════════════════════════════ */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-black/[0.06]">
        <div className="max-w-[1200px] mx-auto px-5 h-[62px] flex items-center justify-between gap-4">
          {/* Logo: uses /images/logo_light.svg */}
          <Link href="/en" className="flex items-center shrink-0">
            <Image
              src="/images/logo_light.svg"
              alt="Shugaosha"
              width={150}
              height={32}
              priority
              className="h-auto w-[125px] sm:w-[140px]"
            />
          </Link>

          {/* Right: Trust pill + WhatsApp button */}
          <div className="flex items-center gap-2 sm:gap-3 flex-nowrap">
            <span className="inline-flex items-center gap-1.5 bg-primary/[0.08] border border-primary/20 rounded-full px-3 py-1 text-xs font-semibold text-primary whitespace-nowrap">
              <Star className="w-3 h-3 fill-primary text-primary" />
              5.0 ★&nbsp;&nbsp;(51+ Reviews)
            </span>

            <a
              href="https://wa.me/61493552213"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white! text-xs font-semibold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-sm hover:shadow transition-all whitespace-nowrap"
              aria-label="Direct WhatsApp Booking"
            >
              <WhatsAppIcon size={15} color="#ffffff" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* ══════════════════════════════════════════════
            2. SPLIT HERO & LIVE BOOKING SECTION
        ══════════════════════════════════════════════ */}
        <section className="bg-gradient-to-b from-white via-[#fdf9f7] to-[#faf4f1] pt-8 sm:pt-10 pb-12 sm:pb-14 border-b border-black/[0.04]">
          <div className="max-w-[1200px] mx-auto px-5">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              {/* ── LEFT COLUMN (Desktop col-span-5) ── */}
              <div className="hidden lg:block lg:col-span-5 space-y-5">
                {/* Badge */}
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span className="text-[10px] font-bold tracking-widest uppercase text-primary">
                    Sydney Studio · Gladesville NSW
                  </span>
                </div>

                {/* H1 */}
                <h1 className="font-serif text-3xl xl:text-4xl font-normal leading-[1.15] text-foreground">
                  Rediscover Natural Facial Balance & Contour
                </h1>

                {/* Subtext */}
                <p className="text-sm font-normal leading-relaxed text-charcoal max-w-[36ch]">
                  100% hands-on Japanese facial alignment. Targets muscle tension, puffiness, and asymmetry with zero machines and zero downtime.
                </p>

                {/* Key Details Card */}
                <div className="bg-white border border-black/[0.07] rounded-2xl p-4 flex items-center gap-3 flex-wrap shadow-xs">
                  <div className="flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-primary" />
                    <span className="text-xs font-semibold text-foreground">$200 per session</span>
                  </div>
                  <span className="text-gray-300">·</span>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-primary" />
                    <span className="text-xs font-medium text-charcoal">45–60 mins</span>
                  </div>
                  <span className="text-gray-300">·</span>
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                    <span className="text-xs font-medium text-charcoal">Private Studio</span>
                  </div>
                </div>

                {/* Latest Before/After visual proof from CRM */}
                {latestCaseStudy && (
                  <div className="space-y-1.5">
                    <div className="relative rounded-2xl overflow-hidden border border-black/[0.08] bg-gray-100 shadow-sm">
                      <div className="relative w-full aspect-16/9">
                        <Image
                          src={latestCaseStudy.imageRelativeUrl}
                          alt="Latest Real Client Progression"
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 420px"
                        />
                      </div>
                      <div className="px-3 py-2 bg-white flex justify-between items-center border-t border-black/[0.05]">
                        <span className="text-[11px] font-semibold text-primary">
                          {latestCaseStudy.sessionsCount} Sessions Result
                        </span>
                        {latestCaseStudy.specialist && (
                          <span className="text-[10px] text-charcoal/70 font-medium">
                            Specialist: {latestCaseStudy.specialist}
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-[11px] font-medium text-charcoal text-center tracking-wide">
                      Immediate natural lift & symmetry
                    </p>
                  </div>
                )}

                {/* Awards Badge */}
                <div>
                  <span className="inline-flex items-center gap-2 bg-gradient-to-r from-[#fffbf0] to-[#fff8e6] border border-[#f0d99a] rounded-xl px-3.5 py-2 text-[11px] font-semibold text-[#92700a] leading-tight">
                    <Award className="w-4 h-4 text-[#92700a] shrink-0" />
                    2026 Northern Districts Local Business Awards Finalist
                  </span>
                </div>
              </div>

              {/* ── RIGHT COLUMN (col-span-7 on desktop, full width on mobile) ── */}
              <div className="col-span-1 lg:col-span-7">
                {/* Mobile Layout Compact Headings */}
                <div className="block lg:hidden mb-6 text-center space-y-2">
                  <div className="flex items-center justify-center gap-1.5">
                    <MapPin className="w-3 h-3 text-primary" />
                    <span className="text-[10px] font-bold tracking-widest uppercase text-primary">
                      Sydney Studio · Gladesville NSW
                    </span>
                  </div>
                  <h1 className="font-serif text-2xl sm:text-3xl font-normal leading-tight text-foreground px-2">
                    Rediscover Natural Facial Balance & Contour
                  </h1>
                  <div className="flex items-center justify-center gap-2.5 flex-wrap pt-1">
                    <span className="inline-flex items-center gap-1.5 bg-primary/[0.08] border border-primary/20 rounded-full px-3 py-1 text-xs font-semibold text-primary">
                      <Star className="w-3 h-3 fill-primary text-primary" />
                      5.0 ★ (51+ Reviews)
                    </span>
                    <span className="inline-flex items-center gap-1 bg-white border border-black/[0.08] rounded-full px-3 py-1 text-xs font-semibold text-foreground shadow-2xs">
                      <DollarSign className="w-3 h-3 text-primary" />
                      $200 / session
                    </span>
                  </div>
                </div>

                {/* Embedded Booking Container */}
                <div className="bg-white rounded-2xl border border-black/[0.08] shadow-xl shadow-black/5 overflow-hidden">
                  {/* Live indicator header */}
                  <div className="px-4 sm:px-5 py-3 border-b border-black/[0.06] flex items-center justify-between bg-[#fafaf9]">
                    <span className="flex items-center text-xs font-semibold text-gray-700">
                      <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-2" />
                      Live Availability
                    </span>
                    <span className="text-[11px] text-gray-400 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      Instant confirmation
                    </span>
                  </div>

                  {/* Iframe */}
                  <div>
                    <iframe
                      src="https://benotely.com/shugaosha/book"
                      title="Book Shugaosha Japanese Facial Alignment Session"
                      className="w-full min-h-[580px] border-0 block"
                      loading="eager"
                      allow="payment"
                    />
                  </div>

                  {/* Fallback helper row — with smaller WhatsApp icon */}
                  <div className="px-4 sm:px-5 py-3.5 border-t border-black/[0.06] flex items-center justify-center gap-4 sm:gap-6 bg-[#fafaf9] flex-wrap text-xs">
                    <span className="text-gray-400 text-xs">Prefer chat?</span>
                    <a
                      href="https://wa.me/61493552213"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
                    >
                      <WhatsAppIcon size={13} color="#16a34a" />
                      Book via WhatsApp
                    </a>
                    <span className="text-gray-300">·</span>
                    <a
                      href="https://benotely.com/shugaosha/book"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-semibold text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Open Fullscreen
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            3. BENEFITS OF THE SHUGAOSHA WAY (Homepage Benefits)
        ══════════════════════════════════════════════ */}
        <section className="py-14 sm:py-16 px-5 bg-white border-b border-black/[0.05]">
          <div className="max-w-[1100px] mx-auto space-y-10">
            <div className="text-center space-y-2">
              <span className="type-label text-primary">
                The Shugaosha Difference
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-foreground">
                {enDict.home.whatWeDo.benefitsTitle || 'Benefits of The Shugaosha Way'}
              </h2>
            </div>

            {/* 6 Benefits Grid from Homepage */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {homepageBenefits.map((benefitText, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-gray-100 rounded-2xl p-5 flex items-start gap-3.5 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5 hover:border-primary/20 transition-all duration-300"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/[0.08] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-sm font-medium leading-relaxed text-foreground m-0">
                    {benefitText}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            4. FAQ (Homepage FAQs)
        ══════════════════════════════════════════════ */}
        <section className="py-16 px-5 bg-[#f9f7f5]">
          <div className="max-w-[780px] mx-auto space-y-10">
            <div className="text-center space-y-2">
              <span className="type-label text-primary">
                {homepageFaq.subtitle || 'Common Questions'}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-foreground">
                {homepageFaq.title || 'Frequently Asked Questions'}
              </h2>
            </div>

            {/* Complete Accordion of Homepage FAQs */}
            <FaqAccordion />

            {/* Still have questions WhatsApp CTA Card */}
            <div className="text-center bg-white border border-black/[0.06] rounded-2xl p-8 shadow-sm space-y-3">
              <p className="text-base font-semibold text-foreground m-0">
                {homepageFaq.stillHaveQuestions || 'Still have questions?'}
              </p>
              <p className="text-sm text-charcoal/80 max-w-md mx-auto leading-relaxed">
                {homepageFaq.contactUsText || "We'd love to hear from you. Please feel free to contact us—we're happy to help."}
              </p>
              <div className="pt-2">
                <a
                  href="https://wa.me/61493552213"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white! text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded-full shadow-sm hover:shadow transition-all"
                >
                  <WhatsAppIcon size={16} color="#ffffff" />
                  <span>Message us on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ══════════════════════════════════════════════
          5. COMPACT FOOTER & LOCATION
      ══════════════════════════════════════════════ */}
      <footer className="bg-[#1a1b1e] text-white pt-12 pb-8 px-5">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 items-start">
          {/* Brand Logo & Intro */}
          <div className="space-y-3">
            <Image
              src="/images/logo_dark.svg"
              alt="Shugaosha"
              width={130}
              height={26}
              className="h-auto w-[110px]"
            />
            <p className="text-xs font-light leading-relaxed text-white/55 max-w-[34ch]">
              Supporting balance, alignment, confidence and a more lifted, refined appearance through precise, hands-on facial correction.
            </p>
          </div>

          {/* Studio Location & Hours */}
          <div className="space-y-2.5">
            <span className="block text-[10px] font-bold tracking-widest uppercase text-primary">
              Studio Location
            </span>
            <div className="flex gap-2 items-start">
              <MapPin className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
              <address className="text-xs not-italic leading-relaxed text-white/75">
                5 Pittwater Road<br />Gladesville NSW 2111
              </address>
            </div>
            <div className="flex gap-2 items-start">
              <Clock className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
              <div className="text-xs leading-relaxed text-white/55">
                <div>Mon – Sat: 9:00 am – 7:00 pm</div>
                <div>Sunday: By appointment</div>
              </div>
            </div>
          </div>

          {/* Quick WhatsApp Link */}
          <div className="space-y-2.5">
            <span className="block text-[10px] font-bold tracking-widest uppercase text-primary">
              Quick Booking
            </span>
            <p className="text-xs text-white/55 leading-relaxed">
              Ready to begin? Book online or message us instantly on WhatsApp.
            </p>
            <div>
              <a
                href="https://wa.me/61493552213"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white! text-xs font-semibold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-sm hover:shadow transition-all"
              >
                <WhatsAppIcon size={14} color="#ffffff" />
                <span>Book via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Sub-footer */}
        <div className="max-w-[1100px] mx-auto mt-10 pt-5 border-t border-white/[0.08] flex justify-between items-center flex-wrap gap-3">
          <p className="text-[11px] text-white/30 font-light">
            © {new Date().getFullYear()} Shugaosha. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/en/appointment-policy" className="text-[11px] text-white/35 hover:text-white/70 transition-colors">
              Appointment Policy
            </Link>
            <Link href="/en" className="text-[11px] text-white/35 hover:text-white/70 transition-colors">
              Back to Home
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
