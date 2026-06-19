'use client'

import useEmblaCarousel from 'embla-carousel-react'
import { useCallback } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

type Article = {
  id: string
  title: string
  slug: string
  tag?: string | null
  publishedAt?: string | null
  chapo?: string | null
  coverImage?: { url?: string | null } | null
}

type Props = {
  sectionTitle: string
  articles: Article[]
}

function ArticleCard({ article }: { article: Article }) {
  const date = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    : null

  return (
    <Link
      href={`/blog/${article.slug}`}
      className="group flex-[0_0_85%] sm:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0 flex flex-col pr-6"
    >
      <div className="flex-1 flex flex-col overflow-hidden rounded-xs">
      <div className="relative overflow-hidden bg-mauve-900/30" style={{ paddingBottom: '75%' }}>
        {article.coverImage?.url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={article.coverImage.url}
            alt={article.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-mauve-900/50" />
        )}
      </div>

      <div className="flex-1 flex flex-col bg-white px-5 pb-5 pt-4">
        <div className="flex items-center justify-between gap-2 mb-3">
          {article.tag && (
            <span className="text-mauve-900/70 uppercase text-[11px] font-bold tracking-widest truncate">
              {article.tag}
            </span>
          )}
          {date && (
            <span className="text-mauve-900/40 text-[11px] shrink-0">{date}</span>
          )}
        </div>

        <h3 className="font-tanker text-mauve-900 uppercase leading-none text-2xl mb-3 group-hover:text-purple-400 transition-colors">
          {article.title}
        </h3>

        {article.chapo && (
          <p className="text-mauve-900/65 text-sm leading-relaxed line-clamp-2">{article.chapo}</p>
        )}
      </div>
      </div>
    </Link>
  )
}

export function ArticlesSlider({ sectionTitle, articles }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start', slidesToScroll: 1 })

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return (
    <section className="w-full bg-mauve-900 px-8 md:px-16 py-16">
      <div className="flex flex-col gap-4 mb-8 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:mb-10">
        <h2 className="font-tanker text-white uppercase leading-none text-3xl sm:text-5xl md:text-6xl">
          {sectionTitle}
        </h2>

        <div className="flex items-center gap-4 shrink-0">
          <Button
            href="/blog"
            label="Tous les articles"
            arrow={false}
            arrowAbsolute
            className="bg-purple-400 text-mauve-900 border-purple-400"
          />

          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Article précédent"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white hover:border-purple-400 hover:text-purple-400 transition-colors"
          >
            <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4 rotate-180">
              <path d="M9.364 0.264C9.715-0.088 10.285-0.088 10.637 0.264L19.736 9.364C20.088 9.715 20.088 10.285 19.736 10.637L10.637 19.736C10.285 20.088 9.715 20.088 9.364 19.736C9.013 19.385 9.013 18.815 9.364 18.464L13.513 14.315C14.773 13.055 13.881 10.900 12.099 10.900H0.900C0.403 10.900 0 10.497 0 10.000C0 9.503 0.403 9.100 0.900 9.100H12.099C13.881 9.100 14.773 6.946 13.513 5.686L9.364 1.536C9.013 1.185 9.013 0.615 9.364 0.264Z" fill="currentColor"/>
            </svg>
          </button>

          <button
            type="button"
            onClick={scrollNext}
            aria-label="Article suivant"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white hover:border-purple-400 hover:text-purple-400 transition-colors"
          >
            <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
              <path d="M9.364 0.264C9.715-0.088 10.285-0.088 10.637 0.264L19.736 9.364C20.088 9.715 20.088 10.285 19.736 10.637L10.637 19.736C10.285 20.088 9.715 20.088 9.364 19.736C9.013 19.385 9.013 18.815 9.364 18.464L13.513 14.315C14.773 13.055 13.881 10.900 12.099 10.900H0.900C0.403 10.900 0 10.497 0 10.000C0 9.503 0.403 9.100 0.900 9.100H12.099C13.881 9.100 14.773 6.946 13.513 5.686L9.364 1.536C9.013 1.185 9.013 0.615 9.364 0.264Z" fill="currentColor"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  )
}
