'use client'

import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface MarqueeCarouselProps<T> {
  items: T[]
  renderItem: (item: T, index: number, isClone: boolean) => React.ReactNode
  speed?: number // speed multiplier (e.g. 0.4, 0.5)
  autoPlay?: boolean
  showArrows?: boolean
}

// ─── Mobile Config ─────────────────────────────────────────────────────────────
const MOBILE_PAUSE_MS = 5000 // 5s pause between slides on mobile
const MOBILE_SLIDE_MS = 1000 // 1s slide animation
const GAP_PX = 24            // gap between cards
const PEEK_PX = 56           // adjacent-card peek width on mobile (centers card)

// Silky curves for mobile snapping:
const EASE_MOBILE_AUTO = 'cubic-bezier(0.25, 1, 0.5, 1)'
const EASE_MOBILE_RELEASE = 'cubic-bezier(0.25, 1, 0.5, 1)'

export default function MarqueeCarousel<T>({
  items,
  renderItem,
  speed = 0.5,
  autoPlay = true,
  showArrows = false,
}: MarqueeCarouselProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const n = items.length

  // Layout states
  const [isMobile, setIsMobile] = useState(false)
  const [cardWidthPx, setCardWidthPx] = useState(0)
  const [activeDot, setActiveDot] = useState(0)

  // Mutable animation state inside S ref
  const S = useRef({
    isMobile: false,
    cardWidth: 0,
    singleSetWidth: 0,
    perView: 1,
    // Mobile slide state
    virtualIdx: 1, // 1 is first real item (0 is last item clone)
    isSliding: false,
    isHovered: false,
    isDragging: false,
    hasDragged: false,
    dragStartX: 0,
    dragBaseX: 0,
    // Desktop/Tablet continuous marquee state
    marqueeX: 0,
    marqueeSpeed: 0.6,
    timer: null as ReturnType<typeof setTimeout> | null,
  })

  // ─── Display Items Setup ──────────────────────────────────────────────────
  // On mobile: [clone_last, ...items, clone_first] for centered snap sliding
  // On desktop/tablet: multiple duplicate sets for continuous infinite marquee loop
  const displayList = useMemo(() => {
    if (n === 0) return []

    if (isMobile) {
      if (n === 1) {
        return [{ item: items[0], origIdx: 0, isClone: false, key: 'm-0' }]
      }
      return [
        { item: items[n - 1], origIdx: n - 1, isClone: true, key: 'm-clone-prev' },
        ...items.map((item, idx) => ({ item, origIdx: idx, isClone: false, key: `m-${idx}` })),
        { item: items[0], origIdx: 0, isClone: true, key: 'm-clone-next' },
      ]
    } else {
      // Desktop / Tablet: repeat 3 or 4 sets for continuous wrapping
      const repeatCount = n < 4 ? 4 : 3
      const list: { item: T; origIdx: number; isClone: boolean; key: string }[] = []
      for (let s = 0; s < repeatCount; s++) {
        for (let i = 0; i < n; i++) {
          list.push({
            item: items[i],
            origIdx: i,
            isClone: s > 0,
            key: `d-${s}-${i}`,
          })
        }
      }
      return list
    }
  }, [items, n, isMobile])

  // Helper for mobile transform
  const calcMobileX = (vi: number, cw: number) => PEEK_PX - vi * (cw + GAP_PX)

  const applyMobileTransform = (x: number, animate = false, duration = MOBILE_SLIDE_MS, easing = EASE_MOBILE_AUTO) => {
    const el = trackRef.current
    if (!el) return
    if (animate) {
      el.style.transition = 'none'
      void el.offsetHeight // Force reflow
      el.style.transition = `transform ${duration}ms ${easing}`
    } else {
      el.style.transition = 'none'
    }
    el.style.transform = `translate3d(${x}px, 0, 0)`
  }

  // ─── Mobile Schedule Next Slide ───────────────────────────────────────────
  const scheduleNextMobile = useCallback(() => {
    const s = S.current
    if (s.timer) {
      clearTimeout(s.timer)
      s.timer = null
    }
    if (!autoPlay || n <= 1 || !s.isMobile) return

    s.timer = setTimeout(() => {
      if (!s.isHovered && !s.isDragging && !s.isSliding) {
        doMobileSlide(1)
      }
    }, MOBILE_PAUSE_MS)
  }, [autoPlay, n]) // eslint-disable-line react-hooks/exhaustive-deps

  // ─── Mobile Slide ─────────────────────────────────────────────────────────
  const doMobileSlide = useCallback((direction: 1 | -1, targetVI?: number, customDuration?: number, easing = EASE_MOBILE_AUTO) => {
    const s = S.current
    if (s.isSliding || s.cardWidth === 0 || n <= 1 || !s.isMobile) return
    s.isSliding = true

    const cw = s.cardWidth
    const nextVI = targetVI ?? s.virtualIdx + direction

    if (targetVI === undefined) {
      setActiveDot(d => (d + direction + n) % n)
    }

    const targetX = calcMobileX(nextVI, cw)
    const duration = customDuration ?? MOBILE_SLIDE_MS

    applyMobileTransform(targetX, true, duration, easing)
    s.virtualIdx = nextVI

    const onEnd = () => {
      trackRef.current?.removeEventListener('transitionend', onEnd)
      s.isSliding = false

      // Snap silently if we reached clones
      if (s.virtualIdx >= n + 1) {
        s.virtualIdx = 1
        applyMobileTransform(calcMobileX(1, cw), false)
      } else if (s.virtualIdx <= 0) {
        s.virtualIdx = n
        applyMobileTransform(calcMobileX(n, cw), false)
      }

      // Sync active dot
      const realIdx = (s.virtualIdx - 1 + n) % n
      setActiveDot(realIdx)

      scheduleNextMobile()
    }

    trackRef.current?.addEventListener('transitionend', onEnd, { once: true })
  }, [n, scheduleNextMobile])

  // ─── Measure & Resize ─────────────────────────────────────────────────────
  const measure = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    const w = el.clientWidth
    const isMob = w < 640 // < 640px is mobile phones; >= 640px is tablet & desktop
    setIsMobile(isMob)

    const s = S.current
    s.isMobile = isMob
    s.marqueeSpeed = (speed || 0.5) * 1.0

    if (isMob) {
      // Mobile: 1 centered card with 56px peek on both sides
      const cw = Math.max(100, w - 2 * PEEK_PX)
      s.perView = 1
      s.cardWidth = cw
      if (s.virtualIdx < 1 || s.virtualIdx > n) {
        s.virtualIdx = 1
      }
      setCardWidthPx(cw)
      setActiveDot((s.virtualIdx - 1 + n) % n)

      applyMobileTransform(calcMobileX(s.virtualIdx, cw), false)

      if (autoPlay && n > 1) {
        scheduleNextMobile()
      }
    } else {
      // Desktop & Tablet: Smooth horizontal infinite scrolling
      if (s.timer) {
        clearTimeout(s.timer)
        s.timer = null
      }
      const pv = w >= 1024 ? 3 : 2
      const cw = Math.max(100, Math.floor((w - (pv - 1) * GAP_PX) / pv))
      s.perView = pv
      s.cardWidth = cw
      s.singleSetWidth = n * (cw + GAP_PX)
      setCardWidthPx(cw)

      // Ensure transform is applied without transition
      if (trackRef.current) {
        trackRef.current.style.transition = 'none'
        trackRef.current.style.transform = `translate3d(${s.marqueeX}px, 0, 0)`
      }
    }
  }, [n, autoPlay, speed, scheduleNextMobile])

  // ─── Resize Observer ──────────────────────────────────────────────────────
  useEffect(() => {
    measure()
    const ro = new ResizeObserver(measure)
    if (containerRef.current) ro.observe(containerRef.current)

    return () => {
      ro.disconnect()
      if (S.current.timer) clearTimeout(S.current.timer)
    }
  }, [measure])

  // ─── Desktop/Tablet Continuous Animation Loop (RAF) ───────────────────────
  useEffect(() => {
    let rafId: number
    let lastTime = performance.now()

    const animate = (now: number) => {
      const dt = Math.min(now - lastTime, 64) // prevent jump if tab was backgrounded
      lastTime = now

      const s = S.current
      if (!s.isMobile && !s.isHovered && !s.isDragging && s.singleSetWidth > 0 && n > 1) {
        const movePx = s.marqueeSpeed * (dt / 16.67)
        s.marqueeX -= movePx

        // Seamless infinite loop wrap
        while (s.marqueeX <= -s.singleSetWidth) {
          s.marqueeX += s.singleSetWidth
        }
        while (s.marqueeX > 0) {
          s.marqueeX -= s.singleSetWidth
        }

        if (trackRef.current) {
          trackRef.current.style.transition = 'none'
          trackRef.current.style.transform = `translate3d(${s.marqueeX}px, 0, 0)`
        }
      }

      rafId = requestAnimationFrame(animate)
    }

    rafId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId)
  }, [n])

  // ─── Drag & Interaction Event Handlers ────────────────────────────────────
  useEffect(() => {
    const onGlobalMove = (e: MouseEvent) => {
      const s = S.current
      if (!s.isDragging) return
      const delta = e.clientX - s.dragStartX
      if (Math.abs(delta) > 5) s.hasDragged = true

      if (s.hasDragged) {
        if (s.isMobile) {
          applyMobileTransform(s.dragBaseX + delta, false)
        } else {
          s.marqueeX = s.dragBaseX + delta
          if (s.singleSetWidth > 0) {
            while (s.marqueeX <= -s.singleSetWidth) s.marqueeX += s.singleSetWidth
            while (s.marqueeX > 0) s.marqueeX -= s.singleSetWidth
          }
          if (trackRef.current) {
            trackRef.current.style.transition = 'none'
            trackRef.current.style.transform = `translate3d(${s.marqueeX}px, 0, 0)`
          }
        }
      }
    }

    const onGlobalUp = (e: MouseEvent) => {
      const s = S.current
      if (!s.isDragging) return
      s.isDragging = false

      if (s.isMobile) {
        if (!s.hasDragged) {
          if (!s.isHovered) scheduleNextMobile()
          return
        }
        const delta = e.clientX - s.dragStartX
        const step = s.cardWidth + GAP_PX
        if (delta < -step * 0.2) {
          doMobileSlide(1, undefined, 700, EASE_MOBILE_RELEASE)
        } else if (delta > step * 0.2) {
          doMobileSlide(-1, undefined, 700, EASE_MOBILE_RELEASE)
        } else {
          applyMobileTransform(calcMobileX(s.virtualIdx, s.cardWidth), true, 500, EASE_MOBILE_RELEASE)
          scheduleNextMobile()
        }
      } else {
        // Desktop: smoothly continue drifting from wherever released
        setTimeout(() => {
          s.hasDragged = false
        }, 50)
      }
    }

    document.addEventListener('mousemove', onGlobalMove)
    document.addEventListener('mouseup', onGlobalUp)

    return () => {
      document.removeEventListener('mousemove', onGlobalMove)
      document.removeEventListener('mouseup', onGlobalUp)
    }
  }, [scheduleNextMobile, doMobileSlide])

  // Mouse handlers
  const onMouseEnter = () => {
    S.current.isHovered = true
    if (S.current.timer) clearTimeout(S.current.timer)
  }

  const onMouseLeave = () => {
    S.current.isHovered = false
    if (S.current.isMobile && !S.current.isSliding && !S.current.isDragging) {
      scheduleNextMobile()
    }
  }

  const onMouseDown = (e: React.MouseEvent) => {
    if (n <= 1) return
    const s = S.current
    if (s.isMobile && s.isSliding) return

    s.isDragging = true
    s.hasDragged = false
    s.dragStartX = e.clientX
    s.dragBaseX = s.isMobile ? calcMobileX(s.virtualIdx, s.cardWidth) : s.marqueeX
  }

  // Touch handlers
  const onTouchStart = (e: React.TouchEvent) => {
    if (n <= 1) return
    const s = S.current
    if (s.isMobile && s.isSliding) return

    s.isDragging = true
    s.hasDragged = false
    s.dragStartX = e.touches[0].clientX
    s.dragBaseX = s.isMobile ? calcMobileX(s.virtualIdx, s.cardWidth) : s.marqueeX
  }

  const onTouchMove = (e: React.TouchEvent) => {
    const s = S.current
    if (!s.isDragging) return
    const delta = e.touches[0].clientX - s.dragStartX
    if (Math.abs(delta) > 5) s.hasDragged = true

    if (s.hasDragged) {
      if (s.isMobile) {
        applyMobileTransform(s.dragBaseX + delta, false)
      } else {
        s.marqueeX = s.dragBaseX + delta
        if (s.singleSetWidth > 0) {
          while (s.marqueeX <= -s.singleSetWidth) s.marqueeX += s.singleSetWidth
          while (s.marqueeX > 0) s.marqueeX -= s.singleSetWidth
        }
        if (trackRef.current) {
          trackRef.current.style.transition = 'none'
          trackRef.current.style.transform = `translate3d(${s.marqueeX}px, 0, 0)`
        }
      }
    }
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    const s = S.current
    if (!s.isDragging) return
    s.isDragging = false

    if (s.isMobile) {
      if (!s.hasDragged) {
        if (!s.isHovered) scheduleNextMobile()
        return
      }
      const delta = e.changedTouches[0].clientX - s.dragStartX
      const step = s.cardWidth + GAP_PX
      if (delta < -step * 0.2) {
        doMobileSlide(1, undefined, 700, EASE_MOBILE_RELEASE)
      } else if (delta > step * 0.2) {
        doMobileSlide(-1, undefined, 700, EASE_MOBILE_RELEASE)
      } else {
        applyMobileTransform(calcMobileX(s.virtualIdx, s.cardWidth), true, 500, EASE_MOBILE_RELEASE)
        scheduleNextMobile()
      }
    } else {
      setTimeout(() => {
        s.hasDragged = false
      }, 50)
    }
  }

  // Dot click on mobile
  const onDotClick = (idx: number) => {
    const s = S.current
    if (!s.isMobile || s.isSliding || idx === activeDot || n <= 1) return
    setActiveDot(idx)
    doMobileSlide(1, idx + 1, 700)
  }

  // Prevent link/button trigger if user was dragging
  const onClickCapture = (e: React.MouseEvent) => {
    if (S.current.hasDragged) {
      e.stopPropagation()
      e.preventDefault()
    }
  }

  return (
    <div className="w-full max-w-full space-y-6 overflow-hidden">
      <div
        ref={containerRef}
        className="overflow-hidden w-full max-w-full py-4 cursor-grab active:cursor-grabbing relative"
        style={{ touchAction: 'pan-y', userSelect: 'none' }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onClickCapture={onClickCapture}
      >
        {cardWidthPx > 0 && (
          <div
            ref={trackRef}
            className="flex items-stretch"
            style={{ gap: `${GAP_PX}px`, willChange: 'transform' }}
          >
            {displayList.map(({ item, origIdx, isClone, key }) => (
              <div
                key={key}
                className="flex-shrink-0"
                style={{ width: `${cardWidthPx}px`, userSelect: 'none' }}
              >
                {renderItem(item, origIdx, isClone)}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mobile-Only Centered Pagination Dots */}
      {isMobile && n > 1 && (
        <div className="flex justify-center items-center gap-3 pt-2 sm:hidden">
          {showArrows && (
            <button
              type="button"
              onClick={() => doMobileSlide(-1, undefined, 700)}
              className="p-1.5 rounded-full border border-gray-200 text-charcoal/60 hover:text-primary hover:border-primary/40 transition-colors focus:outline-none cursor-pointer"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}

          <div className="flex items-center gap-2">
            {Array.from({ length: n }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onDotClick(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeDot === idx
                    ? 'bg-primary w-6'
                    : 'bg-charcoal/20 hover:bg-charcoal/40 w-2.5'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {showArrows && (
            <button
              type="button"
              onClick={() => doMobileSlide(1, undefined, 700)}
              className="p-1.5 rounded-full border border-gray-200 text-charcoal/60 hover:text-primary hover:border-primary/40 transition-colors focus:outline-none cursor-pointer"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </div>
  )
}
