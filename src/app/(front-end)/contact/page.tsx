import { getPayload } from 'payload'
import config from '@payload-config'
import { BlockRenderer } from '@/components/BlockRenderer'

export default async function ContactPage() {
  const payload = await getPayload({ config })
  const contact = await payload.findGlobal({ slug: 'contact' })

  return (
    <main>
      {contact.layout?.length ? (
        <BlockRenderer blocks={contact.layout as Parameters<typeof BlockRenderer>[0]['blocks']} />
      ) : null}
    </main>
  )
}
