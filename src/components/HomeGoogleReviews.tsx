'use client'

import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import type { GoogleReview, GooglePlaceData } from '@/utils/dataService'

interface HomeGoogleReviewsProps {
  placeData: GooglePlaceData
  locale: 'en' | 'zh'
}

// ─── Star renderer ─────────────────────────────────────────────────────────────
function Stars({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'lg' }) {
  const full = Math.floor(rating)
  const half = rating - full >= 0.5
  const empty = 5 - full - (half ? 1 : 0)
  const cls = size === 'lg' ? 'w-5 h-5' : 'w-3.5 h-3.5'

  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: full }).map((_, i) => (
        <svg key={`f${i}`} className={`${cls} text-[#FBBC04]`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
      {half && (
        <svg className={`${cls} text-[#FBBC04]`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27V2l2.81 6.62 7.19.62z" />
        </svg>
      )}
      {Array.from({ length: empty }).map((_, i) => (
        <svg key={`e${i}`} className={`${cls} text-gray-200`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </span>
  )
}

// ─── Profile avatar ────────────────────────────────────────────────────────────
function Avatar({ review }: { review: GoogleReview }) {
  const [imgError, setImgError] = useState(false)
  const initial = review.author_name?.charAt(0)?.toUpperCase() ?? '?'

  if (!review.profile_photo_url || imgError) {
    return (
      <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold flex-shrink-0 select-none">
        {initial}
      </div>
    )
  }

  return (
    <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gray-100">
      <Image
        src={review.profile_photo_url}
        alt={review.author_name}
        width={40}
        height={40}
        className="object-cover w-full h-full"
        onError={() => setImgError(true)}
      />
    </div>
  )
}

// ─── Google "G" logo SVG ───────────────────────────────────────────────────────
function GoogleLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

// ─── Review lightbox ───────────────────────────────────────────────────────────
interface ReviewLightboxProps {
  review: GoogleReview | null
  onClose: () => void
}

function ReviewLightbox({ review, onClose }: ReviewLightboxProps) {
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
  }, [onClose])

  if (!review) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Full review"
      onKeyDown={handleKeyDown}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-md"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative z-10 bg-white rounded-3xl shadow-2xl max-w-lg w-full p-5 sm:p-8 flex flex-col gap-5 max-h-[90vh] sm:max-h-[85vh] overflow-y-auto">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-charcoal/40 hover:text-charcoal transition-colors p-1 rounded-full hover:bg-gray-100"
          aria-label="Close review"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Author */}
        <div className="flex items-center gap-4 pr-8">
          <Avatar review={review} />
          <div>
            <p className="font-semibold text-foreground text-sm leading-tight">{review.author_name}</p>
            <p className="text-charcoal/50 text-xs mt-0.5">{review.relative_time_description}</p>
          </div>
        </div>

        {/* Stars */}
        <Stars rating={review.rating} size="lg" />

        {/* Full text */}
        <p className="type-body text-charcoal/80 leading-relaxed whitespace-pre-wrap">
          {review.text}
        </p>

        {/* Link to Google */}
        {review.author_url && (
          <a
            href={review.author_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-primary hover:underline self-start inline-flex items-center gap-1"
          >
            <span>View on Google</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </div>
  )
}

// ─── Review card ───────────────────────────────────────────────────────────────
interface ReviewCardProps {
  review: GoogleReview
  locale: 'en' | 'zh'
  onReadMore: (review: GoogleReview) => void
}

function ReviewCard({ review, locale, onReadMore }: ReviewCardProps) {
  const LINE_LIMIT = 150
  const isLong = (review.text || '').length > LINE_LIMIT
  const preview = isLong ? review.text.slice(0, LINE_LIMIT).trimEnd() : review.text

  return (
    <div className="w-[300px] sm:w-[350px] md:w-[370px] flex-shrink-0 bg-white border border-gray-100/90 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between p-6 gap-4 snap-start text-left">
      <div className="space-y-4">
        {/* Author row */}
        <div className="flex items-center gap-3">
          <Avatar review={review} />
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-foreground text-sm leading-tight truncate">{review.author_name}</p>
            <p className="text-charcoal/45 text-xs mt-0.5">{review.relative_time_description}</p>
          </div>
          <GoogleLogo className="w-4 h-4 opacity-40 flex-shrink-0" />
        </div>

        {/* Stars */}
        <Stars rating={review.rating} />

        {/* Review text */}
        <p className="type-body-sm text-charcoal/75 leading-relaxed">
          {isLong ? (
            <>
              {preview}
              <button
                type="button"
                onClick={() => onReadMore(review)}
                className="ml-1 text-primary font-medium hover:underline inline-block focus:outline-none"
              >
                {locale === 'en' ? '… Read more' : '… 閱讀更多'}
              </button>
            </>
          ) : (
            preview
          )}
        </p>
      </div>

      {review.author_url && (
        <a
          href={review.author_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] text-charcoal/40 hover:text-primary transition-colors flex items-center gap-1 pt-3 border-t border-gray-50 self-start"
        >
          <span>Google Review</span>
          <ExternalLink className="w-2.5 h-2.5" />
        </a>
      )}
    </div>
  )
}

// ─── Main export ───────────────────────────────────────────────────────────────
const MAPS_REVIEW_URL = 'https://g.page/r/CTKti11WGOPFEBE/review'
const MAPS_PROFILE_URL = 'https://maps.app.goo.gl/KWrQy285Um337U1G9'

export default function HomeGoogleReviews({ placeData, locale }: HomeGoogleReviewsProps) {
  const [lightboxReview, setLightboxReview] = useState<GoogleReview | null>(null)
  const [visibleCount, setVisibleCount] = useState(5)
  const [isLoading, setIsLoading] = useState(false)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const scrollRef = useRef<HTMLDivElement>(null)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const isLoadingRef = useRef(false)

  const handleClose = useCallback(() => setLightboxReview(null), [])

  // Filter valid reviews with actual text
  const allReviews = useMemo(
    () => (placeData.reviews ?? []).filter((r) => r.text && r.text.trim().length > 0),
    [placeData.reviews]
  )

  // Auto-load 5 more reviews from local cache (0 Google API cost)
  const loadMore = useCallback(() => {
    if (isLoadingRef.current || allReviews.length === 0) return
    isLoadingRef.current = true
    setIsLoading(true)

    setVisibleCount((prev) => prev + 5)

    setTimeout(() => {
      isLoadingRef.current = false
      setIsLoading(false)
    }, 250)
  }, [allReviews.length])

  // Derive displayed reviews by cycling through authentic reviews pool
  const displayedReviews = useMemo(() => {
    if (allReviews.length === 0) return []
    const list: GoogleReview[] = []
    const count = Math.max(visibleCount, Math.min(5, allReviews.length))
    for (let i = 0; i < count; i++) {
      list.push(allReviews[i % allReviews.length])
    }
    return list
  }, [allReviews, visibleCount])

  // Monitor scroll position for arrow states and automatic end-of-scroll expansion
  const checkScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const { scrollLeft, scrollWidth, clientWidth } = el
    setCanScrollLeft(scrollLeft > 10)
    setCanScrollRight(allReviews.length > 0)

    // When scrolled near the end, automatically load 5 more from the cached pool
    if (scrollLeft + clientWidth >= scrollWidth - 350) {
      loadMore()
    }
  }, [allReviews.length, loadMore])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    checkScroll()
    el.addEventListener('scroll', checkScroll, { passive: true })
    window.addEventListener('resize', checkScroll)
    return () => {
      el.removeEventListener('scroll', checkScroll)
      window.removeEventListener('resize', checkScroll)
    }
  }, [checkScroll, displayedReviews.length])

  // IntersectionObserver on the sentinel at the end of the horizontal track
  useEffect(() => {
    const sentinel = sentinelRef.current
    const root = scrollRef.current
    if (!sentinel || !root || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          loadMore()
        }
      },
      {
        root,
        rootMargin: '0px 250px 0px 0px',
        threshold: 0.01,
      }
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [loadMore, displayedReviews.length])

  const scrollByAmount = (offset: number) => {
    const el = scrollRef.current
    if (!el) return
    if (offset > 0 && el.scrollLeft + el.clientWidth >= el.scrollWidth - 500) {
      loadMore()
    }
    el.scrollBy({ left: offset, behavior: 'smooth' })
  }

  return (
    <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
      {/* Section header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div className="text-left space-y-4 max-w-2xl">
          <span className="type-label text-primary">
            {locale === 'en' ? 'Client Voices' : '客戶心聲'}
          </span>

          {/* Rating & Google badge */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={MAPS_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 group cursor-pointer transition-opacity hover:opacity-90"
              aria-label={locale === 'en' ? 'View Google Reviews' : '查看 Google 評論'}
            >
              <GoogleLogo className="w-10 h-10 flex-shrink-0" />
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-semibold text-foreground leading-none">
                    {placeData.rating?.toFixed(1) ?? '5.0'}
                  </span>
                  <Stars rating={placeData.rating ?? 5} size="lg" />
                  <span className="text-sm font-medium text-charcoal/60">
                    ({placeData.user_ratings_total || 54})
                  </span>
                </div>
                <span className="text-xs text-charcoal/60 mt-0.5 font-medium group-hover:text-primary transition-colors">
                  {locale === 'en' ? 'Google Reviews' : 'Google 評論'}
                </span>
              </div>
            </a>

            {/* Action buttons */}
            <div className="flex items-center gap-2 ml-0 sm:ml-2">
              <a
                href={MAPS_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary !py-2 !px-3.5 !text-xs inline-flex items-center gap-1.5"
                id="google-maps-link"
              >
                <span>{locale === 'en' ? 'Google Maps' : 'Google 地圖'}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href={MAPS_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary !py-2 !px-3.5 !text-xs inline-flex items-center gap-1.5"
                id="google-review-cta"
              >
                <span>{locale === 'en' ? 'Leave a Review' : '發表評論'}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Flag row */}
          <div className="flex items-center gap-3 pt-1">
            {(['🇭🇰', '🇦🇺', '🇺🇸', '🇨🇦'] as const).map((flag, idx) => (
              <span key={idx} className="text-xl sm:text-2xl select-none">{flag}</span>
            ))}
            <span className="text-xs text-charcoal/50 ml-1">
              {locale === 'en' ? 'Clients from Australia, Hong Kong & Worldwide' : '來自澳洲、香港及海外各地的客人'}
            </span>
          </div>
        </div>
      </div>

      {/* Reviews Horizontal Track with Seamless Auto-load */}
      {displayedReviews.length > 0 ? (
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex items-stretch gap-5 sm:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 pt-1 px-1 -mx-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {displayedReviews.map((review, idx) => (
              <ReviewCard
                key={`${review.author_name}-${idx}`}
                review={review}
                locale={locale}
                onReadMore={setLightboxReview}
              />
            ))}

            {/* Auto-load sentinel & subtle indicator */}
            <div
              ref={sentinelRef}
              className="w-10 flex-shrink-0 flex items-center justify-center self-center"
              aria-hidden="true"
            >
              {isLoading && (
                <div className="w-5 h-5 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
              )}
            </div>
          </div>

          {/* Bottom center controls */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              type="button"
              onClick={() => scrollByAmount(-380)}
              disabled={!canScrollLeft}
              aria-label="Previous review"
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-charcoal transition-all duration-200 hover:border-primary hover:text-primary hover:shadow-sm disabled:opacity-30 disabled:hover:border-gray-200 disabled:hover:text-charcoal disabled:cursor-not-allowed bg-white shadow-xs"
            >
              <ChevronLeft className="w-4.5 h-4.5" />
            </button>
            <button
              type="button"
              onClick={() => scrollByAmount(380)}
              disabled={!canScrollRight}
              aria-label="Next review"
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-charcoal transition-all duration-200 hover:border-primary hover:text-primary hover:shadow-sm disabled:opacity-30 disabled:hover:border-gray-200 disabled:hover:text-charcoal disabled:cursor-not-allowed bg-white shadow-xs"
            >
              <ChevronRight className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 text-charcoal/40 text-sm">
          {locale === 'en' ? 'Reviews are loading…' : '評論載入中…'}
        </div>
      )}

      {/* Lightbox Modal */}
      <ReviewLightbox review={lightboxReview} onClose={handleClose} />
    </section>
  )
}

