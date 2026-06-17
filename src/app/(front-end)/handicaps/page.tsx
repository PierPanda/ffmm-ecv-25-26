export const revalidate = 3600

import { getPayload } from 'payload'
import config from '@payload-config'
import { BlockRenderer, type BlockList } from '@/components/BlockRenderer'

export default async function HandicapsPage() {
  const payload = await getPayload({ config })
  const handicaps = await payload.findGlobal({ slug: 'handicaps', depth: 2 })

  return (
    <main>
      {handicaps.layout?.length ? (
        <BlockRenderer blocks={handicaps.layout as BlockList} />
      ) : null}
    </main>
  )
}
