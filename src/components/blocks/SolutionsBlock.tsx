'use client'

import { useId } from 'react'
import { Button } from '@/components/ui/Button'

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

  return (
    <section className="w-full p-8 flex flex-col gap-8 bg-mauve-900">
      <svg width="0" height="0" aria-hidden className="absolute overflow-hidden">
        <defs>
          <filter id={filterId}>
            <feTurbulence type="fractalNoise" baseFrequency="0.900 0.900" numOctaves="2" seed="8000" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
      <p className="px-8 py-6 font-tanker text-purple-400 uppercase text-5xl leading-none">
        {sectionTitle}
      </p>

      {items.map((item, i) => {
        const bgUrl = mediaUrl(item.backgroundImage)
        return (
          <div key={item.id ?? i} className="relative overflow-hidden min-h-[95vh] md:min-h-[80vh] flex items-center">
            {bgUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={bgUrl}
                alt=""
                aria-hidden
                className="absolute inset-0 w-full h-full object-cover object-top opacity-50"
              />
            )}
            <div className="absolute inset-0 bg-mauve-900/65" />

            <div className="relative z-10 flex justify-between items-center gap-8 w-full px-8 md:px-16 py-12">
              <div className="w-[35%] shrink-0">
                <h2 className="font-tanker text-white uppercase leading-none text-8xl" style={{ filter: `url(#${filterId})` }}>
                  {item.title}
                </h2>
              </div>

              <div className="w-[25%] shrink-0 flex flex-col gap-6">
                {item.description && (
                  <p className="text-white/80 text-base leading-relaxed">{item.description}</p>
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
