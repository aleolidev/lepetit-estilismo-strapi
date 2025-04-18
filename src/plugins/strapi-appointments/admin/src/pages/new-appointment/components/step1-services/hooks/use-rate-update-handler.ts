import { useEffect } from 'react';
import { Rate } from '../../../contexts/services-context';

/**
 * Hook to update the selected rate when the matching rate changes
 */
export const useRateUpdateHandler = (
  matchingRate: Rate | null,
  setSelectedRate: (rate: Rate | null) => void
): void => {
  useEffect(() => {
    setSelectedRate(matchingRate);
  }, [matchingRate, setSelectedRate]);
};
