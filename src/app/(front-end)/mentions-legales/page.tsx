export const revalidate = 3600

import { getPayload } from 'payload'
import config from '@payload-config'
import { ServerBlockRenderer as BlockRenderer, type BlockList } from '@/components/ServerBlockRenderer'

export default async function LegalPage() {
  const payload = await getPayload({ config })
  const legal = await payload.findGlobal({ slug: 'legal', depth: 2 })

  return (
    <main>
      {legal.layout?.length ? (
        <BlockRenderer blocks={legal.layout as BlockList} />
      ) : null}
    </main>
  )
}
