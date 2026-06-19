import type { GlobalConfig } from 'payload'
import { allBlocks } from '@/blocks'
import { makeGlobalRevalidate } from '@/lib/revalidate'

export const GuideGlobal: GlobalConfig = {
  slug: 'guide',
  label: 'Bonnes Pratiques',
  hooks: { afterChange: [makeGlobalRevalidate('/bonnes-pratiques')] },
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
