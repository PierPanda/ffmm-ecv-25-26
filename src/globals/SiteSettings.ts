import type { GlobalConfig } from 'payload'
import { revalidateSiteSettings } from '@/lib/revalidate'

export const SiteSettings: GlobalConfig = {
  slug: 'siteSettings',
  label: 'Paramètres du site',
  hooks: { afterChange: [revalidateSiteSettings] },
  access: {
    read: () => true,
    update: ({ req }) => req.user?.role === 'super-admin' || req.user?.role === 'admin',
  },
  fields: [
    {
      name: 'preAuditCta',
      type: 'group',
      label: 'CTA Pré-audit',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'Faire le pré-audit' },
        { name: 'href', type: 'text', defaultValue: '/quizz' },
        { name: 'description', type: 'text' },
      ],
    },
    {
      name: 'nav',
      type: 'group',
      label: 'Navigation',
      fields: [
        {
          name: 'links',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'href', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      name: 'footer',
      type: 'group',
      label: 'Pied de page',
      fields: [
        { name: 'legalText', type: 'text' },
        {
          name: 'links',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'href', type: 'text', required: true },
          ],
        },
      ],
    },
  ],
}
