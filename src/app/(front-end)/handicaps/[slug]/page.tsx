import { getPayload } from 'payload'
import config from '@payload-config'
import { BlockRenderer } from '@/components/BlockRenderer'
import { notFound } from 'next/navigation'

const VALID_SLUGS = ['moteur', 'visuel', 'auditif', 'autisme', 'psychologique', 'invisible'] as const
type HandicapSlug = typeof VALID_SLUGS[number]

export function generateStaticParams() {
  return VALID_SLUGS.map((slug) => ({ slug }))
}

type Props = {
  params: Promise<{ slug: string }>
}

export default async function HandicapDetailPage({ params }: Props) {
  const { slug } = await params

  if (!VALID_SLUGS.includes(slug as HandicapSlug)) notFound()

  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'handicap-pages',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const page = result.docs[0]
  if (!page) notFound()

  return (
    <main>
      {page.layout?.length ? (
        <BlockRenderer blocks={page.layout as Parameters<typeof BlockRenderer>[0]['blocks']} />
      ) : null}
    </main>
  )
}
