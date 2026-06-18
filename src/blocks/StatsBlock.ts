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
        { name: 'label', type: 'textarea', required: true },
        {
          name: 'source',
          type: 'group',
          fields: [
            { name: 'linkLabel', type: 'text', label: 'Texte du lien' },
            {
              name: 'linkHref',
              type: 'text',
              label: 'URL de la source',
              validate: (value: string | null | undefined) => {
                if (!value) return true
                try {
                  new URL(value)
                  return true
                } catch {
                  return 'Veuillez entrer une URL valide (ex : https://example.com)'
                }
              },
            },
            { name: 'year', type: 'text', label: 'Année' },
          ],
        },
        { name: 'icon', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}
