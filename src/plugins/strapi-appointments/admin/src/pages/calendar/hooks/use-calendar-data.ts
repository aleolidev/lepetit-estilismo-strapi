import { useState, useEffect } from 'react';
import { query } from '../../../utils/strapi';
import { StaffMember, CalendarEvent } from '../types';

type CalendarData = {
  staffMembers: StaffMember[];
  events: CalendarEvent[];
  isLoading: boolean;
  error: Error | null;
};

interface AppointmentResponse {
  id: number | string;
  documentId: string;
  date: string;
  notes: string | null;
  client: {
    id: number | string;
    documentId: string;
    name: string;
    phone: string;
  } | null;
  service: {
    id: number | string;
    documentId: string;
    name: string;
    price: number;
    timeEstimation: number;
  } | null;
}

interface StaffResponse {
  id: number | string;
  documentId: string;
  name: string;
  email: string;
  user: {
    id: number | string;
    documentId: string;
    firstname: string;
    lastname: string;
    username: string | null;
    email: string;
  };
  appointments: AppointmentResponse[];
}

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
        if (response && Array.isArray(response)) {
          // Extract staff members
          const staff = response.map((staffData: StaffResponse) => ({
            id: staffData.id?.toString() || staffData.documentId,
            name:
              staffData.name ||
              `${staffData.user?.firstname || ''} ${staffData.user?.lastname || ''}`.trim(),
          }));

          setStaffMembers(staff);

          // Extract appointments/events
          const appointmentData = response.flatMap((staffData: StaffResponse) => {
            const staffId = staffData.id?.toString() || staffData.documentId;

            return (staffData.appointments || []).map((appointment: AppointmentResponse) => {
              // Calculate end time based on service duration
              const startTime = new Date(appointment.date);
              const endTime = new Date(startTime);

              // Use service timeEstimation if available, default to 30 minutes
              const durationMinutes = appointment.service?.timeEstimation || 30;
              endTime.setMinutes(endTime.getMinutes() + durationMinutes);

              const serviceName = appointment.service?.name || 'Service';
              const clientName = appointment.client?.name || 'Client';

              // Service name is now the primary element in the title
              return {
                id: appointment.id?.toString() || appointment.documentId,
                title: `${serviceName} - ${clientName}`,
                start: startTime,
                end: endTime,
                staffId,
                extendedProps: {
                  client: appointment.client,
                  service: appointment.service,
                  notes: appointment.notes,
                },
              };
            });
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
