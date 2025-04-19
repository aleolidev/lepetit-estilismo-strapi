import { Flex, Typography, Grid, Box, Divider } from '@strapi/design-system';
import { PriceTag, Clock } from '@strapi/icons';
import { useMemo } from 'react';

interface TotalRatesDisplayProps {
  totalTime: number;
  totalPrice: number;
  selectedRatesCount: number;
}

export const TotalRatesDisplay = ({
  totalTime,
  totalPrice,
  selectedRatesCount,
}: TotalRatesDisplayProps) => {
  if (selectedRatesCount <= 1) return null;

  // Use useMemo to prevent recalculation on every render
  const { formattedTotalCost } = useMemo(() => {
    // Helper function to format price
    const formatPrice = (price: number) => {
      return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR',
      }).format(price);
    };

    return {
      formattedTotalCost: formatPrice(totalPrice),
    };
  }, [totalPrice]);

  return (
    <Box marginTop={6} marginBottom={4}>
      <Divider />
      <Box marginTop={4}>
        <Typography variant="beta">Total Estimation</Typography>
        <Grid.Root gap={4} marginTop={4}>
          <Grid.Item s={12} m={6} col={6}>
            <Flex gap={2} alignItems="center">
              <PriceTag fill="neutral800" />
              <Typography variant="delta" textColor="neutral800">
                {formattedTotalCost}
              </Typography>
              <Typography variant="pi" textColor="neutral500">
                Precio total estimado
              </Typography>
            </Flex>
          </Grid.Item>
          <Grid.Item s={12} m={6} col={6}>
            <Flex gap={2} alignItems="center">
              <Clock fill="neutral800" />
              <Typography variant="delta" textColor="neutral800">
                {totalTime} min
              </Typography>
              <Typography variant="pi" textColor="neutral500">
                Tiempo total estimado
              </Typography>
            </Flex>
          </Grid.Item>
        </Grid.Root>
      </Box>
    </Box>
  );
};
