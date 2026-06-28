'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FaqItem {
  question: string
  answer: string
}

interface FaqSectionProps {
  dict: any // Type loosely to avoid typescript mismatch on dynamically added keys
  locale: 'en' | 'zh'
}

export default function FaqSection({ dict, locale }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqData = dict.home.faq
  if (!faqData || !faqData.items) return null

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="max-w-4xl mx-auto px-6 w-full">
      <div className="text-center space-y-4 mb-16">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
          {faqData.subtitle}
        </span>
        <h2 className="text-3xl sm:text-4xl font-light text-foreground tracking-tight">
          {faqData.title}
        </h2>
      </div>

      <div className="space-y-4">
        {faqData.items.map((item: FaqItem, idx: number) => {
          const isOpen = openIndex === idx
          return (
            <div
              key={idx}
              className="border border-gray-100 rounded-2xl bg-white overflow-hidden transition-all duration-300 hover:shadow-sm"
            >
              <button
                onClick={() => toggleIndex(idx)}
                className="w-full flex justify-between items-center px-6 sm:px-8 py-5 text-left focus:outline-none group"
                aria-expanded={isOpen}
              >
                <span className={`text-base sm:text-lg font-medium transition-colors duration-300 ${isOpen ? 'text-primary' : 'text-charcoal group-hover:text-primary'}`}>
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-charcoal/60 transition-transform duration-300 flex-shrink-0 ml-4 ${
                    isOpen ? 'transform rotate-180 text-primary' : 'group-hover:text-primary'
                  }`}
                />
              </button>
              
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  isOpen ? 'max-h-96 opacity-100 border-t border-gray-50' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 sm:px-8 py-5 text-sm sm:text-base font-light text-charcoal/80 leading-relaxed bg-soft-bg">
                  {item.answer}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
