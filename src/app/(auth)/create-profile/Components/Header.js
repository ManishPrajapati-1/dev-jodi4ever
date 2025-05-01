"use client";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { setStep } from "@/lib/features/profile/profileSlice";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function Header() {
  const dispatch = useDispatch();
  const step = useSelector((state) => state.profile.step);

  const handleNext = () => {
    if (step < 7) dispatch(setStep(step + 1));
  };

  const handleBack = () => {
    if (step > 1) dispatch(setStep(step - 1));
  };

  return (
    <header className="bg-primary text-white px-4 md:px-8 py-4 shadow-md flex justify-between items-center">
      {/* Logo and Title */}
      <div className="flex items-center gap-4">
        <Link href="/" aria-label="Go to Home">
          <Image
            src="/images/jodi4ever_logo.png"
            width={48}
            height={48}
            alt="Logo"
            className="w-10 h-10 md:w-12 md:h-12"
          />
        </Link>
        <h1 className="text-base md:text-xl font-semibold">
          Jodi4Ever - Create Your Profile
        </h1>
      </div>

      {/* Navigation Buttons */}
      {step > 0 && (
        <div className="flex gap-2 md:gap-4 items-center">
          {step > 1 && (
            <button
              onClick={handleBack}
              className="p-2 rounded-md bg-white bg-opacity-20 hover:bg-opacity-30 transition focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Previous Step"
            >
              <FaArrowLeft size={18} />
            </button>
          )}
          {step < 7 && (
            <button
              onClick={handleNext}
              className="p-2 rounded-md bg-white bg-opacity-20 hover:bg-opacity-30 transition focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Next Step"
            >
              <FaArrowRight size={18} />
            </button>
          )}
        </div>
      )}
    </header>
  );
}
