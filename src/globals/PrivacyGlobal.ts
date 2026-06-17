import type { GlobalConfig } from 'payload'
import { allBlocks } from '@/blocks'

export const PrivacyGlobal: GlobalConfig = {
  slug: 'privacy',
  label: 'Confidentialité RGPD',
  access: { read: () => true },
  fields: [
    {
      name: 'layout',
      type: 'blocks',
      blocks: allBlocks,
    },
  ],
}
