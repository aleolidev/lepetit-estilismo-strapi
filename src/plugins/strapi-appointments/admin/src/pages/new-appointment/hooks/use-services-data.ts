import { useState, useEffect } from 'react';
import { ServicesData } from '../contexts/services-context';
import { query } from '../../../utils/strapi';

export const useServicesData = () => {
  const [servicesData, setServicesData] = useState<ServicesData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchServicesData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch the structured rates data from our new endpoint
        const data = await query('/rates-structured');

        setServicesData(data);
      } catch (err) {
        console.error('Error fetching services data:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch services data'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchServicesData();
  }, []);

  return { servicesData, isLoading, error };
};
