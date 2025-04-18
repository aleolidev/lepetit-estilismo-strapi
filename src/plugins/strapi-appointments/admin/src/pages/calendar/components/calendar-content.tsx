import { Box } from '@strapi/design-system';
import { useIntl } from 'react-intl';
import { getTranslation } from '../../../utils/getTranslation';
import { Layouts } from '@strapi/admin/strapi-admin';
import { Page } from '@strapi/strapi/admin';
import { useCalendarContext } from '../contexts/calendar-context';
import { CalendarHeader } from './calendar-header';
import { CalendarGrid } from './calendar-grid';
import { useCalendarEvents } from '../hooks/use-calendar-events';
import { useMemo } from 'react';

export const CalendarContent = () => {
  const { formatMessage } = useIntl();
  const { staffMembers, events, selectedStaff, setSelectedStaff, isLoading } = useCalendarContext();

  const { handleEventClick, handleEventDrop, handleEventResize } = useCalendarEvents();

  // Filter events by selected staff
  const filteredEvents = useMemo(() => {
    if (!selectedStaff) {
      return events; // Show all events if no staff is selected
    }
    return events.filter((event) => event.staffId === selectedStaff);
  }, [events, selectedStaff]);

  if (isLoading) return <Page.Loading />;

  return (
    <>
      <Layouts.Header
        title={formatMessage({ id: getTranslation('plugin.name'), defaultMessage: 'Calendar' })}
        subtitle={formatMessage({
          id: getTranslation('plugin.tagline'),
          defaultMessage: 'Visualize your appointments',
        })}
        as="h2"
      />
      <Layouts.Content>
        <Box padding={4}>
          <CalendarHeader
            selectedStaff={selectedStaff}
            onStaffChange={setSelectedStaff}
            staffMembers={staffMembers}
          />
          <CalendarGrid
            events={filteredEvents}
            onEventClick={handleEventClick}
            onEventDrop={handleEventDrop}
            onEventResize={handleEventResize}
          />
        </Box>
      </Layouts.Content>
    </>
  );
};
