import {defineField, defineType} from 'sanity'

export const categoryType = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
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
      name: 'parent',
      title: 'Parent Category',
      type: 'reference',
      to: [{type: 'category'}],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'parent.name',
    },
    prepare({title, subtitle}) {
      return {
        title,
        subtitle: subtitle ? `Parent: ${subtitle}` : 'Top-level category',
      }
    },
  },
})
