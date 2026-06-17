import type { Block } from 'payload'
import { HeroBlock } from './HeroBlock'
import { RichTextBlock } from './RichTextBlock'
import { FAQBlock } from './FAQBlock'
import { DownloadBlock } from './DownloadBlock'

export const TabsBlock: Block = {
  slug: 'tabsBlock',
  labels: { singular: 'Onglets', plural: 'Onglets' },
  fields: [
    {
      name: 'tabs',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'label', type: 'text', required: true },
        {
          name: 'content',
          type: 'blocks',
          blocks: [HeroBlock, RichTextBlock, FAQBlock, DownloadBlock],
        },
      ],
    },
  ],
}
