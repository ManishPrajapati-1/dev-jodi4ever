'use client'
import { useSelector, useDispatch } from 'react-redux';
import Step0BasicInfo from '@/app/components/RegistrationForm/Step0BasicInfo';
import Step1PersonalDetails from '@/app/components/RegistrationForm/Step1PersonalDetails';
import Step2EducationalDetails from '@/app/components/RegistrationForm/Step2EducationalDetails';
import Step3ProfessionalDetails from '@/app/components/RegistrationForm/Step3ProfessionalDetails'
import Step4CulturalDetails from '@/app/components/RegistrationForm/Step4CulturalDetails';
import Step5LifestyleDetails from '@/app/components/RegistrationForm/Step5LifestyleDetails';
import Step6ProfileImage from '@/app/components/RegistrationForm/Step6ProfileImage';
import Step7Preferences from '@/app/components/RegistrationForm/Step7Preferences'
// ... other step imports

const steps = [
  Step0BasicInfo,
  Step1PersonalDetails,
  Step2EducationalDetails,
  Step3ProfessionalDetails,
  Step4CulturalDetails,
  Step5LifestyleDetails,
  Step6ProfileImage,
  Step7Preferences
];

export default function CreateProfilePage() {
  const step = useSelector(state => state.profile.step);
  const StepComponent = steps[step];

  return (
    <div className="max-w-2xl mx-auto p-4">
      <StepComponent />
    </div>
  );
}
