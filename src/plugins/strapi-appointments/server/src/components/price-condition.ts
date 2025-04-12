export const priceCondition = {
    collectionName: "components_pricing_price_conditions",
    info: {
      displayName: "PriceCondition",
      icon: "dollar-sign", // Puedes escoger el icono que prefieras
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
    __filename__: "price-condition.json",
    __schema__: {
      collectionName: "components_custom_price_conditions",
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
      __filename__: "price-condition.json",
    },
    uid: "pricing.price-condition",
    category: "pricing",
    modelType: "component",
    modelName: "price-condition",
    globalId: "ComponentPricingPriceCondition",
  };
  