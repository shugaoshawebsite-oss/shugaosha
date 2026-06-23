'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, Globe } from 'lucide-react'
import { getDictionary } from '@/utils/dictionary'

interface HeaderProps {
  locale: 'en' | 'zh'
}

export default function Header({ locale }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const dict = getDictionary(locale)

  const navLinks = [
    { name: dict.nav.home, path: `/${locale}` },
    { name: dict.nav.successStories, path: `/${locale}/success-stories` },
    { name: dict.nav.aboutUs, path: `/${locale}/about` },
    { name: dict.nav.newsTours, path: `/${locale}/news-tours` },
    { name: dict.nav.contact, path: `/${locale}/contact` },
  ]

  // Determine active route (exact or parent match for subroutes)
  const isActive = (path: string) => {
    if (path === `/${locale}`) {
      return pathname === path
    }
    return pathname.startsWith(path)
  }

  // Get path for the opposite language
  const getLanguageSwitchPath = (targetLocale: 'en' | 'zh') => {
    const segments = pathname.split('/')
    if (segments.length > 1 && (segments[1] === 'en' || segments[1] === 'zh')) {
      segments[1] = targetLocale
      return segments.join('/')
    }
    return `/${targetLocale}`
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100/50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-20">
          {/* Logo / Brand Name */}
          <Link 
            href={`/${locale}`}
            className="flex items-center"
          >
            <Image
              src="/images/logo.png"
              alt="Shugaosha Logo"
              width={250}
              height={50}
              priority
              className="w-[180px] md:w-[250px] h-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-sm tracking-wide transition-all duration-300 relative py-1 hover:text-primary ${
                  isActive(link.path)
                    ? 'text-primary font-medium after:scale-x-100'
                    : 'text-charcoal/80 font-light'
                } after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primary after:scale-x-0 after:origin-left after:transition-transform after:duration-300`}
              >
                {link.name}
              </Link>
            ))}

            {/* Language Switcher */}
            <div className="flex items-center space-x-2 border-l border-gray-200 pl-6 ml-2">
              <Globe className="w-4 h-4 text-charcoal/60" />
              {locale === 'en' ? (
                <Link
                  href={getLanguageSwitchPath('zh')}
                  className="text-xs font-light text-charcoal hover:text-primary transition-colors duration-300"
                >
                  繁體中文
                </Link>
              ) : (
                <Link
                  href={getLanguageSwitchPath('en')}
                  className="text-xs font-light text-charcoal hover:text-primary transition-colors duration-300"
                >
                  English
                </Link>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Mobile Language Switcher Quick Link */}
            <Link
              href={getLanguageSwitchPath(locale === 'en' ? 'zh' : 'en')}
              className="text-xs text-charcoal border border-gray-200 rounded px-2.5 py-1 hover:border-primary hover:text-primary transition-colors"
            >
              {locale === 'en' ? '繁中' : 'EN'}
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-charcoal hover:text-primary transition-colors p-2"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <div
        className={`fixed inset-y-0 right-0 w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300 md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-end p-6">
          <button
            onClick={() => setIsOpen(false)}
            className="text-charcoal hover:text-primary p-2"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex flex-col space-y-6 px-8 mt-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => setIsOpen(false)}
              className={`text-base tracking-wide transition-all duration-300 ${
                isActive(link.path)
                  ? 'text-primary font-medium'
                  : 'text-charcoal font-light'
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* Mobile Language Selection */}
          <div className="pt-6 border-t border-gray-100 flex flex-col space-y-4">
            <span className="text-xs text-charcoal/40 tracking-widest uppercase">Language / 語言</span>
            <div className="flex space-x-4">
              <Link
                href={getLanguageSwitchPath('en')}
                onClick={() => setIsOpen(false)}
                className={`text-sm ${locale === 'en' ? 'text-primary font-medium' : 'text-charcoal font-light'}`}
              >
                English
              </Link>
              <Link
                href={getLanguageSwitchPath('zh')}
                onClick={() => setIsOpen(false)}
                className={`text-sm ${locale === 'zh' ? 'text-primary font-medium' : 'text-charcoal font-light'}`}
              >
                繁體中文
              </Link>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
        />
      )}
    </header>
  )
}
