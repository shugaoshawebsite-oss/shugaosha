import { defineType, defineField } from 'sanity'

export const celebrityType = defineType({
  name: 'celebrityEndorsement',
  title: 'Celebrity Endorsement',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'localeString',
    }),
    defineField({
      name: 'role',
      title: 'Role / Occupation',
      type: 'localeString',
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'localeText',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'order',
      title: 'Sorting Order',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      title: 'name.en',
      subtitle: 'role.en',
      media: 'image',
    },
  },
})
