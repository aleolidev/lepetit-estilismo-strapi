import { Core } from "@strapi/strapi";
import { priceCondition } from "../../components/price-condition";

export const registerComponents = (strapi: Core.Strapi) => {
    registerPriceCondition(strapi);
};

const registerPriceCondition = (strapi: Core.Strapi) => {
    strapi.components['rate.price-condition'] = priceCondition as any;
}