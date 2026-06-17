import type { GlobalConfig } from 'payload'
import { allBlocks } from '@/blocks'

export const FedGlobal: GlobalConfig = {
  slug: 'fed',
  label: 'La fédé',
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
