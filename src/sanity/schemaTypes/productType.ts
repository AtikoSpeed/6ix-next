import {defineField, defineType} from 'sanity'

export const productType = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'productCode',
      title: 'Product Code',
      type: 'string',
      description: 'Unique product identifier (e.g., G13, H03)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Product Name',
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
      name: 'gender',
      title: 'Gender',
      type: 'reference',
      to: [{type: 'gender'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      description: 'Brief description (e.g., "grass t-shirt", "half-zip fleece")',
      type: 'string',
    }),
    defineField({
      name: 'designer',
      title: 'Designer',
      type: 'reference',
      to: [{type: 'designer'}],
    }),
    defineField({
      name: 'season',
      title: 'Season',
      type: 'reference',
      to: [{type: 'season'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Alternative Text',
              type: 'string',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'inStock',
      title: 'In Stock',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'variants',
      title: 'Variants',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'size',
              title: 'Size',
              type: 'reference',
              to: [{type: 'size'}],
            },
            {
              name: 'color',
              title: 'Color',
              type: 'reference',
              to: [{type: 'color'}],
            },
            {
              name: 'stock',
              title: 'Stock Quantity',
              type: 'number',
              validation: (Rule) => Rule.min(0),
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'brand',
      title: 'Brand',
      type: 'reference',
      to: [{type: 'brand'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'material',
      title: 'Material',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      code: 'productCode',
      brand: 'brand.name',
      designer: 'designer.name',
      gender: 'gender.name',
      season: 'season.code',
      seasonYear: 'season.year',
      shortDesc: 'shortDescription',
      media: 'images.0',
    },
    prepare({title, code, brand, designer, gender, season, seasonYear, shortDesc, media}) {
      const designerInfo = designer ? ` by ${designer}` : ''
      const seasonInfo = season && seasonYear ? ` - ${season} ${seasonYear}` : ''
      const genderInfo = gender ? ` [${gender}]` : ''
      const displayTitle = `${code} - ${brand}${designerInfo}${seasonInfo}${genderInfo}`

      return {
        title: displayTitle,
        subtitle: shortDesc || title,
        media,
      }
    },
  },
})
