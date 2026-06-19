import type { Block } from 'payload'

export const RichTextBlock: Block = {
  slug: 'richTextBlock',
  labels: { singular: 'Texte riche', plural: 'Textes riches' },
  admin: { images: { thumbnail: '/block-previews/rich-text.svg' } },
  fields: [
    { name: 'title', type: 'text' },
    { name: 'content', type: 'richText', required: true },
  ],
}
