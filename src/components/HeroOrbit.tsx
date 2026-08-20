'use client'

import { heroMedia } from '@/data/media'
import { useCallback, useEffect, useRef, useState } from 'react'

const { orbitImages, avatars: avatarImages } = heroMedia

const ORBIT_RADIUS = 210
const IMG_SIZE     = 76
const AVATAR_SIZE  = 210
const CX           = 280
const CY           = 250

const START_ANGLE = 90
const END_ANGLE   = 410
const TOTAL_ARC   = END_ANGLE - START_ANGLE

export default function HeroOrbit() {
  const [paused, setPaused]         = useState(false)
  const [activeAvatar, setActiveAvatar] = useState(0)
  const [hovered, setHovered]       = useState<number | null>(null)
  const [avatarHovered, setAvatarHovered] = useState(false)
  const [selectedImg, setSelectedImg] = useState<{ src: string; label: string } | null>(null)
  const [imgErrors, setImgErrors]   = useState<Record<number, boolean>>({})

  const rotRef    = useRef(0)
  const rafRef    = useRef<number>()
  const lastRef   = useRef<number>()
  const imgRefs   = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const avatarTimer = window.setInterval(() => {
      setActiveAvatar(current => (current + 1) % avatarImages.length)
    }, 2200)

    return () => window.clearInterval(avatarTimer)
  }, [])

  useEffect(() => {
    document.body.style.overflow = selectedImg ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [selectedImg])

  const tick = useCallback((time: number) => {
    if (!lastRef.current) lastRef.current = time
    const delta = time - lastRef.current
    lastRef.current = time

    if (!paused) {
      // Oscillate back and forth smoothly across the arc top
      rotRef.current = (rotRef.current + 0.015 * delta) % 360

      orbitImages.forEach((_, i) => {
        const el = imgRefs.current[i]
        if (!el) return

        const baseAngle = START_ANGLE + (i / (orbitImages.length - 1)) * TOTAL_ARC
        const angle = (baseAngle + rotRef.current) % 360
        const rad = (angle * Math.PI) / 180

        const x = CX + ORBIT_RADIUS * Math.cos(rad) - IMG_SIZE / 2
        const y = CY + ORBIT_RADIUS * Math.sin(rad) - IMG_SIZE / 2

        // Dynamic Opacity & Scale: Fade out smoothly as cards lower into fog
        const cutoffY = CY - 10
        let opacity = 1
        let scale = 1

        if (y > cutoffY) {
          const depth = y - cutoffY
          opacity = Math.max(0, 1 - depth / 65)
          scale = Math.max(0.7, 1 - depth / 200)
        }

        el.style.transform = `translate(${x}px, ${y}px) scale(${scale})`
        el.style.opacity = `${opacity}`
        el.style.pointerEvents = opacity < 0.2 ? 'none' : 'auto'

        const inner = el.querySelector('.orbit-card') as HTMLElement
        if (inner) inner.style.transform = `rotate(${-rotRef.current}deg)`
      })
    }

    rafRef.current = requestAnimationFrame(tick)
  }, [paused])

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [tick])

  return (
    <>
     <div
  className="relative mx-auto select-none"
  style={{ width: CX * 2, height: CY + 20 }}
>
  {/* ── Seamless Fog Overlay (No Box Outline) ── */}
  <div
    className="absolute inset-x-0 bottom-0 pointer-events-none z-20 h-36"
    style={{
      background: 'linear-gradient(to top, #f0ece900 25%, rgba(240, 237, 234, 0.7) 65%, transparent 100%)',
      WebkitMaskImage: 'linear-gradient(to top, black 70%, transparent 100%)',
      maskImage: 'linear-gradient(to top, black 70%, transparent 100%)',
    }}
  />


        {/* ── Orbiting Images ── */}
        {orbitImages.map((item, i) => {
          const baseAngle = START_ANGLE + (i / (orbitImages.length - 1)) * TOTAL_ARC
          const rad = (baseAngle * Math.PI) / 180
          const initX = CX + ORBIT_RADIUS * Math.cos(rad) - IMG_SIZE / 2
          const initY = CY + ORBIT_RADIUS * Math.sin(rad) - IMG_SIZE / 2

          return (
            <div
              key={i}
              ref={el => { imgRefs.current[i] = el }}
              className="absolute z-10 cursor-pointer transition-opacity duration-300"
              style={{
                width: IMG_SIZE,
                height: IMG_SIZE,
                transform: `translate(${initX}px, ${initY}px)`,
                top: 0,
                left: 0,
              }}
              onMouseEnter={() => { setPaused(true); setHovered(i) }}
              onMouseLeave={() => { setPaused(false); setHovered(null) }}
              onClick={() => setSelectedImg(item)}
            >
              {/* Tooltip Speech Bubble */}
              {hovered === i && (
                <div
                  className="speech-bubble absolute left-1/2 -top-11 z-30 pointer-events-none"
                  style={{ transform: 'translateX(-50%)' }}
                >
                  {item.label}
                </div>
              )}

              {/* Squircle Card Container */}
              <div
                className="orbit-card w-full h-full rounded-[20px] overflow-hidden bg-neutral-200 border border-black/10 shadow-md transition-transform duration-200 hover:scale-110 active:scale-95"
                style={{ willChange: 'transform' }}
              >
                {!imgErrors[i] ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={item.src}
                    alt={item.label}
                    className="w-full h-full object-cover"
                    onError={() => setImgErrors(p => ({ ...p, [i]: true }))}
                  />
                ) : (
                  <div className="w-full h-full bg-neutral-300/80 flex items-center justify-center text-[10px] font-mono text-neutral-600 text-center px-1">
                    📷
                  </div>
                )}
              </div>
            </div>
          )
        })}

        {/* ── Cycling Center Avatar ── */}
        <div
          className="absolute z-10 flex items-center justify-center"
          style={{
            left: CX - AVATAR_SIZE / 2,
            top: CY - AVATAR_SIZE / 2,
            width: AVATAR_SIZE,
            height: AVATAR_SIZE,
          }}
          onMouseEnter={() => { setPaused(true); setAvatarHovered(true) }}
          onMouseLeave={() => { setPaused(false); setAvatarHovered(false) }}
        >
          {avatarHovered && (
            <div className="speech-bubble absolute left-1/2 -top-11 z-30 pointer-events-none -translate-x-1/2">
              Flutter developer
            </div>
          )}

          {avatarImages.map((src, i) => (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              key={src}
              src={src}
              alt="Faizan"
              className="absolute w-full h-full object-contain transition-opacity duration-500"
              style={{ opacity: activeAvatar === i ? 1 : 0 }}
            />
          ))}
        </div>
      </div>

      {/* ── Fullscreen Lightbox Modal ── */}
      {selectedImg && (
        <div
          className="fixed inset-0 z-[100] bg-black/55 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedImg(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-[#F0EDEA] rounded-2xl overflow-hidden shadow-2xl border border-white/20 p-2"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
              onClick={() => setSelectedImg(null)}
            >
              ✕
            </button>
            <div className="w-full h-[65vh] rounded-xl overflow-hidden bg-neutral-900 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedImg.src}
                alt={selectedImg.label}
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none'
                }}
              />
            </div>
            <div className="p-4 text-center">
              <span className="text-sm font-medium text-neutral-800 font-mono">
                {selectedImg.label}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}