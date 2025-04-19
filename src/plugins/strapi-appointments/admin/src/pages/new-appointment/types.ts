export interface StaffMember {
  id: string;
  name: string;
  avatar?: string;
}

export interface ServiceVariant {
  id: string;
  name: string;
  duration: number;
  price: number;
}

// Legacy Service interface - will be replaced by ApiService and ApiRate
export interface Service {
  id: string;
  name: string;
  category: string;
  duration: number;
  price: number;
  variant?: string;
  variants?: ServiceVariant[];
}

// New API interfaces
export interface ApiPriceCondition {
  __component: string;
  id: number;
  criterion: string;
  value: string;
}

export interface ApiRate {
  id: number;
  documentId: string;
  name: string;
  price: number;
  timeEstimation: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
  conditions: ApiPriceCondition[];
}

export interface ApiService {
  id: number;
  documentId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
  criteriaOptions: {
    [criterion: string]: Array<{ id: number; value: string }>;
  };
  rates: ApiRate[];
}

export interface Client {
  id: string;
  name: string;
  phone: string;
  email?: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface AppointmentData {
  staff: StaffMember | null;
  date: Date | null;
  time: string | null;
  services: Service[];
  selectedRate?: ApiRate;
  selectedRates?: ApiRate[];
  client: Client | null;
  notes: string;
  clientSearchQuery?: string;
  clientSearchResults?: Client[];
}

export interface StepProps {
  data: AppointmentData;
  onUpdate: (data: Partial<AppointmentData>) => void;
  onBack?: () => void;
  onNext?: () => void;
}
