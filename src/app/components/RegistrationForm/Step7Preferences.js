"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { redirect } from "next/navigation";
import { ChevronDown, Check, Save } from "lucide-react";
import fieldsData from "./fieldsData.json"

import {
  usePostUserPreferencesMutation,
  useGetStatesQuery,
} from "@/lib/services/api";

const PreferencesForm = () => {
  const preferencesData = useSelector((state) => state.profile.preferences);
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: {
      state: '',
      any_caste: false,
    },
  });
  
  const [activeSection, setActiveSection] = useState("basics");
  const [postUserPreferences, { isLoading, isSuccess, isError }] =
    usePostUserPreferencesMutation();

  // Fetch states for dropdown
  const {
    data: states,
    error: statesError,
    isLoading: statesLoading,
  } = useGetStatesQuery();

  // Watch values for conditional validation
  const religion = watch("religion");
  
  useEffect(() => {
    if (preferencesData) {
      if (preferencesData.religion) setValue('religion', preferencesData.religion);
      if (preferencesData.age) setValue('min_age', preferencesData.age);
    }
  }, [preferencesData, setValue]);

  useEffect(() => {
    if (
      preferencesData?.location && 
      states?.data &&
      states.data.some((s) => s.name === preferencesData.location)
    ) {
      const matchedState = states.data.find((s) => s.name === preferencesData.location);
      if (matchedState) {
        setValue("state", matchedState.isoCode);
      }
    }
  }, [preferencesData, states, setValue]);
  
  const onSubmit = async (data) => {
    try {
      // Convert checkbox boolean to string boolean for API
      data.any_caste = data.any_caste === true;
      data.min_height = `${data.min_height_in_cm}`;
      data.max_height = `${data.max_height_in_cm}`;
      data.min_height_in_cm = Number(getSelectedCm(data.min_height_in_cm));
      data.max_height_in_cm = Number(getSelectedCm(data.max_height_in_cm));

      await postUserPreferences(data).unwrap();
      
      // Show success message without alert
      setTimeout(() => {
        redirect("/");
      }, 1500);
    } catch (error) {
      // Error will be handled by the isError state
      console.error("Failed to save preferences:", error);
    }
  };

  const getSelectedCm = (heightString) => {
    const match = heightString.match(/(\d+)'(\d+)"/);
    if (match) {
      const feet = parseInt(match[1]);
      const inches = parseInt(match[2]);
      return (feet * 30.48 + inches * 2.54).toFixed(2);
    }
    return "0.0";
  };

  // Helper for form section toggle
  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold text-primary mb-6 pb-2 border-b border-gray-200">
        Partner Preferences
      </h2>

      {/* Age & Height Section */}
      <div className="border border-gray-200 rounded-lg overflow-hidden mb-4">
        <div 
          className={`flex justify-between items-center p-4 bg-gray-50 cursor-pointer ${activeSection === "basics" ? "border-l-4 border-primary" : ""}`}
          onClick={() => toggleSection("basics")}
        >
          <h3 className="text-lg font-semibold">Basic Details</h3>
          <ChevronDown className={`w-5 h-5 transform transition-transform ${activeSection === "basics" ? "rotate-180" : ""}`} />
        </div>
        
        {activeSection === "basics" && (
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Age Range */}
              <div className="space-y-2">
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Age Range<span className="text-red-500">*</span>
                </label>
                <div className="flex items-center space-x-2">
                  <div className="flex-1">
                    <select
                      {...register("min_age", { required: "Required" })}
                      className={`input-select w-full ${errors.min_age ? "border-red-500" : ""}`}
                    >
                      <option value="">Min</option>
                      {[...Array(43).keys()].map((i) => (
                        <option key={i} value={i + 18}>
                          {i + 18}
                        </option>
                      ))}
                    </select>
                    {errors.min_age && (
                      <p className="text-red-500 text-xs mt-1">{errors.min_age.message}</p>
                    )}
                  </div>
                  <span className="text-gray-500">to</span>
                  <div className="flex-1">
                    <select
                      {...register("max_age", { required: "Required" })}
                      className={`input-select w-full ${errors.max_age ? "border-red-500" : ""}`}
                    >
                      <option value="">Max</option>
                      {[...Array(43).keys()].map((i) => (
                        <option key={i} value={i + 18}>
                          {i + 18}
                        </option>
                      ))}
                    </select>
                    {errors.max_age && (
                      <p className="text-red-500 text-xs mt-1">{errors.max_age.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Height Range */}
              <div className="space-y-2">
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Height Range<span className="text-red-500">*</span>
                </label>
                <div className="flex items-center space-x-2">
                  <div className="flex-1">
                    <select
                      {...register("min_height_in_cm", { required: "Required" })}
                      className={`input-select w-full ${errors.min_height_in_cm ? "border-red-500" : ""}`}
                    >
                     {Array.from({ length: 37 }, (_, i) => {
                            const feet = Math.floor(i / 12) + 4; // Start at 4 feet
                            const inches = i % 12;
                            const cm = (feet * 30.48 + inches * 2.54).toFixed(1);
                            return (
                              <option key={i} value={`${feet}'${inches}" (${getSelectedCm(`${feet}'${inches}"`)} cm)`}>
                                {feet}&apos;{inches}&quot; ({cm} cm)
                              </option>
                            );
                          })}
                    </select>
                    {errors.min_height_in_cm && (
                      <p className="text-red-500 text-xs mt-1">{errors.min_height_in_cm.message}</p>
                    )}
                  </div>
                  <span className="text-gray-500">to</span>
                  <div className="flex-1">
                    <select
                      {...register("max_height_in_cm", { required: "Required" })}
                      className={`input-select w-full ${errors.max_height_in_cm ? "border-red-500" : ""}`}
                    >
                      {Array.from({ length: 37 }, (_, i) => {
                            const feet = Math.floor(i / 12) + 4; // Start at 4 feet
                            const inches = i % 12;
                            const cm = (feet * 30.48 + inches * 2.54).toFixed(1);
                            return (
                              <option key={i} value={`${feet}'${inches}" (${getSelectedCm(`${feet}'${inches}"`)} cm)`}>
                                {feet}&apos;{inches}&quot; ({cm} cm)
                              </option>
                            );
                          })}
                    </select>
                    {errors.max_height_in_cm && (
                      <p className="text-red-500 text-xs mt-1">{errors.max_height_in_cm.message}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Marital Status */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Marital Status<span className="text-red-500">*</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {["Single", "Divorced", "Widowed", "Separated"].map((status) => (
                  <label key={status} className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-primary"
                      value={status}
                      {...register("marital_status", { required: "Please select a marital status" })}
                    />
                    <span className="ml-2 text-sm">{status}</span>
                  </label>
                ))}
              </div>
              {errors.marital_status && (
                <p className="text-red-500 text-xs mt-1">{errors.marital_status.message}</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Religion & Location Section */}
      <div className="border border-gray-200 rounded-lg overflow-hidden mb-4">
        <div 
          className={`flex justify-between items-center p-4 bg-gray-50 cursor-pointer ${activeSection === "religion" ? "border-l-4 border-primary" : ""}`}
          onClick={() => toggleSection("religion")}
        >
          <h3 className="text-lg font-semibold">Religion & Location</h3>
          <ChevronDown className={`w-5 h-5 transform transition-transform ${activeSection === "religion" ? "rotate-180" : ""}`} />
        </div>
        
        {activeSection === "religion" && (
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Religion */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Religion<span className="text-red-500">*</span>
                </label>
                <select
                  {...register("religion", { required: "Religion is required" })}
                  className={`input-select w-full ${errors.religion ? "border-red-500" : ""}`}
                >
                  <option value="">Select</option>
                  <option>Hindu</option>
                  <option>Muslim</option>
                  <option>Christian</option>
                  <option>Sikh</option>
                  <option>Jain</option>
                  <option>Buddhist</option>
                  <option>Other</option>
                </select>
                {errors.religion && (
                  <p className="text-red-500 text-xs mt-1">{errors.religion.message}</p>
                )}
              </div>

              {/* Any Caste Checkbox */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Caste Preference</label>
                <div className="flex items-center mt-1">
                  <input
                    type="checkbox"
                    {...register("any_caste")}
                    id="any-caste"
                    className="form-checkbox h-5 w-5 text-primary rounded"
                  />
                  <label htmlFor="any-caste" className="ml-2 text-sm text-gray-700">
                    Open to all castes
                  </label>
                </div>
              </div>

              {/* Manglik - Only show for Hindu and related religions */}
              {["Hindu", "Jain", "Sikh"].includes(religion) && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Manglik<span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register("manglik", { 
                      required: ["Hindu", "Jain", "Sikh"].includes(religion) ? "Required" : false 
                    })}
                    className={`input-select w-full ${errors.manglik ? "border-red-500" : ""}`}
                  >
                    <option value="">Select</option>
                    <option value="Non-manglik">Non-manglik</option>
                      <option value="Manglik">Manglik</option>
                      <option value="Anshik-manglik">Anshik-manglik</option>
                  </select>
                  {errors.manglik && (
                    <p className="text-red-500 text-xs mt-1">{errors.manglik.message}</p>
                  )}
                </div>
              )}

              {/* Mother Tongue */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Mother Tongue<span className="text-red-500">*</span>
                </label>
                <select
                  {...register("mother_tongue", { required: "Mother tongue is required" })}
                  className={`input-select w-full ${errors.mother_tongue ? "border-red-500" : ""}`}
                >
                  <option value="">Select</option>
                  <option>Hindi</option>
                  <option>English</option>
                  <option>Marathi</option>
                  <option>Tamil</option>
                  <option>Bengali</option>
                  <option>Telugu</option>
                  <option>Malayalam</option>
                  <option>Kannada</option>
                  <option>Gujarati</option>
                  <option>Punjabi</option>
                  <option>Urdu</option>
                  <option>Other</option>
                </select>
                {errors.mother_tongue && (
                  <p className="text-red-500 text-xs mt-1">{errors.mother_tongue.message}</p>
                )}
              </div>

              {/* State */}
              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  State<span className="text-red-500">*</span>
                </label>
                <select
                  {...register("state", { required: "State is required" })}
                  className={`input-select w-full ${errors.state ? "border-red-500" : ""}`}
                >
                  <option value="">Select</option>
                  {statesLoading ? (
                    <option disabled>Loading...</option>
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
                  <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Education & Career Section */}
      <div className="border border-gray-200 rounded-lg overflow-hidden mb-4">
        <div 
          className={`flex justify-between items-center p-4 bg-gray-50 cursor-pointer ${activeSection === "career" ? "border-l-4 border-primary" : ""}`}
          onClick={() => toggleSection("career")}
        >
          <h3 className="text-lg font-semibold">Education & Career</h3>
          <ChevronDown className={`w-5 h-5 transform transition-transform ${activeSection === "career" ? "rotate-180" : ""}`} />
        </div>
        
        {activeSection === "career" && (
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Education */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Highest Education<span className="text-red-500">*</span>
                </label>
                <select
                  {...register("highest_education", { required: "Education is required" })}
                  className={`input-select w-full ${errors.highest_education ? "border-red-500" : ""}`}
                >
                  <option value="">Select</option>
                  <option value="Below High School">Below High School</option>
                    <option value="High School (12th)">High School (12th)</option>
                    <option value="Diploma">Diploma</option>
                    <option value="Bachelor's">Bachelor&apos;s</option>
                    <option value="Master's">Master&apos;s</option>
                    <option value="Doctorate">Doctorate/PhD</option>
                </select>
                {errors.highest_education && (
                  <p className="text-red-500 text-xs mt-1">{errors.highest_education.message}</p>
                )}
              </div>

              {/* Employment */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Employed In<span className="text-red-500">*</span>
                </label>
                <select
                  {...register("employed_in", { required: "Employment is required" })}
                  className={`input-select w-full ${errors.employed_in ? "border-red-500" : ""}`}
                >
                  {fieldsData.employeeInOptions.map((employed_in, index) => (
                                        <option key={index} value={employed_in}>
                                          {employed_in}
                                        </option>
                                      ))}
                </select>
                {errors.employed_in && (
                  <p className="text-red-500 text-xs mt-1">{errors.employed_in.message}</p>
                )}
              </div>

              {/* Income */}
              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Annual Income<span className="text-red-500">*</span>
                </label>
                <select
                  {...register("annual_income", { required: "Income is required" })}
                  className={`input-select w-full ${errors.annual_income ? "border-red-500" : ""}`}
                >
                  <option value="">Select</option>
                  {fieldsData.annualIncomeOptions.map((annual_income, index) => (
                    <option key={index} value={annual_income}>
                      {annual_income}
                    </option>
                  ))}
                </select>
                {errors.annual_income && (
                  <p className="text-red-500 text-xs mt-1">{errors.annual_income.message}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Toast messages for success/error */}
      {isSuccess && (
        <div className="fixed bottom-4 right-4 bg-green-50 border-l-4 border-green-500 p-4 rounded shadow-md flex items-center animate-fade-in">
          <Check className="w-5 h-5 text-green-500 mr-2" />
          <p className="text-green-700">Preferences saved successfully!</p>
        </div>
      )}
      
      {isError && (
        <div className="fixed bottom-4 right-4 bg-red-50 border-l-4 border-red-500 p-4 rounded shadow-md flex items-center animate-fade-in">
          <p className="text-red-700">Error saving preferences. Please try again.</p>
        </div>
      )}

      {/* Submit Button - Fixed at bottom */}
      <div className="pt-4 mt-6 border-t border-gray-200">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center items-center bg-btn hover:bg-btn-hover transition text-white font-semibold py-3 px-4 rounded-lg disabled:opacity-50 shadow-md"
        >
          {isLoading ? (
            <>
              <span className="mr-2 animate-spin">●</span>
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              <span>Save Preferences</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default PreferencesForm;