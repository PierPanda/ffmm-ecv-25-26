import type { Block } from 'payload'

export const ArticlesSliderBlock: Block = {
  slug: 'articlesSliderBlock',
  labels: { singular: 'Slider articles', plural: 'Sliders articles' },
  admin: { images: { thumbnail: '/block-previews/articles-slider.svg' } },
  fields: [
    { name: 'sectionTitle', type: 'text', defaultValue: 'Le blog', label: 'Titre de section' },
  ],
}
