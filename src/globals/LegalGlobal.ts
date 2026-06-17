import type { GlobalConfig } from 'payload'
import { allBlocks } from '@/blocks'

export const LegalGlobal: GlobalConfig = {
  slug: 'legal',
  label: 'Mentions légales',
  access: { read: () => true },
  fields: [
    {
      name: 'layout',
      type: 'blocks',
      blocks: allBlocks,
    },
  ],
}
