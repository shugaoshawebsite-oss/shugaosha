'use client'

import React, { useRef, useEffect } from 'react'

interface TreatmentVideoProps {
  src: string
  poster?: string
}

export default function TreatmentVideo({ src, poster }: TreatmentVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = 0.3
    }
  }, [])

  return (
    <video
      ref={videoRef}
      src={src}
      controls
      playsInline
      preload="metadata"
      className="w-full h-full object-cover"
      poster={poster}
    />
  )
}
