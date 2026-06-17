import { getPayload } from 'payload'
import config from '@payload-config'
import { BlockRenderer } from '@/components/BlockRenderer'

export default async function HomePage() {
  const payload = await getPayload({ config })
  const home = await payload.findGlobal({ slug: 'home' })

  return (
    <main className="flex justify-center items-center min-h-screen z-0">
      {home.layout?.length ? (
        <BlockRenderer blocks={home.layout as Parameters<typeof BlockRenderer>[0]['blocks']} />
      ) : null}
    </main>
  )
}