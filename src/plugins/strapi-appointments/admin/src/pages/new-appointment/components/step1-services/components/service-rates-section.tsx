import { Box, Typography, Divider } from '@strapi/design-system';
import { Service, Rate } from '../../../contexts/services-context';
import { CriteriaSelectors } from './criteria-selectors';
import { SelectedRateDisplay } from './selected-rate-display';
import { useRateMatcher } from '../hooks/use-rate-matcher';
import { useEffect } from 'react';

interface ServiceRatesSectionProps {
  service: Service;
  selectedCriteria: { [criterion: string]: string };
  selectedRate: Rate | null;
  onCriterionChange: (criterion: string, value: string) => void;
  onRateSelected: (rate: Rate | null) => void;
}

export const ServiceRatesSection = ({
  service,
  selectedCriteria,
  selectedRate,
  onCriterionChange,
  onRateSelected,
}: ServiceRatesSectionProps) => {
  // Get the matching rate based on selected criteria
  const matchingRate = useRateMatcher(service, selectedCriteria);

  // Update selected rate when matching rate changes
  useEffect(() => {
    if (matchingRate !== selectedRate) {
      onRateSelected(matchingRate);
    }
  }, [matchingRate, selectedRate, onRateSelected]);

  return (
    <Box marginTop={4} marginBottom={4} padding={4} background="neutral100" hasRadius>
      <Typography variant="delta">{service.name}</Typography>

      {/* Criteria selectors for this service */}
      <Box paddingTop={4}>
        <CriteriaSelectors
          selectedService={service}
          selectedCriteria={selectedCriteria}
          onCriterionChange={onCriterionChange}
        />

        {/* Selected rate display for this service */}
        <SelectedRateDisplay selectedRate={selectedRate} />
      </Box>
    </Box>
  );
};
