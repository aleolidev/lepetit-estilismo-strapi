import { useState, useCallback, useEffect } from 'react';
import { StaffMember, AppointmentData } from '../../../types';
import { useStaffContext, Appointment } from '../../../contexts/staff-context';

interface UseAppointmentTimeProps {
  initialData: AppointmentData;
  onUpdate: (data: Partial<AppointmentData>) => void;
}

interface AppointmentEvent extends Appointment {
  isNew?: boolean;
  backgroundColor?: string;
  borderColor?: string;
}

export const useAppointmentTime = ({ initialData, onUpdate }: UseAppointmentTimeProps) => {
  const { staffMembers } = useStaffContext();
  const [selectedStaff, setSelectedStaff] = useState<string>(initialData.staff?.id || '');
  const [newAppointmentEvent, setNewAppointmentEvent] = useState<AppointmentEvent | null>(null);

  // Auto-select first staff member if none is selected and staff data is loaded
  useEffect(() => {
    if (!selectedStaff && staffMembers.length > 0) {
      const firstStaff = staffMembers[0];
      setSelectedStaff(firstStaff.id);
      onUpdate({ staff: firstStaff });
    }
  }, [selectedStaff, staffMembers, onUpdate]);

  // Calculate duration based on selected services
  const calculateDuration = useCallback(() => {
    if (!initialData.services || initialData.services.length === 0) return 60; // Default duration
    return initialData.services.reduce((total, service) => total + service.duration, 0);
  }, [initialData.services]);

  const appointmentDuration = calculateDuration();

  // Handle staff selection
  const handleStaffChange = useCallback(
    (staffId: string, staffMembers: StaffMember[]) => {
      setSelectedStaff(staffId);
      const selectedStaffMember = staffMembers.find((staff) => staff.id === staffId);
      onUpdate({ staff: selectedStaffMember || null });

      // Reset appointment if staff changes
      if (newAppointmentEvent) {
        setNewAppointmentEvent(null);
      }
    },
    [newAppointmentEvent, onUpdate]
  );

  // Handle date click to create appointment
  const handleDateClick = useCallback(
    (info: any) => {
      if (!selectedStaff) return;

      const clickDate = new Date(info.date);
      const now = new Date();

      // Prevent scheduling in the past
      if (clickDate < now) {
        return;
      }

      const endDate = new Date(clickDate);
      endDate.setMinutes(clickDate.getMinutes() + appointmentDuration);

      // Create the new appointment event
      const newEvent: AppointmentEvent = {
        id: 'new-appointment',
        title: 'New Appointment',
        start: clickDate,
        end: endDate,
        staffId: selectedStaff,
        extendedProps: {
          isNew: true,
          service: {
            id: 'new-service',
            documentId: 'new-service',
            name: initialData.services.map((s) => s.name).join(', '),
            price: initialData.services.reduce((total, service) => total + (service.price || 0), 0),
            timeEstimation: appointmentDuration,
          },
        },
        backgroundColor: '#4945ff',
        borderColor: '#4945ff',
        isNew: true,
      };

      setNewAppointmentEvent(newEvent);

      // Update appointment data
      onUpdate({
        date: clickDate,
        time: `${clickDate.getHours()}:${clickDate.getMinutes().toString().padStart(2, '0')}`,
      });
    },
    [selectedStaff, appointmentDuration, initialData.services, onUpdate]
  );

  // Handle event drag/drop
  const handleEventDrop = useCallback(
    (info: any) => {
      if (info.event.extendedProps.isNew) {
        const newStart = info.event.start;
        const newEnd = info.event.end;
        const now = new Date();

        // Prevent scheduling in the past
        if (newStart < now) {
          // Revert the drag operation
          info.revert();
          return;
        }

        setNewAppointmentEvent((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            start: newStart,
            end: newEnd,
          };
        });

        // Update appointment data
        onUpdate({
          date: newStart,
          time: `${newStart.getHours()}:${newStart.getMinutes().toString().padStart(2, '0')}`,
        });
      }
    },
    [onUpdate]
  );

  return {
    selectedStaff,
    newAppointmentEvent,
    handleStaffChange,
    handleDateClick,
    handleEventDrop,
    appointmentDuration,
    isAppointmentScheduled: !!newAppointmentEvent,
  };
};
