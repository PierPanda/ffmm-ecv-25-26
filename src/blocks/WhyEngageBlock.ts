import type { Block } from 'payload'

export const WhyEngageBlock: Block = {
  slug: 'whyEngageBlock',
  labels: { singular: 'Pourquoi s\'engager', plural: 'Pourquoi s\'engager' },
  fields: [
    { name: 'backgroundImage', type: 'upload', relationTo: 'media', label: 'Image de fond' },
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
