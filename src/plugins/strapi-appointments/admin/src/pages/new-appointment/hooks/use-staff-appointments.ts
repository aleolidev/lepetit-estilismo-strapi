import { useState, useEffect } from 'react';
import { StaffMember } from '../types';
import { query } from '../../../utils/strapi';

interface Appointment {
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

export const useStaffAppointments = () => {
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Fetch staff with appointments from the API
        const response = await query('/staff-with-appointments');

        if (response && Array.isArray(response)) {
          // Extract staff members
          const staff = response.map((staffData: StaffResponse) => ({
            id: staffData.id?.toString() || staffData.documentId,
            name:
              staffData.name ||
              `${staffData.user?.firstname || ''} ${staffData.user?.lastname || ''}`.trim(),
          }));

          setStaffMembers(staff);

          // Extract appointments
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

          setAppointments(appointmentData);
        } else {
          console.warn('Invalid response format from staff-with-appointments API');
          setStaffMembers([]);
          setAppointments([]);
        }
      } catch (err) {
        console.error('Error fetching staff and appointments:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch data'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    staffMembers,
    appointments,
    isLoading,
    error,
  };
};
