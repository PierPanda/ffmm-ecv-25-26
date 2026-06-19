'use client'

import { useId } from 'react'

type Item = {
  id?: string | null
  title: string
  text?: string | null
}

type Props = {
  title: string
  items: Item[]
}

const MARQUEE_ITEMS = Array.from({ length: 16 })

export function WhyEngageBlock({ title, items }: Props) {
  const filterId = useId()

  return (
    <section className="relative w-full overflow-hidden bg-mauve-900 flex items-center justify-center px-4 sm:px-0 h-dvh">
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

      {/* Marquee band */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-0 overflow-hidden pointer-events-none">
        <div className="flex items-center animate-marquee-scroll">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {MARQUEE_ITEMS.map((_, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={i}
                  src="/icons/marquee.png"
                  alt="cross shadder"
                  aria-hidden
                  className="h-screen w-screen shrink-0 object-contain"
                />
              ))}
            </div>
          ))}
        </div>
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
