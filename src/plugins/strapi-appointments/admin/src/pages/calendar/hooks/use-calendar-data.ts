import { useState, useEffect } from 'react';
import { query } from '../../../utils/strapi';
import { StaffMember, CalendarEvent } from '../types';

type CalendarData = {
  staffMembers: StaffMember[];
  events: CalendarEvent[];
  isLoading: boolean;
  error: Error | null;
};

export const useCalendarData = (): CalendarData => {
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const staffData = await query('/staff-with-appointments');
        setStaffMembers(staffData.staff || []);
        setEvents(staffData.appointments || []);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch data'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    staffMembers,
    events,
    isLoading,
    error,
  };
};
