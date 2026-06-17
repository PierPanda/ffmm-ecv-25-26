import type { CollectionConfig } from 'payload'
import { allBlocks } from '@/blocks'
import { revalidateHandicapPage } from '@/lib/revalidate'

export const HANDICAP_SLUGS = ['moteur', 'visuel', 'auditif', 'autisme', 'psychologique', 'invisible'] as const

export const HandicapPages: CollectionConfig = {
  slug: 'handicap-pages',
  labels: { singular: 'Page handicap', plural: 'Pages handicap' },
  access: {
    read: () => true,
    create: ({ req }) => req.user?.role === 'super-admin' || req.user?.role === 'admin',
    update: ({ req }) => req.user?.role === 'super-admin' || req.user?.role === 'admin',
    delete: ({ req }) => req.user?.role === 'super-admin' || req.user?.role === 'admin',
  },
  hooks: {
    afterChange: [revalidateHandicapPage],
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'select',
      required: true,
      unique: true,
      options: HANDICAP_SLUGS.map((s) => ({ label: s.charAt(0).toUpperCase() + s.slice(1), value: s })),
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: allBlocks,
    },
  ],
}
