export interface StaffMember {
  id: string;
  name: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  staffId?: string;
  extendedProps?: {
    client?: {
      id: string | number;
      name: string;
      phone?: string;
      email?: string | null;
    } | null;
    service?: {
      id: string | number;
      name: string;
      price?: number;
      timeEstimation?: number;
    } | null;
    notes?: string | null;
    [key: string]: any;
  };
}

export interface CalendarProps {
  selectedStaff: string;
  onStaffChange: (staffId: string) => void;
  events: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
  onEventDrop?: (event: CalendarEvent) => void;
  onEventResize?: (event: CalendarEvent) => void;
}
