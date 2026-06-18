export const revalidate = 3600

import { getPayload } from 'payload'
import config from '@payload-config'
import { BlockRenderer, type BlockList } from '@/components/BlockRenderer'

export default async function HomePage() {
  const payload = await getPayload({ config })
  const home = await payload.findGlobal({ slug: 'home', depth: 2 })

  return (
    <main>
      {home.layout?.length ? (
        <BlockRenderer blocks={home.layout as BlockList} />
      ) : null}
    </main>
  )
}
