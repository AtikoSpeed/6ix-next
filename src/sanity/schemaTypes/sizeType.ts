import {defineField, defineType} from 'sanity'

export const sizeType = defineType({
  name: 'size',
  title: 'Size',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Size Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'E.g., "Small", "Medium", "Large", "XL", "36", "38", etc.',
    }),
    defineField({
      name: 'shortCode',
      title: 'Short Code',
      type: 'string',
      description: 'E.g., "S", "M", "L", "XL", etc.',
    }),
    defineField({
      name: 'sizeOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Used to control the order of sizes (e.g., S=1, M=2, L=3)',
      validation: (Rule) => Rule.integer(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      code: 'shortCode',
    },
    prepare({title, code}) {
      return {
        title: title,
        subtitle: code ? `Code: ${code}` : '',
      }
    },
  },
})
