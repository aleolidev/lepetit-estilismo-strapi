import { Core } from "@strapi/strapi";
import { priceCondition } from "../../components/price-condition";

export const registerComponents = (strapi: Core.Strapi) => {
    registerPriceCondition(strapi);
};

const registerPriceCondition = (strapi: Core.Strapi) => {
    strapi.components['pricing.price-condition'] = priceCondition as any;
}
    
