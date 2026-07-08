'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { MessageCircle } from 'lucide-react'
import logoPortrait from '@/images/logo-portrait.svg'

gsap.registerPlugin(useGSAP)

interface HeroSectionProps {
  locale: 'en' | 'zh'
  dict: any
}

export default function HeroSection({ locale, dict }: HeroSectionProps) {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        gsap.from('.hero-logo', {
          y: 20,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          delay: 0.15,
        })

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

        gsap.from('.hero-scroll-indicator', {
          y: -10,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: 1.1,
        })
      }, containerRef)

      return () => ctx.revert()
    },
    { scope: containerRef }
  )

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    })
  }

  // Split the title into the two visual parts
  // EN: "THE SHUGAOSHA" (sans) + "WAY" (serif italic)
  // ZH: Use the title as-is with a stylistic split
  const titleSans = locale === 'en' ? 'THE SHUGAOSHA' : 'THE SHUGAOSHA'
  const titleSerif = locale === 'en' ? 'WAY' : 'WAY'

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden text-charcoal bg-white"
      aria-label="Hero"
    >
      {/* Content — centered on mobile, bottom-left on desktop, vertically middle in tablet/desktop */}
      <div className="w-full max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 py-20 md:py-0 space-y-8 flex flex-col items-center md:items-start text-center md:text-left">

        {/* Portrait Logo */}
        <div className="hero-logo w-[150px] md:w-[200px] mx-auto md:mx-0">
          <Image
            src={logoPortrait}
            alt="Shugaosha"
            width={200}
            height={200}
            priority
            className="w-full h-auto mb-2 object-contain"
          />
        </div>

        {/* Typography: same font size, "THE SHUGAOSHA" in primary, "WAY" in charcoal */}
        <div className="space-y-2 leading-none w-full text-center md:text-left">
          <div
            className="hero-title-sans block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light uppercase tracking-tight text-primary"
            style={{ fontFamily: 'var(--font-gilda-display), Georgia, serif' }}
          >
            {titleSans}
          </div>
          <div
            className="hero-title-serif block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light uppercase tracking-tight text-charcoal"
            style={{ fontFamily: 'var(--font-gilda-display), Georgia, serif' }}
          >
            {titleSerif}
          </div>
        </div>

        {/* Description / Statement Block */}
        <div className="hero-desc space-y-3 max-w-lg mx-auto md:mx-0 text-charcoal/90">
          <p className="text-2xl sm:text-3xl font-light tracking-wide text-primary" style={{ fontFamily: 'var(--font-gilda-display), Georgia, serif' }}>
            {dict.home.hero.tagline}
          </p>
          <p className="text-sm sm:text-base font-medium tracking-[0.2em] uppercase text-charcoal/70">
            {dict.home.hero.subtitle}
          </p>
          <p className="text-base sm:text-lg font-light text-charcoal/80 leading-relaxed pt-1">
            {dict.home.hero.description}
          </p>
        </div>

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
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <button
        onClick={handleScrollDown}
        className="hero-scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 cursor-pointer z-20 focus:outline-none"
        aria-label={locale === 'en' ? 'Scroll down to content' : '向下滾動至內容'}
      >
        <span className="text-[10px] uppercase tracking-widest font-light text-charcoal/50">
          {locale === 'en' ? 'Scroll Down' : '向下滾動'}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5 text-primary animate-bounce"
        >
          <path d="M12 5v14" />
          <path d="m19 12-7 7-7-7" />
        </svg>
      </button>

      {/* Social Links — vertical on right side */}
      <div className="hero-social-v absolute right-6 sm:right-10 top-1/2 -translate-y-1/2 flex flex-col gap-5 z-20">
        <a
          href="https://www.facebook.com/shugaosha"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-full bg-charcoal/5 hover:bg-charcoal/10 border border-charcoal/10 hover:border-charcoal/20 text-charcoal transition-all hover:scale-110 flex items-center justify-center"
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
          className="p-2.5 rounded-full bg-charcoal/5 hover:bg-charcoal/10 border border-charcoal/10 hover:border-charcoal/20 text-charcoal transition-all hover:scale-110 flex items-center justify-center"
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
