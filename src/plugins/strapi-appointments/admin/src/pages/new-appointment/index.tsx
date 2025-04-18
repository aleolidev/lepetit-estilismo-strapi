import { Box } from '@strapi/design-system';
import { useIntl } from 'react-intl';
import { getTranslation } from '../../utils/getTranslation';
import { useCallback, useState } from 'react';
import { Layouts } from '@strapi/admin/strapi-admin';
import { Page } from '@strapi/strapi/admin';
import { Stepper, Step } from './components/stepper';
import { AppointmentData } from './types';
import { DesignSystemProvider } from '@strapi/design-system';
import { useTheme } from 'styled-components';
import { ServicesProvider, useServicesContext } from './contexts/services-context';
import { StaffProvider, useStaffContext } from './contexts/staff-context';
import { RenderStep } from './components/render-step';
import { Typography } from '@strapi/design-system';
import { Flex } from '@strapi/design-system';

export enum Steps {
  Services = 1,
  DateTime = 2,
  ClientInfo = 3,
}

const steps: Step[] = [
  { id: Steps.Services, title: 'Services' },
  { id: Steps.DateTime, title: 'Date, Time & Staff' },
  { id: Steps.ClientInfo, title: 'Client Information' },
];

// Content component that renders after data is loaded
const NewAppointmentContent = () => {
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

  const handleDataUpdate = useCallback((data: Partial<AppointmentData>) => {
    setAppointmentData((prev) => ({ ...prev, ...data }));
  }, []);

  const handleNext = useCallback(() => {
    setActiveStep((prev) => Math.min(prev + 1, steps.length));
  }, []);

  const handleBack = useCallback(() => {
    setActiveStep((prev) => Math.max(prev - 1, 1));
  }, []);

  return (
    <>
      <Layouts.Header
        title={formatMessage({
          id: getTranslation('new-appointment.title'),
          defaultMessage: 'New Appointment',
        })}
        subtitle={formatMessage({
          id: getTranslation('new-appointment.subtitle'),
          defaultMessage: 'Create a new appointment by following the steps below',
        })}
        as="h2"
      />
      <Layouts.Content>
        <Box padding={4} paddingTop={8} background="neutral100" shadow="filterShadow" hasRadius>
          <Stepper steps={steps} currentStep={activeStep} />

          <Box padding={4}>
            <RenderStep
              activeStep={activeStep}
              appointmentData={appointmentData}
              handleDataUpdate={handleDataUpdate}
              handleBack={handleBack}
              handleNext={handleNext}
            />
          </Box>
        </Box>
      </Layouts.Content>
    </>
  );
};

// Loading handler component
const NewAppointmentWithLoading = () => {
  const { isLoading: isServicesLoading, error: servicesError } = useServicesContext();
  const { isLoading: isStaffLoading, error: staffError } = useStaffContext();

  const isLoading = isServicesLoading || isStaffLoading;
  const error = servicesError || staffError;

  if (isLoading) {
    return <Page.Loading />;
  }

  if (error) {
    console.error('Error loading data:', error);
    return (
      <Layouts.Content>
        <Box padding={8} background="neutral100">
          <h2>Error loading data</h2>
          <p>{error.message}</p>
        </Box>
      </Layouts.Content>
    );
  }

  return <NewAppointmentContent />;
};

// Main component with providers
const NewAppointmentPage = () => {
  const theme = useTheme();

  return (
    <DesignSystemProvider theme={theme}>
      <ServicesProvider>
        <StaffProvider>
          <NewAppointmentWithLoading />
        </StaffProvider>
      </ServicesProvider>
    </DesignSystemProvider>
  );
};

export { NewAppointmentPage };
