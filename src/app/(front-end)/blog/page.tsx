export const revalidate = 3600

import { getPayload } from 'payload'
import config from '@payload-config'
import { BlockRenderer, type BlockList } from '@/components/BlockRenderer'

export default async function BlogPage() {
  const payload = await getPayload({ config })
  const blog = await payload.findGlobal({ slug: 'blog', depth: 2 })

  return (
    <main>
      {blog.layout?.length ? (
        <BlockRenderer blocks={blog.layout as BlockList} />
      ) : null}
    </main>
  )
}
