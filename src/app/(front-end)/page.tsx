export const revalidate = 3600

import { getPayload } from 'payload'
import config from '@payload-config'
import { ServerBlockRenderer as BlockRenderer, type BlockList } from '@/components/ServerBlockRenderer'
import { Loader } from '@/components/Loader'

export default async function HomePage() {
  const payload = await getPayload({ config })
  const home = await payload.findGlobal({ slug: 'home', depth: 2 })

  return (
    <>
      <Loader />
      <main>
        {home.layout?.length ? (
          <BlockRenderer blocks={home.layout as BlockList} />
        ) : null}
      </main>
    </>
  )
}
