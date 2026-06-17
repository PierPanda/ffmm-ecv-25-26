import type { Block } from 'payload'

export const ContactFormBlock: Block = {
  slug: 'contactFormBlock',
  labels: { singular: 'Formulaire de contact', plural: 'Formulaires de contact' },
  fields: [
    { name: 'title', type: 'text' },
    { name: 'description', type: 'textarea' },
  ],
}
