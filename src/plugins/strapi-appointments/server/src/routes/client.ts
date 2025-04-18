export default [
  {
    method: 'GET',
    path: '/clients/search',
    handler: 'client.search',
    config: {
      policies: [],
      auth: false,
      prefix: '',
    },
  },
];
