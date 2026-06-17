import type { GlobalConfig } from 'payload'
import { allBlocks } from '@/blocks'

export const LegalGlobal: GlobalConfig = {
  slug: 'legal',
  label: 'Mentions légales',
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
