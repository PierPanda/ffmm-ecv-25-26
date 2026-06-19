import type { Block } from 'payload'

export const ArticlesSliderBlock: Block = {
  slug: 'articlesSliderBlock',
  labels: { singular: 'Slider articles', plural: 'Sliders articles' },
  fields: [
    { name: 'sectionTitle', type: 'text', defaultValue: 'Le blog', label: 'Titre de section' },
  ],
}
