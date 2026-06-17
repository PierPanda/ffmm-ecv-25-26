import type { Block } from 'payload'

export const WhyEngageBlock: Block = {
  slug: 'whyEngageBlock',
  labels: { singular: 'Pourquoi s\'engager', plural: 'Pourquoi s\'engager' },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'icon', type: 'upload', relationTo: 'media' },
        { name: 'title', type: 'text', required: true },
        { name: 'text', type: 'textarea' },
      ],
    },
  ],
}
