import { getPayload } from 'payload'
import config from '@payload-config'
import { BlockRenderer } from '@/components/BlockRenderer'

export default async function ResourcesPage() {
  const payload = await getPayload({ config })
  const resources = await payload.findGlobal({ slug: 'resources', depth: 2 })

  return (
    <main>
      {resources.layout?.length ? (
        <BlockRenderer blocks={resources.layout as Parameters<typeof BlockRenderer>[0]['blocks']} />
      ) : null}
    </main>
  )
}
