import { useEffect } from 'react';
import { Rate, Service } from '../contexts/services-context';
import { AppointmentData } from '../types';

/**
 * Hook to update the appointment data when the selected rate changes
 */
export const useAppointmentDataUpdater = (
  selectedRate: Rate | null,
  selectedService: Service | null,
  onUpdate: (data: Partial<AppointmentData>) => void
): void => {
  useEffect(() => {
    if (selectedRate) {
      onUpdate({
        selectedRate,
        services: [
          {
            id: `${selectedRate.id}`,
            name: selectedRate.name,
            category: selectedService?.name || '',
            price: selectedRate.price,
            duration: selectedRate.timeEstimation,
          },
        ],
      });
    } else {
      onUpdate({
        selectedRate: undefined,
        services: [],
      });
    }
  }, [selectedRate, selectedService, onUpdate]);
};
