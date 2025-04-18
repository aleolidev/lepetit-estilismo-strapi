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
        const response = await query('/staff-with-appointments');

        // Check if we have a valid response
        if (response && response.data) {
          // Extract staff members
          const staff = response.data.map((staffData: any) => ({
            id: staffData.id || staffData.documentId,
            name:
              staffData.name || `${staffData.firstname || ''} ${staffData.lastname || ''}`.trim(),
          }));

          setStaffMembers(staff);

          // Extract appointments/events
          const appointmentData = response.data.flatMap((staffData: any) => {
            const staffId = staffData.id || staffData.documentId;

            return (staffData.appointments || []).map((appointment: any) => ({
              id: appointment.id || appointment.documentId,
              title: appointment.title || 'Appointment',
              start: new Date(appointment.startTime || appointment.start),
              end: new Date(appointment.endTime || appointment.end),
              staffId,
            }));
          });

          setEvents(appointmentData);
        } else {
          console.warn('Invalid response format from staff-with-appointments API');
          setStaffMembers([]);
          setEvents([]);
        }
      } catch (err) {
        console.error('Error fetching calendar data:', err);
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
