export const revalidate = 3600

import { getPayload } from 'payload'
import config from '@payload-config'
import { ServerBlockRenderer as BlockRenderer, type BlockList } from '@/components/ServerBlockRenderer'

export default async function FedPage() {
  const payload = await getPayload({ config })
  const fed = await payload.findGlobal({ slug: 'fed', depth: 2 })

  return (
    <main>
      {fed.layout?.length ? (
        <BlockRenderer blocks={fed.layout as BlockList} />
      ) : null}
    </main>
  )
}
