'use client'

import React, { useRef, useEffect, useState } from 'react'

interface MarqueeCarouselProps<T> {
  items: T[]
  renderItem: (item: T, index: number, isClone: boolean) => React.ReactNode
  speed?: number // pixels per frame at 60fps
}

export default function MarqueeCarousel<T>({
  items,
  renderItem,
  speed = 0.5,
}: MarqueeCarouselProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  
  const [activeIndex, setActiveIndex] = useState(0)
  const isDragging = useRef(false)
  const isHovered = useRef(false)
  const startX = useRef(0)
  const scrollLeftStart = useRef(0)
  const animationFrameId = useRef<number | null>(null)
  const lastTime = useRef<number | null>(null)
  const hasInitialized = useRef(false)
  const exactScrollLeft = useRef<number | null>(null)

  const originalCount = items.length
  // Duplicate items to ensure seamless marquee looping
  const duplicatedItems = [...items, ...items]

  const updateActiveIndex = () => {
    const container = containerRef.current
    const track = trackRef.current
    if (!container || !track) return

    const children = track.children
    if (children.length === 0) return

    let closestIndex = 0
    let minDiff = Infinity
    const containerCenter = container.scrollLeft + container.clientWidth / 2

    // Search the first half of children to map to the correct active index dot
    for (let i = 0; i < originalCount; i++) {
      const child = children[i] as HTMLElement
      if (!child) continue
      const childCenter = child.offsetLeft + child.clientWidth / 2
      const diff = Math.abs(childCenter - containerCenter)
      if (diff < minDiff) {
        minDiff = diff
        closestIndex = i
      }
    }

    setActiveIndex(closestIndex % originalCount)
  }

  const handleScroll = () => {
    const container = containerRef.current
    if (!container) return
    
    const halfWidth = container.scrollWidth / 2
    if (halfWidth <= 0) return

    const threshold = 20 // pixels threshold to wrap before hitting the scroll wall

    // Seamless wrap-around in both directions
    if (container.scrollLeft >= halfWidth) {
      container.scrollLeft -= halfWidth
      if (exactScrollLeft.current !== null) exactScrollLeft.current -= halfWidth
    } else if (container.scrollLeft <= threshold) {
      container.scrollLeft += halfWidth
      if (exactScrollLeft.current !== null) exactScrollLeft.current += halfWidth
    }

    updateActiveIndex()
  }

  // Initialize scroll position to the middle (halfWidth) for infinite scrolling in both directions
  useEffect(() => {
    const container = containerRef.current
    if (!container || hasInitialized.current) return

    const initScroll = () => {
      const halfWidth = container.scrollWidth / 2
      if (halfWidth > 0) {
        container.scrollLeft = halfWidth
        exactScrollLeft.current = halfWidth
        updateActiveIndex()
        hasInitialized.current = true
      }
    }

    const timer = setTimeout(initScroll, 150)
    return () => clearTimeout(timer)
  }, [originalCount])

  // Auto-scroll loop using requestAnimationFrame
  useEffect(() => {
    const animate = (time: number) => {
      if (lastTime.current === null) {
        lastTime.current = time
      }
      
      const delta = time - lastTime.current
      lastTime.current = time

      const container = containerRef.current
      if (container && !isDragging.current && !isHovered.current && hasInitialized.current) {
        if (exactScrollLeft.current === null) {
          exactScrollLeft.current = container.scrollLeft
        }
        const frameAdjust = delta / 16.666
        exactScrollLeft.current += speed * frameAdjust
        container.scrollLeft = exactScrollLeft.current
      }

      animationFrameId.current = requestAnimationFrame(animate)
    }

    animationFrameId.current = requestAnimationFrame(animate)
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [speed])

  // Mouse / Touch Drag handlers
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    const container = containerRef.current
    if (!container) return

    isDragging.current = true
    const pageX = 'touches' in e ? e.touches[0].pageX : e.pageX
    startX.current = pageX
    scrollLeftStart.current = container.scrollLeft
    lastTime.current = null
  }

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging.current || !containerRef.current) return

    const pageX = 'touches' in e ? e.touches[0].pageX : e.pageX
    const walk = pageX - startX.current
    containerRef.current.scrollLeft = scrollLeftStart.current - walk
  }

  const handleDragEnd = () => {
    isDragging.current = false
    exactScrollLeft.current = null
  }

  const handleDotClick = (index: number) => {
    const container = containerRef.current
    const track = trackRef.current
    if (!container || !track) return

    const children = track.children
    const targetChild = children[index] as HTMLElement
    if (targetChild) {
      const targetScrollLeft = targetChild.offsetLeft - (container.clientWidth - targetChild.clientWidth) / 2
      container.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth',
      })
      exactScrollLeft.current = null
    }
  }

  // Handle window resize to keep layout and index alignment correct
  useEffect(() => {
    const handleResize = () => {
      updateActiveIndex()
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [originalCount])

  return (
    <div className="w-full space-y-6">
      {/* Scroll Viewport with Alpha Mask */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        onMouseEnter={() => { isHovered.current = true }}
        onMouseLeave={() => { isHovered.current = false; handleDragEnd(); exactScrollLeft.current = null; }}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
        className="overflow-x-auto overflow-y-hidden cursor-grab active:cursor-grabbing no-scrollbar select-none py-4 w-full"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        }}
      >
        {/* Track holding all items with symmetric spacing via item padding-right */}
        <div
          ref={trackRef}
          className="flex flex-row w-max"
        >
          {duplicatedItems.map((item, idx) => {
            const isClone = idx >= originalCount
            return (
              <div
                key={idx}
                className="select-none pr-6" // Symmetric gap spacing (24px) for perfect infinite loop
                style={{ userSelect: 'none' }}
              >
                {renderItem(item, idx % originalCount, isClone)}
              </div>
            )
          })}
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center items-center gap-2 pt-2">
        {Array.from({ length: originalCount }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => handleDotClick(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              activeIndex === idx
                ? 'bg-primary w-6'
                : 'bg-charcoal/20 hover:bg-charcoal/40'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
