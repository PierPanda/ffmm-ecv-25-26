import type { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'heroBlock',
  labels: { singular: 'Hero', plural: 'Heros' },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'subtitle', type: 'text' },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'ctaLabel', type: 'text' },
    {
      name: 'ctaHref',
      type: 'text',
      validate: (val: string | null | undefined) => {
        if (!val) return true
        try { new URL(val); return true } catch { return 'URL invalide' }
      },
    },
  ],
}
