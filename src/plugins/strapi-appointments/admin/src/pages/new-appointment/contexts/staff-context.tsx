import { createContext, ReactNode, useContext, useState } from 'react';
import { StaffMember } from '../types';
import { useStaffAppointments } from '../hooks/use-staff-appointments';

export interface Appointment {
  id: string;
  title: string;
  start: Date;
  end: Date;
  staffId: string;
  extendedProps: {
    service?: {
      id: string | number;
      documentId: string;
      name: string;
      price: number;
      timeEstimation: number;
    } | null;
    client?: {
      id: string | number;
      documentId: string;
      name: string;
      phone: string;
    } | null;
    notes?: string | null;
    [key: string]: any;
  };
}

// Define the context state type
type StaffContextState = {
  staffMembers: StaffMember[];
  appointments: Appointment[];
  isLoading: boolean;
  error: Error | null;
};

// Create the context with default values
const StaffContext = createContext<StaffContextState>({
  staffMembers: [],
  appointments: [],
  isLoading: false,
  error: null,
});

// Custom hook to use the staff context
export const useStaffContext = () => useContext(StaffContext);

// Props for the staff provider
type StaffProviderProps = {
  children: ReactNode;
};

// Staff provider component
export const StaffProvider = ({ children }: StaffProviderProps) => {
  // Use the existing hook to fetch staff and appointments
  const { staffMembers, appointments, isLoading, error } = useStaffAppointments();

  // Context value
  const value = {
    staffMembers,
    appointments,
    isLoading,
    error,
  };

  return <StaffContext.Provider value={value}>{children}</StaffContext.Provider>;
};
