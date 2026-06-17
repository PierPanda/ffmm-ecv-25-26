import type { Block } from 'payload'

export const FedeBannerBlock: Block = {
  slug: 'fedeBannerBlock',
  labels: { singular: 'Bannière Fédé', plural: 'Bannières Fédé' },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'text', type: 'textarea' },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'ctaLabel', type: 'text' },
    { name: 'ctaHref', type: 'text' },
  ],
}
