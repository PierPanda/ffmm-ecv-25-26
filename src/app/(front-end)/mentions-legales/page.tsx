import { getPayload } from 'payload'
import config from '@payload-config'
import { BlockRenderer } from '@/components/BlockRenderer'

export default async function LegalPage() {
  const payload = await getPayload({ config })
  const legal = await payload.findGlobal({ slug: 'legal', depth: 2 })

  return (
    <main>
      {legal.layout?.length ? (
        <BlockRenderer blocks={legal.layout as Parameters<typeof BlockRenderer>[0]['blocks']} />
      ) : null}
    </main>
  )
}
