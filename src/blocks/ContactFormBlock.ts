import type { Block } from 'payload'

export const ContactFormBlock: Block = {
  slug: 'contactFormBlock',
  labels: { singular: 'Formulaire de contact', plural: 'Formulaires de contact' },
  admin: { images: { thumbnail: '/block-previews/contact-form.svg' } },
  fields: [
    { name: 'title', type: 'text' },
    { name: 'description', type: 'textarea' },
    {
      name: 'emailTo',
      type: 'email',
      label: 'Email de destination',
      admin: {
        description: 'Adresse qui recevra les messages. Laissez vide pour utiliser la valeur par défaut.',
      },
    },
    {
      name: 'emailFrom',
      type: 'text',
      label: 'Nom expéditeur affiché',
      defaultValue: 'Festiv For All – Formulaire de contact',
    },
  ],
}
