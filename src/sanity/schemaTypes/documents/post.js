export default {
  name: 'post',
  type: 'document',
  title: 'Post',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'content',
      type: 'array',
      of: [{ type: 'block' }],
      title: 'Content',
    },
    {
      name: 'relatedProduct',
      type: 'reference',
      to: [{ type: 'product' }],
      title: 'Related Product',
    },
  ],
};