import {defineField, defineType} from 'sanity'

export const seasonType = defineType({
  name: 'season',
  title: 'Season',
  type: 'document',
  fields: [
    defineField({
      name: 'code',
      title: 'Season Code',
      type: 'string',
      options: {
        list: [
          {title: 'Spring/Summer', value: 'SS'},
          {title: 'Autumn/Winter', value: 'AW'},
          {title: 'Resort', value: 'RS'},
          {title: 'Pre-Fall', value: 'PF'},
          {title: 'Cruise', value: 'CR'},
          {title: 'Holiday', value: 'HO'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (Rule) => Rule.required().integer().min(1900).max(2100),
    }),
  ],
  preview: {
    select: {
      code: 'code',
      year: 'year',
    },
    prepare({code, year}) {
      return {
        title: `${code} ${year}`,
      }
    },
  },
})
