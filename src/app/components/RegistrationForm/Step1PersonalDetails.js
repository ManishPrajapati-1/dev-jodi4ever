"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useGetStatesQuery, useGetCitiesQuery, use } from "@/lib/services/api";
import { setStep, updateFormData } from "@/lib/features/profile/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import { CalendarIcon, ChevronRightIcon, MapPinIcon, RulerIcon, UserIcon } from "lucide-react";

const Step1PersonalDetails = () => {
  const formData = useSelector((state) => state.profile.formData);
  const preferencesData = useSelector((state) => state.profile.preferences);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getSelectedCm = (heightString) => {
    const match = heightString?.match(/(\d+)'(\d+)"/);
    if (match) {
      const feet = parseInt(match[1]);
      const inches = parseInt(match[2]);
      return (feet * 30.48 + inches * 2.54).toFixed(2);
    }
    return "0.0";
  };
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    // defaultValues: {
    //   gender: "",
    //   marital_status: "",
    //   height: "",
    //   state: "",
    //   city: "",
    // }
    defaultValues: formData
  });
  
  const {
    data: states,
    error: statesError,
    isLoading: statesLoading,
  } = useGetStatesQuery();
  
  const selectedStateCode = watch("state");

  const {
    data: cities,
    error: citiesError,
    isLoading: citiesLoading,
  } = useGetCitiesQuery(selectedStateCode, {
    skip: !selectedStateCode,
  });

  const dispatch = useDispatch();

  useEffect(() => {
  // This runs only when formData changes or component mounts
    if (formData.state) {
      setValue("state", formData.stateCode);
      if (formData.city) {
        setValue("city", formData.city);
      }
    }
  }, [formData, setValue, citiesLoading, statesLoading]);

  useEffect(() => {
    if (selectedStateCode) {
      // setValue("city", ""); // May need to uncomment if there is problem for Selecting city
    }
    if (preferencesData?.lookingFor) {
      const oppositeGender =
        preferencesData.lookingFor === "Groom" ? "Female" : "Male";
      setValue("gender", oppositeGender);
    }
  }, [preferencesData, selectedStateCode, setValue]);

