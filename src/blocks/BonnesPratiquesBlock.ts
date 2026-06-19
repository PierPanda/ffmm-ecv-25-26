import type { Block } from 'payload'

export const BonnesPratiquesBlock: Block = {
  slug: 'bonnesPratiquesBlock',
  labels: { singular: 'Bonnes Pratiques', plural: 'Bonnes Pratiques' },
  admin: { images: { thumbnail: '/block-previews/bonnes-pratiques.svg' } },
  fields: [
    {
      name: 'sections',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'tag', type: 'text', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'content', type: 'richText', required: true },
      ],
    },
  ],
}
