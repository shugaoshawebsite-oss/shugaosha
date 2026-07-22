'use client'

import React, { useRef, useEffect, useState, useCallback } from 'react'

interface MarqueeCarouselProps<T> {
  items: T[]
  renderItem: (item: T, index: number, isClone: boolean) => React.ReactNode
  speed?: number // kept for API compat, unused
}

// ─── Config ──────────────────────────────────────────────────────────────────
const PAUSE_MS       = 5000   // 5s pause between slides
const SLIDE_MS       = 2000   // 2s slide duration
const GAP_PX         = 24     // gap between cards
const PEEK_PX        = 56     // adjacent-card peek width on each side

// Silky curves:
const EASE_AUTO      = 'cubic-bezier(0.4, 0, 0.2, 1)'      // smooth start/stop for auto-slide
const EASE_RELEASE   = 'cubic-bezier(0.25, 1, 0.5, 1)'     // soft ease-out for momentum-release (no double-ease-in)

function getPerView(w: number): number {
  if (w >= 1024) return 3
  if (w >= 640)  return 2
  return 1
}

export default function MarqueeCarousel<T>({
  items,
  renderItem,
}: MarqueeCarouselProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef     = useRef<HTMLDivElement>(null)
  const n = items.length

  // ── Layout & Page-based clone state ────────────────────────────────────────
  const [perView,      setPerView]      = useState(3)
  const [cardWidthPx,  setCardWidthPx]  = useState(0)
  const [totalSets,    setTotalSets]    = useState(1)
  const [activeDot,    setActiveDot]    = useState(0)

  // ── All mutable state inside S ref to avoid stale closure issues ──────────
  const S = useRef({
    perView:    3,
    cardWidth:  0,
    totalSets:  1,
    virtualIdx: 3,       // current virtual index (starts at perView)
    isSliding:  false,
    isHovered:  false,
    isDragging: false,
    hasDragged: false,
    dragStartX: 0,
    dragBaseX:  0,
    timer:      null as ReturnType<typeof setTimeout> | null,
  })

  // ── Page-based cloning setup ───────────────────────────────────────────────
  const baseCount = totalSets * perView
  const displayItems: T[] = []
  
  if (n > 0) {
    // 1. Prepend clone of last set (length = perView)
    for (let i = 0; i < perView; i++) {
      const idx = ((totalSets - 1) * perView + i) % n
      displayItems.push(items[idx])
    }
    // 2. Base sequence (length = totalSets * perView)
    for (let i = 0; i < baseCount; i++) {
      displayItems.push(items[i % n])
    }
    // 3. Append clone of first set (length = perView)
    for (let i = 0; i < perView; i++) {
      displayItems.push(items[i % n])
    }
  }

  // ── DOM Helpers ────────────────────────────────────────────────────────────
  const calcX = (vi: number, cw: number) => PEEK_PX - vi * (cw + GAP_PX)

  const applyTransform = (x: number, animate = false, duration = SLIDE_MS, easing = EASE_AUTO) => {
    const el = trackRef.current
    if (!el) return
    if (animate) {
      el.style.transition = 'none'
      void el.offsetHeight // Force browser reflow to register current layout state
      el.style.transition = `transform ${duration}ms ${easing}`
    } else {
      el.style.transition = 'none'
    }
    el.style.transform  = `translateX(${x}px)`
  }

  // ── Schedule Next Slide ────────────────────────────────────────────────────
  const scheduleNext = () => {
    const s = S.current
    if (s.timer) clearTimeout(s.timer)
    s.timer = setTimeout(() => {
      if (!s.isHovered && !s.isDragging && !s.isSliding) {
        doSlide(1)
      }
    }, PAUSE_MS)
  }

  // ── Perform Slide ──────────────────────────────────────────────────────────
  const doSlide = (direction: 1 | -1, targetVI?: number, customDuration?: number, easing = EASE_AUTO) => {
    const s = S.current
    if (s.isSliding || s.cardWidth === 0) return
    s.isSliding = true

    const cw = s.cardWidth
    const pv = s.perView
    const nextVI = targetVI ?? s.virtualIdx + direction * pv

    // Calculate next active dot
    if (targetVI === undefined) {
      setActiveDot(d => (d + direction + s.totalSets) % s.totalSets)
    }

    const targetX = calcX(nextVI, cw)
    const duration = customDuration ?? SLIDE_MS

    applyTransform(targetX, true, duration, easing)
    s.virtualIdx = nextVI

    const onEnd = () => {
      trackRef.current?.removeEventListener('transitionend', onEnd)
      s.isSliding = false
      
      // Snap silently if we reached clones
      if (s.virtualIdx >= (s.totalSets + 1) * pv) {
        s.virtualIdx = pv
      } else if (s.virtualIdx <= 0) {
        s.virtualIdx = s.totalSets * pv
      }
      
      applyTransform(calcX(s.virtualIdx, cw), false)
      scheduleNext()
    }
    trackRef.current?.addEventListener('transitionend', onEnd, { once: true })
  }

  // ── Measure ────────────────────────────────────────────────────────────────
  const measure = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    const w  = el.clientWidth
    const pv = getPerView(w)
    const cw = Math.max(100, Math.floor((w - 2 * PEEK_PX - (pv - 1) * GAP_PX) / pv))
    const ts = Math.ceil(n / pv)

    const s = S.current
    s.perView    = pv
    s.cardWidth  = cw
    s.totalSets  = ts
    s.virtualIdx = pv // starts at index perView (after prepend clone)
    s.isSliding  = false

    setPerView(pv)
    setCardWidthPx(cw)
    setTotalSets(ts)
    setActiveDot(0)

    applyTransform(calcX(pv, cw), false)
    scheduleNext()
  }, [n])

  useEffect(() => {
    measure()
    const ro = new ResizeObserver(measure)
    if (containerRef.current) ro.observe(containerRef.current)

    // Global mouse event handlers
    const onGlobalMove = (e: MouseEvent) => {
      const s = S.current
      if (!s.isDragging) return
      const delta = e.clientX - s.dragStartX
      if (Math.abs(delta) > 5) s.hasDragged = true
      if (s.hasDragged) applyTransform(s.dragBaseX + delta, false)
    }

    const onGlobalUp = (e: MouseEvent) => {
      const s = S.current
      if (!s.isDragging) return
      s.isDragging = false
      if (!s.hasDragged) { if (!s.isHovered) scheduleNext(); return }
      
      const delta = e.clientX - s.dragStartX
      const step  = s.cardWidth + GAP_PX
      const totalDist = s.perView * step
      
      if (delta < -step * 0.2) {
        const nextVI = s.virtualIdx + s.perView
        const currentX = s.dragBaseX + delta
        const targetX = calcX(nextVI, s.cardWidth)
        const dist = Math.abs(targetX - currentX)
        // Non-linear duration scaling for a smoother transition deceleration
        const duration = Math.max(800, Math.round(SLIDE_MS * Math.pow(dist / totalDist, 0.5)))
        doSlide(1, undefined, duration, EASE_RELEASE)
      } else if (delta > step * 0.2) {
        const prevVI = s.virtualIdx - s.perView
        const currentX = s.dragBaseX + delta
        const targetX = calcX(prevVI, s.cardWidth)
        const dist = Math.abs(targetX - currentX)
        const duration = Math.max(800, Math.round(SLIDE_MS * Math.pow(dist / totalDist, 0.5)))
        doSlide(-1, undefined, duration, EASE_RELEASE)
      } else {
        const currentX = s.dragBaseX + delta
        const dist = Math.abs(s.dragBaseX - currentX)
        const duration = Math.max(500, Math.round(SLIDE_MS * Math.pow(dist / totalDist, 0.5)))
        applyTransform(s.dragBaseX, true, duration, EASE_RELEASE)
        scheduleNext()
      }
    }

    document.addEventListener('mousemove', onGlobalMove)
    document.addEventListener('mouseup',   onGlobalUp)

    return () => {
      ro.disconnect()
      document.removeEventListener('mousemove', onGlobalMove)
      document.removeEventListener('mouseup',   onGlobalUp)
      if (S.current.timer) clearTimeout(S.current.timer)
    }
  }, [measure])

  // ── Hover ──────────────────────────────────────────────────────────────────
  const onMouseEnter = () => {
    S.current.isHovered = true
    if (S.current.timer) clearTimeout(S.current.timer)
  }
  const onMouseLeave = () => {
    S.current.isHovered = false
    if (!S.current.isSliding && !S.current.isDragging) scheduleNext()
  }

  // ── Drag Start ─────────────────────────────────────────────────────────────
  const onMouseDown = (e: React.MouseEvent) => {
    const s = S.current
    if (s.isSliding) return
    e.preventDefault()
    s.isDragging  = true
    s.hasDragged  = false
    s.dragStartX  = e.clientX
    s.dragBaseX   = calcX(s.virtualIdx, s.cardWidth)
    applyTransform(s.dragBaseX, false)
  }

  const onTouchStart = (e: React.TouchEvent) => {
    const s = S.current
    if (s.isSliding) return
    s.isDragging  = true
    s.hasDragged  = false
    s.dragStartX  = e.touches[0].clientX
    s.dragBaseX   = calcX(s.virtualIdx, s.cardWidth)
    applyTransform(s.dragBaseX, false)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    const s = S.current
    if (!s.isDragging) return
    const delta = e.touches[0].clientX - s.dragStartX
    if (Math.abs(delta) > 5) s.hasDragged = true
    if (s.hasDragged) applyTransform(s.dragBaseX + delta, false)
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    const s = S.current
    if (!s.isDragging) return
    s.isDragging = false
    if (!s.hasDragged) { if (!s.isHovered) scheduleNext(); return }
    
    const delta = e.changedTouches[0].clientX - s.dragStartX
    const step  = s.cardWidth + GAP_PX
    const totalDist = s.perView * step
    
    if (delta < -step * 0.2) {
      const nextVI = s.virtualIdx + s.perView
      const currentX = s.dragBaseX + delta
      const targetX = calcX(nextVI, s.cardWidth)
      const dist = Math.abs(targetX - currentX)
      const duration = Math.max(800, Math.round(SLIDE_MS * Math.pow(dist / totalDist, 0.5)))
      doSlide(1, undefined, duration, EASE_RELEASE)
    } else if (delta > step * 0.2) {
      const prevVI = s.virtualIdx - s.perView
      const currentX = s.dragBaseX + delta
      const targetX = calcX(prevVI, s.cardWidth)
      const dist = Math.abs(targetX - currentX)
      const duration = Math.max(800, Math.round(SLIDE_MS * Math.pow(dist / totalDist, 0.5)))
      doSlide(-1, undefined, duration, EASE_RELEASE)
    } else {
      const currentX = s.dragBaseX + delta
      const dist = Math.abs(s.dragBaseX - currentX)
      const duration = Math.max(500, Math.round(SLIDE_MS * Math.pow(dist / totalDist, 0.5)))
      applyTransform(s.dragBaseX, true, duration, EASE_RELEASE)
      scheduleNext()
    }
  }

  // ── Dot click ──────────────────────────────────────────────────────────────
  const onDotClick = (idx: number) => {
    const s = S.current
    if (s.isSliding || idx === activeDot) return
    setActiveDot(idx)
    doSlide(1, perView + idx * perView)
  }

  return (
    <div className="w-full max-w-full space-y-6 overflow-hidden">
      <div
        ref={containerRef}
        className="overflow-hidden w-full max-w-full py-4 cursor-grab active:cursor-grabbing"
        style={{ touchAction: 'pan-y', userSelect: 'none' }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {cardWidthPx > 0 && (
          <div
            ref={trackRef}
            className="flex"
            style={{ gap: `${GAP_PX}px`, willChange: 'transform' }}
          >
            {displayItems.map((item, idx) => {
              const isClone = idx < perView || idx >= (totalSets + 1) * perView
              const origIdx = idx < perView ? ((totalSets - 1) * perView + idx) % n : (idx - perView) % n
              return (
                <div
                  key={idx}
                  className="flex-shrink-0"
                  style={{ width: `${cardWidthPx}px`, userSelect: 'none' }}
                >
                  {renderItem(item, origIdx, isClone)}
                </div>
              )
            })}
          </div>
        )}
      </div>

      <div className="flex justify-center items-center gap-2 pt-2">
        {Array.from({ length: totalSets }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => onDotClick(idx)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              activeDot === idx
                ? 'bg-primary w-6'
                : 'bg-charcoal/20 hover:bg-charcoal/40 w-2.5'
            }`}
            aria-label={`Go to slide set ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
