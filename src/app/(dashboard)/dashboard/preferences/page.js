"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ChevronDown, Save } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';
import {
  useGetUserPreferencesQuery,
  usePostUserPreferencesMutation,
  useGetStatesQuery,
} from "@/lib/services/api";

export default function PartnerPreferencesPage() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("basics");
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({

  });
  
  // Get user profile data
  const { data: preferencesData, isLoading: profileLoading } = useGetUserPreferencesQuery();
  // Update user preferences
  const [updateProfile, { isLoading, isSuccess, isError }] = usePostUserPreferencesMutation();
  
  // Fetch states for dropdown
  const {
    data: states,
    error: statesError,
    isLoading: statesLoading,
  } = useGetStatesQuery();

  // Watch values for conditional validation
  const religion = watch("religion");

  useEffect(() => {
    // Redirect if not authenticated
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/create-profile");
    }
  }, [router]);

  useEffect(() => {
    // Populate form with user data when available
    if (preferencesData) {
      const preferences = preferencesData.data;
      console.log(preferences);
      if (preferences) {
        // Map specific fields correctly
        if (preferences.min_age) setValue('min_age', preferences.min_age);
        if (preferences.max_age) setValue('max_age', preferences.max_age);
        if (preferences.min_height_in_cm) setValue('min_height_in_cm', preferences.min_height);
        if (preferences.max_height_in_cm) setValue('max_height_in_cm', preferences.max_height);
        if (preferences.marital_status) setValue('marital_status', preferences.marital_status);
        if (preferences.religion) setValue('religion', preferences.religion);
        if (preferences.any_caste !== undefined) setValue('any_caste', preferences.any_caste);
        if (preferences.mother_tongue) setValue('mother_tongue', preferences.mother_tongue);
        if (preferences.state) setValue('state', preferences.state);
        if (preferences.manglik) setValue('manglik', preferences.manglik);
        if (preferences.highest_education) setValue('highest_education', preferences.highest_education);
        if (preferences.employed_in) setValue('employed_in', preferences.employed_in);
        if (preferences.annual_income) setValue('annual_income', preferences.annual_income);
      }
    }
  }, [preferencesData, setValue]);

  const onSubmit = async (data) => {
    try {
      data.min_height = `${data.min_height_in_cm}`;
      data.max_height = `${data.max_height_in_cm}`;
      data.min_height_in_cm = Number(getSelectedCm(data.min_height_in_cm));
      data.max_height_in_cm = Number(getSelectedCm(data.max_height_in_cm));
      await updateProfile(data).unwrap();
      toast.success("Preferences saved successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to save preferences.");
      console.error("Failed to save preferences:", error);
    }
  };
  
  // Helper functions for formatting data
  const getHeightString = (heightInCm) => {
    const feet = Math.floor(heightInCm / 30.48);
    const inches = Math.round((heightInCm % 30.48) / 2.54);
    return `${feet}'${inches}" (${heightInCm.toFixed(2)} cm)`;
  };
  
  const getSelectedCm = (heightString) => {
    const match = heightString.match(/(\d+)'(\d+)"/);
    if (match) {
      const feet = parseInt(match[1]);
      const inches = parseInt(match[2]);
      return (feet * 30.48 + inches * 2.54).toFixed(1);
    }
    return "0.0";
  };

  // Helper for form section toggle
  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  if (profileLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading preferences...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-red-600 text-white flex justify-between items-center">
          <h1 className="text-2xl font-bold">Partner Preferences</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          {/* Basic Info Section */}
          <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
            <div 
              className={`flex justify-between items-center p-4 bg-gray-50 cursor-pointer ${activeSection === "basics" ? "border-l-4 border-red-600" : ""}`}
              onClick={() => toggleSection("basics")}
            >
              <h3 className="text-lg font-semibold">Basic Details</h3>
              <ChevronDown className={`w-5 h-5 transform transition-transform ${activeSection === "basics" ? "rotate-180" : ""}`} />
            </div>
            
            {activeSection === "basics" && (
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  {/* Age Range */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      Age Range<span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1">
                        <select
                          {...register("min_age", { required: "Min age is required" })}
                          className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.min_age ? "border-red-500" : "border-gray-300"}`}
                        >
                          {[...Array(43)].map((_, i) => (
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
                          {...register("max_age", { required: "Max age is required" })}
                          className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.max_age ? "border-red-500" : "border-gray-300"}`}
                        >
                          {[...Array(43)].map((_, i) => (
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
                          {...register("min_height_in_cm", { required: "Min height is required" })}
                          className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.min_height_in_cm ? "border-red-500" : "border-gray-300"}`}
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
                          {...register("max_height_in_cm", { required: "Max height is required" })}
                          className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.max_height_in_cm ? "border-red-500" : "border-gray-300"}`}
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

                  {/* Marital Status */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Marital Status<span className="text-red-500">*</span>
                    </label>
                    <select
                      {...register("marital_status", { required: "Marital status is required" })}
                      className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.marital_status ? "border-red-500" : "border-gray-300"}`}
                    >
                      <option value="Single">Single</option>
                      <option value="Divorced">Divorced</option>
                      <option value="Widowed">Widowed</option>
                      <option value="Separated">Separated</option>
                      <option value="Any">Any</option>
                    </select>
                    {errors.marital_status && (
                      <p className="text-red-500 text-xs mt-1">{errors.marital_status.message}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Religion & Location Section */}
          <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
            <div 
              className={`flex justify-between items-center p-4 bg-gray-50 cursor-pointer ${activeSection === "religion" ? "border-l-4 border-red-600" : ""}`}
              onClick={() => toggleSection("religion")}
            >
              <h3 className="text-lg font-semibold">Religion & Location</h3>
              <ChevronDown className={`w-5 h-5 transform transition-transform ${activeSection === "religion" ? "rotate-180" : ""}`} />
            </div>
            
            {activeSection === "religion" && (
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  {/* Religion */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Religion<span className="text-red-500">*</span>
                    </label>
                    <select
                      {...register("religion", { required: "Religion is required" })}
                      className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.religion ? "border-red-500" : "border-gray-300"}`}
                    >
                      <option value="Hindu">Hindu</option>
                      <option value="Muslim">Muslim</option>
                      <option value="Christian">Christian</option>
                      <option value="Sikh">Sikh</option>
                      <option value="Jain">Jain</option>
                      <option value="Buddhist">Buddhist</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.religion && (
                      <p className="text-red-500 text-xs mt-1">{errors.religion.message}</p>
                    )}
                  </div>

                  {/* Caste Preference */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Caste
                    </label>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="any-caste"
                        {...register("any_caste")}
                        className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                      />
                      <label htmlFor="any-caste" className="ml-2 block text-sm text-gray-700">
                        Open to all castes
                      </label>
                    </div>
                  </div>

                  {/* Manglik (Show only for Hindu, Jain, Sikh) */}
                  {["Hindu", "Jain", "Sikh"].includes(religion) && (
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Manglik<span className="text-red-500">*</span>
                      </label>
                      <select
                        {...register("manglik", { 
                          required: ["Hindu", "Jain", "Sikh"].includes(religion) ? "Required for this religion" : false 
                        })}
                        className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.manglik ? "border-red-500" : "border-gray-300"}`}
                      >
                        <option value="">Select</option>
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                        <option value="Doesn't Matter">Doesn&apos;t Matter</option>
                      </select>
                      {errors.manglik && (
                        <p className="text-red-500 text-xs mt-1">{errors.manglik.message}</p>
                      )}
                    </div>
                  )}

                  {/* Mother Tongue */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mother Tongue<span className="text-red-500">*</span>
                    </label>
                    <select
                      {...register("mother_tongue", { required: "Mother tongue is required" })}
                      className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.mother_tongue ? "border-red-500" : "border-gray-300"}`}
                    >
                      <option value="Hindi">Hindi</option>
                      <option value="English">English</option>
                      <option value="Marathi">Marathi</option>
                      <option value="Tamil">Tamil</option>
                      <option value="Bengali">Bengali</option>
                      <option value="Telugu">Telugu</option>
                      <option value="Malayalam">Malayalam</option>
                      <option value="Kannada">Kannada</option>
                      <option value="Gujarati">Gujarati</option>
                      <option value="Punjabi">Punjabi</option>
                      <option value="Urdu">Urdu</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.mother_tongue && (
                      <p className="text-red-500 text-xs mt-1">{errors.mother_tongue.message}</p>
                    )}
                  </div>

                  {/* Location/State */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State<span className="text-red-500">*</span>
                    </label>
                    <select
                      {...register("state", { required: "State is required" })}
                      className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.state ? "border-red-500" : "border-gray-300"}`}
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

          {/* Professional Section */}
          <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
            <div 
              className={`flex justify-between items-center p-4 bg-gray-50 cursor-pointer ${activeSection === "professional" ? "border-l-4 border-red-600" : ""}`}
              onClick={() => toggleSection("professional")}
            >
              <h3 className="text-lg font-semibold">Education & Career</h3>
              <ChevronDown className={`w-5 h-5 transform transition-transform ${activeSection === "professional" ? "rotate-180" : ""}`} />
            </div>
            
            {activeSection === "professional" && (
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  {/* Education */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Education<span className="text-red-500">*</span>
                    </label>
                    <select
                      {...register("highest_education", { required: "Education is required" })}
                      className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.highest_education ? "border-red-500" : "border-gray-300"}`}
                    >
                      <option value="High School">High School</option>
                      <option value="Diploma">Diploma</option>
                      <option value="Bachelors or higher">Bachelors or higher</option>
                      <option value="Masters or higher">Masters or higher</option>
                      <option value="Doctorate">Doctorate</option>
                      <option value="Any">Any</option>
                    </select>
                    {errors.highest_education && (
                      <p className="text-red-500 text-xs mt-1">{errors.highest_education.message}</p>
                    )}
                  </div>

                  {/* Employment */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Employed In<span className="text-red-500">*</span>
                    </label>
                    <select
                      {...register("employed_in", { required: "Employment is required" })}
                      className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.employed_in ? "border-red-500" : "border-gray-300"}`}
                    >
                      <option value="Private Sector">Private Sector</option>
                      <option value="Government">Government</option>
                      <option value="Defense">Defense</option>
                      <option value="Business">Business</option>
                      <option value="Self-Employed">Self-Employed</option>
                      <option value="Not Working">Not Working</option>
                    </select>
                    {errors.employed_in && (
                      <p className="text-red-500 text-xs mt-1">{errors.employed_in.message}</p>
                    )}
                  </div>

                  {/* Annual Income */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Annual Income<span className="text-red-500">*</span>
                    </label>
                    <select
                      {...register("annual_income", { required: "Income is required" })}
                      className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.annual_income ? "border-red-500" : "border-gray-300"}`}
                    >
                      <option value="Less than 5 LPA">Less than 5 LPA</option>
                      <option value="5 - 10 Lakhs">5 - 10 Lakhs</option>
                      <option value="10 - 20 Lakhs">10 - 20 Lakhs</option>
                      <option value="20 - 30 Lakhs">20 - 30 Lakhs</option>
                      <option value="30 - 50 Lakhs">30 - 50 Lakhs</option>
                      <option value="50 Lakhs - 1 Crore">50 Lakhs - 1 Crore</option>
                      <option value="More than 1 Crore">More than 1 Crore</option>
                    </select>
                    {errors.annual_income && (
                      <p className="text-red-500 text-xs mt-1">{errors.annual_income.message}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4 mt-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center bg-red-600 hover:bg-red-700 transition text-white font-semibold py-3 px-4 rounded-lg disabled:opacity-50 shadow-md"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5 mr-2" />
                  <span>Save Preferences</span>
                </>
              )}
            </button>
          </div>

          {/* Success/Error Messages */}
          <Toaster position="bottom-right" />
          {/* {isSuccess && (
            <div className="fixed bottom-4 right-4 bg-green-50 border-l-4 border-green-500 p-4 rounded shadow-md flex items-center animate-fade-in">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <p className="text-green-700">Preferences saved successfully!</p>
            </div>
          )}
          
          {isError && (
            <div className="fixed bottom-4 right-4 bg-red-50 border-l-4 border-red-500 p-4 rounded shadow-md flex items-center animate-fade-in">
              <p className="text-red-700">Error saving preferences. Please try again.</p>
            </div>
          )} */}
        </form>
      </div>
    </div>
  );
}