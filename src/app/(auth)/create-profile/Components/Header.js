'use client';
import { useDispatch, useSelector } from 'react-redux';
import { setStep } from '@/lib/features/profile/profileSlice';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export default function Header() {
  const dispatch = useDispatch();
  const step = useSelector((state) => state.profile.step);

  const handleNext = () => {
    if (step < 7) {
      dispatch(setStep(step + 1));
    }
  };

  const handleBack = () => {
    if (step > 1) {
      dispatch(setStep(step - 1));
    }
  };

  return (
    <header className="bg-primary text-white px-6 py-4 shadow-md flex justify-between items-center">
      <h1 className="text-2xl font-bold">Create Your Profile</h1>
      {step > 0 && (
        <div className="flex gap-3 items-center">
          {step > 1 && (
            <button
              onClick={handleBack}
              className="text-white hover:text-secondary transition"
              aria-label="Previous Step"
            >
              <FaArrowLeft size={20} />
            </button>
          )}
          {step < 7 && (
            <button
              onClick={handleNext}
              className="text-white hover:text-secondary transition"
              aria-label="Next Step"
            >
              <FaArrowRight size={20} />
            </button>
          )}
        </div>
      )}
    </header>
  );
}
