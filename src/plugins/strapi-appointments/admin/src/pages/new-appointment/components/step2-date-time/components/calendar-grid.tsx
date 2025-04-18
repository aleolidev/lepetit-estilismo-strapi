import { Box } from '@strapi/design-system';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useRef } from 'react';
import { useTheme } from 'styled-components';
import { getCalendarStyles } from '../../../../../styles/calendar';
import { Appointment } from '../../../contexts/staff-context';
import { EventImpl } from '@fullcalendar/core/internal';

interface CalendarGridProps {
  events: Appointment[];
  onDateClick: (info: any) => void;
  onEventDrop: (info: any) => void;
  renderEventContent: (eventInfo: any) => JSX.Element;
}

export const CalendarGrid = ({
  events,
  onDateClick,
  onEventDrop,
  renderEventContent,
}: CalendarGridProps) => {
  const calendarRef = useRef(null);
  const theme = useTheme();

  return (
    <Box
      background="neutral0"
      shadow="filterShadow"
      padding={[4]}
      hasRadius
      style={{
        zIndex: 0,
        position: 'relative',
      }}
    >
      <style>{getCalendarStyles(theme)}</style>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridDay"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'timeGridWeek,timeGridDay',
        }}
        height="auto"
        contentHeight="auto"
        aspectRatio={1.8}
        allDaySlot={false}
        slotMinTime="08:00:00"
        slotMaxTime="20:00:00"
        slotDuration="00:30:00"
        slotLabelInterval="01:00"
        slotLabelFormat={{
          hour: 'numeric',
          minute: '2-digit',
          omitZeroMinute: false,
          meridiem: 'short',
        }}
        weekends={true}
        validRange={{
          start: new Date(),
        }}
        selectConstraint={{
          start: new Date(),
        }}
        events={events.map((event) => ({
          ...event,
          // Only make the new appointment draggable
          startEditable: event.id === 'new-appointment',
          durationEditable: false,
        }))}
        eventContent={renderEventContent}
        eventDrop={onEventDrop}
        dateClick={onDateClick}
        selectable={true}
        nowIndicator={true}
        dayMaxEvents={true}
        eventTimeFormat={{
          hour: 'numeric',
          minute: '2-digit',
          meridiem: 'short',
        }}
        eventDidMount={(info) => {
          if (info.event.id === 'new-appointment') {
            const el = info.el as HTMLElement;
            el.setAttribute('data-event-id', 'new-appointment');
            el.style.cursor = 'move';
          } else {
            // Make existing appointments not draggable visually
            const el = info.el as HTMLElement;
            el.style.cursor = 'default';
          }
        }}
        eventOverlap={false}
        eventAllow={(dropInfo, draggedEvent) => {
          // Don't allow drops on past dates
          const now = new Date();
          if (dropInfo.start < now) {
            return false;
          }

          // Check for collisions with existing appointments
          if (!draggedEvent) return false;
          if (!draggedEvent.start || !draggedEvent.end) return false;

          // Calculate end time based on event start and end times
          const eventStart = dropInfo.start;
          const eventEnd = new Date(
            eventStart.getTime() + (draggedEvent.end.getTime() - draggedEvent.start.getTime())
          );

          const collidingEvents = events.filter(
            (event) =>
              event.id !== draggedEvent.id &&
              event.id !== 'new-appointment' &&
              eventStart < new Date(event.end) &&
              eventEnd > new Date(event.start)
          );

          return collidingEvents.length === 0;
        }}
      />
    </Box>
  );
};
