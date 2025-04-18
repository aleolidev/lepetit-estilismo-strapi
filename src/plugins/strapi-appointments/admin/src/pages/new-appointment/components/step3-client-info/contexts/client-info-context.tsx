import React, { createContext, useContext, useState, useCallback } from 'react';
import { AppointmentData, Client, StepProps } from '../../../types';

// Context interface
interface ClientInfoContextData {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedClient: Client | null;
  setSelectedClient: (client: Client | null) => void;
  newClient: {
    name: string;
    phone: string;
    email: string;
  };
  handleNewClientChange: (field: 'name' | 'phone' | 'email', value: string) => void;
  handleClientSelect: (client: Client) => void;
  handleCreateNewClient: () => void;
  notes: string;
  setNotes: (notes: string) => void;
  handleNotesChange: (value: string) => void;
  isNewClientValid: boolean;
  isStepComplete: boolean;
  onSubmitAppointment: () => void;
  appointmentData: AppointmentData;
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

  // Mock clients data - replace with actual data from your API
  const clients: Client[] = [
    { id: '1', name: 'John Doe', phone: '+1234567890', email: 'john@example.com' },
    { id: '2', name: 'Jane Smith', phone: '+0987654321', email: 'jane@example.com' },
  ];

  const handleClientSelect = useCallback(
    (client: Client) => {
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
    console.log('Submit appointment', data);
    // Here you would typically make an API call to create the appointment
  }, [data]);

  const value = {
    searchQuery,
    setSearchQuery,
    selectedClient,
    setSelectedClient,
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
