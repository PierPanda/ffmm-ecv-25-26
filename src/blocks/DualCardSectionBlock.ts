import type { Block } from 'payload'

export const DualCardSectionBlock: Block = {
  slug: 'dualCardSectionBlock',
  labels: { singular: 'Section deux cartes', plural: 'Sections deux cartes' },
  admin: { images: { thumbnail: '/block-previews/dual-card.svg' } },
  fields: [
    // Fond
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Image de fond',
    },

    // Section 1 (carte gauche) : logo OU titre, + description
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Section 1 · Logo',
      admin: { description: 'Affiché en haut de la carte gauche. Laisser vide pour utiliser un titre à la place.' },
    },
    {
      name: 'leftTitle',
      type: 'textarea',
      label: 'Section 1 · Titre',
      admin: { description: 'Utilisé uniquement si aucun logo n’est défini. Les sauts de ligne sont respectés.' },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Section 1 · Description',
    },

    // Section 2 (carte droite) : titre + CTA
    {
      name: 'title',
      type: 'textarea',
      required: true,
      label: 'Section 2 · Titre',
      admin: { description: 'Les sauts de ligne sont respectés (touche Entrée pour aller à la ligne).' },
    },
    {
      name: 'ctaLabel',
      type: 'text',
      label: 'Section 2 · Libellé du CTA',
    },
    {
      name: 'ctaHref',
      type: 'text',
      label: 'Section 2 · Lien du CTA',
      // Autorise un lien interne (/la-fede, #ancre) ou une URL absolue (https://…)
      validate: (val: string | null | undefined) => {
        if (!val) return true
        if (val.startsWith('/') || val.startsWith('#')) return true
        try { new URL(val); return true } catch { return 'URL invalide' }
      },
    },
  ],
}
