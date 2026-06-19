import type { Block } from 'payload'

export const SixCardsBlock: Block = {
  slug: 'sixCardsBlock',
  labels: { singular: 'Bloc 6 cartes', plural: 'Blocs 6 cartes' },
  admin: { images: { thumbnail: '/block-previews/six-cards.svg' } },
  fields: [
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Image de fond',
    },
    {
      name: 'cards',
      type: 'array',
      label: 'Cartes',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'pictogram',
          type: 'upload',
          relationTo: 'media',
          label: 'Pictogramme',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Titre',
        },
        {
          name: 'text',
          type: 'textarea',
          label: 'Texte',
        },
        {
          name: 'ctaHref',
          type: 'text',
          label: 'Lien (optionnel)',
        },
      ],
    },
  ],
}
