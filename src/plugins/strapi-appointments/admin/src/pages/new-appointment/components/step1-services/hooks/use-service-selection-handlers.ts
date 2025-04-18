import { ServicesData, Service } from '../../../contexts/services-context';

/**
 * Hook that returns handlers for service and criteria selection
 */
export const useServiceSelectionHandlers = (
  servicesData: ServicesData | null,
  setSelectedService: (service: Service | null) => void,
  selectedCriteria: { [criterion: string]: string },
  setSelectedCriteria: (criteria: { [criterion: string]: string }) => void
) => {
  /**
   * Handle service selection
   */
  const handleServiceChange = (serviceId: string) => {
    const service = servicesData?.services.find((s) => String(s.id) === serviceId) || null;
    setSelectedService(service);
  };

  /**
   * Handle criterion value selection
   */
  const handleCriterionChange = (criterion: string, value: string) => {
    setSelectedCriteria({
      ...selectedCriteria,
      [criterion]: value,
    });
  };

  return {
    handleServiceChange,
    handleCriterionChange,
  };
};
