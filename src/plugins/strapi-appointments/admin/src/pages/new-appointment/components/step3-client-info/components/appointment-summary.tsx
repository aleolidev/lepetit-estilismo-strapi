import React from 'react';
import { Box, Typography, Flex, Grid } from '@strapi/design-system';
import { format } from 'date-fns';
import { useClientInfoContext } from '../contexts/client-info-context';
import { Calendar, Clock, Scissors, User } from '@strapi/icons';

export const AppointmentSummary = () => {
  const { appointmentData } = useClientInfoContext();

  // <Grid.Root gap={4}>
  //       <Grid.Item s={12} m={6} col={3}>
  //         <Flex gap={2} alignItems="center">
  //           <PriceTag fill="neutral400" />
  //           <Typography variant="delta" textColor="neutral700">
  //             {formattedTotalCost}
  //           </Typography>
  //           <Typography variant="pi" textColor="neutral300">
  //             Precio estimado
  //           </Typography>
  //         </Flex>
  //       </Grid.Item>
  //       <Grid.Item s={12} m={6} col={4}>
  //         <Flex gap={2} alignItems="center">
  //           <Clock fill="neutral400" />
  //           <Typography variant="delta" textColor="neutral700">
  //             {selectedRate.timeEstimation} min
  //           </Typography>
  //           <Typography variant="pi" textColor="neutral300">
  //             Tiempo estimado
  //           </Typography>
  //         </Flex>
  //       </Grid.Item>
  //       <Grid.Item s={12} m={6} col={4}>
  //         <Flex gap={2} alignItems="center">
  //           <ClockCounterClockwise fill="neutral400" />
  //           <Typography variant="delta" textColor="neutral700">
  //             {formattedHourlyRate}
  //           </Typography>
  //           <Typography variant="pi" textColor="neutral300">
  //             Precio por hora
  //           </Typography>
  //         </Flex>
  //       </Grid.Item>
  //     </Grid.Root>

  return (
    <Box paddingBottom={6}>
      <Typography variant="delta" as="h2">
        Appointment Summary
      </Typography>
      <Box marginTop={6}>
        <Grid.Root gap={4}>
          <Grid.Item s={12} m={6} col={3}>
            <Flex gap={2} alignItems="center">
              <User fill="neutral400" />
              <Typography variant="delta" textColor="neutral700">
                {appointmentData.staff?.name || 'Not selected'}
              </Typography>
              <Typography variant="pi" textColor="neutral300">
                Staff
              </Typography>
            </Flex>
          </Grid.Item>
          <Grid.Item s={12} m={6} col={3}>
            <Flex gap={2} alignItems="center">
              <Calendar fill="neutral400" />
              <Typography variant="delta" textColor="neutral700">
                {appointmentData.date
                  ? appointmentData.date.toLocaleDateString('es-ES', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                    })
                  : 'Not selected'}
              </Typography>
              <Typography variant="pi" textColor="neutral300">
                Fecha
              </Typography>
            </Flex>
          </Grid.Item>
          <Grid.Item s={12} m={6} col={3}>
            <Flex gap={2} alignItems="center">
              <Clock fill="neutral400" />
              <Typography variant="delta" textColor="neutral700">
                {appointmentData.date ? format(appointmentData.date, 'HH:mm') : 'Not selected'}
              </Typography>
              <Typography variant="pi" textColor="neutral300">
                Hora
              </Typography>
            </Flex>
          </Grid.Item>
          <Grid.Item s={12} m={12} col={12}>
            <Flex gap={2} alignItems="center">
              <Scissors fill="neutral400" />
              <Flex direction="column" gap={2}>
                {appointmentData.services.length === 0 ? (
                  <Typography variant="pi" textColor="neutral600">
                    No services selected
                  </Typography>
                ) : (
                  appointmentData.services.map((service) => (
                    <>
                      <Box key={service.id}>
                        <Typography variant="delta" textColor="neutral700">
                          {service.name}
                        </Typography>
                      </Box>
                      <Box key={service.id}>
                        <Typography variant="delta" textColor="neutral700">
                          {service.name}
                        </Typography>
                      </Box>
                      <Box key={service.id}>
                        <Typography variant="delta" textColor="neutral700">
                          {service.name}
                        </Typography>
                      </Box>
                    </>
                  ))
                )}
              </Flex>
              <Typography variant="pi" textColor="neutral300">
                Servicios
              </Typography>
            </Flex>
          </Grid.Item>
        </Grid.Root>
      </Box>
    </Box>
  );
};
