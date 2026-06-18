'use client'

import { useId } from 'react'

type Media = { url?: string | null } | number | null

type Item = {
  id?: string | null
  title: string
  text?: string | null
}

type Props = {
  backgroundImage?: Media
  title: string
  items: Item[]
}

function mediaUrl(media: Media | undefined): string | null {
  return typeof media === 'object' && media !== null ? (media.url ?? null) : null
}

export function WhyEngageBlock({ backgroundImage, title, items }: Props) {
  const filterId = useId()
  const bgUrl = mediaUrl(backgroundImage)

  return (
    <section
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-mauve-900 bg-cover bg-center px-6 py-16"
      style={bgUrl ? { backgroundImage: `url(${bgUrl})` } : undefined}
    >
      <svg width="0" height="0" aria-hidden className="absolute overflow-hidden">
        <defs>
          <filter id={filterId}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.900 0.900"
              numOctaves="2"
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

      <div className="relative w-full max-w-xl aspect-[3/4] bg-purple-400">

        <div className="absolute bottom-0 left-0 right-0 h-[60%] flex flex-col justify-between p-8">

          <div style={{ filter: `url(#${filterId})` }}>
            <h2 className="font-tanker text-mauve-900 uppercase leading-none tracking-tight text-[clamp(2rem,5vw,3rem)]">
              {title}
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {items.map((item, i) => (
              <div key={item.id ?? i} className="flex gap-6">
                <span className="font-bold text-mauve-900 text-sm leading-snug w-36 shrink-0">
                  {item.title}
                </span>
                {item.text && (
                  <span className="text-mauve-900 text-sm leading-snug">
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
