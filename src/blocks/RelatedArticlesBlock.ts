import type { Block } from 'payload'

export const RelatedArticlesBlock: Block = {
  slug: 'relatedArticlesBlock',
  labels: { singular: 'Articles connexes', plural: 'Articles connexes' },
  fields: [
    { name: 'title', type: 'text' },
    {
      name: 'articles',
      type: 'relationship',
      relationTo: 'articles',
      hasMany: true,
    },
  ],
}
