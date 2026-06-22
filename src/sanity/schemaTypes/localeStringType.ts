import { defineType, defineField } from 'sanity'

export const localeStringType = defineType({
  name: 'localeString',
  title: 'Localized String',
  type: 'object',
  fields: [
    defineField({
      name: 'en',
      title: 'English',
      type: 'string',
    }),
    defineField({
      name: 'zh',
      title: 'Traditional Chinese (繁體中文)',
      type: 'string',
    }),
  ],
})
