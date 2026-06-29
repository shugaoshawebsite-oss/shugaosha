'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { MessageCircle, ArrowRight } from 'lucide-react'

gsap.registerPlugin(useGSAP)

interface HeroSectionProps {
  locale: 'en' | 'zh'
  dict: {
    home: {
      hero: {
        title: string
        description: string
      }
    }
  }
}

export default function HeroSection({ locale, dict }: HeroSectionProps) {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        gsap.from('.hero-title-sans', {
          y: 40,
          opacity: 0,
          duration: 1.0,
          ease: 'power3.out',
          delay: 0.3,
        })

        gsap.from('.hero-title-serif', {
          y: 50,
          opacity: 0,
          duration: 1.1,
          ease: 'power3.out',
          delay: 0.45,
        })

        gsap.from('.hero-desc', {
          y: 30,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          delay: 0.62,
        })

        gsap.from('.hero-cta > *', {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.08,
          delay: 0.78,
        })

        gsap.from('.hero-social-v > *', {
          x: 20,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.1,
          delay: 0.95,
        })
      }, containerRef)

      return () => ctx.revert()
    },
    { scope: containerRef }
  )

  // Split the title into the two visual parts
  // EN: "THE SHUGAOSHA" (sans) + "WAY" (serif italic)
  // ZH: Use the title as-is with a stylistic split
  const titleSans = locale === 'en' ? 'THE SHUGAOSHA' : 'THE SHUGAOSHA'
  const titleSerif = locale === 'en' ? 'WAY' : 'WAY'

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] flex items-center md:items-end overflow-hidden text-white"
      aria-label="Hero"
    >
      {/* Full-bleed Background Video / Image Cover */}
      <div className="absolute inset-0 -z-10 bg-black">
        {/* Desktop video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="hidden md:block w-full h-full object-cover object-center opacity-85"
        >
          <source src="/assets/home_hero.webm" type="video/webm" />
          <source src="/assets/home_hero.mp4" type="video/mp4" />
        </video>
        {/* Mobile image cover */}
        <div className="block md:hidden absolute inset-0">
          <Image
            src="/assets/herocover.webp"
            alt="Hero Background"
            fill
            priority
            className="object-cover object-center opacity-85"
          />
        </div>
        {/* Gradient overlay: heavy at bottom, fades to transparent at top */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/15" />
      </div>

      {/* Content — centered on mobile, bottom-left on desktop */}
      <div className="w-full max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 pt-28 pb-20 md:pt-0 md:pb-28 space-y-8 flex flex-col items-center md:items-start text-center md:text-left">

        {/* Typography: same font size, "THE SHUGAOSHA" in primary, "WAY" in white */}
        <div className="space-y-2 leading-none w-full text-center md:text-left">
          <div
            className="hero-title-sans block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light uppercase tracking-tight text-primary"
            style={{ fontFamily: 'var(--font-gilda-display), Georgia, serif' }}
          >
            {titleSans}
          </div>
          <div
            className="hero-title-serif block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light uppercase tracking-tight text-white"
            style={{ fontFamily: 'var(--font-gilda-display), Georgia, serif' }}
          >
            {titleSerif}
          </div>
        </div>

        {/* Description */}
        <p className="hero-desc text-base sm:text-lg font-light text-white/80 leading-relaxed max-w-lg mx-auto md:mx-0">
          {dict.home.hero.description}
        </p>

        {/* CTA Buttons */}
        <div className="hero-cta flex flex-col sm:flex-row items-center md:items-start gap-4 w-full justify-center md:justify-start">
          <a
            href="https://wa.me/61493552213"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4 relative z-10" />
            <span className="relative z-10">
              {locale === 'en' ? 'Book a Session' : '立即預約'}
            </span>
          </a>
          <Link
            href={`/${locale}/treatment`}
            className="btn-secondary-white flex items-center gap-2"
          >
            <span className="relative z-10">
              {locale === 'en' ? 'Learn About the Treatment' : '了解療程詳情'}
            </span>
            <ArrowRight className="w-4 h-4 relative z-10" />
          </Link>
        </div>
      </div>

      {/* Social Links — vertical on right side */}
      <div className="hero-social-v absolute right-6 sm:right-10 top-1/2 -translate-y-1/2 flex flex-col gap-5 z-20">
        <a
          href="https://www.facebook.com/shugaosha"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/30 text-white transition-all hover:scale-110 flex items-center justify-center"
          aria-label="Facebook"
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
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
          </svg>
        </a>
        <a
          href="https://www.instagram.com/shugaosha"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/30 text-white transition-all hover:scale-110 flex items-center justify-center"
          aria-label="Instagram"
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
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
          </svg>
        </a>
      </div>
    </section>
  )
}
