import { createContext, ReactNode, useContext } from 'react';
import { AppointmentData, StaffMember } from '../../../types';
import { useStaffContext, Appointment } from '../../../contexts/staff-context';
import { useAppointmentTime } from '../hooks/use-appointment-time';

interface AppointmentEvent extends Appointment {
  isNew?: boolean;
}

interface AppointmentTimeContextState {
  staffMembers: StaffMember[];
  appointments: Appointment[];
  selectedStaff: string;
  handleStaffChange: (staffId: string) => void;
  newAppointmentEvent: AppointmentEvent | null;
  handleDateClick: (info: any) => void;
  handleEventDrop: (info: any) => void;
  isAppointmentScheduled: boolean;
  filteredEvents: Appointment[];
  isLoading: boolean;
  error: Error | null;
}

// Create the context with default values
const AppointmentTimeContext = createContext<AppointmentTimeContextState>({
  staffMembers: [],
  appointments: [],
  selectedStaff: '',
  handleStaffChange: () => {},
  newAppointmentEvent: null,
  handleDateClick: () => {},
  handleEventDrop: () => {},
  isAppointmentScheduled: false,
  filteredEvents: [],
  isLoading: false,
  error: null,
});

// Custom hook to use the appointment time context
export const useAppointmentTimeContext = () => useContext(AppointmentTimeContext);

// Props for the appointment time provider
interface AppointmentTimeProviderProps {
  children: ReactNode;
  data: AppointmentData;
  onUpdate: (data: Partial<AppointmentData>) => void;
}

// Appointment time provider component
export const AppointmentTimeProvider = ({
  children,
  data,
  onUpdate,
}: AppointmentTimeProviderProps) => {
  // Get staff and appointments data from context
  const { staffMembers, appointments, isLoading, error } = useStaffContext();

  // Handle appointment time selection
  const {
    selectedStaff,
    newAppointmentEvent,
    handleStaffChange,
    handleDateClick,
    handleEventDrop,
    isAppointmentScheduled,
  } = useAppointmentTime({
    initialData: data,
    onUpdate,
  });

  // Combine existing events with new appointment event if exists
  const filteredAppointments = appointments.filter((e) => e.staffId === selectedStaff);
  const filteredEvents = newAppointmentEvent
    ? [...filteredAppointments, newAppointmentEvent]
    : filteredAppointments;

  // Context value
  const value = {
    staffMembers,
    appointments,
    selectedStaff,
    handleStaffChange: (staffId: string) => handleStaffChange(staffId, staffMembers),
    newAppointmentEvent,
    handleDateClick,
    handleEventDrop,
    isAppointmentScheduled,
    filteredEvents,
    isLoading,
    error,
  };

  return (
    <AppointmentTimeContext.Provider value={value}>{children}</AppointmentTimeContext.Provider>
  );
};
