import { getPayload } from 'payload'
import config from '@payload-config'
import { BlockRenderer } from '@/components/BlockRenderer'

export default async function HandicapsPage() {
  const payload = await getPayload({ config })
  const handicaps = await payload.findGlobal({ slug: 'handicaps' })

  return (
    <main>
      {handicaps.layout?.length ? (
        <BlockRenderer blocks={handicaps.layout as Parameters<typeof BlockRenderer>[0]['blocks']} />
      ) : null}
    </main>
  )
}
