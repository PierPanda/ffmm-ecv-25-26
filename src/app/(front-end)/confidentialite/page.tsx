import { getPayload } from 'payload'
import config from '@payload-config'
import { BlockRenderer } from '@/components/BlockRenderer'

export default async function PrivacyPage() {
  const payload = await getPayload({ config })
  const privacy = await payload.findGlobal({ slug: 'privacy', depth: 2 })

  return (
    <main>
      {privacy.layout?.length ? (
        <BlockRenderer blocks={privacy.layout as Parameters<typeof BlockRenderer>[0]['blocks']} />
      ) : null}
    </main>
  )
}
