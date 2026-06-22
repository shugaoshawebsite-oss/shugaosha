import { defineType, defineField } from 'sanity'

export const clientReviewType = defineType({
  name: 'clientReview',
  title: 'Client Review',
  type: 'document',
  fields: [
    defineField({
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Location / Region (e.g. Hong Kong, Australia)',
      type: 'string',
    }),
    defineField({
      name: 'rating',
      title: 'Rating (1-5)',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(5).integer(),
    }),
    defineField({
      name: 'reviewText',
      title: 'Review Text',
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
      title: 'clientName',
      subtitle: 'location',
    },
  },
})
