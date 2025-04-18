import React from 'react';
import { Box, Typography, Flex } from '@strapi/design-system';
import { format } from 'date-fns';
import { useClientInfoContext } from '../contexts/client-info-context';

export const AppointmentSummary = () => {
  const { appointmentData } = useClientInfoContext();

  return (
    <Box paddingBottom={6}>
      <Typography variant="delta" as="h2">
        Appointment Summary
      </Typography>
      <Box>
        <Flex direction={{ xs: 'column', md: 'row' }} gap={4} paddingBottom={4}>
          <Box flex="1">
            <Box background="neutral100" hasRadius>
              <Typography variant="delta">Date & Time</Typography>
              <Typography variant="pi" textColor="neutral600">
                {appointmentData.date
                  ? format(appointmentData.date, 'MMMM d, yyyy')
                  : 'Not selected'}
              </Typography>
              <Typography variant="pi" textColor="neutral600">
                {appointmentData.time || 'Not selected'}
              </Typography>
            </Box>
          </Box>

          <Box flex="1">
            <Box background="neutral100" hasRadius>
              <Typography variant="delta">Staff</Typography>
              <Typography variant="pi" textColor="neutral600">
                {appointmentData.staff?.name || 'Not selected'}
              </Typography>
            </Box>
          </Box>
        </Flex>

        <Box>
          <Box background="neutral100" hasRadius>
            <Typography variant="delta">Services</Typography>
            {appointmentData.services.length === 0 ? (
              <Typography variant="pi" textColor="neutral600">
                No services selected
              </Typography>
            ) : (
              appointmentData.services.map((service) => (
                <Box key={service.id} paddingTop={2}>
                  <Typography variant="pi" textColor="neutral600">
                    {service.name} - ${service.price.toFixed(2)} ({service.duration} min)
                  </Typography>
                </Box>
              ))
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
