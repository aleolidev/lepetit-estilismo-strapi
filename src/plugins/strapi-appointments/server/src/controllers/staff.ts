import type { Core } from '@strapi/types';

export interface IStaff {
  id: number;
  name: string;
  email: string;
  phone: string;
  image: {
    id: number;
    url: string;
    formats?: any;
  };
  user?: {
    id: number;
    username: string;
    email: string;
  };
}

export interface IAppointment {
  id: number;
  client: {
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

export interface IStaffWithAppointments extends IStaff {
  appointments: IAppointment[];
}

export interface IStaffControllerReturn {
  data: IStaff[];
}

export interface IStaffWithAppointmentsReturn {
  data: IStaffWithAppointments[];
}

export default ({ strapi }: { strapi: Core.Strapi }) => ({
  async find(ctx: any): Promise<IStaffControllerReturn> {
    try {
      const { query } = ctx;

      // Get all staff members with their relations
      const staff = (await strapi.entityService.findMany('plugin::strapi-appointments.staff', {
        ...query,
        populate: {
          image: true,
          user: true,
        },
      })) as IStaff[];

      return {
        data: staff,
      };
    } catch (error) {
      ctx.throw(500, 'Error fetching staff members');
    }
  },

  async findWithAppointments(ctx: any): Promise<IStaffWithAppointmentsReturn> {
    try {
      const { query } = ctx;

      // Get all staff members with their relations
      const staff = (await strapi.entityService.findMany('plugin::strapi-appointments.staff', {
        ...query,
        populate: {
          image: true,
          user: true,
        },
      })) as IStaff[];

      // For each staff member, get their appointments
      const staffWithAppointments = await Promise.all(
        staff.map(async (staffMember) => {
          const appointments = (await strapi.entityService.findMany(
            'plugin::strapi-appointments.appointment',
            {
              filters: {
                staff: staffMember.id,
              },
              populate: {
                client: true,
                service: true,
              },
            }
          )) as IAppointment[];

          return {
            ...staffMember,
            appointments: appointments || [],
          } as IStaffWithAppointments;
        })
      );

      return {
        data: staffWithAppointments,
      };
    } catch (error) {
      ctx.throw(500, 'Error fetching staff members with appointments');
    }
  },
});
