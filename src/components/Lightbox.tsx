'use client'

import { useEffect, useCallback } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

export interface LightboxImage {
  src: string
  alt: string
}

interface LightboxProps {
  images: LightboxImage[]
  currentIndex: number | null
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export default function Lightbox({ images, currentIndex, onClose, onPrev, onNext }: LightboxProps) {
  const isOpen = currentIndex !== null
  const image = isOpen ? images[currentIndex!] : null
  const hasMultiple = images.length > 1

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && hasMultiple) onPrev()
      if (e.key === 'ArrowRight' && hasMultiple) onNext()
    },
    [isOpen, hasMultiple, onClose, onPrev, onNext]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  // Lock body scroll while open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen || !image) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative z-10 flex flex-col items-center max-w-[90vw] max-h-[90vh]">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
          aria-label="Close lightbox"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Image container */}
        <div className="relative rounded-[2rem] overflow-hidden bg-white/5 shadow-2xl">
          <div className="relative" style={{ maxWidth: '80vw', maxHeight: '80vh' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.src}
              alt={image.alt}
              className="block max-w-[80vw] max-h-[80vh] w-auto h-auto object-contain"
              style={{ borderRadius: '2rem' }}
            />
          </div>
        </div>

        {/* Alt text / caption */}
        <p className="mt-4 text-white/60 text-sm font-light text-center max-w-md">{image.alt}</p>

        {/* Counter */}
        {hasMultiple && (
          <p className="mt-1 text-white/40 text-xs">
            {currentIndex! + 1} / {images.length}
          </p>
        )}
      </div>

      {/* Prev / Next arrows */}
      {hasMultiple && (
        <>
          <button
            onClick={onPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white/70 hover:text-white transition-all p-3 rounded-full bg-white/10 hover:bg-white/20 hover:scale-105"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white/70 hover:text-white transition-all p-3 rounded-full bg-white/10 hover:bg-white/20 hover:scale-105"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}
    </div>
  )
}
