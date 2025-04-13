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
  // Add more event properties as needed
}

export interface CalendarProps {
  selectedStaff: string;
  onStaffChange: (staffId: string) => void;
  events: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
  onEventDrop?: (event: CalendarEvent) => void;
  onEventResize?: (event: CalendarEvent) => void;
}
