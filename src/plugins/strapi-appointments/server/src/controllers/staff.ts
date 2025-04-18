import type { Core } from '@strapi/types';

export default ({ strapi }: { strapi: Core.Strapi }) => ({
  async find(ctx: any): Promise<any> {
    try {
      const { query } = ctx;
      const staff = await strapi.documents('plugin::strapi-appointments.staff').findMany({
        ...query,
        populate: {
          image: true,
          user: true,
        },
      });

      // NOTE: We need to manually filter out the user fields because the populate fields option
      return staff.map((staffMember) => {
        const user = staffMember.user;

        return {
          ...staffMember,
          user: {
            id: user.id,
            documentId: user.documentId,
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
            email: user.email,
          },
        };
      });
    } catch (error) {
      console.log(error);
      ctx.throw(500, 'Error fetching staff members');
    }
  },

  async findWithAppointments(ctx: any): Promise<any> {
    try {
      const { query } = ctx;

      // Get all staff members with their relations
      const staff = await strapi.documents('plugin::strapi-appointments.staff').findMany({
        ...query,
        populate: {
          image: true,
          user: true,
        },
      });

      // For each staff member, get their appointments
      const staffWithAppointments = await Promise.all(
        staff.map(async (staffMember) => {
          const appointments = await strapi
            .documents('plugin::strapi-appointments.appointment')
            .findMany({
              filters: {
                staff: staffMember.id,
              },
              populate: { client: true, service: true },
            });

          const user = staffMember.user;

          return {
            ...staffMember,
            user: {
              id: user.id,
              documentId: user.documentId,
              firstname: user.firstname,
              lastname: user.lastname,
              username: user.username,
              email: user.email,
            },
            appointments: appointments || [],
          };
        })
      );

      return staffWithAppointments;
    } catch (error) {
      ctx.throw(500, 'Error fetching staff members with appointments');
    }
  },
});
