'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, Globe, MessageCircle } from 'lucide-react'
import { getDictionary } from '@/utils/dictionary'

interface HeaderProps {
  locale: 'en' | 'zh'
}

export default function Header({ locale }: HeaderProps) {
  const pathname = usePathname()
  const dict = getDictionary(locale)

  const isHome = pathname === `/${locale}` || pathname === `/${locale}/` || pathname === '/'

  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(true)

  // Two-phase logo animation state:
  // logoExpanded  — controls max-width (layout space). When true, logo takes up room and nav items slide right.
  // logoOpaque    — controls opacity. Lags 350 ms behind logoExpanded on show; leads by 500 ms on hide.
  const [logoExpanded, setLogoExpanded] = useState(!isHome)
  const [logoOpaque, setLogoOpaque] = useState(!isHome)

  const logoExpandedRef = useRef(logoExpanded)
  const logoOpaqueRef = useRef(logoOpaque)

  useEffect(() => {
    logoExpandedRef.current = logoExpanded
  }, [logoExpanded])

  useEffect(() => {
    logoOpaqueRef.current = logoOpaque
  }, [logoOpaque])

  const lastScrollY = useRef(0)
  const timerExpandRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const timerOpacityRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // ── Scroll listener ────────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY
      setScrolled(currentY > 80)

      if (currentY < 80) {
        setVisible(true)
      } else if (currentY < lastScrollY.current) {
        setVisible(true)
      } else if (currentY > lastScrollY.current + 4) {
        setVisible(false)
        setIsOpen(false)
      }
      lastScrollY.current = currentY
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── Two-phase logo animation ───────────────────────────────────────────────
  useEffect(() => {
    const shouldShow = !isHome || scrolled

    if (timerExpandRef.current) clearTimeout(timerExpandRef.current)
    if (timerOpacityRef.current) clearTimeout(timerOpacityRef.current)

    if (shouldShow) {
      if (!logoExpandedRef.current && !logoOpaqueRef.current) {
        if (isHome) {
          // Scrolling down on home page: delay the entire logo animation by 0.5s (500ms)
          timerExpandRef.current = setTimeout(() => {
            setLogoExpanded(true)
            timerOpacityRef.current = setTimeout(() => {
              setLogoOpaque(true)
            }, 350)
          }, 500)
        } else {
          // Transitioning to subpage: expand immediately, fade in after 350ms
          setLogoExpanded(true)
          timerOpacityRef.current = setTimeout(() => {
            setLogoOpaque(true)
          }, 350)
        }
      } else {
        setLogoExpanded(true)
        setLogoOpaque(true)
      }
    } else {
      // Scrolling back to top on home page:
      // Fade out immediately
      setLogoOpaque(false)
      // Collapse after 500ms (when fade out is complete)
      timerExpandRef.current = setTimeout(() => {
        setLogoExpanded(false)
      }, 500)
    }

    return () => {
      if (timerExpandRef.current) clearTimeout(timerExpandRef.current)
      if (timerOpacityRef.current) clearTimeout(timerOpacityRef.current)
    }
  }, [isHome, scrolled])

  // ── Derived ───────────────────────────────────────────────────────────────
  const headerActive = scrolled || !isHome

  const navLinks = [
    { name: dict.nav.home,          path: `/${locale}` },
    { name: dict.nav.treatment,     path: `/${locale}/treatment` },
    { name: dict.nav.successStories,path: `/${locale}/success-stories` },
    { name: dict.nav.aboutUs,       path: `/${locale}/about` },
    { name: dict.nav.newsTours,     path: `/${locale}/news-tours` },
    { name: dict.nav.training,      path: `/${locale}/training` },
    { name: dict.nav.contact,       path: `/${locale}/contact` },
  ]

  const isActive = (path: string) => {
    if (path === `/${locale}`) return pathname === path
    return pathname.startsWith(path)
  }

  const getLanguageSwitchPath = (targetLocale: 'en' | 'zh') => {
    const segments = pathname.split('/')
    if (segments.length > 1 && (segments[1] === 'en' || segments[1] === 'zh')) {
      segments[1] = targetLocale
      return segments.join('/')
    }
    return `/${targetLocale}`
  }

  return (
    <>
      {/* ── Floating Island Navbar ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 transition-all duration-500
          ${visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
        `}
      >
        {/*
          Container always justify-between.
          Logo collapses to 0 width → desktop nav gets mx-auto to self-centre.
          Mobile controls (lg:hidden) naturally stay right with justify-between.
        */}
        <div
          className={`
            w-full max-w-6xl flex justify-between items-center h-16 px-6 sm:px-8
            transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
            ${headerActive
              ? 'bg-white/70 backdrop-blur-xl border border-white/30 shadow-lg shadow-black/5 rounded-[3rem]'
              : 'bg-transparent border border-transparent rounded-[3rem]'
            }
          `}
        >
          {/* ── Logo ── */}
          <Link
            href={`/${locale}`}
            className={`flex items-center flex-shrink-0 overflow-hidden
              transition-[max-width] duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
              ${logoExpanded ? 'max-w-[200px]' : 'max-w-0'}
              ${logoOpaque ? 'opacity-100' : 'opacity-0'}
              ${!logoOpaque ? 'pointer-events-none' : ''}
            `}
            style={{ transition: 'max-width 0.5s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.5s ease' }}
            aria-hidden={!logoOpaque}
            tabIndex={logoOpaque ? 0 : -1}
          >
            <Image
              src="/images/logo_light.svg"
              alt="Shugaosha Logo"
              width={180}
              height={36}
              priority
              className="w-[120px] lg:w-[180px] h-auto object-contain"
            />
          </Link>

          {/* ── Desktop Nav (lg+) — mx-auto when logo is collapsed to centre items ── */}
          <nav
            className={`hidden lg:flex space-x-6 items-center transition-all duration-500
              ${logoExpanded ? '' : 'mx-auto'}
            `}
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-sm tracking-wide relative py-1 transition-colors duration-300
                  ${isActive(link.path)
                    ? 'font-medium text-primary'
                    : 'font-light text-charcoal/80 hover:text-primary'
                  }
                `}
              >
                {link.name}
              </Link>
            ))}

            {/* Language Switcher */}
            <div className="flex items-center space-x-2 border-l pl-5 ml-1 border-gray-200">
              <Globe className="w-3.5 h-3.5 text-charcoal/50" />
              {locale === 'en' ? (
                <Link
                  href={getLanguageSwitchPath('zh')}
                  className="text-xs font-light transition-colors duration-300 text-charcoal hover:text-primary"
                >
                  中文
                </Link>
              ) : (
                <Link
                  href={getLanguageSwitchPath('en')}
                  className="text-xs font-light transition-colors duration-300 text-charcoal hover:text-primary"
                >
                  Eng
                </Link>
              )}
            </div>

            {/* CTA Book Button */}
            <a
              href="https://wa.me/61493552213"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-book-nav flex items-center gap-1.5 text-xs font-medium tracking-widest uppercase px-4 py-2 rounded-[3rem] bg-primary text-white hover:bg-primary/90 hover:scale-[1.03]"
              style={{ transition: 'transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94), background 0.3s ease' }}
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{locale === 'en' ? 'Book' : '預約'}</span>
            </a>
          </nav>

          {/* ── Mobile / Tablet hamburger (below lg) — always right with ml-auto ── */}
          <div className="lg:hidden flex items-center space-x-3 ml-auto">
            <Link
              href={getLanguageSwitchPath(locale === 'en' ? 'zh' : 'en')}
              className="text-xs border rounded-full px-2.5 py-1 transition-colors text-charcoal border-gray-200 hover:border-primary hover:text-primary"
            >
              {locale === 'en' ? '中文' : 'Eng'}
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 transition-colors text-charcoal hover:text-primary"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Drawer (mobile & tablet, below lg) ── */}
      <div
        className={`fixed inset-y-0 right-0 w-72 bg-white/95 backdrop-blur-2xl shadow-2xl z-[60] transform transition-transform duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] lg:hidden
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex justify-end p-6">
          <button onClick={() => setIsOpen(false)} className="text-charcoal hover:text-primary p-2 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex flex-col space-y-6 px-8 mt-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => setIsOpen(false)}
              className={`text-base tracking-wide transition-all duration-300
                ${isActive(link.path) ? 'text-primary font-medium' : 'text-charcoal font-light hover:text-primary'}`}
            >
              {link.name}
            </Link>
          ))}

          <div className="pt-6 border-t border-gray-100">
            <div className="flex space-x-4">
              <Link
                href={getLanguageSwitchPath('en')}
                onClick={() => setIsOpen(false)}
                className={`text-sm ${locale === 'en' ? 'text-primary font-medium' : 'text-charcoal font-light'}`}
              >
                Eng
              </Link>
              <Link
                href={getLanguageSwitchPath('zh')}
                onClick={() => setIsOpen(false)}
                className={`text-sm ${locale === 'zh' ? 'text-primary font-medium' : 'text-charcoal font-light'}`}
              >
                中文
              </Link>
            </div>
          </div>
        </nav>
      </div>

      {/* ── Overlay ── */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[55] lg:hidden"
        />
      )}
    </>
  )
}
