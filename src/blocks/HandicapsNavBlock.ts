import type { Block } from 'payload'

export const HandicapsNavBlock: Block = {
  slug: 'handicapsNavBlock',
  labels: { singular: 'Navigation handicaps', plural: 'Navigation handicaps' },
  admin: { images: { thumbnail: '/block-previews/handicaps-nav.svg' } },
  fields: [
    { name: 'title', type: 'text' },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
        { name: 'icon', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}
