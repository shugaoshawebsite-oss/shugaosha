import { defineType, defineField } from 'sanity'

export const caseStudyType = defineType({
  name: 'caseStudy',
  title: 'Case Study (Before & After)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title / Client Initials',
      type: 'localeString',
    }),
    defineField({
      name: 'sessionsCount',
      title: 'Sessions Count',
      type: 'number',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: '4-session progression', value: '4-session' },
          { title: '8-session progression', value: '8-session' },
          { title: 'Long term maintenance', value: 'maintenance' },
        ],
      },
    }),
    defineField({
      name: 'beforeImage',
      title: 'Before Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'afterImage',
      title: 'After Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'description',
      title: 'Description of Results',
      type: 'localeText',
    }),
    defineField({
      name: 'order',
      title: 'Sorting Order',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
      subtitle: 'category',
      media: 'beforeImage',
    },
  },
})
