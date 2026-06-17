import type { GlobalConfig } from 'payload'
import { allBlocks } from '@/blocks'

export const ResourcesGlobal: GlobalConfig = {
  slug: 'resources',
  label: 'Les ressources',
  access: { read: () => true },
  fields: [
    {
      name: 'layout',
      type: 'blocks',
      blocks: allBlocks,
    },
  ],
}
