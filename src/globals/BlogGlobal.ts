import type { GlobalConfig } from 'payload'
import { allBlocks } from '@/blocks'

export const BlogGlobal: GlobalConfig = {
  slug: 'blog',
  label: 'Blog — Les bonnes pratiques',
  access: { read: () => true },
  fields: [
    {
      name: 'layout',
      type: 'blocks',
      blocks: allBlocks,
    },
  ],
}
