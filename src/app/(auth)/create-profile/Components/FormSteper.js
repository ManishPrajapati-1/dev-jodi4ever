"use client"

import { useDispatch, useSelector } from "react-redux";
import { setStep } from "@/lib/features/profile/profileSlice";
import { ChevronLeft } from "lucide-react";

export default function FormStepper() {
  const dispatch = useDispatch();
  const step = useSelector((state) => state.profile.step);
  
  const decrementStep = () => {
    if (step > 0) {
      dispatch(setStep(step - 1));
    }
  };

  return (
    <div className="flex items-center space-x-4">
      {step > 0 && (
        <button
          onClick={decrementStep}
          className="p-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors"
          aria-label="Go back"
        >
          <ChevronLeft size={20} />
        </button>
      )}
      
      {/* <div className="text-gray-700 font-medium">Page: {step}</div> */}
    </div>
  );
}