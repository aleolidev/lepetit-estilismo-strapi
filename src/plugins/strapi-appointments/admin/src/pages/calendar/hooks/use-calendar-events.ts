import { CalendarEvent } from '../types';

export const useCalendarEvents = () => {
  const handleEventClick = (event: CalendarEvent) => {
    console.log('Event clicked:', event);
  };

  const handleEventDrop = (event: CalendarEvent) => {
    console.log('Event dropped:', event);
  };

  const handleEventResize = (event: CalendarEvent) => {
    console.log('Event resized:', event);
  };

  return {
    handleEventClick,
    handleEventDrop,
    handleEventResize,
  };
};
