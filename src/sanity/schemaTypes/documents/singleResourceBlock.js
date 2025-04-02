export default {
    name: 'singleResourceBlock',
    type: 'object',
    title: 'Single Resource Block',
    fields: [
      {
        name: 'title',
        type: 'string',
        title: 'Title',
      },
      {
        name: 'resource',
        type: 'reference',
        to: [{ type: 'product' }],
        title: 'Resource',
      },
    ],
  };