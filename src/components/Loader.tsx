'use client'

import { useEffect, useRef, useState } from 'react'

const FADE_DURATION = 600 // ms

export function Loader() {
  const [phase, setPhase] = useState<'visible' | 'fading' | 'done'>('visible')
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (sessionStorage.getItem('loaderShown') || window.innerWidth < 768) {
      setPhase('done')
      return
    }
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const handleEnded = () => {
    setPhase('fading')
    setTimeout(() => {
      setPhase('done')
      document.body.style.overflow = ''
      sessionStorage.setItem('loaderShown', '1')
    }, FADE_DURATION)
  }

  if (phase === 'done') return null

  return (
    <div
      aria-hidden
      inert={phase === 'fading'}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-mauve-900 pointer-events-auto"
      style={{
        opacity: phase === 'fading' ? 0 : 1,
        transition: `opacity ${FADE_DURATION}ms ease`,
      }}
    >
      <video
        ref={videoRef}
        src="/loader.webm"
        autoPlay
        muted
        playsInline
        onEnded={handleEnded}
        className="w-full h-full object-cover"
      />
    </div>
  )
}
