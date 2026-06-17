import Link from 'next/link'

type ArticleRef = { id: number; title: string; slug: string } | number

type Props = {
  title?: string | null
  articles?: ArticleRef[] | null
}

export function RelatedArticlesBlock({ title, articles }: Props) {
  if (!articles?.length) return null

  return (
    <section>
      {title && <h2>{title}</h2>}
      <ul>
        {articles.map((article, i) => {
          if (typeof article === 'number') return null
          return (
            <li key={article.id ?? i}>
              <Link href={`/blog/${article.slug}`}>{article.title}</Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
