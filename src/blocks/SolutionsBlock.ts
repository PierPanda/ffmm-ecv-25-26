import type { Block } from 'payload'

export const SolutionsBlock: Block = {
  slug: 'solutionsBlock',
  labels: { singular: 'Nos solutions', plural: 'Nos solutions' },
  fields: [
    { name: 'sectionTitle', type: 'text', required: true, defaultValue: 'Nos solutions' },
    {
      name: 'items',
      type: 'array',
      minRows: 3,
      maxRows: 3,
      fields: [
        { name: 'backgroundImage', type: 'upload', relationTo: 'media', label: 'Image de fond' },
        { name: 'title', type: 'text', required: true, label: 'Titre' },
        { name: 'description', type: 'textarea', label: 'Description' },
        { name: 'ctaLabel', type: 'text', label: 'Texte du bouton' },
        { name: 'ctaHref', type: 'text', label: 'Lien du bouton' },
      ],
    },
  ],
}
