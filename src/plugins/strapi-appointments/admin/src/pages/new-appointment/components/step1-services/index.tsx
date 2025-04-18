import { Typography, Button, Flex } from '@strapi/design-system';
import { StepProps } from '../../types';
import { useServicesContext } from '../../contexts/services-context';
import { Page } from '@strapi/strapi/admin';
import { useRateMatcher } from './hooks/use-rate-matcher';
import { useRateUpdateHandler } from './hooks/use-rate-update-handler';
import { useAppointmentDataUpdater } from '../../hooks/use-appointment-data-updater';
import { useServiceSelectionHandlers } from './hooks/use-service-selection-handlers';
import { ServiceSelector } from './components/service-selector';
import { CriteriaSelectors } from './components/criteria-selectors';
import { SelectedRateDisplay } from './components/selected-rate-display';

interface Step1ServicesProps extends StepProps {
  onNext: () => void;
}

const Step1Services = ({ data, onUpdate, onNext }: Step1ServicesProps) => {
  // Get context values
  const {
    servicesData,
    isLoading,
    error,
    selectedService,
    setSelectedService,
    selectedCriteria,
    setSelectedCriteria,
    selectedRate,
    setSelectedRate,
  } = useServicesContext();

  // Get the matching rate based on selected criteria
  const matchingRate = useRateMatcher(selectedService, selectedCriteria);

  // Update selected rate when matching rate changes
  useRateUpdateHandler(matchingRate, setSelectedRate);

  // Update parent component when rate is selected
  useAppointmentDataUpdater(selectedRate, selectedService, onUpdate);

  // Get handlers for service and criteria selection
  const { handleServiceChange, handleCriterionChange } = useServiceSelectionHandlers(
    servicesData,
    setSelectedService,
    selectedCriteria,
    setSelectedCriteria
  );

  // Loading and error states
  if (isLoading) return <Page.Loading />;
  if (error) return <Page.Error />;

  return (
    <>
      <Typography variant="beta" marginBottom={4}>
        Select a Service
      </Typography>

      {/* Service selection component */}
      <ServiceSelector
        services={servicesData?.services}
        selectedServiceId={selectedService ? String(selectedService.id) : ''}
        onServiceChange={handleServiceChange}
      />

      {/* Criteria selectors component */}
      <CriteriaSelectors
        selectedService={selectedService}
        selectedCriteria={selectedCriteria}
        onCriterionChange={handleCriterionChange}
      />

      {/* Selected rate display component */}
      <SelectedRateDisplay selectedRate={selectedRate} />

      {/* Navigation buttons */}
      <Flex justifyContent="flex-end" marginTop={6}>
        <Button onClick={onNext} disabled={!selectedRate} size="L">
          Next
        </Button>
      </Flex>
    </>
  );
};

export { Step1Services };
