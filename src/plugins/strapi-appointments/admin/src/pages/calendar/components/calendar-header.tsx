import { Box } from '@strapi/design-system';
import { SingleSelect, SingleSelectOption } from '@strapi/design-system';
import { useIntl } from 'react-intl';
import { getTranslation } from '../../../utils/getTranslation';
import { StaffMember } from '../types';

interface CalendarHeaderProps {
  selectedStaff: string;
  onStaffChange: (staffId: string) => void;
  staffMembers: StaffMember[];
}

export const CalendarHeader = ({ selectedStaff, onStaffChange, staffMembers }: CalendarHeaderProps) => {
  const { formatMessage } = useIntl();

  return (
    <Box paddingBottom={4}>
      <SingleSelect
        label={formatMessage({ id: getTranslation('select.staff') })}
        value={selectedStaff}
        onChange={onStaffChange}
        placeholder={formatMessage({ id: getTranslation('select.staff') })}
      >
        <SingleSelectOption value="">{formatMessage({ id: getTranslation('select.all') })}</SingleSelectOption>
        {staffMembers.map((staff) => (
          <SingleSelectOption key={staff.id} value={staff.id}>
            {staff.name}
          </SingleSelectOption>
        ))}
      </SingleSelect>
    </Box>
  );
}; 