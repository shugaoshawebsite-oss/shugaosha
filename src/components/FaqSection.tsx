'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'

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
    <section id="faq" className="max-w-4xl mx-auto px-6 w-full">
      <div className="text-center md:text-left space-y-4 mb-16">
        <span className="type-label text-primary">
          {faqData.subtitle}
        </span>
        <h2 className="type-heading text-foreground">
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
                <span className={`type-card-title transition-colors duration-300 text-left ${isOpen ? 'text-primary' : 'text-charcoal group-hover:text-primary'}`}>
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
                <div className="px-6 sm:px-8 py-5 type-body text-charcoal/80 bg-soft-bg">
                  {item.answer}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {faqData.stillHaveQuestions && (
        <div className="mt-16 text-center bg-soft-bg border border-gray-100 rounded-2xl p-8 max-w-2xl mx-auto space-y-4 hover:shadow-sm transition-all duration-300">
          <h3 className="text-lg font-medium text-foreground">
            {faqData.stillHaveQuestions}
          </h3>
          <p className="type-body text-charcoal/70 max-w-md mx-auto">
            {faqData.contactUsText}
          </p>
          <div className="pt-2">
            <Link
              href={`/${locale}/contact`}
              className="btn-primary inline-flex items-center gap-2 text-sm py-2.5 px-6 shadow-sm hover:shadow transition-all duration-300"
            >
              {dict.nav.contact}
            </Link>
          </div>
        </div>
      )}
    </section>
  )
}
