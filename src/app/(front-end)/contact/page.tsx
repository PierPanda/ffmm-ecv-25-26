export const revalidate = 3600

import { getPayload } from 'payload'
import config from '@payload-config'
import { ServerBlockRenderer as BlockRenderer, type BlockList } from '@/components/ServerBlockRenderer'

export default async function ContactPage() {
  const payload = await getPayload({ config })
  const contact = await payload.findGlobal({ slug: 'contact', depth: 2 })

  return (
    <main>
      {contact.layout?.length ? (
        <BlockRenderer blocks={contact.layout as BlockList} />
      ) : null}
    </main>
  )
}
