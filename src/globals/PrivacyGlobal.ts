import type { GlobalConfig } from 'payload'
import { allBlocks } from '@/blocks'
import { makeGlobalRevalidate } from '@/lib/revalidate'

export const PrivacyGlobal: GlobalConfig = {
  slug: 'privacy',
  label: 'Confidentialité RGPD',
  hooks: { afterChange: [makeGlobalRevalidate('/confidentialite')] },
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
