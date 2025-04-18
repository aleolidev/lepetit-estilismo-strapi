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

export const CalendarHeader = ({
  selectedStaff,
  onStaffChange,
  staffMembers,
}: CalendarHeaderProps) => {
  const { formatMessage } = useIntl();
  const hasStaff = staffMembers.length > 0;

  const noStaffMessage = formatMessage({
    id: getTranslation('select.no.staff'),
    defaultMessage: 'No staff available',
  });

  const selectStaffMessage = formatMessage({
    id: getTranslation('select.staff'),
    defaultMessage: 'Select Staff',
  });

  return (
    <Box paddingBottom={4}>
      <SingleSelect
        label={selectStaffMessage}
        value={selectedStaff}
        onChange={onStaffChange}
        disabled={!hasStaff}
        placeholder={hasStaff ? selectStaffMessage : noStaffMessage}
      >
        {hasStaff &&
          staffMembers.map((staff) => (
            <SingleSelectOption key={staff.id} value={staff.id}>
              {staff.name}
            </SingleSelectOption>
          ))}
      </SingleSelect>
    </Box>
  );
};
