import { AppointmentData } from '../types';
import { Step1Services } from './step1-services';
import { Step2DateTime } from './step2-date-time';
import { Step3ClientInfo } from './step3-client-info';
import { Steps } from '../index';
interface RenderStepProps {
  activeStep: number;
  appointmentData: AppointmentData;
  handleDataUpdate: (data: Partial<AppointmentData>) => void;
  handleBack: () => void;
  handleNext: () => void;
}

export const RenderStep = ({
  activeStep,
  appointmentData,
  handleDataUpdate,
  handleBack,
  handleNext,
}: RenderStepProps) => {
  if (activeStep === Steps.Services) {
    return <Step1Services data={appointmentData} onUpdate={handleDataUpdate} onNext={handleNext} />;
  }
  if (activeStep === Steps.DateTime) {
    return (
      <Step2DateTime
        data={appointmentData}
        onUpdate={handleDataUpdate}
        onBack={handleBack}
        onNext={handleNext}
      />
    );
  }
  if (activeStep === Steps.ClientInfo) {
    return (
      <Step3ClientInfo data={appointmentData} onUpdate={handleDataUpdate} onBack={handleBack} />
    );
  }

  return null;
};
