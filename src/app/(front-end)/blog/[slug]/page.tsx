export const revalidate = 3600

import { getPayload } from 'payload'
import config from '@payload-config'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { notFound } from 'next/navigation'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'articles',
    pagination: false,
    select: { slug: true },
  })
  return result.docs.map((doc) => ({ slug: doc.slug }))
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const now = new Date().toISOString()
  const result = await payload.find({
    collection: 'articles',
    where: {
      and: [
        { slug: { equals: slug } },
        { publishedAt: { less_than_equal: now } },
      ],
    },
    limit: 1,
    depth: 2,
  })

  const article = result.docs[0]
  if (!article) notFound()

  const coverUrl =
    typeof article.coverImage === 'object' && article.coverImage !== null
      ? (article.coverImage as { url?: string }).url
      : null

  return (
    <main>
      {coverUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={coverUrl} alt="" className="w-full max-h-[60vh] object-cover" />
      )}
      <div className="mx-auto max-w-3xl px-6 py-12">
        {article.tag && (
          <p className="text-purple-400 uppercase text-xs font-bold tracking-widest mb-4">
            {article.tag}
          </p>
        )}
        <h1 className="font-tanker text-4xl uppercase leading-none mb-4">{article.title}</h1>
        {article.publishedAt && (
          <p className="text-sm text-foreground/50 mb-8">
            {new Date(article.publishedAt as string).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        )}
        {article.chapo && (
          <p className="text-lg leading-relaxed font-semibold mb-10">{article.chapo}</p>
        )}
        {article.content && (
          <RichText data={article.content as SerializedEditorState} />
        )}
      </div>
    </main>
  )
}
