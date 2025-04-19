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
  selectedServices: Map<number, Service>;
  setSelectedServices: (services: Map<number, Service>) => void;
  addSelectedService: (service: Service) => void;
  removeSelectedService: (serviceId: number) => void;
  selectedCriteria: Map<number, { [criterion: string]: string }>;
  setSelectedCriteria: (serviceId: number, criteria: { [criterion: string]: string }) => void;
  selectedRates: Map<number, Rate>;
  setSelectedRate: (serviceId: number, rate: Rate | null) => void;
  getTotalEstimatedTime: () => number;
  getTotalEstimatedPrice: () => number;
};

// Create the context with default values
const ServicesContext = createContext<ServicesContextState>({
  servicesData: null,
  isLoading: false,
  error: null,
  selectedServices: new Map(),
  setSelectedServices: () => {},
  addSelectedService: () => {},
  removeSelectedService: () => {},
  selectedCriteria: new Map(),
  setSelectedCriteria: () => {},
  selectedRates: new Map(),
  setSelectedRate: () => {},
  getTotalEstimatedTime: () => 0,
  getTotalEstimatedPrice: () => 0,
});

// Custom hook to use the services context
export const useServicesContext = () => useContext(ServicesContext);

// Props for the services provider
type ServicesProviderProps = {
  children: ReactNode;
};

// Services provider component
export const ServicesProvider = ({ children }: ServicesProviderProps) => {
  const [selectedServices, setSelectedServices] = useState<Map<number, Service>>(new Map());
  const [selectedCriteria, setSelectedCriteria] = useState<
    Map<number, { [criterion: string]: string }>
  >(new Map());
  const [selectedRates, setSelectedRates] = useState<Map<number, Rate>>(new Map());

  const { servicesData, isLoading, error } = useServicesData();

  // Add a selected service
  const addSelectedService = (service: Service) => {
    setSelectedServices((prev) => {
      const newMap = new Map(prev);
      newMap.set(service.id, service);
      return newMap;
    });
  };

  // Remove a selected service
  const removeSelectedService = (serviceId: number) => {
    setSelectedServices((prev) => {
      const newMap = new Map(prev);
      newMap.delete(serviceId);
      return newMap;
    });

    // Also remove any criteria and rates for this service
    setSelectedCriteria((prev) => {
      const newMap = new Map(prev);
      newMap.delete(serviceId);
      return newMap;
    });

    setSelectedRates((prev) => {
      const newMap = new Map(prev);
      newMap.delete(serviceId);
      return newMap;
    });
  };

  // Set criteria for a specific service
  const handleSetSelectedCriteria = (
    serviceId: number,
    criteria: { [criterion: string]: string }
  ) => {
    setSelectedCriteria((prev) => {
      const newMap = new Map(prev);
      newMap.set(serviceId, criteria);
      return newMap;
    });
  };

  // Set rate for a specific service
  const handleSetSelectedRate = (serviceId: number, rate: Rate | null) => {
    setSelectedRates((prev) => {
      const newMap = new Map(prev);
      if (rate) {
        newMap.set(serviceId, rate);
      } else {
        newMap.delete(serviceId);
      }
      return newMap;
    });
  };

  // Calculate total estimated time from all selected rates
  const getTotalEstimatedTime = () => {
    let total = 0;
    selectedRates.forEach((rate) => {
      total += rate.timeEstimation;
    });
    return total;
  };

  // Calculate total estimated price from all selected rates
  const getTotalEstimatedPrice = () => {
    let total = 0;
    selectedRates.forEach((rate) => {
      // Calculate price based on hourly rate and time
      const hourlyRate = rate.price;
      const timeEstimation = rate.timeEstimation;
      const hours = timeEstimation / 60;
      total += hourlyRate * hours;
    });
    return total;
  };

  // Context value
  const value = {
    servicesData,
    isLoading,
    error,
    selectedServices,
    setSelectedServices,
    addSelectedService,
    removeSelectedService,
    selectedCriteria,
    setSelectedCriteria: handleSetSelectedCriteria,
    selectedRates,
    setSelectedRate: handleSetSelectedRate,
    getTotalEstimatedTime,
    getTotalEstimatedPrice,
  };

  return <ServicesContext.Provider value={value}>{children}</ServicesContext.Provider>;
};
