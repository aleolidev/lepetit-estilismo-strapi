import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { AppointmentData, Client, StepProps } from '../../../types';
import { useClientSearch } from '../../../hooks/use-client-search';

// Context interface
interface ClientInfoContextData {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedClient: Client | null;
  setSelectedClient: (client: Client | null) => void;
  clients: Client[];
  isLoadingClients: boolean;
  clientError: Error | null;
  newClient: {
    name: string;
    phone: string;
    email: string;
  };
  handleNewClientChange: (field: 'name' | 'phone' | 'email', value: string) => void;
  handleClientSelect: (client: Client | null) => void;
  handleCreateNewClient: () => void;
  notes: string;
  setNotes: (notes: string) => void;
  handleNotesChange: (value: string) => void;
  isNewClientValid: boolean;
  isStepComplete: boolean;
  onSubmitAppointment: () => void;
  appointmentData: AppointmentData;
  searchClients: (query: string) => Promise<void>;
}

// Create the context
const ClientInfoContext = createContext<ClientInfoContextData | undefined>(undefined);

// Provider component
export const ClientInfoProvider: React.FC<{
  children: React.ReactNode;
  data: AppointmentData;
  onUpdate: (data: Partial<AppointmentData>) => void;
}> = ({ children, data, onUpdate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(data.client);
  const [newClient, setNewClient] = useState({
    name: '',
    phone: '',
    email: '',
  });
  const [notes, setNotes] = useState(data.notes);

  // Use the client search hook
  const {
    clients,
    isLoading: isLoadingClients,
    error: clientError,
    searchClients,
  } = useClientSearch();

  // Reference to track if this is the first render
  const firstRender = useRef(true);

  // Handle search query changes with proper debouncing
  useEffect(() => {
    // Skip the first render to avoid unnecessary API calls
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    const timer = setTimeout(() => {
      searchClients(searchQuery);
    }, 300); // Debounce search by 300ms

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery, searchClients]);

  const handleClientSelect = useCallback(
    (client: Client | null) => {
      setSelectedClient(client);
      onUpdate({ client });
    },
    [onUpdate]
  );

  const handleNewClientChange = useCallback((field: 'name' | 'phone' | 'email', value: string) => {
    setNewClient((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleNotesChange = useCallback(
    (value: string) => {
      setNotes(value);
      onUpdate({ notes: value });
    },
    [onUpdate]
  );

  const handleCreateNewClient = useCallback(() => {
    const client: Client = {
      id: Date.now().toString(),
      name: newClient.name,
      phone: newClient.phone,
      email: newClient.email,
    };
    setSelectedClient(client);
    onUpdate({ client });
  }, [newClient, onUpdate]);

  const isNewClientValid = Boolean(newClient.name && newClient.phone);
  const isStepComplete = selectedClient !== null;

  const onSubmitAppointment = useCallback(() => {
    // Here you would typically make an API call to create the appointment
  }, [data]);

  const value = {
    searchQuery,
    setSearchQuery,
    selectedClient,
    setSelectedClient,
    clients,
    isLoadingClients,
    clientError,
    newClient,
    handleNewClientChange,
    handleClientSelect,
    handleCreateNewClient,
    notes,
    setNotes,
    handleNotesChange,
    isNewClientValid,
    isStepComplete,
    onSubmitAppointment,
    appointmentData: data,
    searchClients,
  };

  return <ClientInfoContext.Provider value={value}>{children}</ClientInfoContext.Provider>;
};

// Hook to use the context
export const useClientInfoContext = (): ClientInfoContextData => {
  const context = useContext(ClientInfoContext);
  if (context === undefined) {
    throw new Error('useClientInfoContext must be used within a ClientInfoProvider');
  }
  return context;
};
