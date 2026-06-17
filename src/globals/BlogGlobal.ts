import type { GlobalConfig } from 'payload'
import { allBlocks } from '@/blocks'

export const BlogGlobal: GlobalConfig = {
  slug: 'blog',
  label: 'Blog — Les bonnes pratiques',
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
