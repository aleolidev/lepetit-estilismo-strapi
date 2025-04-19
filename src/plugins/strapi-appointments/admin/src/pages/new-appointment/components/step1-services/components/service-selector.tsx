import { Box, Typography, MultiSelect, MultiSelectOption } from '@strapi/design-system';
import { Service } from '../../../contexts/services-context';

interface ServiceSelectorProps {
  services: Service[] | undefined;
  selectedServiceIds: string[];
  onServiceChange: (serviceIds: string[]) => void;
}

export const ServiceSelector = ({
  services = [],
  selectedServiceIds,
  onServiceChange,
}: ServiceSelectorProps) => {
  return (
    <Box marginBottom={4} marginTop={4}>
      <MultiSelect
        label="Services"
        placeholder="Select services"
        value={selectedServiceIds}
        onChange={onServiceChange}
      >
        {services.map((service) => (
          <MultiSelectOption key={service.id} value={String(service.id)}>
            {service.name}
          </MultiSelectOption>
        ))}
      </MultiSelect>
    </Box>
  );
};
