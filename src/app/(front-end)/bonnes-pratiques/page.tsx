export const revalidate = 3600

import { getPayload } from 'payload'
import config from '@payload-config'
import { ServerBlockRenderer as BlockRenderer, type BlockList } from '@/components/ServerBlockRenderer'

export default async function GuidePage() {
  const payload = await getPayload({ config })
  const guide = await payload.findGlobal({ slug: 'guide', depth: 2 })

  return (
    <main>
      {guide.layout?.length ? (
        <BlockRenderer blocks={guide.layout as BlockList} />
      ) : null}
    </main>
  )
}
