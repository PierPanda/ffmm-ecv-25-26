import type { GlobalConfig } from 'payload'
import { allBlocks } from '@/blocks'

export const GuideGlobal: GlobalConfig = {
  slug: 'guide',
  label: 'Guide terrain',
  access: { read: () => true },
  fields: [
    {
      name: 'layout',
      type: 'blocks',
      blocks: allBlocks,
    },
  ],
}
