import { Box } from '@strapi/design-system';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useRef } from 'react';
import { useTheme } from 'styled-components';
import { getCalendarStyles } from '../styles/calendar';
import { CalendarEvent } from '../types';

interface CalendarGridProps {
  events: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
  onEventDrop?: (event: CalendarEvent) => void;
  onEventResize?: (event: CalendarEvent) => void;
}

export const CalendarGrid = ({
  events,
  onEventClick,
  onEventDrop,
  onEventResize,
}: CalendarGridProps) => {
  const calendarRef = useRef(null);
  const theme = useTheme();

  const handleEventClick = (info: any) => {
    if (onEventClick && info.event) {
      const event: CalendarEvent = {
        id: info.event.id,
        title: info.event.title,
        start: info.event.start,
        end: info.event.end,
        staffId: info.event.extendedProps.staffId,
        extendedProps: info.event.extendedProps,
      };
      onEventClick(event);
    }
  };

  const handleEventDrop = (info: any) => {
    if (onEventDrop && info.event) {
      const event: CalendarEvent = {
        id: info.event.id,
        title: info.event.title,
        start: info.event.start,
        end: info.event.end,
        staffId: info.event.extendedProps.staffId,
        extendedProps: info.event.extendedProps,
      };
      onEventDrop(event);
    }
  };

  const handleEventResize = (info: any) => {
    if (onEventResize && info.event) {
      const event: CalendarEvent = {
        id: info.event.id,
        title: info.event.title,
        start: info.event.start,
        end: info.event.end,
        staffId: info.event.extendedProps.staffId,
        extendedProps: info.event.extendedProps,
      };
      onEventResize(event);
    }
  };

  // Event render function to customize event display
  const renderEventContent = (eventInfo: any) => {
    const serviceName = eventInfo.event.extendedProps?.service?.name;
    const clientName = eventInfo.event.extendedProps?.client?.name;

    return (
      <>
        <div className="fc-event-time-row">
          <span className="fc-event-time">{eventInfo.timeText}</span>
          {clientName && <span className="fc-event-client-name">{clientName}</span>}
        </div>
        <div className="fc-event-title-container">
          <div className="fc-event-title">
            <strong>{serviceName || 'Service'}</strong>
          </div>
        </div>
      </>
    );
  };

  return (
    <Box
      background="neutral0"
      shadow="filterShadow"
      padding={[5, 8]}
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
        initialView="timeGridWeek"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        height="auto"
        contentHeight="auto"
        aspectRatio={1.65}
        allDaySlot={false}
        slotMinTime="08:00:00"
        slotMaxTime="20:00:00"
        slotDuration="00:30:00"
        slotLabelInterval="01:00"
        weekends={true}
        events={events}
        eventContent={renderEventContent}
        eventClick={handleEventClick}
        eventDrop={handleEventDrop}
        eventResize={handleEventResize}
        editable={true}
        selectable={true}
        nowIndicator={true}
        dayMaxEvents={true}
      />
    </Box>
  );
};
