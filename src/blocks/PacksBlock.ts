import type { Block } from 'payload'

export const PacksBlock: Block = {
  slug: 'packsBlock',
  labels: { singular: 'Packs', plural: 'Packs' },
  fields: [
    {
      name: 'title',
      type: 'textarea',
      required: true,
      label: 'Titre de section',
      admin: {
        description:
          'Affiché en haut à gauche. Les sauts de ligne sont respectés (ex. « LES PACKS » puis « COMPLETS »).',
      },
    },
    {
      name: 'packs',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      label: 'Cartes',
      labels: { singular: 'Carte', plural: 'Cartes' },
      fields: [
        { name: 'title', type: 'text', required: true, label: 'Titre' },
        { name: 'subtitle', type: 'text', label: 'Sous-titre' },
        { name: 'description', type: 'textarea', label: 'Description' },
        { name: 'image', type: 'upload', relationTo: 'media', label: 'Image (droite)' },
        { name: 'ctaLabel', type: 'text', label: 'Libellé du CTA', defaultValue: 'TÉLÉCHARGER' },
        {
          name: 'ctaHref',
          type: 'text',
          label: 'Lien du CTA',
          // Autorise un lien interne (/ressources, #ancre) ou une URL absolue (https://…)
          validate: (val: string | null | undefined) => {
            if (!val) return true
            if (val.startsWith('/') || val.startsWith('#')) return true
            try {
              new URL(val)
              return true
            } catch {
              return 'URL invalide'
            }
          },
        },
      ],
    },
  ],
}
