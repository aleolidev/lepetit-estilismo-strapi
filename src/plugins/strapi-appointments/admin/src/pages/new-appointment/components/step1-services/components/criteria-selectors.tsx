import { Box, SingleSelect, SingleSelectOption } from '@strapi/design-system';
import { Service } from '../../../contexts/services-context';

interface CriteriaSelectorsProps {
  selectedService: Service | null;
  selectedCriteria: { [criterion: string]: string };
  onCriterionChange: (criterion: string, value: string) => void;
}

export const CriteriaSelectors = ({
  selectedService,
  selectedCriteria,
  onCriterionChange,
}: CriteriaSelectorsProps) => {
  if (!selectedService) return null;

  return (
    <>
      {Object.entries(selectedService.criteriaOptions).map(([criterion, options]) => (
        <Box key={criterion} marginBottom={4}>
          <SingleSelect
            label={criterion}
            placeholder={`Select ${criterion.toLowerCase()}`}
            value={selectedCriteria[criterion] || ''}
            onChange={(value: string) => onCriterionChange(criterion, value)}
          >
            {options.map((option) => (
              <SingleSelectOption key={option.id} value={option.value}>
                {option.value}
              </SingleSelectOption>
            ))}
          </SingleSelect>
        </Box>
      ))}
    </>
  );
};
