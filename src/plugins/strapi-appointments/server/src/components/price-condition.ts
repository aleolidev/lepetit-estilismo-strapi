export const priceCondition = {
  uid: "rate.price-condition",
  category: "rate",
  modelType: "component",
  modelName: "price-condition",
  globalId: "ComponentRatePriceCondition",
  collectionName: "components_rate_price_conditions",
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
};
