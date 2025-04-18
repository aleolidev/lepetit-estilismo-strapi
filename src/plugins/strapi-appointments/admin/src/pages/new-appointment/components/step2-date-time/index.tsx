import { Box, Typography, Button, Flex, EmptyStateLayout } from '@strapi/design-system';
import { Information } from '@strapi/icons';
import { StepProps } from '../../types';
import { useIntl } from 'react-intl';
import { getTranslation } from '../../../../utils/getTranslation';
import {
  AppointmentTimeProvider,
  useAppointmentTimeContext,
} from './contexts/appointment-time-context';
import { StaffSelector } from './components/staff-selector';
import { CalendarGrid } from './components/calendar-grid';
import { renderEventContent } from './components/event-content';

interface Step2DateTimeProps extends StepProps {
  onBack: () => void;
  onNext: () => void;
}

// Main content component that uses the context
const Step2DateTimeContent = ({
  onBack,
  onNext,
}: Pick<Step2DateTimeProps, 'onBack' | 'onNext'>) => {
  const { formatMessage } = useIntl();
  const {
    staffMembers,
    selectedStaff,
    handleStaffChange,
    newAppointmentEvent,
    handleDateClick,
    handleEventDrop,
    isAppointmentScheduled,
    filteredEvents,
  } = useAppointmentTimeContext();

  if (staffMembers.length === 0) {
    return (
      <Box padding={4} background="neutral0" hasRadius>
        <EmptyStateLayout
          icon={<Information />}
          content="No staff members found. Please add staff members first."
        />
      </Box>
    );
  }

  return (
    <>
      <StaffSelector
        staffMembers={staffMembers}
        selectedStaff={selectedStaff}
        onStaffChange={handleStaffChange}
      />

      {selectedStaff && (
        <CalendarGrid
          events={filteredEvents}
          onDateClick={handleDateClick}
          onEventDrop={handleEventDrop}
          renderEventContent={renderEventContent}
        />
      )}

      <Box paddingTop={4}>
        <Flex display="flex" justifyContent="end" gap={2}>
          <Button variant="tertiary" onClick={onBack} size="L">
            Back
          </Button>
          <Button onClick={onNext} disabled={!isAppointmentScheduled} size="L">
            Next
          </Button>
        </Flex>
      </Box>
    </>
  );
};

// Wrapper component that provides the context
const Step2DateTime = ({ data, onUpdate, onBack, onNext }: Step2DateTimeProps) => {
  return (
    <AppointmentTimeProvider data={data} onUpdate={onUpdate}>
      <Step2DateTimeContent onBack={onBack} onNext={onNext} />
    </AppointmentTimeProvider>
  );
};

export { Step2DateTime };
