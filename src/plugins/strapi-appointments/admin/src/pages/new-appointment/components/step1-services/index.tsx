import { Typography, Button, Flex } from '@strapi/design-system';
import { StepProps } from '../../types';
import { useServicesContext, Service, Rate } from '../../contexts/services-context';
import { Page } from '@strapi/strapi/admin';
import { useEffect, useMemo } from 'react';
import { ServiceSelector } from './components/service-selector';
import { TotalRatesDisplay } from './components/total-rates-display';
import { ServiceRatesSection } from './components/service-rates-section';

interface Step1ServicesProps extends StepProps {
  onNext: () => void;
}

const Step1Services = ({ data, onUpdate, onNext }: Step1ServicesProps) => {
  // Get context values
  const {
    servicesData,
    isLoading,
    error,
    selectedServices,
    addSelectedService,
    removeSelectedService,
    selectedCriteria,
    setSelectedCriteria,
    selectedRates,
    setSelectedRate,
    getTotalEstimatedTime,
    getTotalEstimatedPrice,
  } = useServicesContext();

  // Find the service by ID
  const getServiceById = (id: string): Service | undefined => {
    return servicesData?.services.find((service) => String(service.id) === id);
  };

  // Handle service selection changes
  const handleServiceChange = (serviceIds: string[]) => {
    // Get the current selected service IDs
    const currentSelectedIds = Array.from(selectedServices.keys()).map((id) => String(id));

    // Find newly added service IDs
    const newlyAdded = serviceIds.filter((id) => !currentSelectedIds.includes(id));

    // Find removed service IDs
    const removed = currentSelectedIds.filter((id) => !serviceIds.includes(id));

    // Add new services
    newlyAdded.forEach((id) => {
      const service = getServiceById(id);
      if (service) {
        addSelectedService(service);
      }
    });

    // Remove services
    removed.forEach((id) => {
      removeSelectedService(Number(id));
    });
  };

  // Handle criterion change for a specific service
  const handleCriterionChange = (serviceId: number, criterion: string, value: string) => {
    const currentCriteria = selectedCriteria.get(serviceId) || {};
    setSelectedCriteria(serviceId, {
      ...currentCriteria,
      [criterion]: value,
    });
  };

  // Update parent component with all selected rates
  useEffect(() => {
    // Convert our rates to the simplified services array expected by AppointmentData
    const simplifiedServices = Array.from(selectedRates.entries())
      .map(([serviceId, rate]) => {
        const service = selectedServices.get(serviceId);
        if (!service) return null;

        return {
          id: String(service.id),
          name: service.name,
          category: '', // Not used in the new structure
          duration: rate.timeEstimation,
          price: rate.price * (rate.timeEstimation / 60), // Calculate price based on hourly rate
          selectedRate: rate,
        };
      })
      .filter(Boolean);

    onUpdate({
      services: simplifiedServices as any[], // Cast to satisfy TypeScript
      selectedRate: selectedRates.size > 0 ? Array.from(selectedRates.values())[0] : undefined,
    });
  }, [selectedRates, selectedServices, onUpdate]);

  // Check if we can proceed to next step (at least one service with a rate selected)
  const canProceed = selectedRates.size > 0;

  // Get all selected service IDs for the selector
  const selectedServiceIds = useMemo(() => {
    return Array.from(selectedServices.keys()).map((id) => String(id));
  }, [selectedServices]);

  // Loading and error states
  if (isLoading) return <Page.Loading />;
  if (error) return <Page.Error />;

  return (
    <>
      <Typography variant="beta" marginBottom={4}>
        Select Services
      </Typography>

      {/* Service selection component */}
      <ServiceSelector
        services={servicesData?.services}
        selectedServiceIds={selectedServiceIds}
        onServiceChange={handleServiceChange}
      />

      {/* For each selected service, show criteria and rate */}
      {Array.from(selectedServices.entries()).map(([serviceId, service]) => (
        <ServiceRatesSection
          key={serviceId}
          service={service}
          selectedCriteria={selectedCriteria.get(serviceId) || {}}
          selectedRate={selectedRates.get(serviceId) || null}
          onCriterionChange={(criterion: string, value: string) =>
            handleCriterionChange(serviceId, criterion, value)
          }
          onRateSelected={(rate: Rate | null) => setSelectedRate(serviceId, rate)}
        />
      ))}

      {/* Total rates display component */}
      <TotalRatesDisplay
        totalTime={getTotalEstimatedTime()}
        totalPrice={getTotalEstimatedPrice()}
        selectedRatesCount={selectedRates.size}
      />

      {/* Navigation buttons */}
      <Flex justifyContent="flex-end" marginTop={6}>
        <Button onClick={onNext} disabled={!canProceed} size="L">
          Next
        </Button>
      </Flex>
    </>
  );
};

export { Step1Services };
