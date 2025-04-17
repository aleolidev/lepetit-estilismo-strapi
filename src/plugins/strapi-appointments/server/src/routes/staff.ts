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
  {
    method: 'GET',
    path: '/staff-with-appointments',
    handler: 'staff.findWithAppointments',
    config: {
      policies: [],
      auth: false,
      prefix: '',
    },
  },
];
