import { Box } from '@strapi/design-system';
import { useIntl } from 'react-intl';
import { getTranslation } from '../../utils/getTranslation';
import { useState } from 'react';
import { Layouts } from '@strapi/admin/strapi-admin';
import { CalendarHeader } from './components/calendar-header';
import { CalendarGrid } from './components/calendar-grid';
import { StaffMember, CalendarEvent } from './types';

const CalendarPage = () => {
  const { formatMessage } = useIntl();
  const [selectedStaff, setSelectedStaff] = useState('');

  // Mock staff data - replace with actual data from your API
  const staffMembers: StaffMember[] = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' },
    { id: '3', name: 'Mike Johnson' },
  ];

  const handleEventClick = (event: CalendarEvent) => {
    console.log('Event clicked:', event);
  };

  const handleEventDrop = (event: CalendarEvent) => {
    console.log('Event dropped:', event);
  };

  const handleEventResize = (event: CalendarEvent) => {
    console.log('Event resized:', event);
  };

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
            events={[]} // Add your events here
            onEventClick={handleEventClick}
            onEventDrop={handleEventDrop}
            onEventResize={handleEventResize}
          />
        </Box>
      </Layouts.Content>
    </>
  );
};

export { CalendarPage };
