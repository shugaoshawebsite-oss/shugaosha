'use client'

import { useState, useEffect } from 'react'
import { RefreshCw, CheckCircle2, AlertCircle, Star } from 'lucide-react'

interface SyncResponse {
  success?: boolean
  error?: string
  action?: string
  totalReviews?: number
  userRatingsTotal?: number
  cachedAt?: string
  rating?: number
  storage?: {
    target: string
    success: boolean
    error?: string
  }
}

export default function AdminGoogleReviewsSync() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<{
    rating: number
    user_ratings_total: number
    cachedAt: string
    reviewsCount: number
  } | null>(null)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // Fetch current status on mount
  useEffect(() => {
    fetch('/api/google-reviews')
      .then((res) => res.json())
      .then((json) => {
        if (json) {
          setData({
            rating: json.rating ?? 5.0,
            user_ratings_total: json.user_ratings_total ?? 0,
            cachedAt: json.cachedAt ?? '',
            reviewsCount: json.reviews?.length ?? json.totalReviews ?? 0,
          })
        }
      })
      .catch((err) => console.error('Failed to load reviews status:', err))
  }, [])

  const handleSync = async () => {
    setLoading(true)
    setMessage(null)

    try {
      const res = await fetch('/api/google-reviews?force=true', { method: 'POST' })
      const json: SyncResponse = await res.json()

      if (res.ok && json.success) {
        setData({
          rating: json.rating ?? 5.0,
          user_ratings_total: json.userRatingsTotal ?? 0,
          cachedAt: json.cachedAt ?? new Date().toISOString(),
          reviewsCount: json.totalReviews ?? 0,
        })
        const storageNote = json.storage?.target === 'github' && !json.storage?.success
          ? ` (Warning: GitHub write failed: ${json.storage.error})`
          : ''
        setMessage({
          type: 'success',
          text: `Successfully synced from Google! Total ratings: ${json.userRatingsTotal ?? 0}, accumulated reviews: ${json.totalReviews ?? 0}.${storageNote}`,
        })
      } else {
        setMessage({
          type: 'error',
          text: json.error || 'Failed to sync with Google Places API. Check server logs.',
        })
      }
    } catch (err: any) {
      setMessage({
        type: 'error',
        text: err?.message || 'Network error occurred while syncing.',
      })
    } finally {
      setLoading(false)
    }
  }

  const formattedDate = data?.cachedAt
    ? new Date(data.cachedAt).toLocaleString(undefined, {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : 'Unknown'

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#FBBC04]/10 text-[#FBBC04] flex items-center justify-center">
            <Star className="w-4 h-4 fill-current" />
          </div>
          <h2 className="text-lg font-medium text-charcoal">Google Reviews Sync</h2>
        </div>
        <button
          onClick={handleSync}
          disabled={loading}
          className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors disabled:opacity-50 cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'Syncing...' : 'Sync Now'}
        </button>
      </div>

      <p className="text-sm text-charcoal/60">
        Google Places API periodically updates authentic 5-star reviews on the website.
      </p>

      {data && (
        <div className="grid grid-cols-3 gap-3 pt-2 text-center border-t border-gray-50">
          <div className="bg-gray-50/70 p-3 rounded-xl">
            <div className="text-xs text-charcoal/50">Overall Rating</div>
            <div className="text-base font-semibold text-charcoal flex items-center justify-center gap-1 mt-0.5">
              <span>{data.rating}</span>
              <span className="text-[#FBBC04]">★</span>
            </div>
          </div>
          <div className="bg-gray-50/70 p-3 rounded-xl">
            <div className="text-xs text-charcoal/50">Total Ratings</div>
            <div className="text-base font-semibold text-charcoal mt-0.5">{data.user_ratings_total}</div>
          </div>
          <div className="bg-gray-50/70 p-3 rounded-xl">
            <div className="text-xs text-charcoal/50">Accumulated</div>
            <div className="text-base font-semibold text-charcoal mt-0.5">{data.reviewsCount}</div>
          </div>
        </div>
      )}

      <div className="text-xs text-charcoal/40 flex items-center justify-between pt-1">
        <span>Last synced: {formattedDate}</span>
      </div>

      {message && (
        <div
          className={`p-3 rounded-xl text-xs flex items-start gap-2 ${
            message.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-100'
              : 'bg-red-50 text-red-800 border border-red-100'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
          )}
          <div className="flex-1 leading-relaxed">{message.text}</div>
        </div>
      )}
    </div>
  )
}
