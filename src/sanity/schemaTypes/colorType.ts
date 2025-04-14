import {defineField, defineType} from 'sanity'

export const colorType = defineType({
  name: 'color',
  title: 'Color',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Color Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'hexCode',
      title: 'Hex Code',
      type: 'string',
      description: 'Hex color code (e.g., #FF5733)',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      hex: 'hexCode',
    },
    prepare({title, hex}) {
      return {
        title,
        subtitle: hex || '',
      }
    },
  },
})
