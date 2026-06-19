export const revalidate = 3600

import { getPayload } from 'payload'
import config from '@payload-config'
import { ServerBlockRenderer as BlockRenderer, type BlockList } from '@/components/ServerBlockRenderer'

export default async function PrivacyPage() {
  const payload = await getPayload({ config })
  const privacy = await payload.findGlobal({ slug: 'privacy', depth: 2 })

  return (
    <main>
      {privacy.layout?.length ? (
        <BlockRenderer blocks={privacy.layout as BlockList} />
      ) : null}
    </main>
  )
}
