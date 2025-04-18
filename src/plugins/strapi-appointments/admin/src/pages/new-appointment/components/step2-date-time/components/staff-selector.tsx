import { Box, SingleSelect, SingleSelectOption } from '@strapi/design-system';
import { useIntl } from 'react-intl';
import { getTranslation } from '../../../../../utils/getTranslation';
import { StaffMember } from '../../../types';

interface StaffSelectorProps {
  staffMembers: StaffMember[];
  selectedStaff: string;
  onStaffChange: (staffId: string) => void;
}

export const StaffSelector = ({
  staffMembers,
  selectedStaff,
  onStaffChange,
}: StaffSelectorProps) => {
  const { formatMessage } = useIntl();

  return (
    <Box paddingBottom={4}>
      <SingleSelect
        label={formatMessage({
          id: getTranslation('select.staff'),
          defaultMessage: 'Select Staff',
        })}
        value={selectedStaff}
        onChange={(value: string) => onStaffChange(value)}
        placeholder="Select staff member"
      >
        {staffMembers.map((staff) => (
          <SingleSelectOption key={staff.id} value={staff.id}>
            {staff.name}
          </SingleSelectOption>
        ))}
      </SingleSelect>
    </Box>
  );
};