const onSubmit = (data) => {
  setIsSubmitting(true);
  
  // Get the state name from the selected isoCode
  const selectedState = states?.data?.find(state => state.isoCode === data.state);
  console.log(selectedState)
  // Create the final data object
  const finalData = {
    ...data,
    heightInCm: getSelectedCm(data.height),
    stateName: selectedState?.name || "", // Store the state name
    stateCode: data.state // Store the state code (isoCode)
  };
  
  // Simulate API call
  setTimeout(() => {
    dispatch(updateFormData(finalData));
    dispatch(setStep(2));
    setIsSubmitting(false);
  }, 200);
};

  const getAgeFromDOB = (dob) => {
    if (!dob) return null;
    
    const birthDate = new Date(dob);
    const today = new Date();
    
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const dobValue = watch("dob");
  const calculatedAge = getAgeFromDOB(dobValue);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gradient-to-r from-pink-500 via-primary to-indigo-500 p-1 rounded-2xl shadow-lg">
        <div className="bg-white p-6 sm:p-8 rounded-2xl">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Personal Details</h2>
            <p className="text-gray-500 mt-2">Tell us about yourself to find your perfect match</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="">
            {/* Date of Birth */}
            <div className="bg-gray-50 p-4 rounded-xl">
              <div className="flex items-start mb-1">
                <CalendarIcon className="w-5 h-5 text-primary mr-2 mt-0.5" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type="date"
                      {...register("dob", {
                        required: "Date of birth is required",
                        validate: (value) => {
                          const age = getAgeFromDOB(value);
                          
                          if (age === null) return "Invalid date of birth";
                          if (age < 18) return "You must be at least 18 years old";
                          if (age > 70) return "Age must be less than or equal to 70";
                          return true;
                        },
                      })}
                      className="block w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-200"
                    />
                    {calculatedAge && !errors.dob && (
                      <div className="right-10 top-3.5 text-gray-500 text-sm">
                        {calculatedAge} years old
                      </div>
                    )}
                  </div>
                  {errors.dob && (
                    <p className="text-red-500 text-sm mt-1">{errors.dob.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Gender */}
            <div className="bg-gray-50 p-4 rounded-xl">
              <div className="flex items-start">
                <UserIcon className="w-5 h-5 text-primary mr-2 mt-0.5" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <label className="relative flex-1">
                      <input
                        type="radio"
                        value="Male"
                        {...register("gender", { required: "Gender is required" })}
                        className="sr-only peer"
                      />
                      <div className="block cursor-pointer px-4 py-3 border-2 rounded-lg text-center transition-all duration-200 peer-checked:border-primary peer-checked:bg-primary/5 peer-checked:text-primary border-gray-200">
                        <div className="font-medium">Male</div>
                      </div>
                      <div className="absolute hidden peer-checked:block top-3 right-3 text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </label>
                    
                    <label className="relative flex-1">
                      <input
                        type="radio"
                        value="Female"
                        {...register("gender", { required: "Gender is required" })}
                        className="sr-only peer"
                      />
                      <div className="block cursor-pointer px-4 py-3 border-2 rounded-lg text-center transition-all duration-200 peer-checked:border-primary peer-checked:bg-primary/5 peer-checked:text-primary border-gray-200">
                        <div className="font-medium">Female</div>
                      </div>
                      <div className="absolute hidden peer-checked:block top-3 right-3 text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </label>
                  </div>
                  {errors.gender && (
                    <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Marital Status */}
            <div className="bg-gray-50 p-4 rounded-xl">
              <div className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-primary mr-2 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Marital Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register("marital_status", {
                      required: "Please select your marital status",
                    })}
                    className="block w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-200 bg-white"
                  >
                    <option value="">Select Marital Status</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                  </select>
                  {errors.marital_status && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.marital_status.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Height */}
            <div className="bg-gray-50 p-4 rounded-xl">
              <div className="flex items-start">
                <RulerIcon className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Height <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register("height", { required: "Height is required" })}
                    className="block w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-200 bg-white"
                  >
                    <option value="">Select Your Height</option>
                    {Array.from({ length: 37 }, (_, i) => {
                      const feet = Math.floor(i / 12) + 4; // Start at 4 feet
                      const inches = i % 12;
                      const cm = (feet * 30.48 + inches * 2.54).toFixed(2);
                      return (
                        <option key={i} value={`${feet}'${inches}" (${getSelectedCm(`${feet}'${inches}"`)} cm)`}>
                          {feet}&apos;{inches}&apos; ({cm} cm)
                        </option>
                      );
                    })}
                  </select>
                  {errors.height && (
                    <p className="text-red-500 text-sm mt-1">{errors.height.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="bg-gray-50 p-4 rounded-xl">
              <div className="flex items-start">
                <MapPinIcon className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location <span className="text-red-500">*</span>
                  </label>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* State */}
                    <div>
                      <select
                        {...register("state", { required: "State is required" })}
                        className="block w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-200 bg-white"
                      >
                        <option value="">Select State</option>
                        {statesLoading ? (
                          <option disabled>Loading states...</option>
                        ) : statesError ? (
                          <option disabled>Error loading states</option>
                        ) : (
                          states?.data?.map((state) => (
                            <option key={state.isoCode} value={state.isoCode}>
                              {state.name}
                            </option>
                          ))
                        )}
                      </select>
                      {errors.state && (
                        <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>
                      )}
                    </div>

                    {/* City */}
                    <div>
                      <select
                        {...register("city", { required: "City is required" })}
                        className="block w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-200 bg-white"
                        disabled={!selectedStateCode}
                      >
                        <option value="">
                          {!selectedStateCode
                            ? "Select state first"
                            : citiesLoading
                            ? "Loading cities..."
                            : "Select City"}
                        </option>
                        {!citiesLoading && !citiesError && cities?.data?.map((city) => (
                          <option key={city.name} value={city.name}>
                            {city.name}
                          </option>
                        ))}
                      </select>
                      {errors.city && (
                        <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting || !errors}
                // disabled={isSubmitting || !isValid}
                className="w-full bg-primary hover:bg-primary/90 text-white py-3 px-6 rounded-xl font-medium transition-all duration-200 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center">
                    Continue to Next Step
                    <ChevronRightIcon className="ml-2 h-5 w-5" />
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Step1PersonalDetails;