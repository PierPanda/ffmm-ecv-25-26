'use client'

import { useId, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Item = {
  id?: string | null
  title: string
  text?: string | null
}

type Props = {
  title: string
  items: Item[]
}

export function WhyEngageBlock({ title, items }: Props) {
  const filterId = useId()
  const sectionRef = useRef<HTMLElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const overlay = overlayRef.current
    if (!section || !overlay) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        overlay,
        { opacity: 0 },
        {
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 20%',
            end: 'top top',
            scrub: true,
          },
        },
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-screen overflow-hidden flex items-center justify-center px-4 sm:px-0 h-dvh"
    >
      <svg width="0" height="0" aria-hidden className="absolute overflow-hidden">
        <defs>
          <filter id={filterId}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.990 0.990"
              numOctaves="4"
              seed="8000"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="4"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Overlay mauve-900 animé au scroll */}
      <div ref={overlayRef} className="absolute inset-0 z-0">
        <div className="absolute inset-0 backdrop-blur-2xl" />
        <div className="absolute inset-0 bg-mauve-900" />
      </div>

      {/* Content card */}
      <div className="relative z-10 w-full bg-purple-400 max-w-155 @container max-h-[95vh] min-h-[80vh] sm:min-h-0 sm:aspect-720/846">
        <div className="absolute inset-0 flex flex-col">

          <div className="h-[35%] sm:h-[60%] flex items-start p-6 @xl:p-10" style={{ filter: `url(#${filterId})` }}>
            <h2 className="font-tanker text-mauve-900 uppercase leading-none tracking-tight text-4xl @xs:text-5xl @sm:text-6xl @lg:text-8xl mb-4 @xl:pr-9">
              {title}
            </h2>
          </div>

          <div className="h-[65%] sm:h-[40%] flex flex-col justify-around px-6 pb-6 pt-2 sm:px-10">
            {items.map((item, i) => (
              <div key={item.id ?? i} className="flex flex-col gap-2 sm:flex-row sm:gap-3">
                <span className="font-bold text-mauve-900 text-base sm:text-xs sm:w-20 sm:shrink-0 leading-snug">
                  {item.title}
                </span>
                {item.text && (
                  <span className="text-mauve-900 text-base sm:text-sm leading-snug">
                    {item.text}
                  </span>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
