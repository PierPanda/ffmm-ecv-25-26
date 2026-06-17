import type { Block } from 'payload'

export const DownloadBlock: Block = {
  slug: 'downloadBlock',
  labels: { singular: 'Ressource téléchargeable', plural: 'Ressources téléchargeables' },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    { name: 'file', type: 'upload', relationTo: 'media', required: true },
  ],
}
