import {defineField, defineType} from 'sanity'

export const designerType = defineType({
  name: 'designer',
  title: 'Designer',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Designer Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Designer Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'collaboratedBrands',
      title: 'Collaborated Brands',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'brand'}],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
})
