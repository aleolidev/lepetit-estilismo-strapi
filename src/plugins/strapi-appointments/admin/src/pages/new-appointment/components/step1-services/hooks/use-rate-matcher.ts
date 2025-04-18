import { useMemo } from 'react';
import { Service, Rate } from '../../../contexts/services-context';

export const useRateMatcher = (
  selectedService: Service | null,
  selectedCriteria: { [criterion: string]: string }
): Rate | null => {
  return useMemo(() => {
    if (!selectedService) return null;

    // If no criteria are selected, return null
    const criteriaKeys = Object.keys(selectedService.criteriaOptions);
    if (criteriaKeys.length > 0 && Object.keys(selectedCriteria).length === 0) {
      return null;
    }

    // If service has no criteria options, return the first rate (or null if no rates)
    if (criteriaKeys.length === 0) {
      return selectedService.rates.length > 0 ? selectedService.rates[0] : null;
    }

    // Check if all criteria have been selected
    const allCriteriaSelected = criteriaKeys.every((key) => selectedCriteria[key]);
    if (!allCriteriaSelected) return null;

    // Find matching rate
    return (
      selectedService.rates.find((rate) => {
        // If rate has no conditions but criteria are selected, it's not a match
        if (!rate.conditions || rate.conditions.length === 0) {
          return false;
        }

        // Check if all selected criteria match the rate conditions
        return Object.entries(selectedCriteria).every(([criterion, value]) => {
          return rate.conditions.some(
            (condition) => condition.criterion === criterion && condition.value === value
          );
        });
      }) || null
    );
  }, [selectedService, selectedCriteria]);
};
