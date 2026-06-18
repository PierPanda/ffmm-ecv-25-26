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
  overlayImage?: Media
  title: string
  items: Item[]
}

function mediaUrl(media: Media | undefined): string | null {
  return typeof media === 'object' && media !== null ? (media.url ?? null) : null
}

export function WhyEngageBlock({ backgroundImage, overlayImage, title, items }: Props) {
  const filterId = useId()
  const bgUrl = mediaUrl(backgroundImage)
  const overlayUrl = mediaUrl(overlayImage)

  return (
    <section
      className={`relative w-full overflow-hidden bg-mauve-900 bg-cover bg-center flex items-center justify-center px-4 sm:px-0 ${bgUrl ? 'h-[125vh]' : 'h-screen pt-24'}`}
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

      <div className="relative w-full bg-purple-400 max-w-155 aspect-720/846 max-h-[95vh] @container">
        <div className="absolute inset-0 flex flex-col">

          <div className="h-[60%] flex items-start p-6 @xl:p-10" style={{ filter: `url(#${filterId})` }}>
            <h2 className="font-tanker text-mauve-900 uppercase leading-none tracking-tight text-4xl @xs:text-5xl @sm:text-6xl @lg:text-7xl @xl:text-8xl mb-4 @xl:pr-9">
              {title}
            </h2>
          </div>

          <div className="h-[40%] flex flex-col justify-around px-6 pb-4 pt-2 @xl:px-10">
            {items.map((item, i) => (
              <div key={item.id ?? i} className="flex gap-3 @xl:gap-4">
                <span className="font-bold text-mauve-900 text-xs @xl:text-sm leading-snug w-20 @xl:w-26 shrink-0">
                  {item.title}
                </span>
                {item.text && (
                  <span className="text-mauve-900 text-xs @xl:text-sm leading-snug">
                    {item.text}
                  </span>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>

      {overlayUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={overlayUrl}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-10"
        />
      )}
    </section>
  )
}
