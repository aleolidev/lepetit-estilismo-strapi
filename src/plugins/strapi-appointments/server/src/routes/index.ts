import contentApi from './content-api';
import staff from './staff';
import appointment from './appointment';
import rate from './rate';
import client from './client';

export default {
  'content-api': {
    type: 'content-api',
    routes: [...contentApi],
  },
  admin: {
    type: 'admin',
    routes: [...staff, ...appointment, ...rate, ...client],
  },
};

/**
 * TODO:
 *
 * # Calendar
 *
 * - Get staff + it's appointments
 * - Delete appointment
 *
 * # New Appointment / Edit appointment
 *
 * - Get all services
 * - Get max reservation days
 * - Get staff + it's appointments + it's availability (days & hours)
 * - Get clients
 * - Create client
 * - Create appointment
 *
 * # Configuration
 *
 * - Set individual staff availability (per week)
 * - Set festivities (general and per staff)
 * - Set max reservation days
 */
