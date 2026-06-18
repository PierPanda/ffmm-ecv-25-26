import { Button } from '../ui/Button'

type Media = { url?: string | null; alt?: string | null } | number | null

type Pack = {
  id?: string | null
  title: string
  subtitle?: string | null
  description?: string | null
  image?: Media
  ctaLabel?: string | null
  ctaHref?: string | null
}

type Props = {
  title: string
  packs?: Pack[] | null
}

function mediaUrl(media: Media | undefined): string | null {
  return typeof media === 'object' && media ? (media.url ?? null) : null
}

function mediaAlt(media: Media | undefined): string {
  return typeof media === 'object' && media?.alt ? media.alt : ''
}

export function PacksBlock({ title, packs }: Props) {
  const items = packs ?? []

  return (
    <section className="w-full bg-mauve-900 px-6 py-16 md:py-24">
      <div className="mx-auto w-full max-w-6xl">
        {/* Titre de section, haut à gauche (sauts de ligne respectés) */}
        <h2 className="mb-10 whitespace-pre-line font-tanker text-[clamp(2.25rem,5vw,4rem)] font-normal uppercase leading-[0.9] text-purple-400 md:mb-14">
          {title}
        </h2>

        {/* Grille de cartes : 1 colonne sur mobile, 2 dès md */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {items.map((pack, i) => {
            const imgUrl = mediaUrl(pack.image)

            return (
              <article
                key={pack.id ?? i}
                className="grid grid-cols-1 overflow-hidden bg-purple-400 sm:grid-cols-[1fr_auto]"
              >
                {/* Panneau texte (gauche) */}
                <div className="flex flex-col gap-4 p-6 text-mauve-900 md:p-8">
                  <h3 className="font-tanker text-[clamp(1.5rem,2.6vw,2.25rem)] font-normal uppercase leading-[0.95]">
                    {pack.title}
                  </h3>

                  {pack.subtitle && (
                    <p className="font-body text-base leading-tight tracking-[-0.02em]">
                      {pack.subtitle}
                    </p>
                  )}

                  {pack.description && (
                    <p className="font-body text-lg leading-[1.15] tracking-[-0.02em]">
                      {pack.description}
                    </p>
                  )}

                  {pack.ctaHref && (
                    <Button
                      href={pack.ctaHref}
                      arrow="down"
                      label={pack.ctaLabel || 'TÉLÉCHARGER'}
                      className="mt-auto text-mauve-900 hover:bg-mauve-900 hover:text-purple-400"
                    />
                  )}
                </div>

                {/* Image (droite) */}
                {imgUrl && (
                  <div className="flex items-center justify-center bg-sand-100 p-4 sm:w-44 md:w-52">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imgUrl}
                      alt={mediaAlt(pack.image)}
                      className="h-full w-full object-contain"
                    />
                  </div>
                )}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
