import { getPayload } from 'payload'
import config from '@payload-config'
import { BlockRenderer } from '@/components/BlockRenderer'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ slug: string }>
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'articles',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const article = result.docs[0]
  if (!article) notFound()

  return (
    <main>
      {article.layout?.length ? (
        <BlockRenderer blocks={article.layout as Parameters<typeof BlockRenderer>[0]['blocks']} />
      ) : null}
    </main>
  )
}
