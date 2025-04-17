/**
 *  controller
 */

import type { Core } from '@strapi/types';

export interface IAppointment {
  id: number;
  client: {
    id: number;
    name: string;
    email: string;
    phone: string;
  };
  staff: {
    id: number;
    name: string;
    email: string;
    phone: string;
  };
  service: {
    id: number;
    name: string;
  };
  date: string;
  actualDuration: number;
  notes: string;
}

export interface IAppointmentControllerReturn {
  data: IAppointment[];
}

export default ({ strapi }: { strapi: Core.Strapi }) => ({
  async find(ctx: any): Promise<IAppointmentControllerReturn> {
    try {
      const { query } = ctx;

      // Get all appointments with their relations
      const appointments = (await strapi.entityService.findMany(
        'plugin::strapi-appointments.appointment',
        {
          ...query,
          populate: {
            client: true,
            staff: true,
            service: true,
          },
        }
      )) as IAppointment[];

      return {
        data: appointments,
      };
    } catch (error) {
      ctx.throw(500, 'Error fetching appointments');
    }
  },
});
