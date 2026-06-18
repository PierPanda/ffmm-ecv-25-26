const FILTER_ID = 'hero-noise-filter'

type Props = {
  title: string
  subtitle?: string | null
  image?: { url?: string | null } | null
  ctaLabel?: string | null
  ctaHref?: string | null
}

export function HeroBlock({ title, subtitle, ctaLabel, ctaHref }: Props) {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      <svg width="0" height="0" aria-hidden className="absolute overflow-hidden">
        <defs>
          <filter id={FILTER_ID}>
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

      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div className="flex flex-col items-center gap-8 w-full max-w-[597px]">
          <div style={{ filter: `url(#${FILTER_ID})` }}>
            <h1 className="font-tanker font-normal leading-none tracking-[-0.01em] text-center uppercase text-white text-[clamp(2.5rem,7vw,5.75rem)]">
              {title}
            </h1>
          </div>

          {ctaLabel && ctaHref && (
            <a
              href={ctaHref}
              className="px-5 py-2.5 bg-amber-400 text-mauve-900 text-sm font-medium rounded-full"
            >
              {ctaLabel}
            </a>
          )}

          {subtitle && (
            <p className="text-center text-white/70 text-lg leading-snug md:absolute md:bottom-10 md:left-10 md:text-left md:max-w-[597px]">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
