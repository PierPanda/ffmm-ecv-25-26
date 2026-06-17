import type { GlobalConfig } from 'payload'
import { allBlocks } from '@/blocks'

export const HandicapsGlobal: GlobalConfig = {
  slug: 'handicaps',
  label: 'Les handicaps',
  access: { read: () => true },
  fields: [
    {
      name: 'layout',
      type: 'blocks',
      blocks: allBlocks,
    },
  ],
}
