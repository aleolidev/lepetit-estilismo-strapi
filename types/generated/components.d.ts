import type { Schema, Struct } from '@strapi/strapi';

export interface RatePriceCondition extends Struct.ComponentSchema {
  collectionName: 'components_rate_price_conditions';
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
      'rate.price-condition': RatePriceCondition;
    }
  }
}
