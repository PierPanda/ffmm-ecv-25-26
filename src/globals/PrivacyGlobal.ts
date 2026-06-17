import type { GlobalConfig } from 'payload'
import { allBlocks } from '@/blocks'

export const PrivacyGlobal: GlobalConfig = {
  slug: 'privacy',
  label: 'Confidentialité RGPD',
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
