import Link from 'next/link'

type Media = { url?: string | null } | number | null

type Card = {
  id?: string | null
  pictogram?: Media
  title: string
  text?: string | null
  ctaHref?: string | null
}

type Props = {
  backgroundImage?: Media
  cards?: Card[]
}

function mediaUrl(media: Media | undefined): string | null {
  return typeof media === 'object' && media !== null ? (media.url ?? null) : null
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden>
      <path
        d="M9.364 0.264C9.715-0.088 10.285-0.088 10.637 0.264L19.736 9.364C20.088 9.715 20.088 10.285 19.736 10.637L10.637 19.736C10.285 20.088 9.715 20.088 9.364 19.736C9.013 19.385 9.013 18.815 9.364 18.464L13.513 14.315C14.773 13.055 13.881 10.900 12.099 10.900H0.900C0.403 10.900 0 10.497 0 10.000C0 9.503 0.403 9.100 0.900 9.100H12.099C13.881 9.100 14.773 6.946 13.513 5.686L9.364 1.536C9.013 1.185 9.013 0.615 9.364 0.264Z"
        fill="currentColor"
      />
    </svg>
  )
}

function CardInner({ card }: { card: Card }) {
  const picUrl = mediaUrl(card.pictogram)

  return (
    <div className="group relative flex flex-col gap-4 bg-purple-400 p-6 h-full min-h-[280px] pb-16">
      {picUrl && (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-mauve-900 shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={picUrl} alt="" aria-hidden className="h-5 w-5 object-contain" />
        </div>
      )}

      <h3 className="font-tanker text-mauve-900 uppercase leading-tight text-2xl md:text-3xl">
        {card.title}
      </h3>

      {card.text && (
        <p className="text-mauve-900/70 text-sm leading-relaxed">{card.text}</p>
      )}

      <span className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-mauve-900 text-purple-400 group-hover:scale-110 transition-transform">
        <ArrowIcon />
      </span>
    </div>
  )
}

export function SixCardsBlock({ backgroundImage, cards = [] }: Props) {
  const bgUrl = mediaUrl(backgroundImage)

  return (
    <section className="relative w-full overflow-hidden">
      {bgUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={bgUrl}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-mauve-900/55" />

      <div className="relative z-10 p-3 md:p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {cards.map((card, i) =>
            card.ctaHref ? (
              <Link key={card.id ?? i} href={card.ctaHref} className="block">
                <CardInner card={card} />
              </Link>
            ) : (
              <div key={card.id ?? i}>
                <CardInner card={card} />
              </div>
            )
          )}
        </div>
      </div>
    </section>
  )
}
