export default [
  {
    method: 'GET',
    path: '/rates',
    handler: 'rate.find',
    config: {
      policies: [],
      auth: false,
      prefix: '',
    },
  },
  {
    method: 'GET',
    path: '/rates-structured',
    handler: 'rate.findStructured',
    config: {
      policies: [],
      auth: false,
      prefix: '',
    },
  },
];
