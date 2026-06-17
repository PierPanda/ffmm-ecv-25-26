import type { GlobalConfig } from 'payload'
import { allBlocks } from '@/blocks'

export const ResourcesGlobal: GlobalConfig = {
  slug: 'resources',
  label: 'Les ressources',
  access: {
    read: () => true,
    update: ({ req }) => req.user?.role === 'super-admin' || req.user?.role === 'admin',
  },
  fields: [
    {
      name: 'layout',
      type: 'blocks',
      blocks: allBlocks,
    },
  ],
}
