import type { Core } from '@strapi/strapi';

export default ({ strapi }: { strapi: Core.Strapi }) => ({
  async search(ctx: any): Promise<any> {
    try {
      const { query } = ctx.request.query;

      // Validate that the query parameter exists and has at least 3 characters
      if (!query || typeof query !== 'string' || query.length < 3) {
        return ctx.badRequest('Search query must be at least 3 characters long');
      }

      // Search for clients with a name, email, or phone that contains the query string
      const clients = await strapi.documents('plugin::strapi-appointments.client').findMany({
        filters: {
          $or: [
            { name: { $containsi: query } },
            { email: { $containsi: query } },
            { phone: { $containsi: query } },
          ],
        },
      });

      return clients;
    } catch (error) {
      ctx.throw(500, 'Error searching clients');
    }
  },
});
