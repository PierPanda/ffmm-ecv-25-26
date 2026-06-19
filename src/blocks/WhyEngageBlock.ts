import type { Block } from 'payload'

export const WhyEngageBlock: Block = {
  slug: 'whyEngageBlock',
  labels: { singular: 'Pourquoi s\'engager', plural: 'Pourquoi s\'engager' },
  admin: { images: { thumbnail: '/block-previews/why-engage.svg' } },
  fields: [
    { name: 'backgroundImage', type: 'upload', relationTo: 'media', label: 'Image de fond' },
    { name: 'overlayImage', type: 'upload', relationTo: 'media', label: 'Image superposée (PNG sans fond)' },
    { name: 'title', type: 'text', required: true },
    {
      name: 'items',
      type: 'array',
      minRows: 4,
      maxRows: 4,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'text', type: 'textarea' },
      ],
    },
  ],
}
