import { defineType, defineField } from 'sanity'

export const teamMemberType = defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'localeString',
    }),
    defineField({
      name: 'role',
      title: 'Role / Credentials',
      type: 'localeString',
    }),
    defineField({
      name: 'bio',
      title: 'Bio Details',
      type: 'localeText',
    }),
    defineField({
      name: 'image',
      title: 'Profile Image',
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
