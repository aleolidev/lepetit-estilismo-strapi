import { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import { StaffMember, CalendarEvent } from '../types';
import { useCalendarData } from '../hooks/use-calendar-data';

// Define the context state type
type CalendarContextState = {
  staffMembers: StaffMember[];
  events: CalendarEvent[];
  selectedStaff: string;
  setSelectedStaff: (id: string) => void;
  isLoading: boolean;
  error: Error | null;
};

// Create the context with default values
const CalendarContext = createContext<CalendarContextState>({
  staffMembers: [],
  events: [],
  selectedStaff: '',
  setSelectedStaff: () => {},
  isLoading: false,
  error: null,
});

// Custom hook to use the calendar context
export const useCalendarContext = () => useContext(CalendarContext);

// Props for the calendar provider
type CalendarProviderProps = {
  children: ReactNode;
};

// Calendar provider component
export const CalendarProvider = ({ children }: CalendarProviderProps) => {
  const [selectedStaff, setSelectedStaff] = useState('');
  const { staffMembers, events, isLoading, error } = useCalendarData();

  // Select first staff member when data loads
  useEffect(() => {
    if (staffMembers.length > 0 && !selectedStaff) {
      setSelectedStaff(staffMembers[0].id);
    }
  }, [staffMembers, selectedStaff]);

  // Context value
  const value = {
    staffMembers,
    events,
    selectedStaff,
    setSelectedStaff,
    isLoading,
    error,
  };

  return <CalendarContext.Provider value={value}>{children}</CalendarContext.Provider>;
};
