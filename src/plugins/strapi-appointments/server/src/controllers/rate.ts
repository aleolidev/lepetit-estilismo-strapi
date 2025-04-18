import type { Core } from '@strapi/types';

export default ({ strapi }: { strapi: Core.Strapi }) => ({
  async find(ctx: any): Promise<any> {
    try {
      const { query } = ctx;

      // Get all rates with their relations
      const rates = await strapi.documents('plugin::strapi-appointments.rate').findMany({
        ...query,
        populate: {
          service: true,
          conditions: true,
        },
      });

      return rates;
    } catch (error) {
      ctx.throw(500, 'Error fetching rates');
    }
  },

  async findStructured(ctx: any): Promise<any> {
    try {
      const { query } = ctx;

      // Get all rates with their relations
      const rates = await strapi.documents('plugin::strapi-appointments.rate').findMany({
        ...query,
        populate: {
          service: true,
          conditions: true,
        },
      });

      // Get unique services
      const servicesMap = new Map();
      rates.forEach((rate) => {
        if (rate.service && !servicesMap.has(rate.service.id)) {
          servicesMap.set(rate.service.id, {
            id: rate.service.id,
            documentId: rate.service.documentId,
            name: rate.service.name,
            createdAt: rate.service.createdAt,
            updatedAt: rate.service.updatedAt,
            publishedAt: rate.service.publishedAt,
            locale: rate.service.locale,
            criteriaOptions: {},
            rates: [],
          });
        }
      });

      // Process each rate
      rates.forEach((rate) => {
        if (!rate.service) return;

        const serviceData = servicesMap.get(rate.service.id);

        // Add rate to service rates array (with all fields preserved)
        serviceData.rates.push({
          id: rate.id,
          documentId: rate.documentId,
          name: rate.name,
          price: rate.price,
          timeEstimation: rate.timeEstimation,
          createdAt: rate.createdAt,
          updatedAt: rate.updatedAt,
          publishedAt: rate.publishedAt,
          locale: rate.locale,
          conditions: rate.conditions,
        });

        // Extract and organize criteria
        if (rate.conditions && rate.conditions.length > 0) {
          rate.conditions.forEach((condition) => {
            if (!condition.criterion) return;

            // Initialize criterion array if it doesn't exist
            if (!serviceData.criteriaOptions[condition.criterion]) {
              serviceData.criteriaOptions[condition.criterion] = [];
            }

            // Add the value if it doesn't already exist
            const existingValue = serviceData.criteriaOptions[condition.criterion].find(
              (option) => option.value === condition.value
            );

            if (!existingValue) {
              serviceData.criteriaOptions[condition.criterion].push({
                id: condition.id,
                value: condition.value,
              });
            }
          });
        }
      });

      return {
        services: Array.from(servicesMap.values()),
      };
    } catch (error) {
      ctx.throw(500, 'Error fetching structured rates data');
    }
  },
});
