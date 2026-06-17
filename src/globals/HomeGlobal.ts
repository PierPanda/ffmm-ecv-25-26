import type { GlobalConfig } from 'payload'
import { allBlocks } from '@/blocks'

export const HomeGlobal: GlobalConfig = {
  slug: 'home',
  label: 'Accueil',
  access: { read: () => true },
  fields: [
    {
      name: 'layout',
      type: 'blocks',
      blocks: allBlocks,
    },
  ],
}
