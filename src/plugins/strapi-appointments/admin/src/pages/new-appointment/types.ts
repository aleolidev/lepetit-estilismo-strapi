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

export interface Service {
  id: string;
  name: string;
  category: string;
  duration: number;
  price: number;
  variant?: string;
  variants?: ServiceVariant[];
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
  client: Client | null;
  notes: string;
}

export interface StepProps {
  data: AppointmentData;
  onUpdate: (data: Partial<AppointmentData>) => void;
  onBack?: () => void;
  onNext?: () => void;
} 