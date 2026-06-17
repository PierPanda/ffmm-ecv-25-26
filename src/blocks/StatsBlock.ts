import type { Block } from 'payload'

export const StatsBlock: Block = {
  slug: 'statsBlock',
  labels: { singular: 'Chiffres clés', plural: 'Chiffres clés' },
  fields: [
    { name: 'title', type: 'text' },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
      ],
    },
  ],
}
