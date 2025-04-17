export default [
  {
    method: 'GET',
    path: '/appointments',
    handler: 'appointment.find',
    config: {
      policies: [],
      auth: false,
      prefix: '',
    },
  },
];
