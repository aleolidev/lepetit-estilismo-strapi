import { Box, Typography, SingleSelect, SingleSelectOption } from '@strapi/design-system';
import { Service } from '../../../contexts/services-context';

interface ServiceSelectorProps {
  services: Service[] | undefined;
  selectedServiceId: string;
  onServiceChange: (serviceId: string) => void;
}

export const ServiceSelector = ({
  services = [],
  selectedServiceId,
  onServiceChange,
}: ServiceSelectorProps) => {
  return (
    <Box marginBottom={4} marginTop={4}>
      <SingleSelect
        label="Service"
        placeholder="Select a service"
        value={selectedServiceId}
        onChange={onServiceChange}
      >
        {services.map((service) => (
          <SingleSelectOption key={service.id} value={String(service.id)}>
            {service.name}
          </SingleSelectOption>
        ))}
      </SingleSelect>
    </Box>
  );
};
