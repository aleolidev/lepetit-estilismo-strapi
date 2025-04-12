import type { Schema, Struct } from '@strapi/strapi';

export interface PricingPriceCondition extends Struct.ComponentSchema {
  collectionName: 'components_pricing_price_conditions';
  info: {
    description: 'Criterio de precio din\u00E1mico';
    displayName: 'PriceCondition';
    icon: 'dollar-sign';
  };
  attributes: {
    criterion: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'pricing.price-condition': PricingPriceCondition;
    }
  }
}
