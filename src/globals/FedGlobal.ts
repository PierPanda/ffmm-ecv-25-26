import type { GlobalConfig } from 'payload'
import { allBlocks } from '@/blocks'
import { makeGlobalRevalidate } from '@/lib/revalidate'

export const FedGlobal: GlobalConfig = {
  slug: 'fed',
  label: 'La fédé',
  hooks: { afterChange: [makeGlobalRevalidate('/la-fede')] },
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
