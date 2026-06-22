import { defineType, defineField } from 'sanity'

export const tourScheduleType = defineType({
  name: 'tourSchedule',
  title: 'Global Tour Schedule',
  type: 'document',
  fields: [
    defineField({
      name: 'city',
      title: 'City / Region',
      type: 'localeString',
    }),
    defineField({
      name: 'dates',
      title: 'Dates / Availability (e.g. June, July 2024)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'isActive',
      title: 'Is Tour Active / Upcoming?',
      type: 'boolean',
    }),
    defineField({
      name: 'order',
      title: 'Sorting Order',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      title: 'city.en',
      subtitle: 'isActive',
    },
  },
})
