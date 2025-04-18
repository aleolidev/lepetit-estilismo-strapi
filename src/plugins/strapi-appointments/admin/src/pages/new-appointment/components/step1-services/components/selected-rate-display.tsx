import { Flex, Typography, Tooltip } from '@strapi/design-system';
import { PriceTag, Clock } from '@strapi/icons';
import { Rate } from '../../../contexts/services-context';
import { useMemo } from 'react';
import { Box } from '@strapi/design-system';

interface SelectedRateDisplayProps {
  selectedRate: Rate | null;
}

export const SelectedRateDisplay = ({ selectedRate }: SelectedRateDisplayProps) => {
  if (!selectedRate) return null;

  // Use useMemo to prevent recalculation on every render
  const { totalCost, formattedTotalCost, formattedHourlyRate } = useMemo(() => {
    // Helper function to format price
    const formatPrice = (price: number) => {
      return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR',
      }).format(price);
    };

    // Calculate the total estimated cost based on hourly rate and time estimation
    const hourlyRate = selectedRate.price;
    const timeEstimation = selectedRate.timeEstimation;
    const hours = timeEstimation / 60;
    const totalCost = hourlyRate * hours;

    return {
      totalCost,
      formattedTotalCost: formatPrice(totalCost),
      formattedHourlyRate: formatPrice(hourlyRate),
    };
  }, [selectedRate.price, selectedRate.timeEstimation]);

  return (
    <>
      <Flex gap={6} marginTop={4} alignItems="center" justifyContent="center">
        <Flex gap={2} alignItems="center">
          <PriceTag fill="neutral400" />
          <Typography variant="delta" textColor="neutral700">
            {formattedTotalCost}
          </Typography>
        </Flex>

        <Flex gap={2} alignItems="center">
          <Clock fill="neutral400" />
          <Typography variant="delta" textColor="neutral700">
            {selectedRate.timeEstimation} min
          </Typography>
        </Flex>
      </Flex>
      <Box marginTop={1}>
        <Flex justifyContent="center">
          <Typography variant="pi" textColor="neutral300">
            {formattedHourlyRate} per hour
          </Typography>
        </Flex>
      </Box>
    </>
  );
};
