export const revalidate = 3600

import { getPayload } from 'payload'
import config from '@payload-config'
import { BlockRenderer, type BlockList } from '@/components/BlockRenderer'
import { notFound } from 'next/navigation'
import { HANDICAP_SLUGS } from '@/collections/HandicapPages'

type HandicapSlug = typeof HANDICAP_SLUGS[number]

export function generateStaticParams() {
  return HANDICAP_SLUGS.map((slug) => ({ slug }))
}

type Props = {
  params: Promise<{ slug: string }>
}

export default async function HandicapDetailPage({ params }: Props) {
  const { slug } = await params

  if (!HANDICAP_SLUGS.includes(slug as HandicapSlug)) notFound()

  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'handicap-pages',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  })

  const page = result.docs[0]
  if (!page) notFound()

  return (
    <main>
      {page.layout?.length ? (
        <BlockRenderer blocks={page.layout as BlockList} />
      ) : null}
    </main>
  )
}
