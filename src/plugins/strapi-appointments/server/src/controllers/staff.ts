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

export interface IStaffControllerReturn {
  data: IStaff[];
}

export default ({ strapi }: { strapi: Core.Strapi }) => ({
  async find(ctx: any): Promise<IStaffControllerReturn> {
    try {
      const { query } = ctx;
      
      // Get all staff members with their relations
      const staff = await strapi.entityService.findMany('plugin::strapi-appointments.staff', {
        ...query,
        populate: {
          image: true,
          user: true
        }
      }) as IStaff[];

      return {
        data: staff
      };
    } catch (error) {
      ctx.throw(500, 'Error fetching staff members');
    }
  }
}); 