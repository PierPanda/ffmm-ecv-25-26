'use client'

import { useId, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button } from '@/components/ui/Button'

gsap.registerPlugin(ScrollTrigger)

type Media = { url?: string | null } | number | null

type Item = {
  id?: string | null
  title: string
  description?: string | null
  ctaLabel?: string | null
  ctaHref?: string | null
  backgroundImage?: Media
}

type Props = {
  sectionTitle: string
  items: Item[]
}

function mediaUrl(media: Media | undefined): string | null {
  return typeof media === 'object' && media !== null ? (media.url ?? null) : null
}

export function SolutionsBlock({ sectionTitle, items }: Props) {
  const filterId = useId()
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const imgRefs = useRef<(HTMLImageElement | null)[]>([])

  useEffect(() => {
    const ctxs = items.map((item, i) => {
      const trigger = itemRefs.current[i]
      const img = imgRefs.current[i]
      const bgUrl = mediaUrl(item.backgroundImage)
      if (!trigger || !img || !bgUrl) return null

      const ctx = gsap.context(() => {
        gsap.fromTo(
          img,
          { yPercent: -15 },
          {
            yPercent: 15,
            ease: 'none',
            scrollTrigger: {
              trigger,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        )
      }, trigger)

      return ctx
    })

    return () => { ctxs.forEach(ctx => ctx?.revert()) }
  }, [items])

  return (
    <section className="relative w-full p-8 flex flex-col gap-8 bg-mauve-900">
      <svg width="0" height="0" aria-hidden className="absolute overflow-hidden">
        <defs>
          <filter id={filterId}>
            <feTurbulence type="fractalNoise" baseFrequency="0.900 0.900" numOctaves="2" seed="8000" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
      <h2 className="px-8 py-6 font-tanker text-purple-400 uppercase text-5xl leading-none">
        {sectionTitle}
      </h2>

      {items.map((item, i) => {
        const bgUrl = mediaUrl(item.backgroundImage)
        return (
          <div
            key={item.id ?? i}
            ref={el => { itemRefs.current[i] = el }}
            className="relative overflow-hidden min-h-[65vh] md:min-h-[80vh] flex items-center"
          >
            {bgUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                ref={el => { imgRefs.current[i] = el }}
                src={bgUrl}
                alt=""
                aria-hidden
                className="absolute inset-x-0 w-full object-cover object-top opacity-50 will-change-transform"
                style={{ height: '150%', top: '-25%' }}
              />
            )}
            <div className="absolute inset-0 bg-mauve-900/65" />

            <div className="relative z-10 flex flex-col gap-8 w-full px-8 md:px-16 py-12 md:flex-row md:justify-between md:items-center">
              <div className="md:w-[35%] md:shrink-0">
                <h3 className="font-tanker text-white uppercase leading-none text-7xl md:text-8xl" style={{ filter: `url(#${filterId})` }}>
                  {item.title}
                </h3>
              </div>

              <div className="md:w-[25%] md:shrink-0 flex flex-col gap-6">
                {item.description && (
                  <p className="text-white/80 text-xl md:text-lg leading-relaxed">{item.description}</p>
                )}
                {item.ctaLabel && item.ctaHref && (
                  <Button
                    href={item.ctaHref}
                    label={item.ctaLabel}
                    arrow={false}
                    arrowAbsolute
                    className="bg-purple-400 text-mauve-900 border-purple-400"
                  />
                )}
              </div>
            </div>
          </div>
        )
      })}
    </section>
  )
}
