export const priceCondition = {
  collectionName: "components_pricing_price_conditions",
  info: {
    displayName: "PriceCondition",
    icon: "dollar-sign",
    description: "Criterio de precio dinámico"
  },
  options: {},
  attributes: {
    criterion: {
      type: "string",
      required: true,
    },
    value: {
      type: "string",
      required: true,
    },
  },
  uid: "pricing.price-condition",
  category: "pricing",
  modelType: "component",
  modelName: "price-condition",
  globalId: "ComponentPricingPriceCondition",
};
