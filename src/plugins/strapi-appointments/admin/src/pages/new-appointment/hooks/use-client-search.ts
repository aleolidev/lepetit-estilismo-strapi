import { useState, useEffect, useCallback } from 'react';
import { Client } from '../types';
import { query } from '../../../utils/strapi';

export const useClientSearch = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const searchClients = useCallback(async (searchQuery: string) => {
    // Don't search if query is less than 3 characters
    if (!searchQuery || typeof searchQuery !== 'string' || searchQuery.length < 3) {
      setClients([]);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Call the clients search API endpoint with the raw query string
      const response = await query(`/clients/search?query=${searchQuery}`);

      // Convert the response data to the required format
      const formattedClients = response.map((client: any) => ({
        id: client.id?.toString() || client.documentId,
        name: client.name,
        phone: client.phone || '',
        email: client.email || '',
      }));

      setClients(formattedClients);
    } catch (err) {
      console.error('Error searching clients:', err);
      setError(err instanceof Error ? err : new Error('Failed to search clients'));
      setClients([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    clients,
    isLoading,
    error,
    searchClients,
  };
};
