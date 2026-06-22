import { defineType, defineField } from 'sanity'

export const localeTextType = defineType({
  name: 'localeText',
  title: 'Localized Text',
  type: 'object',
  fields: [
    defineField({
      name: 'en',
      title: 'English',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'zh',
      title: 'Traditional Chinese (繁體中文)',
      type: 'text',
      rows: 4,
    }),
  ],
})
