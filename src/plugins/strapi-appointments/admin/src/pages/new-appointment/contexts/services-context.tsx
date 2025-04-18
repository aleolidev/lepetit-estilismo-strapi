import { createContext, ReactNode, useContext, useState } from 'react';
import { useServicesData } from '../hooks/use-services-data';

// Define the types for our structured rates data
export interface PriceCondition {
  id: number;
  value: string;
}

export interface Rate {
  id: number;
  documentId: string;
  name: string;
  price: number;
  timeEstimation: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
  conditions: Array<{
    __component: string;
    id: number;
    criterion: string;
    value: string;
  }>;
}

export interface Service {
  id: number;
  documentId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
  criteriaOptions: {
    [criterion: string]: PriceCondition[];
  };
  rates: Rate[];
}

export interface ServicesData {
  services: Service[];
}

// Define the context state type
type ServicesContextState = {
  servicesData: ServicesData | null;
  isLoading: boolean;
  error: Error | null;
  selectedService: Service | null;
  setSelectedService: (service: Service | null) => void;
  selectedCriteria: { [criterion: string]: string };
  setSelectedCriteria: (criteria: { [criterion: string]: string }) => void;
  selectedRate: Rate | null;
  setSelectedRate: (rate: Rate | null) => void;
};

// Create the context with default values
const ServicesContext = createContext<ServicesContextState>({
  servicesData: null,
  isLoading: false,
  error: null,
  selectedService: null,
  setSelectedService: () => {},
  selectedCriteria: {},
  setSelectedCriteria: () => {},
  selectedRate: null,
  setSelectedRate: () => {},
});

// Custom hook to use the services context
export const useServicesContext = () => useContext(ServicesContext);

// Props for the services provider
type ServicesProviderProps = {
  children: ReactNode;
};

// Services provider component
export const ServicesProvider = ({ children }: ServicesProviderProps) => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedCriteria, setSelectedCriteria] = useState<{ [criterion: string]: string }>({});
  const [selectedRate, setSelectedRate] = useState<Rate | null>(null);

  const { servicesData, isLoading, error } = useServicesData();

  // Reset criteria when service changes
  const handleSelectService = (service: Service | null) => {
    setSelectedService(service);
    setSelectedCriteria({});
    setSelectedRate(null);
  };

  // Context value
  const value = {
    servicesData,
    isLoading,
    error,
    selectedService,
    setSelectedService: handleSelectService,
    selectedCriteria,
    setSelectedCriteria,
    selectedRate,
    setSelectedRate,
  };

  return <ServicesContext.Provider value={value}>{children}</ServicesContext.Provider>;
};
