import type { CollectionConfig, CollectionBeforeChangeHook } from 'payload'
import { revalidateArticle } from '@/lib/revalidate'

const generateSlug: CollectionBeforeChangeHook = ({ data, operation }) => {
  if (operation === 'create' && data.title) {
    data.slug = (data.title as string)
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
  }
  return data
}

export const Articles: CollectionConfig = {
  slug: 'articles',
  labels: { singular: 'Article', plural: 'Articles' },
  access: {
    read: () => true,
    create: ({ req }) => req.user?.role === 'super-admin' || req.user?.role === 'admin',
    update: ({ req }) => req.user?.role === 'super-admin' || req.user?.role === 'admin',
    delete: ({ req }) => req.user?.role === 'super-admin' || req.user?.role === 'admin',
  },
  hooks: {
    beforeChange: [generateSlug],
    afterChange: [revalidateArticle],
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'tag', 'publishedAt', 'updatedAt'],
  },
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Titre' },
    { name: 'slug', type: 'text', unique: true, index: true, admin: { hidden: true } },
    { name: 'tag', type: 'text', label: 'Tag' },
    { name: 'publishedAt', type: 'date', label: 'Date de publication' },
    { name: 'coverImage', type: 'upload', relationTo: 'media', label: 'Image hero' },
    { name: 'chapo', type: 'textarea', label: 'Chapô' },
    { name: 'content', type: 'richText', label: 'Contenu' },
  ],
}
