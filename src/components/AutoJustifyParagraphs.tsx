'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Determines whether text constitutes a "long paragraph" (> 20 words).
 * For English / Latin text, words are counted by whitespace.
 * For Chinese / CJK text, ~35 CJK characters roughly corresponds to 20 words.
 */
function isLongParagraph(text: string): boolean {
  if (!text) return false
  const trimmed = text.trim()
  if (!trimmed) return false

  // Count whitespace-delimited words
  const words = trimmed.split(/\s+/).filter(Boolean)
  if (words.length > 20) return true

  // Count CJK characters (Chinese / Japanese / Korean ideographs)
  const cjkMatches = trimmed.match(/[\u4e00-\u9fa5\u3040-\u30ff\u3400-\u4dbf]/g)
  const cjkCount = cjkMatches ? cjkMatches.length : 0

  // Effective words: space-separated words + CJK characters / 1.7
  const effectiveWords = words.length + Math.floor(cjkCount / 1.7)
  return effectiveWords > 20
}

export default function AutoJustifyParagraphs() {
  const pathname = usePathname()

  useEffect(() => {
    function applyJustification() {
      // Find candidate paragraphs and text blocks across main content
      const candidates = document.querySelectorAll<HTMLElement>(
        'main p, footer p, .faq-answer, blockquote p, .review-card p, [data-auto-justify]'
      )

      candidates.forEach((el) => {
        // Skip navigation, headers, buttons, and titles
        if (
          el.closest('nav') ||
          el.closest('header') ||
          el.closest('button') ||
          el.closest('.btn-primary') ||
          el.closest('.btn-secondary') ||
          el.closest('ul') ||
          el.closest('ol') ||
          el.closest('[data-no-justify]') ||
          el.closest('.no-justify') ||
          el.classList.contains('type-card-title') ||
          el.classList.contains('type-heading') ||
          el.classList.contains('type-subheading') ||
          el.classList.contains('type-hero') ||
          el.classList.contains('type-label')
        ) {
          if (el.classList.contains('justified-paragraph')) {
            el.classList.remove('justified-paragraph')
            el.removeAttribute('data-justified')
          }
          return
        }

        // If this element contains child <p> tags, let the children handle justification
        if (el.tagName !== 'P' && el.querySelector('p')) {
          return
        }

        const text = el.textContent || ''
        if (isLongParagraph(text)) {
          if (!el.classList.contains('justified-paragraph')) {
            el.classList.add('justified-paragraph')
            el.setAttribute('data-justified', 'true')
          }
        } else {
          // If text became shorter (dynamic changes), remove class
          if (el.classList.contains('justified-paragraph')) {
            el.classList.remove('justified-paragraph')
            el.removeAttribute('data-justified')
          }
        }
      })
    }

    // Run initially after DOM settles
    applyJustification()
    const timer = setTimeout(applyJustification, 100)

    // Observe dynamic mutations (reviews loading, accordion expanding, tab switching)
    const observer = new MutationObserver(() => {
      applyJustification()
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    })

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [pathname])

  return null
}
