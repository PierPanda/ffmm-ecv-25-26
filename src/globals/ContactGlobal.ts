import type { GlobalConfig } from 'payload'
import { allBlocks } from '@/blocks'

export const ContactGlobal: GlobalConfig = {
  slug: 'contact',
  label: 'Contact / FAQ',
  access: { read: () => true },
  fields: [
    {
      name: 'layout',
      type: 'blocks',
      blocks: allBlocks,
    },
  ],
}
