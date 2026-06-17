export const revalidate = 3600

import { getPayload } from 'payload'
import config from '@payload-config'
import { BlockRenderer, type BlockList } from '@/components/BlockRenderer'
import { notFound } from 'next/navigation'

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

  return (
    <main>
      {article.layout?.length ? (
        <BlockRenderer blocks={article.layout as BlockList} />
      ) : null}
    </main>
  )
}
