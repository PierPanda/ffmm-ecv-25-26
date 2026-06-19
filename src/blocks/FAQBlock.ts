import type { Block } from 'payload'

export const FAQBlock: Block = {
  slug: 'faqBlock',
  labels: { singular: 'FAQ', plural: 'FAQs' },
  admin: { images: { thumbnail: '/block-previews/faq.svg' } },
  fields: [
    { name: 'title', type: 'text' },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
      ],
    },
  ],
}
