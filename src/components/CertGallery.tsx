'use client'

import { useState } from 'react'
import Image from 'next/image'
import Lightbox, { LightboxImage } from '@/components/Lightbox'

interface CertThumb {
  thumbSrc: string
  fullSrc: string
  labelEn: string
  labelZh: string
}

interface CertGroup {
  titleEn: string
  titleZh: string
  descEn: string
  descZh: string
  thumbs: CertThumb[]
}

interface CertGalleryProps {
  groups: CertGroup[]
  locale: 'en' | 'zh'
}

export default function CertGallery({ groups, locale }: CertGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  // Flatten all thumbs across groups into a single lightbox image list
  const lightboxImages: LightboxImage[] = groups.flatMap((g) =>
    g.thumbs.map((t) => ({
      src: t.fullSrc,
      alt: locale === 'en' ? t.labelEn : t.labelZh,
    }))
  )

  // Build flat index map: [groupIdx][thumbIdx] → lightboxIndex
  let runningIndex = 0
  const indexMap: number[][] = groups.map((g) => {
    const row = g.thumbs.map((_, ti) => runningIndex + ti)
    runningIndex += g.thumbs.length
    return row
  })

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {groups.map((group, gi) => (
          <div
            key={gi}
            className="space-y-6 bg-white border border-gray-100 rounded-[2rem] p-8 h-full flex flex-col justify-start"
          >
            {/* Clickable thumbnails row */}
            <div className="flex flex-wrap gap-2 md:gap-4 pb-4 justify-center md:justify-start items-center border-b border-gray-50">
              {group.thumbs.map((thumb, ti) => {
                const lbIdx = indexMap[gi][ti]
                return (
                  <button
                    key={ti}
                    onClick={() => setLightboxIndex(lbIdx)}
                    className="group focus:outline-none"
                    aria-label={`View ${locale === 'en' ? thumb.labelEn : thumb.labelZh} full size`}
                  >
                    <div className="relative overflow-hidden rounded-[1rem] transition-transform duration-300 group-hover:scale-[1.04]">
                      <Image
                        src={thumb.thumbSrc}
                        alt={locale === 'en' ? thumb.labelEn : thumb.labelZh}
                        width={140}
                        height={140}
                        className="object-contain h-[80px] md:h-[130px] w-auto"
                        sizes="(max-width: 768px) 90px, 140px"
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-[1rem] flex items-end justify-center pb-2">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-[10px] font-medium tracking-widest uppercase bg-black/50 px-3 py-1 rounded-full">
                          {locale === 'en' ? 'Zoom' : '放大'}
                        </span>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>

            <div className="space-y-3 pt-2">
              <h3 className="text-lg font-medium text-foreground">
                {locale === 'en' ? group.titleEn : group.titleZh}
              </h3>
              <p className="text-sm font-light text-charcoal/75 leading-relaxed">
                {locale === 'en' ? group.descEn : group.descZh}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Lightbox
        images={lightboxImages}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onPrev={() =>
          setLightboxIndex((i) =>
            i === null || i === 0 ? lightboxImages.length - 1 : i - 1
          )
        }
        onNext={() =>
          setLightboxIndex((i) =>
            i === null ? 0 : (i + 1) % lightboxImages.length
          )
        }
      />
    </>
  )
}
