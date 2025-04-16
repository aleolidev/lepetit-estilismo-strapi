import { Box, Typography, Button, Flex, Combobox, ComboboxOption, Field } from '@strapi/design-system';
import { useState } from 'react';
import { AppointmentData, StepProps } from '../types';
import { DateTimePicker } from '@strapi/design-system';

interface Step2DateTimeProps extends StepProps {
  onBack: () => void;
  onNext: () => void;
}

const Step2DateTime = ({ data, onUpdate, onBack, onNext }: Step2DateTimeProps) => {
  const [selectedStaff, setSelectedStaff] = useState(data.staff);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(data.date || undefined);
  const [selectedTime, setSelectedTime] = useState(data.time);

  const handleStaffSelect = (staff: typeof selectedStaff) => {
    setSelectedStaff(staff);
    onUpdate({ staff });
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    onUpdate({ date });
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    onUpdate({ time });
  };

  const isStepComplete = selectedStaff && selectedDate && selectedTime;

  return (
      <Box padding={4} background="neutral0" hasRadius>
        <Flex direction="column" gap={4}>
          <Typography variant="delta">Select Staff and Time</Typography>
          
          <Combobox
            value={selectedStaff}
            onChange={handleStaffSelect}
            placeholder="Select staff member"
            required
          >
            <ComboboxOption value="staff1">Staff Member 1</ComboboxOption>
            <ComboboxOption value="staff2">Staff Member 2</ComboboxOption>
            <ComboboxOption value="staff3">Staff Member 3</ComboboxOption>
          </Combobox>

          <DateTimePicker
            value={selectedDate}
            onChange={handleDateSelect}
            onClear={() => handleDateSelect(undefined)}
            dateLabel="Choose appointment date"
            timeLabel="Choose appointment time"
            required
          />

          <Box display="flex" justifyContent="space-between">
            <Button variant="tertiary" onClick={onBack} size="L">
              Back
            </Button>
            <Button 
              onClick={onNext} 
              disabled={!isStepComplete}
              size="L"
            >
              Next
            </Button>
          </Box>
        </Flex>
      </Box>
  );
};

export { Step2DateTime }; 