import { getPayload } from 'payload'
import config from '@payload-config'
import { ArticlesSlider } from './ArticlesSlider'

type Props = {
  sectionTitle?: string | null
}

export async function ArticlesSliderBlock({ sectionTitle }: Props) {
  const payload = await getPayload({ config })

  const now = new Date().toISOString()
  const result = await payload.find({
    collection: 'articles',
    where: { publishedAt: { less_than_equal: now } },
    sort: '-publishedAt',
    limit: 8,
    depth: 1,
  })

  if (!result.docs.length) return null

  const articles = result.docs.map((doc) => ({
    id: String(doc.id),
    title: String(doc.title ?? ''),
    slug: String(doc.slug ?? ''),
    tag: doc.tag ? String(doc.tag) : null,
    publishedAt: doc.publishedAt ? String(doc.publishedAt) : null,
    chapo: doc.chapo ? String(doc.chapo) : null,
    coverImage:
      typeof doc.coverImage === 'object' && doc.coverImage !== null
        ? { url: (doc.coverImage as { url?: string }).url ?? null }
        : null,
  }))

  return (
    <ArticlesSlider
      sectionTitle={sectionTitle ?? 'Le blog'}
      articles={articles}
    />
  )
}
