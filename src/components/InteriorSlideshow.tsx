'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface InteriorSlideshowProps {
  images: string[]
  locale: 'en' | 'zh'
}

export default function InteriorSlideshow({ images, locale }: InteriorSlideshowProps) {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1))
  const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1))

  if (!images.length) return null

  return (
    <div className="space-y-6">
      {/* Main image */}
      <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-gray-50 group">
        <Image
          src={images[current]}
          alt={locale === 'en' ? `Shugaosha clinic interior ${current + 1}` : `修顏社診所內部 ${current + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 70vw"
          className="object-cover transition-all duration-500"
          priority={current === 0}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

        {/* Nav arrows */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-charcoal hover:bg-white transition-all duration-200 shadow-md opacity-0 group-hover:opacity-100"
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-charcoal hover:bg-white transition-all duration-200 shadow-md opacity-0 group-hover:opacity-100"
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Counter */}
        <span className="absolute bottom-4 right-4 text-white/80 text-xs font-light bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
          {current + 1} / {images.length}
        </span>
      </div>

      {/* Thumbnail strip */}
      <div className="grid grid-cols-6 gap-2">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 ${
              i === current ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'
            }`}
          >
            <Image
              src={src}
              alt={`Interior thumbnail ${i + 1}`}
              fill
              sizes="80px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
