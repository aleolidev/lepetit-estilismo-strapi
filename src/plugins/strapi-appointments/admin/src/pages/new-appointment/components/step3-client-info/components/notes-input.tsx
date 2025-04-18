import React from 'react';
import { Box, Typography, Field, Textarea } from '@strapi/design-system';
import { useClientInfoContext } from '../contexts/client-info-context';

export const NotesInput = () => {
  const { notes, handleNotesChange } = useClientInfoContext();

  return (
    <Box paddingBottom={6}>
      <Box padding={4} background="neutral0" shadow="tableShadow" hasRadius>
        <Typography variant="delta" as="h2">
          Additional Notes
        </Typography>
        <Box paddingTop={4}>
          <Field.Root>
            <Field.Label>Notes</Field.Label>
            <Textarea
              placeholder="Add any additional notes..."
              value={notes}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                handleNotesChange(e.target.value)
              }
            />
          </Field.Root>
        </Box>
      </Box>
    </Box>
  );
};
