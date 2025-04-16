export default [
  {
    method: 'GET',
    path: '/staff',
    handler: 'staff.find',
    config: {
      policies: [],
      auth: false,
      prefix: '',
    },
  },
]; 