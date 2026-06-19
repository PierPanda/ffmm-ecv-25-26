export const revalidate = 3600

import { getPayload } from 'payload'
import config from '@payload-config'
import { ServerBlockRenderer as BlockRenderer, type BlockList } from '@/components/ServerBlockRenderer'

export default async function ResourcesPage() {
  const payload = await getPayload({ config })
  const resources = await payload.findGlobal({ slug: 'resources', depth: 2 })

  return (
    <main>
      {resources.layout?.length ? (
        <BlockRenderer blocks={resources.layout as BlockList} />
      ) : null}
    </main>
  )
}
