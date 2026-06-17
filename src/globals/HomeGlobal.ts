import type { GlobalConfig } from 'payload'
import { allBlocks } from '@/blocks'

export const HomeGlobal: GlobalConfig = {
  slug: 'home',
  label: 'Accueil',
  access: {
    read: () => true,
    update: ({ req }) => req.user?.role === 'super-admin' || req.user?.role === 'admin',
  },
  fields: [
    {
      name: 'layout',
      type: 'blocks',
      blocks: allBlocks,
    },
  ],
}
