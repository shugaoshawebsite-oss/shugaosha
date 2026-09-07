'use client'

import React, { useState, useCallback } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import MarqueeCarousel from './MarqueeCarousel'
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
            className="text-xs text-primary hover:underline self-start"
          >
            View on Google
          </a>
        )}
      </div>
    </div>
  )
}

// ─── Review card (used inside MarqueeCarousel) ─────────────────────────────────
interface ReviewCardProps {
  review: GoogleReview
  locale: 'en' | 'zh'
  onReadMore: (review: GoogleReview) => void
}

function ReviewCard({ review, onReadMore }: ReviewCardProps) {
  const LINE_LIMIT = 160 // chars; approximate 3-line limit for typical card width
  const isLong = review.text.length > LINE_LIMIT
  const preview = isLong ? review.text.slice(0, LINE_LIMIT).trimEnd() : review.text

  return (
    <div className="w-full bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full text-left p-6 gap-4">
      {/* Author row */}
      <div className="flex items-center gap-3">
        <Avatar review={review} />
        <div className="min-w-0">
          <p className="font-semibold text-foreground text-sm leading-tight truncate">{review.author_name}</p>
          <p className="text-charcoal/45 text-xs mt-0.5">{review.relative_time_description}</p>
        </div>
      </div>

      {/* Stars */}
      <Stars rating={review.rating} />

      {/* Review text */}
      <p className="type-body-sm text-charcoal/75 leading-relaxed flex-grow">
        {isLong ? (
          <>
            {preview}
            <span
              role="button"
              tabIndex={0}
              onClick={() => onReadMore(review)}
              onKeyDown={(e) => e.key === 'Enter' && onReadMore(review)}
              className="ml-1 text-primary font-medium hover:underline cursor-pointer"
            >
              … Read more
            </span>
          </>
        ) : (
          preview
        )}
      </p>
    </div>
  )
}

// ─── Main export ───────────────────────────────────────────────────────────────
const MAPS_REVIEW_URL = 'https://g.page/r/CTKti11WGOPFEBE/review'

export default function HomeGoogleReviews({ placeData, locale }: HomeGoogleReviewsProps) {
  const [lightboxReview, setLightboxReview] = useState<GoogleReview | null>(null)

  const handleClose = useCallback(() => setLightboxReview(null), [])

  const reviews = placeData.reviews ?? []

  return (
    <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
      {/* Section header */}
      <div className="text-left max-w-2xl md:max-w-none space-y-5 mb-14">
        <span className="type-label text-primary">
          {locale === 'en' ? 'Client Voices' : '客戶心聲'}
        </span>

        {/* Google branding — stacks vertically on mobile, horizontal on sm+ */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start gap-4">
          {/* G logo + rating block */}
          <div className="flex items-center justify-start gap-3">
            <GoogleLogo className="w-[45px] h-[45px] flex-shrink-0" />
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-semibold text-foreground leading-none">
                  {placeData.rating?.toFixed(1) ?? '5.0'}
                </span>
                <Stars rating={placeData.rating ?? 5} size="lg" />
              </div>
              <span className="text-xs text-charcoal/50 mt-0.5">
                {placeData.user_ratings_total ?? 0}{' '}
                {locale === 'en' ? 'Google reviews' : '則 Google 評論'}
              </span>
            </div>
          </div>

          {/* Review us on Google button */}
          <a
            href={MAPS_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center justify-center gap-2 !py-2.5 !px-5 !text-xs w-full sm:w-auto"
            id="google-review-cta"
          >
            <GoogleLogo className="w-4 h-4 flex-shrink-0" />
            {locale === 'en' ? 'LEAVE A GOOGLE REVIEW' : '在 GOOGLE 留下評論'}
          </a>
        </div>

        {/* Flag row */}
        <div className="flex justify-start items-center gap-4 flex-wrap">
          {(['🇭🇰', '🇦🇺', '🇺🇸', '🇨🇦'] as const).map((flag, idx) => (
            <span key={idx} className="text-2xl sm:text-3xl">{flag}</span>
          ))}
        </div>
      </div>

      {/* Reviews carousel */}
      {reviews.length > 0 ? (
        <MarqueeCarousel
          items={reviews}
          autoPlay={false}
          showArrows={true}
          renderItem={(review) => (
            <ReviewCard
              review={review}
              locale={locale}
              onReadMore={setLightboxReview}
            />
          )}
        />
      ) : (
        /* Fallback when no reviews loaded yet */
        <div className="text-center py-16 text-charcoal/40 text-sm">
          {locale === 'en'
            ? 'Reviews are loading…'
            : '評論載入中…'}
        </div>
      )}

      {/* Lightbox */}
      <ReviewLightbox review={lightboxReview} onClose={handleClose} />
    </section>
  )
}
