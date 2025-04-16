import { Box, Flex, Typography } from '@strapi/design-system';
import { useRef, useEffect, useState } from 'react';

export interface Step {
  id: number;
  title: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

export const Stepper = ({ steps, currentStep, className }: StepperProps) => {
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [maxWidth, setMaxWidth] = useState(0);

  // Calculate the maximum width of step titles for consistent spacing
  useEffect(() => {
    const calculateMaxWidth = () => {
      const widths = stepRefs.current
        .filter(Boolean)
        .map((el) => el?.offsetWidth || 0);
      
      setMaxWidth(Math.max(0, ...widths));
    };

    calculateMaxWidth();
    window.addEventListener('resize', calculateMaxWidth);
    
    return () => {
      window.removeEventListener('resize', calculateMaxWidth);
    };
  }, [steps]);

  return (
    <Box paddingBottom={6} className={className}>
      <Flex justifyContent="center" alignItems="center">
        <Box maxWidth="800px" width="100%">
          <Flex justifyContent="space-between" alignItems="center">
            {steps.map((step, index) => (
              <Flex 
                key={step.id} 
                alignItems="center" 
                style={{
                  flex: 1,
                  position: 'relative',
                }}
              >
                <Flex alignItems="center">
                  {/* Step circle with number */}
                  <Flex
                    justifyContent="center"
                    alignItems="center"
                    height="36px"
                    width="36px"
                    background={currentStep >= step.id ? 'primary600' : 'neutral200'}
                    hasRadius
                    style={{
                      borderRadius: '50%',
                      transition: 'all 0.2s ease-in-out',
                      minWidth: '36px',
                    }}
                  >
                    <Typography
                      textColor={currentStep >= step.id ? 'neutral0' : 'neutral600'}
                      fontWeight="bold"
                    >
                      {step.id}
                    </Typography>
                  </Flex>
                  
                  {/* Step title */}
                  <Box 
                    paddingLeft={2}
                    ref={(el: HTMLDivElement | null) => (stepRefs.current[index] = el)}
                    style={{
                      minWidth: maxWidth > 0 ? maxWidth : 'auto',
                    }}
                  >
                    <Typography
                      variant="pi"
                      fontWeight={currentStep >= step.id ? 'bold' : 'normal'}
                      textColor={currentStep >= step.id ? 'primary600' : 'neutral600'}
                      style={{
                        transition: 'all 0.2s ease-in-out',
                      }}
                    >
                      {step.title}
                    </Typography>
                  </Box>
                </Flex>
                
                {/* Connector line between steps */}
                {index < steps.length - 1 && (
                  <Box
                    height="2px"
                    background={currentStep > step.id ? 'primary600' : 'neutral200'}
                    style={{
                      flex: 1,
                      margin: '0 12px',
                      transition: 'all 0.2s ease-in-out',
                    }}
                  />
                )}
                
                {/* Add an invisible line after the last step for balance */}
                {index === steps.length - 1 && (
                  <Box
                    height="2px"
                    style={{
                      flex: 1,
                      margin: '0 12px',
                      opacity: 0,
                    }}
                  />
                )}
              </Flex>
            ))}
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};