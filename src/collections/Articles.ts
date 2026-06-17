import type { CollectionConfig } from 'payload'
import { allBlocks } from '@/blocks'

export const Articles: CollectionConfig = {
  slug: 'articles',
  labels: { singular: 'Article', plural: 'Articles' },
  access: { read: () => true },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedAt', 'updatedAt'],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'excerpt', type: 'textarea' },
    { name: 'coverImage', type: 'upload', relationTo: 'media' },
    { name: 'category', type: 'text' },
    { name: 'publishedAt', type: 'date' },
    {
      name: 'layout',
      type: 'blocks',
      blocks: allBlocks,
    },
  ],
}
