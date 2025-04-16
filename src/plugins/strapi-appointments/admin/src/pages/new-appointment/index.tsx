import { Box } from '@strapi/design-system';
import { useIntl } from 'react-intl';
import { getTranslation } from '../../utils/getTranslation';
import { useState } from 'react';
import { Layouts } from '@strapi/admin/strapi-admin';
import { Step1Services } from './components/step1-services';
import { Step2DateTime } from './components/step2-date-time';
import { Step3ClientInfo } from './components/step3-client-info';
import { Stepper, Step } from './components/stepper';
import { AppointmentData } from './types';
import { DesignSystemProvider } from '@strapi/design-system';
import { useTheme } from 'styled-components';

const steps: Step[] = [
  { id: 1, title: 'Services' },
  { id: 2, title: 'Date, Time & Staff' },
  { id: 3, title: 'Client Information' },
];

const NewAppointmentPage = () => {
  const theme = useTheme();
  const { formatMessage } = useIntl();
  const [activeStep, setActiveStep] = useState(1);
  const [appointmentData, setAppointmentData] = useState<AppointmentData>({
    staff: null,
    date: null,
    time: null,
    services: [],
    client: null,
    notes: '',
  });

  const handleDataUpdate = (data: Partial<AppointmentData>) => {
    setAppointmentData((prev) => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    setActiveStep((prev) => Math.min(prev + 1, steps.length));
  };

  const handleBack = () => {
    setActiveStep((prev) => Math.max(prev - 1, 1));
  };

  const renderStep = () => {
    switch (activeStep) {
      case 1:
        return (
          <Step1Services
            data={appointmentData}
            onUpdate={handleDataUpdate}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <Step2DateTime
            data={appointmentData}
            onUpdate={handleDataUpdate}
            onBack={handleBack}
            onNext={handleNext}
          />
        );
      case 3:
        return (
          <Step3ClientInfo
            data={appointmentData}
            onUpdate={handleDataUpdate}
            onBack={handleBack}
          />
        );
      default:
        return null;
    }
  };

  return (
    <DesignSystemProvider theme={theme}>
      <Layouts.Header
        title={formatMessage({ id: getTranslation('new-appointment.title'), defaultMessage: 'New Appointment' })}
        subtitle={formatMessage({
          id: getTranslation('new-appointment.subtitle'),
          defaultMessage: 'Create a new appointment by following the steps below'
        })}
        as="h2"
      />
      <Layouts.Content>
        <Box padding={4} background="neutral100" shadow="filterShadow" hasRadius>
          <Stepper steps={steps} currentStep={activeStep} />
          
          <Box padding={4} background="neutral0" hasRadius>
            {renderStep()}
          </Box>
        </Box>
      </Layouts.Content>
    </DesignSystemProvider>
  );
};

export { NewAppointmentPage };
