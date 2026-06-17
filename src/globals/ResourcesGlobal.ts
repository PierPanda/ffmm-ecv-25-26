import type { GlobalConfig } from 'payload'
import { allBlocks } from '@/blocks'
import { makeGlobalRevalidate } from '@/lib/revalidate'

export const ResourcesGlobal: GlobalConfig = {
  slug: 'resources',
  label: 'Les ressources',
  hooks: { afterChange: [makeGlobalRevalidate('/ressources')] },
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
