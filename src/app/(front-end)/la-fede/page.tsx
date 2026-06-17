import { getPayload } from 'payload'
import config from '@payload-config'
import { BlockRenderer } from '@/components/BlockRenderer'

export default async function FedPage() {
  const payload = await getPayload({ config })
  const fed = await payload.findGlobal({ slug: 'fed' })

  return (
    <main>
      {fed.layout?.length ? (
        <BlockRenderer blocks={fed.layout as Parameters<typeof BlockRenderer>[0]['blocks']} />
      ) : null}
    </main>
  )
}
