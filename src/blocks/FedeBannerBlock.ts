import type { Block } from 'payload'

export const FedeBannerBlock: Block = {
  slug: 'fedeBannerBlock',
  labels: { singular: 'Bannière Fédé', plural: 'Bannières Fédé' },
  admin: { images: { thumbnail: '/block-previews/fede-banner.svg' } },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'text', type: 'textarea' },
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
