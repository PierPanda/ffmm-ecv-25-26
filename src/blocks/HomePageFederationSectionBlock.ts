import type { Block } from 'payload'

export const HomePageFederationSectionBlock: Block = {
  slug: 'homePageFederationSectionBlock',
  labels: { singular: 'Section Fédération (accueil)', plural: 'Sections Fédération (accueil)' },
  fields: [
    // Fond
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Image de fond',
    },

    // Section 1 (carte gauche) : logo + description
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Section 1 · Logo',
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
