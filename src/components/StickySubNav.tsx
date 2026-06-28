'use client'

import { useState, useEffect } from 'react'

interface StickySubNavProps {
  locale: 'en' | 'zh'
}

const labels = {
  en: {
    celebrities: 'Celebrities',
    beforeAfter: 'Before & Afters',
    reviews: 'Reviews',
  },
  zh: {
    celebrities: '明星見證',
    beforeAfter: '前後對比',
    reviews: '客戶評價',
  },
}

export default function StickySubNav({ locale }: StickySubNavProps) {
  const [active, setActive] = useState('celebrities')
  const t = labels[locale]

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const offset = 140
      const y = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        })
      },
      { rootMargin: '-30% 0px -60% 0px' }
    )
    const sections = ['celebrities', 'before-after', 'reviews']
    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const tabs = [
    { id: 'celebrities', label: t.celebrities },
    { id: 'before-after', label: t.beforeAfter },
    { id: 'reviews', label: t.reviews },
  ]

  return (
    <div className="sticky top-20 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <nav className="flex gap-0 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => scrollTo(tab.id)}
              className={`relative flex-shrink-0 px-6 py-4 text-sm tracking-wide transition-all duration-300 border-b-2 ${
                active === tab.id
                  ? 'text-primary border-primary font-medium'
                  : 'text-charcoal/60 border-transparent hover:text-charcoal font-light'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}
