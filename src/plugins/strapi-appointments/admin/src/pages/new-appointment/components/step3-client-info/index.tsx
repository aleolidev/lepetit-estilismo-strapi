import { Box, Typography, Button, Flex } from '@strapi/design-system';
import { StepProps } from '../../types';
import { ClientInfoProvider, useClientInfoContext } from './contexts/client-info-context';
import { ClientSelector } from './components/client-selector';
import { NotesInput } from './components/notes-input';
import { AppointmentSummary } from './components/appointment-summary';

interface Step3ClientInfoProps extends StepProps {
  onBack: () => void;
}

// Main content component that uses the context
const Step3ClientInfoContent = ({ onBack }: Pick<Step3ClientInfoProps, 'onBack'>) => {
  const { selectedClient, isStepComplete, onSubmitAppointment } = useClientInfoContext();

  return (
    <Box>
      {/* Client Information Section */}
      <ClientSelector />

      {/* Additional Notes Section */}
      <NotesInput />

      {/* Appointment Summary Section */}
      <AppointmentSummary />

      {/* Button Section */}
      <Box display="flex" justifyContent="space-between">
        <Button variant="tertiary" onClick={onBack} size="L">
          Back
        </Button>
        <Button variant="success" onClick={onSubmitAppointment} disabled={!isStepComplete} size="L">
          Book Appointment
        </Button>
      </Box>
    </Box>
  );
};

// Wrapper component that provides the context
const Step3ClientInfo = ({ data, onUpdate, onBack }: Step3ClientInfoProps) => {
  return (
    <ClientInfoProvider data={data} onUpdate={onUpdate}>
      <Step3ClientInfoContent onBack={onBack} />
    </ClientInfoProvider>
  );
};

export { Step3ClientInfo };
